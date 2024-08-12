import React from "react";
import DropBox from "./DropBox";
import { format } from "date-fns";

const MealPlanDay = ({ datetime }) => {
  // Format the date to display the day of the week and the date
  const dayOfWeek = format(datetime, "EEEE"); // Full day name (e.g., "Monday")
  const formattedDate = format(datetime, "MMMM do"); // Date formatted as "Month day" (e.g., "August 7th")

  // Define the meal types
  const mealTypes = ["Breakfast", "Lunch", "Dinner", "Snack", "Dessert"];

  return (
    <div className="flex flex-col w-full border p-2 rounded-lg bg-white shadow">
      {/* Header with Day of the Week and Date */}
      <div className="text-center mb-4">
        <h2 className="text-lg font-bold">{dayOfWeek}</h2>
        <p className="text-sm text-gray-600">{formattedDate}</p>
      </div>

      {/* Meal Type DropBoxes */}
      <div className="grid grid-cols-1 gap-2">
        {mealTypes.map((mealType) => (
          <DropBox key={mealType} mealType={mealType} />
        ))}
      </div>
    </div>
  );
};

export default MealPlanDay;
