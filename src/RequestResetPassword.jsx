// RequestResetPassword.jsx

import { useState } from "react";
import { useRequestResetPassword } from "./useUserActions";
import { toast } from "react-toastify";

const RequestResetPassword = () => {
  const [email, setEmail] = useState("");
  const requestResetPassword = useRequestResetPassword();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await requestResetPassword.mutateAsync({ email });
      toast.success(
        "If an account with that email exists, a reset link has been sent."
      );
    } catch (error) {
      toast.error("Failed to send reset link.");
    }
  };

  return (
    <div>
      <h1>Request Password Reset</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Email</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <button type="submit">Send Reset Link</button>
      </form>
    </div>
  );
};

export default RequestResetPassword;
