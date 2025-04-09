import { useEffect, useState } from "react";
import {
  deleteCustomer,
  getCustomers,
  updateCustomer,
} from "../services/customerService";
import { ICustomer } from "../interfaces/ICustomer";

export const useCustomers = () => {
  const [customers, setCustomers] = useState<ICustomer[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    setLoading(true);
    const fetchData = async () => {
      try {
        const data = await getCustomers();
        setCustomers(data);
      } catch (err) {
        console.error("Error fetching customers:", err);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const createCustomer = async (customer: ICustomer) => {
    try {
      const response: ICustomer = await createCustomer(customer);
      console.log(response);
      return response;
    } catch (err) {
      console.error("Error creating customer:", err);
      setError(err.message);
    }
  };

  const deleteCustomerById = async (id: ICustomer["id"]) => {
    try {
      const { message } = await deleteCustomer(id);
      console.log(message);
      setCustomers((prevState) =>
        prevState.filter((current) => current.id !== id)
      );
    } catch (err) {
      console.error("Error deleting customer:", err);
      setError(err.message);
    }
  };

  const updateCustomerById = async (customer: ICustomer) => {
    try {
      const updatedCustomer = await updateCustomer(customer);
      setCustomers((prevState) =>
        prevState.map((p) => (p.id === customer.id ? updatedCustomer : p))
      );
      console.log("Customer updated successfully");
    } catch (err) {
      console.error("Error updating customer:", err);
      setError(err.message);
    }
  };

  return {
    customers,
    loading,
    error,
    createCustomer,
    deleteCustomerById,
    updateCustomerById,
  };
};
