import {
  createBrowserRouter,
  RouterProvider,
  Navigate,
} from "react-router-dom";
import { ThemeProvider } from "./context/ThemeContext";
import { Layout } from "./components/Layout";

import Home from "./pages/Home";
import ProductDetail from "./pages/ProductDetail";
import Cart from "./pages/Cart";
import Checkout from "./pages/Checkout";
import Login from "./pages/Login";
import { AuthProvider } from "./context/AuthContext";
import Signup from "./pages/Signup";
import Products from "./pages/Products";
import { ProtectedRoute } from "./components/ProtectedRoute";

// const router = createBrowserRouter([
//   {
//     path: "/",
//     element: <Layout />,
//     children: [
//       { index: true, element: <Home /> },
//       { path: "/product/:id", element: <ProductDetail /> },
//       {
//         path: "/cart",
//         element: (
//           <ProtectedRoute>
//             <Cart />
//           </ProtectedRoute>
//         ),
//       },
//       {
//         path: "/checkout",
//         element: (
//           <ProtectedRoute>
//             <Checkout />
//           </ProtectedRoute>
//         ),
//       },
//       {
//         path: "/products",
//         element: <Products />,
//       },
//       { path: "/login", element: <Login /> },
//       { path: "/signup", element: <Signup /> },
//     ],
//   },
// ]);

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      { index: true, element: <Home /> },
      { path: "/product/:id", element: <ProductDetail /> },
      {
        path: "/cart",
        element: (
          <ProtectedRoute>
            <Cart />
          </ProtectedRoute>
        ),
      },
      {
        path: "/checkout",
        element: (
          <ProtectedRoute>
            <Checkout />
          </ProtectedRoute>
        ),
      },
      { path: "/products", element: <Products /> },
      { path: "/login", element: <Login /> },
      { path: "/signup", element: <Signup /> },
    ],
  },
]);

export default function App() {
  return (
    <ThemeProvider>
      <AuthProvider>
        <RouterProvider router={router} />
      </AuthProvider>
    </ThemeProvider>
  );
}
