import { pokemonsImg } from "@/images";
import "@/styles/battle-styles.css";

const BattlePage = () => {
  const enemyImage = pokemonsImg["pikachu"].default;
  const playerImage = pokemonsImg["charizard"].default;
  return (
    <div className="absolute inset-0 z-0 grid h-screen">
      <div className="large-width mx-auto grid">
        <main className="battle-window mx-auto mt-36 rounded-sm border shadow-primary">
          <section className="battle-container bg-amber-300">
            <div className="enemy-box bg-sky-600">
              <div className="enemy-stats bg-sky-100"></div>
              <div className="enemy-image bg-sky-100"></div>
            </div>
            <div className="player-box bg-emerald-600">
              <div className="player-stats bg-emerald-100"></div>
              <div className="player-image bg-emerald-100"></div>
            </div>
          </section>
          <section className="battle-menu bg-purple-400">
            <div className="bg-red-600"></div>
            <div className="bg-teal-700"></div>
          </section>
        </main>
      </div>
    </div>
  );
};

export default BattlePage;
