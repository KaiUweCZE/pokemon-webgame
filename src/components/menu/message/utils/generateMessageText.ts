import { MessageType } from "@/types/message";
import { Pokemon } from "@/types/pokemon";

export const generateMessageText = (
  pokemon: Pokemon | null,
  type: MessageType
) => {
  let message = "";
  switch (type) {
    case MessageType.QUEST:
      break;
    case MessageType.EVOLUTION:
      break;
    case MessageType.NEW_MOVE:
      break;
    case MessageType.DEFAULT:
      break;
  }

  return message;
};
