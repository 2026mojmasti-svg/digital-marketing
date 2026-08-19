export function ProductGridSkeleton() {
  return (
    <ul className="grid grid-cols-2 gap-x-5 gap-y-10 md:grid-cols-3" aria-hidden="true">
      {Array.from({ length: 6 }).map((_, i) => (
        <li key={i} className="animate-pulse">
          <div className="aspect-[4/5] bg-bone-dim" />
          <div className="mt-3 h-4 w-3/4 bg-bone-dim" />
          <div className="mt-2 h-3 w-1/3 bg-bone-dim" />
        </li>
      ))}
    </ul>
  );
}
