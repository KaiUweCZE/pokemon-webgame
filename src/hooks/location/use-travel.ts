import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useCurrentUser } from "../use-current-user";
import { goToLocation } from "@/app/location/action";
import { LocationName } from "@/types/location";
import { useToast } from "@/components/providers/toast-provider";
import { useLocationStore } from "@/store/location-store";
import { capitalize } from "@/utils/string";

interface TravelResponse {
  success: boolean;
  message: string;
  data: {
    newLocation: LocationName;
    newPartOfDay: number;
  };
}

export const useTravel = () => {
  const queryClient = useQueryClient();
  const { setActionInProgress, setLocationChanging } = useLocationStore();
  const { showToast } = useToast();

  const travelMutation = useMutation<TravelResponse, Error, LocationName>({
    mutationFn: goToLocation,
    onMutate: () => {
      setActionInProgress(true);
      setLocationChanging(true);
    },
    onSuccess: (response) => {
      queryClient.invalidateQueries({ queryKey: ["current-user"] });
      showToast(`You went to ${capitalize(response.data.newLocation)}`, "success");
    },
    onError: (error) => {
      setLocationChanging(false);
      showToast(error.message, "error", { headline: "Travel failed" });
    },
    onSettled: () => {
      setActionInProgress(false);
    },
  });

  const handleTravel = async (location: LocationName) => {
    try {
      travelMutation.mutateAsync(location);
      return true;
    } catch (error) {
      return false;
    }
  };

  return {
    travel: handleTravel,
    isLoading: travelMutation.isPending,
  };
};
