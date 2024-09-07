import { Message } from "@/types/message";
import { generateMessageHeadline } from "./utils/generateMessageHeadline";
import { useContext } from "react";
import { PokemonContext } from "@/contexts/PokemonContext";
import { Pokemon } from "@/types/pokemon";
import { deleteMessage } from "./action";
import { MessageContext } from "./MessageContext";

interface MessageDetailProps {
  message: Message;
}

const MessageDetail = ({ message }: MessageDetailProps) => {
  const pokemonContext = useContext(PokemonContext);
  const messageContext = useContext(MessageContext);

  if (!pokemonContext || !messageContext) throw new Error("context is missing");

  const { messages, setMessages } = messageContext;
  const pokemon = message?.pokemonId
    ? pokemonContext.pokemonsFromSix.find((p) => p.id === message.pokemonId)
    : null;
  const headline = generateMessageHeadline(pokemon ?? null, message.type);

  const handleDeleteMessage = async () => {
    try {
      const deletedMessage = await deleteMessage(message.id);
      if (deletedMessage && messages) {
        console.log("message is successfully deleted", message.text);
        const newMessages = messages.filter((m) => m.id !== deletedMessage?.id);

        setMessages(newMessages);
      }
    } catch (error) {
      console.error(error);
    }
  };
  return (
    <article className="message-detail">
      <header className="message-detail-header">
        <h2>{headline}</h2>
        <span>from: {message.from}</span>
      </header>
      <p className="message-text">{message.text}</p>
      <footer>day: {message.time}</footer>
      <button className="button-primary" onClick={handleDeleteMessage}>
        delete
      </button>
    </article>
  );
};

export default MessageDetail;
