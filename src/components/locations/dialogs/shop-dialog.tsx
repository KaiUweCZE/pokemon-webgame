import { useState } from "react";
import { useCurrentUser } from "@/hooks/use-current-user";
import { DialogHeader } from "./components/dialog-header";
import { Card } from "@/components/ui/primitives/card";
import { Button } from "@/components/ui/primitives/button";
import { ShoppingBag, Coins, Package } from "lucide-react";
import { ItemCategory } from "@/types/item";
import { useLocationStore } from "@/store/location-store";
import { capitalize } from "@/utils/string";

interface ShopItem {
  id: string;
  name: string;
  type: ItemCategory;
  price: number;
  description: string;
  quantity?: number;
  icon: React.ReactNode;
}

const SHOP_ITEMS: ShopItem[] = [
  {
    id: "1",
    name: "Pokéball",
    type: "pokeball",
    price: 100,
    description: "A device for catching wild Pokémon",
    icon: <Package className="h-6 w-6 text-amber-200" />,
  },
];

const ShopDialog = () => {
  const { data: user } = useCurrentUser();
  const locationName = user?.location ?? "Nowhere";

  return (
    <div className="grid gap-4">
      <DialogHeader title={`${capitalize(locationName)} Shop`} />
    </div>
  );
};

export default ShopDialog;
/*
interface ShopItem {
  id: ItemType;
  name: string;
  price: number;
  description: string;
}
*/

/*
<DialogHeader
        title="Pokémon Shop"
        rightContent={
          <div className="flex items-center gap-2 text-amber-200">
            <Coins className="h-5 w-5" />
            <span>
              {user?.inventory?.find((item) => item.itemType === "stone")?.quantity || 0} Coins
            </span>
          </div>
        }
      />

      <div className="grid gap-4">
        <div className="flex flex-col gap-3">
          <h3 className="text-lg font-medium text-amber-100">Available Items</h3>
          <div className="grid gap-3">
            {SHOP_ITEMS.map((item) => (
              <Card key={item.id} variant="basic" className="relative overflow-hidden p-4">
                <div className="absolute inset-0 bg-gradient-to-br from-primary/40 to-primary-dark/60 backdrop-blur-sm" />
                <div className="relative z-10 flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    {item.icon}
                    <div>
                      <h4 className="font-medium text-amber-200">{item.name}</h4>
                      <p className="text-sm text-amber-100/70">{item.description}</p>
                    </div>
                  </div>
                  <Button variant="outline" size="sm">
                    <Coins className="mr-2 h-4 w-4" />
                    {item.price}
                  </Button>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </div>


*/
