const isDev = process.env.NODE_ENV === "development";

/**
 * Battle Logger
 */
export const battleLogger = {
  /**
   * Log attack with details
   */
  attack: (data: {
    attacker: string;
    defender: string;
    attackName: string;
    damage: number;
    defenderHpBefore: number;
    defenderHpAfter: number;
  }) => {
    if (!isDev) return;

    const { attacker, defender, attackName, damage, defenderHpBefore, defenderHpAfter } = data;
    const isKO = defenderHpAfter <= 0;

    console.groupCollapsed(
      `%c🔥 ${attacker} used %c${attackName}%c on ${defender}!`,
      "color: #FEE685; font-weight: bold;",
      "color: #E53935; font-weight: bold;",
      "color: #FEE685; font-weight: bold;"
    );

    console.log(`%cDamage: %c${damage}`, "color: #FEE685;", "color: #E53935; font-weight: bold;");

    console.log(
      `%c${defender} HP: %c${defenderHpBefore} → ${defenderHpAfter}`,
      "color: #FEE685;",
      `color: ${isKO ? "#E53935" : "#4CAF50"}; font-weight: bold;`
    );

    if (isKO) {
      console.log(`%c${defender} fainted!`, "color: #E53935; font-weight: bold; font-size: 14px;");
    }

    console.groupEnd();
  },

  /**
   * Log battle metrics
   */
  metrics: (data: { cooldown: number; recoveryTime: number; speed: number }) => {
    if (!isDev) return;

    const { cooldown, recoveryTime, speed } = data;

    console.groupCollapsed(`%c⏱️ Battle Metrics`, "color: #2196F3; font-weight: bold;");

    console.log(
      `%cCooldown: %c${cooldown}ms`,
      "color: #FEE685;",
      "color: #2196F3; font-weight: bold;"
    );

    console.log(
      `%cRecovery Time: %c${recoveryTime}`,
      "color: #FEE685;",
      "color: #2196F3; font-weight: bold;"
    );

    console.log(
      `%cSpeed Factor: %c${speed}`,
      "color: #FEE685;",
      "color: #2196F3; font-weight: bold;"
    );

    console.groupEnd();
  },

  /**
   * Log battle state change
   */
  stateChange: (prevState: string, newState: string) => {
    if (!isDev) return;

    console.log(
      `%c🔄 Battle State: %c${prevState} → ${newState}`,
      "color: #FEE685; font-weight: bold;",
      "color: #9C27B0; font-weight: bold;"
    );
  },

  /**
   * Log errors
   */
  error: (message: string, error?: any) => {
    console.error(
      `%c❌ Battle Error: %c${message}`,
      "color: white; background-color: #F44336; padding: 2px 4px; border-radius: 2px;",
      "color: #F44336; font-weight: bold;",
      error
    );
  },

  /**
   * Create table with pokemon stats
   */
  pokemonStats: (pokemon: {
    name: string;
    currentHp: number;
    maxHp: number;
    level: number;
    types: string[];
    attacks: string[];
    damage: number;
    defense: number;
    speed: number;
  }) => {
    if (!isDev) return;

    console.groupCollapsed(
      `%c📊 ${pokemon.name.toUpperCase()} Stats (Lvl ${pokemon.level})`,
      "color: #FF9800; font-weight: bold;"
    );

    console.table({
      HP: `${pokemon.currentHp}/${pokemon.maxHp}`,
      Level: pokemon.level,
      Types: pokemon.types.join(", "),
      Attacks: pokemon.attacks.join(", "),
      Damage: pokemon.damage,
      Defense: pokemon.defense,
      Speed: pokemon.speed,
    });

    console.groupEnd();
  },
};
