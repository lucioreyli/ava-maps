import Bun from 'bun';
import z from 'zod';
import data from './data.json';

enum MAP_TYPES {
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
enum MTYPES {
  TUNNEL_ROYAL = 1,
  TUNNEL_ROYAL_RED = 3,
  TUNNEL_BLACK_LOW = 20,
  TUNNEL_BLACK_MEDIUM = 36,
  TUNNEL_BLACK_HIGH = 68,
  TUNNEL_LOW = 16,
  TUNNEL_MEDIUM = 32,
  TUNNEL_HIGH = 64,
  TUNNEL_DEEP = 128,
  TUNNEL_DEEP_RAID = 384,
  TUNNEL_HIDEOUT = 8,
  TUNNEL_HIDEOUT_DEEP = 136,
}

const mapSchema = z.object({
  n: z.string(), // name
  t: z.number().positive(), // type
  l: z
    .number()
    .positive()
    .refine((val) => [4, 6, 8].includes(val)), // level (tier)
  b: z
    .number()
    .refine((v) => [0, 1].includes(v))
    .optional(), // brecilien

  // chest
  cG: z.number().optional(), // green
  cB: z.number().optional(), // blue
  cHG: z.number().optional(), // high gold
  cLG: z.number().optional(), // low gold

  // dungeon
  dA: z.number().optional(), // avalon
  dS: z.number().optional(), // solo
  dG: z.number().optional(), // group

  // resource
  rF: z.number().optional(), // fiber
  rH: z.number().optional(), // hide
  rO: z.number().optional(), // ore
  rR: z.number().optional(), // rock
  rW: z.number().optional(), // wood
});

type Map = z.infer<typeof mapSchema>;

const result: Map[] = [];

const generateMapType = (tierName: string): number => {
  return tierName.split('_').reduce((acc, curr) => {
    const t = MAP_TYPES[curr] || 0;
    return t | acc;
  }, 0);
};

for (const map of data) {
  const mapType = generateMapType(map.type);

  if (
    !Object.entries(MTYPES).some(
      ([key, value]) => key === map.type && value === mapType,
    )
  ) {
    throw Error(`invalid map tier: ${map.name} ${map.tier} ${mapType}`);
  }

  const payload: Omit<Map, 'n' | 't' | 'l' | 'b'> = {
    cG: map.chests.green,
    cB: map.chests.blue,
    cHG: map.chests.highGold,
    cLG: map.chests.lowGold,

    dS: map.dungeons.solo,
    dG: map.dungeons.group,
    dA: map.dungeons.avalon,

    rF: map.resources.fiber,
    rH: map.resources.hide,
    rO: map.resources.ore,
    rR: map.resources.rock,
    rW: map.resources.wood,
  };
  const m: Pick<Map, 'n' | 't' | 'l' | 'b'> & { d: string } = {
    n: map.name,
    t: mapType,
    l: Number(map.tier.charAt(1)),
    b: map.brecilien || undefined,
    d: Object.entries(payload)
      .flatMap((d) => (!d[1] ? [] : d.join('')))
      .join(','),
  };
  result.push(m);
}

Bun.file('src/constants/maps.json').write(JSON.stringify(result));
