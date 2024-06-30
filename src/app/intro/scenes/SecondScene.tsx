import firstChar from "@/assets/images/main-char-1.webp"
import secondChar from "@/assets/images/main-char-2.webp"
import Image from "next/image"
import { addImage } from "./action"
import { Dispatch, SetStateAction } from "react"


interface SecondSceneProps{
    step: number,
    setStep: Dispatch<SetStateAction<number>>
}

const SecondScene = (props: SecondSceneProps) => {

    const handleAddImage = async (img: string) => {
        const user = await addImage({username: "kai-uwe", image: img})
        props.setStep(props.step + 1)
        console.log("new user", user);
    }

    return(
        <section className="section-choose-profile">
            <h2>Choose your profile</h2>
            <div className="wrapper">
                <div className="profile-image-box" >
                    <Image src={firstChar} alt="prof. Bloom" height={500} width={250} placeholder="blur" onClick={() => handleAddImage("1")} />
                </div>
                <div className="profile-image-box" >
                    <Image src={secondChar} alt="prof. Bloom" height={500} width={250} placeholder="blur" onClick={() => handleAddImage("2")}/>

                </div>
            </div>                    <button className="button-primary" onClick={() => props.setStep(props.step - 1)}>prev</button>
        </section>
    )
}

export default SecondScene