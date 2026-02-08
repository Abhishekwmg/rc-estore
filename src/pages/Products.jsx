// src/pages/Products.jsx
import { useEffect, useState, useMemo } from "react";
import ProductCard from "../components/ProductCard";
import { useProducts } from "../hooks/useProducts";
import { fetchCategories } from "../api/products";

export default function Products() {
  const { products, loading, error, fetchAllProducts, search } = useProducts();

  const [searchQuery, setSearchQuery] = useState("");
  const [categories, setCategories] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const PRODUCTS_PER_PAGE = 12;
  const [selectedCategory, setSelectedCategory] = useState("");
  const [selectedPriceOrder, setSelectedPriceOrder] = useState(""); // "asc" or "desc"

  // Fetch products on mount
  useEffect(() => {
    fetchAllProducts();
  }, [fetchAllProducts]);

  // Fetch categories on mount
  useEffect(() => {
    const loadCategories = async () => {
      try {
        const data = await fetchCategories();
        setCategories(data);
      } catch (err) {
        console.error("Failed to fetch categories", err);
      }
    };
    loadCategories();
  }, []);

  const handleSearch = async () => {
    if (!searchQuery.trim()) {
      fetchAllProducts();
    } else {
      await search(searchQuery.trim());
    }
    setCurrentPage(1);
  };

  // Filtered products based on category
  // Apply filters
  const filteredProducts = products
    .filter((p) => (selectedCategory ? p.category === selectedCategory : true))
    .sort((a, b) => {
      if (selectedPriceOrder === "asc") return a.price - b.price;
      if (selectedPriceOrder === "desc") return b.price - a.price;
      return 0; // default, no sorting
    });

  // Apply pagination
  const indexOfLast = currentPage * PRODUCTS_PER_PAGE;
  const indexOfFirst = indexOfLast - PRODUCTS_PER_PAGE;
  const currentProducts = filteredProducts.slice(indexOfFirst, indexOfLast);

  // Paginated products
  const paginatedProducts = useMemo(() => {
    const start = (currentPage - 1) * PRODUCTS_PER_PAGE;
    return filteredProducts.slice(start, start + PRODUCTS_PER_PAGE);
  }, [filteredProducts, currentPage]);

  const totalPages = Math.ceil(filteredProducts.length / PRODUCTS_PER_PAGE);

  return (
    <div className="p-6">
      {/* Top: Search Bar */}
      <div className="mb-6 flex">
        <input
          type="text"
          placeholder="Search products..."
          className="flex-1 p-2 border rounded"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              e.preventDefault();
              handleSearch();
            }
          }}
        />
        <button
          onClick={handleSearch}
          className="ml-2 px-4 py-2 bg-indigo-500 text-white rounded"
        >
          Search
        </button>
      </div>

      {/* Bottom Section */}
      <div className="flex gap-6">
        {/* LEFT: Filters */}
        {/* <div className="w-1/4 p-4 border rounded">
          <h2 className="font-bold mb-4">Categories</h2>
          {categories.length === 0 ? (
            <p>Loading filters...</p>
          ) : (
            categories.map((cat) => (
              <button
                key={cat}
                className={`block w-full text-left mb-2 px-2 py-1 rounded ${
                  selectedCategory === cat
                    ? "bg-indigo-500 text-white"
                    : "bg-gray-200 text-gray-800"
                }`}
                onClick={() => {
                  setSelectedCategory(cat);
                  setCurrentPage(1);
                }}
              >
                {cat}
              </button>
            ))
          )}
        </div> */}
        {/* <div className="w-1/4 p-4 border rounded">
          <h2 className="font-bold mb-4">Categories</h2>
          {categories.length === 0 ? (
            <p>Loading filters...</p>
          ) : (
            categories.map((cat) => (
              <button
                key={cat.slug}
                className={`block w-full text-left mb-2 px-2 py-1 rounded ${
                  selectedCategory === cat.slug
                    ? "bg-indigo-500 text-white"
                    : "bg-gray-200 text-gray-800"
                }`}
                onClick={() => {
                  setSelectedCategory(cat.slug);
                  setCurrentPage(1);
                }}
              >
                {cat.name}
              </button>
            ))
          )}
        </div> */}
        <div className="w-1/4 p-4 border rounded space-y-4">
          <h2 className="font-bold mb-2">Filters</h2>

          {/* CATEGORY FILTER */}
          <div>
            <label className="block font-medium mb-1">Category</label>
            <select
              value={selectedCategory}
              onChange={(e) => {
                setSelectedCategory(e.target.value);
                setCurrentPage(1);
              }}
              className="w-full p-2 border rounded"
            >
              <option value="">All Categories</option>
              {categories.slice(0, 6).map((cat) => (
                <option key={cat.slug} value={cat.slug}>
                  {cat.name}
                </option>
              ))}
            </select>
          </div>

          {/* PRICE FILTER */}
          <div>
            <label className="block font-medium mb-1">Price</label>
            <select
              value={selectedPriceOrder}
              onChange={(e) => {
                setSelectedPriceOrder(e.target.value);
                setCurrentPage(1);
              }}
              className="w-full p-2 border rounded"
            >
              <option value="">Default</option>
              <option value="asc">Low to High</option>
              <option value="desc">High to Low</option>
            </select>
          </div>
        </div>

        {/* RIGHT: Product Grid + Pagination */}
        <div className="w-3/4">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {loading
              ? Array.from({ length: 6 }).map((_, idx) => (
                  <div
                    key={idx}
                    className="h-64 bg-gray-200 animate-pulse rounded"
                  ></div>
                ))
              : paginatedProducts.length > 0
                ? paginatedProducts.map((product) => (
                    <ProductCard key={product.id} product={product} />
                  ))
                : !loading && <p>No products found.</p>}
          </div>

          {/* Pagination Controls */}
          {totalPages > 1 && (
            <div className="mt-6 flex justify-end space-x-2">
              {Array.from({ length: totalPages }).map((_, idx) => {
                const page = idx + 1;
                return (
                  <button
                    key={page}
                    className={`px-3 py-1 rounded ${
                      page === currentPage
                        ? "bg-indigo-500 text-white"
                        : "bg-gray-200 text-gray-800"
                    }`}
                    onClick={() => setCurrentPage(page)}
                  >
                    {page}
                  </button>
                );
              })}
            </div>
          )}
        </div>
      </div>

      {error && <p className="text-red-500 mt-4">{error}</p>}
    </div>
  );
}
