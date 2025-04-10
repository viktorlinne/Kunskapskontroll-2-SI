import { useEffect, useState } from "react";
import {
  getProducts,
  deleteProduct,
  updateProduct,
  createProduct as createProductService,
} from "../services/productService";
import { IProduct } from "../interfaces/IProduct";

export const useProducts = () => {
  const [products, setProducts] = useState<IProduct[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    setLoading(true);
    const fetchData = async () => {
      try {
        const data = await getProducts();
        setProducts(data);
      } catch (err) {
        console.error("Error fetching products:", err);
        setError((err as Error).message);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const createProduct = async (product: IProduct) => {
    try {
      const response = await createProductService(product);
      setProducts((prev) => [...prev, response]);
      console.log(response);
    } catch (err) {
      console.error("Error creating product:", err);
      setError((err as Error).message);
    }
  };

  const deleteProductById = async (id: IProduct["id"]) => {
    try {
      const { message } = await deleteProduct(id);
      console.log(message);
      setProducts((prevState) =>
        prevState.filter((current) => current.id !== id)
      );
    } catch (err) {
      console.error("Error deleting product:", err);
      setError((err as Error).message);
    }
  };

  const updateProductById = async (product: IProduct) => {
    try {
      const updatedProduct = await updateProduct(product);
      setProducts((prevState) =>
        prevState.map((p) => (p.id === product.id ? updatedProduct : p))
      );
      console.log("Product updated successfully");
    } catch (err) {
      console.error("Error updating product:", err);
      setError((err as Error).message);
    }
  };

  return {
    products,
    loading,
    error,
    deleteProductById,
    createProduct,
    updateProductById,
  };
};
