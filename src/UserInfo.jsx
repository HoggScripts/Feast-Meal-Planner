// UserInfo.jsx

import { useFetchUserInfo, useFetchProtectedData } from "./useUserActions";

const UserInfo = () => {
  const { data, error, isLoading } = useFetchUserInfo();
  const { protectedData, fetchProtectedData } = useFetchProtectedData();

  if (isLoading) return <div>Loading user info...</div>;
  if (error) return <div>Error loading user info: {error.message}</div>;

  return (
    <div>
      <h1>User Info</h1>
      <pre>{JSON.stringify(data, null, 2)}</pre>
      <button onClick={() => fetchProtectedData()}>
        Test Protected Endpoint
      </button>
      {protectedData && <p>{protectedData}</p>}
    </div>
  );
};

export default UserInfo;
