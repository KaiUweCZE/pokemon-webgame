"use client";
import Image from "next/image";
import { useContext, useState } from "react";
import { MapContext } from "./MapContext";
import NpcActionsList from "./NpcActionsList";
import { npcData } from "@/data/npc/npcData";
import { createQuest } from "@/utils/quests/createQuest";
import { useSession } from "next-auth/react";
import { Quest } from "@/types/quest";
import { MessageContext } from "@/components/menu/message/MessageContext";
import {
  addQuestAtom,
  questsAtom,
} from "@/components/menu/message/store/questStore";
import { useAtom, useSetAtom } from "jotai";
import { Message, MessageType } from "@/types/message";
import { createMessage } from "@/components/menu/message/action";

interface NpcNameProps {
  name: string;
  userDay: number;
  userId: string;
}

const NpcDetail = ({ name, userId, userDay }: NpcNameProps) => {
  const context = useContext(MapContext);
  const messageContext = useContext(MessageContext);
  const [active, setActive] = useState(false);
  const addQuest = useSetAtom(addQuestAtom);
  const [quests] = useAtom(questsAtom);
  if (!context || !messageContext) throw new Error("context is missing");

  const { quest } = context;
  const { messages, setMessages, setNumberOfNewMessages } = messageContext;
  const npc = npcData.find((e) => e.name === name);

  const handleQuest = async () => {
    console.log(quest);
    if (quest as Quest) {
      const message = {
        from: quest?.from ?? "prof. Bloom",
        time: userDay,
        text: quest?.description ?? "nothing to see here",
        type: MessageType.QUEST,
      };
      const createdQuest = await createQuest(quest, userId);
      const createdMessage = await createMessage(userId, message);

      if (createdQuest) {
        console.log(createdQuest);
        const editedQuest = {
          id: createdQuest.id,
          name: createdQuest.name,
          description: createdQuest.description,
          from: createdQuest.from,
          startDay: createdQuest.startDay ?? 0,
          endDay: createdQuest.endDay ?? null,
          location: createdQuest.location ?? null,
          completed: createdQuest.completed,
          duration:
            (createdQuest.endDay ?? 0) - (createdQuest?.startDay ?? 0) ?? null,
          rewards: createdQuest.rewards as { name: string; count: number }[],
          objectives: createdQuest.objectives,
          progress: createdQuest.progress as string,
        };
        addQuest(editedQuest);
        setMessages((prev) => {
          const newMessage = createdMessage as Message;
          if (!createdMessage) return prev;
          if (!prev) return [newMessage];
          return [...prev, newMessage];
        });
      }
      setNumberOfNewMessages((prev) => prev + 1);
    }
  };
  return (
    <>
      {npc && (
        <section className="container-npc">
          <div className="box-npc">
            <article>
              <span>{npc.name}</span>
              {active && quest?.from === npc.name ? (
                <p>{quest.description}</p>
              ) : (
                <p>
                  Lorem ipsum dolor sit amet consectetur adipisicing elit. Vero
                  reprehenderit magni voluptate alias, mollitia quibusdam modi
                  error, sint facere in possimus dolor suscipit quasi debitis
                  quae eveniet deleniti ipsam eius. Itaque ullam excepturi hic
                  tenetur quibusdam ut numquam laudantium aliquid quisquam?
                  Quis, quaerat qui vitae sunt nobis amet et perspiciatis
                  nesciunt, iusto accusantium quisquam illum iure aliquam, optio
                  pariatur porro? Exercitationem blanditiis temporibus vitae
                  facere amet sapiente enim, beatae error ad dignissimos? Vel,
                  quae vitae. In assumenda tempore a facere molestias architecto
                  quaerat perspiciatis explicabo accusamus. A nam voluptas
                  laboriosam. Lorem ipsum dolor sit amet consectetur adipisicing
                  elit. Veritatis rem earum iusto recusandae, repellendus
                  explicabo ullam harum, ex, autem enim fugiat quasi temporibus
                  sapiente repellat accusantium
                </p>
              )}
              {active ? (
                <button className="button-primary" onClick={handleQuest}>
                  accept
                </button>
              ) : (
                <NpcActionsList
                  name={npc.name}
                  userDay={userDay}
                  active={active}
                  setActive={setActive}
                />
              )}
            </article>
            <button
              className="button-primary"
              onClick={() => context?.setNpc("")}
            >
              close
            </button>
          </div>
          <Image
            className="npc-image"
            src={npc.img}
            alt="image of npc"
            width={240}
            height={480}
          />
        </section>
      )}
    </>
  );
};

export default NpcDetail;
