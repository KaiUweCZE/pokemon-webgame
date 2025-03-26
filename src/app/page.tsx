"use client";
import ColorPalette from "@/components/helpers/color-palette";
import { Button } from "@/components/ui/primitives/button";
import { Input } from "@/components/ui/primitives/input";
import { isValidItemName, ItemName } from "@/types/item";
import { useState } from "react";
import { useGetItem } from "@/hooks/use-get-item";
import { useCurrentUser } from "@/hooks/use-current-user";
import { useToast } from "@/components/providers/toast-provider";

export default function Home() {
  const { showToast } = useToast();
  const { data: user } = useCurrentUser();
  const [items, setItems] = useState("");
  const [number, setNumber] = useState(0);
  const { getItem, isLoading } = useGetItem();

  const handleToast = () => {
    showToast("This is a toast", "success");
  };

  const handleGetItems = (e: React.FormEvent) => {
    e.preventDefault();
    if (!isValidItemName(items) || !user?.id) {
      console.log("Invalid item");
      return;
    }

    const result = getItem({
      item: { itemName: items, quantity: number ?? 1 },
      userId: user.id,
    });

    console.log("Items were updated:", result);
  };

  return (
    <div className="blur-on bg-background">
      <main className="max-width mx-auto grid">
        <section className="bg-content p-4">
          <article>
            <h2 className="text-lg font-bold">Welcome to Pokemon!</h2>
            <p>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Eos ipsam error cupiditate
              vel facere maiores debitis totam nobis deleniti magni reiciendis veniam doloribus
              consectetur id, molestias officiis a eligendi ea.
            </p>
          </article>
        </section>
        <section className="bg-content-secondary p-4">
          <article>
            <h2 className="text-lg font-bold">Champion</h2>
            <p>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Eos ipsam error cupiditate
              vel facere maiores debitis totam nobis deleniti magni reiciendis veniam doloribus
              consectetur id, molestias officiis a eligendi ea.
            </p>
          </article>
        </section>
      </main>
    </div>
  );
}

/*

 <div>
          <form className="m-4" onSubmit={(e) => handleGetItems(e)}>
            <Input
              variant="secondary"
              size="lg"
              className="w-48 border-primary text-slate-950"
              onChange={(e) => setItems(e.target.value)}
            />
            <Input
              type="number"
              size="lg"
              className="w-48 border-primary text-slate-950"
              onChange={(e) => setNumber(Number(e.target.value))}
            />
            <Button type="submit">{isLoading ? "Loading..." : "get some items"}</Button>
          </form>

          <Button onClick={handleToast}>Toast</Button>
          <Button onClick={() => console.log(user)}>Check User</Button>
        </div>
        
        <ColorPalette />
*/
