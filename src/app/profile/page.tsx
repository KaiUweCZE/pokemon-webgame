"use client";
import { useCurrentUser } from "@/hooks/use-current-user";

const ProfilePage = () => {
  const { data } = useCurrentUser();
  return (
    <div className="p-8">
      <h1 className="mb-4 text-2xl font-bold">Dashboard</h1>
      <pre>{JSON.stringify(data, null, 2)}</pre>
    </div>
  );
};

export default ProfilePage;
