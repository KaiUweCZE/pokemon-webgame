"use client";
import { npcData } from "@/data/npcData";
import Image from "next/image";
import { useContext } from "react";
import { MapContext } from "./MapContext";
import { useRouter } from "next/navigation";

interface NpcNameProps {
  name: string;
}

const NpcBox = ({ name }: NpcNameProps) => {
  const context = useContext(MapContext);
  const npc = npcData.find((e) => e.name === name);
  const router = useRouter();

  const handleFightClick = () => {
    if (npc) {
      router.push(`/npc-battle?name=${encodeURIComponent(npc.name)}`);
    }
  };
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
              </p>
              <button className="button-primary" onClick={handleFightClick}>
                fight
              </button>
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
