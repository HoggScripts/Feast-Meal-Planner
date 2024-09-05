import React from "react";
import DropBox from "./DropBox";
import { format } from "date-fns";

const MealPlanDay = ({ datetime }) => {
  const dayOfWeek = format(datetime, "EEEE");
  const formattedDate = format(datetime, "MMMM do");

  const mealTypes = ["Breakfast", "Lunch", "Dinner"];

  return (
    <div className="flex flex-col w-full border p-2 rounded-lg bg-white shadow">
      <div className="text-center mb-4">
        <h2 className="text-lg font-bold">{dayOfWeek}</h2>
        <p className="text-sm text-gray-600">{formattedDate}</p>
      </div>

      <div className="grid grid-cols-1 gap-2">
        {mealTypes.map((mealType) => (
          <DropBox key={mealType} mealType={mealType} />
        ))}
      </div>
    </div>
  );
};

export default MealPlanDay;
