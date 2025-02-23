import InventoryDescription from "./inventory-description";
import InventoryItemCell from "./inventory-item-cell";
import { useInventoryStore } from "@/store/inventory-store";

const GRID_SIZE = {
  COLS: 7,
  ROWS: 5,
  TOTAL_CELLS: 35,
};

const InventoryItems = () => {
  const { itemDescription, items, visibleItems } = useInventoryStore();
  const cells = Array.from({ length: GRID_SIZE.TOTAL_CELLS }).map((_, index) => ({
    id: index,
    item: visibleItems ? visibleItems[index] : items ? items[index] : null,
  }));

  return (
    <section className="inventory-items border-primary-accent-dark rounded-br-sm border-t bg-primary-accent">
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
