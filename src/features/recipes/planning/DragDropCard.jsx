import { Popover, PopoverContent, PopoverTrigger } from "@nextui-org/react";
import { BiBookOpen } from "react-icons/bi";
import { GiChickenLeg } from "react-icons/gi";
import { IoMdTime } from "react-icons/io";
import { MdAttachMoney, MdFastfood, MdLunchDining } from "react-icons/md";
import { PiAvocadoFill, PiBowlFoodLight, PiCoffeeFill } from "react-icons/pi";
import { SlEnergy } from "react-icons/sl";
import { HiQuestionMarkCircle } from "react-icons/hi";
import React from "react";
import { useNavigate } from "react-router-dom";
import { useDrag } from "react-dnd";
import { FaBreadSlice, FaPepperHot } from "react-icons/fa";

const mealTypeIcons = {
  Breakfast: <PiCoffeeFill />,
  Lunch: <MdLunchDining />,
  Dinner: <MdFastfood />,
};

const DragDropCard = ({ recipe }) => {
  const [{ isDragging }, drag] = useDrag(() => ({
    type: "RECIPE_CARD",
    item: recipe,
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  }));

  const navigate = useNavigate();

  const handleNavigateToRecipe = () => {
    navigate(`/recipes/${recipe.id}`, { state: { recipe } });
  };

  // Default to a generic food icon if mealType is missing or invalid
  const mealTypeIcon = React.cloneElement(
    mealTypeIcons[recipe.mealType] || <MdFastfood />,
    {
      size: 24,
      color: "white",
    }
  );

  return (
    <div
      ref={drag}
      className="bg-slate-800 rounded-lg shadow-md flex flex-col justify-between relative w-full h-auto transition-transform transform hover:scale-105"
      style={{
        opacity: isDragging ? 0.5 : 1,
        overflow: "hidden",
      }}
    >
      <div className="relative">
        <div className="w-full h-40 overflow-hidden rounded-t-lg">
          <img
            src={recipe.image || "stockFoodImage.jpg"}
            alt={recipe.recipeName}
            onError={(e) => {
              e.target.onerror = null;
              e.target.src = "stockFoodImage.jpg";
            }}
            className="w-full h-full object-cover"
          />
        </div>

        <div
          className="absolute top-2 left-2 p-2 rounded-full bg-slate-700 bg-opacity-75"
          style={{
            boxShadow: "0px 2px 6px rgba(0, 0, 0, 0.3)",
            zIndex: 10,
          }}
        >
          {mealTypeIcon}
        </div>
      </div>

      <div className="flex flex-col justify-between p-4 bg-slate-800 rounded-b-lg">
        <div className="flex items-center justify-between">
          <div className="flex items-center">
            <div>
              <span
                className="font-semibold text-white"
                style={{
                  textShadow: "2px 2px 4px rgba(0, 0, 0, 0.8)",
                }}
              >
                {recipe.recipeName}
              </span>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <Popover placement="top">
              <PopoverTrigger>
                <button className="text-gray-500 hover:text-gray-700">
                  <HiQuestionMarkCircle size={20} className="text-green-500" />
                </button>
              </PopoverTrigger>
              <PopoverContent className="border-1 border-slate-300 shadow-lg">
                <div className="p-4 flex flex-col items-start bg-white rounded-lg">
                  <div className="font-bold text-lg text-gray-800 mb-2 flex items-center gap-2 justify-center w-full ">
                    {recipe.recipeName}
                  </div>
                  {recipe.spicinessLevel > 0 && (
                    <div className="text-sm text-gray-600 flex items-center gap-2 mb-2">
                      <FaPepperHot size={14} className="text-red-500" />
                      <span>
                        Spiciness Rating:{" "}
                        {(() => {
                          switch (recipe.spicinessLevel) {
                            case 1:
                              return "Mild";
                            case 2:
                              return "Medium";
                            case 3:
                              return "Hot";
                            default:
                              return "Unknown";
                          }
                        })()}
                      </span>
                    </div>
                  )}

                  <div className="text-sm text-gray-600 flex items-center gap-2 mb-2">
                    <SlEnergy size={14} className="text-yellow-500" />
                    <span>Calories: {recipe.calories || "N/A"}</span>
                  </div>
                  <div className="text-sm text-gray-600 flex items-center gap-2 mb-2">
                    <IoMdTime size={14} className="text-blue-500" />
                    <span>Cook Time: {recipe.cookTime || "N/A"} min</span>
                  </div>
                  <div className="text-sm text-gray-600 flex items-center gap-2 mb-2">
                    <MdAttachMoney size={14} className="text-green-500" />
                    <span>
                      Estimated Cost: {recipe.estimatedCost || "N/A"}$
                    </span>
                  </div>
                  <div className="text-sm text-gray-600 flex items-center gap-2 mb-2">
                    <PiAvocadoFill size={14} className="text-green-500" />
                    <span>Fat: {recipe.fat || "N/A"}g</span>
                  </div>
                  <div className="text-sm text-gray-600 flex items-center gap-2 mb-2">
                    <GiChickenLeg size={14} className="text-amber-800" />
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
              className="text-blue-300 hover:text-blue-600"
            >
              <BiBookOpen size={20} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DragDropCard;
