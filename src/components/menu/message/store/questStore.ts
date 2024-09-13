import { Quest } from "@/types/quest";
import { atom } from "jotai";

export const questsAtom = atom<Quest[]>([]);
export const addQuestAtom = atom(null, (get, set, newQuest: Quest) =>
  set(questsAtom, (quests) => [...quests, newQuest])
);

export const completeQuestAtom = atom(null, (get, set, questName) =>
  set(questsAtom, (quests) =>
    quests.map((q) => (q.name === questName ? { ...q, completed: true } : q))
  )
);
