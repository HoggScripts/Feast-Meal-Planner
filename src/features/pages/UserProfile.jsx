// src/features/pages/UserProfilePage.jsx

import { useEffect, useState } from "react";
import { useFetchUserInfo } from "@/hooks/useUserActions";
import { Card, Avatar, Button, Divider } from "@nextui-org/react";

const UserProfile = () => {
  const { data: userInfo, isLoading, isError } = useFetchUserInfo();
  const [user, setUser] = useState(null);

  useEffect(() => {
    if (userInfo) {
      setUser(userInfo);
    }
  }, [userInfo]);

  if (isLoading) return <div>Loading...</div>;
  if (isError) return <div>Error loading user data</div>;

  return (
    <div className="container mx-auto mt-10">
      <Card bordered shadow={false} className="max-w-lg mx-auto">
        <div className="flex items-center space-x-4 p-6">
          <Avatar text={user?.username.charAt(0)} size="xl" color="primary" />
          <div>
            <p>{user?.username}</p>
            <p>{user?.email}</p>
          </div>
        </div>
        <Divider />
        <div className="p-6">
          <p>Profile Information</p>
          <p>
            <strong>First Name:</strong> {user?.firstName || "N/A"}
          </p>
          <p>
            <strong>Last Name:</strong> {user?.lastName || "N/A"}
          </p>
          <p>
            <strong>Email:</strong> {user?.email}
          </p>
        </div>
        <div className="p-6">
          <Button color="primary" className="w-full">
            Edit Profile
          </Button>
        </div>
      </Card>
    </div>
  );
};

export default UserProfile;
