export const SWITCHING_DELAY = 1900;

export const switchingTimer = (callback: () => void): (() => void) => {
  const timeoutId = setTimeout(callback, SWITCHING_DELAY);
  return () => clearTimeout(timeoutId);
};

export const customTimer = (
  callback: () => void,
  delay: number
): (() => void) => {
  const timeoutId = setTimeout(callback, delay);
  return () => clearTimeout(timeoutId);
};
