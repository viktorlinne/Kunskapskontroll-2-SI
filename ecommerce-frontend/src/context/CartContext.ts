import { createContext } from "react";
import { ICartItem } from "../interfaces/ICartItem";

export interface ICartContext {
  cartItems: ICartItem[];
  addToCart: (item: ICartItem) => void;
  removeFromCart: (id: ICartItem["id"]) => void;
  clearCart: () => void;
  totalItems: () => number;
  totalPrice: () => number;
}

export const CartContext = createContext<ICartContext>({
  cartItems: [],
  addToCart: () => {},
  removeFromCart: () => {},
  clearCart: () => {},
  totalItems: () => 0,
  totalPrice: () => 0,
});
