import { createContext, ReactNode, useState } from "react";

interface MessageContextType {
  message: string;
}

export const MessageContext = createContext<MessageContextType | undefined>(
  undefined
);

interface ProviderProps {
  children: ReactNode;
}

export const MessageProvider = ({ children }: ProviderProps) => {
  const [message, setMessage] = useState("");
  const contextValues = {
    message,
  };

  return (
    <MessageContext.Provider value={contextValues}>
      {children}
    </MessageContext.Provider>
  );
};
