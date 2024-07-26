import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  useLogin,
  useRedirectAuthenticatedUser,
} from "../hooks/useUserActions";
import { IoIosMail } from "react-icons/io";
import { FaLock } from "react-icons/fa";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import "@/index.css";
import TestComponent from "./TestComponent";

const Login = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const { mutate: login, isLoading } = useLogin();
  const navigate = useNavigate();
  const [errorMessage, setErrorMessage] = useState("");

  useRedirectAuthenticatedUser("/user-info");

  const onSubmit = (data) => {
    setErrorMessage("");

    login(data, {
      onSuccess: () => {
        navigate("/user-info");
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
    <div className="container mx-auto px-4">
      <Card className="max-w-sm mx-auto mt-10">
        <CardHeader>
          <CardTitle className="text-2xl">Login</CardTitle>
          <CardDescription>
            Enter your email below to login to your account.
          </CardDescription>
        </CardHeader>
        <form onSubmit={handleSubmit(onSubmit)}>
          <CardContent className="grid gap-4">
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
              <Link to="/request-reset-password" className="text-blue-500">
                Forgot Password?
              </Link>
            </div>
          </CardContent>
          <CardFooter>
            <Button type="submit" className="w-full" disabled={isLoading}>
              {isLoading ? "Loading..." : "Sign in"}
            </Button>
            {errorMessage && (
              <p className="text-red-500 text-center mt-4">{errorMessage}</p>
            )}
          </CardFooter>
        </form>
        <div className="text-center mt-4">
          Don&apos;t have an account?{" "}
          <Link to="/register" className="text-blue-500">
            Register
          </Link>
        </div>
      </Card>
      <TestComponent />
    </div>
  );
};

export default Login;
