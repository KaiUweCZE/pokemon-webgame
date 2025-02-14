import { setBattleCooldown } from "@/store/battle/actions/battle-attacks-state";
import { calculateCooldown } from "@/utils/battle/cooldown";
import { forwardRef, useImperativeHandle, useState, useEffect } from "react";

export interface CooldownHandle {
  startCooldown: (recoveryTime: number) => void;
}

interface CooldownProps {
  pokemonSpeed: number;
  onComplete?: () => void;
}

const Cooldown = forwardRef<CooldownHandle, CooldownProps>(({ pokemonSpeed, onComplete }, ref) => {
  const [cooldownTime, setCooldownTime] = useState(0);

  useEffect(() => {
    setBattleCooldown(cooldownTime > 0);
  }, [cooldownTime]);

  useImperativeHandle(ref, () => ({
    startCooldown: (recoveryTime: number) => {
      const duration = calculateCooldown(recoveryTime, pokemonSpeed);
      setCooldownTime(duration);
    },
  }));

  useEffect(() => {
    if (cooldownTime > 0) {
      const interval = setInterval(() => {
        setCooldownTime((prev) => {
          const newTime = Math.max(0, Number((prev - 0.1).toFixed(1)));
          if (newTime === 0) {
            onComplete?.();
          }
          return newTime;
        });
      }, 100);

      return () => clearInterval(interval);
    }
  }, [cooldownTime, onComplete]);

  if (cooldownTime === 0) return null;

  return (
    <div className="absolute grid h-full w-full place-items-center bg-primary/70">
      <span className="text-lg font-semibold text-white">{cooldownTime}s</span>
    </div>
  );
});

Cooldown.displayName = "Cooldown";

export default Cooldown;
