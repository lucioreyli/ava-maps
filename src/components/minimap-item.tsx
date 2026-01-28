export const MinimapItem = ({
  stack = 0,
  itemName,
}: {
  stack?: number;
  itemName: string;
}) => (
  <li className="relative">
    <span
      data-disabled={stack < 2}
      className="text-primary-foreground bg-primary text-xs font-medium data-[disabled=true]:hidden absolute top-1 right-1 rounded-full border w-fit min-w-5 h-5 text-center content-center"
    >
      {stack}
    </span>
    <img
      src={`./assets/${itemName}.webp`}
      alt={itemName}
      aria-label={itemName}
      data-disabled={!stack}
      className="data-[disabled=true]:grayscale-100 data-[disabled=true]:opacity-50 size-12 aspect-square"
    />
  </li>
);
