import { MAP_TYPES } from '@/constants/map-types';

export const normalizeType = (mapType: number): string => {
  return Object.entries(MAP_TYPES).reduce((acc, [key, mt]) => {
    if (typeof mt === 'number' && mapType & mt) {
      return `${acc}_${key}`;
    }

    return acc;
  }, 'TUNNEL');
};
