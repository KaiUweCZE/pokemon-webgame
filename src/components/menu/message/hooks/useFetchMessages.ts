import { useCallback, useContext, useEffect, useState } from "react";
import { MessageContext } from "../MessageContext";
import { getMessages } from "../action";
import { time } from "console";
import { MessageType } from "@/types/message";

export const useFetchMessages = (userId: string) => {
  const messageContext = useContext(MessageContext);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchMessages = useCallback(async () => {
    if (!messageContext) return { error, isLoading };
    console.log("fetching messages");

    const {
      messages,
      setMessages,
      //isFetched,
      //setIsFetched,
      setNumberOfNewMessages,
      fetchTrigger,
    } = messageContext;
    //if (isFetched) return;
    setIsLoading(true);
    setError(null);
    try {
      const fetchedMessages = await getMessages(userId);

      if (fetchedMessages) {
        const editedMessages = fetchedMessages.map((m) => {
          return {
            id: m.id,
            from: m.from,
            text: m.text,
            type: m.type as MessageType,
            time: m.time,
            viewed: m.viewed,
            pokemonId: m?.pokemonId || undefined,
          };
        });
        const unviewedMessages = editedMessages.filter(
          (m) => m.viewed === false
        );
        setNumberOfNewMessages(unviewedMessages.length);
        setMessages(editedMessages);
        //setIsFetched(true);
      }
    } catch (error) {
      setError("Failed to fetch messages");
      console.error("Error fetching messages:", error);
    } finally {
      setIsLoading(false);
    }
  }, [userId, messageContext?.isFetched, messageContext?.setMessages]);

  useEffect(() => {
    fetchMessages();
    //messageContext?.setIsFetched(true);
  }, [messageContext?.fetchTrigger]);

  return { error, isLoading };
};
