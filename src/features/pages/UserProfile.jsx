import React, { useEffect, useState } from "react";
import {
  useFetchUserInfo,
  useUpdateMealTimes,
  useDeleteUser,
  useLogout,
} from "@/hooks/useUserActions";
import { Card, Input, Button, Divider } from "@nextui-org/react";
import {
  AlertDialog,
  AlertDialogTrigger,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogCancel,
  AlertDialogAction,
} from "@/components/ui/alert-dialog";
import { useNavigate } from "react-router-dom";

const UserProfile = () => {
  const { data: userInfo, isLoading, isError } = useFetchUserInfo();
  const [user, setUser] = useState(null);
  const [mealTimes, setMealTimes] = useState({
    breakfastTime: "",
    lunchTime: "",
    dinnerTime: "",
  });

  const updateMealTimesMutation = useUpdateMealTimes();
  const deleteUserMutation = useDeleteUser();
  const logoutUser = useLogout();
  const navigate = useNavigate();

  useEffect(() => {
    if (userInfo) {
      setUser(userInfo);
      setMealTimes({
        breakfastTime: userInfo.breakfastTime || "",
        lunchTime: userInfo.lunchTime || "",
        dinnerTime: userInfo.dinnerTime || "",
      });
    }
  }, [userInfo]);

  const handleMealTimeChange = (e) => {
    let value = e.target.value;
    if (!value.includes(":")) {
      value += ":00";
    } else if (value.split(":").length === 2) {
      value += ":00";
    }

    setMealTimes({
      ...mealTimes,
      [e.target.name]: value,
    });
  };

  const handleUpdateMealTimes = () => {
    updateMealTimesMutation.mutate(mealTimes);
  };

  const handleDeleteUser = () => {
    deleteUserMutation.mutate(null, {
      onSuccess: () => {
        logoutUser.mutate(null, {
          onSuccess: () => {
            navigate("/"); // BYE
          },
        });
      },
    });
  };

  if (isLoading) return <div>Loading...</div>;
  if (isError) return <div>Error loading user data</div>;

  return (
    <div className=" mx-auto mt-10">
      <Card bordered shadow={false} className="max-w-lg mx-auto p-6">
        <div className="mb-6">
          <p className="text-lg font-bold mb-2">Profile Information</p>
          <p>
            <strong>Username:</strong> {user?.username}
          </p>
          <p>
            <strong>Email:</strong> {user?.email}
          </p>
          <Divider className="my-4" />
          <p className="text-lg font-bold mb-2">Update Meal Times</p>
          <div className="flex flex-col space-y-4">
            <Input
              label="Breakfast Time"
              type="time"
              name="breakfastTime"
              value={mealTimes.breakfastTime}
              onChange={handleMealTimeChange}
            />
            <Input
              label="Lunch Time"
              type="time"
              name="lunchTime"
              value={mealTimes.lunchTime}
              onChange={handleMealTimeChange}
            />
            <Input
              label="Dinner Time"
              type="time"
              name="dinnerTime"
              value={mealTimes.dinnerTime}
              onChange={handleMealTimeChange}
            />
          </div>
        </div>
        <Button
          color="primary"
          className="w-full"
          onClick={handleUpdateMealTimes}
        >
          Save Changes
        </Button>

        <AlertDialog>
          <AlertDialogTrigger asChild>
            <Button color="error" className="w-full mt-6">
              Delete Account
            </Button>
          </AlertDialogTrigger>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>Delete Account</AlertDialogTitle>
              <AlertDialogDescription>
                Are you sure you want to delete your account? This action cannot
                be undone.
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel>Cancel</AlertDialogCancel>
              <AlertDialogAction onClick={handleDeleteUser}>
                Delete
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      </Card>
    </div>
  );
};

export default UserProfile;
