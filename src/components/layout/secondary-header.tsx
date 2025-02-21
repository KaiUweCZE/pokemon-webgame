"use client";
import { Settings, ShoppingBag, Phone } from "lucide-react";
import { cn } from "@/utils/cn";
import "@/styles/secondary-header-styles.css";
import { useState } from "react";
import Inventory from "../header-modals/inventory/inventory";
import { Button } from "../ui/primitives/button";
import { useCurrentUser } from "@/hooks/use-current-user";

interface SecondaryHeaderProps {
  isOpen: boolean;
}

type Section = "settings" | "inventory" | "phone" | null;

export function SecondaryHeader({ isOpen }: SecondaryHeaderProps) {
  const [openSection, setOpenSection] = useState<Section>(null);
  const { data: user } = useCurrentUser();

  const userInventory = user?.inventory;

  const handleSectionOpen = (section: Section) => {
    console.log(section);
    if (openSection === section) return setOpenSection(null);
    setOpenSection(section);
  };

  return (
    <div
      className={cn(
        "secondary-header w-full bg-secondary/60 shadow-secondary backdrop-blur-sm hover:bg-secondary",
        isOpen && "open"
      )}
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
            <ShoppingBag
              className={cn("h-4 w-4", openSection === "inventory" && "text-amber-200")}
              onClick={() => handleSectionOpen("inventory")}
            />
          </Button>
          <Button
            size="icon"
            variant="basic"
            className="text-primary-text transition-colors hover:text-amber-200"
          >
            <Phone className="h-4 w-4" onClick={() => handleSectionOpen("phone")} />
          </Button>
        </div>
        {userInventory && (
          <Inventory
            isOpen={!!userInventory && openSection === "inventory"}
            userInventory={userInventory}
          />
        )}
      </div>
    </div>
  );
}
