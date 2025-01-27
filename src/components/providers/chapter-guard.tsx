"use client";

import { getCurrentUser } from "@/utils/actions/get-current-user";
import { useSession } from "next-auth/react";
import { usePathname, useRouter } from "next/navigation";
import { useEffect } from "react";

export function ChapterGuard({ children }: { children: React.ReactNode }) {
  const { status } = useSession();
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    const checkChapter = async () => {
      if (status === "authenticated") {
        const user = await getCurrentUser();

        if (user?.chapter === 0 && pathname !== "/intro") {
          router.replace("/intro");
        }
      }
    };

    checkChapter();
  }, [status, pathname, router]);

  return <>{children}</>;
}
