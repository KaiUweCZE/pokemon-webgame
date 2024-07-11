"use client";
import Battlefield from "@/app/battle/battle-components/Battlefield";
import { useSession } from "next-auth/react";
import { mapData } from "../map/mapData";
import useStartBattle from "@/hooks/useStartBattle";
import { useState } from "react";
import { RoundProvider } from "./RoundContext";

const BattlePage = () => {
  const [round, setRound] = useState(0);
  const { data, update } = useSession();
  const user = data?.user;

  const location = user?.location ?? "";
  const battleData = mapData.find(
    (location) => location.name === user?.location
  );

  useStartBattle(location, round);

  return (
    <RoundProvider>
      <div className="container-battle">
        <h2>{`Welcome in ${battleData?.name}`}</h2>
        <Battlefield round={round} setRound={setRound} />
      </div>
    </RoundProvider>
  );
};

export default BattlePage;
