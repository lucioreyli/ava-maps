const MapTypes = {
  ROYAL: 1 << 0,
  RED: 1 << 1,
  BLACK: 1 << 2,
  HIDEOUT: 1 << 3,

  LOW: 1 << 4,
  MEDIUM: 1 << 5,
  HIGH: 1 << 6,
  DEEP: 1 << 7,

  RAID: 1 << 8,
};

export const normalizeType = (mapType: number): string =>
  Object.entries(MapTypes).reduce(
    (acc, [key, mt]) => (mapType & mt ? `${acc}_${key}` : acc),
    'TUNNEL',
  );

type ResourceK = `r${'F' | 'H' | 'O' | 'R' | 'W'}`;
type ChestK = `c${'G' | 'B' | 'HG' | 'LG'}`;
type DungeonK = `d${'S' | 'G' | 'A'}`;

type MapData = Partial<Record<ChestK | DungeonK | ResourceK, number>>;

const regData = /([a-zA-Z]+)(\d+)/;
export const parseMapData = (data: string): MapData =>
  data.split(',').reduce((acc: MapData, rawData: string) => {
    const match = rawData.match(regData);
    if (match) {
      const [_, key, value] = match;
      acc[key as keyof MapData] = Number(value);
    }
    return acc;
  }, {});
