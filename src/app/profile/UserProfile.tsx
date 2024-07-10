import { User } from "@/types/user";
import Image from "next/image";
import firstCharImg from "@/assets/images/main-char-1.webp";
import secondCharImg from "@/assets/images/main-char-2.webp";

interface UserProfileProps {
  user: User;
}

const UserProfile: React.FC<UserProfileProps> = ({ user }) => {
  return (
    <section className="section-profile">
      <Image
        src={user.profileImg === "1" ? firstCharImg : secondCharImg}
        alt="profile image"
        width={200}
        height={400}
      />
      <div className="profile-info">
        <ul>
          <li>username: {user.name}</li>
          <li>location: {user.location}</li>
          <li>day: {user.day}</li>
        </ul>
      </div>
    </section>
  );
};

export default UserProfile;
