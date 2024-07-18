import { mapData } from "./mapData";

interface AboutLocationProps {
  location: string;
}

const AboutLocation = ({ location }: AboutLocationProps) => {
  const info = mapData.find((e) => e.name === location)?.about;
  return (
    <div className="container-location">
      <h3>{location}</h3>
      <p>{info}</p>
    </div>
  );
};

export default AboutLocation;
