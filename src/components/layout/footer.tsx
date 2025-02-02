"use client";

import { useState } from "react";
import { useSession } from "next-auth/react";
import { DayTracker } from "@/components/footer/day-tracker";
import AboutDay from "../footer/about-day";

export function Footer() {
  const [isOpen, setIsOpen] = useState(false);
  const [closing, setClosing] = useState(false);

  const { status } = useSession();

  const isAuthenticated = status === "authenticated";

  if (!isAuthenticated) return null;

  const handleToggle = () => {
    if (isOpen) {
      setClosing(() => true);
      setTimeout(() => {
        setIsOpen(() => false);
        setClosing(() => false);
      }, 270);
    } else {
      setIsOpen(true);
    }
  };

  return (
    <footer className="footer fixed bottom-0 z-50 w-full">
      <div className="max-width mx-auto grid place-items-end">
        {isOpen && <AboutDay isOpen={isOpen} isClosing={closing} />}
        <DayTracker isOpen={isOpen} onToggle={handleToggle} />
      </div>
    </footer>
  );
}
