import { itemData } from "@/data/items/item-data";
import { InventoryItem } from "@/types/item";
import Image from "next/image";

interface InventoryItemCellProps {
  item?: InventoryItem;
}

const InventoryItemCell = ({ item }: InventoryItemCellProps) => {
  const isValidItemName = (name: string): name is keyof typeof itemData => {
    return name in itemData;
  };

  const itemDetails = item && isValidItemName(item.name) ? itemData[item.name] : null;

  return (
    <div className="flex h-12 w-12 items-center justify-center rounded-sm border border-amber-900/20 bg-amber-950/20">
      {item && (
        <div className="relative">
          {itemDetails && (
            <Image src={itemDetails.img.src} alt={itemDetails.img.alt} width={24} height={24} />
          )}
          {/* Množství */}
          {item.quantity > 1 && (
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
