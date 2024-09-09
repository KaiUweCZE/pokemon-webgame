"use client";
import { UserContext } from "@/contexts/UserContext";
import { useContext, useState } from "react";
import Image from "next/image";
import alternativeClock from "@/assets/images/icons/hourglass.png";
import "./footer.css";
import { nextDay } from "./action";
import { useSession } from "next-auth/react";
import useLoadSixToContext from "@/hooks/useLoadSixToContext";
import { handleDailyMessage } from "./utils/handleDailyMessage";
import { MessageContext } from "../menu/message/MessageContext";
import PartOfDay from "./timeline-components/PartOfDay";

const Timeline = () => {
  const { data, update } = useSession();
  const [activeFooter, setActiveFooter] = useState(true);
  const context = useContext(UserContext);
  const messageContext = useContext(MessageContext);
  const [animateIcon, setAnimateIcon] = useState(false);
  const [loading, setLoading] = useState(false);
  const { fetchAndSetPokemon } = useLoadSixToContext();

  if (!data) return;
  const user = data.user;
  const partOfDay = data?.user.partOfDay;

  const handleNextDay = async () => {
    setAnimateIcon(true);
    setLoading(true);
    try {
      if (user) {
        const updatedUser = await nextDay(user.name);
        const { updated, newMessage } = await handleDailyMessage(
          user.day,
          user.dailyMessage,
          user.id
        );
        // update session
        await update({
          ...data,
          user: {
            ...data?.user,
            day: updatedUser?.day,
            partOfDay: 0,
            dailyMessage: updated?.dailyMessage,
          },
        });

        if (newMessage) {
          messageContext?.setMessages((prev) => {
            if (!prev) return [newMessage];
            return [...prev, newMessage];
          });
          messageContext?.setNumberOfNewMessages((prev) => prev + 1);
        }
        fetchAndSetPokemon(user.name);
      }
    } catch (error) {
      console.error("Error updating day:", error);
    } finally {
      setLoading(false);
      setTimeout(() => {
        setAnimateIcon(false);
      }, 1000);
    }
  };

  return (
    <div className="container-footer">
      {context?.isLog && (
        <footer className="main-footer">
          {activeFooter && (
            <div className="box-time">
              <span className="time-text">
                {user ? `day: ${user.day}` : "not today"}
              </span>
              {partOfDay !== undefined && <PartOfDay partOfDay={partOfDay} />}
              <button
                className="button-primary"
                onClick={handleNextDay}
                disabled={loading}
              >
                {loading ? "loading..." : "next day"}
              </button>
            </div>
          )}
          <button
            className="toggle-footer"
            onClick={() => setActiveFooter(!activeFooter)}
          >
            <Image
              className={animateIcon ? "active" : ""}
              src={alternativeClock}
              alt="clock icon"
              height={24}
              width={24}
            />
          </button>
        </footer>
      )}
    </div>
  );
};

export default Timeline;
