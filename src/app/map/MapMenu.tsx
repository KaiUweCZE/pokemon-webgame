"use client";
import { useSession } from "next-auth/react";
import { changeLocation } from "./action";
import { useRouter } from "next/navigation";

interface MapProps {
  routes: string[];
  fight: boolean;
}

const MapMenu = ({ routes, fight }: MapProps) => {
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
    }

    // Update session with new user location
    console.log("You must wait until the next day");

    console.log("updated user:", updatedUser);
    console.log("updated session:", session);
  };

  return (
    <ul className="map-menu">
      {routes.map((route) => (
        <li key={route} onClick={() => handleChangeLocation(route)}>
          {route}
        </li>
      ))}
      {fight && <li onClick={() => router.push("/battle")}>fight</li>}
    </ul>
  );
};

export default MapMenu;
