import React, { useEffect } from "react";
import { useAuth } from "./AuthProvider";

const Profile = () => {
  const { token } = useAuth();

  useEffect(() => {
    console.log("Profile page mounted. Token:", token);
  }, [token]);

  if (!token) {
    console.log("You are currently logged out.");
    return <div>You are currently logged out.</div>;
  }

  return (
    <div>
      <h1>Profile Page</h1>
      <p>Profile content here...</p>
    </div>
  );
};

export default Profile;
