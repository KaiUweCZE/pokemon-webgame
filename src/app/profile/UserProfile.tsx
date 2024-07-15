import { User } from "@/types/user";
import Image from "next/image";
import firstCharImg from "@/assets/images/main-char-1.webp";
import secondCharImg from "@/assets/images/main-char-2.webp";
import { badgesData } from "@/data/badgeData";

interface UserProfileProps {
  user: User;
}

const UserProfile: React.FC<UserProfileProps> = ({ user }) => {
  const badges = badgesData.filter((badge) => user.badges.includes(badge.id));

  return (
    <section className="section-profile">
      <Image
        src={user.profileImg === "1" ? firstCharImg : secondCharImg}
        alt="profile image"
        width={200}
        height={400}
        priority={false}
      />
      <div className="profile-info">
        <ul>
          <li>username: {user.name}</li>
          <li>location: {user.location}</li>
          <li>day: {user.day}</li>
        </ul>
      </div>
      <ul>
        {badges &&
          badges.map((badge) => (
            <Image
              key={badge.id}
              src={badge.img}
              alt="image of badge"
              width={50}
            />
          ))}
      </ul>
    </section>
  );
};

export default UserProfile;
