// UserInfo.jsx
import {
  useFetchUserInfo,
  useFetchProtectedData,
  useLogout,
} from "./useUserActions";
import Button from "./Button";
import { Link } from "react-router-dom";

const UserInfo = () => {
  const { data, error, isLoading } = useFetchUserInfo();
  const { protectedData, fetchProtectedData } = useFetchProtectedData();
  const logout = useLogout();

  if (isLoading) return <div>Loading user info...</div>;
  if (error) return <div>Error loading user info: {error.message}</div>;

  return (
    <div>
      <h1>User Info</h1>
      <pre>{JSON.stringify(data, null, 2)}</pre>
      <Button onClick={() => fetchProtectedData()}>
        Test Protected Endpoint
      </Button>
      {protectedData && <p>{protectedData}</p>}
      <Button onClick={() => logout.mutate()} variant="danger">
        Logout
      </Button>
      <Link to="/request-reset-password">Forgot your password?</Link>
    </div>
  );
};

export default UserInfo;
