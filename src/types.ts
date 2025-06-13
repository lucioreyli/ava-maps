export type AvaMap = {
  name: string;
  tier: string;
  type: string;
  chests: {
    blue: number;
    green: number;
    highGold: number;
    lowGold: number;
  };
  dungeons: {
    solo: number;
    group: number;
    avalon: number;
  };
  resources: {
    rock: number;
    wood: number;
    ore: number;
    fiber: number;
    hide: number;
  };
  brecilien: number;
};
