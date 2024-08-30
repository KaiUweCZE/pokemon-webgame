interface HeroData {
  title: string;
  description: string;
}

interface ChampionData {
  name: string;
  description: string;
}

interface EliteFourMember {
  name: string;
  description: string;
}

interface PageData {
  hero: HeroData;
  champion: ChampionData;
  eliteFour: EliteFourMember[];
}

export const pageData: PageData = {
  hero: {
    title: "Tekel",
    description: "",
  },
  champion: {
    name: "Bernard",
    description: "",
  },
  eliteFour: [
    { name: "Golias", description: "" },
    { name: "Nana", description: "" },
    { name: "Confusitionus", description: "" },
    { name: "Makatai", description: "" },
  ],
};
