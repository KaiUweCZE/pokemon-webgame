import { Bar } from "@/components/ui/primitives/bar";
import { Button } from "@/components/ui/primitives/button";
import Expander from "@/components/ui/primitives/expander";
import { pokemonsImg } from "@/images";
import { setUserPokemon } from "@/store/battle/actions/battle-pokemon-actions";
import { useBattleStore } from "@/store/battle/battle-store";
import { Pokemon } from "@/types/pokemon";
import { cn } from "@/utils/cn";
import { SkullIcon, X } from "lucide-react";
import Image from "next/image";

interface BattleSwitchProps {
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
}

const BattleSwitch = ({ isOpen, setIsOpen }: BattleSwitchProps) => {
  const { userPokemonSix, userPokemon, battleStatus } = useBattleStore();
  const pokemonsWithIcons = userPokemonSix.map((pokemon) => {
    return { ...pokemon, icon: pokemonsImg[pokemon.name].icon };
  });

  const handlePokemonSwitch = (pokemon: Pokemon) => {
    setUserPokemon(pokemon);
    setIsOpen(false);
  };

  return (
    <section className="absolute bottom-0 w-full">
      <Expander isOpen={isOpen} className="h-full">
        <div className="relative rounded-t-md border-2 border-b-0 border-battle-text/30 bg-battle-accent/60 shadow-lg backdrop-blur-md">
          {/* header of switch component */}
          <header className="flex items-center justify-between border-b border-battle-accent/20 p-3">
            <h4 className="font-medium text-battle-text">Switch Pokémon</h4>
            <Button
              variant="basic"
              size="icon"
              onClick={() => setIsOpen(false)}
              className="h-6 w-6 rounded-full hover:bg-battle-accent/10"
            >
              <X className="h-4 w-4 text-battle-text/80" />
            </Button>
          </header>

          <ul className="switch-pokemon grid grid-rows-6">
            {pokemonsWithIcons.map((pokemon) => {
              const isActive = userPokemon?.id === pokemon.id;
              const isFainted = pokemon.currentHp <= 0;

              return (
                <li
                  key={pokemon.id}
                  onClick={() => !isActive && !isFainted && handlePokemonSwitch(pokemon)}
                  className={cn(
                    "relative flex items-center border-b border-battle-accent/10 pr-2",
                    /* cursores */
                    isActive
                      ? "cursor-default bg-battle-accent/20"
                      : isFainted
                        ? "cursor-not-allowed bg-red-600/30 opacity-80"
                        : "cursor-pointer hover:bg-battle-rare/30"
                  )}
                >
                  <Image
                    src={pokemon.icon.src}
                    alt={pokemon.name}
                    width={40}
                    height={40}
                    className={cn(isFainted && "opacity-70 grayscale")}
                  />

                  {/* Pokemon details section */}
                  <section className="grid flex-1">
                    <div className="flex items-center justify-between">
                      <span className="text-sm capitalize text-battle-text">
                        {pokemon.name}
                        {isActive && (
                          <span className="ml-2 text-xs text-battle-text/70">(active)</span>
                        )}
                      </span>
                      <span className="text-xs text-battle-text/70">Lv. {pokemon.level}</span>
                    </div>

                    {/*Hp bar box */}
                    <div className="flex items-center">
                      <div className="w-full">
                        <Bar
                          variant="hp"
                          height="xxs"
                          width="full"
                          actualValue={pokemon.currentHp}
                          maxValue={pokemon.maxHp}
                          animate={isActive && pokemon.currentHp < pokemon.maxHp * 0.3}
                          lowThreshold={60}
                        />
                      </div>
                      <span className="ml-2 text-xs text-battle-text/70">
                        {pokemon.currentHp}/{pokemon.maxHp}
                      </span>
                    </div>
                  </section>

                  {!isActive && !isFainted && (
                    <Button
                      size="sm"
                      variant="outline"
                      className="ml-1 border-battle-text px-2 py-1 text-xs hover:bg-battle-accent-dark/30"
                      disabled={battleStatus === "attacking"}
                    >
                      <span className="text-battle-text"> Switch </span>
                    </Button>
                  )}
                  {isFainted && (
                    <span className="ml-1 px-2 py-0.5 text-xs text-red-600">Fainted</span>
                  )}
                </li>
              );
            })}
          </ul>
        </div>
      </Expander>
    </section>
  );
};

export default BattleSwitch;
