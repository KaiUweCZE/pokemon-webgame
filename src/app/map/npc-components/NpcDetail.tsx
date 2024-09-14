"use client";
import Image from "next/image";
import { useContext, useState } from "react";
import { MapContext } from "../MapContext";
import { npcData } from "@/data/npc/npcData";
import { MessageContext } from "@/components/menu/message/MessageContext";
import NpcContent from "./NpcContent";
import closeIcon from "@/assets/images/icons/close-npc.webp";

interface NpcNameProps {
  name: string;
  userDay: number;
  userId: string;
}

const NpcDetail = ({ name, userId, userDay }: NpcNameProps) => {
  const context = useContext(MapContext);
  const messageContext = useContext(MessageContext);
  if (!context || !messageContext) throw new Error("context is missing");

  const npc = npcData.find((e) => e.name === name);

  const handleClose = () => {
    context?.setNpc("");
  };

  return (
    <section className="container-npc">
      {npc && (
        <>
          <div className="box-npc">
            <NpcContent
              npcName={npc.name}
              npcMessage={npc.message}
              userDay={userDay}
              userId={userId}
            />
            <Image
              src={closeIcon}
              alt="close icon"
              width={16}
              height={16}
              className="close-icon"
              onClick={handleClose}
            />
          </div>
          <Image
            className="npc-image"
            src={npc.img}
            alt="image of npc"
            width={240}
            height={480}
          />
        </>
      )}
    </section>
  );
};

export default NpcDetail;
