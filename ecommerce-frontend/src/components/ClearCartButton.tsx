import { CartContext } from "../context/CartContext";
import { useContext } from "react";

export const ClearCartButton = () => {
  const { clearCart } = useContext(CartContext);

  return (
    <button
      className="mt-6 bg-red-600 text-white px-3 py-3 rounded-lg hover:bg-red-700 transition"
      onClick={clearCart}
    >
      Clear Cart
    </button>
  );
};