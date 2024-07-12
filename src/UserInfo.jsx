// src/UserInfo.jsx
import React from "react";
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

  if (isLoading) return <div>Loading user info...</div>;
  if (error) return <div>Error loading user info: {error.message}</div>;

  return (
    <div>
      <h1>User Info</h1>
      <pre>{JSON.stringify(data, null, 2)}</pre>
    </div>
  );
};

export default UserInfo;
