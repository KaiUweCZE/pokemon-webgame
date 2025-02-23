import { Button } from "@/components/ui/primitives/button";
import { cn } from "@/utils/cn";
import { FlaskConical, Package, ShoppingBag } from "lucide-react";
import { useState } from "react";

const ShopCategory = () => {
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

  return (
    <div className="flex flex-col gap-3">
      <div className="flex gap-2">
        <Button
          variant="light"
          className={cn("justify-start", selectedCategory === "balls" && "bg-amber-100")}
          onClick={() => setSelectedCategory("balls")}
        >
          <ShoppingBag className="mr-2 h-5 w-5" />
          Poké Balls
        </Button>
        <Button
          variant="light"
          className={cn("justify-start", selectedCategory === "potions" && "bg-amber-100")}
          onClick={() => setSelectedCategory("potions")}
          leftIcon={<FlaskConical className="h-5 w-5" />}
        >
          Potions & Medicine
        </Button>
      </div>
    </div>
  );
};

export default ShopCategory;
