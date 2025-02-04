import { User } from "@/types/user";
import Image from "next/image";
import { characters } from "@/images";
import { Card } from "../ui/primitives/card";
import ProfileInfoLabel from "./profile-info-label";
import PokemonSix from "./pokemon-six";

interface AccountSectionProps {
  user: User;
}

const AccountSection = ({ user }: AccountSectionProps) => {
  const imageSrc = user.profileImg === "mainChar1" ? characters.mainChar1 : characters.mainChar2;
  const baseInformation: { label: string; data: string }[] = [
    { label: "name", data: user.name },
    { label: "location", data: user.location },
    { label: "pokemons", data: user.pokemons.length.toString() },
  ];

  const activePokemons = user.pokemons.filter((pokemon) =>
    user.activePokemonIds.includes(pokemon.id)
  );

  return (
    <section className="relative grid w-fit grid-cols-2">
      <Image className="profile-img" src={imageSrc.src} alt={imageSrc.alt} width={200} />
      <div className="profile-info-card primary-shadow grid h-fit min-w-64 rounded-md border border-purple-300 bg-primary-dark/85 p-4">
        {baseInformation.map((info) => (
          <ProfileInfoLabel key={info.label} label={info.label} data={info.data} />
        ))}
      </div>
      <PokemonSix />
    </section>
  );
};

export default AccountSection;
