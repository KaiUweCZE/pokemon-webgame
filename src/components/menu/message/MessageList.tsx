import { useContext, useState } from "react";
import { MessageContext } from "./MessageContext";
import { Message } from "@/types/message";
import MessageDetail from "./MessageDetail";
import { useClickOutside } from "@/hooks/useClickOutside";
import alertIcon from "@/assets/images/icons/alert.webp";
import Image from "next/image";

const MessageList = () => {
  const context = useContext(MessageContext);
  const [messageIsReading, setMessageIsReading] = useState(false);
  const [specificMessage, setSpecificMessage] = useState<Message | null>(null);
  if (!context) throw new Error("context is missing");

  const { userMessages, setUserMessages, visibleMessages } = context;
  const filtredMessages = userMessages.filter((message) =>
    visibleMessages === null ? message : message.type === visibleMessages
  );

  const handleReadMessage = (e: Message) => {
    const editedMessages = userMessages.map((message) =>
      message.id !== e.id ? message : { ...message, viewed: true }
    );
    setUserMessages(editedMessages);
    setMessageIsReading(!messageIsReading);
    setSpecificMessage(e);
  };

  const { isVisible } = useClickOutside(
    setMessageIsReading,
    messageIsReading,
    ".message-detail"
  );

  return (
    <div>
      <ul className="message-list">
        {filtredMessages &&
          filtredMessages.map((message) => (
            <li className="message-list-item" key={message.id}>
              <span onClick={() => handleReadMessage(message)}>
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
        {isVisible && specificMessage && (
          <MessageDetail message={specificMessage} />
        )}
        <button onClick={() => console.log(context)}>click</button>
      </ul>
    </div>
  );
};

export default MessageList;
