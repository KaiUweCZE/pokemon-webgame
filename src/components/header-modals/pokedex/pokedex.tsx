import { GradientBackground } from "@/components/ui/primitives/gradient-background";
import { useClickOutside } from "@/hooks/use-click-outside";
import { cn } from "@/utils/cn";
import { useRef } from "react";
import PokedexHeader from "./pokedex-header";
import PokedexList from "./pokedex-list";
import PokedexPokemon from "./pokedex-pokemon";

interface PokedexProps {
  isOpen: boolean;
  setIsOpen: () => void;
  refProp?: React.RefObject<HTMLDivElement | null>;
}

const Pokedex = ({ isOpen, setIsOpen, refProp }: PokedexProps) => {
  const pokedexRef = useRef<HTMLDivElement>(null);
  useClickOutside(pokedexRef, setIsOpen, isOpen);
  return (
    <section
      ref={pokedexRef}
      className={cn(
        "secondary-header-item rounded-sm bg-inventory/60 shadow-primary backdrop-blur-md",
        isOpen && "open"
      )}
    >
      <div className="pokedex">
        <PokedexHeader />
        <div className="pokedex-content">
          <PokedexList />
          <PokedexPokemon />
        </div>
      </div>
      <GradientBackground intensity="max" variant="light" />
    </section>
  );
};

export default Pokedex;
