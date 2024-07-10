"use client";
import MenuItem from "./MenuItem";
import "./menu.css";
import { signOut, useSession } from "next-auth/react";
import { useRouter } from "next/navigation";

const Menu = () => {
  const { status } = useSession();
  const router = useRouter();

  const handlerSignOut = async () => {
    await signOut({ redirect: true, callbackUrl: "/" });
  };

  const handleRoute = () => {
    router.push("/login");
  };

  return (
    <header>
      <div className="container-menu">
        <nav className="navigation">
          <ul className="menu">
            <MenuItem name="Home" link="/" />
            {status === "authenticated" && (
              <>
                <MenuItem name="Profile" link="/profile" />
              </>
            )}
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
      </div>
    </header>
  );
};

export default Menu;
