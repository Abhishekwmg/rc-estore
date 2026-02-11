import { useEffect, useState, useCallback } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { useAuth } from "../context/AuthContext";
import { addToCart } from "../redux/cartSlice";
import { useError } from "../context/ErrorContext";
import { useProducts } from "../hooks/useProducts";
import { toast } from "react-toastify";
import PageLoader from "../components/PageLoader";
import { Star, BadgeCheck, CircleUserRound } from "lucide-react";

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

  const handleBuyNow = () => {
    navigate("/checkout");
    dispatch(
      addToCart({
        productId: product.id,
        title: product.title,
        price: product.price,
        thumbnail: product.thumbnail || product.image,
      }),
    );

  };

  if (loading) return <PageLoader />;
  if (error) return <p className="p-6 text-red-500">{error}</p>;
  if (!product) return <p className="p-6">Product not found</p>;

  return (
    <div className="bg-[var(--card-bg)] max-w-6xl mx-auto p-6 grid grid-cols-1 md:grid-cols-2 gap-10 rounded-xl shadow-lg">
      <div className="bg-[var(--card-bg)] rounded-xl p-6 flex items-center justify-center">
        <img
          src={product.thumbnail || product.image}
          alt={product.title}
          className="w-full h-auto object-contain rounded-lg hover:scale-105 transition"
        />
      </div>

      <div className="flex flex-col gap-4">
        <h2 className="text-3xl font-bold text-[-var(--card-text)]">
          {product.title}
        </h2>

        <div className="flex flex-wrap gap-2">
          {product.tags.map((tag) => (
            <span
              key={tag}
              className="px-3 py-1 text-xs bg-blue-100 text-blue-700 rounded-full font-medium"
            >
              {tag[0].toUpperCase() + tag.slice(1)}
            </span>
          ))}
        </div>

        <div className="flex items-center gap-2">
          <span className="text-lg font-semibold">
            {product.rating.toFixed(1)}
          </span>
          <div className="flex">
            {Array.from({ length: Math.floor(product.rating) }).map((_, i) => (
              <Star key={i} size={18} fill="orange" stroke="orange" />
            ))}
          </div>
          <span className="text-sm text-gray-500">
            ({product.reviews.length} reviews)
          </span>
        </div>

        <div className="bg-[-var(--card-text)] border p-4 rounded-xl flex flex-col gap-2">
          <div className="flex items-center gap-3">
            <span className="text-red-500 text-lg font-semibold">
              -{product.discountPercentage}%
            </span>
            <span className="text-3xl font-bold text-[-var(--card-text)]">
              ${product.price}
            </span>
          </div>

          <div className="text-sm text-green-600 flex items-center gap-1">
            <BadgeCheck size={16} />
            {product.availabilityStatus}
          </div>

          <p className="text-sm text-[-var(--card-text)]">
            {product.shippingInformation}
          </p>
          <p className="text-sm text-[-var(--card-text)]">
            {product.warrantyInformation}
          </p>
        </div>

        <p className="text-text-[-var(--card-text)] leading-relaxed">
          {product.description}
        </p>

        <div className="flex gap-4 mt-2">
          <button
            onClick={handleAddToCart}
            className="px-6 py-3 bg-yellow-500 hover:bg-yellow-600 text-black font-semibold rounded-lg shadow"
          >
            Add to Cart
          </button>

          <button
            onClick={handleBuyNow}
            className="px-6 py-3 bg-orange-600 hover:bg-orange-700 text-white font-semibold rounded-lg shadow"
          >
            Buy Now
          </button>
        </div>
      </div>

      {/* REVIEWS SECTION */}
      <div className="md:col-span-2 mt-10 border-t pt-6">
        <h3 className="text-xl font-bold mb-4">Customer Reviews</h3>

        <div className="space-y-4">
          {product.reviews.map((review) => (
            <div key={review.date} className="p-4 border rounded-lg bg-gray-50">
              <div className="flex items-center gap-2 mb-1">
                <CircleUserRound size={20} />
                <p className="font-semibold">{review.reviewerName}</p>
              </div>

              <div className="flex mb-1">
                {Array.from({ length: review.rating }).map((_, i) => (
                  <Star key={i} size={16} fill="orange" stroke="orange" />
                ))}
              </div>

              <p className="text-gray-700 text-sm">{review.comment}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
