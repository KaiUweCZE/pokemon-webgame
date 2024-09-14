export type Objective = {
  type: string;
  target: string;
  requiredAmount: number;
  currentAmount: number;
  completed: boolean;
  //questId: string;
};

export interface Quest {
  id: string;
  name: string;
  description: string;
  from: string;
  startDay: number;
  endDay: number | null;
  duration: number;
  location: string | null;
  rewards: { name: string; count: number }[];
  completed: boolean;
  objectives: Objective[];
  progress: string;
  rewarded: boolean;
}
