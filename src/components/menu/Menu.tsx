"use client";
import { useState } from "react";
import MenuItem from "./MenuItem";
import SecondaryMenu from "./SecondaryMenu";
import "./menu.css";
import { signOut, useSession } from "next-auth/react";
import { useRouter } from "next/navigation";

const Menu = () => {
  const [active, setActive] = useState({ index: 0, isActive: true });
  const { data, status } = useSession();
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
            <MenuItem
              name="Home"
              link="/"
              index={0}
              active={active}
              setActive={setActive}
            />
            {status === "authenticated" && (
              <>
                <MenuItem
                  name="Profile"
                  link="/profile"
                  index={1}
                  active={active}
                  setActive={setActive}
                />
                <MenuItem
                  name="Map"
                  link="/map"
                  index={2}
                  active={active}
                  setActive={setActive}
                />
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
      <SecondaryMenu location={data?.user.location ? data.user.location : ""} />
    </header>
  );
};

export default Menu;
