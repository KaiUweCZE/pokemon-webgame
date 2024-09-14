import { Quest } from "@/types/quest";
import { atom, useAtom } from "jotai";
import { getQuests } from "@/utils/quests/getQuests";
import { useEffect, useState } from "react";
import { convertToQuest } from "@/utils/type-check/convertToQuest";

export const questsAtom = atom<Quest[]>([]);

export const useSetQuests = () => {
  const [, setQuests] = useAtom(questsAtom);
  return setQuests;
};

export const addQuestAtom = atom(null, (get, set, newQuest: Quest) =>
  set(questsAtom, (quests) => [...quests, newQuest])
);

export const addQuestsAtom = atom(null, (get, set, newQuests: Quest[]) =>
  set(questsAtom, newQuests)
);

export const completeQuestAtom = atom(null, (get, set, questName) =>
  set(questsAtom, (quests) =>
    quests.map((q) => (q.name === questName ? { ...q, completed: true } : q))
  )
);

export const rewardQuestAtom = atom(null, (get, set, questId: string) =>
  set(questsAtom, (quests) =>
    quests.map((q) => (q.id === questId ? { ...q, rewarded: true } : q))
  )
);

export const useLoadQuests = (userId: string) => {
  const [quests, setQuests] = useAtom(questsAtom);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    const fetchQuests = async () => {
      try {
        setLoading(true);
        const fetchedQuests = await getQuests(userId);
        console.log("feteched: ", fetchedQuests);

        const editedFetchedQuests = fetchedQuests?.map((q) => {
          return convertToQuest(q);
        });
        if (editedFetchedQuests) {
          setQuests(editedFetchedQuests);
        }

        setError(null);
      } catch (err) {
        setError(
          err instanceof Error
            ? err
            : new Error("An error occurred while fetching quests")
        );
      } finally {
        setLoading(false);
      }
    };

    fetchQuests();
  }, [userId, setQuests]);

  return { quests, setQuests, loading, error };
};

export const updateQuestAfterPokemonDefeatAtom = atom(
  null,
  (get, set, defeatedPokemonName: string) => {
    console.log(
      `Attempting to update quests for defeated Pokemon: ${defeatedPokemonName}`
    );

    set(questsAtom, (quests) => {
      console.log("Current quests:", quests);

      const updatedQuests = quests.map((quest) => {
        console.log(`Checking quest: ${quest.name}`);

        const updatedObjectives = quest.objectives.map((objective) => {
          // edit quests that are not completed
          if (
            objective.type === "eliminatePokemon" &&
            objective.target.toLowerCase() ===
              defeatedPokemonName.toLowerCase() &&
            !objective.completed
          ) {
            const newCurrentAmount = objective.currentAmount + 1;
            console.log(`Updating current amount to: ${newCurrentAmount}`);

            return {
              ...objective,
              currentAmount: newCurrentAmount,
              completed: newCurrentAmount >= objective.requiredAmount,
            };
          }
          return objective;
        });

        const allObjectivesCompleted = updatedObjectives.every(
          (obj) => obj.completed
        );

        return {
          ...quest,
          objectives: updatedObjectives,
          completed: allObjectivesCompleted,
        };
      });

      console.log("Updated quests:", updatedQuests);
      return updatedQuests;
    });
  }
);
