// ProtectedRoute.js

import { Navigate, Outlet } from "react-router-dom";
import useTokenStore from "./useTokenStore";

const ProtectedRoute = () => {
  const { token } = useTokenStore();

  console.log("ProtectedRoute token:", token);

  return token ? <Outlet /> : <Navigate to="/login" />;
};

export default ProtectedRoute;
