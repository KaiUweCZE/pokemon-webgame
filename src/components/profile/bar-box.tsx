import { cn } from "@/utils/cn";
import { Bar, type LabelPosition } from "../ui/primitives/bar";

interface BarBoxProps {
  actualHp: number;
  maxHp: number;
  actualEnergy: number;
  maxEnergy: number;
  actualExp: number;
  expToNextLevel: number;
}

const BarBox = ({
  actualHp,
  maxHp,
  actualEnergy,
  maxEnergy,
  actualExp,
  expToNextLevel,
}: BarBoxProps) => {
  return (
    <div className="grid gap-1">
      <Bar
        variant="hp"
        height="sm"
        actualValue={30}
        maxValue={maxHp}
        label
        lowThreshold={50}
        showValues
      />
      <Bar
        variant="energy"
        height="sm"
        actualValue={actualEnergy}
        maxValue={maxEnergy}
        label
        lowThreshold={25}
        showValues
      />
      <Bar
        variant="exp"
        height="sm"
        actualValue={actualExp}
        maxValue={expToNextLevel}
        label
        showValues
      />
    </div>
  );
};

export default BarBox;
