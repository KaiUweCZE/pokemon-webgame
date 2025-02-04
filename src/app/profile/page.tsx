"use client";
import AccountSection from "@/components/profile/account-section";
import PokemonContainer from "@/components/profile/pokemon-container";
import { useCurrentUser } from "@/hooks/use-current-user";
import { redirect } from "next/navigation";

const ProfilePage = () => {
  const { data: user, isLoading, error } = useCurrentUser();

  if (user === null || user === undefined) redirect("/login");

  return (
    <div className="large-width blur-on mx-auto grid p-8">
      <div className="profile-container">
        <AccountSection user={user} />
        <PokemonContainer pokemons={user.pokemons} />
      </div>
      {/* <pre className="mt-8 border-t border-slate-700 p-4">{JSON.stringify(user, null, 2)}</pre> */}
    </div>
  );
};

export default ProfilePage;
