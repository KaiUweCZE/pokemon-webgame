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
        xxs: "h-1",
        xs: "h-2",
        sm: "h-3",
        md: "h-4",
        lg: "h-6 w-full",
      },
      width: {
        xs: "w-24",
        sm: "w-32",
        md: "w-48",
        lg: "",
        full: "w-full",
      },
    },
    compoundVariants: [
      {
        variant: "exp",
        height: "xxs",
        className: "rounded-none",
      },
    ],
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
      hp: "bg-emerald-600",
      energy: "bg-sky-500",
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
      left: "left-0 -ml-14",
      right: "right-0 -mr-14",
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
  width = "full",
  showValues = false,
  className,
  label,
  labelPosition,
  animate = false,
  lowThreshold = 50,
}: BarProps) => {
  const percentage = (actualValue / maxValue) * 100;
  const isLow = percentage <= lowThreshold;
  const isCritical = percentage <= lowThreshold / 2;

  const getColorClass = () => {
    if (variant !== "hp") return innerBarVariants({ variant, animate });

    if (isCritical) return "bg-red-500";
    if (isLow) return "bg-yellow-500";
    return "bg-emerald-600";
  };

  const labelText = variant === "hp" ? "hp" : variant === "exp" ? "exp" : "eng";

  return (
    <div className={cn("relative", className)}>
      <div className={cn(barVariants({ variant, height, width }))}>
        <div
          className={cn(
            //innerBarVariants({ variant, animate }),
            "relative h-full rounded-full transition-all duration-500",
            getColorClass(),
            isCritical && !animate && "animate-pulse"
          )}
          style={{ width: `${percentage}%` }}
        >
          <div className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/10 to-white/0" />
        </div>
        {showValues && (
          <span
            className={cn(
              labelVariants({ position: labelPosition }),
              "absolute inset-0 flex items-center justify-center",
              height === "sm"
                ? "text-[.6rem]"
                : height === "lg"
                  ? "text-base"
                  : height === "xs"
                    ? "text-[.5rem]"
                    : "text-sm",
              variant === "hp" ? "text-red-50" : variant === "exp" ? "text-teal-50" : "text-white"
            )}
          >
            {`${label ? `${labelText}: ` : ""} ${actualValue}/${maxValue}`}
          </span>
        )}
      </div>
    </div>
  );
};

Bar.displayName = "Bar";

export { Bar, type BarProps, barVariants };
