"use client";
import { useSession } from "next-auth/react";
import { changeLocation } from "./action";
import { useRouter } from "next/navigation";
import { Dispatch, SetStateAction } from "react";

interface MapProps {
  routes: string[];
  fight: boolean;
  setError: Dispatch<SetStateAction<boolean>>;
  setLoader: Dispatch<SetStateAction<boolean>>;
}

const MapMenu = ({ routes, fight, setError, setLoader }: MapProps) => {
  const { data: session, update } = useSession();
  const router = useRouter();

  if (!session) {
    throw new Error("data is missing");
  }
  const user = session.user;

  const handleChangeLocation = async (route: string) => {
    const updatedUser = await changeLocation(user.name, route);

    if (
      updatedUser &&
      "location" in updatedUser &&
      "partOfDay" in updatedUser
    ) {
      setLoader(true);
      if (user.partOfDay < 3) {
        const newSession = {
          ...session,
          user: {
            ...session?.user,
            location: updatedUser?.location,
            partOfDay: updatedUser?.partOfDay,
          },
        };
        await update(newSession);
      }
    } else {
      setError(true);
    }

    setLoader(false);
    // Update session with new user location
    console.log("You must wait until the next day");

    console.log("updated user:", updatedUser);
    console.log("updated session:", session);
  };

  return (
    <div className="map-menu">
      <div className="map-menu-section">
        <h3>routes:</h3>
        <ul>
          {routes.map((route) => (
            <li key={route} onClick={() => handleChangeLocation(route)}>
              {route}
            </li>
          ))}
        </ul>
      </div>
      <div className="map-menu-section">
        <h3>options:</h3>
        <ul>
          {fight && <li onClick={() => router.push("/battle")}>fight</li>}
        </ul>
      </div>
    </div>
  );
};

export default MapMenu;
