import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useLogin } from "./useUserActions"; // Import the consolidated hook
import { toast } from "react-toastify";

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const { mutate: login, isLoading, isError } = useLogin();

  const handleSubmit = (e) => {
    e.preventDefault();
    login(
      { username, password },
      {
        onSuccess: () => {
          // Navigate to the user info page
          navigate("/user-info");
          toast.success("Login successful");
        },
      }
    );
  };

  return (
    <div>
      <h1>Login</h1>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          placeholder="Username"
          required
        />
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Password"
          required
        />
        <button type="submit" disabled={isLoading}>
          Login
        </button>
        {isError && <p>Login failed. Please try again.</p>}
      </form>
    </div>
  );
};

export default Login;
