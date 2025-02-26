import "@/styles/secondary-header-styles.css";
import { cn } from "@/utils/cn";
import InventoryItems from "./inventory-items";
import InventoryCategories from "./inventory-categories";
import { Item } from "@/types/item";
import { setItems, useInventoryStore } from "@/store/inventory-store";
import { useEffect, useRef } from "react";
import { useClickOutside } from "@/hooks/use-click-outside";

interface InventoryProps {
  isOpen: boolean;
  setIsOpen: React.Dispatch<React.SetStateAction<null>>;
  userInventory: Item[];
}

const Inventory = ({ isOpen, setIsOpen, userInventory }: InventoryProps) => {
  const { items } = useInventoryStore();
  const inventoryRef = useRef<HTMLDivElement>(null);
  useClickOutside(inventoryRef, () => {
    setTimeout(() => setIsOpen(null), 0);
  });

  useEffect(() => {
    setItems(userInventory);
  }, [userInventory]);

  const coins = items?.find((i) => i.name === "coins");

  return (
    <section
      ref={inventoryRef}
      className={cn(
        "secondary-header-item rounded-sm bg-primary-accent shadow-primary",
        isOpen && "open"
      )}
    >
      <div className="inventory">
        <header className="inventory-header bg-primary-dark/60 p-2">
          <span className="text-amber-200">Inventory</span>
        </header>
        <InventoryCategories coins={coins?.quantity ?? 0} />
        <InventoryItems />
      </div>
    </section>
  );
};

export default Inventory;
