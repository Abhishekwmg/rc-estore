export default function PageLoader() {
  return (
    <div className="p-6 animate-pulse">
      <div className="flex flex-col md:flex-row gap-8">
        <div className="md:w-1/2">
          <div className="h-80 bg-[var(--input-border)] rounded-xl w-full"></div>
        </div>

        <div className="md:w-1/2 space-y-4">
          <div className="h-8 bg-[var(--input-border)] rounded w-3/4"></div>

          <div className="h-6 bg-[var(--input-border)] rounded w-1/4"></div>

          <div className="space-y-2">
            <div className="h-4 bg-[var(--input-border)] rounded w-full"></div>
            <div className="h-4 bg-[var(--input-border)] rounded w-5/6"></div>
            <div className="h-4 bg-[var(--input-border)] rounded w-4/6"></div>
          </div>

          <div className="h-12 bg-[var(--input-border)] rounded-lg w-1/3 mt-4"></div>
        </div>
      </div>
    </div>
  );
}
