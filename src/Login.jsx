import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useLogin, useRedirectAuthenticatedUser } from "./useUserActions";
import { IoIosMail } from "react-icons/io";
import { FaLock } from "react-icons/fa";
import { toast } from "react-toastify";
import { useForm } from "react-hook-form";
import styles from "./Login.module.css";

const Login = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const { mutate: login, isLoading } = useLogin();
  const navigate = useNavigate();
  const [errorMessage, setErrorMessage] = useState("");

  useRedirectAuthenticatedUser("/user-info");

  const onSubmit = (data) => {
    setErrorMessage("");

    login(data, {
      onSuccess: () => {
        navigate("/user-info");
        toast.success("Login successful");
      },
      onError: (error) => {
        setErrorMessage(
          error.response?.data?.message || "Login failed. Please try again."
        );
      },
    });
  };

  return (
    <div className={styles.container}>
      <div className={styles.loginContainer}>
        <h1 className={styles.header}>Login</h1>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className={styles.formGroup}>
            <label>
              Username or Email
              <div className={styles.icon}>
                <IoIosMail />
              </div>
              <input
                type="text"
                {...register("identifier", {
                  required: "Identifier is required",
                })}
                className={styles.inputField}
              />
              {errors.identifier && (
                <p className={styles.error}>{errors.identifier.message}</p>
              )}
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
                {...register("password", { required: "Password is required" })}
                className={styles.inputField}
              />
              {errors.password && (
                <p className={styles.error}>{errors.password.message}</p>
              )}
            </label>
          </div>
          <div className={styles.actions}>
            <div className={styles.rememberMe}>
              <input type="checkbox" {...register("rememberMe")} />
              Remember me
            </div>
            <Link to="/request-reset-password" className={styles.link}>
              Forgot Password?
            </Link>
          </div>
          <button type="submit" className={styles.button} disabled={isLoading}>
            Login
          </button>
          {errorMessage && <p className={styles.error}>{errorMessage}</p>}
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
