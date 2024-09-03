import React from "react";
import { addDays, format, startOfWeek } from "date-fns";
import DropBox from "./DropBox";
import ShoppingList from "./ShoppingList";
import { MdFastfood, MdLunchDining } from "react-icons/md";
import { PiCoffeeFill } from "react-icons/pi";
import { IoIosNuclear } from "react-icons/io";
import { FaDice } from "react-icons/fa";
import { HiSwitchVertical } from "react-icons/hi";
import useMealPlanStore from "@/stores/useMealPlanStore";
import { useFetchUserInfo } from "@/hooks/useUserActions";
import { useFetchRecipes } from "@/hooks/useRecipeActions";

const MealPlanCalendar = ({ isNextWeek, toggleWeek }) => {
  const {
    scheduledRecipes,
    shoppingList,
    clearSchedule,
    randomlyFillSchedule,
  } = useMealPlanStore();

  const { data: userInfo } = useFetchUserInfo();
  const { data: allRecipes } = useFetchRecipes(); // Fetch all recipes
  const currentDate = startOfWeek(new Date(), { weekStartsOn: 1 });
  const startDate = isNextWeek ? addDays(currentDate, 7) : currentDate;

  const handleClear = () => {
    clearSchedule();
  };

  const handleRandomize = () => {
    if (Array.isArray(allRecipes)) {
      randomlyFillSchedule(allRecipes);
    } else {
      console.error("allRecipes is not an array", allRecipes);
    }
  };

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
        "bg-[#A1D3E8]", // Lightest Blue for Monday
        "bg-[#99D0E6]", // Slightly lighter blue for Tuesday
        "bg-[#8FCBE4]", // Medium-light blue for Wednesday
        "bg-[#85C7E2]", // Medium blue for Thursday
        "bg-[#7FC8E0]", // Default blue for Friday
        "bg-[#79C1DE]", // Slightly darker blue for Saturday
        "bg-[#73BADC]", // Darkest blue for Sunday
      ][index % 7],
    };
  });

  return (
    <div className="p-4">
      <div className="grid grid-cols-5 gap-2">
        <div className="col-span-1 flex flex-col items-center justify-center space-y-2">
          <button
            type="button"
            onClick={toggleWeek}
            className="bg-gray-200 border-1 border-slate-800 text-slate-800 hover:bg-gray-400 py-4 rounded-md flex items-center justify-center transition-transform duration-200 ease-in-out hover:scale-105 w-full shadow-md"
          >
            {isNextWeek ? (
              <>
                <HiSwitchVertical className="mr-2" />
                This Week
              </>
            ) : (
              <>
                <HiSwitchVertical className="mr-2" />
                Next Week
              </>
            )}
          </button>
          <button
            className="bg-gray-200 border-1 border-slate-800 text-slate-800 hover:bg-gray-400 py-2 rounded-md flex items-center justify-center transition-transform duration-200 ease-in-out hover:scale-105 w-full shadow-md"
            onClick={handleRandomize}
          >
            <FaDice size={20} className="mr-1" />
            Randomize
          </button>
          <button
            className="bg-gray-200 border-1 border-slate-800 text-slate-800 hover:bg-gray-400 py-2 rounded-md flex items-center justify-center transition-transform duration-200 ease-in-out hover:scale-105 w-full shadow-md"
            onClick={handleClear}
          >
            <IoIosNuclear size={20} className="mr-1" />
            Clear
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

        <div className="text-center font-bold p-2 rounded flex flex-col items-center justify-center bg-gray-200 uppercase">
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
