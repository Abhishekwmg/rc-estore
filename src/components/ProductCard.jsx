// src/components/ProductCard.jsx
import { Link } from "react-router-dom";

export default function ProductCard({ product }) {
  return (
    <div className="border rounded p-4 shadow hover:shadow-lg transition">
      <Link to={`/product/${product.id}`}>
        <img
          src={product.thumbnail || product.image}
          alt={product.title}
          className="w-full h-40 object-cover mb-2"
        />
        <h3 className="font-bold">{product.title}</h3>
        <p className="text-gray-600">${product.price}</p>
      </Link>
    </div>
  );
}
