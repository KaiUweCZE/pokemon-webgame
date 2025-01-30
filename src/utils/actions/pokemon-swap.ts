import { User } from "@/types/user";
import { prisma } from "../../../prisma";

const getPokemonPosition = (user: User, pokemonId: string) => {
  return user.activePokemonIds.indexOf(pokemonId);
};
// example usage
const updatedActiveIds = [...user.activePokemonIds];
[updatedActiveIds[0], updatedActiveIds[2]] = [updatedActiveIds[2], updatedActiveIds[0]];

await prisma.user.update({
  where: { name: user.name },
  data: { activePokemonIds: updatedActiveIds },
});
