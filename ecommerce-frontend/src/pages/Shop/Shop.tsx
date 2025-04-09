import { Link } from "react-router"; // Fixed incorrect import from "react-router"
import { useProducts } from "../../hooks/useProducts";
import { AddToCartButton } from "../../components/AddToCartButton";
import { GoToCartButton } from "../../components/GoToCartButton";

export const Shop = () => {
  const { products, loading, error } = useProducts();

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-4">Welcome To My Webshop!</h2>
      <GoToCartButton />
      {loading ? (
        <p className="text-center text-gray-600 mt-4">Loading products...</p>
      ) : error ? (
        <p className="text-center text-red-600 mt-4">Error loading products.</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
          {products.map((product) => (
            <div
              key={product.id}
              className="rounded-2xl overflow-hidden shadow-lg bg-white p-4 flex flex-col justify-between"
            >
              <Link to={`/${product.id}`} className="flex flex-col justify-between h-full">
                <img
                  className="w-full h-48 object-contain rounded-lg"
                  src={product.image}
                  alt={product.name}
                />
                <div className="px-2 py-3">
                  <h2 className="text-xl font-bold mb-1">{product.name}</h2>
                  <p className="text-gray-600 text-sm mb-2">{product.category}</p>
                  <p className="text-gray-700 text-base line-clamp-2">
                    {product.description}
                  </p>
                </div>
                <div className="flex justify-between items-center mt-3">
                  <span className="text-lg font-semibold text-green-600">
                    ${product.price.toFixed(2)}
                  </span>
                  <span
                    className={`px-3 py-1 rounded-full text-sm font-medium ${
                      product.stock > 0
                        ? "bg-green-200 text-green-800"
                        : "bg-red-200 text-red-800"
                    }`}
                  >
                    {product.stock > 0 ? "In Stock" : "Out of Stock"}
                  </span>
                </div>
              </Link>
              <div className="mt-3">
                <AddToCartButton product={product} />
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

