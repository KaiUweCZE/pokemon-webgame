import { NpcBattleContext } from "@/app/npc-battle/NpcBattleContext";
import { BattleContext } from "@/contexts/BattleContext";
import { useContext } from "react";

export const useBattleContext = () => {
  const npcContext = useContext(NpcBattleContext);
  const battleContext = useContext(BattleContext);

  if (npcContext) return npcContext;
  if (battleContext) return battleContext;

  throw new Error(
    "Context is missing, use one of the provider(BattleProvider, NpcContextProvider)"
  );
};
