export type Objective = {
  type: string;
  target: string;
  requiredAmount: number;
};

export interface Quest {
  active: boolean;
  name: string;
  description: string;
  from: string;
  minDay: number;
  duration: number;
  objectives: Objective[];
  rewards: { name: string; count: number }[];
}
