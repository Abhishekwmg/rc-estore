import { useSelector, useDispatch } from "react-redux";
import { addToCart, removeFromCart } from "../redux/cartSlice";
import { Link } from "react-router-dom";

export default function Cart() {
  const cartItems = useSelector((state) => state.cart.items);
  const dispatch = useDispatch();

  // Total price calculation
  const totalPrice = cartItems.reduce(
    (acc, item) => acc + item.price * item.quantity,
    0,
  );

  const handleIncrease = (item) => {
    dispatch(addToCart({ ...item, id: item.productId })); // reuse addToCart logic
  };

  const handleDecrease = (item) => {
    if (item.quantity === 1) {
      dispatch(removeFromCart(item.productId));
    } else {
      dispatch(
        addToCart({ ...item, id: item.productId, quantity: -1 }), // adjust logic in slice
      );
    }
  };

  if (!cartItems.length)
    return (
      <div className="p-6 text-center">
        <h2 className="text-xl font-bold mb-2">Your cart is empty</h2>
        <p>Start shopping to add products to your cart!</p>
      </div>
    );

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-4">Your Cart</h2>
      <div className="space-y-4">
        {cartItems.map((item) => (
          <div
            key={item.productId}
            className="flex items-center justify-between p-4 border rounded shadow"
          >
            <div className="flex items-center space-x-4">
              <img
                src={item.thumbnail}
                alt={item.title}
                className="w-20 h-20 object-cover rounded"
              />
              <div>
                <h3 className="font-bold">{item.title}</h3>
                <p>${item.price} each</p>
              </div>
            </div>

            <div className="flex items-center space-x-2">
              <button
                onClick={() => handleDecrease(item)}
                className="px-2 py-1 bg-gray-200 rounded"
              >
                -
              </button>
              <span>{item.quantity}</span>
              <button
                onClick={() => handleIncrease(item)}
                className="px-2 py-1 bg-gray-200 rounded"
              >
                +
              </button>
            </div>

            <div className="font-bold">
              ${(item.price * item.quantity).toFixed(2)}
            </div>
          </div>
        ))}
      </div>

      {/* Total */}
      <div className="mt-6 text-right text-xl font-bold">
        Total: ${totalPrice.toFixed(2)}
      </div>

      {/* Checkout Button */}
      <div className="mt-4 text-right">
        <Link
          to="/checkout"
          className="px-4 py-2 bg-indigo-500 text-white rounded hover:bg-indigo-600 transition"
        >
          Proceed to Checkout
        </Link>
      </div>
    </div>
  );
}
