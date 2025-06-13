import type { AvaMap } from '@/types.ts';

export const MapItem = ({ map }: { map: AvaMap }) => {
  return (
    <div className="p-8 border rounded-md flex items-center gap-4">
      <img
        className="size-8 md:size-12 rounded-md"
        src={`/maps/${map.name.toLowerCase()}.png`}
        alt={map.name}
      />
      {map.name}
    </div>
  );
};
