import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";

import { toast } from "react-toastify";
import { FaLock } from "react-icons/fa";
import {
  Card,
  CardHeader,
  CardContent,
  CardTitle,
  Input,
  Button,
} from "@/components/ui";
import { useConfirmResetPassword } from "@/hooks/useUserActions";

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
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <Card className="max-w-md w-full">
        <CardHeader>
          <CardTitle className="text-center">Reset Password</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit}>
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700">
                New Password
              </label>
              <div className="relative mt-1">
                <span className="absolute inset-y-0 left-0 pl-3 flex items-center text-gray-500">
                  <FaLock />
                </span>
                <Input
                  type="password"
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                  className="pl-10"
                  required
                />
              </div>
              {errorMessage && (
                <p className="mt-2 text-sm text-red-600">{errorMessage}</p>
              )}
            </div>
            <Button type="submit" className="w-full">
              Reset Password
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

export default ConfirmResetPassword;
