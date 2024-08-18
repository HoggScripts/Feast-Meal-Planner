import React from "react";
import { addDays, format, startOfDay, isSameWeek } from "date-fns";
import DropBox from "./DropBox";
import ShoppingList from "./ShoppingList";
import { MdFastfood, MdLunchDining } from "react-icons/md";
import { PiCoffeeFill } from "react-icons/pi";
import { GrLinkNext, GrLinkPrevious } from "react-icons/gr";
import useMealPlanStore from "@/stores/useMealPlanStore";
import { FaScroll } from "react-icons/fa";

const MealPlanCalendar = () => {
  const { shoppingList, scheduledRecipes } = useMealPlanStore(); // Get state from Zustand
  const [currentDate, setCurrentDate] = React.useState(new Date());

  const today = startOfDay(new Date());
  const startDate = startOfDay(currentDate);

  const toggleWeek = () => {
    if (isSameWeek(startDate, today, { weekStartsOn: 1 })) {
      setCurrentDate(addDays(today, 7));
    } else {
      setCurrentDate(today);
    }
  };

  const isThisWeek = isSameWeek(startDate, today, { weekStartsOn: 1 });

  // Define meal types with labels and icons
  const mealTypes = [
    { label: "Breakfast", icon: <PiCoffeeFill size={24} /> },
    { label: "Lunch", icon: <MdLunchDining size={24} /> },
    { label: "Dinner", icon: <MdFastfood size={24} /> },
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
            {isThisWeek ? (
              <>
                <span className="mr-2">Next Week</span>
                <GrLinkNext size={16} />
              </>
            ) : (
              <>
                <GrLinkPrevious size={16} />
                <span className="ml-2">This Week</span>
              </>
            )}
          </button>
        </div>

        {mealTypes.map((mealType) => (
          <div
            key={mealType.label}
            className="text-center font-bold p-2 rounded flex flex-col items-center bg-gray-200"
          >
            {mealType.icon}
            <span className="uppercase">{mealType.label}</span>
          </div>
        ))}
        <div className="text-center font-bold p-2 bg-gray-300 rounded flex flex-col items-center">
          <FaScroll size={24} />
          <span>SHOPPING LIST</span>
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
                  mealType={mealType.label} // Pass just the label to DropBox
                  datetime={addDays(startDate, rowIndex)}
                />
              ))}
            </div>
          ))}
        </div>
        <div className="row-span-7 p-4 bg-gray-300 rounded overflow-auto">
          <ShoppingList shoppingList={shoppingList} />
        </div>
      </div>
    </div>
  );
};

export default MealPlanCalendar;
