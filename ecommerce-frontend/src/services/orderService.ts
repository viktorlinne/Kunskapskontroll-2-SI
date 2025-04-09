import { IOrder } from "../interfaces/IOrder";
import { api } from "./axiosInstance";

export const getOrders = async () => {
    const response = await api.get("/orders");
    return response.data;
  };
  
  export const getSpecificOrder = async (id: IOrder["id"]) => {
    const response = await api.get(`/orders/${id}`);
    return response.data;
  };
  
  export const createOrderService = async (orders:any) => {
    const response = await api.post("/orders", orders);
    return response.data;
  };
  
  export const updateOrder = async (orders: IOrder) => {
    const response = await api.patch(`/orders/${orders.id}`, orders);
    return response.data;
  };
  
  export const deleteOrder = async (id: IOrder["id"]) => {
    const response = await api.delete(`/orders/${id}`);
    return response.data;
  };


export const getOrderByPaymentId = async (paymentId: string): Promise<any> => {
  const response = await api.get(`/orders/payment/${paymentId}`);
  return response.data;
};