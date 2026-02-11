import { useState } from "react";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import Card from "../components/ui/Card";
import InputField from "../components/ui/InputField";
import Button from "../components/ui/Button";
import Alert from "../components/ui/Alert";
import { ClipLoader } from "react-spinners";

export default function Signup() {
  const { signupWithEmail } = useAuth();
  const navigate = useNavigate();

  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSignup = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);
    try {
      await signupWithEmail(username, email, password);
      navigate("/");
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Card className="max-w-md mx-auto mt-10 p-6">
      <h2 className="text-xl font-bold mb-4">Signup</h2>

      {error && <Alert type="error" message={error} />}

      <form className="flex flex-col space-y-4" onSubmit={handleSignup}>
        <InputField
          type="text"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          required
        />
        <InputField
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <InputField
          type="text"
          placeholder="Phone Number (optional)"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
        />
        <InputField
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />

        <Button type="submit">
          {loading ? (
            <ClipLoader size={20} color="#fff" loading={true} />
          ) : (
            "Signup"
          )}
        </Button>
      </form>
    </Card>
  );
}
