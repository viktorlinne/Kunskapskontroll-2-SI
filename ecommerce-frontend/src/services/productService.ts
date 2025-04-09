import { IProduct } from "../interfaces/IProduct";
import { api } from "./axiosInstance";

export const getProducts = async () => {
  const response = await api.get("/products");
  return response.data;
};

export const getSpecificProduct = async (id: IProduct["id"]) => {
  const response = await api.get(`/products/${id}`);
  return response.data;
};

export const createProduct = async (product: IProduct) => {
  const response = await api.post("/products", product);
  return response.data;
};

export const updateProduct = async (product: IProduct) => {
  const response = await api.patch(`/products/${product.id}`, product);
  return response.data;
};

export const deleteProduct = async (id: IProduct["id"]) => {
  const response = await api.delete(`/products/${id}`);
  return response.data;
};
