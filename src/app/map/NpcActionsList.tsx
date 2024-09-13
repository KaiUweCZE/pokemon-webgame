import { npcQuestsData } from "@/data/npc/npc-quests/npcQuestsData";
import { npcData } from "@/data/npc/npcData";
import { useRouter } from "next/navigation";
import { Dispatch, useContext } from "react";
import { MapContext } from "./MapContext";
import { SetStateAction } from "jotai";

interface NpcActionsListProps {
  name: string;
  userDay: number;
  active: boolean;
  setActive: Dispatch<SetStateAction<boolean>>;
}

const NpcActionsList = ({
  name,
  userDay,
  active,
  setActive,
}: NpcActionsListProps) => {
  const context = useContext(MapContext);
  const router = useRouter();
  const npc = npcData.find((e) => e.name === name);
  const filtredActions = npc?.actions.filter((action) => action.active);
  const actionsList = filtredActions?.map((action) => action.name);
  const questData = npcQuestsData.filter((quest) => quest.from === npc?.name);

  if (!context) return;

  const { quest, setQuest } = context;

  const handleFightClick = () => {
    if (npc) {
      router.push(`/npc-battle?name=${encodeURIComponent(npc.name)}`);
    }
  };

  const checkQuest = () => {
    console.log("whups");

    if (questData && userDay && npc) {
      const availableQuest = questData.find((q) => q.startDay <= userDay);
      setActive(true);
      if (availableQuest) {
        setQuest({ id: "gag", ...availableQuest });
        console.log("Available quest:", availableQuest);
      } else {
        console.log("No quests available for the current day.");
      }
    } else {
      console.log("Quest data or user session not available.");
    }
  };

  const generateButtonUtil = (action: string) => {
    console.log("what?");

    switch (action) {
      case "battle":
        return handleFightClick;
      case "quest":
        return checkQuest;
      default:
        return () => console.log(`Action ${action} not implemented`);
    }
  };

  return (
    <ul className="action-list">
      {actionsList &&
        actionsList.map((action) => (
          <li key={action}>
            <button
              className="button-primary"
              onClick={generateButtonUtil(action)}
            >
              {action}
            </button>
          </li>
        ))}
    </ul>
  );
};

export default NpcActionsList;
