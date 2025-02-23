"use client";
import { Store } from "@tanstack/store";
import { useStore } from "@tanstack/react-store";
import { LocationData } from "@/data/locations/location-data";
import { ItemCategory } from "@/types/item";

export type LocationMenu = "travel" | "pokecenter" | "shop" | "explore" | "talk";

interface LocationStore {
  activeDialogId: LocationMenu | null;
  isActionInProgress: boolean;
  isLocationChanging: boolean;
  locationData: LocationData | null;
  shopFilter: ItemCategory | null;
}

const locationStore = new Store<LocationStore>({
  activeDialogId: null,
  isActionInProgress: false,
  isLocationChanging: false,
  locationData: null,
  shopFilter: null,
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

export const setLocationData = (data: LocationData | null) => {
  locationStore.setState((state) => ({
    ...state,
    locationData: data,
  }));
};

export const setShopFilter = (filter: ItemCategory | null) => {
  locationStore.setState((state) => ({
    ...state,
    shopFilter: filter,
  }));
};

export const useLocationStore = () => {
  const state = useStore(locationStore);

  return {
    ...state,
    locationData: state.locationData,
    shopFilter: state.shopFilter,
    openDialog,
    closeDialog,
    setActionInProgress,
    setLocationChanging,
  };
};
