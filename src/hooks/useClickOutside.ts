import { useState, useEffect } from "react";

const useClickOutside = (cssSelector: string) => {
  const [active, setActive] = useState(true);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (!(event.target as HTMLElement).closest(cssSelector)) {
        setActive(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [active]);

  return { active, setActive };
};

export default useClickOutside;
