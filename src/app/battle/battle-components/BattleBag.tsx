"use client";
import { useSession } from "next-auth/react";
import { Dispatch, SetStateAction } from "react";

interface BattleBagProps {
  setMenuChoice: Dispatch<SetStateAction<string>>;
}

const BattleBag = ({ setMenuChoice }: BattleBagProps) => {
  const { data } = useSession();
  if (!data) {
    throw new Error("data is missing");
  }

  const items = data.user.items;
  return (
    <div className="battle-bag">
      <ul>
        {items.map((item, index) => (
          <li key={index}>
            {item.item}: {item.count}
          </li>
        ))}
      </ul>
      <button className="button-primary" onClick={() => setMenuChoice("")}>
        close
      </button>
    </div>
  );
};

export default BattleBag;
