import { useSession } from "next-auth/react";
import callIcon from "@/assets/images/icons/call.png";
import Image from "next/image";
import { Dispatch, SetStateAction, useState } from "react";
import { MenuType } from "../SecondaryMenu";
import closeIcon from "@/assets/images/icons/close.svg";
import MessageNavigation from "./MessageNavigation";
import MessageList from "./MessageList";

interface MessageProps {
  setActive: Dispatch<SetStateAction<MenuType | null>>;
}

const MessageInMenu = ({ setActive }: MessageProps) => {
  const [call, setCall] = useState("");
  const { data } = useSession();

  if (!data) {
    throw new Error("data is missing");
  }

  const handleClose = () => {
    setActive(null);
  };

  const contacts = data.user.contacts;
  return (
    <div className="container-message">
      <Image
        className="close-icon"
        src={closeIcon}
        alt="close icon"
        width={20}
        height={20}
        onClick={handleClose}
      />
      <MessageNavigation />
      <MessageList />
    </div>
  );
};

export default MessageInMenu;
