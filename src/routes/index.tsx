import { MapItem } from '@/components/map-item.tsx';
import { SearchMap } from '@/components/search-map';
import { maps } from '@/constants/maps';
import { useIsMobile } from '@/hooks/use-is-mobile.ts';
import createFuzzySearch from '@nozbe/microfuzz';
import { useVirtualizer } from '@tanstack/react-virtual';
import { useSearchParams } from 'react-router';
import { useMemo, useRef } from 'react';

export function RootPage() {
  const [sp] = useSearchParams();
  const term = sp.get('s') ?? '';
  const searcher = useMemo(
    () => createFuzzySearch(maps, { key: 'name', strategy: 'aggressive' }),
    [],
  );
  const data = useMemo(() => searcher(sp.get('s') || ''), [sp, searcher]);

  const isMobile = useIsMobile();
  const parentRef = useRef(null);
  const rowVirtualizer = useVirtualizer({
    count: term ? data.length : maps.length,
    getScrollElement: () => parentRef.current,
    estimateSize: () => (isMobile ? 300 : 160),
    overscan: 5,
  });

  return (
    <main className="px-4 md:px-8 space-y-4 h-screen grid content-start">
      <h1 className="scroll-m-20 text-center text-4xl font-extrabold tracking-tight text-balance">
        Avalon Maps
      </h1>
      <SearchMap />
      {term && !data.length && (
        <p className="text-center text-sm text-muted-foreground">
          No results for "{term}".
        </p>
      )}
      <div
        ref={parentRef}
        // style={{ height: '100%', flex: 1, overflow: 'auto', width: '100%' }}
        className="h-full overflow-auto w-full pb-12"
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
                  term ? data[virtualItem.index]?.item : maps[virtualItem.index]
                }
              />
            </div>
          ))}
        </div>
      </div>
    </main>
  );
}
