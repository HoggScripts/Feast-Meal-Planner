import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useRegister } from "../hooks/useUserActions";
import { IoIosMail } from "react-icons/io";
import { FaLock, FaUser, FaRegUserCircle } from "react-icons/fa";
import { toast } from "react-toastify";
import { useForm } from "react-hook-form";
import styles from "../styles/Register.module.css";

const Register = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const { mutate: registerUser, isLoading } = useRegister();
  const navigate = useNavigate();
  const [errorMessage, setErrorMessage] = useState("");

  const onSubmit = (data) => {
    setErrorMessage(""); // Clear any previous error message

    registerUser(data, {
      onSuccess: () => {
        navigate("/login");
        toast.success(
          "Registration successful! Please check your email to confirm your account."
        );
      },
      onError: (error) => {
        const backendErrors = error.response?.data?.errors;
        if (backendErrors) {
          const formattedErrors = Object.values(backendErrors)
            .flat()
            .join(", ");
          setErrorMessage(formattedErrors);
        } else {
          setErrorMessage(
            error.response?.data?.message ||
              "Registration failed. Please try again."
          );
        }
        toast.error("Registration failed. Please try again.");
      },
    });
  };

  return (
    <div className={styles.container}>
      <div className={styles.loginContainer}>
        <h1 className={styles.header}>Register</h1>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className={styles.formGroup}>
            <label>
              Username
              <div className={styles.icon}>
                <FaUser />
              </div>
              <input
                type="text"
                {...register("username", { required: "Username is required" })}
                className={styles.inputField}
              />
              {errors.username && (
                <p className={styles.error}>{errors.username.message}</p>
              )}
            </label>
          </div>
          <div className={styles.formGroup}>
            <label>
              Email
              <div className={styles.icon}>
                <IoIosMail />
              </div>
              <input
                type="email"
                {...register("email", { required: "Email is required" })}
                className={styles.inputField}
              />
              {errors.email && (
                <p className={styles.error}>{errors.email.message}</p>
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
          <div className={styles.formGroup}>
            <label>
              First Name
              <div className={styles.icon}>
                <FaRegUserCircle />
              </div>
              <input
                type="text"
                {...register("firstName", {
                  required: "First Name is required",
                })}
                className={styles.inputField}
              />
              {errors.firstName && (
                <p className={styles.error}>{errors.firstName.message}</p>
              )}
            </label>
          </div>
          <div className={styles.formGroup}>
            <label>
              Last Name
              <div className={styles.icon}>
                <FaRegUserCircle />
              </div>
              <input
                type="text"
                {...register("lastName", { required: "Last Name is required" })}
                className={styles.inputField}
              />
              {errors.lastName && (
                <p className={styles.error}>{errors.lastName.message}</p>
              )}
            </label>
          </div>
          <button type="submit" className={styles.button} disabled={isLoading}>
            Register
          </button>
          {errorMessage && <p className={styles.error}>{errorMessage}</p>}
        </form>
        <div className={styles.footer}>
          Already have an account?{" "}
          <Link to="/login" className={styles.link}>
            Login here
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Register;
