import { Button } from "@/components/ui/primitives/button";
import { useDay } from "@/hooks/use-day";
import { useModal } from "@/components/providers/modal-provider";
import { prepareNextPartOfDay } from "@/store/battle/actions/battle-pokemon-actions";

interface AreaChangeModalProps {
  isLate: boolean;
  onContinue: (offset: number) => void; // Callback to continue in next area
  areaOffset: number;
}

const AreaChangeModal = ({ isLate, onContinue, areaOffset }: AreaChangeModalProps) => {
  const { spentPartOfDay } = useDay();
  const { hideModal } = useModal();

  // it's too late to continue exploring
  if (isLate) {
    return (
      <div className="flex flex-col items-center gap-4">
        <p className="text-center text-amber-100">
          It's too late to continue exploring. Wait until the next day.
        </p>
        <Button variant="outline" onClick={() => hideModal()}>
          <span>Close</span>
        </Button>
      </div>
    );
  }

  // next part of day
  return (
    <div className="flex flex-col items-center gap-4">
      <p className="text-center text-amber-100">
        You've explored this area enough for now. Moving forward will advance the time of day.
      </p>
      <div className="flex gap-2">
        <Button
          variant="light"
          border={true}
          onClick={() => {
            // next part of day
            spentPartOfDay();
            hideModal();

            // reset counter
            setTimeout(() => {
              prepareNextPartOfDay();
              onContinue(areaOffset);
            }, 500);
          }}
        >
          Continue and advance time
        </Button>
        <Button variant="outline" onClick={() => hideModal()}>
          Close
        </Button>
      </div>
    </div>
  );
};

export default AreaChangeModal;
