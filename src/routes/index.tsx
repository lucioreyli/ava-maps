import { MapItem } from '@/components/map-item.tsx';
import { Input } from '@/components/ui/input.tsx';
import { maps } from '@/constants/maps';
import { useIsMobile } from '@/hooks/use-is-mobile.ts';
import createFuzzySearch from '@nozbe/microfuzz';
import { useVirtualizer } from '@tanstack/react-virtual';
import React from 'react';
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

  const isMobile = useIsMobile();
  console.log(isMobile);
  const parentRef = React.useRef(null);
  const rowVirtualizer = useVirtualizer({
    count: search.n ? data.length : maps.length,
    getScrollElement: () => parentRef.current,
    estimateSize: () => (isMobile ? 300 : 175),
    overscan: 5,
  });

  return (
    <main className="px-4 md:px-8 space-y-4 overflow-hidden grid h-dvh">
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
      <div
        ref={parentRef}
        style={{ height: '100%', flex: 1, overflow: 'auto', width: '100%' }}
      >
        <div
          style={{
            height: `${rowVirtualizer.getTotalSize()}px`,
            width: '100%',
            position: 'relative',
          }}
        >
          {rowVirtualizer.getVirtualItems().map((virtualItem) => (
            <div
              key={virtualItem.key}
              className="absolute inset-0 w-full"
              style={{
                height: `${virtualItem.size}px`,
                transform: `translateY(${virtualItem.start}px)`,
              }}
            >
              <MapItem
                map={
                  search.n
                    ? data[virtualItem.index]?.item
                    : maps[virtualItem.index]
                }
              />
            </div>
          ))}
        </div>
      </div>
    </main>
  );
}
