import { Quest } from "@/types/quest";
import { atom, useAtom } from "jotai";
import { getQuests } from "@/utils/quests/getQuests";
import { useEffect, useState } from "react";

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

export const useLoadQuests = (userId: string) => {
  const [quests, setQuests] = useAtom(questsAtom);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    const fetchQuests = async () => {
      try {
        setLoading(true);
        const fetchedQuests = await getQuests(userId);
        const editedFetchedQuests = fetchedQuests?.map((q) => {
          return {
            id: q.id,
            name: q.name,
            description: q.description,
            from: q.from,
            startDay: q.startDay ?? 0,
            endDay: q.endDay ?? null,
            location: q.location ?? null,
            completed: q.completed,
            duration: (q.endDay ?? 0) - (q?.startDay ?? 0) ?? null,
            rewards: q.rewards as { name: string; count: number }[],
            objectives: q.objectives,
            progress: q.progress as string,
          };
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

  return { quests, loading, error };
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
          console.log(
            `Checking objective: ${objective.type}, target: ${objective.target}`
          );

          if (
            objective.type === "eliminatePokemon" &&
            objective.target.toLowerCase() ===
              defeatedPokemonName.toLowerCase() &&
            objective.currentAmount < objective.requiredAmount
          ) {
            console.log(
              `Matching objective found. Current amount: ${objective.currentAmount}, Required amount: ${objective.requiredAmount}`
            );

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

        console.log(
          `Quest "${quest.name}" completed: ${allObjectivesCompleted}`
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

export const useUpdateQuestAfterPokemonDefeat = () => {
  const [quests, updateQuest] = useAtom(updateQuestAfterPokemonDefeatAtom);

  const debugUpdateQuest = (defeatedPokemonName: string) => {
    console.log(`Calling updateQuest for ${defeatedPokemonName}`);
    console.log("Current quests before update:", quests);
    updateQuest(defeatedPokemonName);
    // Note: We can't log the updated quests here because the state update is asynchronous
    // We'll need to check the next render to see the updated state
  };

  return debugUpdateQuest;
};
