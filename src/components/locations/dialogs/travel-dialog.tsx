import { useState } from "react";
import { useCurrentUser } from "@/hooks/use-current-user";
import { type LocationName } from "@/types/location";
import { useTravel } from "@/hooks/location/use-travel";
import { locationData } from "@/data/locations/location-data";
import { DialogHeader } from "./components/dialog-header";
import { PartsOfDayCounter } from "./components/parts-of-day-counter";
import { LocationDetails } from "./components/location-details";
import LocationPreview from "./components/location-preview";
import { useToast } from "@/components/providers/toast-provider";
import { useLocationStore } from "@/store/location-store";

export const TravelDialog = ({ neighborhood }: { neighborhood: LocationName[] }) => {
  const [selectedLocation, setSelectedLocation] = useState<LocationName | null>(null);
  const { data: user } = useCurrentUser();
  const { travel, isLoading } = useTravel();
  const { showToast } = useToast();
  const { closeDialog } = useLocationStore();

  const handleTravel = async (location: LocationName) => {
    if (user && user?.partOfDay >= 2) {
      showToast("You can't travel anymore today", "error");
      return;
    }
    const success = await travel(location);
    if (success) {
      closeDialog();
    }
  };

  return (
    <div className="grid gap-4 p-4">
      <DialogHeader
        title="Available Destinations"
        rightContent={<PartsOfDayCounter current={user?.partOfDay || 0} />}
        onBack={() => setSelectedLocation(null)}
        selectedLocation={selectedLocation}
      />
      {selectedLocation && (
        <LocationDetails
          location={selectedLocation}
          currentLocation={user?.location}
          partOfDay={user?.partOfDay || 0}
          isLoading={isLoading}
          onTravel={handleTravel}
        />
      )}
      {!selectedLocation && (
        <div className="grid grid-cols-2 gap-2">
          {neighborhood.map((location) => (
            <LocationPreview
              key={location}
              location={location}
              info={locationData[location]}
              isCurrentLocation={location === user?.location}
              onSelect={setSelectedLocation}
            />
          ))}
        </div>
      )}
    </div>
  );
};
