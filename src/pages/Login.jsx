import { useState } from "react";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import Card from "../components/ui/Card";
import InputField from "../components/ui/InputField";
import Button from "../components/ui/Button";
import Alert from "../components/ui/Alert";
import googleIcon from "../assets/google.png";
import { ClipLoader } from "react-spinners";

export default function Login() {
  const { loginWithEmail, loginWithGoogle } = useAuth();
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleEmailLogin = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      await loginWithEmail(email, password);
      navigate("/");
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleLogin = async () => {
    setError("");
    setLoading(true);
    try {
      await loginWithGoogle();
      navigate("/");
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };
  return (
    <Card className="max-w-md w-full mx-auto mt-10 p-6 sm:p-8 md:p-10">
      <h2 className="text-xl sm:text-2xl font-bold mb-4 text-center">Login</h2>
      {error && <Alert type="error" message={error} />}
      {loading && (
        <p className="text-center text-sm text-gray-500 mb-4">
          Logging you in...
        </p>
      )}

      <form onSubmit={handleEmailLogin} className="flex flex-col space-y-4">
        <InputField
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          className="w-full text-sm sm:text-base"
        />
        <InputField
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          className="w-full text-sm sm:text-base"
        />
        <div className="mt-4 flex justify-center gap-2">
          <Button
            type="submit"
            className="px-4 py-2 text-sm flex-1 sm:flex-none"
            disabled={loading}
          >
            {loading ? (
              <ClipLoader size={20} color="#fff" loading={true} />
            ) : (
              "Login"
            )}
          </Button>
          <Button
            type="button"
            onClick={handleGoogleLogin}
            variant="secondary"
            disabled={loading}
            className="px-4 py-2 text-sm flex-1 sm:flex-none flex items-center justify-center gap-2"
          >
            <img
              src={googleIcon}
              alt="login-with-google"
              className="w-4 h-4 sm:w-5 sm:h-5"
            />
            Login with Google
          </Button>
        </div>
      </form>
    </Card>
  );
}
