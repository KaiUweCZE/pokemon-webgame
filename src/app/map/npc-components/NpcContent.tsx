import { Quest } from "@/types/quest";
import { useContext, useState } from "react";
import { MapContext } from "../MapContext";
import { Message, MessageType } from "@/types/message";
import { createQuest } from "@/utils/quests/createQuest";
import { createMessage } from "@/components/menu/message/action";
import { convertToQuest } from "@/utils/type-check/convertToQuest";
import { MessageContext } from "@/components/menu/message/MessageContext";
import { useSetAtom } from "jotai";
import { addQuestAtom } from "@/components/menu/message/store/questStore";
import NpcActionsList from "./NpcActionsList";
import NpcQuestDetail from "./NpcQuestDetail";
import { useSession } from "next-auth/react";

interface NpcContentProps {
  npcName: string;
  npcMessage: string;
  userDay: number;
  userId: string;
}

const NpcContent = ({
  npcName,
  npcMessage,
  userDay,
  userId,
}: NpcContentProps) => {
  const { data, update } = useSession();
  const context = useContext(MapContext);
  const messageContext = useContext(MessageContext);
  const addQuest = useSetAtom(addQuestAtom);
  const [active, setActive] = useState(false);
  const [detail, setDetail] = useState({ active: false, questName: "" });
  console.log("quests: ", context?.quests);

  if (!context || !messageContext) return <p>Missing context</p>;

  const { quests } = context;
  const { setMessages, setNumberOfNewMessages } = messageContext;

  const handleQuest = async (quest: Quest) => {
    if (quests as Quest[]) {
      const message = {
        from: quest?.from ?? "prof. Bloom",
        time: userDay,
        text: quest?.description ?? "nothing to see here",
        type: MessageType.QUEST,
      };
      const createdQuest = await createQuest(quest, userId);
      if (createdQuest) {
        const createdMessage = await createMessage(userId, message);
        console.log(createdQuest);
        const editedQuest = convertToQuest(createdQuest);
        addQuest(editedQuest);
        setMessages((prev) => {
          const newMessage = createdMessage as Message;
          if (!createdMessage) return prev;
          if (!prev) return [newMessage];
          return [...prev, newMessage];
        });
        setNumberOfNewMessages((prev) => prev + 1);
        await update({
          ...data,
          user: {
            ...data?.user,
            completedQuest: data?.user?.completedQuests.push(createdQuest.name),
          },
        });
      }
    }
  };

  const handleDetail = (e: string) => {
    console.log(data?.user);

    if (detail.questName === e) {
      setDetail({ active: false, questName: "" });
    } else {
      setDetail({ active: true, questName: e });
    }
  };

  return (
    <article>
      {active ? (
        <span onClick={() => setActive(false)} className="clickable">
          Go back
        </span>
      ) : (
        <span>{npcName}</span>
      )}
      {active ? (
        <ul className="available-quests">
          {quests ? (
            quests.map((quest) => (
              <li key={quest.name}>
                <div className="quest-item">
                  <p key={quest.name}>{quest.name}</p>
                  <div>
                    <button
                      className="button-primary"
                      onClick={() => handleQuest(quest)}
                    >
                      accept
                    </button>
                    <button
                      className="button-primary"
                      onClick={() => handleDetail(quest.name)}
                    >
                      {quest.name === detail.questName && detail.active
                        ? "hide"
                        : "detail"}
                    </button>
                  </div>
                </div>
                {detail.questName === quest.name && (
                  <NpcQuestDetail quest={quest} />
                )}
              </li>
            ))
          ) : (
            <li>nothing</li>
          )}
        </ul>
      ) : (
        <>
          <p className="npc-message">{npcMessage}</p>
          <NpcActionsList
            name={npcName}
            userDay={userDay}
            setActive={setActive}
          />
        </>
      )}
    </article>
  );
};

export default NpcContent;
