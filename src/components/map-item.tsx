import type { AvaMap } from '@/types.ts';
import { cva } from 'class-variance-authority';
import { cn } from '@/lib/utils.ts';
import { Badge } from '@/components/ui/badge.tsx';
import React from 'react';
import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogTrigger,
  DialogDescription,
  DialogHeader,
} from '@/components/ui/dialog.tsx';

const x = cva('', {
  variants: {
    tier: { T4: 'IV', T6: 'VI', T8: 'VIII' } as Record<string, string>,
  },
});

const itemStyle = cva('p-8 border rounded-md flex items-center gap-4', {
  variants: {
    tier: {
      T4: 'bg-indigo-700/20',
      T6: 'bg-orange-700/20',
      T8: 'bg-neutral-700/20',
    } as Record<string, string>,
  },
});

const MinimapItem = ({
  stack,
  itemName,
}: { stack: number; itemName: string }) => (
  <li className="relative">
    <Badge
      data-disabled={stack < 2}
      className="data-[disabled=true]:hidden absolute top-1 right-1 h-5 min-w-5 rounded-full px-1 tabular-nums"
    >
      {stack}
    </Badge>
    <img
      src={`./assets/${itemName}.webp`}
      alt={itemName}
      aria-label={itemName}
      data-disabled={!stack}
      className="data-[disabled=true]:grayscale-100 data-[disabled=true]:opacity-50 size-12 aspect-square"
    />
  </li>
);

export const MapItem = ({
  map,
  style,
}: { map: AvaMap } & Pick<React.ComponentProps<'div'>, 'style'>) => {
  return (
    <div className={cn(itemStyle({ tier: map.tier }))} style={style}>
      <Dialog>
        <DialogTrigger>
          <span className="font-medium">
            {map.name} ({x({ tier: map.tier })})
          </span>
        </DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>{map.name}</DialogTitle>
            <img
              src={`./maps/${map.name.toLowerCase()}.png`}
              alt="map"
              className="size-96 aspect-square"
            />
          </DialogHeader>
        </DialogContent>
      </Dialog>
      <div className="ml-auto inline-flex gap-1.5">
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
      </div>
    </div>
  );
};
