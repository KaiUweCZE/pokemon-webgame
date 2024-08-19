"use client";
import "@/assets/styles/battle-style.css";
import { NpcBattleProvider } from "./NpcBattleContext";
import NpcBattlefield from "./NpcBattlefied";
import { useSearchParams } from "next/navigation";

const NpcBattle = () => {
  const searchParams = useSearchParams();
  const name = searchParams.get("name");

  const logger = () => {
    console.log("name: ", name);
  };

  return (
    <NpcBattleProvider>
      <button onClick={logger}>clickeee</button>
      {name && <NpcBattlefield name={name} />}
    </NpcBattleProvider>
  );
};

export default NpcBattle;
