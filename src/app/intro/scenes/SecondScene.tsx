import firstChar from "@/assets/images/main-char-1.webp";
import secondChar from "@/assets/images/main-char-2.webp";
import Image from "next/image";
import { initialProfile } from "./action";
import { Dispatch, SetStateAction } from "react";
import { useSession } from "next-auth/react";

interface SecondSceneProps {
  step: number;
  setStep: Dispatch<SetStateAction<number>>;
  username: string;
}

const SecondScene = ({ step, setStep, username }: SecondSceneProps) => {
  const { data, update } = useSession();
  const handleAddImage = async (img: string) => {
    const updatedUser = await initialProfile({
      username: username,
      image: img,
    });
    setStep(step + 1);
    console.log("new user", updatedUser);

    await update({ ...data, user: updatedUser });
  };

  return (
    <section className="second-scene">
      <div className="wrapper">
        <div className="profile-image-box">
          <Image
            src={firstChar}
            alt="prof. Bloom"
            height={500}
            width={250}
            placeholder="blur"
            onClick={() => handleAddImage("1")}
          />
        </div>
        <div className="profile-image-box">
          <Image
            src={secondChar}
            alt="prof. Bloom"
            height={500}
            width={250}
            placeholder="blur"
            onClick={() => handleAddImage("2")}
          />
        </div>
      </div>{" "}
      <article>
        <p>Choose one of the profiles and proceed to the Pokémon selection</p>
        {/*<button
          className="button-primary"
          onClick={() => setStep(step - 1)}
        >
          prev
        </button>*/}
      </article>
    </section>
  );
};

export default SecondScene;
