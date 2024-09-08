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
import { useSession } from "next-auth/react";
import { useDailyMessage } from "./daily-messages/useDailyMessage";

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
  const { data: session } = useSession();
  const [userMessages, setUserMessages] = useState<Message[]>(MessageData);
  const [visibleMessages, setVisibleMessages] = useState<MessageType | null>(
    null
  );
  const [messages, setMessages] = useState<Message[] | null>(null);
  const [isFetched, setIsFetched] = useState(false);
  const [numberOfNewMessages, setNumberOfNewMessages] = useState(0);
  const [fetchTrigger, setFetchTrigger] = useState(0);
  const [currentDay, setCurrentDay] = useState(session?.user.day);
  //useDailyMessage(session?.user.id, currentDay, setMessages);

  useEffect(() => {
    if (session?.user.day !== undefined) {
      setCurrentDay(session.user.day);
    }
  }, [session?.user.day]);

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
