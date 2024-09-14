import { npcQuestsData } from "@/data/npc/npc-quests/npcQuestsData";
import { npcData } from "@/data/npc/npcData";
import { useRouter } from "next/navigation";
import { Dispatch, useContext } from "react";
import { MapContext } from "../MapContext";
import { SetStateAction } from "jotai";
import { Quest } from "@/types/quest";
import { useSession } from "next-auth/react";

interface NpcActionsListProps {
  name: string;
  userDay: number;
  setActive: Dispatch<SetStateAction<boolean>>;
}

const NpcActionsList = ({ name, userDay, setActive }: NpcActionsListProps) => {
  const { data } = useSession();
  const context = useContext(MapContext);
  const router = useRouter();
  const npc = npcData.find((e) => e.name === name);
  const filtredActions = npc?.actions.filter((action) => action.active);
  const actionsList = filtredActions?.map((action) => action.name);
  const questData = npcQuestsData.filter((quest) => quest.from === npc?.name);

  if (!context || !data) return;

  const { quests, setQuests } = context;
  const { user } = data;

  const handleFightClick = () => {
    if (npc) {
      router.push(`/npc-battle?name=${encodeURIComponent(npc.name)}`);
    }
  };

  const checkQuest = () => {
    console.log("Checking quests...", user.completedQuests);

    if (questData && userDay && npc) {
      const availableQuest = questData.filter(
        (q) => q.startDay <= userDay && !user.completedQuests.includes(q.name)
      );
      setActive(true);

      if (availableQuest.length > 0) {
        setQuests((prev) => {
          const newQuests = availableQuest.map((q) => ({
            ...q,
            id: q.name,
            rewarded: false,
          }));
          return [...newQuests];
        });

        console.log("available: ", availableQuest);
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
    <div className="container-actions">
      <span>Do you need something?</span>
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
    </div>
  );
};

export default NpcActionsList;
