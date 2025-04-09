import { useEffect, useState } from "react";
import { useParams } from "react-router";
import { IProduct } from "../interfaces/IProduct";
import { getSpecificProduct } from "../services/productService";
import { AddToCartButton } from "./AddToCartButton";
import { GoToCartButton } from "./GoToCartButton";

export const SingleProduct = () => {
  const { id } = useParams<{ id: string }>();
  const [product, setProduct] = useState<IProduct | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const data = await getSpecificProduct(Number(id));
        setProduct(data);
      } catch (err) {
        setError("Failed to load product.");
      } finally {
        setLoading(false);
      }
    };

    if (id) fetchProduct();
  }, [id]);

  if (loading) return <p className="text-center text-lg">Loading product...</p>;
  if (error || !product)
    return (
      <p className="text-center text-red-600">
        {error || "Product not found."}
      </p>
    );

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white shadow-lg rounded-2xl">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-center">
        <div className="flex justify-center">
          <img
            className="w-full max-w-md max-h-96 object-contain rounded-lg"
            src={product.image}
            alt={product.name}
          />
        </div>
        <div className="flex flex-col justify-between max-h-96">
          <h1 className="text-3xl font-bold mb-2">{product.name}</h1>
          <p className="text-gray-600 text-sm mb-2">
            Category: {product.category}
          </p>
          <p className="text-gray-700 text-lg mb-4 overflow-hidden">
            {product.description}
          </p>
          <span className="text-2xl font-semibold text-green-600">
            ${product.price.toFixed(2)}
          </span>
          <div className="mt-4">
            <span
              className={`px-4 py-2 rounded-full text-sm font-medium ${
                product.stock > 0
                  ? "bg-green-200 text-green-800"
                  : "bg-red-200 text-red-800"
              }`}
            >
              {product.stock > 0 ? "In Stock" : "Out of Stock"}
            </span>
          </div>
          <AddToCartButton product={product} />
          <GoToCartButton />
          
        </div>
      </div>
    </div>
  );
};
