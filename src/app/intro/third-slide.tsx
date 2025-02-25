import { Button } from "@/components/ui/primitives/button";
import { PokemonCardIntro } from "@/components/intro/pokemon-card-intro";
import { pokemonsImg } from "@/images/index";
import { ChevronLeft } from "lucide-react";
import { addPokemon } from "@/utils/actions/add-pokemon";
import { generatePokemon } from "@/utils/pokemon-generator";
import { useToast } from "@/components/providers/toast-provider";
import { nextChapter } from "@/utils/actions/next-chapter";
import { useMutation } from "@tanstack/react-query";
import { Response } from "@/types/response";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import { queryClient } from "@/lib/providers";
import teddiursa from "../../../public/images/pokemons/teddiursa.webp";
import eevee from "../../../public/images/pokemons/eevee.webp";

interface ThirdSlideProps {
  handlePrev: () => void;
}

interface StarterPokemon {
  name: string;
  description: string;
  images: (typeof pokemonsImg)[keyof typeof pokemonsImg];
}

const STARTER_POKEMON_LEVEL = 5;

const STARTER_POKEMONS = [
  {
    name: "teddiursa",
    description:
      "A cute and cuddly Pokemon that loves honey. It licks its paws because they're often covered in sweet nectar.",
    image: teddiursa,
    alt: "Teddiursa",
  },
  {
    name: "eevee",
    description:
      "A unique Pokemon with unstable genetic makeup that enables it to evolve in various ways.",
    image: eevee,
    alt: "Eevee",
  },
] as const;

const ThirdSlide = ({ handlePrev }: ThirdSlideProps) => {
  const { showToast } = useToast();
  const router = useRouter();
  const { data: session, update: updateSession } = useSession();

  const selectPokemonMutation = useMutation({
    mutationFn: async (pokemonName: string): Promise<Response> => {
      const pokemonStats = generatePokemon(pokemonName, STARTER_POKEMON_LEVEL);
      const result = await addPokemon(pokemonStats);

      if (!result.success) {
        throw new Error("Failed to add Pokemon");
      }

      const chapterResult = await nextChapter();
      if (!chapterResult.success) {
        throw new Error("Failed to progress chapter");
      }

      return { success: true };
    },
    onSuccess: async (_, pokemonName) => {
      showToast(`${pokemonName} has joined your team!`, "success");

      // Get fresh user data
      //const updatedUser = await getCurrentUser();

      // Update session with new data
      await updateSession({
        user: {
          ...session?.user,
          chapter: 1,
        },
      });

      queryClient.invalidateQueries({ queryKey: ["current-user"] });
      router.replace("/profile");
    },
    onError: (error) => {
      showToast(error instanceof Error ? error.message : "Failed to start your journey", "error");
    },
  });
  const handleSelectPokemon = async (pokemonName: string) => {
    if (selectPokemonMutation.isPending) return;
    selectPokemonMutation.mutate(pokemonName);
  };

  return (
    <div>
      <h1 className="mb-8 place-self-center text-3xl">Choose your first pokemon</h1>
      <div className="intro-slide third-slide">
        {STARTER_POKEMONS.map((pokemon) => (
          <PokemonCardIntro
            key={pokemon.name}
            name={pokemon.name}
            description={pokemon.description}
            pokemonImg={pokemon.image}
            alt={pokemon.alt}
            isLoading={selectPokemonMutation.isPending}
            onSelect={() => handleSelectPokemon(pokemon.name)}
            disabled={selectPokemonMutation.isPending}
          />
        ))}
        <Button
          variant="basic"
          className="mt-40"
          onClick={handlePrev}
          disabled={selectPokemonMutation.isPending}
          leftIcon={<ChevronLeft className="h-4 w-4" />}
        >
          <span>back</span>
        </Button>
      </div>
    </div>
  );
};

export default ThirdSlide;
