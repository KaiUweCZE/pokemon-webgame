import {
  MapIcon,
  SearchIcon,
  MessageCircleIcon,
  SquareActivity,
  StoreIcon,
  type LucideIcon,
} from "lucide-react";
import { GradientBackground } from "../ui/primitives/gradient-background";
import { Button } from "../ui/primitives/button";
import { cn } from "@/utils/cn";
import { type LocationMenu, useLocationStore } from "@/store/location-store";

type MenuItem = {
  id: LocationMenu;
  icon: LucideIcon;
  label: string;
};

const MENU_ITEMS: MenuItem[] = [
  { id: "travel", icon: MapIcon, label: "Travel" },
  { id: "pokecenter", icon: SquareActivity, label: "Pokecenter" },
  { id: "shop", icon: StoreIcon, label: "Shop" },
  { id: "explore", icon: SearchIcon, label: "Explore Area" },
  { id: "talk", icon: MessageCircleIcon, label: "Talk" },
];

const LocationMenu = () => {
  const { openDialog, activeDialogId } = useLocationStore();

  return (
    <nav className="location-menu fixed bottom-14 left-0 right-0 mx-auto max-w-2xl">
      <div className="mx-4 overflow-hidden rounded-2xl border border-amber-300/50 bg-primary/20 p-4 shadow-purple-500 backdrop-blur">
        <ul className="grid grid-cols-5 gap-2">
          {MENU_ITEMS.map(({ id, icon: Icon, label }) => (
            <li key={id} className="z-1 group">
              <Button
                variant="basic"
                withRipple
                className="group w-full flex-col gap-0"
                onClick={(e) => {
                  e.stopPropagation();
                  e.preventDefault();
                  openDialog(id);
                }}
              >
                <span className="p-3">
                  <Icon
                    className={cn(
                      "h-6 w-6 text-amber-100 transition-all",
                      "group-hover:scale-125 group-hover:text-amber-200",
                      "group-focus:scale-125 group-focus:text-amber-200",
                      activeDialogId === id && "scale-125 text-amber-200"
                    )}
                  />
                </span>
                <span
                  className={cn(
                    "text-xs font-medium text-amber-100 group-hover:text-amber-200 group-focus:text-amber-200",
                    activeDialogId === id && "text-amber-200"
                  )}
                >
                  {label}
                </span>
              </Button>
            </li>
          ))}
        </ul>
        <GradientBackground variant="ancient" intensity="medium" direction="bottom-left" />
      </div>
    </nav>
  );
};

export default LocationMenu;
