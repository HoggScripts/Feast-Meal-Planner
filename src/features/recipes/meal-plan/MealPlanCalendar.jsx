import React from "react";
import { addDays, format, isSameWeek, startOfDay } from "date-fns";
import DropBox from "./DropBox";
import ShoppingList from "./ShoppingList";
import { Button } from "@nextui-org/react";
import { MdArrowBackIos, MdArrowForwardIos } from "react-icons/md";
import useMealPlanStore from "@/hooks/useMealPlanStore";

const MealPlanCalendar = () => {
  const { shoppingList, scheduledRecipes } = useMealPlanStore(); // Get state from Zustand
  const [currentDate, setCurrentDate] = React.useState(new Date());

  const today = startOfDay(new Date());
  const startDate = startOfDay(currentDate);

  const isPreviousWeekDisabled = isSameWeek(startDate, today, {
    weekStartsOn: 1,
  });

  const nextWeek = () => {
    setCurrentDate((prevDate) => addDays(prevDate, 7));
  };

  const previousWeek = () => {
    if (!isPreviousWeekDisabled) {
      setCurrentDate((prevDate) => addDays(prevDate, -7));
    }
  };

  const mealTypes = ["Breakfast", "Lunch", "Dinner"];

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
      <div className="flex items-center mb-4">
        <Button
          type="button"
          onClick={previousWeek}
          className={`text-black bg-white flex items-center border border-slate-600 shadow-md hover:bg-slate-100 text-xs py-1 px-2 ${
            isPreviousWeekDisabled
              ? "bg-gray-300 text-gray-500 cursor-not-allowed"
              : ""
          }`}
          disabled={isPreviousWeekDisabled}
        >
          <MdArrowBackIos className="mr-1 text-sm" />
        </Button>
        <Button
          type="button"
          onClick={nextWeek}
          className="ml-2 text-black bg-white flex items-center border border-slate-600 shadow-md hover:bg-slate-100 text-xs py-1 px-2"
        >
          <MdArrowForwardIos className="ml-1 text-sm" />
        </Button>
        <h2 className="ml-4 text-sm font-bold">
          Week of {format(startDate, "MMMM do, yyyy")}
        </h2>
      </div>

      <div className="grid grid-cols-5 gap-2">
        <div></div>
        {mealTypes.map((mealType) => (
          <div
            key={mealType}
            className="text-center font-bold p-2 bg-gray-200 rounded"
          >
            {mealType}
          </div>
        ))}
        <div className="text-center font-bold p-2 bg-gray-200 rounded">
          Shopping List
        </div>
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
                  key={`${day.day}-${mealType}`}
                  mealType={mealType}
                  datetime={addDays(startDate, rowIndex)}
                />
              ))}
            </div>
          ))}
        </div>
        <div className="row-span-7 p-4 border-2 border-gray-200 rounded overflow-auto">
          <ShoppingList shoppingList={shoppingList} />
        </div>
      </div>
    </div>
  );
};

export default MealPlanCalendar;
