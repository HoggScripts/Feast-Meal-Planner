import { Outlet } from "react-router-dom";
import NavigationBar from "../navigation/NavigationBar";

const AppLayout = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <NavigationBar />
      <div className="flex flex-col flex-grow">
        <div className="flex-grow ">
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default AppLayout;
