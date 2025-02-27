import { useInventoryStore } from "@/store/inventory-store";

const InventoryDescription = () => {
  const { itemDescription } = useInventoryStore();
  return (
    <div className="item-description bg-inventory-accent/60 shadow-only-top">
      <p className="inventory-scrollbar overflow-y-auto px-2 py-1 text-sm text-amber-100">
        {itemDescription}
      </p>
    </div>
  );
};

export default InventoryDescription;
