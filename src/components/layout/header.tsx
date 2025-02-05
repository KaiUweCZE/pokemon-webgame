"use client";
import { MainNav } from "@/components/navigation/main-nav";
import { Button } from "@/components/ui/primitives/button";
import { useSignOut } from "@/hooks/use-sign-out";
import {
  Backpack,
  BackpackIcon,
  ChevronDown,
  ChevronDownSquare,
  LogIn,
  LogOut,
  PanelTopOpen,
} from "lucide-react";
import Link from "next/link";
import { useSession } from "next-auth/react";
import { SecondaryHeader } from "./secondary-header";
import { useState } from "react";
import { GradientBackground } from "../ui/primitives/gradient-background";
import { cn } from "@/utils/cn";

export function Header() {
  const { status } = useSession();
  const { signOut } = useSignOut();
  const [isSecondaryOpen, setIsSecondaryOpen] = useState(false);

  const isAuthenticated = status === "authenticated";

  return (
    <div className="sticky top-0 z-50 grid">
      <header className="header secondary-shadow z-50 bg-primary">
        <div className="max-width mx-auto">
          <div className="container flex h-14 items-center">
            <MainNav status={status} />
            <div className="ml-auto flex items-center space-x-4">
              {isAuthenticated && (
                <Button
                  variant="basic"
                  size="icon"
                  rightIcon={
                    <Backpack
                      className={`h-5 w-5 text-amber-100 transition-transform group-hover:text-amber-200 ${
                        isSecondaryOpen ? "text-amber-200" : ""
                      }`}
                    />
                  }
                  className="group p-1"
                  onClick={() => setIsSecondaryOpen(!isSecondaryOpen)}
                ></Button>
              )}
              {isAuthenticated ? (
                <Button
                  variant="secondary"
                  size="sm"
                  className="flex gap-2"
                  onClick={() => signOut()}
                >
                  <LogOut className="h-4 w-4" color="white" />
                  <span className="text-amber-50">Sign Out</span>
                </Button>
              ) : (
                <Link href="/login">
                  <Button variant="secondary" size="sm" className="flex gap-2">
                    <LogIn className="h-4 w-4" color="white" />
                    <span className="text-amber-50">Sign In</span>
                  </Button>
                </Link>
              )}
            </div>
          </div>
        </div>
        <GradientBackground intensity="max" variant="dark" />
      </header>
      {isAuthenticated && <SecondaryHeader isOpen={isSecondaryOpen} />}
    </div>
  );
}
