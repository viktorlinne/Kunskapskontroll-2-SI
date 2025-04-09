import { NavLink } from "react-router";
import { useOrders } from "../../hooks/useOrders";

export const ManageOrders = () => {
  const { orders, loading, error, deleteOrderById } = useOrders();

  if (loading) return <p className="text-center text-lg">Loading orders...</p>;
  if (error) return <p className="text-center text-red-600">Error: {error}</p>;

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6 p-4">
      {orders.map((order) => (
        <div
          key={order.id}
          className="rounded-2xl overflow-hidden shadow-lg bg-white p-4"
        >
          <div className="flex flex-col items-center text-center">
            <div className="w-24 h-24 bg-gray-300 rounded-full flex items-center justify-center text-gray-700 text-xl font-bold">
              {order.customer_firstname.charAt(0)}
              {order.customer_lastname.charAt(0)}
            </div>
            <h2 className="text-xl font-bold mt-3">Order #{order.id}</h2>
            <p className="text-gray-600 text-sm">
              Customer: {order.customer_firstname} {order.customer_lastname}
            </p>
            <p className="text-gray-600 text-sm">
              Email: {order.customer_email}
            </p>
            <p className="text-gray-600 text-sm">
              Phone: {order.customer_phone}
            </p>
            <p className="text-gray-700 text-sm mt-2">
              {order.customer_street_address}, {order.customer_city},{" "}
              {order.customer_country}
            </p>
            <p className="text-gray-700 text-sm mt-2 font-semibold">
              Total: ${order.total_price.toFixed(2)}
            </p>
            <p
              className={`text-sm mt-2 font-medium ${
                order.payment_status === "Paid"
                  ? "text-green-600"
                  : "text-red-600"
              }`}
            >
              Payment: {order.payment_status}
            </p>
            <p className="text-sm mt-2 text-blue-600 font-medium">
              Status: {order.order_status}
            </p>
          </div>
          <div className="flex flex-col gap-2 mt-4">
            <button
              className="w-full bg-red-600 text-white py-2 rounded-lg hover:bg-red-700 transition"
              onClick={() => deleteOrderById(order.id)}
            >
              Delete
            </button>
            <NavLink to={`/admin/update-order/${order.id}`}>
              <button className="w-full bg-yellow-600 text-white py-2 rounded-lg hover:bg-yellow-700 transition">
                Edit
              </button>
            </NavLink>
          </div>
        </div>
      ))}
    </div>
  );
};
