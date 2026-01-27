import { useLayoutEffect, useRef } from 'react';
import { useSearchParams } from 'react-router';
import { Input } from './ui/input.tsx';

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

  return (
    <Input
      ref={inputRef}
      defaultValue={sp.get('s') ?? undefined}
      type="search"
      placeholder="Search avalon name..."
      onChange={(e) => {
        const txt = e.target.value;
        setSp(txt ? { s: txt } : {});
      }}
    />
  );
};
