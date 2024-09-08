import { createContext, ReactNode } from "react";

interface DailyQuestType {}

export const DailyQuestContext = createContext<DailyQuestType | undefined>(
  undefined
);

interface DailyQuestProviderProps {
  children: ReactNode;
}

export const DailyQuestProvider = ({ children }: DailyQuestProviderProps) => {
  const contextVaules = {};

  return (
    <DailyQuestContext.Provider value={contextVaules}>
      {children}
    </DailyQuestContext.Provider>
  );
};
