import { useBattleStore } from "@/store/battle/battle-store";
import { Button } from "@/components/ui/primitives/button";

const AttackWindow = () => {
  const { userPokemon } = useBattleStore();

  if (!userPokemon) return null;

  return (
    <section className="grid gap-0.5">
      <div className="grid w-full grid-cols-2 gap-0.5">
        {userPokemon.attacks.slice(0, 4).map((attack) => (
          <Button
            size="full"
            variant="light"
            border={true}
            key={attack}
            // disabled={userPokemon?.attackCooldowns?.[attack] > 0}
            onClick={() => {}}
          >
            {attack}
          </Button>
        ))}
      </div>
      <div className="grid grid-cols-2 gap-0.5">
        {/* Rest a Avoid buttony */}
        <Button
          size="full"
          variant="light"
          border={true}
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
          onClick={() => {
            // Logika pro avoid
          }}
        >
          avoid
        </Button>
      </div>
    </section>
  );
};

export default AttackWindow;
