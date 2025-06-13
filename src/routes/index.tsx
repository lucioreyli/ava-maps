import { maps } from '@/constants/maps';
import { Input } from '@/components/ui/input.tsx';
import React from 'react';
import createFuzzySearch from '@nozbe/microfuzz';
import { MapItem } from '@/components/map-item.tsx';
import { object, string } from 'zod';
import { FixedSizeList as List } from 'react-window';
import type { AvaMap } from '@/types.ts';

export const Route = createFileRoute({
  component: RouteComponent,
  validateSearch: object({ n: string().optional().catch('') }),
});

const Row = ({
  index,
  style,
  data,
}: { index: number; data: AvaMap[] } & React.ComponentProps<'div'>) => (
  <div style={style}>
    <MapItem map={data[index]} />
  </div>
);

function RouteComponent() {
  const search = Route.useSearch();
  const navigate = Route.useNavigate();
  const timer = React.useRef<number>(null);
  const searcher = React.useMemo(
    () => createFuzzySearch(maps, { key: 'name', strategy: 'aggressive' }),
    [],
  );
  const data = React.useMemo(
    () => searcher(search.n || ''),
    [search, searcher],
  );

  return (
    <main className="p-4 md:p-8 space-y-4 grid justify-center overflow-hidden h-dvh">
      <h1 className="scroll-m-20 text-center text-4xl font-extrabold tracking-tight text-balance">
        Avalon Maps
      </h1>
      <div className="flex gap-1.5">
        <Input
          placeholder="Search avalon name..."
          defaultValue={search.n}
          onChange={(e) => {
            if (timer.current) clearTimeout(timer.current);
            const txt = e.target.value;
            timer.current = setTimeout(
              () => navigate({ to: '.', search: { n: txt } }),
              txt === '' ? 0 : 200,
            );
          }}
        />
      </div>
      {search.n && !data.length && (
        <p className="text-center text-sm text-muted-foreground">
          No results for "{search.n}".
        </p>
      )}
      <List
        width="90vw"
        itemCount={search.n !== '' ? data.length : maps.length}
        itemSize={175}
        height={550}
        itemData={search.n !== '' ? data.map((i) => i.item) : maps}
      >
        {Row}
      </List>
    </main>
  );
}
