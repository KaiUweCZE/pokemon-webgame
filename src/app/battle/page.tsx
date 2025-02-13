"use client";
import BattleContainer from "@/components/battle/container/battle-container";
import BattleMenu from "@/components/battle/menu/battle-menu";
import { useModal } from "@/components/providers/modal-provider";
import { useBattleStore } from "@/store/battle/battle-store";
import "@/styles/battle-styles.css";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

const BattlePage = () => {
  const router = useRouter();
  const { userPokemon, enemyPokemon, battleInit } = useBattleStore();
  const { showModal } = useModal();

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
    console.log("User pokemon: ", userPokemon);
    console.log("Enemy pokemon: ", enemyPokemon);
    return null;
  }
  return (
    <div className="absolute inset-0 z-0 grid h-screen">
      <div className="large-width mx-auto grid">
        <main className="battle-window mx-auto mt-36 rounded-sm border shadow-primary">
          <BattleContainer enemyPokemon={enemyPokemon} userPokemon={userPokemon} />
          <BattleMenu />
        </main>
      </div>
    </div>
  );
};

export default BattlePage;
