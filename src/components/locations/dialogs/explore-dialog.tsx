// explore-dialog.tsx
import { useState } from "react";
import { DialogHeader } from "./components/dialog-header";
import { useCurrentUser } from "@/hooks/use-current-user";
import { type LocationName } from "@/types/location";
import { locationData } from "@/data/locations/location-data";
import { Button } from "@/components/ui/primitives/button";
import Image from "next/image";
import { pokemonsImg } from "@/images";
import {
  EnemyPokemon,
  Pokemon,
  PokemonName,
  PokemonStaticData,
  PokemonType,
} from "@/types/pokemon";
import { useModal } from "@/components/providers/modal-provider";
import { pokemonsData } from "@/data/pokemons/pokemon-data";
import ElementType from "@/components/ui/primitives/element-type";
import PokemonModalContent from "./components/pokemon-modal-content";
import { useRouter } from "next/navigation";
import { useBattleStore } from "@/store/battle/battle-store";
import { initBattle, setBattleStatus } from "@/store/battle/actions/battle-state";
import {
  setEnemyPokemon,
  setUserPokemon,
  setUserPokemonSix,
} from "@/store/battle/actions/battle-pokemon-actions";

const ExploreDialog = () => {
  const { data: user } = useCurrentUser();
  const { showModal, hideModal } = useModal();
  const location = user?.location.toLowerCase() as LocationName;
  const areas = locationData[location].areas;
  const router = useRouter();
  //const { initBattle, setUserPokemon, setEnemyPokemon } = useBattleStore();

  const handleModal = (pokemonName: PokemonName) => {
    const pokemon = pokemonsData.find((p) => p.name === pokemonName);
    if (pokemon) {
      showModal({
        variant: "secondary",
        children: <PokemonModalContent pokemon={pokemon} />,
      });
    }
  };

  // get pokemon image
  const getPokemonIcon = (pokemonName: PokemonName) => {
    return pokemonsImg[pokemonName]?.default.src || "";
  };

  // handle explore area
  const handleExplore = () => {
    if (!user?.location || !user?.pokemons[0]) return;

    const userPokemon = user.pokemons[0];
    const userPokemons = user.pokemons.filter((pokemon) => pokemon.isActive && pokemon);
    const location = user.location as LocationName;

    // init battle
    initBattle(location);
    setUserPokemon(userPokemon);
    setUserPokemonSix(userPokemons);

    // create wild pokemon
    const wildPokemon: EnemyPokemon = {
      name: "pikachu",
      types: ["electric"],
      level: 10,
      attacks: ["tackle", "thundershock"],
      shiny: false,
      abilities: ["static"],
      currentHp: 40,
      maxHp: 100,
      currentEnergy: 40,
      maxEnergy: 100,
      damage: 10,
      defense: 8,
      speed: 15,
      statusEffects: [],
      image: pokemonsImg["pikachu"],
    };

    setEnemyPokemon(wildPokemon);
    setBattleStatus("not-started");

    console.log("wildPokemon", wildPokemon);

    router.push("/battle?from=explore");
  };

  return (
    <div className="grid gap-4">
      <DialogHeader title="Explore Area" />

      {/* About area*/}
      <div className="grid gap-4 rounded-lg border border-element/20 bg-primary/5 p-4">
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-medium text-primary-text">Area 1</h3>
          <span className="text-sm text-secondary-text">
            Level {areas[1].min} - {areas[1].max}
          </span>
        </div>

        {/* Available Pokémon */}
        <div className="grid gap-2">
          <h4 className="text-sm font-medium text-secondary-text">Available Pokémon:</h4>
          <div className="grid grid-cols-4 gap-2">
            {areas[1].pokemons.map((pokemon) => (
              <div
                key={pokemon}
                className="flex items-center gap-2 rounded-sm bg-amber-50/5 p-2"
                onClick={() => handleModal(pokemon)}
              >
                <Image
                  src={getPokemonIcon(pokemon)}
                  alt={pokemon}
                  width={24}
                  height={24}
                  className="object-contain"
                />
                <span className="text-sm capitalize text-primary-text">{pokemon}</span>
              </div>
            ))}
          </div>
        </div>
        <Button onClick={handleExplore} className="w-full" variant="outline">
          Explore Area
        </Button>
      </div>
    </div>
  );
};

export default ExploreDialog;
