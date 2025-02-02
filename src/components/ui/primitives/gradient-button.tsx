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
  ...props
}: GradientButtonProps) => {
  const buttonProps = {
    variant: buttonVariant,
    size,
    className: cn("relative grid overflow-hidden z-0", props.className),
    ...props,
  };

  const gradientProps = {
    variant: gradientVariant,
    pattern,
    intensity,
    patternIntensity,
    direction,
  };

  return (
    <Button {...buttonProps}>
      <span className="relative z-10">{children}</span>
      <GradientBackground {...gradientProps} />
    </Button>
  );
};

export default GradientButton;
