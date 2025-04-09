// components/CartSummary.tsx
import { useContext } from "react";
import { CartContext } from "../context/CartContext";

export const CartSummary = () => {
  const { totalItems, totalPrice } = useContext(CartContext);

  return (
    <div className="rounded-2xl overflow-hidden shadow-lg bg-white p-4 flex flex-col justify-between">
      <div className="flex items-center">
        <h3 className="text-xl font-bold">Total Price:</h3>
        <span className="text-lg text-green-600 ml-4 font-semibold">
          ${totalPrice().toFixed(2)}
        </span>
      </div>
      <div className="flex items-center mt-4">
        <h3 className="text-xl font-bold">Total Items:</h3>
        <span className="text-lg text-green-600 ml-4 font-semibold">
          {totalItems()}
        </span>
      </div>
    </div>
  );
};
