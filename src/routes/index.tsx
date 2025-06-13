import { maps } from '@/constants/maps';
import { Input } from '@/components/ui/input.tsx';
import React from 'react';
import createFuzzySearch from '@nozbe/microfuzz';
import { MapItem } from '@/components/map-item.tsx';
import { object, string } from 'zod';

export const Route = createFileRoute({
  component: RouteComponent,
  validateSearch: object({ n: string().optional().catch('') }),
});

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
    <main className="p-4 md:p-8 space-y-4">
      <h1 className="scroll-m-20 text-center text-4xl font-extrabold tracking-tight text-balance">
        Avalon Maps
      </h1>
      <div className="flex gap-1.5">
        <Input
          placeholder="Search avalon name..."
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

      <div className="max-h-screen space-y-2">
        {search.n !== ''
          ? data.map(({ item: map }) => <MapItem map={map} key={map.name} />)
          : maps.map((map) => <MapItem map={map} key={map.name} />)}
      </div>
    </main>
  );
}
