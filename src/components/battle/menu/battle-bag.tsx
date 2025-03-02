import Expander from "@/components/ui/primitives/expander";
import { X } from "lucide-react";
import pokeballImg from "@/images/items/pokeball.webp";
import Image from "next/image";
import { Button } from "@/components/ui/primitives/button";
import { useBattleStore } from "@/store/battle/battle-store";
import { useCatchPokemon } from "@/hooks/battle/use-catch-pokemon";
import { useInventoryStore } from "@/store/inventory-store";
import { useBattleItemActions } from "@/hooks/battle/use-battle-item-actions";
import { Item } from "@/types/item";

interface BattleBagProps {
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
}

const BattleBag = ({ isOpen, setIsOpen }: BattleBagProps) => {
  const { battleStatus } = useBattleStore();
  const { getBattleItems } = useInventoryStore();
  const { handleItemUse } = useBattleItemActions();

  const battleItems = getBattleItems();

  const handleAction = (item: Item) => {
    handleItemUse(item);
    setIsOpen(false);
  };

  return (
    <section className="absolute bottom-0 w-full text-battle-text">
      <Expander isOpen={isOpen} className="h-full">
        <div className="battle-bag h-64 rounded-t-sm border-2 border-b-0 border-battle-border/20 bg-battle-accent/60 backdrop-blur-md">
          {/* header of bag component */}
          <header className="flex items-center justify-between border-b border-battle-accent/20 p-3">
            <h4 className="font-medium text-battle-text">Battle Items</h4>
            <Button
              variant="basic"
              size="icon"
              onClick={() => setIsOpen(false)}
              className="h-6 w-6 rounded-full hover:bg-battle-accent/10"
            >
              <X className="h-4 w-4 text-battle-text/80" />
            </Button>
          </header>
          {/* items list */}
          <ul className="battle-bag-items battle-scrollbar h-full max-h-full w-full place-items-start">
            {battleItems?.length ? (
              battleItems.map((item, index) => (
                <li
                  key={item.name}
                  className="flex w-full items-center justify-between border-b border-battle-border/30 px-3 py-1 last:border-b-0 hover:bg-battle-rare/20"
                >
                  <div className="flex items-center gap-2">
                    <Image src={item.img.src} alt={item.img.alt} width={18} height={18} />
                    <div className="flex items-center gap-1">
                      <span className="text-sm font-medium capitalize text-battle-text">
                        {item.name}
                      </span>
                      <span className="text-xs text-battle-text/70">({item.quantity || 0})</span>
                    </div>
                  </div>
                  <Button
                    size="sm"
                    variant="battle"
                    border={true}
                    onClick={() => handleAction(item)}
                  >
                    use
                  </Button>
                </li>
              ))
            ) : (
              <li className="flex px-3 py-1">No items for battle</li>
            )}
          </ul>
        </div>
      </Expander>
    </section>
  );
};
export default BattleBag;
