import { memo, useContext, useState } from "react";
import { MessageContext } from "./MessageContext";
import { Message } from "@/types/message";
import MessageDetail from "./MessageDetail";
import { useClickOutside } from "@/hooks/useClickOutside";
import alertIcon from "@/assets/images/icons/alert.webp";
import Image from "next/image";
import { useGenerateMessage } from "./hooks/useGenerateMessage";
import { getMessages, readMessage } from "./action";
import { useFetchMessages } from "./hooks/useFetchMessages";
import Loader from "@/components/Loader";

interface MessageListProps {
  userId: string;
}

const MessageList = ({ userId }: MessageListProps) => {
  const context = useContext(MessageContext);
  const [messageIsReading, setMessageIsReading] = useState(false);
  const [specificMessage, setSpecificMessage] = useState<Message | null>(null);
  const [isHover, setIsHover] = useState({ active: false, id: "" });
  const { generateMessage } = useGenerateMessage();
  //const { error, isLoading } = useFetchMessages(userId);

  if (!context) throw new Error("context is missing");

  const { messages, setMessages, visibleMessages } = context;
  const filtredMessages = messages?.filter((message) =>
    visibleMessages === null ? message : message.type === visibleMessages
  );

  const handleReadMessage = async (e: Message) => {
    if (!e.viewed) {
      context.setNumberOfNewMessages((prev) => prev - 1);
    }
    const editedMessages = messages?.map((message) =>
      message.id !== e.id ? message : { ...message, viewed: true }
    );
    if (editedMessages) {
      setMessages(editedMessages);
      setMessageIsReading(!messageIsReading);
      setSpecificMessage(e);
      console.log(specificMessage);
    }

    try {
      const viewedMessage = await readMessage(e.id);
      console.log("this messages was read: ", viewedMessage?.id);
    } catch (error) {
      console.error(error);
    }
  };

  const { isVisible } = useClickOutside(
    setMessageIsReading,
    messageIsReading,
    ".message-detail"
  );

  const handleGenerateMessage = async () => {
    if (typeof generateMessage === "function") {
      try {
        const newMessage = await generateMessage();

        if (newMessage) {
          console.log("new message: ", newMessage);

          //setUserMessages((prevMessages) => [...prevMessages, newMessage]);
        }
      } catch (error) {
        console.error("Error generating message:", error);
      }
    } else {
      console.warn("Generate message function is not available");
    }
  };

  return (
    <div className="container-message-list">
      <ul className="message-list">
        {filtredMessages &&
          filtredMessages.map((message) => (
            <li
              className={
                isHover.active && isHover.id === message.id
                  ? "message-list-item read"
                  : "message-list-item"
              }
              key={message.id}
              onClick={() => handleReadMessage(message)}
              onMouseEnter={() => setIsHover({ active: true, id: message.id })}
              onMouseLeave={() => setIsHover({ ...isHover, active: false })}
            >
              <span
                className={
                  isHover.active && isHover.id === message.id ? "read" : ""
                }
              >
                {message.from}
              </span>
              {!message.viewed && (
                <Image
                  src={alertIcon}
                  alt="alert icon"
                  width={16}
                  height={16}
                />
              )}
            </li>
          ))}
        <li>
          <button
            className="button-primary"
            onClick={handleGenerateMessage}
            disabled={typeof generateMessage !== "function"}
          >
            generate
          </button>
        </li>
      </ul>

      {isVisible && specificMessage && (
        <MessageDetail message={specificMessage} />
      )}
    </div>
  );
};

export default MessageList;
