import { Link, useNavigate } from "react-router-dom";
import { useError } from "../context/ErrorContext";
import React, { useCallback } from "react";
import { useDispatch } from "react-redux";
import { addToCart } from "../redux/cartSlice";
import { useAuth } from "../context/AuthContext";
import { toast } from "react-toastify";

function ProductCard({ product }) {
  const { setError: setGlobalError } = useError();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { user } = useAuth();

  if (!product) {
    const error = new Error("Product data is missing!");
    console.error(error);
    setGlobalError(error);
    return (
      <div className="border rounded p-4 shadow text-red-500">
        Product data not available
      </div>
    );
  }

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

  return (
    <div
      style={{ backgroundColor: "white" }}
      className="border border-gray-300 rounded-xl p-4  shadow hover:shadow-xl transition flex flex-col justify-between"
    >
      <Link to={`/product/${product.id}`}>
        <img
          src={product.thumbnail || product.image}
          alt={product.title}
          className="w-full h-40 object-contain mb-2"
        />
        <h3 className="font-bold">{product.title}</h3>
        <p className="text-gray-600">${product.price}</p>
      </Link>

      <button
        onClick={handleAddToCart}
        className="mt-2 w-full bg-blue-600 text-white py-1 rounded hover:bg-blue-700 transition"
      >
        Add to Cart
      </button>
    </div>
  );
}

export default React.memo(ProductCard);
