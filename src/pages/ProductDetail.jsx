import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useProducts } from "../hooks/useProducts";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { addToCart } from "../redux/cartSlice";

export default function ProductDetail() {
  const { id } = useParams();
  const { fetchProductById } = useProducts();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const dispatch = useDispatch();
  const { user } = useAuth();
  const navigate = useNavigate();

  const handleAddToCart = () => {
    if (!user) {
      navigate("/login");
      return;
    }
    dispatch(addToCart(product));
    alert("Product added to cart!");
  };

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      setError(null);
      try {
        const data = await fetchProductById(id);
        setProduct(data);
      } catch (err) {
        setError(err.message || "Failed to fetch product");
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [id, fetchProductById]);

  if (loading) return <p className="p-6">Loading product...</p>;
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
        <p className="text-gray-700 dark:text-gray-300">
          {product.description}
        </p>
        <p className="text-xl font-semibold">${product.price}</p>

        <button
          className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition"
          onClick={handleAddToCart}
        >
          Add to Cart
        </button>
      </div>
    </div>
  );
}
