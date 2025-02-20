import Dialog from "./components/dialog";
import { useLocationStore } from "@/store/location-store";
import { TravelDialog } from "./travel-dialog";
import { PokecenterDialog } from "./pokecenter-dialog";
import { LocationData } from "@/data/locations/location-data";
import ExploreDialog from "./explore-dialog";
import ShopDialog from "./shop-dialog";

const LocationDialogs = ({ location }: { location: LocationData }) => {
  const { activeDialogId, closeDialog } = useLocationStore();

  if (!activeDialogId) return null;

  const dialogTitles = {
    travel: "Travel",
    pokecenter: "Pokémon Center",
    shop: "Shop",
    explore: "Explore Area",
    talk: "Talk",
  };

  const dialogContent = {
    travel: <TravelDialog neighborhood={location.neighborhood} />,
    pokecenter: <PokecenterDialog />,
    shop: <ShopDialog />,
    explore: <ExploreDialog />,
    talk: <div>Talk Dialog Content</div>,
  };

  return (
    <Dialog open={!!activeDialogId} onClose={closeDialog}>
      {dialogContent[activeDialogId]}
    </Dialog>
  );
};

export default LocationDialogs;
