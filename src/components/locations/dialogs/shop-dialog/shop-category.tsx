import { Button } from "@/components/ui/primitives/button";
import { Package, ShoppingBag } from "lucide-react";
import { useState } from "react";

const ShopCategory = () => {
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

  return (
    <div className="flex flex-col gap-3">
      <h3 className="text-lg font-medium text-amber-100">Categories</h3>
      <div className="grid gap-2">
        <Button
          variant="light"
          className="justify-start"
          onClick={() => setSelectedCategory("balls")}
        >
          <ShoppingBag className="mr-2 h-5 w-5" />
          Poké Balls
        </Button>
        <Button
          variant="light"
          className="justify-start"
          onClick={() => setSelectedCategory("potions")}
        >
          <Package className="mr-2 h-5 w-5" />
          Potions & Medicine
        </Button>
      </div>
    </div>
  );
};

export default ShopCategory;
