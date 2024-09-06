import { Message, MessageType } from "@/types/message";
import { Pokemon } from "@prisma/client";

export const generateMessageHeadline = (
  pokemon: Pokemon | null,
  type: MessageType
): string => {
  let message = "";
  switch (type) {
    case MessageType.QUEST:
      message = "This quest will be tough";
      break;
    case MessageType.EVOLUTION:
      message = `Your ${pokemon?.name} can be evolved`;
      break;
    case MessageType.NEW_MOVE:
      message = `${pokemon?.name} can learn a new attack`;
      break;
    case MessageType.DEFAULT:
      message = "Who cares?";
      break;
  }

  return message;
};
