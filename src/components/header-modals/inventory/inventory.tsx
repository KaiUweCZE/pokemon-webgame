import "@/styles/secondary-header-styles.css";
import { cn } from "@/utils/cn";
import InventoryItems from "./inventory-items";
import InventoryCategories from "./inventory-categories";
import { Item } from "@/types/item";
import { setItems, useInventoryStore } from "@/store/inventory-store";
import { useEffect, useRef } from "react";
import { useClickOutside } from "@/hooks/use-click-outside";
import { GradientBackground } from "@/components/ui/primitives/gradient-background";

interface InventoryProps {
  isOpen: boolean;
  setIsOpen: () => void;
  userInventory: Item[];
  refProp?: React.RefObject<HTMLDivElement | null>;
}

const Inventory = ({ isOpen, setIsOpen, userInventory, refProp }: InventoryProps) => {
  const { items } = useInventoryStore();
  const inventoryRef = useRef<HTMLDivElement>(null);
  useClickOutside(inventoryRef, setIsOpen, isOpen);

  useEffect(() => {
    setItems(userInventory);
  }, [userInventory]);

  const coins = items?.find((i) => i.name === "coins");

  return (
    <section
      ref={inventoryRef}
      className={cn(
        "secondary-header-item bg-inventory/60 rounded-sm shadow-primary backdrop-blur-md",
        isOpen && "open"
      )}
    >
      <div className="inventory">
        <header className="inventory-header bg-inventory-accent/60 p-2 pl-4">
          <span className="text-amber-200">Inventory</span>
        </header>
        <InventoryCategories coins={coins?.quantity ?? 0} />
        <InventoryItems />
      </div>
      <GradientBackground intensity="max" variant="light" />
    </section>
  );
};

export default Inventory;
