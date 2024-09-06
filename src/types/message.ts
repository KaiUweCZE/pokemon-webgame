export enum MessageType {
  EVOLUTION = "EVOLUTION",
  QUEST = "QUEST",
  NEW_MOVE = "NEW_MOVE",
  DEFAULT = "DEFAULT",
}

export interface Message {
  id: string;
  from: string;
  type: MessageType;
  text: string;
  pokemonId?: string;
  time: number;
  viewed: boolean;
}
