import { Button, type ButtonProps } from "./button";
import { GradientBackground, type GradientVariants } from "./gradient-background";
import { cn } from "@/utils/cn";

type FilteredGradient = Omit<GradientVariants, "variant">;
type FilteredButton = Omit<ButtonProps, "variant">;

export interface GradientButtonProps extends FilteredButton, FilteredGradient {
  gradientVariant?: GradientVariants["variant"];
  buttonVariant?: ButtonProps["variant"];
}

const GradientButton = ({
  gradientVariant = "primary",
  buttonVariant = "primary",
  pattern,
  intensity,
  patternIntensity,
  direction,
  size,
  children,
  onClick,
  ...props
}: GradientButtonProps) => {
  const buttonProps = {
    variant: buttonVariant,
    size,

    ...props,
  };

  const gradientProps = {
    variant: gradientVariant,
    pattern,
    intensity,
    patternIntensity,
    direction,
  };

  const handleClick: ButtonProps["onClick"] = (e) => {
    onClick?.(e);
  };

  return (
    <Button
      {...buttonProps}
      onClick={handleClick}
      className={cn("relative overflow-hidden", props.className)}
    >
      <span className="relative z-20">{children}</span>
      <GradientBackground {...gradientProps} className="z-10 rounded-none" />
    </Button>
  );
};

export default GradientButton;
