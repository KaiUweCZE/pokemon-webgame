import { Card, CardProps } from "@/components/ui/primitives/card";
import { Button } from "@/components/ui/primitives/button";

export interface IntroCardProps extends CardProps {
  ctaText?: string;
  onCtaClick?: () => void;
}

export const IntroCard = ({ ctaText, onCtaClick, children, ...props }: IntroCardProps) => {
  return (
    <Card animation="slide-left-to-right" {...props}>
      {children}
      {ctaText && (
        <Button size="sm" onClick={onCtaClick}>
          <span className="text-amber-50">{ctaText}</span>
        </Button>
      )}
    </Card>
  );
};
