import { Button } from "@/components/ui/primitives/button";
import { type ItemCategory } from "@/types/item";

const categories = {
  pokeball: "Balls",
  consumable: "Consumables",
  evolution: "Evolution",
  key: "Key",
} satisfies Record<ItemCategory, string>;

const InventoryCategories = () => {
  return (
    <div className="inventory-categories bg-primary-accent rounded-bl-sm">
      {Object.keys(categories).map((key) => (
        <Button key={key} variant="secondary" size="full" className="rounded-none">
          {key}
        </Button>
      ))}

      <span className="text-primary-text">{`coins:`}</span>
    </div>
  );
};

export default InventoryCategories;
