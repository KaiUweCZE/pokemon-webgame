"use client";
import { useContext, useState } from "react";
import MenuItem from "./MenuItem";
import SecondaryMenu from "./SecondaryMenu";
import "./menu.css";
import { signOut, useSession } from "next-auth/react";
import { usePathname, useRouter } from "next/navigation";
import { UserContext } from "@/contexts/UserContext";

const Menu = () => {
  const { data, status } = useSession();
  const router = useRouter();
  const pathname = usePathname();
  const context = useContext(UserContext);

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
            {!context?.isLog && (
              <MenuItem
                name="Home"
                link="/"
                active={pathname === "/" ? true : false}
              />
            )}
            {context?.isLog && (
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
        {context?.isLog ? (
          <button className="button-signout" onClick={handlerSignOut}>
            sign out
          </button>
        ) : (
          <button className="button-signout" onClick={handleRoute}>
            sign in
          </button>
        )}
      </div>
      {context?.isLog && (
        <SecondaryMenu
          location={data?.user.location ? data.user.location : ""}
        />
      )}
    </header>
  );
};

export default Menu;
