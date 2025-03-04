import { useEffect, useRef } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useBattleStore } from "@/store/battle/battle-store";
import { calculateDamage } from "@/utils/battle/damage";
import { updateUserPokemonClient } from "@/store/battle/actions/battle-pokemon-actions";
import { setBattleStatus } from "@/store/battle/actions/battle-state";
import { calculateCooldown } from "@/utils/battle/cooldown";
import { getRandomAttack } from "@/utils/battle/random-attack";
import { updateUserPokemon } from "@/utils/actions/battle/battle-actions";
import { useToast } from "@/components/providers/toast-provider";
import { setEnemyAttack } from "@/store/battle/actions/battle-attacks-state";
import { setEnemyAttackAnimation } from "@/store/battle/actions/battle-animations";
import { battleLogger } from "@/utils/loggers/battle-logger";

export const useEnemyAttack = () => {
  const queryClient = useQueryClient();
  const { enemyPokemon, userPokemon, battleStatus, enemyAttack } = useBattleStore();
  const attackIntervalRef = useRef<NodeJS.Timeout | null>(null);
  const { showToast } = useToast();

  const performAttackMutation = useMutation({
    mutationFn: async () => {
      if (!enemyPokemon || !userPokemon || battleStatus !== "in-progress") {
        return null;
      }

      // Randomly select an attack from enemy's available attacks
      const randomAttack = getRandomAttack(enemyPokemon.attacks);

      if (!randomAttack || !randomAttack?.img) {
        return null;
      }

      setEnemyAttack(randomAttack);
      setEnemyAttackAnimation(randomAttack.img);

      // Calculate damage and update user Pokemon's HP
      const { finalDamage } = calculateDamage(enemyPokemon, userPokemon, randomAttack);

      /* 
      Set to 1 for testing  
      origin: userPokemon.currentHp - finalDamage
      */
      const newUserPokemonHp = Math.max(0, userPokemon.currentHp - 1);

      battleLogger.attack({
        attacker: enemyPokemon.name,
        defender: userPokemon.name,
        attackName: randomAttack.name,
        damage: finalDamage,
        defenderHpBefore: userPokemon.currentHp,
        defenderHpAfter: newUserPokemonHp,
      });

      /* update user pokemon on client side*/
      updateUserPokemonClient({
        ...userPokemon,
        currentHp: newUserPokemonHp,
      });

      if (newUserPokemonHp === 0) {
        setBattleStatus("enemy-victory");
        stopAttacking();
      }

      /* update user pokemon on server side*/
      const restult = await updateUserPokemon(userPokemon.id, {
        currentHp: newUserPokemonHp,
      });

      return {
        damage: finalDamage,
        attack: enemyAttack,
        restult,
      };
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["current-user"] });
    },
    onError: (error) => {
      battleLogger.error("Enemy attack failed", error);
      showToast(error instanceof Error ? error.message : "Failed to attack", "error", {
        headline: "Attack failed",
      });
    },
  });

  const startAttacking = () => {
    if (attackIntervalRef.current) return;

    const performAttack = () => {
      const recoveryTime = enemyAttack?.recoveryTime ?? 10;
      const cooldown = calculateCooldown(recoveryTime * 1000, enemyPokemon?.speed || 0);

      // Log metrics
      battleLogger.metrics({
        cooldown,
        recoveryTime,
        speed: enemyPokemon?.speed || 0,
      });

      performAttackMutation.mutate();

      // Schedule next attack
      attackIntervalRef.current = setTimeout(performAttack, cooldown);
    };

    performAttack();
  };

  const stopAttacking = () => {
    if (attackIntervalRef.current) {
      clearTimeout(attackIntervalRef.current);
      attackIntervalRef.current = null;
    }
  };

  useEffect(() => {
    if (battleStatus === "in-progress") {
      startAttacking();
    } else {
      stopAttacking();
    }

    return () => stopAttacking();
  }, [battleStatus]);

  return {
    isAttacking: !!attackIntervalRef.current,
    currentAttack: performAttackMutation.data?.attack,
    isLoading: performAttackMutation.isPending,
    error: performAttackMutation.error,
  };
};
