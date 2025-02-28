import { PokemonTypesWithColor } from "@/components/profile/types";
import { PokemonType } from "@/types/pokemon";
import { Button } from "../primitives/button";
import ElementType from "../primitives/element-type";
import { ChevronDown } from "lucide-react";
import { cn } from "@/utils/cn";

interface TypeFilterProps {
  handleTypeSelect: (type: PokemonType) => void;
  isTypeOpen: boolean;
  setIsTypeOpen: (isOpen: boolean) => void;
  filtersType: PokemonType[];
  className?: string;
  wrapperClassName?: string;
}

const TypeFilter = ({
  isTypeOpen,
  filtersType,
  setIsTypeOpen,
  handleTypeSelect,
  className,
  wrapperClassName,
}: TypeFilterProps) => {
  return (
    <div className={cn("relative", wrapperClassName)}>
      <Button type="button" onClick={() => setIsTypeOpen(!isTypeOpen)} className={cn(className)}>
        <span className="font-normal text-amber-100">
          {filtersType.length === 0 ? (
            "Choose types"
          ) : (
            <div className="flex gap-1">
              {filtersType.map((type) => (
                <ElementType size="xs" key={type} variant={type.toLowerCase() as PokemonType} />
              ))}
            </div>
          )}
        </span>
        <ChevronDown
          className={`w-4transform h-4 transition-transform duration-200 ${isTypeOpen ? "rotate-180" : ""}`}
        />
      </Button>

      {isTypeOpen && (
        <div className="absolute z-10 mt-2 w-64 overflow-hidden rounded-sm border border-purple-200/20 bg-primary-dark/95 shadow-md shadow-purple-500/10">
          <div className="grid grid-cols-3 gap-1 p-2">
            {PokemonTypesWithColor.map(({ name: type, color }) => (
              <Button
                key={type}
                type="button"
                size="sm"
                onClick={() => handleTypeSelect(type as PokemonType)}
                className={` ${
                  filtersType.includes(type as PokemonType)
                    ? `${color} text-white`
                    : "text-amber-50 hover:bg-purple-900/20"
                }`}
              >
                <span className="text-sm">{type}</span>
              </Button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default TypeFilter;
