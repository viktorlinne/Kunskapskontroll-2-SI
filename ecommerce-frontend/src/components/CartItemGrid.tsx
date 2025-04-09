// components/CartItemGrid.tsx
import { useContext } from "react";
import { CartContext } from "../context/CartContext";

export const CartItemGrid = () => {
  const { cartItems, addToCart, removeFromCart } = useContext(CartContext);

  if (cartItems.length === 0) {
    return <p className="text-center text-gray-600">Your cart is empty.</p>;
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
      {cartItems.map((item) => (
        <div
          key={item.id}
          className="rounded-2xl overflow-hidden shadow-lg bg-white p-4 flex flex-col justify-between"
        >
          <img
            className="w-full h-48 object-contain rounded-lg"
            src={item.image}
            alt={item.name}
          />
          <div className="px-2 py-3">
            <h2 className="text-xl font-bold mb-1">{item.name}</h2>
            <p className="text-gray-600 text-sm mb-2">{item.category}</p>
            <span className="text-lg font-semibold text-green-600">
              {item.price?.toFixed(2)} Kr
            </span>
            <div className="flex items-center justify-between mt-3">
              <div className="flex items-center gap-2">
                <button
                  className="bg-gray-300 px-3 py-1 rounded-lg hover:bg-gray-400"
                  onClick={() => removeFromCart(item.id!)}
                >
                  -
                </button>
                <span className="text-lg font-semibold">
                  {item.quantity || 1}
                </span>
                <button
                  className="bg-gray-300 px-3 py-1 rounded-lg hover:bg-gray-400"
                  onClick={() =>
                    addToCart({
                      ...item,
                      quantity: (item.quantity as number) + 1,
                    })
                  }
                >
                  +
                </button>
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};
