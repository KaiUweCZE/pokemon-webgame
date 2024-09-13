import { npcQuestsData } from "@/data/npc/npc-quests/npcQuestsData";
import { npcData } from "@/data/npc/npcData";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useContext } from "react";
import { MapContext } from "./MapContext";

interface NpcActionsListProps {
  name: string;
  userDay: number;
}

const NpcActionsList = ({ name, userDay }: NpcActionsListProps) => {
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
      const availableQuest = questData.find((q) => q.minDay <= userDay);

      if (availableQuest) {
        setQuest({
          active: quest?.active === true ? false : true,
          ...availableQuest,
        });
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
