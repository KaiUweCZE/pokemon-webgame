import { Button } from "@/components/ui/primitives/button";
import { setBattleStatus, setMenuSection } from "@/store/battle/actions/battle-state";

const RunWindow = () => {
  return (
    <div className="grid place-items-center">
      <div>
        <p className="text-slate-800">Do you want to leave the fight?</p>

        <div className="flex gap-2">
          <Button
            size="full"
            variant="battle"
            border={true}
            onClick={() => {
              setBattleStatus("enemy-victory");
              setMenuSection("main");
            }}
          >
            <span className="text-battle-text">Yes</span>
          </Button>

          <Button
            size="full"
            variant="battle"
            border={true}
            onClick={() => {
              setBattleStatus("in-progress");
              setMenuSection("main");
            }}
          >
            <span className="text-battle-text">No</span>
          </Button>
        </div>
      </div>
    </div>
  );
};

export default RunWindow;
