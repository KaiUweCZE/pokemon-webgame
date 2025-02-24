import { useCurrentUser } from "@/hooks/use-current-user";
import { DialogHeader } from "./components/dialog-header";
import { capitalize } from "@/utils/string";
import ShopCategory from "./shop-dialog/shop-category";
import { itemData } from "@/data/items/item-data";
import Image from "next/image";
import { Coins, InfoIcon } from "lucide-react";
import { Button } from "@/components/ui/primitives/button";
import { Card } from "@/components/ui/primitives/card";
import { useLocationStore } from "@/store/location-store";
import { GradientBackground } from "@/components/ui/primitives/gradient-background";
import ItemBasicInfo from "./item-basic-info";
import { useModal } from "@/components/providers/modal-provider";
import ShopModal from "./shop-dialog/shop-modal";
import { useInventoryStore } from "@/store/inventory-store";
import { ItemName } from "@/types/item";

const ShopDialog = ({ itemNames }: { itemNames: string[] }) => {
  const { data: user } = useCurrentUser();
  const { shopFilter } = useLocationStore();
  const { items } = useInventoryStore();
  const locationName = user?.location ?? "Nowhere";
  const shopItems = Array.from(Object.values(itemData)).filter((i) => itemNames.includes(i.name));
  const { showModal } = useModal();

  const coins = items?.find((i) => i.name === "coins");

  const handleShopModal = (state: "buy" | "sell", price: number, itemName: ItemName) => {
    const userItem = items?.find((i) => i.name === itemName) ?? null;
    showModal({
      title: capitalize(state),
      variant: "secondary",
      children: (
        <ShopModal state={state} price={price} userItem={userItem} money={coins?.quantity ?? 0} />
      ),
    });
  };

  const filteredItems = shopItems.filter((i) => i.category === shopFilter || shopFilter === null);
  return (
    <section className="relative grid gap-2">
      <div className="sticky-header sticky top-0 z-20 grid gap-2 p-4">
        <DialogHeader title={`${capitalize(locationName)} Shop`} />
        <ShopCategory />
      </div>
      <div className="grid grid-cols-2 gap-3 p-4">
        {filteredItems.map((item) => (
          <Card
            size="full"
            key={item.name}
            className="relative overflow-hidden bg-primary-dark/70 p-4 transition-all"
          >
            <InfoIcon className="absolute right-1 top-1 h-4 w-4 cursor-pointer text-amber-200" />
            <div className="z-1 relative flex items-center justify-between">
              <ItemBasicInfo img={item.img} price={item.price} itemName={item.name} />
              <div className="flex gap-2 place-self-end">
                <Button
                  variant="light"
                  size="sm"
                  className="px-3"
                  withRipple
                  onClick={() => handleShopModal("buy", item.price, item.name)}
                >
                  <span className="font-normal text-slate-950">buy</span>
                </Button>
                <Button
                  variant="destructive"
                  size="sm"
                  className="px-3"
                  withRipple
                  onClick={() => handleShopModal("sell", item.price, item.name)}
                >
                  <span className="font-normal text-amber-100">sell</span>
                </Button>
              </div>
            </div>
          </Card>
        ))}
      </div>
      <footer className="shop-footer grid pb-1 pr-4">
        <span className="place-self-end text-amber-100">{`Coins: ${coins?.quantity ?? 0}`}</span>
      </footer>
    </section>
  );
};

export default ShopDialog;
