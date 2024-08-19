export const randomOponentPokemon = (arrayLength: number): number => {
  const element = Math.floor(Math.random() * arrayLength);

  return element;
};
