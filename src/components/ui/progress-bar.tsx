"use client";
import { useCallback, useEffect, useRef, useState } from "react";

interface ProgressBarProps {
  duration: number;
  primaryColor: string;
  secondaryColor?: string;
  onClose?: () => void;
  className?: string;
  setIsLeaving?: (isLeaving: boolean) => void;
  isHovering?: boolean;
  setIsHovering?: (isHovering: boolean) => void;
}

const TRANSITON_DURATION = 300;

const ProgressBar = ({
  duration,
  onClose,
  className,
  primaryColor,
  secondaryColor,
  setIsLeaving,
  isHovering,
  setIsHovering,
}: ProgressBarProps) => {
  const startTimeRef = useRef<number>(0);
  //const pausedAtRef = useRef<number>(0);
  const frameRef = useRef<number | null>(null);
  const isUnmountedRef = useRef(false);
  const [progress, setProgress] = useState(100);

  const animate = (timestamp: number) => {
    if (isUnmountedRef.current) return;
    if (isHovering) return;

    if (!startTimeRef.current) {
      startTimeRef.current = timestamp;
    }

    const elapsed = timestamp - startTimeRef.current;
    const remaining = Math.max(0, duration - elapsed);
    const currentProgress = (remaining / duration) * 100;
    setProgress(currentProgress);
    if (currentProgress > 0) {
      frameRef.current = requestAnimationFrame(animate);
    } else {
      setIsLeaving?.(true);
      onClose?.();
      setIsHovering?.(false);
    }
  };

  useEffect(() => {
    isUnmountedRef.current = false;
    frameRef.current = requestAnimationFrame(animate);

    return () => {
      isUnmountedRef.current = true;
      if (frameRef.current) {
        cancelAnimationFrame(frameRef.current);
      }
    };
  }, [duration, onClose, isHovering]);

  return (
    <div className={`progress-bar absolute bottom-0 h-1 w-full ${secondaryColor} ${className}`}>
      <div
        className={`h-full transform-gpu ${primaryColor}`}
        style={{
          transform: `scaleX(${progress / 100})`,
          transformOrigin: "left",
          transition: "transform 16ms linear",
        }}
      />
    </div>
  );
};

export default ProgressBar;
