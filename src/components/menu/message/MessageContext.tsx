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

  const contextValues = {
    userMessages,
    setUserMessages,
    visibleMessages,
    setVisibleMessages,
    messages,
    setMessages,
    isFetched,
    setIsFetched,
  };

  return (
    <MessageContext.Provider value={contextValues}>
      {children}
    </MessageContext.Provider>
  );
};
