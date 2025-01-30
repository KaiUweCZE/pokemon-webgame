import { Card, CardProps } from "@/components/ui/primitives/card";
import { Button } from "@/components/ui/primitives/button";

export interface IntroCardProps extends CardProps {
  ctaText?: string;
  onCtaClick?: () => void;
  iconLeft?: React.ReactNode;
  iconRight?: React.ReactNode;
  isLoading?: boolean;
  loadingText?: string;
}

export const IntroCard = ({
  ctaText,
  onCtaClick,
  iconLeft,
  iconRight,
  children,
  isLoading,
  loadingText,
  ...props
}: IntroCardProps) => {
  return (
    <Card animation="slide-left-to-right" {...props}>
      {children}
      {ctaText && (
        <Button
          variant="basic"
          size="sm"
          onClick={onCtaClick}
          leftIcon={iconLeft}
          rightIcon={iconRight}
        >
          <span className="">{ctaText}</span>
        </Button>
      )}
    </Card>
  );
};
