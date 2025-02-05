import { useCurrentUser } from "@/hooks/use-current-user";
import { Button } from "@/components/ui/primitives/button";
import { useLocationStore } from "@/store/location-store";
import { type LocationName } from "@/types/location";

export const TravelDialog = ({ neighborhood }: { neighborhood: LocationName[] }) => {
  const { data: user } = useCurrentUser();
  const { closeDialog, setActionInProgress } = useLocationStore();

  const handleTravel = async (location: Location) => {
    try {
      setActionInProgress(true);
      // TODO: Implementace cestování
      closeDialog();
    } catch (error) {
      console.error("Travel failed:", error);
    } finally {
      setActionInProgress(false);
    }
  };

  return (
    <div className="space-y-4">
      <p className="text-amber-100">Choose your destination:</p>
      <div>
        {neighborhood.map((location) => (
          <Button
            key={location}
            onClick={() => handleTravel(location.toLowerCase() as LocationName)}
            variant="basic"
            className="w-full"
          >
            {location}
          </Button>
        ))}
      </div>
      <div className="grid grid-cols-2 gap-3">
        <Button key={""} onClick={() => handleTravel(location)} variant="basic" className="w-full">
          cooco?
        </Button>
      </div>
    </div>
  );
};
