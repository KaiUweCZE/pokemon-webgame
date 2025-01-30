"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/utils/cn";
import { useSession } from "next-auth/react";

const routes = [
  {
    href: "/",
    label: "Home",
    protected: false,
  },

  {
    href: "/profile",
    label: "Profile",
    protected: true,
  },
  {
    href: "/road",
    label: "Road",
    protected: true,
  },
];

interface MainNavProps {
  status: "authenticated" | "unauthenticated" | "loading";
}

export function MainNav({ status }: MainNavProps) {
  const pathname = usePathname();

  const filterRoutes = routes.filter((route) => status === "authenticated" || !route.protected);

  return (
    <nav className="flex gap-6">
      {filterRoutes.map((route) => (
        <Link
          key={route.href}
          href={route.href}
          className={cn(
            "text-md font-medium transition-colors hover:text-amber-200",
            pathname === route.href ? "text-amber-200" : "text-primary-text"
          )}
        >
          {route.label}
        </Link>
      ))}
    </nav>
  );
}
