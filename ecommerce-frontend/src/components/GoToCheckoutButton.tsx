import { useNavigate } from "react-router";

export const GoToCheckoutButton = () => {
  const navigate = useNavigate();

  return (
    <button
      className="mt-6 bg-green-600 text-white px-3 py-3 rounded-lg hover:bg-green-700 transition"
      onClick={() => navigate("/checkout")}
    >
      Go to Checkout
    </button>
  );
};