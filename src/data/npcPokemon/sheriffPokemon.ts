import { getAttacksFromNames } from "@/utils/battle-function/getAttacksFromNames";

const growlitheAttackNames = ["ember"];

export const sheriffPokemons = {
  id: "Sheriff",
  pokemons: [
    {
      name: "Growlithe",
      type: ["fire"],
      level: 25,
      attacks: ["ember"],
      abilities: ["Guts", "No Guard"],
      speedRate: 1.2,
      damageRate: 1,
      hpRate: 1,
      defenseRate: 1,
      energyRate: 1,
    },
  ],
};
