"use client";
import { useContext } from "react";
import { mapData } from "./mapData";
import { MapContext } from "./MapContext";
import Image from "next/image";
import starIcon from "@/assets/images/icons/star.webp";
import { npcData } from "@/data/npc/npcData";

interface LocationProps {
  location: string;
}

const MapNpcList = ({ location }: LocationProps) => {
  const context = useContext(MapContext);
  const listData = mapData.find((e) => e.name === location)?.npcs;
  const npcInfo = npcData.filter((npc) => listData?.includes(npc.name));

  const handleNpc = (npc: string) => {
    context?.setNpc(npc);
    console.log("npc: ", npc, npcInfo);
  };
  return (
    <ul className="npc-list">
      {listData &&
        npcInfo?.map((npc, index) => (
          <li
            className="npc-item item"
            key={index}
            onClick={() => handleNpc(npc.name)}
          >
            <span>{npc.name}</span>{" "}
            {npc.stadiumTrainer && (
              <Image src={starIcon} alt="icon of star" width={32} height={32} />
            )}
          </li>
        ))}
    </ul>
  );
};

export default MapNpcList;
