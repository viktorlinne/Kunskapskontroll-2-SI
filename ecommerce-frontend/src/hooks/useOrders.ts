import { useEffect, useState } from "react";
import {
  createOrderService,
  deleteOrder,
  getOrders,
  getSpecificOrder,
  updateOrder,
  getOrderByPaymentId as getOrderByPaymentIdService,
} from "../services/orderService";
import { IOrder } from "../interfaces/IOrder";
import { ICartItem } from "../interfaces/ICartItem";
import { ICustomer } from "../interfaces/ICustomer";
import { IOrderItem } from "../interfaces/IOrderItem";

export const useOrders = () => {
  const [orders, setOrders] = useState<IOrder[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    setLoading(true);
    const fetchData = async () => {
      try {
        const data = await getOrders();
        setOrders(data);
      } catch (err) {
        console.error("Error fetching orders:", err);
        setError((err as Error).message);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const getOrderByPaymentId = async (paymentId: string): Promise<IOrder> => {
    try {
      const response = await getOrderByPaymentIdService(paymentId);
      console.log(response);
      return response;
    } catch (err) {
      console.error("Error fetching order by payment ID:", err);
      setError((err as Error).message);
      throw err; 
    }
  };

  const createOrder = async (customer: ICustomer, cartItems: ICartItem[]) => {
    try {
      const orderItems: Partial<IOrderItem>[] = cartItems.map((item) => ({
        product_id: item.id as number,
        product_name: item.name,
        unit_price: item.price,
        quantity: item.quantity,
        created_at: "", 
        image_url: item.image,
      }));

      const orderData = {
        customer_id: customer.id as number,
        payment_status: "Unpaid",
        payment_id: "",
        order_status: "Pending",
        order_items: orderItems,
      };

      const response = await createOrderService(orderData);
      console.log(response);

      const fullOrder = await getSpecificOrder(response.id as IOrder["id"]);
      setOrders((prevState) => [...prevState, fullOrder]);

      console.log("Order created successfully");
      return fullOrder.id;
    } catch (err) {
      console.error("Error creating order:", err);
      setError((err as Error).message);
    }
  };

  const deleteOrderById = async (id: IOrder["id"]) => {
    try {
      const { message } = await deleteOrder(id);
      console.log(message);
      setOrders((prevState) =>
        prevState.filter((current) => current.id !== id)
      );
    } catch (err) {
      console.error("Error deleting order:", err);
      setError((err as Error).message);
    }
  };

  const updateOrderById = async (order: IOrder) => {
    try {
      const updatedOrder = await updateOrder(order);
      setOrders((prevState) =>
        prevState.map((p) => (p.id === order.id ? updatedOrder : p))
      );
      console.log("Order updated successfully");
    } catch (err) {
      console.error("Error updating order:", err);
      setError((err as Error).message);
    }
  };

  return {
    orders,
    loading,
    error,
    createOrder,
    deleteOrderById,
    updateOrderById,
    getOrderByPaymentId,
  };
};
