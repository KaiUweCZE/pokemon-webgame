"use client";

import { Button } from "@/components/ui/primitives/button";
import { Clock } from "lucide-react";
import { useState } from "react";
import { cn } from "@/utils/cn";
import { useSession } from "next-auth/react";

export function Footer() {
  const [isOpen, setIsOpen] = useState(false);
  const [currentDay, setCurrentDay] = useState(1);
  const { status } = useSession();

  const isAuthenticated = status === "authenticated";

  if (!isAuthenticated) return null;

  return (
    <footer className="footer fixed bottom-0 z-50 w-full">
      <div className="max-width mx-auto grid place-items-end">
        <div className="relative">
          {/* Day info panel */}
          <div
            className={cn(
              "bg-secondary-background text-primary-text absolute bottom-full right-0 mb-2 w-48 rounded-lg p-4 shadow-lg transition-all duration-300",
              isOpen ? "visible opacity-100" : "invisible opacity-0"
            )}
          >
            <div className="mb-4 flex flex-col gap-2">
              <div className="text-sm">Current Day</div>
              <div className="text-2xl font-bold text-amber-200">{currentDay}</div>
            </div>
            <Button
              variant="secondary"
              size="sm"
              className="w-full"
              onClick={() => setCurrentDay((prev) => prev + 1)}
            >
              Next Day
            </Button>
          </div>

          {/* Clock button */}
          <Button
            variant="secondary"
            size="icon"
            className={cn(
              "h-12 w-12 rounded-full transition-transform duration-300",
              isOpen && "rotate-180"
            )}
            onClick={() => setIsOpen(!isOpen)}
          >
            <Clock className="h-6 w-6" />
          </Button>
        </div>
      </div>
    </footer>
  );
}
