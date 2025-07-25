import { Badge } from './ui/badge';

export const MinimapItem = ({
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
