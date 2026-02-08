import { createContext, useContext, useReducer, useEffect } from "react";

const ThemeContext = createContext();

const initialState = {
  darkMode: localStorage.getItem("darkMode") === "true" || false,
};

const themeReducer = (state, action) => {
  switch (action.type) {
    case "TOGGLE_THEME":
      return { darkMode: !state.darkMode };
    default:
      return state;
  }
};

export const ThemeProvider = ({ children }) => {
  const [state, dispatch] = useReducer(themeReducer, initialState);

  useEffect(() => {
    const html = document.documentElement;
    html.setAttribute("data-theme", state.darkMode ? "dark" : "light");
    localStorage.setItem("darkMode", state.darkMode);
  }, [state.darkMode]);

  return (
    <ThemeContext.Provider value={{ darkMode: state.darkMode, dispatch }}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => useContext(ThemeContext);
