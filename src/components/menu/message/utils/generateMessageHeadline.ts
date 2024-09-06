import { Message, MessageType } from "@/types/message";
import { Pokemon } from "@prisma/client";

export const generateMessageHeadline = (
  pokemon: Pokemon | null,
  type: MessageType
): string => {
  console.log(pokemon);

  let message = "";
  switch (type) {
    case MessageType.QUEST:
      message = "This quest will be tough";
      break;
    case MessageType.EVOLUTION:
      message = "Your pokemon can be evolved";
      break;
    case MessageType.NEW_MOVE:
      message = "One of your's pokemon can learn a new attack";
      break;
    case MessageType.DEFAULT:
      message = "Who cares?";
      break;
  }

  return message;
};
