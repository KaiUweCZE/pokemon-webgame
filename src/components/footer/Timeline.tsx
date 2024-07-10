"use client";
import { UserContext } from "@/contexts/UserContext";
import { useContext, useState } from "react";
import Image from "next/image";
import clockIcon from "@/assets/images/icons/clock.svg";
import "./footer.css";
import { nextDay } from "./action";
import { useSession } from "next-auth/react";

const Timeline = () => {
  const { data, update } = useSession();
  const [activeFooter, setActiveFooter] = useState(false);
  const context = useContext(UserContext);

  if (!context) {
    console.log("there is'nt context");
  }

  const currentUser = context?.currentUser;
  const partOfDay = context?.currentUser?.partOfDay;

  const handleNextDay = async () => {
    if (currentUser) {
      const updatedUser = await nextDay(currentUser.name);
      if (updatedUser) {
        context.setCurrentUser(updatedUser);
        // update session
        update({
          ...data?.user,
          day: updatedUser.day,
          partOfDay: 0,
        });
        console.log("updated session: ", data);
      }

      console.log("updated user: ", updatedUser);
    }
    console.log("current user: ", currentUser);
  };
  return (
    <div className="container-footer">
      <footer>
        {activeFooter && (
          <div className="box-time">
            <span className="time-text">
              {currentUser ? `day: ${currentUser.day}` : "not today"}
            </span>
            <div className="box-step">
              <div className={partOfDay === 1 ? "step pass" : "step"}></div>
              <div className={partOfDay === 2 ? "step pass" : "step"}></div>
              <div className={partOfDay === 3 ? "step pass" : "step"}></div>
            </div>{" "}
            <button className="button-primary" onClick={handleNextDay}>
              next day
            </button>
          </div>
        )}{" "}
        <button
          className="toggle-footer"
          onClick={() => setActiveFooter(!activeFooter)}
        >
          <Image src={clockIcon} alt="clock icon" height={24} width={24} />
        </button>
      </footer>
    </div>
  );
};

export default Timeline;
