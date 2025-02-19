"use client";

import { Settings, ShoppingBag, Phone } from "lucide-react";
import { cn } from "@/utils/cn";

interface SecondaryHeaderProps {
  isOpen: boolean;
}

export function SecondaryHeader({ isOpen }: SecondaryHeaderProps) {
  return (
    <div
      className={cn(
        "secondary-header w-full overflow-hidden bg-secondary/60 shadow-secondary backdrop-blur-sm hover:bg-secondary",
        isOpen ? "h-8" : "h-0"
      )}
    >
      <div className="large-width mx-auto">
        <div className="container flex h-8 items-center justify-end gap-6">
          <button className="text-primary-text transition-colors hover:text-amber-200">
            <Settings className="h-4 w-4" />
          </button>
          <button className="text-primary-text transition-colors hover:text-amber-200">
            <ShoppingBag className="h-4 w-4" />
          </button>
          <button className="text-primary-text transition-colors hover:text-amber-200">
            <Phone className="h-4 w-4" />
          </button>
        </div>
      </div>
    </div>
  );
}
