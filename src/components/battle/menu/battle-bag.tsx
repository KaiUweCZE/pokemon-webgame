import Expander from "@/components/ui/primitives/expander";
import { X } from "lucide-react";
import pokeballImg from "@/images/items/pokeball.webp";
import Image from "next/image";
import { Button } from "@/components/ui/primitives/button";
import { useBattleStore } from "@/store/battle/battle-store";
import { useCatchPokemon } from "@/hooks/battle/use-catch-pokemon";

interface BattleBagProps {
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
}

const BattleBag = ({ isOpen, setIsOpen }: BattleBagProps) => {
  const {} = useBattleStore();
  const { catchPokemon } = useCatchPokemon();
  const items = {
    pokeball: {
      name: "Pokeball",
      amount: 10,
      price: 100,
      description: "Used to catch Pokémon",
      onClick: catchPokemon,
      image: {
        src: pokeballImg,
        alt: "Pokeball image",
      },
    },
  };
  return (
    <div className="absolute bottom-0 w-full">
      <Expander isOpen={isOpen}>
        <div className="h-64 rounded-t-sm border-2 border-b-0 border-slate-800/20 bg-content/90 p-2 backdrop-blur-sm">
          <X
            className="absolute right-0 top-0 h-4 w-4 cursor-pointer bg-content-secondary"
            onClick={() => setIsOpen(false)}
          />
          <div className="grid h-full w-full items-start gap-2 bg-slate-950/5 p-2">
            <div className="bag-item flex w-full items-center justify-between">
              <div className="flex items-center gap-2">
                <Image
                  src={items.pokeball.image.src}
                  alt={items.pokeball.image.alt}
                  width={18}
                  height={18}
                />
                <span className="">{items.pokeball.name}</span>
              </div>
              <Button size="sm" variant="light" border={true} onClick={items.pokeball.onClick}>
                use
              </Button>
            </div>
          </div>
        </div>
      </Expander>
    </div>
  );
};
export default BattleBag;
