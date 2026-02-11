export default function ProductSkeleton() {
  return (
    <div className="border rounded p-4 shadow animate-pulse">
      <div className="bg-[var(--card-bg)]  w-full h-40 mb-4 rounded"></div>
      <div className="bg-[var(--card-bg)] h-4 w-3/4 mb-2 rounded"></div>
      <div className="bg-[var(--card-bg)] h-4 w-1/4 rounded"></div>
    </div>
  );
}
