import { ClearCartButton } from "./ClearCartButton";
import { GoToCheckoutButton } from "./GoToCheckoutButton";
import { CartItemGrid } from "./CartItemGrid";
import { CartSummary } from "./CartSummary";

export const Cart = () => {
  return (
    <>
      <div className="p-6">
        <h2 className="text-2xl font-bold mb-4">Shopping Cart</h2>
        <div className="flex justify-between items-center mb-4">
          <GoToCheckoutButton />
        </div>
        <CartItemGrid />
        <CartSummary />
        <ClearCartButton />
      </div>
    </>
  );
};
