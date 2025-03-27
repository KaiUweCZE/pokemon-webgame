export default function Home() {
  /* const { showToast } = useToast();
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
  };*/

  const bgSection = "bg-[#fefae083] shadow-secondary rounded-sm";
  const textPrimary = "text-slate-950 font-medium";
  const textSecondary = "text-slate-950/80";

  return (
    <div className="blur-on bg-background">
      <main className="max-width mx-auto grid">
        <div className="bg-[#faedcd7e] px-8 py-8 text-slate-950/70">
          <header className="mb-8 bg-[#fefae083] text-center">
            <h1 className={`mb-4 text-3xl ${textPrimary} md:text-4xl`}>
              Pokémon Adventure: Race to the Tekel Area League
            </h1>
            <p className={`text-lg ${textSecondary}`}>
              A strategic journey with exactly 100 days to prove your worth as a Pokémon trainer.
            </p>
          </header>

          <section className={`${bgSection} mb-8 p-6`}>
            <h2 className={`mb-4 text-2xl ${textPrimary}`}>Game Concept</h2>
            <p className="mb-4">
              As an aspiring Pokémon trainer, your ultimate goal is clear: qualify for the Tekel
              Area League competition by proving your skills across the region.
            </p>
            <ul className="list-disc space-y-2 pl-6">
              <li>
                <span className="font-medium">Time Limit:</span> You have exactly 100 game days to
                prepare
              </li>
              <li>
                <span className="font-medium">Qualification Requirement:</span> Earn a minimum of 8
                badges from gym leaders
              </li>
              <li>
                <span className="font-medium">Dynamic World:</span> Characters and storylines evolve
                throughout your journey
              </li>
              <li>
                <span className="font-medium">Strategic Planning:</span> Every decision shapes your
                path to the championship
              </li>
            </ul>
          </section>

          <section className={`${bgSection} mb-8 p-6`}>
            <h2 className={`mb-4 text-2xl ${textPrimary}`}>Time Management and Core Mechanics</h2>
            <p className="mb-4">Managing your limited time is crucial to your success:</p>
            <ul className="list-disc space-y-2 pl-6">
              <li>
                <span className="font-medium">Day Structure:</span> Each day consists of three
                action phases (morning, afternoon, evening)
              </li>
              <li>
                <span className="font-medium">Action Economy:</span> Every major activity consumes
                one phase of the day
              </li>
              <li>
                <span className="font-medium">Strategic Choices:</span> Balance training,
                exploration, traveling, and recovery
              </li>
            </ul>
          </section>

          <section className={`${bgSection} mb-8 p-6`}>
            <h2 className={`mb-4 text-2xl ${textPrimary}`}>Game Activities</h2>
            <p className="mb-4">
              During your journey, you'll engage in various exciting activities:
            </p>
            <ul className="list-disc space-y-2 pl-6">
              <li>
                <span className="font-medium">Exploration:</span> Discover wild Pokémon in different
                locations
              </li>
              <li>
                <span className="font-medium">Quests:</span> Complete missions for rewards and story
                progression
              </li>
              <li>
                <span className="font-medium">Battles:</span> Challenge NPC trainers to test your
                skills
              </li>
              <li>
                <span className="font-medium">Training:</span> Develop new moves and abilities for
                your Pokémon
              </li>
              <li>
                <span className="font-medium">Healing:</span> Restore your team at Pokecenters
              </li>
              <li>
                <span className="font-medium">Travel:</span> Journey between areas, each with unique
                opportunities
              </li>
            </ul>
          </section>

          <section className={`${bgSection} mb-8 p-6`}>
            <h2 className={`mb-4 text-2xl ${textPrimary}`}>Area Exploration</h2>
            <p className="mb-4">
              The world is divided into distinctive regions, each offering unique Pokémon:
            </p>
            <ul className="list-disc space-y-2 pl-6">
              <li>
                <span className="font-medium">Region Structure:</span> Each area is divided into 4
                distinct sections
              </li>
              <li>
                <span className="font-medium">Difficulty Progression:</span> As you venture deeper,
                you'll encounter stronger Pokémon
              </li>
              <li>
                <span className="font-medium">Outer Zones:</span> Home to weaker Pokémon with modest
                rewards
              </li>
              <li>
                <span className="font-medium">Inner Zones:</span> Host to more formidable opponents
                with greater potential
              </li>
              <li>
                <span className="font-medium">Time Investment:</span> Each exploration session
                consumes 1/3 of a game day
              </li>
            </ul>
          </section>

          <section className={`${bgSection} mb-8 p-6`}>
            <h2 className={`mb-4 text-2xl ${textPrimary}`}>About Pokémon</h2>
            <p className="mb-4">
              Your journey revolves around catching and training unique Pokémon:
            </p>
            <ul className="list-disc space-y-2 pl-6">
              <li>
                <span className="font-medium">Random Stat Modifiers:</span> Each Pokémon has random
                modifiers (0.5-1.5) applied to their basic stats
              </li>
              <li>
                <span className="font-medium">Evolution Mechanics:</span> Pokémon evolve through
                level advancement, special items, or unique conditions
              </li>
              <li>
                <span className="font-medium">Special Evolutions:</span> Some Pokémon have
                location-specific evolution requirements
              </li>
              <li>
                <span className="font-medium">Ability Training:</span> Learn new moves with varying
                training durations and success rates
              </li>
              <li>
                <span className="font-medium">Ability Limits:</span> Pokémon can master a maximum of
                3 abilities
              </li>
            </ul>
          </section>

          <section className={`${bgSection} mb-8 p-6`}>
            <h2 className={`mb-4 text-2xl ${textPrimary}`}>The Tekel Area League</h2>
            <p className="mb-4">After 100 days, the moment of truth arrives:</p>
            <ul className="list-disc space-y-2 pl-6">
              <li>
                <span className="font-medium">Qualification:</span> If you've earned 8 badges,
                you'll qualify for the League
              </li>
              <li>
                <span className="font-medium">Location:</span> All qualified trainers must travel to
                Futurome City
              </li>
              <li>
                <span className="font-medium">Tournament Format:</span> Face daily matches,
                advancing until defeated
              </li>
              <li>
                <span className="font-medium">Elite Four Challenge:</span> Exceptional trainers may
                earn the right to challenge the Elite Four
              </li>
              <li>
                <span className="font-medium">Randomized Opponents:</span> Unlike traditional games,
                you'll face random competitors
              </li>
            </ul>
          </section>

          <div className="mt-8 text-center">
            <p className={`text-lg font-medium italic ${textPrimary}`}>
              Can you build a championship-worthy team and claim victory in just 100 days?
            </p>
            <p className={`mt-2 text-lg font-medium ${textPrimary}`}>
              Every decision matters in this race against time!
            </p>
          </div>
        </div>
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
