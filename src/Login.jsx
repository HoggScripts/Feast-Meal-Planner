import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useLogin, useRedirectAuthenticatedUser } from "./useUserActions";
import { IoIosMail } from "react-icons/io";
import { FaLock } from "react-icons/fa";
import { toast } from "react-toastify";
import styles from "./Login.module.css";

const Login = () => {
  const [identifier, setIdentifier] = useState(""); // Renamed to identifier
  const [password, setPassword] = useState("");
  const [rememberMe, setRememberMe] = useState(false);
  const [errorMessage, setErrorMessage] = useState(""); // Add error message state
  const navigate = useNavigate();
  const { mutate: login, isLoading, isError } = useLogin();

  useRedirectAuthenticatedUser("/user-info"); // Call the hook here

  const handleSubmit = (e) => {
    e.preventDefault();
    setErrorMessage(""); // Clear error message before new login attempt
    login(
      { identifier, password, rememberMe }, // Changed username to identifier
      {
        onSuccess: () => {
          navigate("/user-info");
          toast.success("Login successful");
        },
        onError: (error) => {
          setErrorMessage(
            error.response?.data?.message || "Login failed. Please try again."
          );
        },
      }
    );
  };

  return (
    <div className={styles.container}>
      <div className={styles.loginContainer}>
        <h1 className={styles.header}>Login</h1>
        <form onSubmit={handleSubmit}>
          <div className={styles.formGroup}>
            <label>
              Username or Email
              <div className={styles.icon}>
                <IoIosMail />
              </div>
              <input
                type="text"
                value={identifier}
                onChange={(e) => setIdentifier(e.target.value)}
                className={styles.inputField}
                required
              />
            </label>
          </div>
          <div className={styles.formGroup}>
            <label>
              Password
              <div className={styles.icon}>
                <FaLock />
              </div>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className={styles.inputField}
                required
              />
            </label>
          </div>
          <div className={styles.actions}>
            <div className={styles.rememberMe}>
              <input
                type="checkbox"
                checked={rememberMe}
                onChange={(e) => setRememberMe(e.target.checked)}
              />
              Remember me
            </div>
            <Link to="/request-reset-password" className={styles.link}>
              Forgot Password?
            </Link>
          </div>
          <button type="submit" className={styles.button} disabled={isLoading}>
            Login
          </button>
          {isError && <p className={styles.errorMessage}>{errorMessage}</p>}
        </form>
        <div className={styles.footer}>
          Don&apos;t have an account?{" "}
          <Link to="/register" className={styles.link}>
            Register
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Login;
