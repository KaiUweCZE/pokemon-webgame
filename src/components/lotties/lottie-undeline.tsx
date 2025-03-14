import { useLottie } from "lottie-react";
import lottieJson from "@/lib/lottie/underline.json";
import { cn } from "@/utils/cn";
import { useEffect, useRef } from "react";

interface LottieUnderlineProps {
  isActive: boolean;
  className?: string;
}

const LottieUnderline = ({ className, isActive }: LottieUnderlineProps) => {
  const hasPlayedRef = useRef(false);

  const style = {
    width: 150,
    height: 40,
  };

  const options = {
    animationData: lottieJson,
    loop: false,
    autoplay: false,
  };

  const { View, animationItem } = useLottie(options, style);

  useEffect(() => {
    if (isActive && animationItem) {
      animationItem.goToAndPlay(0);
      hasPlayedRef.current = true;
    }
  }, [isActive, animationItem]);

  return <div className={cn("h-4 w-4", className)}>{View}</div>;
};

export default LottieUnderline;
