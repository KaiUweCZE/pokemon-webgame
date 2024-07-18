import { npcData } from "@/data/npcData";

interface CallProps {
  name: string;
}

const Call = ({ name }: CallProps) => {
  const contactData = npcData.find((npc) => npc.name === name);
  return (
    <div className="call">
      <article>
        <h3>{name}</h3>
        <p>{contactData?.message}</p>
      </article>
    </div>
  );
};

export default Call;
