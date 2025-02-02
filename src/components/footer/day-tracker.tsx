import { Button } from "@/components/ui/primitives/button";
import { cn } from "@/utils/cn";
import { icons } from "@/images/icons/icons";
import Image from "next/image";

interface DayTrackerProps {
  isOpen: boolean;
  onToggle: () => void;
}

export function DayTracker({ isOpen, onToggle }: DayTrackerProps) {
  return (
    <Button variant="basic" size="icon" onClick={onToggle} className="absolute mb-2">
      <Image
        className={cn("hourglass", isOpen && "is-active")}
        src={icons.hourglass.src}
        alt={icons.hourglass.alt}
        width={icons.hourglass.size}
      />
    </Button>
  );
}
