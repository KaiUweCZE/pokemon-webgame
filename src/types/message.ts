export enum MessageType {
  EVOLUTION = "EVOLUTION",
  QUEST = "QUEST",
  DEFAULT = "DEFAULT",
}

export interface Message {
  from: string;
  type: MessageType;
  text: string;
  pokemonId: string;
}
