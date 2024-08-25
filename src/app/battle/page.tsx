"use client";
import Battlefield from "@/app/battle/battle-components/Battlefield";
import { useSession } from "next-auth/react";
import { mapData } from "../map/mapData";
import useStartBattle from "./hooks/useStartBattle";
import { useState } from "react";
import { RoundProvider } from "./RoundContext";
import { EnemyProvider } from "./EnemyContext";

const BattlePage = () => {
  const [round, setRound] = useState(0);
  const { data, update } = useSession();
  const user = data?.user;

  const location = user?.location ?? "";
  const battleData = mapData.find(
    (location) => location.name === user?.location
  );

  //useStartBattle(location, round);

  return (
    <EnemyProvider>
      <RoundProvider>
        <div className="container-battle">
          <Battlefield round={round} setRound={setRound} location={location} />
        </div>
      </RoundProvider>
    </EnemyProvider>
  );
};

export default BattlePage;
