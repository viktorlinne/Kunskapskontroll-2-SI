import { useState } from "react";
import { NavLink, useLocation } from "react-router";
import { IoIosArrowDropdown, IoIosArrowDropup } from "react-icons/io";

export const AdminNav = () => {
  const location = useLocation();
  const [isManageDropdownOpen, setIsManageDropdownOpen] = useState(false);
  const [isCreateDropdownOpen, setIsCreateDropdownOpen] = useState(false);

  const closeDropdowns = () => {
    setIsManageDropdownOpen(false);
    setIsCreateDropdownOpen(false);
  };

  const isActiveManage = ["/admin/manage-products", "/admin/manage-customers", "/admin/manage-orders"].includes(location.pathname);
  const isActiveCreate = ["/admin/create-product", "/admin/create-customer", "/admin/create-order"].includes(location.pathname);

  return (
    <nav className="bg-white shadow-lg rounded-2xl p-4 mb-6 max-w-lg mx-auto">
      <ul className="flex justify-around text-lg font-semibold relative">
        <NavLink 
          to="/" 
          className={({ isActive }) => 
            `px-4 py-2 rounded-lg transition ${isActive ? "bg-blue-600 text-white" : "text-gray-700 hover:bg-gray-200"}`
          }
        >
          <li>Shop</li>
        </NavLink>

        <div className="relative">
          <button
            onClick={() => setIsManageDropdownOpen(!isManageDropdownOpen)}
            className={`px-4 py-2 rounded-lg transition flex items-center ${isActiveManage ? "bg-blue-600 text-white" : "text-gray-700 hover:bg-gray-200"}`}
          >
            Manage {isManageDropdownOpen ? <IoIosArrowDropup className="ml-2" /> : <IoIosArrowDropdown className="ml-2" />}
          </button>
          {isManageDropdownOpen && (
            <div className="absolute left-0 mt-2 w-40 bg-white shadow-lg rounded-lg z-10 overflow-hidden border border-gray-200">
              <NavLink to="/admin/manage-products" onClick={closeDropdowns} className={({ isActive }) => `block px-4 py-3 text-gray-700 hover:bg-gray-200 transition ${isActive ? "bg-blue-600 text-white" : ""}`}>Products</NavLink>
              <NavLink to="/admin/manage-customers" onClick={closeDropdowns} className={({ isActive }) => `block px-4 py-3 text-gray-700 hover:bg-gray-200 transition ${isActive ? "bg-blue-600 text-white" : ""}`}>Customers</NavLink>
              <NavLink to="/admin/manage-orders" onClick={closeDropdowns} className={({ isActive }) => `block px-4 py-3 text-gray-700 hover:bg-gray-200 transition ${isActive ? "bg-blue-600 text-white" : ""}`}>Orders</NavLink>
            </div>
          )}
        </div>

        <div className="relative">
          <button
            onClick={() => setIsCreateDropdownOpen(!isCreateDropdownOpen)}
            className={`px-4 py-2 rounded-lg transition flex items-center ${isActiveCreate ? "bg-blue-600 text-white" : "text-gray-700 hover:bg-gray-200"}`}
          >
            Create {isCreateDropdownOpen ? <IoIosArrowDropup className="ml-2" /> : <IoIosArrowDropdown className="ml-2" />}
          </button>
          {isCreateDropdownOpen && (
            <div className="absolute left-0 mt-2 w-40 bg-white shadow-lg rounded-lg z-10 overflow-hidden border border-gray-200">
              <NavLink to="/admin/create-product" onClick={closeDropdowns} className={({ isActive }) => `block px-4 py-3 text-gray-700 hover:bg-gray-200 transition ${isActive ? "bg-blue-600 text-white" : ""}`}>Product</NavLink>
              <NavLink to="/admin/create-customer" onClick={closeDropdowns} className={({ isActive }) => `block px-4 py-3 text-gray-700 hover:bg-gray-200 transition ${isActive ? "bg-blue-600 text-white" : ""}`}>Customer</NavLink>
              <NavLink to="/admin/create-order" onClick={closeDropdowns} className={({ isActive }) => `block px-4 py-3 text-gray-700 hover:bg-gray-200 transition ${isActive ? "bg-blue-600 text-white" : ""}`}>Order</NavLink>
            </div>
          )}
        </div>
      </ul>
    </nav>
  );
};

export default AdminNav;





  
