import { GradientBackground } from "../ui/primitives/gradient-background";
import { Button } from "../ui/primitives/button";
import { cn } from "@/utils/cn";
import { type LocationMenu, useLocationStore } from "@/store/location-store";
import { capitalize } from "@/utils/string";
import React from "react";
import Image from "next/image";
import { icons } from "@/images/icons/icons";

const MENU_ITEMS = {
  travel: { icon: icons.travel.src, label: "Travel" },
  pokecenter: { icon: icons.pokecenter.src, label: "Pokecenter" },
  shop: { icon: icons.shop.src, label: "Shop" },
  explore: { icon: icons.explore.src, label: "Explore Area" },
  talk: { icon: icons.talk.src, label: "Talk" },
};

const LocationMenu = () => {
  const { openDialog, activeDialogId, locationData } = useLocationStore();

  if (!locationData) return null;

  const menuItems = locationData.locationActions.map((item) => item);

  return (
    <nav className="location-menu fixed bottom-14 left-0 right-0 mx-auto max-w-2xl">
      <div className="mx-4 overflow-hidden rounded-2xl border border-amber-300/50 bg-primary/20 p-4 shadow-purple-500 backdrop-blur">
        <ul className="grid grid-cols-5 gap-2">
          {menuItems.map((item) => (
            <li key={item} className="z-1 group">
              <Button
                variant="basic"
                withRipple
                className="group w-full flex-col gap-0"
                onClick={(e) => {
                  e.stopPropagation();
                  e.preventDefault();
                  openDialog(item);
                }}
              >
                <span className="p-3">
                  {MENU_ITEMS[item] && (
                    <Image
                      className={cn(
                        "opacity-60 transition-all",
                        activeDialogId === item && "scale-110 opacity-100"
                      )}
                      src={MENU_ITEMS[item].icon}
                      alt={MENU_ITEMS[item].label}
                      width={32}
                    />
                  )}
                </span>
                <span
                  className={cn(
                    "text-xs font-medium text-amber-100 group-hover:text-amber-200 group-focus:text-amber-200",
                    activeDialogId === item && "text-amber-200"
                  )}
                >
                  {capitalize(item)}
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
