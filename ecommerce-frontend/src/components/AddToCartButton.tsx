import { IProduct } from "../interfaces/IProduct";
import { CartContext } from "../context/CartContext";
import { useContext } from "react";

export const AddToCartButton = ({ product }: { product: IProduct }) => {
  const { addToCart } = useContext(CartContext);

  const handleClick = () => {
    console.log(product);
    addToCart({
      id: product.id,
      name: product.name,
      price: product.price,
      image: product.image,
      category: product.category,
    });
  };

  return (
    <button
      className="mt-6 w-full bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 transition"
      onClick={handleClick}
      disabled={product.stock === 0}
    >
      {product.stock > 0 ? "Add to Cart" : "Sold Out"}
    </button>
  );
};
