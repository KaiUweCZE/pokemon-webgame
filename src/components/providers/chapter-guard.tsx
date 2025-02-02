"use client";
import { useSession } from "next-auth/react";
import LoadingFull from "../ui/loading/loading-full";

export function ChapterGuard({ children }: { children: React.ReactNode }) {
  const { status } = useSession();

  if (status === "loading") {
    return <LoadingFull />;
  }

  return <>{children}</>;
}
