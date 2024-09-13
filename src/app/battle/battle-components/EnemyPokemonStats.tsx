import HpBar from "@/components/HpBar";
import {
  useSetQuests,
  useUpdateQuestAfterPokemonDefeat,
} from "@/components/menu/message/store/questStore";
import { updateEliminateQuests } from "@/utils/quests/updateEliminateQuest";
import { useEffect } from "react";

interface PokemonStatsProps {
  name: string;
  level: number;
  hp: number;
  actualHp: number;
}

const EnemyPokemonStats = ({
  name,
  level,
  hp,
  actualHp,
}: PokemonStatsProps) => {
  const updateQuestAfterPokemonDefeat = useUpdateQuestAfterPokemonDefeat();
  const setQuests = useSetQuests();

  const handlePokemonDefeat = async () => {
    try {
      const updatedQuests = await updateEliminateQuests(
        "66d69191900aceb0f2f19276",
        name
      );
      if (updatedQuests) {
        setQuests(updatedQuests);
        updateQuestAfterPokemonDefeat(name);
      }
    } catch (error) {
      console.error("Failed to update quests:", error);
    }
  };

  useEffect(() => {
    if (actualHp <= 0) {
      console.log("It is done!!!!", name);

      handlePokemonDefeat();
    }
    console.log("actual hp is:", actualHp);
  }, [actualHp]);

  return (
    <div className="box-stats">
      <div className="name-level">
        <span>{name}</span>
        <span>lv.{level}</span>
      </div>
      <div className="bar-wrapper">
        <span>HP</span>
        <HpBar maximumHp={hp} actualHp={actualHp} />
      </div>
    </div>
  );
};

export default EnemyPokemonStats;
