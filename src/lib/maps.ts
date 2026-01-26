export enum MAP_TYPES {
  ROYAL = 1 << 0,
  RED = 1 << 1,
  BLACK = 1 << 2,
  HIDEOUT = 1 << 3,

  LOW = 1 << 4,
  MEDIUM = 1 << 5,
  HIGH = 1 << 6,
  DEEP = 1 << 7,

  RAID = 1 << 8,
}

export const normalizeType = (mapType: number): string => {
  return Object.entries(MAP_TYPES).reduce((acc, [key, mt]) => {
    if (typeof mt === 'number' && mapType & mt) {
      return `${acc}_${key}`;
    }
    return acc;
  }, 'TUNNEL');
};

type ResourceK = `r${'F' | 'H' | 'O' | 'R' | 'W'}`;
type ChestK = `c${'G' | 'B' | 'HG' | 'LG'}`;
type DungeonK = `d${'S' | 'G' | 'A'}`;

type MapData = Partial<Record<ChestK | DungeonK | ResourceK, number>>;

export const parseMapData = (data: string): MapData => {
  // "cB1,cLG1,dS1,dG1,rO3,rW1"

  data.split(',').reduce((acc: MapData, rawData: string) => {
    return acc;
  }, {});

  return {};
};
