import { useBattleStore } from "@/store/battle-store";
import { Button } from "@/components/ui/primitives/button";

const RunWindow = () => {
  const { setBattleStatus, setMenuSection } = useBattleStore();

  return (
    <div className="grid gap-4">
      <p className="text-center text-amber-100">Do you want to leave the fight?</p>

      <div className="grid grid-cols-2 gap-4">
        <Button
          size="full"
          onClick={() => {
            // Tady přijde logika pro ukončení bitvy
            setBattleStatus("enemy-victory");
            setMenuSection("main");
          }}
        >
          Yes
        </Button>

        <Button
          size="full"
          onClick={() => {
            // Návrat do bitvy
            setBattleStatus("in-progress");
            setMenuSection("main");
          }}
        >
          No
        </Button>
      </div>
    </div>
  );
};

export default RunWindow;
