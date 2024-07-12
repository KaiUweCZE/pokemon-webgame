import Link from "next/link";
import { Dispatch, SetStateAction } from "react";

interface ActiveType {
  index: number;
  isActive: boolean;
}

interface MenuItemProps {
  name: string;
  link: string;
  index: number;
  active: ActiveType;
  setActive: Dispatch<SetStateAction<ActiveType>>;
}

const MenuItem = ({ name, link, index, active, setActive }: MenuItemProps) => {
  return (
    <li
      className={
        active.isActive && active.index === index
          ? "menu-item active"
          : "menu-item"
      }
      onClick={() => setActive({ index: index, isActive: true })}
    >
      <Link href={link}>{name}</Link>
    </li>
  );
};

export default MenuItem;
