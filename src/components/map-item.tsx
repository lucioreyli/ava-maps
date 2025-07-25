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

const mapTier = { T4: 'IV', T6: 'VI', T8: 'VIII' } as Record<string, string>;

const itemStyle = cva('p-8 border rounded-md md:flex items-center gap-4', {
  variants: {
    tier: {
      T4: 'bg-indigo-700/20',
      T6: 'bg-orange-700/20',
      T8: 'bg-neutral-700/20',
    } as Record<string, string>,
  },
});

export const MapItem = ({
  map,
  style,
}: { map: AvaMap } & Pick<React.ComponentProps<'div'>, 'style'>) => {
  return (
    <Dialog>
      <div className={cn(itemStyle({ tier: map.tier }))} style={style}>
        <DialogTrigger className="flex gap-x-2 items-center max-md:mb-2">
          <p className="font-medium">
            {map.name} ({mapTier[map.tier]})
            <span className="text-xs text-muted-foreground block">
              {map.type}
            </span>
          </p>
          <Button variant="outline" className="my-auto md:hidden">
            <MapIcon />
          </Button>
        </DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>{map.name}</DialogTitle>
            <DialogDescription>{map.type}</DialogDescription>
            <img
              src={`./maps/${map.name.toLowerCase()}.png`}
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
              <MinimapItem itemName="hide" stack={map.resources.hide} />
              <MinimapItem itemName="fiber" stack={map.resources.fiber} />
              <MinimapItem itemName="wood" stack={map.resources.wood} />
              <MinimapItem itemName="ore" stack={map.resources.ore} />
              <MinimapItem itemName="rock" stack={map.resources.rock} />
            </ul>
          </div>
          <div className="grid border p-2 rounded-sm bg-white/5">
            <span className="font-medium text-xs text-muted-foreground">
              Dungeons
            </span>
            <ul className="flex gap-2">
              <MinimapItem stack={map.dungeons.solo} itemName="dg-solo" />
              <MinimapItem stack={map.dungeons.group} itemName="dg-group" />
              <MinimapItem stack={map.dungeons.avalon} itemName="dg-ava" />
            </ul>
          </div>
          <div className="grid border p-2 rounded-sm bg-white/5">
            <span className="font-medium text-xs text-muted-foreground">
              Chests
            </span>
            <ul className="flex gap-2">
              <MinimapItem stack={map.chests.green} itemName="green-chest" />
              <MinimapItem stack={map.chests.blue} itemName="blue-chest" />
              <MinimapItem
                stack={map.chests.highGold + map.chests.lowGold}
                itemName="gold-chest"
              />
            </ul>
          </div>

          <div className="grid border p-2 rounded-sm bg-white/5">
            <span className="font-medium text-xs text-muted-foreground">
              Extras
            </span>
            <ul className="flex gap-2">
              <MinimapItem stack={map.brecilien} itemName="brecilien" />
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
