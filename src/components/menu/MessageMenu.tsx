import { useSession } from "next-auth/react";
import callIcon from "@/assets/images/icons/call.png";
import Image from "next/image";
import Call from "./Call";
import { useState } from "react";

const MessageMenu = () => {
  const [call, setCall] = useState("");
  const { data } = useSession();

  if (!data) {
    throw new Error("data is missing");
  }

  const contacts = data.user.contacts;
  return (
    <div className="container-contacts">
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
