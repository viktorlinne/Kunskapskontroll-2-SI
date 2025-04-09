import { GoToCartButton } from "../../components/GoToCartButton";
import { CartItemGrid } from "../../components/CartItemGrid";
import { CartSummary } from "../../components/CartSummary";
import { CustomerForm } from "../../components/CustomerForm";
import { useCallback, useContext, useState } from "react";
import { CartContext } from "../../context/CartContext";
import { loadStripe } from "@stripe/stripe-js";
import {
  EmbeddedCheckoutProvider,
  EmbeddedCheckout,
} from "@stripe/react-stripe-js";
import { api } from "../../services/axiosInstance";
import { IOrder } from "../../interfaces/IOrder";

const stripePromise = loadStripe(
  "pk_test_51R6Uua4E2OXMiKqH6CVbUrDzHX8mGsv5kaJOO2KPY320Y4qrIMzeoHMkineHTBD7rRNSDR5JA54yW1PjEd1AuV1R00IdORPH5B"
);

export const Checkout = () => {
  const { cartItems } = useContext(CartContext);

  const isCartEmpty = cartItems.length === 0;

  const [showPayment, setShowPayment] = useState(false);
  const [orderId, setOrderId] = useState<number | null>(null);

  const fetchClientSecret = useCallback(async () => {
    console.log("client_secret", orderId)
    const response = await api.post("/stripe/create-checkout-session-embedded",
      {
        cartItems: cartItems,
        orderId: orderId,
      });
      console.log(response)
      return response.data.client_secret;
  },[orderId]);

  const options = { fetchClientSecret };

  const handleCustomerSubmit = (id: IOrder["id"]) => {
    setShowPayment(true);
    console.log(id)
    setOrderId(id);
  };

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-4">Checkout</h2>
      <div className="flex justify-between items-center mb-4">
        <GoToCartButton />
      </div>

      {isCartEmpty && (
        <h2 className="text-2xl font-bold mb-4 text-center text-red-500">
          Add Some Items Before Checkout
        </h2>
      )}

      <CartItemGrid />

      {!isCartEmpty && (
        <>
          <CartSummary />
          <CustomerForm submitHandler={handleCustomerSubmit} />
        </>
      )}

      {showPayment && (
        <div id="checkout">
          <EmbeddedCheckoutProvider stripe={stripePromise} options={options}>
            <EmbeddedCheckout />
          </EmbeddedCheckoutProvider>
        </div>
      )}
    </div>
  );
};
