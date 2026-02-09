import { useState, useCallback } from "react";
import {
  fetchProducts,
  searchProducts,
  fetchProductById,
} from "../api/products";
import { useError } from "../context/ErrorContext";

export const useProducts = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const { setError: setGlobalError } = useError();

  const fetchAllProducts = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await fetchProducts();
      setProducts(data);
    } catch (err) {
      const message = err.message || "Failed to fetch products";
      setError(message);  
      setGlobalError(err);
    } finally {
      setLoading(false);
    }
  }, [setGlobalError]);

  const search = useCallback(async (query) => {
    setLoading(true);
    setError(null);
    try {
      const data = await searchProducts(query);
      setProducts(data);
    } catch (err) {
      const message = err.message || "Failed to search products";
      setError(message);
      setGlobalError(err);
    } finally {
      setLoading(false);
    }
  }, [setGlobalError]);

  const fetchProductByIdHook = useCallback(async (id) => {
    setLoading(true);
    setError(null);
    try {
      const data = await fetchProductById(id);
      return data;
    } catch (err) {
      const message = err.message || "Failed to fetch product";
      setError(message);
      setGlobalError(err);
      return null;
    } finally {
      setLoading(false);
    }
  }, [setGlobalError]);

  return {
    products,
    loading,
    error,
    fetchAllProducts,
    search,
    fetchProductById: fetchProductByIdHook,
  };
};
