import { useSelector, useDispatch } from "react-redux";
import { useState } from "react";
import { clearCart } from "../redux/cartSlice";
import { validateForm } from "../utils/validation";
import { useError } from "../context/ErrorContext";
import { Link } from "react-router-dom";
import CartSummary from "../components/CartSummary";
import InputField from "../components/ui/InputField";

export default function Checkout() {
  const cartItems = useSelector((state) => state.cart.items);
  const cartTotal = cartItems.reduce(
    (acc, item) => acc + item.price * item.quantity,
    0,
  );
  const dispatch = useDispatch();
  const { setError: setGlobalError } = useError();

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

  const formFieldsArr = [
    {
      id: 1,
      name: "fullName",
      placeholder: "Full Name",
      label: "Full Name",
    },
    {
      id: 2,
      name: "email",
      placeholder: "Email",
      type: "email",
      label: "Email",
    },
    {
      id: 3,
      name: "phone",
      placeholder: "Phone Number",
      label: "Phone Number",
    },
    {
      id: 4,
      name: "address",
      placeholder: "Street Address",
      label: "Address",
    },
    { id: 5, name: "city", placeholder: "City", label: "City" },
    { id: 6, name: "state", placeholder: "State", label: "State" },
    { id: 7, name: "zip", placeholder: "ZIP Code", label: "ZIP Code" },
  ];

  const [errors, setErrors] = useState({});
  const [submitting, setSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);

  const handleChange = (e) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const validationErrors = validateForm(formData);
      setErrors(validationErrors);
      if (Object.keys(validationErrors).length > 0) return;

      setSubmitting(true);

      await new Promise((resolve) => setTimeout(resolve, 1500));

      let existingOrders = [];
      try {
        existingOrders = JSON.parse(localStorage.getItem("orders")) || [];
      } catch (err) {
        console.warn("Failed to parse orders from localStorage", err);
        existingOrders = [];
      }

      const newOrder = {
        id: Date.now(),
        items: cartItems,
        total: cartTotal,
        date: new Date().toISOString(),
      };

      try {
        localStorage.setItem(
          "orders",
          JSON.stringify([newOrder, ...existingOrders]),
        );
      } catch (err) {
        console.error("Failed to save order to localStorage", err);
        throw new Error("Could not save order. Please try again.");
      }

      dispatch(clearCart());
      setSuccess(true);
    } catch (err) {
      console.error(err);
      setGlobalError(err);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="p-6 flex flex-col md:flex-row gap-6">
      <CartSummary cartItems={cartItems} cartTotal={cartTotal} />

      <div className="md:w-1/2 border p-4 rounded shadow">
        <h2 className="text-xl font-bold mb-4">Checkout Details</h2>

        {success ? (
          <div className="p-4 bg-green-100 text-green-700 rounded shadow">
            <h3 className="font-bold text-lg mb-2">Order Successful!</h3>
            <p>Thank you for your purchase. Your order has been placed.</p>
            <Link to="/orders">
              <span>
                <u>View Orders</u>
              </span>
            </Link>
          </div>
        ) : (
          <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
            {formFieldsArr.map((field) => (
              <div key={field.id}>
                <InputField
                  key={field.name}
                  {...field}
                  value={formData[field.name]}
                  onChange={handleChange}
                  error={errors[field.name]}
                />
                {errors[name] && (
                  <p className="text-red-500 text-sm mt-1">{errors[name]}</p>
                )}
              </div>
            ))}

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
                <InputField
                  name="cardExpiry"
                  placeholder="MM/YY"
                  value={formData.cardExpiry}
                  onChange={handleChange}
                  error={errors.cardExpiry}
                />
              </div>
              <div className="flex-1">
                <InputField
                  name="cardCVV"
                  placeholder="CVV"
                  value={formData.cardCVV}
                  onChange={handleChange}
                  error={errors.cardCVV}
                />
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
