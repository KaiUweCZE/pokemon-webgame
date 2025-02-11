import Expander from "@/components/ui/primitives/expander";
import { X } from "lucide-react";

interface BattleSwitchProps {
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
}

const BattleSwitch = ({ isOpen, setIsOpen }: BattleSwitchProps) => {
  return (
    <div className="absolute bottom-0 w-full">
      <Expander isOpen={isOpen}>
        <div className="h-64 rounded-t-sm border-2 border-b-0 border-slate-800/20 bg-content/90 p-2 backdrop-blur-sm">
          <X
            className="absolute right-0 top-0 h-4 w-4 cursor-pointer bg-content-secondary"
            onClick={() => setIsOpen(false)}
          />
          <p>Switch Pokemon</p>
        </div>
      </Expander>
    </div>
  );
};
export default BattleSwitch;
