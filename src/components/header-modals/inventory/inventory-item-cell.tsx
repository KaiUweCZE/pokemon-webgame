import { itemData } from "@/data/items/item-data";
import { setItemDescription } from "@/store/inventory-store";
import { Item } from "@/types/item";
import Image from "next/image";

interface InventoryItemCellProps {
  item: Item | null;
}

const InventoryItemCell = ({ item }: InventoryItemCellProps) => {
  const isValidItemName = (name: string): name is keyof typeof itemData => {
    return name in itemData;
  };

  const itemDetails = item && isValidItemName(item.name) ? itemData[item.name] : null;

  return (
    <div className="flex aspect-square items-center justify-center rounded-sm border border-amber-900/20 bg-amber-950/20">
      {itemDetails && item && (
        <div
          className="relative"
          onMouseEnter={() => setItemDescription(itemDetails?.description)}
          /* onMouseLeave={() => setItemDescription("")}*/
        >
          {itemDetails && (
            <Image src={itemDetails.img.src} alt={itemDetails.img.alt} width={24} height={24} />
          )}

          {item.quantity && (
            <span className="absolute -bottom-1 -right-1 rounded-sm bg-amber-950/80 px-1 text-xs text-amber-100">
              {item.quantity}
            </span>
          )}
        </div>
      )}
    </div>
  );
};

export default InventoryItemCell;
