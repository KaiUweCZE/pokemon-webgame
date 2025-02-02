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
        "overflow-hidden bg-secondary transition-all duration-300",
        isOpen ? "h-12" : "h-0"
      )}
    >
      <div className="max-width mx-auto">
        <div className="container flex h-12 items-center justify-end gap-6">
          <button className="text-primary-text transition-colors hover:text-amber-200">
            <Settings className="h-5 w-5" />
          </button>
          <button className="text-primary-text transition-colors hover:text-amber-200">
            <ShoppingBag className="h-5 w-5" />
          </button>
          <button className="text-primary-text transition-colors hover:text-amber-200">
            <Phone className="h-5 w-5" />
          </button>
        </div>
      </div>
    </div>
  );
}
