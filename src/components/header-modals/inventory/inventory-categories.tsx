import { Button } from "@/components/ui/primitives/button";
import { setActiveCategory, setVisibleItems, useInventoryStore } from "@/store/inventory-store";
import { type ItemCategory } from "@/types/item";
import { cn } from "@/utils/cn";

const categories = {
  pokeball: "Balls",
  consumable: "Consumables",
  evolution: "Evolution",
  key: "Key",
} satisfies Record<ItemCategory, string>;

const InventoryCategories = ({ coins }: { coins: number }) => {
  const { activeCategory, items } = useInventoryStore();
  const handleCategoryClick = (category: ItemCategory) => {
    if (category === activeCategory) {
      setActiveCategory(null);
      setVisibleItems(null);
    } else {
      setActiveCategory(category);
      setVisibleItems(items?.filter((item) => item.category === category) ?? null);
    }
  };
  return (
    <section className="inventory-categories bg-inventory-accent/40 border-inventory-accent/80 z-10 rounded-bl-sm border-r shadow-right">
      <div className="grid">
        {Object.keys(categories).map((category) => (
          <Button
            key={category}
            variant="basic"
            size="full"
            className={cn(
              "hover:bg-inventory-accent/30 rounded-none text-amber-100",
              activeCategory === category &&
                "bg-inventory-accent/30 hover:bg-inventory-accent/0 text-amber-200"
            )}
            onClick={() => handleCategoryClick(category as ItemCategory)}
          >
            {category}
          </Button>
        ))}
      </div>
      <div className="bg-inventory-accent/30 flex w-full justify-between place-self-end p-2 text-amber-200">
        <span>coins:</span>
        <span>{coins}</span>
      </div>
    </section>
  );
};

export default InventoryCategories;
