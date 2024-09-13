"use client";
import Image from "next/image";
import { useContext } from "react";
import { MapContext } from "./MapContext";
import NpcActionsList from "./NpcActionsList";
import { npcData } from "@/data/npc/npcData";
import { createQuest } from "@/utils/quests/createQuest";
import { useSession } from "next-auth/react";
import { Quest } from "@/types/quest";

interface NpcNameProps {
  name: string;
  userDay: number;
  userId: string;
}

const NpcDetail = ({ name, userId, userDay }: NpcNameProps) => {
  const context = useContext(MapContext);
  if (!context) throw new Error("context is missing");

  const { quest } = context;
  const npc = npcData.find((e) => e.name === name);

  const handleQuest = async () => {
    console.log(quest);
    if (quest as Quest) {
      const createdQuest = await createQuest(quest, userId);

      if (createdQuest) {
        console.log(createdQuest);
      }
    }
  };
  return (
    <>
      {npc && (
        <section className="container-npc">
          <div className="box-npc">
            <article>
              <span>{npc.name}</span>
              {quest?.active && quest.from === npc.name ? (
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
              {quest?.active ? (
                <button className="button-primary" onClick={handleQuest}>
                  accept
                </button>
              ) : (
                <NpcActionsList name={npc.name} userDay={userDay} />
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
