"use client";
import {
  createContext,
  Dispatch,
  ReactNode,
  SetStateAction,
  useEffect,
  useState,
} from "react";
import { MessageData } from "./illustrativeMessageData";
import { Message, MessageType } from "@/types/message";
import { Quest } from "@/types/quest";
import { atom, useAtom } from "jotai";
import {
  addQuestAtom,
  completeQuestAtom,
  questsAtom,
} from "@/components/menu/message/store/questStore";

interface MessageContextType {
  userMessages: Message[];
  setUserMessages: Dispatch<SetStateAction<Message[]>>;
  visibleMessages: MessageType | null;
  setVisibleMessages: Dispatch<SetStateAction<MessageType | null>>;
  messages: Message[] | null;
  setMessages: Dispatch<SetStateAction<Message[] | null>>;
  isFetched: boolean;
  setIsFetched: Dispatch<SetStateAction<boolean>>;
  numberOfNewMessages: number;
  setNumberOfNewMessages: Dispatch<SetStateAction<number>>;
  fetchTrigger: number;
  setFetchTrigger: Dispatch<SetStateAction<number>>;
  //quests: Quest[];
  //addQuest: (newQuest: Quest) => void;
  //completeQuest: (questName: string) => void;
}

export const MessageContext = createContext<MessageContextType | undefined>(
  undefined
);

interface MessageProviderProps {
  children: ReactNode;
}

export const MessageProvider = ({ children }: MessageProviderProps) => {
  const [userMessages, setUserMessages] = useState<Message[]>(MessageData);
  const [visibleMessages, setVisibleMessages] = useState<MessageType | null>(
    null
  );
  const [messages, setMessages] = useState<Message[] | null>(null);
  const [isFetched, setIsFetched] = useState(false);
  const [numberOfNewMessages, setNumberOfNewMessages] = useState(0);
  const [fetchTrigger, setFetchTrigger] = useState(0);

  // quest related state
  /*const [quests, setQuests] = useAtom(questsAtom);
  const [, addQuest] = useAtom(addQuestAtom);
  const [, completeQuest] = useAtom(completeQuestAtom);*/

  const contextValues = {
    userMessages,
    setUserMessages,
    visibleMessages,
    setVisibleMessages,
    messages,
    setMessages,
    isFetched,
    setIsFetched,
    numberOfNewMessages,
    setNumberOfNewMessages,
    fetchTrigger,
    setFetchTrigger,
    /* quests,
    addQuest,
    completeQuest,*/
  };

  return (
    <MessageContext.Provider value={contextValues}>
      {children}
    </MessageContext.Provider>
  );
};
