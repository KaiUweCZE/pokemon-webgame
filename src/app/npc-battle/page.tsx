"use client";
import "@/assets/styles/battle-style.css";
import { NpcBattleProvider } from "./NpcBattleContext";
import NpcBattlefield from "./NpcBattlefied";
import { useSearchParams } from "next/navigation";

const NpcBattle = () => {
  const searchParams = useSearchParams();
  const name = searchParams.get("name");

  return (
    <NpcBattleProvider>
      {name && <NpcBattlefield name={name} />}
    </NpcBattleProvider>
  );
};

export default NpcBattle;
