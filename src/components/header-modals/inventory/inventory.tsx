import "@/styles/secondary-header-styles.css";
import { cn } from "@/utils/cn";
import InventoryItems from "./inventory-items";
import InventoryCategories from "./inventory-categories";
import { InventoryItem } from "@/types/item";

interface InventoryProps {
  isOpen: boolean;
  userInventory: InventoryItem[];
}

const Inventory = ({ isOpen, userInventory }: InventoryProps) => {
  return (
    <section
      className={cn(
        "secondary-header-item inventory rounded-sm bg-primary-dark shadow-primary",
        isOpen && "open"
      )}
    >
      <header className="inventory-header p-2">
        <span className="text-amber-200">Inventory</span>
      </header>
      <InventoryCategories />
      <InventoryItems items={userInventory} />
    </section>
  );
};

export default Inventory;
