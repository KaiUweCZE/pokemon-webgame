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
    <div className="bg-inventory-light/30 border-inventory-accent/80 relative flex aspect-square items-center justify-center rounded-sm border">
      {itemDetails && item && (
        <div
          className="relative grid h-full w-full place-items-center"
          onMouseEnter={() => setItemDescription(itemDetails?.description)}
          /* onMouseLeave={() => setItemDescription("")}*/
        >
          {itemDetails && (
            <Image src={itemDetails.img.src} alt={itemDetails.img.alt} width={24} height={24} />
          )}

          {item.quantity && (
            <span className="bg-inventory-accent/50 absolute -bottom-0 -right-0 rounded-sm px-1 text-xs text-amber-100">
              {item.quantity}
            </span>
          )}
        </div>
      )}
    </div>
  );
};

export default InventoryItemCell;
