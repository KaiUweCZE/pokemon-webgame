"use client"
import { Dispatch, SetStateAction, useState } from "react"
import teddiursaImg from "@/assets/images/pokemons/teddiursa.webp"
import eeveeImg from "@/assets/images/pokemons/eevee.webp"
import Image from "next/image"
import { addPokemon } from "./action"

interface ThirdSceneProps {
    step: number,
    setStep: Dispatch<SetStateAction<number>>,
}

const ThirdScene = (props: ThirdSceneProps) => {
    const [active, setActive] = useState({index: 0, active: false})

    const handleAddPokemon = async (e:string) => {
        //e.preventDefault();
        const newUser = await addPokemon({username: "kai-uwe", pokemonName: e, pokemonLevel:5});
        console.log(newUser);
        console.log("done");
        
      };

    return(
        <section className="third-scene">
            <div className="box">
                <div>
                    <Image src={teddiursaImg} alt="pokemon image" width={180} height={180} onClick={() => handleAddPokemon("teddiursa")} />
                    <article className="pokemon-info">
                        <div>
                            <h3 >Teddiursa</h3>
                            <button className="button-primary" onClick={() => setActive({index:0, active:!active.active})}>more about</button>
                        </div>
                        <p className={active.active && active.index === 0 ? "active" : ""}>Lorem ipsum dolor sit amet consectetur adipisicing elit. Amet minus eum quo voluptatem illo odit, deleniti exercitationem neque eius nam nisi officiis ducimus quaerat.</p>
                    </article>
                </div>
                <div>
                    <Image src={eeveeImg}  alt="pokemon image" width={180} height={180} onClick={() => handleAddPokemon("eevee")}/>
                    <article className="pokemon-info">
                    <div>
                            <h3 >Eeevee</h3>
                            <button className="button-primary" onClick={() => setActive({index:1, active:!active.active})}>more about</button>
                        </div>
                        <p className={active.active && active.index === 1 ? "active" : ""}>Lorem ipsum dolor sit amet consectetur adipisicing elit. Amet minus eum quo voluptatem illo odit, deleniti exercitationem neque eius nam nisi officiis ducimus quaerat.</p>
                    </article>
                </div>
            </div>
            <button className="button-primary" onClick={() => props.setStep(props.step - 1)}>prev</button>
        </section>
    )
}


export default ThirdScene