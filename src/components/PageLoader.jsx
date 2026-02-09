export default function PageLoader() {
  return (
    <div className="p-6 animate-pulse">
      <div className="h-8 bg-gray-300 rounded w-1/3 mb-4"></div>
      <div className="h-64 bg-gray-200 rounded mb-4"></div>
      <div className="space-y-2">
        <div className="h-4 bg-gray-300 rounded w-full"></div>
        <div className="h-4 bg-gray-300 rounded w-5/6"></div>
        <div className="h-4 bg-gray-300 rounded w-4/6"></div>
      </div>
    </div>
  );
}
