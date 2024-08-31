import { useSession } from "next-auth/react";
import callIcon from "@/assets/images/icons/call.png";
import Image from "next/image";
import Call from "./Call";
import { Dispatch, SetStateAction, useState } from "react";
import { MenuType } from "./SecondaryMenu";
import closeIcon from "@/assets/images/icons/close.svg";

interface MessageProps {
  setActive: Dispatch<SetStateAction<MenuType | null>>;
}

const MessageMenu = ({ setActive }: MessageProps) => {
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
    <div className="container-contacts">
      <Image
        className="close-icon"
        src={closeIcon}
        alt="close icon"
        width={20}
        height={20}
        onClick={handleClose}
      />
      <div className="contact">
        <h3>Contacts</h3>
        <ul className="contact-list">
          {contacts.map((contact, index) => (
            <li key={index} className="contact-item">
              <span>{contact}</span>{" "}
              <Image
                src={callIcon}
                alt="icon of phone"
                width={16}
                onClick={() => setCall(contact)}
              />
            </li>
          ))}
        </ul>
      </div>
      <Call name={call} />
    </div>
  );
};

export default MessageMenu;
