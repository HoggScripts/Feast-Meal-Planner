import React from "react";
import { useDrag } from "react-dnd";
import { CiCircleRemove, CiSquareRemove } from "react-icons/ci";
import { HiQuestionMarkCircle } from "react-icons/hi";
import { BiBookOpen } from "react-icons/bi";
import { Popover, PopoverTrigger, PopoverContent } from "@nextui-org/react";
import { useNavigate } from "react-router-dom";
import { GiChickenLeg } from "react-icons/gi";
import { IoMdTime } from "react-icons/io";
import { PiBowlFoodLight } from "react-icons/pi";
import { PiAvocadoFill } from "react-icons/pi";
import { SlEnergy } from "react-icons/sl";
import { FaBreadSlice } from "react-icons/fa";

const DragDropCard = ({ recipe, onRemove, isInDropBox }) => {
  const [{ isDragging }, drag] = useDrag(() => ({
    type: "RECIPE_CARD",
    item: recipe,
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  }));

  const navigate = useNavigate();

  const handleNavigateToRecipe = () => {
    navigate(`/recipes/${recipe.id}`); // Assuming recipe has an id and this route exists
  };

  return (
    <div
      ref={drag}
      className={`bg-white rounded-lg flex flex-col items-center justify-center relative ${
        isInDropBox ? "w-full h-full" : "w-full h-auto"
      }`}
      style={{
        opacity: isDragging ? 0.5 : 1,
        boxShadow: isInDropBox ? "none" : "0px 2px 6px rgba(0, 0, 0, 0.1)",
        padding: isInDropBox ? "0.5rem" : "1rem",
      }}
    >
      {/* Conditional rendering of icons */}
      {isInDropBox && (
        <button
          onClick={onRemove} // Click handler to remove the card
          className="absolute top-1 right-1 text-red-500 hover:bg-red-700 rounded p-1"
        >
          <CiSquareRemove size={20} />
        </button>
      )}
      <div className="absolute bottom-1 right-1 flex gap-2">
        <Popover placement="top">
          <PopoverTrigger>
            <button className="text-gray-500 hover:text-gray-700">
              <HiQuestionMarkCircle size={20} className="text-green-500" />
            </button>
          </PopoverTrigger>
          <PopoverContent className="border-1 border-slate-300 shadow-lg">
            <div className="p-4 flex flex-col items-start bg-white rounded-lg">
              <div className="font-bold text-lg text-gray-800 mb-2 flex items-center gap-2">
                {recipe.recipeName}
              </div>
              <div className="text-sm text-gray-600 flex items-center gap-2 mb-2">
                <SlEnergy size={14} className="text-yellow-500" />
                <span>Calories: {recipe.calories || "N/A"}</span>
              </div>
              <div className="text-sm text-gray-600 flex items-center gap-2 mb-2">
                <IoMdTime size={14} className="text-blue-500" />
                <span>Cook Time: {recipe.cookTime || "N/A"} min</span>
              </div>
              <div className="text-sm text-gray-600 flex items-center gap-2 mb-2">
                <PiAvocadoFill size={14} className="text-green-500" />
                <span>Fat: {recipe.fat || "N/A"}g</span>
              </div>
              <div className="text-sm text-gray-600 flex items-center gap-2 mb-2">
                <GiChickenLeg size={14} className="text-brown-500" />
                <span>Protein: {recipe.protein || "N/A"}g</span>
              </div>
              <div className="text-sm text-gray-600 flex items-center gap-2 mb-2">
                <FaBreadSlice size={14} className="text-orange-500" />
                <span>Carbs: {recipe.carbohydrates || "N/A"}g</span>
              </div>
              <div className="text-sm text-gray-600 flex items-center gap-2">
                <PiBowlFoodLight size={14} className="text-purple-500" />
                <span>Servings: {recipe.servings || "N/A"}</span>
              </div>
            </div>
          </PopoverContent>
        </Popover>
        <button
          onClick={handleNavigateToRecipe}
          className="text-blue-500 hover:text-blue-700"
        >
          <BiBookOpen size={20} />
        </button>
      </div>

      <img
        src={recipe.image || "stockFoodImage.jpg"}
        alt={recipe.recipeName}
        className={`object-cover rounded-md ${
          isInDropBox ? "w-full h-3/4" : "w-full h-32"
        }`}
        style={{
          objectFit: "cover", // Ensure image covers the available space
        }}
      />
      <span className="text-xs font-semibold text-gray-700 truncate mt-1 px-2">
        {recipe.recipeName}
      </span>
    </div>
  );
};

export default DragDropCard;
