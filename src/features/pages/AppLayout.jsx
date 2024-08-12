import { Outlet } from "react-router-dom";
import NavigationBar from "../navigation/NavigationBar";

const AppLayout = ({ isLoginOpen, setIsLoginOpen }) => {
  return (
    <div className="min-h-screen flex flex-col">
      <NavigationBar
        isLoginOpen={isLoginOpen}
        setIsLoginOpen={setIsLoginOpen}
      />
      <div className="flex-grow mt-20">
        {" "}
        {/* Adds a top margin to offset the fixed nav */}
        <Outlet />
      </div>
    </div>
  );
};

export default AppLayout;
