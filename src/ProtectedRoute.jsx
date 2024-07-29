import { Navigate, Outlet } from "react-router-dom";
import useTokenStore from "./hooks/useTokenStore";

const ProtectedRoute = () => {
  const { token } = useTokenStore();

  return token ? <Outlet /> : <Navigate to="/login" />;
};

export default ProtectedRoute;
