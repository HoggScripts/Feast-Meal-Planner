// src/Profile.jsx
import React from "react";
import { useQuery } from "@tanstack/react-query";
import api from "./api";

const fetchCurrentUser = async () => {
  const response = await api.get("/users/current-user");
  return response.data;
};

const Profile = () => {
  const {
    data: user,
    error,
    isLoading,
  } = useQuery(["currentUser"], fetchCurrentUser);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error loading user data</div>;
  }

  return (
    <div>
      <h1>Profile Page</h1>
      <p>Name: {user.name}</p>
      <p>Email: {user.email}</p>
    </div>
  );
};

export default Profile;
