import React from "react";
import { useDrag } from "react-dnd";
import { FaPepperHot, FaDollarSign } from "react-icons/fa";
import { GiRawEgg, GiCupcake } from "react-icons/gi";
import { MdLunchDining, MdDinnerDining, MdCookie } from "react-icons/md";

// Map meal type to corresponding icon
const mealTypeIcons = {
  Breakfast: <GiRawEgg size={16} />,
  Lunch: <MdLunchDining size={16} />,
  Dinner: <MdDinnerDining size={16} />,
  Snack: <MdCookie size={16} />,
  Dessert: <GiCupcake size={16} />,
};

// Define expense ranges
const getExpenseTag = (cost) => {
  if (cost < 10) {
    return { text: "Cheap", color: "text-green-500", icon: <FaDollarSign /> };
  } else if (cost >= 10 && cost < 25) {
    return {
      text: "Moderate",
      color: "text-yellow-500",
      icon: <FaDollarSign />,
    };
  } else {
    return { text: "Expensive", color: "text-red-500", icon: <FaDollarSign /> };
  }
};

const DragDropCard = ({ recipe }) => {
  const [{ isDragging }, drag] = useDrag(() => ({
    type: "RECIPE_CARD",
    item: { id: recipe.id },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  }));

  const expenseTag = getExpenseTag(recipe.estimatedCost || 0);

  const style = {
    opacity: isDragging ? 0.5 : 1,
    width: "180px", // Slightly adjusted width for compactness
    cursor: "pointer",
  };

  return (
    <div
      ref={drag}
      style={style}
      className="border rounded-lg shadow-md p-2 bg-white transition-transform"
    >
      {/* Top Section with Meal Type and Expense */}
      <div className="flex justify-between items-center mb-1">
        <div className="flex items-center text-xs">
          {mealTypeIcons[recipe.mealType] || null}
          <span className="ml-1">{recipe.mealType}</span>
        </div>
        <div className={`flex items-center text-xs ${expenseTag.color}`}>
          {expenseTag.icon}
          <span className="ml-1">{expenseTag.text}</span>
        </div>
      </div>

      {/* Image Section with Calories Overlay */}
      <div className="relative mb-2">
        <img
          src={recipe.image || "stockFoodImage.jpg"}
          alt={recipe.recipeName}
          className="w-full h-20 object-cover rounded-lg"
        />
        <div className="absolute bottom-1 left-1 p-1 bg-white bg-opacity-75 rounded text-xs font-semibold">
          <span>Calories: {recipe.calories || "N/A"}</span>
        </div>
      </div>

      {/* Recipe Name and Spiciness */}
      <div className="flex justify-between items-center text-sm font-semibold truncate mb-1">
        <span>{recipe.recipeName}</span>
        <div className="flex items-center">
          {Array(recipe.spicinessLevel)
            .fill()
            .map((_, i) => (
              <FaPepperHot key={i} className="text-red-500 ml-1" />
            ))}
        </div>
      </div>
    </div>
  );
};

export default DragDropCard;
