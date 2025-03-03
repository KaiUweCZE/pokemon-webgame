import { cva, VariantProps } from "class-variance-authority";
import { cn } from "@/utils/cn";
import React from "react";

const cardVariants = cva("grid rounded-md primary-shadow", {
  variants: {
    variant: {
      default: "bg-primary border border-primary-border",
      basic: "bg-transparent",
      outline: "border-2 border-primary-border",
      dark: "bg-element-light/60 border border-secondary-border",
      darkest: "bg-primary-dark",
      light: "bg-content/60 backdrop-blur-sm border border-white/20",
    },
    size: {
      sm: "p-4",
      md: "p-6 w-[30rem] max-w-9/10",
      lg: "p-8",
      fit: "h-fit",
      full: "w-full",
    },
  },
  defaultVariants: {
    variant: "default",
    size: "md",
  },
});

const headlineVariants = cva("text-lg", {
  variants: {
    variant: {
      default: "",
      outline: "",
      dark: "",
      darkest: "",
      basic: "",
      light: "font-semibold text-primary",
    },
  },
});

type CardVariantProps = VariantProps<typeof cardVariants>;

export interface CardProps extends React.HTMLAttributes<HTMLDivElement>, CardVariantProps {
  headline?: string;
  headlineClassName?: string;
  animation?: string;
  children?: React.ReactNode;
  className?: string;
}

export const Card = React.forwardRef<HTMLDivElement, CardProps>(
  (
    { headline, children, className, animation, variant, size, headlineClassName, ...props },
    ref
  ) => (
    <div ref={ref} className={cn(cardVariants({ variant, size, className }), animation)} {...props}>
      <article>
        {headline && (
          <h3 className={cn(headlineVariants({ variant }), headlineClassName)}>{headline}</h3>
        )}
        {children}
      </article>
    </div>
  )
);

Card.displayName = "Card";
