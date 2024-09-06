import {
  createContext,
  Dispatch,
  ReactNode,
  SetStateAction,
  useState,
} from "react";
import { MessageData } from "./illustrativeMessageData";
import { Message, MessageType } from "@/types/message";

interface MessageContextType {
  userMessages: Message[];
  setUserMessages: Dispatch<SetStateAction<Message[]>>;
  visibleMessages: MessageType | null;
  setVisibleMessages: Dispatch<SetStateAction<MessageType | null>>;
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
  const contextValues = {
    userMessages,
    setUserMessages,
    visibleMessages,
    setVisibleMessages,
  };

  return (
    <MessageContext.Provider value={contextValues}>
      {children}
    </MessageContext.Provider>
  );
};
