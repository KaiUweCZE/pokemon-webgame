"use client";
import { useSession } from "next-auth/react";
import { useContext } from "react";
import { changeLocation } from "@/app/map/action";
import { MapContext } from "@/app/map/MapContext";

const useChangeLocation = () => {
  const { data, update } = useSession();
  const context = useContext(MapContext);

  if (!data) {
    throw new Error("data is missing");
  }

  if (!context) {
    throw new Error("context is missing");
  }

  const user = data.user;
  const { error, setError, loader, setLoader } = context;
  const handleChangeLocation = async (newLocation: string) => {
    try {
      const updatedUser = await changeLocation(user.name, newLocation);
      if (
        updatedUser &&
        "location" in updatedUser &&
        "partOfDay" in updatedUser
      ) {
        if (user.partOfDay < 3) {
          setLoader(true);
          const newSession = {
            ...data,
            user: {
              ...data?.user,
              location: updatedUser?.location,
              partOfDay: updatedUser?.partOfDay,
            },
          };
          await update(newSession);
        }
      } else {
        throw new Error("Invalid update data");
      }
    } catch (error) {
      setError(true);
      console.error("Failed to change location:", error);
    }
    setLoader(false);
  };

  return { loader, error, setError, setLoader, handleChangeLocation };
};

export default useChangeLocation;
