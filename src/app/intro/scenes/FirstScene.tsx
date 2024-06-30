import Image from "next/image"
import profBloom from "@/assets/images/prof-bloom.webp"
import { Dispatch, SetStateAction } from "react"

interface SceneProps{
    setStep: Dispatch<SetStateAction<number>>
}

const FirstScene = (props: SceneProps) => {

    return(
        <section className="section-intro">
            <Image src={profBloom} alt="prof. Bloom" height={500} width={250} />
            <article className="article-intro">
                <h2>Hello</h2>
                <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Iure voluptates libero ipsa repellendus voluptatem ullam earum est id, exercitationem a amet dolorum iusto sequi minus ratione nostrum maxime adipisci odit!
                Nemo hic incidunt consectetur dolores ex amet pariatur a officia omnis magnam, libero totam tempore, expedita quae fugiat ad quas iusto praesentium. Error voluptatem fuga ut cumque quisquam, quis tenetur!</p>
                <button className="button-primary" onClick={() => props.setStep(1)}>next</button>
            </article>
        </section>
    )
}

export default FirstScene