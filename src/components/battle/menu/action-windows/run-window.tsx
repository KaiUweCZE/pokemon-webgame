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
            variant="light"
            border={true}
            onClick={() => {
              setBattleStatus("enemy-victory");
              setMenuSection("main");
            }}
          >
            Yes
          </Button>

          <Button
            size="full"
            variant="light"
            border={true}
            onClick={() => {
              setBattleStatus("in-progress");
              setMenuSection("main");
            }}
          >
            No
          </Button>
        </div>
      </div>
    </div>
  );
};

export default RunWindow;
