// src/api/products.js
const BASE_URL = "https://dummyjson.com/products";

/**
 * Fetch all products
 */
export const fetchProducts = async () => {
  try {
    const response = await fetch(`${BASE_URL}?limit=100`);
    if (!response.ok) throw new Error("Failed to fetch products");
    const data = await response.json();
    return data.products; // array of products
  } catch (error) {
    console.error("fetchProducts error:", error);
    throw error;
  }
};

/**
 * Fetch single product by ID
 */
export const fetchProductById = async (id) => {
  try {
    const response = await fetch(`${BASE_URL}/${id}`);
    if (!response.ok) throw new Error("Failed to fetch product");
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("fetchProductById error:", error);
    throw error;
  }
};

/**
 * Search products by query
 */
export const searchProducts = async (query) => {
  try {
    if (!query) return fetchProducts(); // if query empty, return all products
    const response = await fetch(
      `${BASE_URL}/search?q=${encodeURIComponent(query)}`,
    );
    if (!response.ok) throw new Error("Failed to search products");
    const data = await response.json();
    return data.products || []; // always return an array
  } catch (error) {
    console.error("searchProducts error:", error);
    return []; // return empty array on error
  }
};

/**
 * Fetch all categories (for filters)
 */
export const fetchCategories = async () => {
  try {
    const response = await fetch(`${BASE_URL}/categories`);
    if (!response.ok) throw new Error("Failed to fetch categories");
    const data = await response.json();
    return data; // array of category strings
  } catch (error) {
    console.error("fetchCategories error:", error);
    return [];
  }
};
