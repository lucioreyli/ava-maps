/*
Diagnostics:
1. Conversion of type '({ n: string; t: number; l: number; d: string; b?: undefined; } | { n: string; t: number; l: number; b: number; d: string; })[]' to type 'AvaMap[]' may be a mistake because neither type sufficiently overlaps with the other. If this was intentional, convert the expression to 'unknown' first.
     Type '{ n: string; t: number; l: number; d: string; b?: undefined; } | { n: string; t: number; l: number; b: number; d: string; }' is not comparable to type 'AvaMap'.
       Type '{ n: string; t: number; l: number; b: number; d: string; }' is not comparable to type 'AvaMap'.
         Type '{ n: string; t: number; l: number; b: number; d: string; }' is missing the following properties from type 'Record<"cB" | "cG" | "cHG" | "cLG" | "dA" | "dG" | "dS" | "rF" | "rH" | "rO" | "rR" | "rW", number | undefined>': cB, cG, cHG, cLG, and 8 more. [2352]
	* */
export type AvaMap = {
  n: string;
  t: number;
  l: 4 | 6 | 8;
  b?: number;
  d: string;
};
