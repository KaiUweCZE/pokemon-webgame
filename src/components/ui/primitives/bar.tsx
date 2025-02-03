import { cn } from "@/utils/cn";
import { cva, VariantProps } from "class-variance-authority";

const barVariants = cva(
  "relative bg-slate-900/60 rounded-full overflow-hidden transition-all duration-300 border border-slate-950/20 shadow-secondary",
  {
    variants: {
      variant: {
        hp: "",
        exp: "",
        energy: "",
      },
      height: {
        sm: "h-3 w-32",
        md: "h-4 w-48",
        lg: "h-6 w-full",
      },
      width: {
        sm: "",
        md: "",
        lg: "",
        full: "w-full",
      },
    },
    defaultVariants: {
      variant: "hp",
      height: "md",
      width: "full",
    },
  }
);

const innerBarVariants = cva("h-full transition-all duration-300 rounded-full relative", {
  variants: {
    variant: {
      hp: "bg-destructive",
      energy: "bg-teal-600",
      exp: "bg-amber-500",
    },
    animate: {
      true: "animate-pulse",
      false: "",
    },
  },
  defaultVariants: {
    variant: "hp",
    animate: false,
  },
});

const labelVariants = cva("absolute flex items-center transition-opacity duration-200", {
  variants: {
    position: {
      inside: "inset-0 justify-center",
      left: "left-0 -ml-14", // Pro label vlevo od baru
      right: "right-0 -mr-14", // Pro label vpravo od baru
    },
    size: {
      sm: "text-xs",
      md: "text-sm",
      lg: "text-base",
    },
  },
  defaultVariants: {
    position: "inside",
    size: "md",
  },
});

type BarVariants = VariantProps<typeof barVariants>;
export type LabelPosition = "inside" | "left" | "right";

interface BarProps extends BarVariants {
  actualValue: number;
  maxValue: number;
  showValues?: boolean;
  className?: string;
  animate?: boolean;
  label?: boolean;
  labelPosition?: LabelPosition;
  lowThreshold?: number;
}

const Bar = ({
  actualValue,
  maxValue,
  variant,
  height,
  width,
  showValues = false,
  className,
  label,
  animate = false,
  lowThreshold = 0,
}: BarProps) => {
  const percentage = (actualValue / maxValue) * 100;

  const isLow = percentage <= lowThreshold;

  const labelText = variant === "hp" ? "hp" : variant === "exp" ? "exp" : "eng";
  return (
    <div className={cn("relative", className)}>
      <div className={cn(barVariants({ variant, height, width }))}>
        <div
          className={cn(innerBarVariants({ variant, animate }))}
          style={{ width: `${percentage}%` }}
        >
          <div className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/10 to-white/0" />
        </div>
        {showValues && (
          <span
            className={cn(
              "absolute inset-0 flex items-center justify-center",
              height === "sm" ? "text-[.6rem]" : height === "lg" ? "text-base" : "text-sm",
              variant === "hp" ? "text-red-50" : variant === "exp" ? "text-teal-50" : "text-white"
            )}
          >
            {`${label && labelText}: ${actualValue}/${maxValue}`}
          </span>
        )}
      </div>
    </div>
  );
};

Bar.displayName = "Bar";

export { Bar, type BarProps, barVariants };
