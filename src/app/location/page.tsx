"use client";
import { useCurrentUser } from "@/hooks/use-current-user";

const LocationPage = () => {
  const { data: user } = useCurrentUser();

  return (
    <div className="large-width blur-on mx-auto bg-amber-100">
      <h1>road</h1>
    </div>
  );
};

export default LocationPage;
