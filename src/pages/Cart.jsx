import { useSelector, useDispatch } from "react-redux";
import {
  incrementQuantity,
  decrementQuantity,
  removeFromCart,
} from "../redux/cartSlice";
import { Link } from "react-router-dom";
import { useError } from "../context/ErrorContext";
import { useMemo, useCallback } from "react";
import { toast } from "react-toastify";

export default function Cart() {
  const cartItems = useSelector((state) => state.cart.items);
  const dispatch = useDispatch();
  const { setError: setGlobalError } = useError();

  const totalPrice = useMemo(
    () => cartItems.reduce((acc, item) => acc + item.price * item.quantity, 0),
    [cartItems]
  );

  const handleIncrease = useCallback(
    (item) => {
      try {
        dispatch(incrementQuantity(item.productId));
      } catch (err) {
        setGlobalError(err);
      }
    },
    [dispatch, setGlobalError]
  );

  const handleDecrease = useCallback(
    (item) => {
      try {
        dispatch(decrementQuantity(item.productId));
      } catch (err) {
        setGlobalError(err);
      }
    },
    [dispatch, setGlobalError]
  );

  const handleRemove = useCallback(
    (item) => {
      try {
        dispatch(removeFromCart(item.productId));
        toast.success("Product removed from cart")
        
      } catch (err) {
        setGlobalError(err);
      }
    },
    [dispatch, setGlobalError]
  );

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
      {/* <div className="space-y-4">
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

            <div className="font-bold">${(item.price * item.quantity).toFixed(2)}</div>

            <button
              onClick={() => handleRemove(item)}
              className="ml-4 px-3 py-1 bg-red-500 text-white rounded hover:bg-red-600 transition"
            >
              Remove
            </button>
          </div>
        ))}
      </div> */}
      <div className="space-y-4">
  {cartItems.map((item) => (
    <div
      key={item.productId}
      className="flex flex-col md:flex-row items-start md:items-center justify-between p-4 border rounded shadow"
    >
      {/* Product Info */}
      <div className="flex items-center space-x-4 w-full md:w-auto">
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

      {/* Quantity Controls */}
      <div className="flex items-center space-x-2 mt-3 md:mt-0">
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

      {/* Total */}
      <div className="font-bold mt-3 md:mt-0">
        ${(item.price * item.quantity).toFixed(2)}
      </div>

      {/* Remove Button */}
      <button
        onClick={() => handleRemove(item)}
        className="mt-3 md:mt-0 ml-0 md:ml-4 px-3 py-1 bg-red-500 text-white rounded hover:bg-red-600 transition"
      >
        Remove
      </button>
    </div>
  ))}
</div>


      <div className="mt-6 text-right text-xl font-bold">
        Total: ${totalPrice.toFixed(2)}
      </div>

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

