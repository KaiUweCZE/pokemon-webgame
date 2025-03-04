import React from "react";
import { LucideIcon } from "lucide-react";
import { cn } from "@/utils/cn";
import { cva, VariantProps } from "class-variance-authority";

const iconVariants = cva("transition-all", {
  variants: {
    variant: {
      primary: "text-amber-100 group-hover:text-amber-200",
      secondary: "text-slate-800 group-hover:text-slate-900",
      dark: "text-slate-900 group-hover:text-slate-950",
      muted: "text-amber-50/60 group-hover:text-amber-200",
    },
    size: {
      xs: "h-3 w-3",
      sm: "h-4 w-4",
      md: "h-5 w-5",
      lg: "h-6 w-6",
      xl: "h-10 w-10",
    },
    interactive: {
      true: "group-hover:scale-125 group-hover:text-amber-200 group-focus:scale-125 group-focus:text-amber-200",
      false: "",
    },
  },
  defaultVariants: {
    variant: "primary",
    size: "md",
    interactive: false,
  },
});

export interface IconProps extends VariantProps<typeof iconVariants> {
  icon: LucideIcon;
  className?: string;
  activeClass?: string;
  isActive?: boolean;
}

export const Icon: React.FC<IconProps> = ({
  icon: IconComponent,
  variant,
  size,
  interactive,
  isActive,
  className,
  activeClass,
}) => {
  return (
    <IconComponent
      className={cn(
        iconVariants({ variant, size, interactive }),
        className,
        isActive && activeClass
      )}
    />
  );
};
