import { Message } from "@/types/message";
import { generateMessageHeadline } from "./utils/generateMessageHeadline";
import { useContext } from "react";
import { PokemonContext } from "@/contexts/PokemonContext";
import { Pokemon } from "@/types/pokemon";

interface MessageDetailProps {
  message: Message;
}

const MessageDetail = ({ message }: MessageDetailProps) => {
  const pokemonContext = useContext(PokemonContext);

  if (!pokemonContext) throw new Error("context is missing");

  const pokemon = message?.pokemonId
    ? pokemonContext.pokemonsFromSix.find(
        (p: Pokemon) => p.id === message.pokemonId
      )
    : null;
  const headline = generateMessageHeadline(pokemon ?? null, message.type);
  return (
    <article className="message-detail">
      <header className="message-detail-header">
        <h2>{headline}</h2>
        <span>from: {message.from}</span>
      </header>
      <p>{message.text}</p>
      <footer>day: {message.time}</footer>
    </article>
  );
};

export default MessageDetail;
