export const randomNumber = (number: number): number => {
  const result = Math.ceil(Math.random() * number) - 1;

  return result;
};
