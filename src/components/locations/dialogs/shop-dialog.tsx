import { useCurrentUser } from "@/hooks/use-current-user";
import { DialogHeader } from "./components/dialog-header";
import { capitalize } from "@/utils/string";
import ShopCategory from "./shop-dialog/shop-category";
import { itemData } from "@/data/items/item-data";
import Image from "next/image";
import { Coins } from "lucide-react";
import { Button } from "@/components/ui/primitives/button";
import { Card } from "@/components/ui/primitives/card";
import { useLocationStore } from "@/store/location-store";
import { GradientBackground } from "@/components/ui/primitives/gradient-background";

const ShopDialog = ({ itemNames }: { itemNames: string[] }) => {
  const { data: user } = useCurrentUser();
  const { shopFilter } = useLocationStore();
  const locationName = user?.location ?? "Nowhere";
  const shopItems = Array.from(Object.values(itemData)).filter((i) => itemNames.includes(i.name));

  const filteredItems = shopItems.filter((i) => i.category === shopFilter || shopFilter === null);
  return (
    <section className="grid gap-4">
      <div className="sticky-header sticky top-0 z-20 p-2">
        <DialogHeader title={`${capitalize(locationName)} Shop`} />
        <ShopCategory />
      </div>
      <div className="grid grid-cols-2 gap-3 p-4">
        {filteredItems.map((item) => (
          <Card
            size="full"
            key={item.name}
            className="relative overflow-hidden bg-primary/80 p-4 transition-all hover:bg-primary-dark/40"
          >
            <div className="z-1 relative flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="rounded-full bg-amber-950/50 p-2">
                  <Image
                    src={item.img.src}
                    alt={item.img.alt}
                    width={20}
                    height={20}
                    className="object-contain"
                  />
                </div>
                <div>
                  <h4 className="text-sm capitalize text-amber-200">{item.name}</h4>
                  <p className="text-xs text-amber-100/70">{item.description}</p>
                </div>
              </div>
              <div className="flex gap-2 place-self-end">
                <Button variant="light" size="sm">
                  <span className="text-slate-950">Buy</span>
                </Button>{" "}
              </div>
            </div>
          </Card>
        ))}
      </div>
    </section>
  );
};

export default ShopDialog;
