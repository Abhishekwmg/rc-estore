// src/hooks/useProducts.js
import { useState, useCallback } from "react";
import {
  fetchProducts,
  searchProducts,
  fetchProductById,
} from "../api/products";

/**
 * Custom hook to manage products
 */
export const useProducts = () => {
  const [products, setProducts] = useState([]); // array of products
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Fetch all products
  const fetchAllProducts = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await fetchProducts(); // ✅ updated
      setProducts(data);
    } catch (err) {
      setError(err.message || "Failed to fetch products");
    } finally {
      setLoading(false);
    }
  }, []);

  // Search products by query
  const search = useCallback(async (query) => {
    setLoading(true);
    setError(null);
    try {
      const data = await searchProducts(query);
      setProducts(data);
    } catch (err) {
      setError(err.message || "Failed to search products");
    } finally {
      setLoading(false);
    }
  }, []);

  // Fetch single product by id
  const fetchProductByIdHook = useCallback(async (id) => {
    setLoading(true);
    setError(null);
    try {
      const data = await fetchProductById(id); // ✅ updated
      return data;
    } catch (err) {
      setError(err.message || "Failed to fetch product");
      return null;
    } finally {
      setLoading(false);
    }
  }, []);

  return {
    products,
    loading,
    error,
    fetchAllProducts,
    search,
    fetchProductById: fetchProductByIdHook,
  };
};
