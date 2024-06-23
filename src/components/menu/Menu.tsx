"use client";
import MenuItem from "./MenuItem";
import "./menu.css";
import { signOut, useSession } from "next-auth/react";
import { useRouter } from "next/navigation";

const Menu = () => {
  const { status } = useSession();
  const router = useRouter();

  const handlerSignOut = async () => {
    await signOut();
  };

  const handleRoute = () => {
    router.push("/login");
  };

  return (
    <header>
      <nav className="navigation">
        <ul className="menu">
          <MenuItem name="Home" link="/" />
        </ul>
      </nav>
      {status === "authenticated" ? (
        <button className="button-signout" onClick={handlerSignOut}>
          sign out
        </button>
      ) : (
        <button className="button-signout" onClick={handleRoute}>
          sign in
        </button>
      )}
    </header>
  );
};

export default Menu;
