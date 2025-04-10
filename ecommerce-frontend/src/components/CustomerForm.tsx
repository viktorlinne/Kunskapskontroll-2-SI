import { useState, useEffect, useContext } from "react";
import { createCustomer, getSpecificCustomer } from "../services/customerService";
import { ICustomer } from "../interfaces/ICustomer";
import { useOrders } from "../hooks/useOrders";
import { CartContext } from "../context/CartContext";
import { IOrder } from "../interfaces/IOrder";

const emptyForm: ICustomer = {
  id: null,
  firstname: "",
  lastname: "",
  email: "",
  phone: "",
  street_address: "",
  postal_code: "",
  city: "",
  country: "",
  created_at: "",
  password: "", 
};

export const CustomerForm = ({
  submitHandler,
}: {
  submitHandler: (id: IOrder["id"]) => void;
}) => {
  const [formData, setFormData] = useState<ICustomer>(() => {
    const savedForm = localStorage.getItem("customerForm");
    return savedForm ? JSON.parse(savedForm) : emptyForm;
  });

  const [message, setMessage] = useState("");
  const { cartItems } = useContext(CartContext);
  const { createOrder } = useOrders();

  useEffect(() => {
    const savedForm = localStorage.getItem("customerForm");
    if (savedForm) {
      setFormData(JSON.parse(savedForm));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("customerForm", JSON.stringify(formData));
  }, [formData]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!/\S+@\S+\.\S+/.test(formData.email)) {
      setMessage("Invalid email address.");
      return;
    }

    try {
      const existingCustomer = await getSpecificCustomer(formData.email);

      if (existingCustomer) {
        console.log(existingCustomer);
        setMessage("Welcome back!");
        const orderId = await createOrder(existingCustomer, cartItems);
        console.log(orderId);
        submitHandler(orderId);
        setFormData(emptyForm);
        return;
      }
    } catch (error) {
      try {
        const createdCustomer = await createCustomer(formData);
        setMessage("Customer created successfully!");
        const orderId = await createOrder(createdCustomer, cartItems);
        submitHandler(orderId);
        setFormData(emptyForm);
        localStorage.removeItem("customerForm");
      } catch (createErr) {
        setMessage("Failed to create customer.");
      }
    }
  };

  return (
    <div className="max-w-lg mx-auto mt-6 p-6 bg-white shadow-lg rounded-lg">
      <h2 className="text-center text-2xl font-bold mb-4">
        Enter Customer Details
      </h2>
      {message && <p className="text-center text-green-600">{message}</p>}
      <form onSubmit={handleSubmit} className="space-y-4">
        {[
          { name: "firstname", placeholder: "First Name" },
          { name: "lastname", placeholder: "Last Name" },
          { name: "email", placeholder: "Email", type: "email" },
          { name: "phone", placeholder: "Phone" },
          { name: "street_address", placeholder: "Street Address" },
          { name: "postal_code", placeholder: "Postal Code" },
          { name: "city", placeholder: "City" },
          { name: "country", placeholder: "Country" },
          { name: "password", placeholder: "Password", type: "password" }, 
        ].map((field) => (
          <input
            key={field.name}
            type={field.type || "text"}
            name={field.name}
            placeholder={field.placeholder}
            value={(formData as any)[field.name]}
            onChange={handleChange}
            required
            className="w-full p-2 border rounded"
          />
        ))}

        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition"
        >
          Go To Payment
        </button>
      </form>
    </div>
  );
};

