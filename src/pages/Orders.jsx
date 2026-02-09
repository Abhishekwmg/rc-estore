import { useEffect, useState } from "react";
import { useError } from "../context/ErrorContext";

export default function Orders() {
  const [orders, setOrders] = useState([]);
  const { setError: setGlobalError } = useError();

  useEffect(() => {
    try {
      const savedOrders = JSON.parse(localStorage.getItem("orders")) || [];
      setOrders(savedOrders);
    } catch (err) {
      console.error("Failed to load orders from localStorage", err);
      setGlobalError(
        new Error("Failed to load your orders. Please try again."),
      );
    }
  }, [setGlobalError]);

  if (!orders) {
    return <p className="p-6">Loading orders...</p>;
  }

  console.log(orders);

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-6">My Orders</h2>
      {orders.length === 0 ? (
        <p>You have no orders yet.</p>
      ) : (
        <div className="space-y-4">
          {orders.map((order) => (
            <div
              key={order.id || order.date}
              className="border rounded p-4 shadow"
            >
              <div className="flex justify-between">
                <span>Order ID: {order.id}</span>
                <span>Date: {new Date(order.date).toLocaleString()}</span>
              </div>
              <div className="mt-2">
                {order.items.map((item, index) => (
                  <div
                    key={`${order.id}-${item.productId}-${index}`}
                    className="flex justify-between"
                  >
                    <span>
                      {item.title} x {item.quantity}
                    </span>
                    <span>${(item.price * item.quantity).toFixed(2)}</span>
                  </div>
                ))}
              </div>
              <div className="mt-2 font-bold text-right">
                Total: ${order.total.toFixed(2)}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
