import type { AvaMap } from '@/types';
import { DialogDescription, DialogHeader, DialogTitle } from './ui/dialog';

type Props = { map: AvaMap; mapType: string };

export const MapContainer = ({ map, mapType }: Props) => (
  <DialogHeader>
    <DialogTitle>{map.n}</DialogTitle>
    <DialogDescription>{mapType}</DialogDescription>
    <img
      src={`./maps/${map.n.toLowerCase()}.webp`}
      alt="map"
      className="w-full h-full rounded-sm"
      loading="eager"
    />
  </DialogHeader>
);
