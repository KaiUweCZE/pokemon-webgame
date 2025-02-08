import { Button } from "@/components/ui/primitives/button";
import { LocationData } from "@/data/locations/location-data";
import { LocationName } from "@/types/location";

interface LocationPreviewCardProps {
  location: LocationName;
  info: LocationData;
  isCurrentLocation: boolean;
  onSelect: (location: LocationName) => void;
}

const LocationPreview = ({
  location,
  info,
  isCurrentLocation,
  onSelect,
}: LocationPreviewCardProps) => (
  <Button
    onClick={() => onSelect(location)}
    variant="outline"
    size="lg"
    className="relative h-32 overflow-hidden p-4"
  >
    <div className="absolute inset-0 bg-gradient-to-br from-primary/40 to-primary-dark/60" />
    <div className="relative z-10 flex h-full flex-col items-start justify-between">
      <div>
        <h4 className="text-lg font-medium text-amber-200">{info.name}</h4>
        <p className="mt-1 line-clamp-2 text-sm text-amber-100/70">{info.description}</p>
      </div>
      {isCurrentLocation && (
        <span className="rounded-full bg-amber-400/10 px-2 py-1 text-xs text-amber-100">
          Current Location
        </span>
      )}
    </div>
  </Button>
);

export default LocationPreview;
