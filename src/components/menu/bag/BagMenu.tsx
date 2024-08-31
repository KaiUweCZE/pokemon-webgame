"use client";
import { useSession } from "next-auth/react";
import BagItem from "./BagItem";
import { Dispatch, SetStateAction } from "react";

import { MenuType } from "../SecondaryMenu";
import Image from "next/image";
import closeIcon from "@/assets/images/icons/close.svg";

interface BagMenuProps {
  setActive: Dispatch<SetStateAction<MenuType | null>>;
}

const BagMenu = ({ setActive }: BagMenuProps) => {
  const { data } = useSession();
  if (!data) throw new Error("data is missing");

  const handleClose = () => {
    setActive(null);
  };

  const items = data?.user.items || [];
  const filteredItems = items.filter((item) => item.name !== "coins");

  const coins = items.find((item) => item.name === "coins");

  const cells = Array(50).fill(null);
  return (
    <section className="bag">
      <Image
        className="close-icon"
        src={closeIcon}
        alt="close icon"
        width={20}
        height={20}
        onClick={handleClose}
      />
      <h3>Bag</h3>
      <div className="bag-grid">
        {cells.map((_, index) => (
          <div className="bag-cell" key={index}>
            {filteredItems[index] ? (
              <BagItem item={filteredItems[index]} />
            ) : null}
          </div>
        ))}
      </div>
      <span className="bag-coins">{`${coins?.name}: ${coins?.count}`}</span>
    </section>
  );
};

export default BagMenu;

/* <ul>
          {items.map((item, index) => (
            <BagItem key={index} name={item.name} count={item.count} />
          ))}
        </ul> */
