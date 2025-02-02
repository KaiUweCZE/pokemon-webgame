import { cn } from "@/utils/cn";
import { Sun, Moon, Star } from "lucide-react";
import React from "react";

const OnePart = ({
  icon,
  text,
  isActive = false,
}: {
  icon: React.ReactNode;
  text: string;
  isActive?: boolean;
}) => {
  return (
    <div className="flex flex-col items-center gap-2">
      <div
        className={cn(
          "h-8 w-8 scale-95 rounded-full border-2",
          "flex items-center justify-center",
          "transition-all duration-300",
          // base styles
          "border-white/20 bg-gradient-to-br from-purple-500/30 to-indigo-500/30 opacity-70 blur-[1px]",
          isActive && [
            "opacity-100",
            "border-purple-300/60",
            "custom-pulse",
            "from-purple-500/50 to-indigo-500/50 blur-[0px]",
            "shadow-lg shadow-purple-500/20",
            "scale-110",
          ]
        )}
      >
        {icon}
      </div>
      <span
        className={cn(
          "text-xs font-medium transition-colors duration-300",
          isActive ? "text-amber-200" : "text-amber-100/60"
        )}
      >
        {text}
      </span>
    </div>
  );
};

const PartsOfDay = ({ currentPartOfDay }: { currentPartOfDay: number }) => {
  const dayParts = [
    {
      icon: <Sun className="h-4 w-4 text-yellow-300" />,
      text: "Morning",
      period: 0,
    },
    {
      icon: <Moon className="h-4 w-4 text-blue-200" />,
      text: "Evening",
      period: 1,
    },
    {
      icon: <Star className="h-4 w-4 text-gray-200" />,
      text: "Night",
      period: 2,
    },
  ];

  return (
    <div className="relative grid grid-cols-3 justify-between gap-4 rounded-lg p-4">
      {dayParts.map((part, index) => (
        <OnePart
          key={index}
          icon={part.icon}
          text={part.text}
          isActive={currentPartOfDay === part.period}
        />
      ))}
    </div>
  );
};

export default PartsOfDay;
