import { pokemonsImg } from "@/images";
import { Pokemon, PokemonName } from "@/types/pokemon";
import Image from "next/image";
import { capitalize } from "@/utils/string";
import ElementType from "../ui/primitives/element-type";
import BarBox from "./bar-box";
import { cn } from "@/utils/cn";
import { Button } from "../ui/primitives/button";
import { useAddToTeam } from "@/hooks/profile/use-add-to-team";
import { useRemoveFromTeam } from "@/hooks/profile/use-remove-from-team";
import { Loader2Icon } from "lucide-react";
import LottieChecker from "../lotties/lottie-checker";
import { useEffect, useRef, useState } from "react";
import { useBattleStore } from "@/store/battle/battle-store";

interface ProfilePokemonCardProps {
  pokemon: Pokemon;
}
const ProfilePokemonCard = ({ pokemon }: ProfilePokemonCardProps) => {
  const pokemonImg = pokemonsImg[pokemon.name as PokemonName].default;
  const { userPokemonSix } = useBattleStore();
  const { addToTeam, isAdding } = useAddToTeam();
  const { removePokemon, isRemoving } = useRemoveFromTeam();

  const isActive = userPokemonSix.some((p) => p.id === pokemon.id);

  return (
    <div className="relative">
      {isActive && (
        <div className="lottie-checker-container z-10">
          <LottieChecker isActive={isActive} className="h-10 w-10" />
        </div>
      )}
      <div
        className={cn(
          "grid h-fit w-full overflow-hidden rounded-sm bg-[#554A70] p-4 shadow-primary",
          isActive &&
            "profile-card-active outline-1 outline-offset-0 outline-emerald-600 before:bg-emerald-600 after:bg-emerald-600"
        )}
      >
        {isActive && (
          <>
            <div className="border-top absolute bg-emerald-600"></div>
            <div className="border-bottom absolute bg-emerald-600"></div>
          </>
        )}

        <Image
          className="profile-pokemon-img"
          src={pokemonImg.src}
          alt={pokemonImg.alt}
          width={80}
          height={80}
        />
        <div className="relative grid gap-2">
          <div className="flex flex-col">
            <h3 className="text-slate-100">
              {capitalize(pokemon.name)} lvl.{pokemon.level}
            </h3>
            <div className="flex items-center gap-1">
              {pokemon.types.map((type) => (
                <ElementType key={type} variant={type} />
              ))}
            </div>
          </div>
          <BarBox
            actualHp={pokemon.currentHp}
            maxHp={pokemon.maxHp}
            actualEnergy={pokemon.currentEnergy}
            maxEnergy={pokemon.maxEnergy}
            actualExp={pokemon.currentExp}
            expToNextLevel={pokemon.expToNextLevel}
          />
          {/*buttons */}
          {pokemon.isActive ? (
            <Button
              variant="destructive"
              size="full"
              disabled={isAdding || isRemoving}
              leftIcon={isRemoving && <Loader2Icon className="h-4 w-4 animate-spin" />}
              onClick={() => removePokemon(pokemon.id)}
            >
              <span>{isRemoving ? "Removing" : "Remove"}</span>
            </Button>
          ) : (
            <Button
              variant="success"
              size="full"
              disabled={isAdding || isRemoving}
              leftIcon={isAdding && <Loader2Icon className="h-4 w-4 animate-spin" />}
              onClick={() => addToTeam(pokemon)}
            >
              <span>{isAdding ? "Adding" : "Add"}</span>
            </Button>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProfilePokemonCard;
