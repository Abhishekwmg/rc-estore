// src/api/products.js

const BASE_URL = "https://dummyjson.com/products";

/**
 * Fetch all products
 */
export const getAllProducts = async () => {
  try {
    const response = await fetch(`${BASE_URL}?limit=100`); // fetch up to 100 products
    if (!response.ok) throw new Error("Failed to fetch products");
    const data = await response.json();
    return data.products; // array of products
  } catch (error) {
    console.error("getAllProducts error:", error);
    throw error;
  }
};

/**
 * Fetch single product by ID
 */
export const getProductById = async (id) => {
  try {
    const response = await fetch(`${BASE_URL}/${id}`);
    if (!response.ok) throw new Error("Failed to fetch product");
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("getProductById error:", error);
    throw error;
  }
};

/**
 * Search products by query
 */
export const searchProducts = async (query) => {
  try {
    if (!query) return getAllProducts(); // if empty query, return all
    const response = await fetch(
      `${BASE_URL}/search?q=${encodeURIComponent(query)}`,
    );
    if (!response.ok) throw new Error("Failed to search products");
    const data = await response.json();
    return data.products; // array of matched products
  } catch (error) {
    console.error("searchProducts error:", error);
    throw error;
  }
};
