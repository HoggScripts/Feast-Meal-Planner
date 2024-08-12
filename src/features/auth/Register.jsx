import { useState } from "react";
import { toast } from "react-toastify";
import "@/index.css";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useRegister } from "@/hooks/useUserActions";

const Register = () => {
  const { mutate: registerUser, isLoading } = useRegister();
  const [errorMessage, setErrorMessage] = useState("");
  const [formValues, setFormValues] = useState({
    username: "",
    email: "",
    password: "",
    firstName: "",
    lastName: "",
  });
  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormValues({ ...formValues, [name]: value });
  };

  const validateForm = () => {
    const errors = {};
    if (formValues.username.length < 2) {
      errors.username = "Username must be at least 2 characters.";
    }
    if (!formValues.email.match(/^[\w-]+@([\w-]+\.)+[\w-]{2,4}$/)) {
      errors.email = "Invalid email address.";
    }
    if (formValues.password.length < 6) {
      errors.password = "Password must be at least 6 characters.";
    }
    if (!formValues.firstName) {
      errors.firstName = "First Name is required.";
    }
    if (!formValues.lastName) {
      errors.lastName = "Last Name is required.";
    }
    return errors;
  };

  const onSubmit = () => {
    const validationErrors = validateForm();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }
    setErrors({});
    setErrorMessage("");

    registerUser(formValues, {
      onSuccess: () => {
        toast.success(
          "Registration successful! Please check your email to confirm your account."
        );
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
            error.response?.data?.message ||
              "Registration failed. Please try again."
          );
        }
        toast.error("Registration failed. Please try again.");
      },
    });
  };

  return (
    <div className="space-y-4">
      <div>
        <label>Username</label>
        <Input
          name="username"
          value={formValues.username}
          onChange={handleChange}
          placeholder="John Doe"
        />
        {errors.username && <p className="text-red-500">{errors.username}</p>}
      </div>
      <div>
        <label>Email</label>
        <Input
          name="email"
          value={formValues.email}
          onChange={handleChange}
          placeholder="user@example.com"
          type="email"
        />
        {errors.email && <p className="text-red-500">{errors.email}</p>}
      </div>
      <div>
        <label>Password</label>
        <Input
          name="password"
          value={formValues.password}
          onChange={handleChange}
          placeholder="********"
          type="password"
        />
        {errors.password && <p className="text-red-500">{errors.password}</p>}
      </div>
      <div>
        <label>First Name</label>
        <Input
          name="firstName"
          value={formValues.firstName}
          onChange={handleChange}
          placeholder="John"
        />
        {errors.firstName && <p className="text-red-500">{errors.firstName}</p>}
      </div>
      <div>
        <label>Last Name</label>
        <Input
          name="lastName"
          value={formValues.lastName}
          onChange={handleChange}
          placeholder="Doe"
        />
        {errors.lastName && <p className="text-red-500">{errors.lastName}</p>}
      </div>
      {errorMessage && (
        <p className="text-red-500 text-center mt-4">{errorMessage}</p>
      )}
      <Button onClick={onSubmit} className="w-full" disabled={isLoading}>
        {isLoading ? "Loading..." : "Register"}
      </Button>
    </div>
  );
};

export default Register;
