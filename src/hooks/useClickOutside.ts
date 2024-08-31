import { Dispatch, SetStateAction, useEffect } from "react";

export const useClickOutside = (
  setIsVisible: Dispatch<SetStateAction<boolean>>,
  isVisible: boolean,
  cssSelector: string
) => {
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const clickedElement = event.target as HTMLElement;
      if (!clickedElement.closest(cssSelector)) {
        setIsVisible(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [cssSelector]);
  return { isVisible };
};
