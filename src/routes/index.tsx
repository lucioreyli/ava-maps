import { createFuzzySearch } from '@mmmike/mikrofuzz';
import { useVirtualizer } from '@tanstack/react-virtual';
import { useMemo, useRef } from 'react';
import { useSearchParams } from 'react-router';
import { MapItem } from '@/components/map-item';
import { SearchMap } from '@/components/search-map';
import d from '@/constants/maps.json';
import { useIsMobile } from '@/hooks/use-is-mobile';
import type { AvaMap } from '@/types';

const maps = d as unknown as AvaMap[];

export function RootPage() {
  const [sp] = useSearchParams();
  const term = sp.get('s') ?? '';
  const searcher = useMemo(
    () => createFuzzySearch(maps, { key: 'n', strategy: 'aggressive' }),
    [],
  );
  const data = useMemo(() => searcher(sp.get('s') || ''), [sp, searcher]);

  const isMobile = useIsMobile();
  const parentRef = useRef(null);
  const rowVirtualizer = useVirtualizer({
    count: term ? data.length : maps.length,
    getScrollElement: () => parentRef.current,
    estimateSize: () => (isMobile ? 300 : 160),
    // overscan: 5,
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
      <div ref={parentRef} className="h-full overflow-auto w-full pb-12">
        <div
          style={{ height: `${rowVirtualizer.getTotalSize()}px` }}
          className="w-full relative"
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
