import { Outlet } from "react-router-dom";

import Breadcrumbs from "./breadcrumbs";
import NavBar from "./NavBar";

const Layout = () => {
  return (
    <div className="">
      <div className="flex flex-row">
        <NavBar></NavBar>
      </div>
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
