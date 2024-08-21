import { useEffect, useState } from "react";
import { useFetchUserInfo, useUpdateMealTimes } from "@/hooks/useUserActions";
import { Card, Input, Button, Divider } from "@nextui-org/react";

const UserProfile = () => {
  const { data: userInfo, isLoading, isError } = useFetchUserInfo();
  const [user, setUser] = useState(null);
  const [mealTimes, setMealTimes] = useState({
    breakfastTime: "",
    lunchTime: "",
    dinnerTime: "",
  });

  const updateMealTimesMutation = useUpdateMealTimes();

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
      value += ":00"; // Add seconds if they are missing
    }

    setMealTimes({
      ...mealTimes,
      [e.target.name]: value,
    });
  };

  const handleUpdateMealTimes = () => {
    updateMealTimesMutation.mutate(mealTimes);
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
      </Card>
    </div>
  );
};

export default UserProfile;
