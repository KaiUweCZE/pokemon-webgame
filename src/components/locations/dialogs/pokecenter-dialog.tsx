import { useState } from "react";
import { DialogHeader } from "./components/dialog-header";
import { useCurrentUser } from "@/hooks/use-current-user";
import { Button } from "@/components/ui/primitives/button";
import { useToast } from "@/components/providers/toast-provider";
import { Card } from "@/components/ui/primitives/card";
import PokecenterPokemon from "./pokecenter-dialog/pokecenter-pokemon";
import HeartBeat from "@/components/ui/loading/heart-beat";
import { useHealSix } from "@/hooks/use-heal-six";
import { cn } from "@/utils/cn";

const PokecenterDialog = () => {
  const { data: user } = useCurrentUser();
  const [isHealed, setIsHealed] = useState(false);
  const { healSix, status, isLoading: isHealing, canHeal } = useHealSix();
  const { showToast } = useToast();

  const pokecenterText = () => {
    return "Your Pokémon need a little bit of care. Let's heal them!";
  };

  // get active pokemons
  const activePokemons =
    user?.pokemons.filter((pokemon) => user.activePokemonIds.includes(pokemon.id)) || [];

  // Count the number of pokemons that need healing
  const needsHealingCount = activePokemons.filter(
    (pokemon) => pokemon.currentHp < pokemon.maxHp || pokemon.currentEnergy < pokemon.maxEnergy
  ).length;

  // Check if all pokemons are fully healed
  const allFullHealth = needsHealingCount === 0;

  const bgByStatus = () => {
    switch (status) {
      case "success":
        return "bg-emerald-600 text-amber-50";
      case "error":
        return "bg-red-500 text-amber-50";

      default:
        return "";
    }
  };

  const handleHealPokemons = () => {
    if (allFullHealth) {
      showToast("All your Pokémon are already at full health!", "success");
      return;
    }
    healSix();
    showToast("Your Pokémon have been fully healed!", "success");
  };

  return (
    <div className="grid gap-4 p-4">
      <DialogHeader
        title="Pokémon Center"
        rightContent={
          needsHealingCount > 0 ? (
            <span className="rounded-full bg-amber-200/10 px-2 py-0.5 text-xs text-amber-200">
              {`pokemons who need healing: ${needsHealingCount}`}
            </span>
          ) : (
            <span className="rounded-full bg-emerald-500/60 px-2 py-0.5 text-xs text-green-50">
              All healthy
            </span>
          )
        }
      />

      <div className="grid gap-4">
        <section className="location-pokecenter-section gap-4">
          <Card className="w-fit min-w-48 bg-amber-100/5 p-4" variant="outline">
            {activePokemons.length > 0 && (
              <div className="grid grid-cols-2 grid-rows-3 gap-3">
                {activePokemons.map((pokemon) => (
                  <PokecenterPokemon key={pokemon.id} pokemon={pokemon} />
                ))}
              </div>
            )}
          </Card>
          <div className="w-full rounded-sm border bg-amber-100/5 p-4 text-amber-100">
            <p>{pokecenterText()}</p>
          </div>
        </section>
        {/* footer part */}
        <Button
          variant="light"
          className={cn(
            "mt-2 h-10 w-full disabled:opacity-100",
            allFullHealth && "bg-emerald-600 text-amber-50",
            bgByStatus()
          )}
          disabled={!canHeal || isHealing || allFullHealth}
          leftIcon={isHealing ? <HeartBeat className="absolute left-1/3" /> : ""}
          onClick={handleHealPokemons}
        >
          {isHealing ? (
            <span className="flex items-center gap-2">Healing Pokémon...</span>
          ) : isHealed ? (
            "All Pokémon Healed!"
          ) : allFullHealth ? (
            "All Pokémon at Full Health"
          ) : (
            "Heal All Pokémon"
          )}
        </Button>
      </div>
    </div>
  );
};

export default PokecenterDialog;
