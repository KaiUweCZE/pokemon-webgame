import { ATTACKS } from "./attacks";

type AttackSet = {
  level: number;
  attacks: Attack[]; // Pole objektů útoků, ne stringů
};

export const bulbasaurAttacks: AttackSet[] = [
  { level: 0, attacks: [ATTACKS.tackle, ATTACKS.vineWhip] },
  { level: 10, attacks: [ATTACKS.tackle, ATTACKS.vineWhip] },
  { level: 20, attacks: [ATTACKS.vineWhip, ATTACKS.razorLeaf] },
  { level: 30, attacks: [ATTACKS.vineWhip, ATTACKS.razorLeaf, ATTACKS.solarBeam] },
  // ...
];

export const charmanderAttacks: AttackSet[] = [
  { level: 0, attacks: [ATTACKS.tackle, ATTACKS.ember] },
  { level: 10, attacks: [ATTACKS.tackle, ATTACKS.ember] },
  { level: 20, attacks: [ATTACKS.ember, ATTACKS.fireSpin] },
  { level: 30, attacks: [ATTACKS.ember, ATTACKS.fireSpin, ATTACKS.flamethrower] },
  // ...
];
