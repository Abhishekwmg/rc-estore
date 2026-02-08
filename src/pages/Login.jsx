// import { useState } from "react";
// import { useAuth } from "../context/AuthContext";
// import { googleProvider } from "../firebase/firebase";
// import { useNavigate } from "react-router-dom";

// export default function Login() {
//   const { loginWithEmail, loginWithGoogle } = useAuth();
//   const navigate = useNavigate();

//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");
//   const [error, setError] = useState("");

//   const handleEmailLogin = async (e) => {
//     e.preventDefault();
//     setError("");
//     try {
//       await loginWithEmail(email, password);
//       navigate("/");
//     } catch (err) {
//       setError(err.message);
//     }
//   };

//   const handleGoogleLogin = async () => {
//     try {
//       await loginWithGoogle(googleProvider);
//       navigate("/");
//     } catch (err) {
//       setError(err.message);
//     }
//   };

//   return (
//     <div
//       className="max-w-md mx-auto mt-10 p-6 rounded shadow"
//       style={{ backgroundColor: "var(--card-bg)", color: "var(--card-text)" }}
//     >
//       <h2 className="text-xl font-bold mb-4">Login</h2>

//       {error && <p className="mb-2 text-red-500">{error}</p>}

//       <form onSubmit={handleEmailLogin} className="flex flex-col space-y-4">
//         <input
//           type="email"
//           placeholder="Email"
//           value={email}
//           onChange={(e) => setEmail(e.target.value)}
//           className="p-2 rounded"
//           style={{
//             backgroundColor: "var(--input-bg)",
//             color: "var(--input-text)",
//             borderColor: "var(--input-border)",
//           }}
//         />
//         <input
//           type="password"
//           placeholder="Password"
//           value={password}
//           onChange={(e) => setPassword(e.target.value)}
//           className="p-2 rounded"
//           style={{
//             backgroundColor: "var(--input-bg)",
//             color: "var(--input-text)",
//             borderColor: "var(--input-border)",
//           }}
//         />
//         <button type="submit">Login</button>
//       </form>

//       <div className="mt-4 flex flex-col space-y-2">
//         <button onClick={handleGoogleLogin}>Login with Google</button>
//       </div>
//     </div>
//   );
// }

// src/pages/Login.jsx
import { useState } from "react";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import Card from "../components/ui/Card";
import InputField from "../components/ui/InputField";
import Button from "../components/ui/Button";
import Alert from "../components/ui/Alert";

export default function Login() {
  const { loginWithEmail, loginWithGoogle } = useAuth();
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleEmailLogin = async (e) => {
    e.preventDefault();
    setError("");
    try {
      await loginWithEmail(email, password);
      navigate("/");
    } catch (err) {
      setError(err.message);
    }
  };

  const handleGoogleLogin = async () => {
    try {
      await loginWithGoogle();
      navigate("/");
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <Card className="max-w-md mx-auto mt-10 p-6">
      <h2 className="text-xl font-bold mb-4">Login</h2>

      {error && <Alert type="error" message={error} />}

      <form onSubmit={handleEmailLogin} className="flex flex-col space-y-4">
        <InputField
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <InputField
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />

        <Button type="submit">Login</Button>
      </form>

      <div className="mt-4 flex flex-col space-y-2">
        <Button type="button" onClick={handleGoogleLogin} variant="secondary">
          Login with Google
        </Button>
      </div>
    </Card>
  );
}
