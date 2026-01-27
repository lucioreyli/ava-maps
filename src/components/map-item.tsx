import { cva } from 'class-variance-authority';
import { MapIcon } from '@/assets/map-icon';
import { Button } from '@/components/ui/button.tsx';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog.tsx';
import { normalizeType, parseMapData } from '@/lib/maps';
import { cn } from '@/lib/utils.ts';
import type { AvaMap } from '@/types.ts';
import { MinimapItem } from './minimap-item';

const mapTier = { 4: 'IV', 6: 'VI', 8: 'VIII' };

const itemStyle = cva('p-8 border rounded-md md:flex items-center gap-4', {
  variants: {
    tier: {
      4: 'bg-indigo-700/20',
      6: 'bg-orange-700/20',
      8: 'bg-neutral-700/20',
    },
  },
});

export const MapItem = ({
  map,
  style,
}: { map: AvaMap } & Pick<React.ComponentProps<'div'>, 'style'>) => {
  const data = parseMapData(map.d);
  const mapType = normalizeType(map.t);
  return (
    <Dialog>
      <div className={cn(itemStyle({ tier: map.l }))} style={style}>
        <DialogTrigger className="flex gap-x-2 items-center max-md:mb-2">
          <p className="font-medium">
            {map.n} ({mapTier[map.l]})
            <span className="text-xs text-muted-foreground block">
              {mapType}
            </span>
          </p>
          <Button asChild variant="outline" className="my-auto md:hidden">
            {MapIcon}
          </Button>
        </DialogTrigger>
        <DialogContent>
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
        </DialogContent>
        <div className="ml-auto grid grid-cols-2 md:inline-flex gap-1.5">
          <div className="grid border p-2 rounded-sm bg-white/5">
            <span className="font-medium text-xs text-muted-foreground">
              Resources
            </span>
            <ul className="flex">
              <MinimapItem itemName="hide" stack={data.rH} />
              <MinimapItem itemName="fiber" stack={data.rF} />
              <MinimapItem itemName="wood" stack={data.rW} />
              <MinimapItem itemName="ore" stack={data.rO} />
              <MinimapItem itemName="rock" stack={data.rR} />
            </ul>
          </div>
          <div className="grid border p-2 rounded-sm bg-white/5">
            <span className="font-medium text-xs text-muted-foreground">
              Dungeons
            </span>
            <ul className="flex gap-2">
              <MinimapItem stack={data.dS} itemName="dg-solo" />
              <MinimapItem stack={data.dG} itemName="dg-group" />
              <MinimapItem stack={data.dA} itemName="dg-ava" />
            </ul>
          </div>
          <div className="grid border p-2 rounded-sm bg-white/5">
            <span className="font-medium text-xs text-muted-foreground">
              Chests
            </span>
            <ul className="flex gap-2">
              <MinimapItem stack={data.cG} itemName="green-chest" />
              <MinimapItem stack={data.cB} itemName="blue-chest" />
              <MinimapItem
                stack={(data.cHG || 0) + (data.cLG || 0)}
                itemName="gold-chest"
              />
            </ul>
          </div>

          <div className="grid border p-2 rounded-sm bg-white/5">
            <span className="font-medium text-xs text-muted-foreground">
              Extras
            </span>
            <ul className="flex gap-2">
              <MinimapItem stack={map.b} itemName="brecilien" />
            </ul>
          </div>
          <DialogTrigger asChild>
            <Button variant="outline" className="my-auto max-md:hidden">
              {MapIcon}
            </Button>
          </DialogTrigger>
        </div>
      </div>
    </Dialog>
  );
};
