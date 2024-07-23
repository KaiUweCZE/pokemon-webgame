import { mapData } from "./mapData";

interface AboutLocationProps {
  location: string;
}

const AboutLocation = ({ location }: AboutLocationProps) => {
  const info = mapData.find((e) => e.name === location)?.about;
  return (
    <section className="container-location">
      <p>{info}</p>
    </section>
  );
};

export default AboutLocation;
