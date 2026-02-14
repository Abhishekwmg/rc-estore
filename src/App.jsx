import { RouterProvider } from "react-router-dom";
import { ThemeProvider } from "./context/ThemeContext";
import { AuthProvider } from "./context/AuthContext";
import { router } from "./routes/AppRoutes";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer } from "react-toastify";

export default function App() {
  return (
    <ThemeProvider>
      <AuthProvider>
        <ToastContainer
          position="bottom-right"
          autoClose={1500}
          hideProgressBar={true}
          newestOnTop={false}
          rtl={false}
        />
        <RouterProvider router={router} />
      </AuthProvider>
    </ThemeProvider>
  );
}
