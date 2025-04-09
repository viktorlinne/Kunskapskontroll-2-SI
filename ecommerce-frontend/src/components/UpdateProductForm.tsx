import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router";
import { useProducts } from "../hooks/useProducts";
import { getSpecificProduct } from "../services/productService";
import { IProduct } from "../interfaces/IProduct";

export const UpdateProductForm = () => {
  const { id } = useParams<{ id: string }>(); // Get product ID from URL
  const navigate = useNavigate();
  const { updateProductById } = useProducts(); // Use the custom hook
  const [formData, setFormData] = useState<IProduct>({
    id: null,
    name: "",
    description: "",
    price: 0,
    stock: 0,
    category: "",
    image: "",
    created_at: "",
  });
  const [message, setMessage] = useState("");

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const product = await getSpecificProduct(Number(id));
        console.log(`Updating product with id: ${product.id}`)
        setFormData(product);
      } catch (error) {
        setMessage("Failed to fetch product.");
      }
    };

    if (id) {
      fetchProduct();
    }
  }, [id]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: name === "price" || name === "stock" ? Number(value) : value,
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await updateProductById(formData);
      setMessage("Product updated successfully!");
      navigate("/admin/manage-products"); // Redirect to product management page
    } catch (error) {
      setMessage("Failed to update product.");
    }
  };

  return (
    <div className="max-w-lg mx-auto p-6 bg-white shadow-lg rounded-lg">
      <h2 className="text-2xl font-bold mb-4">Update Product</h2>
      {message && <p className="text-center text-green-600">{message}</p>}
      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="text"
          name="name"
          placeholder="Product Name"
          value={formData.name}
          onChange={handleChange}
          required
          className="w-full p-2 border rounded"
        />
        <textarea
          name="description"
          placeholder="Description"
          value={formData.description}
          onChange={handleChange}
          required
          className="w-full p-2 border rounded"
        ></textarea>
        <label className="block text-gray-700">Price</label>
        <input
          type="number"
          name="price"
          placeholder="Price"
          value={formData.price}
          onChange={handleChange}
          required
          className="w-full p-2 border rounded"
        />
        <label className="block text-gray-700">Stock Quantity</label>
        <input
          type="number"
          name="stock"
          placeholder="Stock Quantity"
          value={formData.stock}
          onChange={handleChange}
          required
          className="w-full p-2 border rounded"
        />
        <input
          type="text"
          name="category"
          placeholder="Category"
          value={formData.category}
          onChange={handleChange}
          required
          className="w-full p-2 border rounded"
        />
        <input
          type="text"
          name="image"
          placeholder="Image URL"
          value={formData.image}
          onChange={handleChange}
          required
          className="w-full p-2 border rounded"
        />
        <button
          type="submit"
          className="w-full bg-yellow-600 text-white py-2 rounded-lg hover:bg-yellow-700 transition"
        >
          Update Product
        </button>
      </form>
    </div>
  );
};
