import { useLogout } from "@/hooks/useUserActions";
import { Button } from "@nextui-org/react";
import { FaEye, FaHome } from "react-icons/fa";
import { MdMenuBook } from "react-icons/md";
import { Link, useLocation } from "react-router-dom";

const NavigationBar = () => {
  const location = useLocation();
  const links = [
    { to: "/landing-page", label: "Home", icon: <FaHome /> },
    { to: "/create-recipes", label: "Create Recipes", icon: <MdMenuBook /> },
    { to: "/view-recipes", label: "View Recipes", icon: <FaEye /> },
    { to: "/plan-meals", label: "Plan Meals" },
    { to: "/user-profile", label: "My Profile" },
  ];

  const logout = useLogout();

  const handleLogout = () => {
    logout.mutate(); // Trigger the logout mutation
  };

  return (
    <nav className="bg-closewhite text-white py-4 shadow-md">
      <div className=" bg-closewhite mx-auto flex flex-col items-center">
        <img src="logo002.png" alt="Logo" className="mb-2 h-16" />
        <div className="flex space-x-6">
          {links.map((link) => (
            <Link
              key={link.to}
              to={link.to}
              className={`hover:text-black ${
                location.pathname === link.to
                  ? "font-bold text-black"
                  : "text-gray-400 "
              }`}
            >
              <div className="flex flex-row items-center">
                {link.icon}
                {link.label}
              </div>
            </Link>
          ))}
          <Button onClick={handleLogout}>Logout</Button>
        </div>
      </div>
    </nav>
  );
};

export default NavigationBar;
