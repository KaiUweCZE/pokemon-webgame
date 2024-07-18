import Link from "next/link";

interface MenuItemProps {
  name: string;
  link: string;
  active: boolean;
}

const MenuItem = ({ name, link, active }: MenuItemProps) => {
  return (
    <li className={active ? "menu-item active" : "menu-item"}>
      <Link href={link}>{name}</Link>
    </li>
  );
};

export default MenuItem;
