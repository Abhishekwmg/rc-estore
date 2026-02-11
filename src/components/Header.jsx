import { useState } from "react";
import { useTheme } from "../context/ThemeContext";
import { useAuth } from "../context/AuthContext";
import { Link, NavLink, useNavigate } from "react-router-dom";
import {
  User,
  Moon,
  Sun,
  Rotate3d,
  ShoppingCart,
  Menu,
  X,
  Heart,
} from "lucide-react";
import { useSelector } from "react-redux";
import NavLinks from "../components/ui/NavLinks";

export const Header = () => {
  const { darkMode, dispatch } = useTheme();
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const cartItems = useSelector((state) => state.cart.items);
  const wishlistCount = useSelector((state) => state.wishlist.items.length);

  const cartCount = cartItems.length;
  const [menuOpen, setMenuOpen] = useState(false);

  const handleLogout = async () => {
    await logout();
    navigate("/login");
  };

  const username = user?.displayName || user?.email?.split("@")[0];
  const profileImage = user?.photoURL;

  return (
    <header
      className="px-4 sm:px-6 lg:px-12 py-4 flex items-center justify-between shadow transition-colors relative"
      style={{
        backgroundColor: "var(--header-bg)",
        color: "var(--header-text)",
      }}
    >
      <div className="flex items-center space-x-4 sm:space-x-6 flex-shrink-0">
        <h1 className="text-xl sm:text-2xl font-bold cursor-pointer">
          <Link to="/">
            <Rotate3d className="inline w-6 h-6 sm:w-7 sm:h-7 mr-1" />
            ORBIT
          </Link>
        </h1>
      </div>

      <button
        className="md:hidden flex items-center p-2 rounded hover:bg-gray-200 dark:hover:bg-gray-700"
        onClick={() => setMenuOpen(!menuOpen)}
      >
        {menuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
      </button>

      <div className="hidden md:flex items-center space-x-6">
        <nav className="flex space-x-4 lg:space-x-6">
          <NavLinks toPath="/products">Products</NavLinks>
          <NavLinks toPath="/contact">Contact</NavLinks>
        </nav>

        {!user && (
          <>
            <Link
              to="/login"
              className="px-3 py-2 rounded bg-[var(--button-bg)] text-[var(--button-text)]"
            >
              Login
            </Link>
            <Link
              to="/signup"
              className="px-3 py-2 rounded bg-[var(--button-bg)] text-[var(--button-text)]"
            >
              Signup
            </Link>
          </>
        )}

        {user && (
          <>
            <NavLinks toPath="/orders">Orders</NavLinks>
            <Link
              to="/cart"
              onClick={() => setMenuOpen(false)}
              className="relative px-3 py-2 rounded flex items-center justify-center bg-[var(--button-bg)] text-[var(--button-text)] hover:bg-[var(--button-hover-bg)] transition"
            >
              <ShoppingCart />
              {cartCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-green-900 text-white text-xs font-bold w-5 h-5 flex items-center justify-center rounded-full">
                  {cartCount}
                </span>
              )}
            </Link>
            <Link
              to="/wishlist"
              onClick={() => setMenuOpen(false)}
              className="relative px-3 py-2 rounded flex items-center justify-center bg-[var(--button-bg)] text-[var(--button-text)] hover:bg-[var(--button-hover-bg)] transition"
            >
              <Heart />

              {wishlistCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-red-700 text-white text-xs font-bold w-5 h-5 flex items-center justify-center rounded-full">
                  {wishlistCount}
                </span>
              )}
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
        <button
          onClick={() => dispatch({ type: "TOGGLE_THEME" })}
          style={{
            backgroundColor: "var(--button-bg)",
            color: "var(--button-text)",
          }}
          className="px-3 py-2 rounded"
        >
          {darkMode ? (
            <Sun className="w-5 h-5" />
          ) : (
            <Moon className="w-5 h-5" />
          )}
        </button>
      </div>

      {menuOpen && (
        <div
          className="absolute top-full left-0 w-full bg-var(--header-bg) text-var(--header-text) flex flex-col md:hidden p-4 space-y-3 shadow-md z-50"
          style={{
            backgroundColor: "var(--header-bg)",
            color: "var(--header-text)",
          }}
        >
          <nav className="flex flex-col space-y-2">
            <Link
              to="/products"
              onClick={() => setMenuOpen(false)}
              className="hover:text-indigo-500 transition-colors"
            >
              Products
            </Link>
            <Link
              to="/contact"
              onClick={() => setMenuOpen(false)}
              className="hover:text-indigo-500 transition-colors"
            >
              Contact
            </Link>
          </nav>

          {!user && (
            <div className="flex flex-col space-y-2">
              <Link
                to="/login"
                onClick={() => setMenuOpen(false)}
                style={{
                  backgroundColor: "var(--button-bg)",
                  color: "var(--button-text)",
                }}
                className="px-3 py-2 rounded text-center"
              >
                Login
              </Link>
              <Link
                to="/signup"
                onClick={() => setMenuOpen(false)}
                style={{
                  backgroundColor: "var(--button-bg)",
                  color: "var(--button-text)",
                }}
                className="px-3 py-2 rounded text-center"
              >
                Signup
              </Link>
            </div>
          )}

          {user && (
            <div className="flex flex-col space-y-2">
              <Link
                to="/orders"
                onClick={() => setMenuOpen(false)}
                className="hover:text-indigo-500 transition-colors"
              >
                Orders
              </Link>
              <Link
                to="/cart"
                onClick={() => setMenuOpen(false)}
                className="relative px-3 py-2 rounded flex items-center justify-center bg-[var(--button-bg)] text-[var(--button-text)] hover:bg-[var(--button-hover-bg)] transition"
              >
                <ShoppingCart />
                {cartCount > 0 && (
                  <span className="absolute -top-1 -right-1 bg-green-800 text-white text-xs font-bold w-5 h-5 flex items-center justify-center rounded-full">
                    {cartCount}
                  </span>
                )}
              </Link>
              <Link
                to="/wishlist"
                onClick={() => setMenuOpen(false)}
                className="relative px-3 py-2 rounded flex items-center justify-center bg-[var(--button-bg)] text-[var(--button-text)] hover:bg-[var(--button-hover-bg)] transition"
              >
                <Heart />

                {wishlistCount > 0 && (
                  <span className="absolute -top-1 -right-1 bg-red-700 text-white text-xs font-bold w-5 h-5 flex items-center justify-center rounded-full">
                    {wishlistCount}
                  </span>
                )}
              </Link>

              <button
                onClick={() => {
                  handleLogout();
                  setMenuOpen(false);
                }}
                style={{
                  backgroundColor: "var(--button-bg)",
                  color: "var(--button-text)",
                }}
                className="px-3 py-2 rounded text-center"
              >
                Logout
              </button>
            </div>
          )}

          <button
            onClick={() => dispatch({ type: "TOGGLE_THEME" })}
            style={{
              backgroundColor: "var(--button-bg)",
              color: "var(--button-text)",
            }}
            className="px-3 py-2 rounded text-center mt-2"
          >
            {darkMode ? (
              <Sun className="w-5 h-5 mx-auto" />
            ) : (
              <Moon className="w-5 h-5 mx-auto" />
            )}
          </button>
        </div>
      )}
    </header>
  );
};
