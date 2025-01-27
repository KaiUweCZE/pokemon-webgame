"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/utils/cn";

const routes = [
  {
    href: "/",
    label: "Home",
  },
  {
    href: "/pokemons",
    label: "Pokémons",
  },
  {
    href: "/trainers",
    label: "Trainers",
  },
  {
    href: "/battles",
    label: "Battles",
  },
];

export function MainNav() {
  const pathname = usePathname();

  return (
    <nav className="flex gap-6">
      {routes.map((route) => (
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
