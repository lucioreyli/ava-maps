import { maps } from '@/constants/maps';
import { Input } from '@/components/ui/input.tsx';
import React from 'react';
import createFuzzySearch from '@nozbe/microfuzz';
import { MapItem } from '@/components/map-item.tsx';

export const Route = createFileRoute({ component: RouteComponent });

function RouteComponent() {
  const search = Route.useSearch();
  const navigate = Route.useNavigate();
  const searcher = React.useMemo(
    () => createFuzzySearch(maps, { key: 'name' }),
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
      <Input
        placeholder="Search avalon name..."
        onChange={(e) => navigate({ to: '.', search: { n: e.target.value } })}
      />
      <div className="max-h-screen space-y-2">
        {data.length
          ? data.map(({ item: map }) => <MapItem map={map} key={map.name} />)
          : maps.map((map) => <MapItem map={map} key={map.name} />)}
      </div>
    </main>
  );
}
