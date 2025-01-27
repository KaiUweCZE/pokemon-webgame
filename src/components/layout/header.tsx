"use client";
import { MainNav } from "@/components/navigation/main-nav";
import { Button } from "@/components/ui/primitives/button";
import { useSignOut } from "@/hooks/use-sign-out";
import { ChevronDown, LogIn, LogOut } from "lucide-react";
import Link from "next/link";
import { useSession } from "next-auth/react";
import { SecondaryHeader } from "./secondary-header";
import { useState } from "react";

export function Header() {
  const { status } = useSession();
  const { signOut } = useSignOut();
  const [isSecondaryOpen, setIsSecondaryOpen] = useState(false);

  const isAuthenticated = status === "authenticated";

  return (
    <div>
      <header className="header sticky top-0 z-50 bg-primary">
        <div className="max-width mx-auto">
          <div className="container flex h-14 items-center">
            <MainNav />
            <div className="ml-auto flex items-center space-x-4">
              {isAuthenticated && (
                <Button
                  variant="ghost"
                  size="sm"
                  className="text-primary-text flex gap-1 hover:text-amber-200"
                  onClick={() => setIsSecondaryOpen(!isSecondaryOpen)}
                >
                  <ChevronDown
                    className={`h-4 w-4 transition-transform ${
                      isSecondaryOpen ? "rotate-180" : ""
                    }`}
                  />
                  <span>Menu</span>
                </Button>
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
      </header>
      {isAuthenticated && <SecondaryHeader isOpen={isSecondaryOpen} />}
    </div>
  );
}
