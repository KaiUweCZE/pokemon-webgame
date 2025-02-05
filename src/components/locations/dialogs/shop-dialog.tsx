import { useCurrentUser } from "@/hooks/use-current-user";
import { Button } from "@/components/ui/primitives/button";
import { useLocationStore } from "@/store/location-store";
import { type ItemType } from "@/types/user";

interface ShopItem {
  id: ItemType;
  name: string;
  price: number;
  description: string;
}

const SHOP_ITEMS: ShopItem[] = [
  { id: "pokeball", name: "Poké Ball", price: 100, description: "Used to catch Pokémon" },
  { id: "potion", name: "Potion", price: 150, description: "Heals 20 HP" },
  // další itemy...
];

export const ShopDialog = () => {
  const { data: user } = useCurrentUser();
  const { closeDialog, setActionInProgress } = useLocationStore();

  const handleBuy = async (item: ShopItem) => {
    try {
      setActionInProgress(true);
      // TODO: Implementace nákupu
      closeDialog();
    } catch (error) {
      console.error("Purchase failed:", error);
    } finally {
      setActionInProgress(false);
    }
  };

  return (
    <div className="space-y-4">
      <div className="text-amber-100">
        <p>Welcome to the Shop!</p>
      </div>
      <div className="grid gap-3">
        {SHOP_ITEMS.map((item) => (
          <div key={item.id} className="flex items-center justify-between gap-4">
            <div>
              <h3 className="text-amber-200">{item.name}</h3>
              <p className="text-sm text-amber-100/70">{item.description}</p>
            </div>
            <Button onClick={() => handleBuy(item)} variant="basic" className="shrink-0">
              Buy ({item.price})
            </Button>
          </div>
        ))}
      </div>
    </div>
  );
};
