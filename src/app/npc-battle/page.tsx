"use client";
import "@/assets/styles/battle-style.css";
import { NpcBattleProvider } from "./NpcBattleContext";
import NpcBattlefield from "./NpcBattlefied";

const npcBattle = () => {
  return (
    <NpcBattleProvider>
      <NpcBattlefield />
    </NpcBattleProvider>
  );
};

export default npcBattle;
