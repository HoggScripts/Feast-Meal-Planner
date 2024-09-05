import { Outlet, useLocation } from "react-router-dom";
import NavigationBar from "./NavigationBar";
import Footer from "../misc/Footer";

const AppLayout = ({ isLoginOpen, setIsLoginOpen }) => {
  const location = useLocation();

  return (
    <div className="min-h-screen flex flex-col">
      <div
        className={`w-full ${
          location.pathname === "/landing-page" ? "fixed z-10" : ""
        }`}
      >
        <NavigationBar
          isLoginOpen={isLoginOpen}
          setIsLoginOpen={setIsLoginOpen}
        />
      </div>
      <div className="flex-grow mt-2">
        <Outlet />
      </div>
      <Footer />
    </div>
  );
};

export default AppLayout;
