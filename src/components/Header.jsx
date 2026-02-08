import { useTheme } from "../context/ThemeContext";
import { useAuth } from "../context/AuthContext";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { User } from "lucide-react";
import { useState } from "react";
import { useSelector } from "react-redux";

export const Header = () => {
  const { darkMode, dispatch } = useTheme();
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const cartItems = useSelector((state) => state.cart.items);
  const cartCount = cartItems.reduce((acc, item) => acc + item.quantity, 0);

  const [searchQuery, setSearchQuery] = useState("");

  const handleLogout = async () => {
    await logout();
    navigate("/login");
  };

  const username = user?.displayName || user?.email?.split("@")[0];
  const profileImage = user?.photoURL;

  const handleSearch = (e) => {
    e.preventDefault();
    if (!searchQuery.trim()) return;
    // Navigate to homepage with search query
    navigate(`/?search=${encodeURIComponent(searchQuery)}`);
    setSearchQuery("");
  };

  return (
    <header
      className="px-6 py-6 flex items-center justify-between shadow transition-colors"
      style={{
        backgroundColor: "var(--header-bg)",
        color: "var(--header-text)",
      }}
    >
      {/* LEFT: Logo */}
      <div className="flex items-center space-x-6">
        <h1 className="text-2xl font-bold cursor-pointer">
          <Link to="/">Mini E-Commerce</Link>
        </h1>

        {/* NAVIGATION MENU */}
        <nav className="hidden md:flex space-x-4">
          <Link to="/" className="hover:text-indigo-500 transition-colors">
            Home
          </Link>
          <Link
            to="/products"
            className="hover:text-indigo-500 transition-colors"
          >
            Products
          </Link>
          <Link
            to="/contact"
            className="hover:text-indigo-500 transition-colors"
          >
            Contact
          </Link>
        </nav>
      </div>

      {/* RIGHT: Auth buttons / Cart / Theme */}
      <div className="flex items-center space-x-4">
        {!user && (
          <>
            <Link
              to="/login"
              style={{
                backgroundColor: "var(--button-bg)",
                color: "var(--button-text)",
              }}
              className="px-3 py-2 rounded"
            >
              Login
            </Link>
            <Link
              to="/signup"
              style={{
                backgroundColor: "var(--button-bg)",
                color: "var(--button-text)",
              }}
              className="px-3 py-2 rounded"
            >
              Signup
            </Link>
          </>
        )}

        {user && (
          <>
            <Link
              to="/cart"
              className="px-3 py-2 rounded bg-green-600 text-white"
            >
              Cart ({cartCount})
            </Link>
            <Link
              to="/orders"
              className="hover:text-indigo-500 transition-colors"
            >
              Orders
            </Link>

            <div className="flex items-center space-x-2">
              {profileImage ? (
                <img
                  src={profileImage}
                  alt="Profile"
                  className="w-8 h-8 rounded-full"
                />
              ) : (
                <User className="w-6 h-6" />
              )}
              <span>{username}</span>
            </div>

            <button
              onClick={handleLogout}
              style={{
                backgroundColor: "var(--button-bg)",
                color: "var(--button-text)",
              }}
              className="px-3 py-2 rounded"
            >
              Logout
            </button>
          </>
        )}

        {/* Theme toggle always */}
        <button
          onClick={() => dispatch({ type: "TOGGLE_THEME" })}
          style={{
            backgroundColor: "var(--button-bg)",
            color: "var(--button-text)",
          }}
          className="px-3 py-2 rounded"
        >
          {darkMode ? "Light" : "Dark"}
        </button>
      </div>
    </header>
  );
};
