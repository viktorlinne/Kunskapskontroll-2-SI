import { NavLink, useNavigate } from "react-router";
import { useState } from "react";

export const Nav = () => {
  const [searchText, setSearchText] = useState("");
  const navigate = useNavigate();

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchText.trim()) {
      navigate(`/search?q=${encodeURIComponent(searchText.trim())}`);
      setSearchText("");
    }
  };

  return (
    <nav className="bg-white shadow-lg rounded-2xl p-4 mb-6 max-w-5xl mx-auto">
      <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
        <ul className="flex gap-4 text-lg font-semibold">
          <NavLink
            to="/"
            className={({ isActive }) =>
              `px-4 py-2 rounded-lg transition ${
                isActive
                  ? "bg-blue-600 text-white"
                  : "text-gray-700 hover:bg-gray-200"
              }`
            }
          >
            <li>Shop</li>
          </NavLink>
          <NavLink
            to="/categories"
            className={({ isActive }) =>
              `px-4 py-2 rounded-lg transition ${
                isActive
                  ? "bg-blue-600 text-white"
                  : "text-gray-700 hover:bg-gray-200"
              }`
            }
          >
            <li>Categories</li>
          </NavLink>
          <NavLink
            to="/admin"
            className={({ isActive }) =>
              `px-4 py-2 rounded-lg transition ${
                isActive
                  ? "bg-blue-600 text-white"
                  : "text-gray-700 hover:bg-gray-200"
              }`
            }
          >
            <li>Admin</li>
          </NavLink>
        </ul>

        <form
          onSubmit={handleSearch}
          className="flex items-center gap-2 w-full sm:w-auto"
        >
          <input
            type="text"
            placeholder="Search products..."
            value={searchText}
            onChange={(e) => setSearchText(e.target.value)}
            className="border border-gray-300 rounded-lg p-2 w-full sm:w-64"
          />
          <button
            type="submit"
            className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition"
          >
            Search
          </button>
        </form>
      </div>
    </nav>
  );
};
