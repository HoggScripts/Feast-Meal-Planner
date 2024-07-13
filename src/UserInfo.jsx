import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import api from "./api";

const fetchUserInfo = async () => {
  const response = await api.get("/users/current-user");
  return response.data;
};

const UserInfo = () => {
  const { data, error, isLoading } = useQuery({
    queryKey: ["userInfo"],
    queryFn: fetchUserInfo,
    staleTime: 1, // Forces cache to be very short-lived for testing
    cacheTime: 0, // Forces the cache to be cleared immediately after the data becomes stale
  });

  const [protectedData, setProtectedData] = useState(null);

  const handleProtectedRequest = async () => {
    try {
      const response = await api.get("/users/protected-endpoint", {
        withCredentials: true,
      });
      setProtectedData(response.data.message);
    } catch (error) {
      console.error("Error accessing protected endpoint", error);
      setProtectedData("Access denied");
    }
  };

  if (isLoading) return <div>Loading user info...</div>;
  if (error) return <div>Error loading user info: {error.message}</div>;

  return (
    <div>
      <h1>User Info</h1>
      <pre>{JSON.stringify(data, null, 2)}</pre>
      <button onClick={handleProtectedRequest}>Test Protected Endpoint</button>
      {protectedData && <p>{protectedData}</p>}
    </div>
  );
};

export default UserInfo;
