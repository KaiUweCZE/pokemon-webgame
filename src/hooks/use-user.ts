// hooks/useUser.ts
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useCurrentUser } from "./use-current-user";
import { User, UserUpdate, Location, ItemType } from "@/types/user";
import { updateUser, updateLocation, updateInventory } from "@/app/actions/user-actions";

export function useUser() {
  const queryClient = useQueryClient();
  const { data: user, isLoading, error } = useCurrentUser();

  const userMutation = useMutation({
    mutationFn: (updates: UserUpdate) => {
      if (!user?.id) throw new Error("No user ID");
      return updateUser(user.id, updates);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["current-user"] });
    },
  });

  const locationMutation = useMutation({
    mutationFn: ({ location }: { location: Location }) => {
      if (!user?.id) throw new Error("No user ID");
      return updateLocation(user.id, location);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["current-user"] });
    },
  });

  const inventoryMutation = useMutation({
    mutationFn: ({ itemType, quantity }: { itemType: ItemType; quantity: number }) => {
      if (!user?.id) throw new Error("No user ID");
      return updateInventory(user.id, itemType, quantity);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["current-user"] });
    },
  });

  return {
    user,
    isLoading,
    error,
    updateUser: userMutation.mutate,
    updateLocation: locationMutation.mutate,
    updateInventory: inventoryMutation.mutate,
    isUpdating: userMutation.isPending || locationMutation.isPending || inventoryMutation.isPending,
  };
}
