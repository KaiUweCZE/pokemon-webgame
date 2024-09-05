"use client";
import { UserContext } from "@/contexts/UserContext";
import { useContext, useState } from "react";
import Image from "next/image";
import clockIcon from "@/assets/images/icons/clock.svg";
import alternativeClock from "@/assets/images/icons/hourglass.png";
import "./footer.css";
import { nextDay } from "./action";
import { useSession } from "next-auth/react";

const Timeline = () => {
  const { data, update } = useSession();
  const [activeFooter, setActiveFooter] = useState(true);
  const context = useContext(UserContext);
  const [animateIcon, setAnimateIcon] = useState(false);
  const [loading, setLoading] = useState(false);

  const user = data?.user;
  const partOfDay = data?.user.partOfDay;

  const handleNextDay = async () => {
    setAnimateIcon(true);
    setLoading(true);
    try {
      if (user) {
        const updatedUser = await nextDay(user.name);
        if (updatedUser) {
          console.log("updated session: ", data);
        }
        // update session
        await update({
          ...data,
          user: {
            ...data?.user,
            day: updatedUser?.day,
            partOfDay: 0,
          },
        });
        console.log("updated user: ", updatedUser);
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
              {partOfDay !== undefined && (
                <div className="box-step">
                  <div className={partOfDay >= 1 ? "step pass" : "step"}></div>
                  <div className={partOfDay >= 2 ? "step pass" : "step"}></div>
                  <div className={partOfDay === 3 ? "step pass" : "step"}></div>
                </div>
              )}
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
