import { PokemonContext } from "@/contexts/PokemonContext";
import { useContext, useEffect, useState } from "react";

/**
 * Custom hook to detect when the user's Pokemon levels up.
 *
 * @returns {boolean} Indicates if the Pokemon has leveled up recently.
 */
const useNewLevel = (change: number) => {
  const [newLevel, setNewLevel] = useState(false);
  const context = useContext(PokemonContext);

  if (!context) {
    throw new Error("context is missing");
  }

  useEffect(() => {
    if (change > 0) {
      setNewLevel(true);
      const timeout = setTimeout(() => {
        setNewLevel(false);
      }, 5000);
      return () => clearTimeout(timeout);
    }
  }, [context.currentPokemon?.level]);

  return newLevel;
};

export default useNewLevel;
