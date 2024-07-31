export const randomOponentPokemon = (arrayLen: number): number => {
  const element = Math.floor(Math.random() * arrayLen);

  return element;
};
