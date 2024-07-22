import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useConfirmResetPassword } from "../hooks/useUserActions";
import { toast } from "react-toastify";
import { FaLock } from "react-icons/fa";
import styles from "../styles/ConfirmResetPassword.module.css";

const ConfirmResetPassword = () => {
  const { token, email } = useParams();
  const [newPassword, setNewPassword] = useState("");
  const confirmResetPassword = useConfirmResetPassword();
  const navigate = useNavigate();
  const [errorMessage, setErrorMessage] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMessage("");

    try {
      await confirmResetPassword.mutateAsync({ email, token, newPassword });
      toast.success("Password has been reset successfully.");
      navigate("/login");
    } catch (error) {
      const backendErrors = error.response?.data?.errors;
      if (backendErrors) {
        const formattedErrors = Object.values(backendErrors).flat().join(", ");
        setErrorMessage(formattedErrors);
      } else {
        setErrorMessage(
          error.response?.data?.message || "Failed to reset password."
        );
      }
      toast.error("Failed to reset password.");
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.resetContainer}>
        <h1 className={styles.header}>Reset Password</h1>
        <form onSubmit={handleSubmit}>
          <div className={styles.formGroup}>
            <label>
              New Password
              <div className={styles.icon}>
                <FaLock />
              </div>
              <input
                type="password"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                className={styles.inputField}
                required
              />
              {errorMessage && <p className={styles.error}>{errorMessage}</p>}
            </label>
          </div>
          <button type="submit" className={styles.button}>
            Reset Password
          </button>
        </form>
      </div>
    </div>
  );
};

export default ConfirmResetPassword;
