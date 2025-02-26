import Dialog from "./components/dialog";
import { useLocationStore } from "@/store/location-store";
import { TravelDialog } from "./travel-dialog";

import { LocationData } from "@/data/locations/location-data";
import ExploreDialog from "./explore-dialog";
import ShopDialog from "./shop-dialog";
import TalkDialog from "./talk-dialog";
import PokecenterDialog from "./pokecenter-dialog";

const LocationDialogs = ({ location }: { location: LocationData }) => {
  const { activeDialogId, closeDialog, locationData } = useLocationStore();

  if (!activeDialogId || !locationData) return null;
  const locationActions = locationData.LocationActions;
  const neighborhood = locationData.neighborhood;
  const itemNames = locationData.shopItems;

  const dialogContent = {
    travel: (
      <>{locationActions.includes("travel") && <TravelDialog neighborhood={neighborhood} />}</>
    ),
    pokecenter: <>{locationActions.includes("pokecenter") && <PokecenterDialog />}</>,
    shop: (
      <>{locationActions.includes("shop") && itemNames && <ShopDialog itemNames={itemNames} />}</>
    ),
    explore: <>{locationActions.includes("explore") && <ExploreDialog />}</>,
    talk: <>{locationActions.includes("talk") && <TalkDialog />}</>,
  };

  return (
    <Dialog open={!!activeDialogId} onClose={closeDialog} className="location-dialog">
      {dialogContent[activeDialogId]}
    </Dialog>
  );
};

export default LocationDialogs;
