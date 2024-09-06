import { useContext, useState } from "react";
import menuIcon from "@/assets/images/icons/menu.png";
import closeIcon from "@/assets/images/icons/close.svg";
import Image from "next/image";
import MenuIcon from "../MenuIcon";
import { MessageContext } from "./MessageContext";
import { MessageType } from "@/types/message";

enum MessageMenuType {
  ALL = "ALL",
  QUESTS = "QUESTS",
  NEW_MOVES = "NEW_MOVES",
  EVOLUTIONS = "EVOLUTIONS",
  OTHERS = "OTHERS",
}

interface MessageItemsType {
  name: string;
  type: MessageMenuType;
}

const items = [
  { name: "All", type: MessageMenuType.ALL },
  { name: "Quests", type: MessageMenuType.QUESTS },
  { name: "New moves", type: MessageMenuType.NEW_MOVES },
  { name: "Evolutions", type: MessageMenuType.EVOLUTIONS },
  { name: "Others", type: MessageMenuType.OTHERS },
];

const MessageMenu = () => {
  const context = useContext(MessageContext);
  const [visibleItem, setVisibleItem] = useState<string | string[]>(
    items[0].name
  );
  const [isOpen, setIsOpen] = useState(false);
  const [menuOption, setMenuOption] = useState<MessageMenuType>(
    MessageMenuType.ALL
  );
  const reducedItems = items.filter((item) => item.name !== visibleItem);

  const handleSetMessages = (e: MessageItemsType) => {
    setVisibleItem(e.name);
    setIsOpen(false);
    switch (e.type) {
      case MessageMenuType.ALL:
        context?.setVisibleMessages(null);
        setMenuOption(MessageMenuType.ALL);
        break;
      case MessageMenuType.QUESTS:
        context?.setVisibleMessages(MessageType.QUEST);
        setMenuOption(MessageMenuType.QUESTS);
        break;
      case MessageMenuType.NEW_MOVES:
        context?.setVisibleMessages(MessageType.NEW_MOVE);
        setMenuOption(MessageMenuType.EVOLUTIONS);
        break;
      case MessageMenuType.EVOLUTIONS:
        context?.setVisibleMessages(MessageType.EVOLUTION);
        setMenuOption(MessageMenuType.EVOLUTIONS);
        break;
      case MessageMenuType.OTHERS:
        context?.setVisibleMessages(MessageType.DEFAULT);
        setMenuOption(MessageMenuType.OTHERS);
        break;
    }
  };

  return (
    <nav className="message-navigation">
      <ul className="message-menu">
        {isOpen ? (
          <>
            <li className="main-message-menu-item">
              <span>{visibleItem}</span>
              <MenuIcon isOpen={isOpen} setIsOpen={setIsOpen} />
            </li>

            {reducedItems.map((item) => (
              <li
                className="side-message-menu-item"
                key={item.name}
                onClick={() => handleSetMessages(item)}
              >
                {item.name}
              </li>
            ))}
          </>
        ) : (
          <li>
            <span>{visibleItem}</span>
            <MenuIcon isOpen={isOpen} setIsOpen={setIsOpen} />
          </li>
        )}
      </ul>
    </nav>
  );
};

export default MessageMenu;
