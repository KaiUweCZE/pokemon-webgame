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
        <div className="flex-column">
          <h3>info:</h3>
          <ul className="info">
            <li>username: {user.name}</li>
            <li>location: {user.location}</li>
            <li>day: {user.day}</li>
            <li>pokemons: {user.pokemonIds.length}</li>
          </ul>
        </div>
        <div className="flex-column">
          <h3>{`${user.name} badges:`}</h3>
          <ul className="box-badges">
            {badges &&
              badges.map((badge) => (
                <li key={badge.id}>
                  <Image
                    src={badge.img}
                    alt="image of badge"
                    width={32}
                    height={32}
                  />
                </li>
              ))}
            <li>empty</li>
          </ul>
        </div>
      </div>
    </section>
  );
};

export default UserProfile;
