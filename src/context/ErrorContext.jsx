import { createContext, useContext, useReducer } from "react";

const ErrorContext = createContext();

const initialState = {
  error: null,
};

const errorReducer = (state, action) => {
  switch (action.type) {
    case "SET_ERROR":
      return { ...state, error: action.payload };
    case "CLEAR_ERROR":
      return { ...state, error: null };
    default:
      return state;
  }
};

export const ErrorProvider = ({ children }) => {
  const [state, dispatch] = useReducer(errorReducer, initialState);

  const setError = (error) => dispatch({ type: "SET_ERROR", payload: error });
  const clearError = () => dispatch({ type: "CLEAR_ERROR" });

  return (
    <ErrorContext.Provider value={{ error: state.error, setError, clearError }}>
      {children}
    </ErrorContext.Provider>
  );
};

export const useError = () => useContext(ErrorContext);
