import { useState } from "react";
import { toast } from "react-toastify";
import "@/index.css";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useRequestResetPassword } from "@/hooks/useUserActions";

const RequestResetPassword = () => {
  const [email, setEmail] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [errors, setErrors] = useState({});
  const requestResetPassword = useRequestResetPassword();

  const validateEmail = () => {
    const errors = {};
    if (!email.match(/^[\w-]+@([\w-]+\.)+[\w-]{2,4}$/)) {
      errors.email = "Invalid email address.";
    }
    return errors;
  };

  const handleSubmit = async () => {
    const validationErrors = validateEmail();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }
    setErrors({});
    setErrorMessage("");

    try {
      await requestResetPassword.mutateAsync({ email });
      toast.success(
        "If an account with that email exists, a reset link has been sent."
      );
    } catch (error) {
      const backendErrors = error.response?.data?.errors;
      if (backendErrors) {
        const formattedErrors = Object.values(backendErrors).flat().join(", ");
        setErrorMessage(formattedErrors);
      } else {
        setErrorMessage(
          error.response?.data?.message || "Failed to send reset link."
        );
      }
      toast.error("Failed to send reset link.");
    }
  };

  return (
    <div className="space-y-4">
      <div>
        <label>Email</label>
        <Input
          name="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="user@example.com"
          type="email"
        />
        {errors.email && <p className="text-red-500">{errors.email}</p>}
      </div>
      {errorMessage && (
        <p className="text-red-500 text-center mt-4">{errorMessage}</p>
      )}
      <Button onClick={handleSubmit} className="w-full">
        Send Reset Link
      </Button>
    </div>
  );
};

export default RequestResetPassword;
