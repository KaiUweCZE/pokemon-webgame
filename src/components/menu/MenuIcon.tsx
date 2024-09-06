import { Dispatch, SetStateAction } from "react";

interface MenuIconProps {
  isOpen: boolean;
  setIsOpen: Dispatch<SetStateAction<boolean>>;
}

const MenuIcon = ({ isOpen, setIsOpen }: MenuIconProps) => {
  const openCssClass = isOpen ? "open" : "";
  return (
    <div
      className={`menu-icon ${openCssClass}`}
      onClick={() => setIsOpen(!isOpen)}
    >
      <div className={`menu-icon-item left-item `}></div>
      <div className={`menu-icon-item right-item `}></div>
    </div>
  );
};

export default MenuIcon;
