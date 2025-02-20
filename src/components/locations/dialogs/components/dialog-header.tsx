import { Button } from "@/components/ui/primitives/button";
import { LocationName } from "@/types/location";
import { ArrowLeftIcon } from "lucide-react";

interface DialogHeaderProps {
  title: string;
  rightContent?: React.ReactNode;
  onBack?: () => void;
  selectedLocation?: LocationName | null;
}

export const DialogHeader = ({
  title,
  rightContent,
  onBack,
  selectedLocation,
}: DialogHeaderProps) => {
  return (
    <header className="flex items-center justify-between">
      <div className="flex items-center gap-2">
        {selectedLocation && onBack && (
          <Button
            variant="basic"
            size="sm"
            onClick={onBack}
            className="text-amber-100"
            leftIcon={<ArrowLeftIcon className="h-4 w-4 text-amber-100" />}
          >
            Back
          </Button>
        )}
        {!selectedLocation && <p className="text-lg font-medium text-amber-100">{title}</p>}
      </div>
      {rightContent}
    </header>
  );
};
