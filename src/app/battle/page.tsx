"use client";
import BattleContainer from "@/components/battle/container/battle-container";
import BattleMenu from "@/components/battle/menu/battle-menu";
import { useModal } from "@/components/providers/modal-provider";
import { useBattleState, useBattleStore } from "@/store/battle/battle-store";
import "@/styles/battle-styles.css";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

const BattlePage = () => {
  const router = useRouter();
  const { userPokemon, enemyPokemon, battleInit, battleStatus } = useBattleStore();
  const { showModal } = useModal();
  useBattleState();

  useEffect(() => {
    // redirect invalid access
    if (!battleInit.isValid) {
      showModal({
        variant: "secondary",
        title: "Invalid access",
        description:
          "You can only enter battles through the Explore menu in your current location.",
      });

      router.replace("/location");
    }
  }, [battleInit.isValid, router]);

  if (!battleInit.isValid || !userPokemon || !enemyPokemon) {
    return null;
  }
  return (
    <div className="absolute inset-0 z-0 grid h-screen">
      <div className="large-width mx-auto grid">
        {/*battle status visualization for debugging*/}
        <span className="absolute top-24 text-3xl font-semibold text-slate-800">
          {battleStatus}
        </span>

        <main className="battle-window mx-auto mt-36 rounded-sm border shadow-primary">
          <BattleContainer enemyPokemon={enemyPokemon} userPokemon={userPokemon} />
          <BattleMenu />
        </main>
      </div>
    </div>
  );
};

export default BattlePage;
