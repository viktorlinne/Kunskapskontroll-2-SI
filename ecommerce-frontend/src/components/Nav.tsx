import { NavLink } from "react-router";

export const Nav = () => {

  return (
    <nav className="bg-white shadow-lg rounded-2xl p-4 mb-6 max-w-lg mx-auto">
      <ul className="flex justify-around text-lg font-semibold">
        <NavLink 
          to="/" 
          className={({ isActive }) => 
            `px-4 py-2 rounded-lg transition ${isActive ? "bg-blue-600 text-white" : "text-gray-700 hover:bg-gray-200"}`
          }
        >
          <li>Shop</li>
        </NavLink>
        <NavLink 
          to="/categories" 
          className={({ isActive }) => 
            `px-4 py-2 rounded-lg transition ${isActive ? "bg-blue-600 text-white" : "text-gray-700 hover:bg-gray-200"}`
          }
        >
          <li>Categories</li>
        </NavLink>
        <NavLink 
          to="/admin" 
          className={({ isActive }) => 
            `px-4 py-2 rounded-lg transition ${isActive ? "bg-blue-600 text-white" : "text-gray-700 hover:bg-gray-200"}`
          }
        >
          <li>Admin</li>
        </NavLink>
      </ul>
    </nav>
  );
};



