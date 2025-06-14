export type AvaMap = {
  name: string;
  tier: 'T4' | 'T6' | 'T8';
  type:
    | 'TUNNEL_ROYAL'
    | 'TUNNEL_ROYAL_RED'
    | 'TUNNEL_BLACK_LOW'
    | 'TUNNEL_BLACK_MEDIUM'
    | 'TUNNEL_BLACK_HIGH'
    | 'TUNNEL_DEEP'
    | 'TUNNEL_LOW'
    | 'TUNNEL_MEDIUM'
    | 'TUNNEL_HIGH'
    | 'TUNNEL_BLACK_LOW'
    | 'TUNNEL_BLACK_MEDIUM'
    | 'TUNNEL_BLACK_HIGH'
    | 'TUNNEL_DEEP_RAID'
    | 'TUNNEL_HIDEOUT'
    | 'TUNNEL_HIDEOUT_DEEP';
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
