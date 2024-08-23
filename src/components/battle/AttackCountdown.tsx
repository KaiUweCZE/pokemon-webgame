import { Dispatch, SetStateAction, useEffect, useState } from "react";

interface CountdownProps {
  time: number;
  setTime: Dispatch<SetStateAction<number>>;
}

const AttackCountdown = ({ time, setTime }: CountdownProps) => {
  const [actualTime, setActualTime] = useState(time);

  useEffect(() => {
    setActualTime(time); // Sync with props time when it changes
  }, [time]);

  useEffect(() => {
    if (actualTime <= 0) {
      return;
    }

    const interval = setInterval(() => {
      setActualTime((prev) => {
        const newTime = Math.max(prev - 0.1, 0);
        return newTime;
      });
    }, 100);

    return () => clearInterval(interval);
  }, [actualTime]);

  useEffect(() => {
    if (actualTime !== time) {
      setTime(actualTime);
    }
  }, [actualTime, setTime, time]);

  return (
    <li className="countdown">
      <span>{actualTime >= 0 ? actualTime.toFixed(1) : 0}</span>
    </li>
  );
};

export default AttackCountdown;
