import { Button } from '@/components/ui/button.tsx';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog.tsx';
import { cn } from '@/lib/utils.ts';
import type { AvaMap } from '@/types.ts';
import { cva } from 'class-variance-authority';
import { MapIcon } from 'lucide-react';
import { MinimapItem } from './minimap-item';
import { normalizeType } from '@/lib/maps';

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
  return (
    <Dialog>
      <div className={cn(itemStyle({ tier: map.l }))} style={style}>
        <DialogTrigger className="flex gap-x-2 items-center max-md:mb-2">
          <p className="font-medium">
            {map.n} ({mapTier[map.l]})
            <span className="text-xs text-muted-foreground block">
              {normalizeType(map.t)}
            </span>
          </p>
          <Button variant="outline" className="my-auto md:hidden">
            <MapIcon />
          </Button>
        </DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>{map.n}</DialogTitle>
            <DialogDescription>{map.t}</DialogDescription>
            <img
              src={`./maps/${map.n.toLowerCase()}.png`}
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
              <MinimapItem itemName="hide" stack={0} />
              <MinimapItem itemName="fiber" stack={0} />
              <MinimapItem itemName="wood" stack={0} />
              <MinimapItem itemName="ore" stack={0} />
              <MinimapItem itemName="rock" stack={0} />
            </ul>
          </div>
          <div className="grid border p-2 rounded-sm bg-white/5">
            <span className="font-medium text-xs text-muted-foreground">
              Dungeons
            </span>
            <ul className="flex gap-2">
              <MinimapItem stack={0} itemName="dg-solo" />
              <MinimapItem stack={0} itemName="dg-group" />
              <MinimapItem stack={0} itemName="dg-ava" />
            </ul>
          </div>
          <div className="grid border p-2 rounded-sm bg-white/5">
            <span className="font-medium text-xs text-muted-foreground">
              Chests
            </span>
            <ul className="flex gap-2">
              <MinimapItem stack={0} itemName="green-chest" />
              <MinimapItem stack={0} itemName="blue-chest" />
              <MinimapItem stack={0} itemName="gold-chest" />
            </ul>
          </div>

          <div className="grid border p-2 rounded-sm bg-white/5">
            <span className="font-medium text-xs text-muted-foreground">
              Extras
            </span>
            <ul className="flex gap-2">
              <MinimapItem stack={1} itemName="brecilien" />
            </ul>
          </div>
          <DialogTrigger asChild>
            <Button variant="outline" className="my-auto max-md:hidden">
              <MapIcon />
            </Button>
          </DialogTrigger>
        </div>
      </div>
    </Dialog>
  );
};
