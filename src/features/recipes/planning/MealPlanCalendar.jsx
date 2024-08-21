import React from "react";
import { addDays, format, startOfWeek } from "date-fns";
import DropBox from "./DropBox";
import ShoppingList from "./ShoppingList";
import { MdFastfood, MdLunchDining } from "react-icons/md";
import { PiCoffeeFill } from "react-icons/pi";
import useMealPlanStore from "@/stores/useMealPlanStore";
import { useFetchUserInfo } from "@/hooks/useUserActions";

const MealPlanCalendar = ({ isNextWeek, toggleWeek }) => {
  const { scheduledRecipes, shoppingList } = useMealPlanStore();

  console.log("shoppingList:", shoppingList); // Debugging: Log the shoppingList

  const { data: userInfo } = useFetchUserInfo();
  const currentDate = startOfWeek(new Date(), { weekStartsOn: 1 });
  const startDate = isNextWeek ? addDays(currentDate, 7) : currentDate;

  const mealTypes = [
    {
      label: "Breakfast",
      icon: <PiCoffeeFill size={24} />,
      timeKey: "breakfastTime",
    },
    { label: "Lunch", icon: <MdLunchDining size={24} />, timeKey: "lunchTime" },
    { label: "Dinner", icon: <MdFastfood size={24} />, timeKey: "dinnerTime" },
  ];

  const daysOfWeek = [...Array(7)].map((_, index) => {
    const dayDate = addDays(startDate, index);
    return {
      day: format(dayDate, "EEEE"),
      date: format(dayDate, "MMM do"),
      color: [
        "bg-blue-400",
        "bg-red-400",
        "bg-yellow-400",
        "bg-orange-400",
        "bg-green-400",
        "bg-purple-400",
        "bg-pink-400",
      ][index % 7],
    };
  });

  return (
    <div className="p-4">
      <div className="grid grid-cols-5 gap-2">
        <div className="col-span-1 flex items-center justify-center">
          <button
            type="button"
            onClick={toggleWeek}
            className="text-white bg-bluesecondary hover:bg-blueprimary py-2 px-10 rounded-md flex items-center justify-center transition-transform duration-200 ease-in-out hover:scale-105"
          >
            {isNextWeek ? (
              <>
                <span className="mr-2">This Week</span>
              </>
            ) : (
              <>
                <span className="ml-2">Next Week</span>
              </>
            )}
          </button>
        </div>

        {mealTypes.map((mealType) => (
          <div
            key={mealType.label}
            className="relative text-center font-bold p-2 rounded flex flex-col items-center bg-gray-200 group"
          >
            <div className="relative h-full w-full">
              <span className="absolute inset-0 flex justify-center items-center text-lg opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                {userInfo?.[mealType.timeKey]?.slice(0, 5) || "Not set"}
              </span>
              <div className="absolute inset-0 flex flex-col justify-center items-center opacity-100 group-hover:opacity-0 transition-opacity duration-200">
                {mealType.icon}
                <span className="uppercase">{mealType.label}</span>
              </div>
            </div>
          </div>
        ))}

        <div className="text-center font-bold p-2 rounded flex flex-col items- justify-center bg-gray-200 uppercase">
          Shopping List
        </div>
      </div>

      <div className="grid grid-cols-5 gap-2 mt-4">
        <div className="grid grid-rows-7 gap-2">
          {daysOfWeek.map((day) => (
            <div
              key={day.date}
              className={`flex flex-col items-center justify-center font-bold p-2 ${day.color} text-white rounded`}
            >
              <span>{day.day}</span>
              <span className="text-sm">{day.date}</span>
            </div>
          ))}
        </div>
        <div className="col-span-3 grid grid-rows-7 gap-2">
          {daysOfWeek.map((day, rowIndex) => (
            <div className="grid grid-cols-3 gap-2" key={day.date}>
              {mealTypes.map((mealType) => (
                <DropBox
                  key={`${day.day}-${mealType.label}`}
                  mealType={mealType.label}
                  datetime={addDays(startDate, rowIndex)}
                />
              ))}
            </div>
          ))}
        </div>
        <div className="row-span-1 border-2 bg-white rounded overflow-auto">
          <ShoppingList
            shoppingList={Array.isArray(shoppingList) ? shoppingList : []}
            isNextWeek={isNextWeek}
          />
        </div>
      </div>
    </div>
  );
};

export default MealPlanCalendar;
