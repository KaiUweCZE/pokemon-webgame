"use client";
import { BattleContext } from "@/contexts/BattleContext";
import Image from "next/image";
import { useSession } from "next-auth/react";
import { Dispatch, SetStateAction, useContext } from "react";
import BagItem from "./BagItem";
import closeIcon from "@/assets/images/icons/close.svg";
import { BattleMenuState } from "@/types/enums/enumBattleMenu";
import { itemData } from "@/data/itemData";

interface BattleBagProps {
  setMenuChoice: Dispatch<SetStateAction<BattleMenuState>>;
}

const BattleBag = ({ setMenuChoice }: BattleBagProps) => {
  const { data } = useSession();
  if (!data) {
    throw new Error("data is missing");
  }

  const items = data.user.items;
  // reduce to items that user can use in battle
  const battleItems = items.reduce((acc, i) => {
    const battleItem = itemData.find(
      (it) => it.name === i.name && it.battleItem
    );
    if (battleItem) {
      acc.push({ ...battleItem, count: i.count });
    }
    return acc;
  }, [] as ((typeof itemData)[0] & { count: number })[]);
  return (
    <div className="battle-bag">
      <h2>Bag</h2>
      <ul>
        {battleItems.map((item, index) => (
          <BagItem key={index} name={item.name} count={item.count} />
        ))}
      </ul>
      <Image
        className="close-icon"
        src={closeIcon}
        alt="close icon"
        width={16}
        height={16}
        onClick={() => setMenuChoice(BattleMenuState.DEFAULT)}
      />
    </div>
  );
};

export default BattleBag;
