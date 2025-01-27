"use client";
import { useQuery } from "@tanstack/react-query";
import { useSession } from "next-auth/react";
import { getCurrentUser } from "@/utils/actions/get-current-user";

export function useCurrentUser() {
  const { data: session, status } = useSession();

  return useQuery({
    queryKey: ["current-user"], // Add status to queryKey to refetch on status change
    queryFn: async () => {
      if (status !== "unauthenticated") return null;
      return await getCurrentUser();
    },
    staleTime: Infinity,
    gcTime: 1000 * 60 * 60 * 24,
    refetchOnWindowFocus: false,
    enabled: status === "authenticated",
  });
}
