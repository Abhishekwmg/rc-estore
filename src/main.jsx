import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { Provider } from "react-redux";
import { store } from "./redux/store";
import ErrorBoundary from "./components/ErrorBoundary.jsx";
import { ErrorProvider } from "./context/ErrorContext.jsx";
import GlobalError from "./components/GlobalError.jsx";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <ErrorProvider>
      <ErrorBoundary>
        <GlobalError />
        <Provider store={store}>
          <App />
        </Provider>
      </ErrorBoundary>
    </ErrorProvider>
  </StrictMode>,
);
