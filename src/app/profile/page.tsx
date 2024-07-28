"use client";
import ProfilePage from "./ProfilePage";
import { ProfileProvider } from "./ProfileContext";

const WrapPage = () => {
  return (
    <ProfileProvider>
      <ProfilePage />
    </ProfileProvider>
  );
};

export default WrapPage;
