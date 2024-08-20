import { useContext } from "react";
import { NpcBattleContext } from "../NpcBattleContext";
import { getCssClass } from "../npc-utils/getCssClass";

export const useCssClass = () => {
  const context = useContext(NpcBattleContext);
  if (!context) {
    throw Error("context is missing");
  }
  const { battleState } = context;

  return (baseClass: string) => getCssClass(baseClass, battleState);
};
