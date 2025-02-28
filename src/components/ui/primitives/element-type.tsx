import { cn } from "@/utils/cn";
import { cva, VariantProps } from "class-variance-authority";
import { PokemonType } from "@/types/pokemon";
import { GradientBackground } from "./gradient-background";
import { typeImages } from "@/images/pokemon-types2/type-images";
import Image from "next/image";

const elementVariants = cva(
  `grid overflow-hidden relative place-items-center h-fit w-fit shadow-secondary`,
  {
    variants: {
      variant: {
        normal: "bg-stone-500 text-white",
        water: "bg-blue-500 text-white",
        grass: "bg-green-500 text-white",
        fire: "bg-red-500 text-white",
        electric: "bg-yellow-400 text-black",
        ice: "bg-cyan-400 text-white",
        steel: "bg-slate-400 text-white",
        poison: "bg-purple-500 text-white",
        ground: "bg-amber-600 text-white",
        fighting: "bg-red-700 text-white",
        dragon: "bg-indigo-600 text-white",
        flying: "bg-sky-400 text-white",
        rock: "bg-stone-600 text-white",
        bug: "bg-lime-500 text-white",
        ghost: "bg-purple-700 text-white",
        dark: "bg-stone-800 text-white",
        psychic: "bg-pink-500 text-white",
        fairy: "bg-pink-400 text-white",
      },
      rounded: {
        sm: "rounded-sm",
        md: "rounded-md",
        none: "rounded-none",
      },
      icon: {
        true: "h-6 w-6",
        false: "",
      },
      size: {
        xs: "w-12 text-xs",
        sm: "w-16 px-1 text-sm font-normal",
        md: "w-16 py-2 px-4 text-md",
        lg: "w-20 py-2 px-6 text-base",
      },
    },
    defaultVariants: {
      size: "sm",
      rounded: "sm",
    },
  }
);

type ElementVariantType = VariantProps<typeof elementVariants>;

interface ElementTypeProps extends ElementVariantType {
  className?: string;
  onClick?: () => void;
}

interface PokemonTypeProps {
  type: PokemonType;
  size?: "sm" | "md" | "lg";
  variant?: "solid" | "outline" | "subtle";
}
const ElementType = ({ variant, rounded, size, className, onClick }: ElementTypeProps) => {
  const { src, alt } = typeImages[variant as PokemonType];
  return (
    <div className={cn(elementVariants({ variant, rounded, size, className }))} onClick={onClick}>
      <span>{variant}</span>
      <GradientBackground intensity="medium" variant="dark" className="z-1" />
      <Image
        src={src}
        alt={alt}
        width={20}
        height={20}
        className="absolute -left-0 -top-1 opacity-40 blur-[1px] brightness-200"
      />
    </div>
  );
};

export default ElementType;
