import { NavLink } from "react-router";
import { useCustomers } from "../../hooks/useCustomers";

export const ManageCustomers = () => {
  const { customers, loading, error, deleteCustomerById } = useCustomers();

  if (loading)
    return <p className="text-center text-lg">Loading customers...</p>;
  if (error) return <p className="text-center text-red-600">Error: {error}</p>;

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6 p-4">
      {customers.map((customer) => (
        <div
          key={customer.id}
          className="rounded-2xl overflow-hidden shadow-lg bg-white p-4"
        >
          <div className="flex flex-col items-center text-center">
            <div className="w-24 h-24 bg-gray-300 rounded-full flex items-center justify-center text-gray-700 text-xl font-bold">
              {customer.firstname.charAt(0)}
              {customer.lastname.charAt(0)}
            </div>
            <h2 className="text-xl font-bold mt-3">
              {customer.firstname} {customer.lastname}
            </h2>
            <p className="text-gray-600 text-sm">{customer.email}</p>
            <p className="text-gray-600 text-sm">{customer.phone}</p>
            <p className="text-gray-700 text-sm mt-2">
              {customer.street_address}, {customer.city}, {customer.country}
            </p>
          </div>
          <div className="flex flex-col gap-2 mt-4">
            <button
              className="w-full bg-red-600 text-white py-2 rounded-lg hover:bg-red-700 transition"
              onClick={() => deleteCustomerById(customer.id)}
            >
              Delete
            </button>
            <NavLink to={`/admin/update-customer/${customer.id}`}>
              <button className="w-full bg-yellow-600 text-white py-2 rounded-lg hover:bg-yellow-700 transition">
                Edit
              </button>
            </NavLink>
          </div>
        </div>
      ))}
    </div>
  );
};
