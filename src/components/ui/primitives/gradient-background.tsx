// primitives/gradient-background.tsx
import { VariantProps, cva } from "class-variance-authority";
import { cn } from "@/utils/cn";
import { HTMLAttributes } from "react";

const gradientBackgroundVariants = cva("absolute inset-0 rounded-lg from-transparent -z-10", {
  variants: {
    variant: {
      primary: "to-purple-900/30",
      dark: "to-slate-900/30",
      light: "to-purple-500/30",
      accent: " to-indigo-600/30",
      element: "to-purple-800/30",
      mystic: "to-violet-900/40",
      pink: "to-pink-50/80",
      ancient: " to-amber-600/30",
      nature: "to-emerald-900/30",
      arcane: "from-indigo-900/20 to-purple-900/40",
    },
    direction: {
      top: "bg-gradient-to-t",
      right: "bg-gradient-to-r",
      bottom: "bg-gradient-to-b",
      left: "bg-gradient-to-l",
      "top-right": "bg-gradient-to-tr",
      "top-left": "bg-gradient-to-tl",
      "bottom-right": "bg-gradient-to-br",
      "bottom-left": "bg-gradient-to-bl",
      radial:
        "bg-[radial-gradient(ellipse_at_center,var(--tw-gradient-from),var(--tw-gradient-to))]",
      conic: "bg-[conic-gradient(from_0deg,var(--tw-gradient-from),var(--tw-gradient-to))]",
    },
    pattern: {
      grid: [
        "after:absolute after:inset-0",
        "after:bg-[repeating-linear-gradient(0deg,transparent,transparent_19px,theme(colors.purple.400/40)_20px)]",
        "after:bg-[repeating-linear-gradient(90deg,transparent,transparent_19px,theme(colors.purple.400/40)_20px)]",
      ],

      dots: [
        "after:absolute after:inset-0",
        "after:bg-[radial-gradient(theme(colors.purple.400)_2px,transparent_2px)]",
        "after:bg-[length:20px_20px]",
      ],

      lines: [
        "after:absolute after:inset-0",
        "after:bg-[repeating-linear-gradient(90deg,theme(colors.purple.400/50)_0px,theme(colors.purple.400/50)_1px,transparent_1px,transparent_20px)]",
      ],

      mesh: [
        "after:absolute after:inset-0",
        "after:bg-[linear-gradient(theme(colors.purple.400/30)_1px,transparent_1px),linear-gradient(90deg,theme(colors.purple.400/30)_1px,transparent_1px)]",
        "after:bg-[length:20px_20px]",
      ],

      none: "",
    },
    intensity: {
      low: "opacity-30 ",
      medium: "opacity-50",
      high: "opacity-70",
      max: "opacity-100",
    },
    patternIntensity: {
      low: "after:opacity-10",
      medium: "after:opacity-20",
      high: "after:opacity-40",
    },
  },
  defaultVariants: {
    variant: "primary",
    direction: "bottom",
    pattern: "none",
    intensity: "medium",
    patternIntensity: "low",
  },
});

export type GradientVariants = VariantProps<typeof gradientBackgroundVariants>;

export interface GradientBackgroundProps extends HTMLAttributes<HTMLDivElement>, GradientVariants {
  className?: string;
}

export const GradientBackground = ({
  className,
  variant,
  pattern,
  intensity,
  patternIntensity,
  direction,
  ...props
}: GradientBackgroundProps) => {
  return (
    <div
      className={cn(
        gradientBackgroundVariants({ variant, pattern, intensity, direction, patternIntensity }),
        className
      )}
      {...props}
    />
  );
};
