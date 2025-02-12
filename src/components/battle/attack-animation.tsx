import Image, { StaticImageData } from "next/image";
import { useEffect } from "react";

interface AttackAnimationProps {
  image: StaticImageData | string | null;
  setAnimation: (img: StaticImageData | string | null, duration?: number) => void;
  className?: string;
  duration?: number;
}

const AttackAnimation = ({
  image,
  className,
  duration = 1000,
  setAnimation,
}: AttackAnimationProps) => {
  useEffect(() => {
    if (image) {
      const timer = setTimeout(() => {
        setAnimation(null);
      }, duration);

      return () => clearTimeout(timer);
    }
  }, [image, duration]);

  if (!image) return null;

  return (
    <div className={`absolute inset-0 z-10 ${className}`}>
      <Image
        src={image}
        alt="Attack animation"
        className="object-contain"
        width={200}
        height={200}
      />
    </div>
  );
};

export default AttackAnimation;
