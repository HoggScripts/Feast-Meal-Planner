import { useState } from "react";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import "@/index.css"; // Ensure your global styles are imported

import { Button } from "@/components/ui/button";
import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useRequestResetPassword } from "@/hooks/useUserActions";

// Define the form schema using zod
const formSchema = z.object({
  email: z
    .string()
    .email("Invalid email address.")
    .nonempty("Email is required."),
});

const RequestResetPassword = () => {
  const [errorMessage, setErrorMessage] = useState("");
  const requestResetPassword = useRequestResetPassword();

  // Initialize the form with react-hook-form and zodResolver
  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
    },
  });

  const handleSubmit = async (data) => {
    setErrorMessage(""); // Clear previous error message
    try {
      await requestResetPassword.mutateAsync({ email: data.email });
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
    <div className="container">
      <div className="request-container">
        <h1 className="header">Request Password Reset</h1>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(handleSubmit)}>
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input
                      type="email"
                      placeholder="m@example.com"
                      required
                      {...field} // Ensure to spread the field props
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button type="submit">Send Reset Link</Button>
            {errorMessage && <p className="error">{errorMessage}</p>}
          </form>
        </Form>
        <div className="footer">
          <Link to="/login" className="link">
            Back to Login
          </Link>
        </div>
      </div>
    </div>
  );
};

export default RequestResetPassword;
