import { ICartItem } from "../interfaces/ICartItem";
import { CartContext } from "../context/CartContext";
import { useEffect, useState } from "react";

export const CartProvider = ({ children }: { children: React.ReactNode }) => {
  const cachedItems = localStorage.getItem("cart") || "";
  const [cartItems, setCartItems] = useState<ICartItem[]>(cachedItems ? JSON.parse(cachedItems) : []);

  useEffect(() => {localStorage.setItem("cart", JSON.stringify(cartItems))}, [cartItems]);

    const addToCart = (item: ICartItem) => {
      const isItemInCart = cartItems.find((cartItem) => cartItem.id === item.id);
      if (isItemInCart) {
          setCartItems(
              cartItems.map((cartItem) =>
                  cartItem.id === item.id
                      ? {
                          ...cartItem,
                          quantity: item.quantity ? item.quantity : (cartItem.quantity ? cartItem.quantity : 1) + 1
                      }
                      : cartItem
              )
          );
      } else {
          setCartItems([...cartItems, {...item, quantity: 1}]);
      }
  };

  const removeFromCart = (id: ICartItem["id"]) => {
    const existingItem = cartItems.find((cartItem) => cartItem.id === id);
    if (!existingItem) {
      return;
    }

    if (existingItem.quantity === 1) {
      setCartItems(cartItems.filter((cartItem) => cartItem.id !== id));
    } else {
      setCartItems(
        cartItems.map((cartItem) =>
          cartItem.id === id
            ? {
                ...cartItem,
                quantity: (cartItem.quantity ? cartItem.quantity : 1) - 1,
              }
            : cartItem
        )
      );
    }
  };

  const clearCart = () => {
    setCartItems([]);
  };

  const totalItems = () => {
    return cartItems.reduce(
      (amount, item) => amount + (item.quantity ? item.quantity : 1),
      0
    );
  };

  const totalPrice = () => {
    return cartItems.reduce(
      (total, item) => total + item.price * (item.quantity ? item.quantity : 1),
      0
    );
  };

  return (
    <CartContext.Provider
      value={{
        cartItems,
        addToCart,
        removeFromCart,
        clearCart,
        totalItems,
        totalPrice,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};
