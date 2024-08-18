import { useState } from "react";
import { Button } from "@nextui-org/react";
import { Link, useLocation } from "react-router-dom";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import Login from "../auth/Login";
import Register from "../auth/Register";
import RequestResetPassword from "../auth/RequestResetPassword";
import useTokenStore from "@/stores/useTokenStore";
import { useLogout } from "@/hooks/useUserActions";
import LinkGoogleCalendarButton from "../auth/LinkGoogleCalendarButton";

const NavigationBar = ({ isLoginOpen, setIsLoginOpen }) => {
  const location = useLocation();
  const links = [
    { to: "/landing-page", label: "Home" },
    { to: "/create-recipes", label: "Create Recipes" },
    { to: "/view-recipes", label: "View Recipes" },
    { to: "/plan-meals", label: "Plan Meals" },
    { to: "/user-profile", label: "My Profile" },
  ];

  const { token } = useTokenStore();

  const [isRegisterOpen, setIsRegisterOpen] = useState(false);
  const [isResetPasswordOpen, setIsResetPasswordOpen] = useState(false);

  const logout = useLogout();

  const handleLogout = () => {
    logout.mutate(); // Trigger the logout mutation
  };

  return (
    <nav className="bg-white text-white  top-0 left-0 w-full z-50">
      <div className="mx-auto flex items-center justify-between px-10 py-4">
        {/* Logo on the left */}
        <div className="flex items-center">
          <img src="Logo.png" alt="Logo" className="h-12 w-auto" />
        </div>

        {/* Links in the middle */}
        <div className="flex space-x-8 text-lg">
          {links.map((link) => (
            <Link
              key={link.to}
              to={link.to}
              className={`hover:text-blueprimary ${
                location.pathname === link.to
                  ? "font-bold text-blueprimary"
                  : "text-slate-600"
              }`}
            >
              {link.label}
            </Link>
          ))}
        </div>

        {/* Login/Logout button and Google Calendar link on the right */}
        <div className="flex items-center space-x-4">
          {token ? (
            <>
              <LinkGoogleCalendarButton />
              <Button
                size="sm"
                onClick={handleLogout}
                className="bg-blueprimary text-bold text-white hover:bg-bluesecondary"
              >
                Logout
              </Button>
            </>
          ) : (
            <Button
              onClick={() => setIsLoginOpen(true)}
              className="bg-blueprimary text-bold text-white hover:bg-bluesecondary"
            >
              Login
            </Button>
          )}
        </div>
      </div>
      <div className="border-b border-1 border-bluesecondary"></div>{" "}
      {/* Thin bottom border */}
      {/* Login Dialog */}
      <Dialog open={isLoginOpen} onOpenChange={setIsLoginOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Login</DialogTitle>
            <DialogDescription>
              Enter your credentials to log in.
            </DialogDescription>
          </DialogHeader>
          <Login
            setIsLoginOpen={setIsLoginOpen}
            onRegisterClick={() => {
              setIsLoginOpen(false);
              setIsRegisterOpen(true);
            }}
            onForgotPasswordClick={() => {
              setIsLoginOpen(false);
              setIsResetPasswordOpen(true);
            }}
          />
        </DialogContent>
      </Dialog>
      {/* Register Dialog */}
      <Dialog open={isRegisterOpen} onOpenChange={setIsRegisterOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Register</DialogTitle>
            <DialogDescription>
              Fill in the form below to create an account.
            </DialogDescription>
          </DialogHeader>
          <Register />
        </DialogContent>
      </Dialog>
      {/* Reset Password Dialog */}
      <Dialog open={isResetPasswordOpen} onOpenChange={setIsResetPasswordOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Request Password Reset</DialogTitle>
            <DialogDescription>
              Enter your email below to receive a reset link.
            </DialogDescription>
          </DialogHeader>
          <RequestResetPassword />
        </DialogContent>
      </Dialog>
    </nav>
  );
};

export default NavigationBar;
