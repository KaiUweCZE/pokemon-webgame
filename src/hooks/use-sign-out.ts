"use client";
import { signOut } from "next-auth/react";
import { queryClient } from "@/lib/providers";
import { useRouter } from "next/navigation";

export function useSignOut() {
  const router = useRouter();

  const handleSignOut = async (options?: { redirectUrl?: string }) => {
    try {
      // Invalidate the current-user query instead of removing it
      queryClient.removeQueries({
        queryKey: ["current-user"],
        exact: true,
      });

      await signOut({
        redirect: false,
        callbackUrl: options?.redirectUrl || "/",
      });

      const event = new Event("visibilitychange");
      document.dispatchEvent(event);

      window.location.href = options?.redirectUrl || "/";
    } catch (error) {
      console.error("Error signing out:", error);
      throw new Error("Error signing out");
    }
  };

  return { signOut: handleSignOut };
}
