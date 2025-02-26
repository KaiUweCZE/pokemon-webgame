import { cn } from "@/utils/cn";
import { useState, useCallback, type CSSProperties, useRef } from "react";

interface RippleProps {
  enabled?: boolean;
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
  enabled = false,
  colorClass = DEFAULT_COLOR,
  duration = DEFAULT_DURATION,
  scale = DEFAULT_SCALE,
  disabled = false,
}: Partial<RippleProps> = {}) => {
  if (!enabled) {
    return {
      createRipple: () => {},
      RippleContainer: () => null,
    };
  }

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
      const rippleId = Date.now();

      setRipples((prev) => [...prev, { id: rippleId, x, y, size: finalSize }]);
    },
    [scale, disabled, duration]
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
      animation: `ripple ${duration}ms ease-out`,
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

  const RippleContainer = useCallback(
    () => (
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        {ripples.map((ripple) => (
          <RippleEffect key={ripple.id} {...ripple} />
        ))}
      </div>
    ),
    [ripples]
  );

  return {
    createRipple,
    RippleContainer,
  };
};
