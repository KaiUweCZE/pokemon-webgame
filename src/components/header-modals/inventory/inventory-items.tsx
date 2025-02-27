import InventoryDescription from "./inventory-description";
import InventoryItemCell from "./inventory-item-cell";
import { useInventoryStore } from "@/store/inventory-store";

const GRID_SIZE = {
  COLS: 6,
  ROWS: 4,
  TOTAL_CELLS: 24,
};

const InventoryItems = () => {
  const { itemDescription, items, visibleItems } = useInventoryStore();
  const cells = Array.from({ length: GRID_SIZE.TOTAL_CELLS }).map((_, index) => ({
    id: index,
    item: visibleItems ? visibleItems[index] : items ? items[index] : null,
  }));

  return (
    <section className="inventory-items bg-inventory-accent/20 border-inventory-accent/80 rounded-br-sm border-t">
      <div className="item-list gap-2 p-2">
        {cells.map(({ id, item }) => (
          <InventoryItemCell key={id} item={item} />
        ))}
      </div>
      <InventoryDescription />
    </section>
  );
};

export default InventoryItems;
