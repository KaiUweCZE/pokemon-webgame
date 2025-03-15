import { cn } from "@/utils/cn";
import { Bar, BarProps } from "./bar";
import { ReactNode } from "react";
import { cva, VariantProps } from "class-variance-authority";

type ValueFormatter = (current: number, max: number) => ReactNode;
type LabelPosition = "top" | "bottom" | "left" | "right";

const wrapperVariants = cva("grid relative gap-2 place-items-center", {
  variants: {
    position: {
      top: "grid-col",
      bottom: "",
      left: "grid-stat-bar",
      right: "grid-stat-bar",
    },
    size: {
      sm: "text-xs",
      md: "text-sm",
      lg: "text-base",
    },
  },
  defaultVariants: {
    position: "left",
    size: "md",
  },
});

const labelVariant = cva("", {
  variants: {
    variant: {
      hp: "text-amber-100",
      energy: "text-sky-200",
      exp: "text-amber-300",
    },
    position: {
      top: "",
      bottom: "grid-row-2",
      left: "",
      right: "grid-col-2",
    },
    size: {
      sm: "text-xs",
      md: "text-sm",
      lg: "text-base",
    },
  },
  defaultVariants: {
    position: "left",
    size: "md",
  },
});

type WrapperType = VariantProps<typeof wrapperVariants>;

type EditedBarProps = Omit<BarProps, "label" | "labelPosition">;

interface StatBarProps extends WrapperType, EditedBarProps {
  variant: "hp" | "energy" | "exp";
  label?: string;
  labelPosition?: LabelPosition;
  labelClassName?: string;
  valueClassName?: string;
}

const StatBar = ({
  variant,
  position,
  size,
  actualValue,
  maxValue,
  label,
  labelClassName,
  height,
  width,
  showValues,
}: StatBarProps) => {
  return (
    <div className={cn(wrapperVariants({ position, size }))}>
      {label && (
        <span className={cn(labelVariant({ position, size, variant }), labelClassName)}>
          {label}
        </span>
      )}
      <Bar
        variant={variant}
        actualValue={actualValue}
        maxValue={maxValue}
        width={width}
        height={height}
        className="w-full"
        showValues={showValues}
      />
    </div>
  );
};

export default StatBar;
