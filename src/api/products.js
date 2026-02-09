import {BASE_URL} from '../utils/constants'

export const fetchProducts = async () => {
  try {
    const response = await fetch(`${BASE_URL}?limit=100`);
    if (!response.ok) throw new Error("Failed to fetch products");
    const data = await response.json();
    return data.products;
  } catch (error) {
    console.error("fetchProducts error:", error);
    throw error;
  }
};

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

export const searchProducts = async (query) => {
  try {
    if (!query) return fetchProducts();
    const response = await fetch(
      `${BASE_URL}/search?q=${encodeURIComponent(query)}`,
    );
    if (!response.ok) throw new Error("Failed to search products");
    const data = await response.json();
    return data.products || [];
  } catch (error) {
    console.error("searchProducts error:", error);
    return [];
  }
};

export const fetchCategories = async () => {
  try {
    const response = await fetch(`${BASE_URL}/categories`);
    if (!response.ok) throw new Error("Failed to fetch categories");
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("fetchCategories error:", error);
    return [];
  }
};
