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
import { getMessages } from "./action";

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
  };

  return (
    <MessageContext.Provider value={contextValues}>
      {children}
    </MessageContext.Provider>
  );
};