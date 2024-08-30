import { Dispatch, SetStateAction, useEffect, useState } from "react";

export const useClickOutside = (
  setInitState: Dispatch<SetStateAction<boolean>>,
  initState: boolean,
  cssSelector: string
) => {
  const [isOpen, setIsOpen] = useState(initState);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const clickedElement = event.target as HTMLElement;
      if (!clickedElement.closest(cssSelector)) {
        setInitState(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [cssSelector]);
  return { initState };
};
