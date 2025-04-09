import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router";
import { getSpecificOrder, updateOrder } from "../services/orderService";
import { IOrder } from "../interfaces/IOrder";

export const UpdateOrderForm = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [formData, setFormData] = useState<Omit<IOrder, "id" | "order_items">>({
    customer_id: 0,
    total_price: 0,
    payment_status: "",
    payment_id: "",
    order_status: "",
    created_at: "",
    customer_firstname: "",
    customer_lastname: "",
    customer_email: "",
    customer_phone: "",
    customer_street_address: "",
    customer_postal_code: "",
    customer_city: "",
    customer_country: "",
    customers_created_at: "",
  });
  const [message, setMessage] = useState("");

  useEffect(() => {
    const fetchOrder = async () => {
      try {
        const order = await getSpecificOrder(Number(id));
        setFormData(order);
      } catch (error) {
        setMessage("Failed to fetch order.");
      }
    };

    if (id) {
      fetchOrder();
    }
  }, [id]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await updateOrder({
          ...formData, id: Number(id),
          order_items: []
      });
      setMessage("Order updated successfully!");
      navigate("/admin/manage-orders");
    } catch (error) {
      setMessage("Failed to update order.");
    }
  };

  return (
    <div className="max-w-lg mx-auto p-6 bg-white shadow-lg rounded-lg">
      <h2 className="text-2xl font-bold mb-4">Update Order</h2>
      {message && <p className="text-center text-green-600">{message}</p>}
      <form onSubmit={handleSubmit} className="space-y-4">
        <input type="text" name="customer_firstname" placeholder="First Name" value={formData.customer_firstname} onChange={handleChange} required className="w-full p-2 border rounded" />
        <input type="text" name="customer_lastname" placeholder="Last Name" value={formData.customer_lastname} onChange={handleChange} required className="w-full p-2 border rounded" />
        <input type="email" name="customer_email" placeholder="Email" value={formData.customer_email} onChange={handleChange} required className="w-full p-2 border rounded" />
        <input type="text" name="customer_phone" placeholder="Phone" value={formData.customer_phone} onChange={handleChange} required className="w-full p-2 border rounded" />
        <input type="number" name="total_price" placeholder="Total Price" value={formData.total_price} onChange={handleChange} required className="w-full p-2 border rounded" />
        <select name="payment_status" value={formData.payment_status} onChange={handleChange} required className="w-full p-2 border rounded">
          <option value="">Select Payment Status</option>
          <option value="Paid">Paid</option>
          <option value="Pending">Pending</option>
          <option value="Failed">Failed</option>
          <option value="Refunded">Refunded</option>
        </select>
        <select name="order_status" value={formData.order_status} onChange={handleChange} required className="w-full p-2 border rounded">
          <option value="">Select Order Status</option>
          <option value="Processing">Processing</option>
          <option value="Shipped">Shipped</option>
          <option value="Delivered">Delivered</option>
          <option value="Canceled">Canceled</option>
        </select>
        <button type="submit" className="w-full bg-yellow-600 text-white py-2 rounded-lg hover:bg-yellow-700 transition">Update Order</button>
      </form>
    </div>
  );
};
