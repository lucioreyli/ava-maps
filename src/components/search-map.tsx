import { useCallback, useLayoutEffect, useRef } from 'react';
import { useSearchParams } from 'react-router';
import { cn } from '@/lib/utils.ts';

export const SearchMap = () => {
  const [sp, setSp] = useSearchParams();
  const inputRef = useRef<HTMLInputElement>(null);

  useLayoutEffect(() => {
    const search = (ev: KeyboardEvent) => {
      if (ev.key === '/' && document.activeElement !== inputRef.current) {
        inputRef.current?.focus();
        ev.preventDefault();
      }
    };
    window.addEventListener('keypress', search);
    return () => window.removeEventListener('keypress', search);
  }, []);

  const handleSearch = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const txt = e.target.value;
      setSp(txt ? { s: txt } : {});
    },
    [setSp],
  );

  return (
    <input
      ref={inputRef}
      defaultValue={sp.get('s') ?? undefined}
      type="search"
      placeholder="Search avalon name..."
      onChange={handleSearch}
      data-slot="input"
      className={cn(
        'placeholder:text-muted-foreground selection:bg-primary selection:text-primary-foreground bg-input/30 border-input flex h-9 w-full min-w-0 rounded-md border px-3 py-1 text-base shadow-xs transition-[color,box-shadow] outline-none md:text-sm',
        'focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px]',
      )}
    />
  );
};
