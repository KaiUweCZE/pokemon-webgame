import { cn } from "@/utils/cn";

interface ExpanderProps {
  children: React.ReactNode;
  isOpen: boolean;
  direction?: "up" | "down";
  onClick?: () => void;
  onClose?: () => void;
  className?: string;
}

const Expander = ({ children, isOpen, onClick, onClose, className, direction }: ExpanderProps) => {
  return (
    <div className={cn("expander", isOpen && "open", className)}>
      <div className="expander-content">{children}</div>
    </div>
  );
};

export default Expander;
