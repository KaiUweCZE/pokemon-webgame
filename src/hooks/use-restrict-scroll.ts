import { useEffect } from "react";

export function useRestrictScroll(shouldRestrict: boolean) {
  useEffect(() => {
    const originalStyle = window.getComputedStyle(document.body).overflow;

    if (shouldRestrict) {
      document.body.style.overflow = "hidden";
    }

    return () => {
      document.body.style.overflow = originalStyle;
    };
  }, [shouldRestrict]);
}
