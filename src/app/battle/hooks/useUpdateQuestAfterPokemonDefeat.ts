import {
  questsAtom,
  updateQuestAfterPokemonDefeatAtom,
} from "@/components/menu/message/store/questStore";
import { updateEliminateQuests } from "@/utils/quests/updateEliminateQuest";
import { useAtom } from "jotai";
import { useSession } from "next-auth/react";
import { useCallback, useEffect } from "react";

export const useHandleObjectives = (
  wildPokemonName: string,
  actualHp: number
) => {
  const { data } = useSession();
  const [, updateQuestAtom] = useAtom(updateQuestAfterPokemonDefeatAtom);

  const updateQuest = useCallback(
    async (wildPokemonName: string) => {
      if (!data) return null;
      const { user } = data;
      if (!user) {
        console.error("User ID not available");
        return;
      }
      try {
        const updatedQuests = await updateEliminateQuests(
          user.id,
          wildPokemonName
        );

        if (updatedQuests) {
          updateQuestAtom(wildPokemonName);
        }
      } catch (error) {
        console.error("Failed to update quests:", error);
      }
    },
    [actualHp]
  );

  useEffect(() => {
    if (actualHp <= 0) {
      updateQuest(wildPokemonName);
    }
  }, [actualHp]);

  return { updateQuest };
};
