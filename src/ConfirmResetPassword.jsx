import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useConfirmResetPassword } from "./useUserActions";
import { toast } from "react-toastify";
import { FaLock } from "react-icons/fa";
import styles from "./ConfirmResetPassword.module.css";

const ConfirmResetPassword = () => {
  const { token, email } = useParams();
  const [newPassword, setNewPassword] = useState("");
  const confirmResetPassword = useConfirmResetPassword();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("Sending token:", token);
    try {
      await confirmResetPassword.mutateAsync({ email, token, newPassword });
      toast.success("Password has been reset successfully.");
      navigate("/login");
    } catch (error) {
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
