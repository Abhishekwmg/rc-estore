export default function CartSummary({ cartItems, cartTotal }) {
  return (
    <div className="md:w-1/2 border p-4 rounded shadow">
      <h2 className="text-xl font-bold mb-4">Your Cart</h2>
      {cartItems.length === 0 ? (
        <p>Your cart is empty.</p>
      ) : (
        <ul className="space-y-4">
          {cartItems.map((item) => (
            <li key={item.productId} className="flex justify-between items-center border-b pb-2">
              <div>
                <p className="font-semibold">{item.title}</p>
                <p className="text-sm text-gray-500">Quantity: {item.quantity}</p>
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
  );
}
