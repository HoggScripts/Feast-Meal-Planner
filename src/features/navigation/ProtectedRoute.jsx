import { Navigate, Outlet } from "react-router-dom";
import useTokenStore from "../../stores/useTokenStore";

const ProtectedRoute = ({ setIsLoginOpen }) => {
  const { token } = useTokenStore();

  if (!token) {
    setIsLoginOpen(true);

    return <Navigate to="/landing-page" replace />;
  }

  return <Outlet />;
};

export default ProtectedRoute;
