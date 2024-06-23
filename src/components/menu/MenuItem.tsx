import Link from "next/link";

interface MenuItemProps {
  name: string;
  link: string;
}

const MenuItem = (props: MenuItemProps) => {
  return (
    <li>
      <Link href={props.link}>{props.name}</Link>
    </li>
  );
};

export default MenuItem;
