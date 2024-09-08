import { Dispatch, SetStateAction, useEffect, useState } from "react";
import { dailyMessageData } from "./dailyMessageData";
import { Message, MessageType } from "@/types/message";
import { createMessage } from "../action";

interface MessageWithoutId {
  from: string;
  time: number;
  text: string;
  type: MessageType;
}

export const useDailyMessage = (
  userId: string | undefined,
  day: number | undefined,
  setMessages: Dispatch<SetStateAction<Message[] | null>>
) => {
  if (!userId || !day) return;
  const data = dailyMessageData;
  const [message, setMessage] = useState<MessageWithoutId | null>(null);
  const generateDailyMessage = async () => {
    try {
      if (message) {
        const recievedMessage = await createMessage(userId, message);

        if (recievedMessage) {
          const editedMessage = {
            id: recievedMessage.id,
            from: recievedMessage.from,
            text: recievedMessage.text,
            type: recievedMessage.type as MessageType,
            time: recievedMessage.time,
            viewed: false,
          };
          console.log("New message!!!: ", editedMessage);
          setMessages((prev) => {
            if (!prev) return [editedMessage];
            return [...prev, editedMessage];
          });
        }
      }
    } catch (error) {
      console.error("An error occured while sending message: ", error);
    }
  };

  /*useEffect(() => {
    if (!day) return;

    const newMessage = dailyMessageData.find((message) => message.time === day);
    if (newMessage) {
      generateDailyMessage(newMessage);
    }
  }, [day, generateDailyMessage]);*/
};
