// src/pages/Checkout.jsx
import { useSelector, useDispatch } from "react-redux";
import { useState } from "react";
import { clearCart } from "../redux/cartSlice";
import { validateForm } from "../utils/validation";

export default function Checkout() {
  const cartItems = useSelector((state) => state.cart.items);
  const cartTotal = cartItems.reduce(
    (acc, item) => acc + item.price * item.quantity,
    0,
  );
  const dispatch = useDispatch();

  // Form state
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phone: "",
    address: "",
    city: "",
    state: "",
    zip: "",
    cardNumber: "",
    cardExpiry: "",
    cardCVV: "",
  });

  const [errors, setErrors] = useState({});
  const [submitting, setSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);

  // Validate form fields

  const handleChange = (e) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  // const handleSubmit = async (e) => {
  //   e.preventDefault();

  //   if (!validate()) return;
  //   setSubmitting(true);

  //   // Mock order processing
  //   setTimeout(() => {
  //     setSubmitting(false);
  //     setSuccess(true);
  //     dispatch(clearCart()); // Clear cart after successful order
  //   }, 1500);
  //   // Get existing orders from localStorage
  //   const existingOrders = JSON.parse(localStorage.getItem("orders")) || [];

  //   // Create new order
  //   const newOrder = {
  //     id: Date.now(),
  //     items: cartItems,
  //     total: cartTotal,
  //     date: new Date().toISOString(),
  //   };

  //   // Save updated orders array
  //   localStorage.setItem(
  //     "orders",
  //     JSON.stringify([newOrder, ...existingOrders]),
  //   );
  // };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Use the utility for validation
    const validationErrors = validateForm(formData);
    setErrors(validationErrors);

    // Stop submission if there are errors
    if (Object.keys(validationErrors).length > 0) return;

    setSubmitting(true);

    // Mock order processing
    setTimeout(() => {
      setSubmitting(false);
      setSuccess(true);
      dispatch(clearCart()); // Clear cart after successful order
    }, 1500);

    // Get existing orders from localStorage
    const existingOrders = JSON.parse(localStorage.getItem("orders")) || [];

    // Create new order
    const newOrder = {
      id: Date.now(),
      items: cartItems,
      total: cartTotal,
      date: new Date().toISOString(),
    };

    // Save updated orders array
    localStorage.setItem(
      "orders",
      JSON.stringify([newOrder, ...existingOrders]),
    );
  };

  return (
    <div className="p-6 flex flex-col md:flex-row gap-6">
      {/* LEFT: Cart Summary */}
      <div className="md:w-1/2 border p-4 rounded shadow">
        <h2 className="text-xl font-bold mb-4">Your Cart</h2>
        {cartItems.length === 0 ? (
          <p>Your cart is empty.</p>
        ) : (
          <ul className="space-y-4">
            {cartItems.map((item) => (
              <li
                key={item.productId}
                className="flex justify-between items-center border-b pb-2"
              >
                <div>
                  <p className="font-semibold">{item.title}</p>
                  <p className="text-sm text-gray-500">
                    Quantity: {item.quantity}
                  </p>
                </div>
                <p>${(item.price * item.quantity).toFixed(2)}</p>
              </li>
            ))}
          </ul>
        )}
        {cartItems.length > 0 && (
          <div className="mt-4 font-bold text-lg flex justify-between">
            <span>Total:</span>
            <span>${cartTotal.toFixed(2)}</span>
          </div>
        )}
      </div>

      {/* RIGHT: Checkout Form */}
      <div className="md:w-1/2 border p-4 rounded shadow">
        <h2 className="text-xl font-bold mb-4">Checkout Details</h2>

        {success ? (
          <div className="p-4 bg-green-100 text-green-700 rounded shadow">
            <h3 className="font-bold text-lg mb-2">Order Successful!</h3>
            <p>Thank you for your purchase. Your order has been placed.</p>
          </div>
        ) : (
          <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
            {/* Customer Info */}
            {[
              { name: "fullName", placeholder: "Full Name" },
              { name: "email", placeholder: "Email", type: "email" },
              { name: "phone", placeholder: "Phone Number" },
              { name: "address", placeholder: "Street Address" },
              { name: "city", placeholder: "City" },
              { name: "state", placeholder: "State" },
              { name: "zip", placeholder: "ZIP Code" },
            ].map(({ name, placeholder, type }) => (
              <div key={name}>
                <input
                  name={name}
                  type={type || "text"}
                  placeholder={placeholder}
                  value={formData[name]}
                  onChange={handleChange}
                  className="p-2 border rounded w-full"
                />
                {errors[name] && (
                  <p className="text-red-500 text-sm mt-1">{errors[name]}</p>
                )}
              </div>
            ))}

            {/* Payment Info */}
            <h3 className="font-semibold mt-4">Payment Information</h3>
            <div>
              <input
                name="cardNumber"
                type="text"
                placeholder="Card Number (16 digits)"
                value={formData.cardNumber}
                onChange={handleChange}
                className="p-2 border rounded w-full"
              />
              {errors.cardNumber && (
                <p className="text-red-500 text-sm mt-1">{errors.cardNumber}</p>
              )}
            </div>

            <div className="flex gap-2">
              <div className="flex-1">
                <input
                  name="cardExpiry"
                  type="text"
                  placeholder="MM/YY"
                  value={formData.cardExpiry}
                  onChange={handleChange}
                  className="p-2 border rounded w-full"
                />
                {errors.cardExpiry && (
                  <p className="text-red-500 text-sm mt-1">
                    {errors.cardExpiry}
                  </p>
                )}
              </div>
              <div className="flex-1">
                <input
                  name="cardCVV"
                  type="text"
                  placeholder="CVV"
                  value={formData.cardCVV}
                  onChange={handleChange}
                  className="p-2 border rounded w-full"
                />
                {errors.cardCVV && (
                  <p className="text-red-500 text-sm mt-1">{errors.cardCVV}</p>
                )}
              </div>
            </div>

            <button
              type="submit"
              disabled={submitting || cartItems.length === 0}
              className={`mt-2 px-4 py-2 rounded text-white ${
                submitting
                  ? "bg-gray-400 cursor-not-allowed"
                  : "bg-indigo-500 hover:bg-indigo-600"
              }`}
            >
              {submitting ? "Processing Payment..." : "Place Order"}
            </button>
          </form>
        )}
      </div>
    </div>
  );
}
