import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { useProducts } from "../hooks/useProducts";
import ProductCard from "../components/ProductCard";
import ProductSkeleton from "../components/ProductSkeleton";

export default function Products() {
  const { products, loading, error, fetchAllProducts, search } = useProducts();
  const location = useLocation();

  // Read initial query from URL
  const params = new URLSearchParams(location.search);
  const initialQuery = params.get("search") || "";

  // Local state for input field
  const [searchQuery, setSearchQuery] = useState(initialQuery);

  // Debounce timer state
  const [debounceTimer, setDebounceTimer] = useState(null);

  // Fetch all products on initial load if no query
  useEffect(() => {
    if (!initialQuery) fetchAllProducts();
  }, [initialQuery, fetchAllProducts]);

  // Debounced search effect
  useEffect(() => {
    if (debounceTimer) clearTimeout(debounceTimer);

    const timer = setTimeout(() => {
      if (searchQuery.trim()) search(searchQuery);
      else fetchAllProducts();
    }, 500); // 500ms debounce

    setDebounceTimer(timer);

    // Cleanup on unmount or when searchQuery changes
    return () => clearTimeout(timer);
  }, [searchQuery, search, fetchAllProducts]);

  return (
    <div className="p-6">
      {/* Search Bar */}
      <input
        type="text"
        placeholder="Search products..."
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
        className="mb-6 w-full p-2 border rounded"
      />

      {/* Loading / Error / Empty States */}
      {/* {loading && <p>Loading products...</p>} */}
      {loading && (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {Array.from({ length: 8 }).map((_, idx) => (
            <ProductSkeleton key={idx} />
          ))}
        </div>
      )}

      {error && <p>Error: {error}</p>}
      {!loading && !products.length && <p>No products found.</p>}

      {/* Product Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {products.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </div>
  );
}
