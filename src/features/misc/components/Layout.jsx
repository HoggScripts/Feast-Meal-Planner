import { Outlet } from "react-router-dom";
import Sidebar from "./sidebar";
import Breadcrumbs from "./breadcrumbs";

const Layout = () => {
  return (
    <div className="flex min-h-screen">
      <Sidebar />
      <div className="flex-1 p-4 ml-14">
        <div className="mb-4">
          <Breadcrumbs />
        </div>
        <Outlet />
      </div>
    </div>
  );
};

export default Layout;
