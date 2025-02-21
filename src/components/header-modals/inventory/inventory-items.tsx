import { InventoryItem } from "@/types/item";
import InventoryItemCell from "./inventory-item-cell";

const GRID_SIZE = {
  COLS: 7,
  ROWS: 5,
  TOTAL_CELLS: 35,
};

const InventoryItems = ({ items }: { items: InventoryItem[] }) => {
  const cells = Array.from({ length: GRID_SIZE.TOTAL_CELLS }).map((_, index) => ({
    id: index,
    item: items[index],
  }));

  return (
    <section className="inventory-items bg-primary-accent rounded-br-sm">
      <div className="item-list gap-2 bg-cyan-200/30">
        {cells.map(({ id, item }) => (
          <InventoryItemCell key={id} item={item} />
        ))}
      </div>
      <div className="item-description bg-teal-600/30"></div>
    </section>
  );
};

export default InventoryItems;
