"use client";
import { npcData } from "@/data/npcData";
import Image from "next/image";
import { useContext } from "react";
import { MapContext } from "./MapContext";

interface NpcNameProps {
  name: string;
}

const NpcBox = ({ name }: NpcNameProps) => {
  const context = useContext(MapContext);
  const npc = npcData.find((e) => e.name === name);
  return (
    <>
      {npc && (
        <section className="container-npc">
          <div className="box-npc">
            <article>
              <span>{npc.name}</span>
              <p>
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Vero
                reprehenderit magni voluptate alias, mollitia quibusdam modi
                error, sint facere in possimus dolor suscipit quasi debitis quae
                eveniet deleniti ipsam eius. Itaque ullam excepturi hic tenetur
                quibusdam ut numquam laudantium aliquid quisquam? Quis, quaerat
                qui vitae sunt nobis amet et perspiciatis nesciunt, iusto
                accusantium quisquam illum iure aliquam, optio pariatur porro?
                Exercitationem blanditiis temporibus vitae facere amet sapiente
                enim, beatae error ad dignissimos? Vel, quae vitae. In assumenda
                tempore a facere molestias architecto quaerat perspiciatis
                explicabo accusamus. A nam voluptas laboriosam. Lorem ipsum
                dolor sit amet consectetur adipisicing elit. Veritatis rem earum
                iusto recusandae, repellendus explicabo ullam harum, ex, autem
                enim fugiat quasi temporibus sapiente repellat accusantium
                quibusdam deserunt iste officiis? Odio, dolore voluptatibus,
                doloremque, velit esse cupiditate voluptates amet optio expedita
                tempora eius nobis veritatis doloribus. Enim corporis
                perspiciatis amet. Distinctio inventore voluptatem
                exercitationem suscipit earum dolor ad vitae veniam. Dolorem
                enim accusantium fugit aliquid nostrum, asperiores soluta
                provident officia rerum, sint illum nulla? Voluptas aut minima
                corporis, reiciendis consequatur commodi aspernatur dolore quam
                accusantium error ipsa voluptatibus quod voluptatum! Accusamus
                perferendis aliquam, expedita, quia laborum aspernatur nostrum
                cum porro neque illo inventore, minima sit eum! Deserunt itaque
                nesciunt culpa, quaerat ipsa, labore quos eveniet quidem
                necessitatibus id aspernatur consequuntur. Sapiente consectetur
                dignissimos possimus numquam quibusdam, quos dicta temporibus!
                Voluptatem itaque tempore nulla, animi repellendus eos. Saepe
                aut quam voluptatum minus vel fuga deserunt optio perspiciatis,
                blanditiis molestias iure aperiam?
              </p>
            </article>
            <button
              className="button-primary"
              onClick={() => context?.setNpc("")}
            >
              close
            </button>
          </div>
          <Image
            className="npc-image"
            src={npc.img}
            alt="image of npc"
            width={240}
            height={480}
          />
        </section>
      )}
    </>
  );
};

export default NpcBox;
