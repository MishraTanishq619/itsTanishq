// Endless horizontal ticker. The list is rendered twice and shifted by -50% for a seamless loop.
// `repeat` lengthens each copy so short lists still overflow their container (no gap in the loop).
// Edges fade out with a mask. Stops under reduced motion (global CSS).
export function Marquee({
  items,
  repeat = 1,
  className = "",
}: {
  items: readonly string[];
  repeat?: number;
  className?: string;
}) {
  const text = Array.from({ length: repeat }, () => items.join(", ")).join(", ") + ", ";
  return (
    <div
      className={`overflow-hidden [mask-image:linear-gradient(to_right,transparent,black_8%,black_92%,transparent)] ${className}`}
    >
      <span className="sr-only">{items.join(", ")}</span>
      <div aria-hidden="true" className="flex w-max animate-marquee whitespace-nowrap">
        <span className="pr-[0.5ch]">{text}</span>
        <span className="pr-[0.5ch]">{text}</span>
      </div>
    </div>
  );
}
