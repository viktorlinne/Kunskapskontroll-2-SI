import { Link } from "react-router";
import { useProducts } from "../../hooks/useProducts";

export const ManageProducts = () => {
  const { products, loading, error, deleteProductById } = useProducts();

  if (loading)
    return <p className="text-center text-lg">Loading products...</p>;
  if (error) return <p className="text-center text-red-600">Error: {error}</p>;

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6 p-4">
      {products.map((product) => (
        <div
          key={product.id}
          className="rounded-2xl overflow-hidden shadow-lg bg-white p-4 flex flex-col"
        >
          <div className="flex flex-col items-center text-center">
            <div className="w-24 h-24 flex items-center justify-center bg-gray-300 rounded-lg">
              <img
                className="w-full h-full object-contain rounded-lg"
                src={product.image}
                alt={product.name}
              />
            </div>
            <h2 className="text-xl font-bold mt-3">{product.name}</h2>
            <p className="text-gray-600 text-sm">{product.category}</p>
            <p className="text-gray-700 text-sm mt-2">{product.description}</p>
            <span className="text-lg font-semibold text-green-600 mt-2">
              ${product.price.toFixed(2)}
            </span>
            <span
              className={`px-3 py-1 rounded-full text-sm font-medium mt-2 ${
                product.stock > 0
                  ? "bg-green-200 text-green-800"
                  : "bg-red-200 text-red-800"
              }`}
            >
              {product.stock > 0 ? "In Stock" : "Out of Stock"}
            </span>
          </div>
          <div className="flex flex-col gap-2 mt-4">
            <button
              className="w-full bg-red-600 text-white py-2 rounded-lg hover:bg-red-700 transition"
              onClick={() => deleteProductById(product.id)}
            >
              Delete
            </button>
            <Link to={`/admin/update-product/${product.id}`}>
              <button className="w-full bg-yellow-600 text-white py-2 rounded-lg hover:bg-yellow-700 transition">
                Edit
              </button>
            </Link>
          </div>
        </div>
      ))}
    </div>
  );
};
