// useUserActions.js

import { useQuery, useMutation } from "@tanstack/react-query";
import {
  fetchUserInfo,
  fetchProtectedData,
  loginUser,
  registerUser,
} from "./userApi";
import { useState } from "react";
import useTokenStore from "./useTokenStore";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

export const useFetchUserInfo = () => {
  return useQuery({
    queryKey: ["userInfo"],
    queryFn: fetchUserInfo,
    staleTime: 1,
    cacheTime: 0,
  });
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

export const useLogin = () => {
  const setToken = useTokenStore((state) => state.setToken);

  const mutation = useMutation({
    mutationFn: loginUser,
    onSuccess: (data) => {
      setToken(data.accessToken);
      toast.success("Login successful!");
    },
    onError: (error) => {
      toast.error(error.response?.data?.message || "Login failed");
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
