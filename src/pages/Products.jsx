import { useEffect, useState, useMemo, useRef, useCallback } from "react";
import ProductCard from "../components/ProductCard";
import { useProducts } from "../hooks/useProducts";
import { fetchCategories } from "../api/products";
import InputField from "../components/ui/InputField";
import Button from "../components/ui/Button";
import Select from "../components/ui/Select";
import Alert from "../components/ui/Alert";
import { useError } from "../context/ErrorContext";
import {PRODUCTS_PER_PAGE} from '../utils/constants'

export default function Products() {
  const { products, loading, error, fetchAllProducts, search } = useProducts();
  const { setError: setGlobalError } = useError();

  const [searchQuery, setSearchQuery] = useState("");
  const [categories, setCategories] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedCategory, setSelectedCategory] = useState("");
  const [selectedPriceOrder, setSelectedPriceOrder] = useState("");

  const searchInputRef = useRef(null);

  useEffect(() => {
    fetchAllProducts().catch(setGlobalError);
  }, [fetchAllProducts, setGlobalError]);

  useEffect(() => {
    const loadCategories = async () => {
      try {
        const data = await fetchCategories();
        setCategories(data);
      } catch (err) {
        setGlobalError(err);
      }
    };
    loadCategories();
  }, [setGlobalError]);

  const handleSearch = useCallback(async () => {
    setCurrentPage(1);
    if (!searchQuery.trim()) {
      await fetchAllProducts();
    } else {
      await search(searchQuery.trim());
    }
  }, [searchQuery, fetchAllProducts, search]);

  useEffect(() => {
    const handler = setTimeout(() => {
      if (searchQuery.trim() !== "") {
        handleSearch();
      } else {
        fetchAllProducts().catch(setGlobalError);
      }
    }, 500);

    return () => clearTimeout(handler);
  }, [searchQuery, handleSearch, fetchAllProducts, setGlobalError]);

  const filteredProducts = useMemo(() => {
    return products
      .filter((p) =>
        selectedCategory ? p.category === selectedCategory : true,
      )
      .sort((a, b) => {
        if (selectedPriceOrder === "asc") return a.price - b.price;
        if (selectedPriceOrder === "desc") return b.price - a.price;
        return 0;
      });
  }, [products, selectedCategory, selectedPriceOrder]);

  const totalPages = useMemo(
    () => Math.ceil(filteredProducts.length / PRODUCTS_PER_PAGE),
    [filteredProducts.length],
  );

  const paginatedProducts = useMemo(() => {
    const start = (currentPage - 1) * PRODUCTS_PER_PAGE;
    return filteredProducts.slice(start, start + PRODUCTS_PER_PAGE);
  }, [filteredProducts, currentPage]);

  return (
    <div className="p-4 sm:p-6 lg:p-8">
      <div className="flex flex-wrap justify-between items-center gap-4 mb-6">
        <div className="flex flex-1 min-w-[200px] max-w-xl gap-2">
          <InputField
            ref={searchInputRef}
            type="text"
            placeholder="Search products..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          <Button
            onClick={handleSearch}
            className="px-3 py-1 sm:px-4 sm:py-2 text-sm flex-shrink-0"
          >
            Search
          </Button>
        </div>

        <div className="flex gap-2 flex-wrap">
          <Select
            label="Category"
            value={selectedCategory}
            onChange={(e) => {
              setSelectedCategory(e.target.value);
              setCurrentPage(1);
            }}
            className="min-w-[140px] px-2 py-1 text-sm"
          >
            <option value="">All Categories</option>
            {categories.slice(0, 6).map((cat) => (
              <option key={cat.slug} value={cat.slug}>
                {cat.name}
              </option>
            ))}
          </Select>

          <Select
            label="Price"
            value={selectedPriceOrder}
            onChange={(e) => {
              setSelectedPriceOrder(e.target.value);
              setCurrentPage(1);
            }}
            className="min-w-[140px] px-2 py-1 text-sm"
          >
            <option value="">Default</option>
            <option value="asc">Low to High</option>
            <option value="desc">High to Low</option>
          </Select>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {loading ? (
          Array.from({ length: 6 }).map((_, idx) => (
            <div key={idx} className="h-64 bg-gray-200 animate-pulse rounded" />
          ))
        ) : paginatedProducts.length > 0 ? (
          paginatedProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))
        ) : (
          <p className="col-span-full text-center text-gray-600">
  We couldn't find any products matching your search. Try a different keyword.
</p>
        )}
      </div>

      {totalPages > 1 && (
        <div className="mt-6 flex justify-center items-center gap-2 flex-wrap">
          <Button
            onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
            disabled={currentPage === 1}
            className={`px-3 py-1 sm:px-4 sm:py-2 ${
              currentPage === 1
                ? "opacity-50 cursor-not-allowed"
                : "hover:bg-indigo-100"
            }`}
          >
            Prev
          </Button>

          <div className="hidden md:flex gap-2">
            {Array.from({ length: totalPages }).map((_, idx) => {
              const page = idx + 1;
              const isActive = page === currentPage;

              return (
                <Button
                  key={page}
                  onClick={() => setCurrentPage(page)}
                  className={`
              px-3 py-1 sm:px-4 sm:py-2
              rounded
              transition
              ${
                isActive
                  ? "bg-indigo-500 text-white shadow-md text-shadow-md text-xl"
                  : "bg-white text-gray-700 hover:bg-indigo-100"
              }
            `}
                >
                  {page}
                </Button>
              );
            })}
          </div>

          <Button
            onClick={() =>
              setCurrentPage((prev) => Math.min(prev + 1, totalPages))
            }
            disabled={currentPage === totalPages}
            className={`px-3 py-1 sm:px-4 sm:py-2 ${
              currentPage === totalPages
                ? "opacity-50 cursor-not-allowed"
                : "hover:bg-indigo-100"
            }`}
          >
            Next
          </Button>
        </div>
      )}

      {error && <Alert type="error" message={error} />}
    </div>
  );
}

