import { BattlePokemon, Pokemon } from "@/types/pokemon";

export const toBattlePokemon = (pokemon: Pokemon): BattlePokemon => {
  const { createdAt, userId, evolutionInformed, ...battleProperties } = pokemon;

  return {
    ...battleProperties,
    attackCooldowns: pokemon.attacks.reduce(
      (cooldowns, attack) => ({
        ...cooldowns,
        [attack]: 0,
      }),
      {}
    ),
  };
};
