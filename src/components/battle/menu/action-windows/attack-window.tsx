// components/battle/menu/actions/attack-actions.tsx
import { useBattleStore } from "@/store/battle-store";
import { Button } from "@/components/ui/primitives/button";

const AttackWindow = () => {
  const { userPokemon, setMenuSection } = useBattleStore();

  if (!userPokemon) return null;

  // Vytvoříme grid 2x3 pro 6 tlačítek
  return (
    <div className="grid grid-cols-2 gap-2">
      {/* Mapujeme první 4 útoky pokémona */}
      {userPokemon.attacks.slice(0, 4).map((attack) => (
        <Button
          key={attack}
          size="full"
          className="h-16"
          disabled={userPokemon.attackCooldowns?.[attack] > 0}
          onClick={() => {
            // Tady přijde logika pro útok
          }}
        >
          {attack}
        </Button>
      ))}

      {/* Rest a Avoid buttony */}
      <Button
        size="full"
        className="h-16"
        onClick={() => {
          // Logika pro rest
        }}
      >
        Rest
      </Button>

      <Button
        size="full"
        className="h-16"
        onClick={() => {
          // Logika pro avoid
        }}
      >
        Avoid
      </Button>
    </div>
  );
};

export default AttackWindow;
