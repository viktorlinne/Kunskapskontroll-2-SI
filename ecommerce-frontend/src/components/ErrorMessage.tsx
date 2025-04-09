import { NavLink } from "react-router";

export const ErrorMessage = ({ error }: { error: string }) => (
  <div className="min-h-screen flex items-center justify-center bg-red-50">
    <div className="bg-white shadow-lg rounded-xl p-8 max-w-md text-center">
      <h2 className="text-2xl font-bold text-red-600 mb-4">Oops!</h2>
      <p className="text-gray-700 mb-6">{error}</p>
      <NavLink
        to="/"
        className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition"
      >
        Go Back to Shop
      </NavLink>
    </div>
  </div>
);
