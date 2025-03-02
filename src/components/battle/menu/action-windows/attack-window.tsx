import { useBattleStore } from "@/store/battle/battle-store";
import { Button } from "@/components/ui/primitives/button";
import { AttackKey, ATTACKS } from "@/data/pokemons/attacks-data";
import { type Attack } from "@/types/attack";
import { setUserAttackAnimation } from "@/store/battle/actions/battle-animations";
import { useRef } from "react";
import Cooldown, { CooldownHandle } from "../../cooldown";
import { useUserPokemonAttack } from "@/hooks/battle/use-user-pokemon-attack";
import { setUserPokemonAttack } from "@/store/battle/actions/battle-attacks-state";
import { capitalize } from "@/utils/string";
import { useHandleRest } from "@/hooks/battle/use-handle-rest";

const AttackWindow = () => {
  const { performAttack, isLoading } = useUserPokemonAttack();
  const { handleRest } = useHandleRest();
  const { userPokemon, isCooldown } = useBattleStore();
  const cooldownRef = useRef<CooldownHandle>(null);
  const pokemonAttacks = userPokemon?.attacks.map((attackName) => ATTACKS[attackName as AttackKey]);
  if (!userPokemon || !pokemonAttacks) return null;

  const handleAttackClick = (attack: Attack) => {
    const isEnoughEnergy = userPokemon?.currentEnergy >= attack.energyCost;
    if (!isEnoughEnergy) return null;
    console.log(`${userPokemon.name} used ${attack.name}`);
    setUserAttackAnimation(attack.img);
    setUserPokemonAttack(attack);
    cooldownRef.current?.startCooldown(attack.recoveryTime);
    performAttack();
  };

  const handleRestClick = () => {
    cooldownRef.current?.startCooldown(5);
    handleRest();
  };

  return (
    <section className="relative grid gap-0.5">
      <div className="grid w-full grid-cols-2 gap-0.5">
        {pokemonAttacks.map((attack) => (
          <Button
            size="full"
            variant="battle"
            border={true}
            key={attack.name}
            disabled={isCooldown}
            onClick={() => handleAttackClick(attack)}
          >
            {attack.energyCost > userPokemon.currentEnergy
              ? "Lack of energy"
              : capitalize(attack.name)}
          </Button>
        ))}
      </div>
      <div className="grid grid-cols-2 gap-0.5">
        {/* Rest a Avoid buttony */}
        <Button
          size="full"
          variant="battle"
          border={true}
          disabled={isCooldown}
          onClick={handleRestClick}
        >
          Rest
        </Button>

        <Button
          size="full"
          variant="battle"
          border={true}
          disabled={isCooldown}
          onClick={() => {
            // Logika pro avoid
          }}
        >
          Avoid
        </Button>
      </div>
      <Cooldown ref={cooldownRef} pokemonSpeed={userPokemon.speed} />
    </section>
  );
};

export default AttackWindow;
