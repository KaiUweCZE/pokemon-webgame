"use client";
import { useQuery } from "@tanstack/react-query";
import { useSession } from "next-auth/react";
import { User } from "@/types/user";
import { getCurrentUser } from "@/utils/actions/get-current-user";

export function useCurrentUser() {
  const { data: session, status } = useSession();

  return useQuery<User | null, Error>({
    queryKey: ["current-user"], // Add status to queryKey to refetch on status change
    queryFn: async () => {
      if (status === "unauthenticated") return null;
      const data = await getCurrentUser();
      if (!data) return null;
      return data as User;
    },
    staleTime: 1000 * 60 * 5, // 5 min
    gcTime: 1000 * 60 * 60 * 24,
    refetchOnWindowFocus: false,
    enabled: status === "authenticated",
    retry: 3,
  });
}
