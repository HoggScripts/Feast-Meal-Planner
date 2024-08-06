import { useLogout } from "@/hooks/useUserActions";
import { Button } from "@nextui-org/react";
import { Link, useLocation } from "react-router-dom";

const NavigationBar = () => {
  const location = useLocation();
  const links = [
    { to: "/landing-page", label: "Home" },
    { to: "/create-recipes", label: "Create Recipes" },
    { to: "/view-recipes", label: "View Recipes" },
    { to: "/plan-meals", label: "Plan Meals" },
    { to: "/user-profile", label: "My Profile" },
  ];

  const logout = useLogout();

  const handleLogout = () => {
    logout.mutate(); // Trigger the logout mutation
  };

  return (
    <nav className="bg-white text-white fixed top-0 left-0 w-full z-50">
      <div className=" mx-auto flex items-center justify-between px-10  py-4 ">
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

        {/* Logout button on the right */}
        <div>
          <Button
            onClick={handleLogout}
            className="bg-blueprimary text-bold text-white hover:bg-bluesecondary"
          >
            Logout
          </Button>
        </div>
      </div>
      <div className="border-b border-1 border-bluesecondary"></div>{" "}
      {/* Thin bottom border */}
    </nav>
  );
};

export default NavigationBar;
