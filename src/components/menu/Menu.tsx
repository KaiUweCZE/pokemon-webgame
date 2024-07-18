"use client";
import { useState } from "react";
import MenuItem from "./MenuItem";
import SecondaryMenu from "./SecondaryMenu";
import "./menu.css";
import { signOut, useSession } from "next-auth/react";
import { usePathname, useRouter } from "next/navigation";

const Menu = () => {
  const { data, status } = useSession();
  const router = useRouter();
  const pathname = usePathname();

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
              active={pathname === "/" ? true : false}
            />
            {status === "authenticated" && (
              <>
                <MenuItem
                  name="Profile"
                  link="/profile"
                  active={pathname === "/profile" ? true : false}
                />
                <MenuItem
                  name="Map"
                  link="/map"
                  active={pathname === "/map" ? true : false}
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
      {status === "authenticated" && (
        <SecondaryMenu
          location={data?.user.location ? data.user.location : ""}
        />
      )}
    </header>
  );
};

export default Menu;
