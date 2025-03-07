import { useLottie } from "lottie-react";
import lottieJson from "@/lib/lottie/check.json";
import { cn } from "@/utils/cn";
import { useEffect, useRef } from "react";

interface LottieCheckerProps {
  isActive: boolean;
  className?: string;
}

const LottieChecker = ({ className, isActive }: LottieCheckerProps) => {
  const hasPlayedRef = useRef(false);

  const style = {
    width: 40,
    height: 40,
  };

  const options = {
    animationData: lottieJson,
    loop: false,
    autoplay: false,
  };

  const { View, animationItem } = useLottie(options, style);

  useEffect(() => {
    if (isActive && animationItem && !hasPlayedRef.current) {
      animationItem.goToAndPlay(0);
      hasPlayedRef.current = true;
    }
  }, [isActive, animationItem]);

  return <div className={cn("h-4 w-4", className)}>{View}</div>;
};

export default LottieChecker;
