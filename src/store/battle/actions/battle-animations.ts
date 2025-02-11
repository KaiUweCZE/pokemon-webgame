import { battleStore } from "../battle-store";
import { StaticImageData } from "next/image";

export const setUserAttackAnimation = (
  img: StaticImageData | string | null,
  duration: number = 1000
) => {
  battleStore.setState((state) => ({
    ...state,
    animations: {
      ...state.animations,
      user: {
        img,
        duration,
        isPlaying: !!img,
      },
    },
  }));
};

export const setEnemyAttackAnimation = (
  img: StaticImageData | string | null,
  duration: number = 1000
) => {
  battleStore.setState((state) => ({
    ...state,
    animations: {
      ...state.animations,
      enemy: {
        img,
        duration,
        isPlaying: !!img,
      },
    },
  }));
};

export const setUserAttacking = (isAttacking: boolean) => {
  battleStore.setState((state) => ({
    ...state,
    animations: {
      ...state.animations,
      isUserAttacking: isAttacking,
    },
  }));
};

export const setEnemyAttacking = (isAttacking: boolean) => {
  battleStore.setState((state) => ({
    ...state,
    animations: {
      ...state.animations,
      isEnemyAttacking: isAttacking,
    },
  }));
};
