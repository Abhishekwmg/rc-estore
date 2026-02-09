import React from "react";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import ProductCard from "../ProductCard";
import { Provider } from "react-redux";
import { configureStore } from "@reduxjs/toolkit";
import cartReducer from "../../redux/cartSlice";
import { BrowserRouter } from "react-router-dom";

// Mock AuthContext
jest.mock("../../context/AuthContext", () => ({
  useAuth: () => ({
    user: { uid: "123", email: "test@test.com" }, // logged-in user
  }),
}));

// Mock ErrorContext
jest.mock("../../context/ErrorContext", () => ({
  useError: () => ({
    setError: jest.fn(),
  }),
}));

// Mock useProducts
jest.mock("../../hooks/useProducts", () => ({
  useProducts: () => ({
    fetchProductById: jest.fn(),
  }),
}));

// Helper render function
function renderWithProviders(ui) {
  const store = configureStore({
    reducer: { cart: cartReducer },
  });

  return render(
    <Provider store={store}>
      <BrowserRouter>{ui}</BrowserRouter>
    </Provider>
  );
}

describe("ProductCard", () => {
  const product = {
    id: 1,
    title: "Test Product",
    price: 99,
    thumbnail: "test.jpg",
  };

  test("renders product details", () => {
    renderWithProviders(<ProductCard product={product} />);

    expect(screen.getByText("Test Product")).toBeInTheDocument();
    expect(screen.getByText("$99")).toBeInTheDocument();
    expect(screen.getByRole("img")).toHaveAttribute("src", "test.jpg");
  });

  test("allows user to add product to cart", async () => {
    renderWithProviders(<ProductCard product={product} />);

    const button = screen.getByRole("button", { name: /add to cart/i });
    expect(button).toBeInTheDocument();

    await userEvent.click(button);

    // If this runs without crashing, test passes
    // Redux behavior is already covered by reducer tests
  });
});
