import { ProductGridSkeleton } from "@/components/ProductGridSkeleton";

export default function Loading() {
  return (
    <div className="mx-auto max-w-[1600px] px-5 py-10 md:px-10">
      <div className="mb-8 h-10 w-48 animate-pulse bg-bone-dim" />
      <ProductGridSkeleton />
    </div>
  );
}
