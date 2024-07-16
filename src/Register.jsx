import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useRegister } from "./useUserActions";
import { IoIosMail } from "react-icons/io";
import { FaLock, FaUser, FaRegUserCircle } from "react-icons/fa";
import { toast } from "react-toastify";
import styles from "./Register.module.css";

const Register = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const { mutate: register, isLoading, isError } = useRegister();
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    register(
      { username, email, password, firstName, lastName },
      {
        onSuccess: () => {
          navigate("/login");
          toast.success(
            "Registration successful! Please check your email to confirm your account."
          );
        },
      }
    );
  };

  return (
    <div className={styles.container}>
      <div className={styles.loginContainer}>
        <h1 className={styles.header}>Register</h1>
        <form onSubmit={handleSubmit}>
          <div className={styles.formGroup}>
            <label>
              Username
              <div className={styles.icon}>
                <FaUser />
              </div>
              <input
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className={styles.inputField}
                required
              />
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
                value={email}
                onChange={(e) => setEmail(e.target.value)}
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
          <div className={styles.formGroup}>
            <label>
              First Name
              <div className={styles.icon}>
                <FaRegUserCircle />
              </div>
              <input
                type="text"
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
                className={styles.inputField}
                required
              />
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
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
                className={styles.inputField}
                required
              />
            </label>
          </div>
          <button type="submit" className={styles.button} disabled={isLoading}>
            Register
          </button>
          {isError && <p>Registration failed. Please try again.</p>}
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
