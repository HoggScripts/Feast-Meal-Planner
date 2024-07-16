// ConfirmResetPassword.jsx
import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useConfirmResetPassword } from "./useUserActions";
import { toast } from "react-toastify";

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
    <div>
      <h1>Reset Password</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label>New Password</label>
          <input
            type="password"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
            required
          />
        </div>
        <button type="submit">Reset Password</button>
      </form>
    </div>
  );
};

export default ConfirmResetPassword;
