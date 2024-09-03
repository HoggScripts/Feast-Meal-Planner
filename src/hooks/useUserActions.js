import { useQuery, useMutation } from "@tanstack/react-query";
import { useState } from "react";
import useTokenStore from "../stores/useTokenStore";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import {
  confirmResetPassword,
  fetchProtectedData,
  fetchUserInfo,
  loginUser,
  logoutUser,
  registerUser,
  requestResetPassword,
  updateMealTimes,
  deleteUser,
} from "@/lib/userApi";
import useMealPlanStore from "@/stores/useMealPlanStore";

export const useFetchUserInfo = () => {
  return useQuery({
    queryKey: ["userInfo"],
    queryFn: fetchUserInfo,
    staleTime: 100,
    cacheTime: 1000,
  });
};

export const useDeleteUser = () => {
  const navigate = useNavigate();
  const clearToken = useTokenStore((state) => state.clearToken);

  const mutation = useMutation({
    mutationFn: deleteUser,
    onSuccess: () => {
      useMealPlanStore.getState().clearSchedule(); // Clear any state related to the user
      clearToken(); // Clear the token
      toast.success("Your account has been deleted successfully.");
      navigate("/"); // Redirect to the homepage or another appropriate route
    },
    onError: (error) => {
      toast.error(error.response?.data?.message || "Failed to delete account.");
    },
  });

  return mutation;
};

export const useFetchProtectedData = () => {
  const [protectedData, setProtectedData] = useState(null);

  const mutation = useMutation({
    mutationFn: fetchProtectedData,
    onSuccess: (data) => {
      setProtectedData(data);
    },
    onError: (error) => {
      console.error("Error accessing protected endpoint", error);
      setProtectedData("Access denied");
    },
  });

  return { protectedData, fetchProtectedData: mutation.mutate };
};

export const useUpdateMealTimes = () => {
  return useMutation({
    mutationFn: updateMealTimes,
    onSuccess: () => {
      toast.success("Meal times updated successfully.");
    },
    onError: (error) => {
      toast.error(
        error.response?.data?.message || "Failed to update meal times."
      );
    },
  });
};

export const useLogin = () => {
  const setToken = useTokenStore((state) => state.setToken);

  const mutation = useMutation({
    mutationFn: loginUser,
    onSuccess: (data) => {
      setToken(data.accessToken);
      toast.success("Login successful!");
      console.log("Login successful, token set:", data.accessToken);
    },
    onError: (error) => {
      toast.error(error.response?.data?.message || "Login failed");
    },
  });

  return mutation;
};

export const useLogout = () => {
  const clearToken = useTokenStore((state) => state.clearToken);

  const mutation = useMutation({
    mutationFn: logoutUser,
    onSuccess: () => {
      useMealPlanStore.getState().clearSchedule();
      clearToken();

      toast.success("Logout successful!");
      console.log("Logout successful, token cleared");
    },
    onError: (error) => {
      toast.error(error.response?.data?.message || "Logout failed");
    },
  });

  return mutation;
};

export const useRegister = () => {
  const navigate = useNavigate();

  const mutation = useMutation({
    mutationFn: registerUser,
    onSuccess: () => {
      toast.success(
        "Registration successful! Please check your email to confirm your account."
      );
      navigate("/login");
    },
    onError: (error) => {
      toast.error(error.response?.data?.message || "Registration failed");
    },
  });

  return mutation;
};

export const useRequestResetPassword = () => {
  return useMutation({
    mutationFn: requestResetPassword,
    onSuccess: () => {
      toast.success(
        "If an account with that email exists, a reset link has been sent."
      );
    },
    onError: (error) => {
      toast.error(
        error.response?.data?.message || "Failed to send reset link."
      );
    },
  });
};

export const useConfirmResetPassword = () => {
  return useMutation({
    mutationFn: confirmResetPassword,
    onSuccess: () => {
      toast.success("Password has been reset successfully.");
    },
    onError: (error) => {
      toast.error(error.response?.data?.message || "Failed to reset password.");
    },
  });
};
