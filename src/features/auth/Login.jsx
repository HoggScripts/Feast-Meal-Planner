import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { IoIosMail } from "react-icons/io";
import { FaLock } from "react-icons/fa";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import "@/index.css";
import { useLogin } from "@/hooks/useUserActions";
import useTokenStore from "@/hooks/useTokenStore";

const Login = ({ onRegisterClick, onForgotPasswordClick, setIsLoginOpen }) => {
  const { token } = useTokenStore();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const { mutate: login, isLoading } = useLogin();
  const navigate = useNavigate();
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    if (token) {
      navigate("/landing-page");
    }
  }, [token, navigate]);

  const onSubmit = (data) => {
    setErrorMessage("");

    login(data, {
      onSuccess: () => {
        setIsLoginOpen(false);
        navigate("/landing-page");
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
            error.response?.data?.message || "Login failed. Please try again."
          );
        }
      },
    });
  };

  return (
    <div className="p-4">
      <div className="mb-4 text-center">
        <h2 className="text-2xl font-bold">Login</h2>
        <p>Enter your email below to login to your account.</p>
      </div>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="grid gap-4">
          <div className="grid gap-2">
            <Label htmlFor="identifier">Username or Email</Label>
            <div className="relative">
              <IoIosMail className="absolute top-1/2 transform -translate-y-1/2 left-3 text-gray-400" />
              <Input
                id="identifier"
                type="text"
                placeholder="user@example.com"
                {...register("identifier", {
                  required: "Identifier is required",
                })}
                className="pl-10"
              />
            </div>
            {errors.identifier && (
              <p className="text-red-500">{errors.identifier.message}</p>
            )}
          </div>
          <div className="grid gap-2">
            <Label htmlFor="password">Password</Label>
            <div className="relative">
              <FaLock className="absolute top-1/2 transform -translate-y-1/2 left-3 text-gray-400" />
              <Input
                id="password"
                type="password"
                {...register("password", {
                  required: "Password is required",
                })}
                className="pl-10"
              />
            </div>
            {errors.password && (
              <p className="text-red-500">{errors.password.message}</p>
            )}
          </div>
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <input
                type="checkbox"
                {...register("rememberMe")}
                className="mr-2"
              />
              <Label htmlFor="rememberMe">Remember me</Label>
            </div>
            <button
              type="button"
              onClick={onForgotPasswordClick}
              className="text-blue-500"
            >
              Forgot Password?
            </button>
          </div>
        </div>
        <div className="mt-4">
          <Button type="submit" className="w-full" disabled={isLoading}>
            {isLoading ? "Loading..." : "Sign in"}
          </Button>
          {errorMessage && (
            <p className="text-red-500 text-center mt-4">{errorMessage}</p>
          )}
        </div>
      </form>
      <div className="text-center mt-4">
        Don&apos;t have an account?{" "}
        <button
          type="button"
          onClick={onRegisterClick}
          className="text-blue-500"
        >
          Register
        </button>
      </div>
    </div>
  );
};

export default Login;
