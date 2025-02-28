"use client";
import { Settings, ShoppingBag, Phone } from "lucide-react";
import { cn } from "@/utils/cn";
import "@/styles/secondary-header-styles.css";
import { useState } from "react";
import Inventory from "../header-modals/inventory/inventory";
import { Button } from "../ui/primitives/button";
import { useCurrentUser } from "@/hooks/use-current-user";
import { transformToStaticItem } from "@/utils/items/transform-to-static-item";
import Pokedex from "../header-modals/pokedex/pokedex";
import { icons } from "@/images/icons/icons";
import Image from "next/image";

interface SecondaryHeaderProps {
  isOpen: boolean;
}

type Section = "settings" | "inventory" | "pokedex" | null;

export function SecondaryHeader({ isOpen }: SecondaryHeaderProps) {
  const [openSection, setOpenSection] = useState<Section>(null);
  const { data: user } = useCurrentUser();
  const pokedexIcon = icons["pokedex1"];
  const bagIcon = icons["bag"];

  const userInventory = user?.inventory && transformToStaticItem(user.inventory);

  const handleSectionOpen = (section: Section) => {
    console.log(section);
    if (openSection === section) return setOpenSection(null);
    setOpenSection(section);
  };

  return (
    <div
      className={cn("secondary-header w-full bg-secondary/90 shadow-secondary", isOpen && "open")}
    >
      <div className="large-width relative mx-auto grid">
        <div className="container flex items-center justify-end gap-6">
          <Button
            size="icon"
            variant="basic"
            className="text-primary-text transition-colors hover:text-amber-200"
          >
            <Settings className="h-4 w-4" onClick={() => handleSectionOpen("settings")} />
          </Button>
          <Button
            size="icon"
            variant="basic"
            className="text-primary-text transition-colors hover:text-amber-200"
          >
            <Image
              src={bagIcon.src}
              alt={bagIcon.alt}
              className={cn(
                "grayscale-lg h-5 w-5 transition-all hover:scale-110",
                openSection === "inventory" && "grayscale-0"
              )}
              onMouseDown={() => handleSectionOpen("inventory")}
            />
          </Button>
          <Button
            size="icon"
            variant="basic"
            className="text-primary-text transition-colors hover:text-amber-200"
          >
            <Image
              src={pokedexIcon.src}
              alt={pokedexIcon.alt}
              className={cn(
                "grayscale-lg h-5 w-5 transition-all hover:scale-110",
                openSection === "pokedex" && "grayscale-0"
              )}
              onMouseDown={() => handleSectionOpen("pokedex")}
            />
          </Button>
        </div>
        {userInventory && (
          <Inventory
            isOpen={!!userInventory && openSection === "inventory"}
            setIsOpen={() => setOpenSection(null)}
            userInventory={userInventory}
          />
        )}
        {<Pokedex isOpen={openSection === "pokedex"} setIsOpen={() => setOpenSection(null)} />}
      </div>{" "}
    </div>
  );
}
