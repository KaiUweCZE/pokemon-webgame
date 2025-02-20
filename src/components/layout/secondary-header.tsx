"use client";
import { Settings, ShoppingBag, Phone } from "lucide-react";
import { cn } from "@/utils/cn";
import "@/styles/secondary-header-styles.css";
import { useState } from "react";
import Inventory from "../header-modals/inventory";

interface SecondaryHeaderProps {
  isOpen: boolean;
}

type Section = "settings" | "inventory" | "phone" | null;

export function SecondaryHeader({ isOpen }: SecondaryHeaderProps) {
  const [openSection, setOpenSection] = useState<Section>(null);

  const handleSectionOpen = (section: Section) => {
    console.log(section);
    if (openSection === section) return setOpenSection(null);
    setOpenSection(section);
  };

  const renderSection = (section: Section) => {
    switch (section) {
      case "settings":
        return <div>Settings</div>;
      case "inventory":
        return <Inventory />;
      case "phone":
        return <div>Phone</div>;
      default:
        return null;
    }
  };

  return (
    <div
      className={cn(
        "secondary-header w-full bg-secondary/60 shadow-secondary backdrop-blur-sm hover:bg-secondary",
        isOpen ? "h-8" : "h-0"
      )}
    >
      <div className="large-width mx-auto">
        <div className="container flex h-8 items-center justify-end gap-6">
          <button className="text-primary-text transition-colors hover:text-amber-200">
            <Settings className="h-4 w-4" onClick={() => handleSectionOpen("settings")} />
          </button>
          <button className="text-primary-text transition-colors hover:text-amber-200">
            <ShoppingBag className="h-4 w-4" onClick={() => handleSectionOpen("inventory")} />
          </button>
          <button className="text-primary-text transition-colors hover:text-amber-200">
            <Phone className="h-4 w-4" onClick={() => handleSectionOpen("phone")} />
          </button>
        </div>
        {openSection === "inventory" && <Inventory />}
      </div>
    </div>
  );
}
