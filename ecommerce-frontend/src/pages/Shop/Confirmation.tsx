import { useContext, useEffect, useState } from "react";
import { CartContext } from "../../context/CartContext";
import { NavLink } from "react-router";
import { IoCheckmarkCircleOutline } from "react-icons/io5";
import { getOrderByPaymentId } from "../../services/orderService";
import { useSearchParams } from "react-router";
import { IPurchasedItem } from "../../interfaces/IPurhcasedItem";
import { PurchasedProductCard } from "../../components/PurchasedProductCard";
import { CustomerInfo } from "../../components/CustomerInfo";
import { ErrorMessage } from "../../components/ErrorMessage";
import { ICustomer } from "../../interfaces/ICustomer";

export const Confirmation = () => {
  const { clearCart } = useContext(CartContext);
  const [purchasedItems, setPurchasedItems] = useState<IPurchasedItem[]>([]);
  const [searchParams] = useSearchParams();
  const [customer, setCustomer] = useState<ICustomer | null>(null);
  const [error, setError] = useState<string | null>(null);
  const paymentId = searchParams.get("session_id");

  useEffect(() => {
    if (!paymentId) {
      setError("No payment ID found in the URL");
      return;
    }

    getOrderByPaymentId(paymentId)
      .then((order) => {
        const formattedItems: IPurchasedItem[] = order.order_items.map(
          (item: any) => ({
            id: item.id,
            name: item.product_name,
            image: "https://picsum.photos/200",
            category: "Phone",
            quantity: item.quantity,
            price: item.unit_price,
          })
        );

        const customerData: ICustomer = {
          firstname: order.customer_firstname,
          lastname: order.customer_lastname,
          email: order.customer_email,
          phone: order.customer_phone,
          street_address: order.customer_street_address,
          postal_code: order.customer_postal_code,
          city: order.customer_city,
          country: order.customer_country,
          id: 0,
          created_at: "",
          password: ""
        };

        setCustomer(customerData);
        setPurchasedItems(formattedItems);
        console.log(order);
      })
      .catch((err) => {
        console.error("Failed to fetch order", err);
        setError("Could not load order details.");
      });

    clearCart();
  }, [paymentId]);

  if (error) {
    return <ErrorMessage error={error} />;
  }

  return (
    <div className="min-h-screen bg-gray-50 p-6 flex flex-col items-center justify-center">
      <div className="bg-white shadow-lg rounded-2xl p-8 max-w-5xl w-full">
        <div className="text-center mb-8">
          <IoCheckmarkCircleOutline className="text-green-600 text-6xl mb-4 mx-auto" />
          <h1 className="text-3xl font-bold text-green-600 mb-2">
            Payment Successful!
          </h1>
          <p className="text-gray-700">
            Thank you for your order. Here's what you purchased:
          </p>
        </div>

        {customer && <CustomerInfo customer={customer} />}

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6 mb-8">
          {purchasedItems.map((item: IPurchasedItem) => (
            <PurchasedProductCard key={item.id} item={item} />
          ))}
        </div>

        <div className="bg-gray-100 p-4 rounded-xl text-center mb-6">
          <p className="text-xl font-bold">
            Total Items:{" "}
            {purchasedItems.reduce(
              (acc: number, item: IPurchasedItem) => acc + item.quantity,
              0
            )}
          </p>
          <p className="text-xl font-bold text-green-600">
            Total Paid:{" "}
            {purchasedItems
              .reduce(
                (acc: number, item: IPurchasedItem) =>
                  acc + item.price * item.quantity,
                0
              )
              .toFixed(2)}{" "}
            Kr
          </p>
        </div>

        <div className="text-center">
          <NavLink
            to="/"
            className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition"
          >
            Continue Shopping
          </NavLink>
        </div>
      </div>
    </div>
  );
};
