import BattleBag from "@/components/battle/menu/battle-bag";
import { Button } from "@/components/ui/primitives/button";
import { calculateExpGain, calculateExpToNextLevel } from "@/utils/pokemon-exp";

export default function Home() {
  console.log("Level 5 needs kills:", calculateExpToNextLevel("charmander", 5)); // Mělo by být ~2
  console.log("Level 11 needs kills:", calculateExpToNextLevel("charmander", 11)); // Mělo by být ~3.2
  console.log("Level 19 needs kills:", calculateExpToNextLevel("charmander", 19)); // Mělo by být ~4.6
  console.log("Level 28 needs kills:", calculateExpToNextLevel("charmander", 28)); // Mělo by být ~6.2
  console.log("Level 40 needs kills:", calculateExpToNextLevel("charmander", 40)); // Mělo by být ~10*
  console.log("Level 50 needs kills:", calculateExpToNextLevel("charmander", 50)); // Mělo by být ~15*/

  console.log("Level 5 gain exp:", calculateExpGain("sandslash", 5, "charmander", 5));

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
        <section className="bg-content p-4">
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
        </section>
      </main>
    </div>
  );
}
