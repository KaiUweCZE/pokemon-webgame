import { useBattleStore } from "@/store/battle/battle-store";
import { Button } from "@/components/ui/primitives/button";
import { AttackKey, ATTACKS } from "@/data/pokemons/attacks-data";
import { type Attack } from "@/types/attack";
import { setUserAttackAnimation } from "@/store/battle/actions/battle-animations";
import { useRef } from "react";
import Cooldown, { CooldownHandle } from "../../cooldown";

const AttackWindow = () => {
  const { userPokemon, isCooldown } = useBattleStore();
  const cooldownRef = useRef<CooldownHandle>(null);
  const pokemonAttacks = userPokemon?.attacks.map((attackName) => ATTACKS[attackName as AttackKey]);
  if (!userPokemon || !pokemonAttacks) return null;

  const handleAttackClick = (attack: Attack) => {
    console.log(`${userPokemon.name} used ${attack.name}`);
    setUserAttackAnimation(attack.img);
    cooldownRef.current?.startCooldown(attack.recoveryTime);
  };

  return (
    <section className="relative grid gap-0.5">
      <div className="grid w-full grid-cols-2 gap-0.5">
        {pokemonAttacks.map((attack) => (
          <Button
            size="full"
            variant="light"
            border={true}
            key={attack.name}
            disabled={isCooldown}
            onClick={() => handleAttackClick(attack)}
          >
            {attack.name}
          </Button>
        ))}
      </div>
      <div className="grid grid-cols-2 gap-0.5">
        {/* Rest a Avoid buttony */}
        <Button
          size="full"
          variant="light"
          border={true}
          disabled={isCooldown}
          onClick={() => {
            // Logika pro rest
          }}
        >
          rest
        </Button>

        <Button
          size="full"
          variant="light"
          border={true}
          disabled={isCooldown}
          onClick={() => {
            // Logika pro avoid
          }}
        >
          avoid
        </Button>
      </div>
      <Cooldown ref={cooldownRef} pokemonSpeed={userPokemon.speed} />
    </section>
  );
};

export default AttackWindow;
