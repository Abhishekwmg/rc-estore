import { useEffect, useState, useCallback } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { useAuth } from "../context/AuthContext";
import { addToCart } from "../redux/cartSlice";
import { useError } from "../context/ErrorContext";
import { useProducts } from "../hooks/useProducts";
import { toast } from "react-toastify";
import PageLoader from "../components/PageLoader";

export default function ProductDetail() {
  const { id } = useParams();
  const dispatch = useDispatch();
  const { user } = useAuth();
  const navigate = useNavigate();
  const { setError: setGlobalError } = useError();
  const { fetchProductById } = useProducts();

  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const loadProduct = async () => {
      setLoading(true);
      setError(null);

      try {
        const data = await fetchProductById(id);
        if (!data) {
          throw new Error("Product not found");
        }
        setProduct(data);
      } catch (err) {
        setError(err.message || "Failed to load product");
        setGlobalError(err);
      } finally {
        setLoading(false);
      }
    };

    loadProduct();
  }, [id, fetchProductById, setGlobalError]);

  const handleAddToCart = useCallback(() => {
    if (!user) {
      navigate("/login");
      return;
    }

    dispatch(
      addToCart({
        productId: product.id,
        title: product.title,
        price: product.price,
        thumbnail: product.thumbnail || product.image,
      }),
    );
    toast.success("Product added to cart!");
  }, [dispatch, navigate, product, user]);

  if (loading) return <PageLoader />;
  if (error) return <p className="p-6 text-red-500">{error}</p>;
  if (!product) return <p className="p-6">Product not found</p>;

  return (
    <div className="p-6 flex flex-col md:flex-row gap-6">
      <div className="md:w-1/2">
        <img
          src={product.thumbnail || product.image}
          alt={product.title}
          className="w-full h-auto rounded shadow"
        />
      </div>

      <div className="md:w-1/2 flex flex-col gap-4">
        <h2 className="text-2xl font-bold">{product.title}</h2>
        <p className="text-gray-700 dark:text-black-300">
          {product.description}
        </p>
        <p className="text-xl font-semibold">${product.price}</p>

        <button
          className="self-start px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition"
          onClick={handleAddToCart}
        >
          Add to Cart
        </button>
      </div>
    </div>
  );
}
