"use client";
import { Store } from "@tanstack/store";
import { useStore } from "@tanstack/react-store";

export type LocationMenu = "travel" | "pokecenter" | "shop" | "explore" | "talk";

interface LocationStore {
  activeDialogId: LocationMenu | null;
  isActionInProgress: boolean;
  isLocationChanging: boolean;
}

const locationStore = new Store<LocationStore>({
  activeDialogId: null,
  isActionInProgress: false,
  isLocationChanging: false,
});

export const openDialog = (id: LocationMenu) => {
  locationStore.setState((state) => ({
    ...state,
    activeDialogId: id === state.activeDialogId ? null : id,
  }));
};

export const closeDialog = () => {
  locationStore.setState((state) => ({
    ...state,
    activeDialogId: null,
  }));
};

export const setActionInProgress = (inProgress: boolean) => {
  locationStore.setState((state) => ({
    ...state,
    isActionInProgress: inProgress,
  }));
};

export const setLocationChanging = (isChanging: boolean) => {
  locationStore.setState((state) => ({
    ...state,
    isLocationChanging: isChanging,
  }));
};

export const useLocationStore = () => {
  const state = useStore(locationStore);

  return {
    ...state,
    openDialog,
    closeDialog,
    setActionInProgress,
    setLocationChanging,
  };
};
