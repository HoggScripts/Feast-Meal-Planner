import React, { useEffect, useState } from "react";
import api from "./api";
import { useAuth } from "./AuthProvider";

const Profile = () => {
  const [user, setUser] = useState(null);
  const { token } = useAuth();

  useEffect(() => {
    const fetchUserProfile = async () => {
      try {
        const response = await api.get("/users/current-user");
        setUser(response.data);
      } catch (error) {
        console.error("Failed to fetch user profile:", error);
      }
    };

    if (token) {
      fetchUserProfile();
    }
  }, [token]);

  if (!user) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h1>Profile Page</h1>
      <div>
        <strong>Name:</strong> {user.firstName} {user.lastName}
      </div>
      <div>
        <strong>Username:</strong> {user.username}
      </div>
      <div>
        <strong>Email:</strong> {user.email}
      </div>
      {/* Add more user details here as needed */}
    </div>
  );
};

export default Profile;
