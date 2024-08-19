"use client";
import EnemyPokemon from "./EnemyPokemon";
import UserPokemonBattle from "./UserPokemonBattle";
import "@/assets/styles/battle-style.css";
import BoxAttacks from "./BoxAttacks";
import UserBattleMenu from "./UserBattleMenu";
import SwitchBox from "./SwitchBox";
import BattleBag from "./BattleBag";
import useBattle from "@/app/battle/hooks/useBattle";
import useNewLevel from "@/hooks/useNewLevel";
import NewLevel from "./NewLevel";
import BattleText from "./BattleText";
import { Dispatch, SetStateAction } from "react";
import useEnemyBattle from "../hooks/useEnemyBattle";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import useReward from "@/hooks/useReward";
import { BattleMenu } from "@/types/enums/enumBattleMenu";

interface BattlefieldProps {
  round: number;
  setRound: Dispatch<SetStateAction<number>>;
}

const Battlefield = ({ round, setRound }: BattlefieldProps) => {
  const {
    damage,
    setDamage,
    change,
    setChange,
    menuChoice,
    setMenuChoice,
    animationTime,
    enemyPokemon,
    currentPokemon,
    exp,
    isCatching,
  } = useBattle();

  useEnemyBattle();

  const { items } = useReward();

  const newLevel = useNewLevel(change);

  // check conditions and return valid message
  const getBattleText = () => {
    if (enemyPokemon?.actualHp === 0 && menuChoice === "") {
      return (
        <BattleText
          text={`You get: ${exp} exp and ${items?.name}: ${items?.count}. Do you want to continue?`}
          button={true}
          setRound={setRound}
          round={round}
        />
      );
    }
    if (isCatching.isSucces) {
      return (
        <BattleText
          text={`You catch it. Do you want to continue?`}
          button={true}
          setRound={setRound}
          round={round}
        />
      );
    }
    if (menuChoice === BattleMenu.FIGHT) {
      return null;
    }
    return (
      <BattleText
        text={`hey man! It looks like a ${enemyPokemon?.name}`}
        button={false}
        setRound={setRound}
        round={round}
      />
    );
  };
  return (
    <section className="container-battlefield">
      {currentPokemon && (
        <UserPokemonBattle
          userPokemon={currentPokemon}
          setDamage={setDamage}
          setChange={setChange}
        />
      )}
      {enemyPokemon && <EnemyPokemon enemyPokemon={enemyPokemon} />}
      {animationTime && <span className="hp-animation">-{damage}</span>}
      {currentPokemon && (
        <div className="user-battle">
          {getBattleText()}
          {menuChoice === BattleMenu.FIGHT && !isCatching?.isSucces && (
            <BoxAttacks
              userPokemon={currentPokemon}
              setDamage={setDamage}
              setChange={setChange}
            />
          )}
          {menuChoice === BattleMenu.SWITCH && (
            <SwitchBox setMenuChoice={setMenuChoice} />
          )}
          {menuChoice === BattleMenu.BAG && (
            <BattleBag setMenuChoice={setMenuChoice} />
          )}
          <UserBattleMenu setMenuChoice={setMenuChoice} />
          {newLevel && <NewLevel pokemon={currentPokemon} />}
        </div>
      )}
    </section>
  );
};

export default Battlefield;
