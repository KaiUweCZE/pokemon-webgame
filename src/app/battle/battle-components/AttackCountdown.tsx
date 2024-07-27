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
    const interval = setInterval(() => {
      setActualTime((prev) => {
        if (prev <= 0) {
          setTime(0);
          clearInterval(interval);
          return 0;
        }
        return prev - 0.1;
      });
    }, 100);

    return () => clearInterval(interval);
  }, [setTime]);
  return (
    <li className="countdown">
      <span>{actualTime >= 0 ? actualTime.toFixed(1) : 0}</span>
    </li>
  );
};

export default AttackCountdown;
