import { createContext, useContext, useEffect, useReducer } from "react";
import { auth } from "../firebase/firebase";
import {
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signOut,
  signInWithPopup,
  updateProfile,
} from "firebase/auth";
import { googleProvider } from "../firebase/firebase";

const AuthContext = createContext();

const initialState = {
  user: null,
  loading: true,
};

const authReducer = (state, action) => {
  switch (action.type) {
    case "SET_USER":
      return { ...state, user: action.payload, loading: false };
    case "SET_LOADING":
      return { ...state, loading: action.payload };
    case "LOGOUT":
      return { ...state, user: null };
    default:
      return state;
  }
};

export const AuthProvider = ({ children }) => {
  const [state, dispatch] = useReducer(authReducer, initialState);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((currentUser) => {
      dispatch({ type: "SET_USER", payload: currentUser });
    });
    return () => unsubscribe();
  }, []);

  const loginWithEmail = async (email, password) => {
    try {
      const result = await signInWithEmailAndPassword(auth, email, password);
      dispatch({ type: "SET_USER", payload: result.user });
      return result.user;
    } catch (err) {
      console.error("Login failed:", err);
      throw new Error(err.message || "Login failed");
    }
  };

  const signupWithEmail = async (username, email, password) => {
    try {
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
      await updateProfile(userCredential.user, { displayName: username });
      dispatch({ type: "SET_USER", payload: userCredential.user });
      return userCredential.user;
    } catch (err) {
      console.error("Signup failed:", err);
      throw new Error(err.message || "Signup failed");
    }
  };

  const loginWithGoogle = async () => {
    try {
      const result = await signInWithPopup(auth, googleProvider);
      dispatch({ type: "SET_USER", payload: result.user });
      return result.user;
    } catch (err) {
      console.error("Google login failed:", err);
      throw new Error(err.message || "Google login failed");
    }
  };

  const logout = async () => {
    try {
      await signOut(auth);
      dispatch({ type: "LOGOUT" });
    } catch (err) {
      console.error("Logout failed:", err);
      throw new Error(err.message || "Logout failed");
    }
  };

  return (
    <AuthContext.Provider
      value={{
        user: state.user,
        loading: state.loading,
        loginWithEmail,
        signupWithEmail,
        loginWithGoogle,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
