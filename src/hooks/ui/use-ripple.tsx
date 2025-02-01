import { cn } from "@/utils/cn";
import { useState, useCallback, type CSSProperties } from "react";

interface RippleProps {
  colorClass?: string;
  duration?: number;
  scale?: number;
  className?: string;
  disabled?: boolean;
}

interface RippleState {
  id: number;
  x: number;
  y: number;
  size: number;
}
const DEFAULT_DURATION = 800;
const DEFAULT_SCALE = 4;
const DEFAULT_COLOR = "bg-white/30";

export const useRipple = ({
  colorClass = DEFAULT_COLOR,
  duration = DEFAULT_DURATION,
  scale = DEFAULT_SCALE,
  disabled = false,
}: Partial<RippleProps> = {}) => {
  const [ripples, setRipples] = useState<RippleState[]>([]);

  const createRipple = useCallback(
    (event: React.MouseEvent<HTMLElement>) => {
      if (disabled) return;

      const element = event.currentTarget;
      const rect = element.getBoundingClientRect();

      const size = Math.max(element.clientWidth, element.clientHeight);
      const finalSize = scale * size;
      const x = event.clientX - rect.left;
      const y = event.clientY - rect.top;

      setRipples((prev) => [...prev, { id: Date.now(), x, y, size: finalSize }]);
    },
    [scale, disabled]
  );
  const removeRipple = useCallback((id: number) => {
    setRipples((prev) => prev.filter((r) => r.id !== id));
  }, []);

  const RippleEffect = ({ x, y, size, id }: RippleState) => {
    const style: CSSProperties = {
      left: `${x}px`,
      top: `${y}px`,
      width: `${size}px`,
      height: `${size}px`,
    };

    return (
      <span
        className={cn(
          "pointer-events-none absolute -translate-x-1/2 -translate-y-1/2 scale-0 rounded-full",
          colorClass,
          "animate-ripple"
        )}
        style={style}
        onAnimationEnd={() => {
          setRipples((prev) => prev.filter((r) => r.id !== id));
        }}
      />
    );
  };

  const RippleContainer = () => (
    <div className="pointer-events-none absolute inset-0 overflow-hidden">
      {ripples.map((ripple) => (
        <RippleEffect key={ripple.id} {...ripple} />
      ))}
    </div>
  );

  return {
    createRipple,
    RippleContainer,
  };
};
