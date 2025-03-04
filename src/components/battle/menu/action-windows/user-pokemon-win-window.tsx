import { useModal } from "@/components/providers/modal-provider";
import { Button } from "@/components/ui/primitives/button";
import { locationData } from "@/data/locations/location-data";
import { useCurrentUser } from "@/hooks/use-current-user";
import {
  canChangeArea,
  changeArea,
  MAX_AREA_CHANGES,
} from "@/store/battle/actions/battle-pokemon-actions";
import { useBattleStore } from "@/store/battle/battle-store";
import { AreaNumber } from "@/types/location";
import { capitalize } from "@/utils/string";
import AreaChangeModal from "../../modals/area-change-modal";
import { ArrowLeft, ArrowRight } from "lucide-react";

const UserPokemonWinWindow = () => {
  const { data: user } = useCurrentUser();
  const { enemyPokemon, userPokemon, gainedExp, init } = useBattleStore();
  const { currentArea, areaChangesCounter } = init;
  const { showModal } = useModal();

  if (!userPokemon || !enemyPokemon) return null;

  const allowAreaChange = canChangeArea();
  // check if there is next/prev area
  const hasNextArea = currentArea < 4;
  const hasPrevArea = currentArea > 1;

  const isLateEvening = user?.partOfDay === 2;

  const handleAreaChange = (offset: number) => {
    // if user does not have enough actions to next battle, show modal
    if (!allowAreaChange) {
      showModal({
        variant: "secondary",
        title: isLateEvening ? "It's late enough" : "Continue exploring?",
        children: (
          <AreaChangeModal
            isLate={isLateEvening}
            onContinue={(offset) => {
              const success = changeArea(offset);
              if (!success) {
                console.error("Failed to change area with offset:", offset);
              }
            }}
            areaOffset={offset}
          />
        ),
      });
      return;
    }

    // move to next part of area
    changeArea(offset);
  };

  return (
    <div className="grid place-items-center text-battle-text">
      <div className="flex flex-col items-center gap-4">
        <div className="flex flex-col">
          <p className="font-medium">{`${capitalize(userPokemon.name)} defeated ${capitalize(enemyPokemon.name)}!`}</p>
          <p>{`${capitalize(userPokemon.name)} gained ${gainedExp} exp.`}</p>
        </div>

        <div className="grid grid-cols-3 gap-2">
          {/* Tlačítko pro postup vpřed */}
          <Button
            variant="battle"
            onClick={() => handleAreaChange(1)}
            className={`w-full ${!hasNextArea ? "cursor-not-allowed bg-destructive/60" : "bg-amber-300/50"}`}
            disabled={!hasNextArea}
            leftIcon={<ArrowLeft className="h-4 w-4" />}
          >
            <span className="whitespace-nowrap"> Go further</span>
          </Button>

          {/* Tlačítko pro setrvání v oblasti */}
          <Button
            variant="battle"
            border={true}
            onClick={() => handleAreaChange(0)}
            className="w-full"
          >
            <span> Stay here</span>
          </Button>

          {/* Tlačítko pro návrat zpět */}
          <Button
            variant="battle"
            onClick={() => handleAreaChange(-1)}
            className={`w-full ${!hasPrevArea ? "cursor-not-allowed bg-destructive/60" : "bg-amber-300/50"}`}
            disabled={!hasPrevArea}
            rightIcon={<ArrowRight className="h-4 w-4" />}
          >
            <span className="whitespace-nowrap"> Go back</span>
          </Button>
        </div>
      </div>
    </div>
  );
};

export default UserPokemonWinWindow;

/*

 <div className="grid place-items-center">
      <div className="flex flex-col items-center gap-2">
        <div className="flex flex-col items-center">
          <p>{`${capitalize(enemyPokemon.name)} is not possible to fight.`}</p>
          <p>{`${capitalize(userPokemon.name)} gained ${gainedExp} exp.`}</p>
        </div>
        <div className="flex gap-2">
          <Button
            size="full"
            variant="light"
            border={true}
            className="px-4 py-1"
            onClick={nextArea}
          >
            Continue
          </Button>
          <Button size="full" variant="light" border={true} className="px-4 py-1">
            Go Back
          </Button>
        </div>
      </div>
    </div>
  );
*/
