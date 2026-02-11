import { useSelector, useDispatch } from "react-redux";
import { removeFromWishlist } from "../redux/wishlistSlice";
import { addToCart } from "../redux/cartSlice";
import { toast } from "react-toastify";
import {Heart} from 'lucide-react';

const Wishlist = () => {
  const dispatch = useDispatch();
  const wishlistItems = useSelector(
    (state) => state.wishlist.items
  );

  console.log(wishlistItems);

  const handleRemove = (id) => {
    dispatch(removeFromWishlist(id));
  };

  const handleMoveToCart = (product) => {
    dispatch(addToCart({ ...product, productId: product.id }));
    dispatch(removeFromWishlist(product.id));
    toast.success("Product moved to cart")

  };

  if (wishlistItems.length === 0) {
    return (
      <div className="text-center py-20">
        <h2 className="text-xl font-semibold">
          Your wishlist is empty ❤️
        </h2>
      </div>
    );
  }

  return (

    <div className="container mx-auto py-10">
  <h1 className="text-2xl font-bold mb-6">My Wishlist</h1>

  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
    {wishlistItems.map((item) => (
      <div
        key={item.id}
        className="relative border rounded-lg p-4 flex flex-col bg-[var(--bg-color)] shadow-sm hover:shadow-md transition"
      >
        <div className="h-40 w-full rounded-md overflow-hidden">
          <img
            src={item.thumbnail}
            alt={item.title}
            className="h-full w-full object-contain"
          />
        </div>

        <div className="mt-3 flex flex-col gap-1">
          <h2 className="font-semibold text-lg truncate">
            {item.title}
          </h2>
          <p className="text-gray-600 font-medium">${item.price}</p>
        </div>

        {/* ACTIONS */}
        <div className="mt-4 flex items-center justify-between gap-2">
          <button
            onClick={() => handleMoveToCart(item)}
            className="flex-1 px-4 py-2 bg-black text-white rounded-md text-sm hover:bg-gray-900 transition"
          >
            Move to Cart
          </button>

          <button
            onClick={() => handleRemove(item.id)}
            className="p-2 rounded-md border hover:bg-gray-100 transition"
            title="Remove from wishlist"
          >
            Remove
          </button>
        </div>
      </div>
    ))}
  </div>
</div>

  );
};

export default Wishlist;
