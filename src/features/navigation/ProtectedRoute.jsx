import { Navigate, Outlet } from "react-router-dom";
import useTokenStore from "../../stores/useTokenStore";

const ProtectedRoute = ({ setIsLoginOpen }) => {
  const { token } = useTokenStore();

  if (!token) {
    // Open the login dialog
    setIsLoginOpen(true);

    // Redirect to the landing page or another page
    return <Navigate to="/landing-page" replace />;
  }

  // If authenticated, allow access to the route
  return <Outlet />;
};

export default ProtectedRoute;
