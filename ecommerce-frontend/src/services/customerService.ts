import { ICustomer } from "../interfaces/ICustomer";
import { api } from "./axiosInstance";

export const getCustomers = async () => {
  const response = await api.get("/customers");
  return response.data;
};

export const getSpecificCustomer = async (email: ICustomer["email"]) => {
  const response = await api.get(`/customers/email/${email}`);
  return response.data;
};

export const createCustomer = async (customer: ICustomer) => {
  const response = await api.post("/customers", customer);
  return response.data;
};

export const updateCustomer = async (customer: ICustomer) => {
  const response = await api.patch(`/customers/${customer.id}`, customer);
  return response.data;
};

export const deleteCustomer = async (id: ICustomer["id"]) => {
  const response = await api.delete(`/customers/${id}`);
  return response.data;
};
