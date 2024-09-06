import { npcData } from "@/data/npcData";
import { randomNumber } from "@/utils/battle-function/randomPokemon";
import { Message, MessageType } from "@/types/message";
import { createMessage } from "../action";
import { useCallback, useContext, useEffect } from "react";
import { PokemonContext } from "@/contexts/PokemonContext";
import { Pokemon } from "@/types/pokemon";
import { questTexts } from "../dataQuest";
import { useSession } from "next-auth/react";

export const generateText = (
  type: MessageType,
  pokemon?: Pokemon,
  randomPerson?: string
): string => {
  switch (type) {
    case MessageType.QUEST:
      return questTexts[randomNumber(questTexts.length - 1)];
    case MessageType.EVOLUTION:
      return `Your ${pokemon?.name ?? "piakchu"} has reached level ${
        pokemon?.level ?? 25
      } and is ready to evolve!`;
    case MessageType.NEW_MOVE:
      return `${
        pokemon?.name ?? "pikachu"
      } can learn a new move! Check its abilities.`;
    default:
      return `${randomPerson ?? "Hank"} sends you greetings!`;
  }
};

export const useGenerateMessage = () => {
  const { data: session } = useSession();
  const pokemonContext = useContext(PokemonContext);

  //const { pokemonsFromSix } = pokemonContext;
  const userId = session?.user.id;
  const pokemonId = "66d691a0900aceb0f2f1927a";
  const pokemon = pokemonContext?.pokemonsFromSix.find(
    (p) => p.id === pokemonId
  );

  const generateMessage = useCallback(async () => {
    if (!pokemonContext || !userId) return null;
    const numberNpc = randomNumber(58);
    const numberType = randomNumber(4);
    const numberDay = randomNumber(100);

    console.log("start generating");

    const randomPerson = npcData.find((npc) => npc.id === numberNpc)?.name;
    const messageType = (): MessageType => {
      switch (numberType) {
        case 0:
          return MessageType.DEFAULT;
        case 1:
          return MessageType.EVOLUTION;
        case 2:
          return MessageType.NEW_MOVE;
        case 3:
          return MessageType.QUEST;
        default:
          return MessageType.DEFAULT;
      }
    };
    const type = messageType();
    const text = generateText(type, pokemon, randomPerson);

    const message = {
      from: randomPerson ?? "Hank",
      type: type,
      time: numberDay,
      text: text,
    };

    const newMessage = await createMessage(userId, message, pokemonId);
    return newMessage;
  }, [pokemonContext, userId, pokemon, pokemonId]);

  return { generateMessage, userId };
};
