"use client";
import { useToast } from "@/components/providers/toast-context";
import { Button } from "@/components/ui/primitives/button";
import { PokemonName, PokemonType } from "@/types/pokemon";
import { calculateExpGain } from "@/utils/pokemon-exp";
import { calculatePokemonRating } from "@/utils/pokemon-stats";

export default function Home() {
  const { showToast } = useToast();

  const handleToast = () => {
    showToast("This is a toast", "success");
  };

  const eevee = {
    name: "eevee" as PokemonName,
    types: ["normal"] as PokemonType[],
    level: 15,
    maxHp: 126,
    maxEnergy: 18,
    damage: 28,
    defense: 25,
    speed: 21,
  };

  const handleButtonToast = () => {
    calculatePokemonRating(eevee, 15);
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
        <div>
          <Button onClick={handleToast}>Toast</Button>
        </div>

        <Button onClick={handleButtonToast}>Check pokemon rates</Button>
      </main>
    </div>
  );
}

{
  /* <section className="bg-content p-4">
          <article>
            <h2>Buttons</h2>
          </article>
          <div className="grid grid-cols-8 gap-4 bg-teal-800 px-8 py-4">
            <Button variant="primary" withRipple>
              Button
            </Button>
            <Button variant="secondary" withRipple>
              Button
            </Button>
            <Button variant="light" withRipple>
              Button
            </Button>
            <Button variant="basic" withRipple>
              Button
            </Button>
            <Button variant="destructive" withRipple>
              Button
            </Button>
            <Button variant="outline" withRipple>
              Button
            </Button>
            <Button variant="ghost" withRipple>
              Button
            </Button>
            <Button variant="link" withRipple>
              Button
            </Button>
            <Button variant="primary" shadow>
              Button
            </Button>
            <Button variant="secondary" shadow>
              Button
            </Button>
            <Button variant="light" shadow>
              Button
            </Button>
            <Button variant="basic" shadow>
              Button
            </Button>
            <Button variant="destructive" shadow>
              Button
            </Button>
            <Button variant="outline" shadow>
              Button
            </Button>
            <Button variant="ghost" shadow>
              Button
            </Button>
            <Button variant="link" shadow>
              Button
            </Button>
          </div>
        </section> */
}
