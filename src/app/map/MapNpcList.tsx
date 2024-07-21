"use client";
import { useContext } from "react";
import { mapData } from "./mapData";
import { MapContext } from "./MapContext";

interface LocationProps {
  location: string;
}

const MapNpcList = ({ location }: LocationProps) => {
  const context = useContext(MapContext);
  const listData = mapData.find((e) => e.name === location)?.npcs;

  const handleNpc = (npc: string) => {
    context?.setNpc(npc);
    console.log("npc: ", npc);
  };
  return (
    <ul>
      {listData &&
        listData?.map((npc, index) => (
          <li key={index} onClick={() => handleNpc(npc)}>
            {npc}
          </li>
        ))}
    </ul>
  );
};

export default MapNpcList;
