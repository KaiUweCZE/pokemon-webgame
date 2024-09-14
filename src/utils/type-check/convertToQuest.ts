import { Quest } from "@/types/quest";

type ConversionMap<T> = {
  [K in keyof T]: (value: any, source: any) => T[K];
};

function createConverter<T>(conversionMap: ConversionMap<T>) {
  return (source: any): T => {
    const result = {} as T;
    for (const key in conversionMap) {
      result[key] = conversionMap[key](source[key], source);
    }
    return result;
  };
}

const questConversionMap: ConversionMap<Quest> = {
  id: (value) => value,
  name: (value) => value,
  description: (value) => value,
  from: (value) => value,
  startDay: (value) => value ?? 0,
  endDay: (value) => value ?? null,
  location: (value) => value ?? null,
  completed: (value) => value,
  duration: (_, source) =>
    (source.endDay ?? 0) - (source.startDay ?? 0) ?? null,
  rewards: (value) => value as { name: string; count: number }[],
  objectives: (value) => value,
  rewarded: (value) => value,
  progress: (value) => value as string,
};

export const convertToQuest = createConverter<Quest>(questConversionMap);
