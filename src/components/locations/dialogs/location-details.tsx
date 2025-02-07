import { Button } from "@/components/ui/primitives/button";
import { Card } from "@/components/ui/primitives/card";
import { locationData } from "@/data/locations/location-data";
import { LocationName } from "@/types/location";
import { CompassIcon, MapIcon } from "lucide-react";

interface LocationDetailsProps {
  location: LocationName;
  currentLocation?: LocationName;
  partOfDay: number;
  isLoading: boolean;
  onTravel: (location: LocationName) => Promise<void>;
}

export const LocationDetails = ({
  location,
  currentLocation,
  partOfDay,
  isLoading,
  onTravel,
}: LocationDetailsProps) => {
  const info = locationData[location];
  const isCurrentLoc = location === currentLocation;

  return (
    <Card variant="basic" size="fit" className="relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-primary/40 to-primary-dark/60 backdrop-blur-sm" />
      <div className="relative z-10 p-6">
        <div className="mb-6 flex items-center justify-between">
          <h3 className="text-2xl font-bold text-amber-200">{info.name}</h3>
          <div className="rounded-full bg-amber-400/10 px-3 py-1 text-sm text-amber-100">
            {isCurrentLoc ? "Current Location" : "New Destination"}
          </div>
        </div>

        <p className="mb-6 text-amber-50/90">{info.description}</p>

        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2 text-sm text-amber-200/70">
            <CompassIcon className="h-4 w-4" />
            <span>Connected to: {info.neighborhood.join(", ")}</span>
          </div>

          {!isCurrentLoc && (
            <Button
              variant="light"
              onClick={() => onTravel(location)}
              disabled={isLoading || partOfDay >= 2}
              leftIcon={<MapIcon className="h-5 w-5" />}
            >
              {isLoading
                ? "Preparing for journey..."
                : partOfDay >= 2
                  ? "You can't travel anymore today"
                  : "Set Out on Journey"}
            </Button>
          )}
        </div>
      </div>
    </Card>
  );
};
