import { Suspense, lazy } from "react";
import {
  createBrowserRouter,
  RouterProvider,
  Navigate,
} from "react-router-dom";
import { ThemeProvider } from "./context/ThemeContext";
import { Layout } from "./components/Layout";
import ProtectedRoute from "./components/ProtectedRoute";
import { AuthProvider } from "./context/AuthContext";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer } from "react-toastify";

const Products = lazy(() => import("./pages/Products"));
const ProductDetail = lazy(() => import("./pages/ProductDetail"));
const Cart = lazy(() => import("./pages/Cart"));
const Checkout = lazy(() => import("./pages/Checkout"));
const Login = lazy(() => import("./pages/Login"));
const Signup = lazy(() => import("./pages/Signup"));
const Orders = lazy(() => import("./pages/Orders"));
const Contact = lazy(() => import("./pages/Contact"));
const PageLoader = lazy(() => import("./components/PageLoader"));
const WishList = lazy(()=> import("./pages/WishList"));

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      {
        index: true,
        element: (
          <Suspense fallback={<PageLoader />}>
            <Products />
          </Suspense>
        ),
      },
      {
        path: "/product/:id",
        element: (
          <Suspense fallback={<PageLoader />}>
            <ProductDetail />
          </Suspense>
        ),
      },
      {
        path: "/cart",
        element: (
          <Suspense fallback={<PageLoader />}>
            <ProtectedRoute>
              <Cart />
            </ProtectedRoute>
          </Suspense>
        ),
      },
      {
        path: "/wishlist",
        element: (
          <Suspense fallback={<PageLoader />}>
            <ProtectedRoute>
              <WishList />
            </ProtectedRoute>
          </Suspense>
        ),
      },
      {
        path: "/orders",
        element: (
          <Suspense fallback={<PageLoader />}>
            <ProtectedRoute>
              <Orders />
            </ProtectedRoute>
          </Suspense>
        ),
      },
      {
        path: "/checkout",
        element: (
          <Suspense fallback={<PageLoader />}>
            <ProtectedRoute>
              <Checkout />
            </ProtectedRoute>
          </Suspense>
        ),
      },
      {
        path: "/products",
        element: (
          <Suspense fallback={<PageLoader />}>
            <Products />
          </Suspense>
        ),
      },
      {
        path: "/contact",
        element: (
          <Suspense fallback={<PageLoader />}>
            <Contact />
          </Suspense>
        ),
      },
      {
        path: "/login",
        element: (
          <Suspense fallback={<PageLoader />}>
            <Login />
          </Suspense>
        ),
      },
      {
        path: "/signup",
        element: (
          <Suspense fallback={<PageLoader />}>
            <Signup />
          </Suspense>
        ),
      },
      {
        path: "*",
        element: <Navigate to="/products" replace />,
      },
    ],
  },
]);

export default function App() {
  return (
    <ThemeProvider>
      <AuthProvider>
        <ToastContainer
          position="top-center"
          autoClose={2000}
          hideProgressBar={false}
          newestOnTop={false}
          rtl={false}
          pauseOnFocusLoss
          pauseOnHover
        />
        <RouterProvider router={router} />
      </AuthProvider>
    </ThemeProvider>
  );
}
