import React from "react";
import { useDrag } from "react-dnd";
import { CiSquareRemove } from "react-icons/ci";
import { BiBookOpen } from "react-icons/bi";
import { useNavigate } from "react-router-dom";
import { FaTrash } from "react-icons/fa";
import { MdClose, MdOutlineRemoveCircleOutline } from "react-icons/md";

const SimpleDragDropCard = ({ recipe, onRemove }) => {
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

  return (
    <div
      ref={drag}
      className="bg-slate-800 rounded-lg flex flex-col justify-between relative w-full h-full"
      style={{
        opacity: isDragging ? 0.5 : 1,
        boxShadow: "none",
        overflow: "hidden",
      }}
    >
      <div className="relative flex-grow h-2/3">
        <div className="w-full h-full overflow-hidden">
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

        <button
          onClick={onRemove}
          className="absolute top-2 right-2 text-white hover:text-red-700 p-1 rounded-full bg-black bg-opacity-25 hover:bg-opacity-90 z-10"
        >
          <MdClose size={12} />
        </button>
      </div>

      <div className="relative flex items-center justify-between px-4 py-2 bg-slate-800 h-1/3">
        <div className="flex items-center">
          <span
            className="font-semibold text-white text-xs"
            style={{
              textShadow: "2px 2px 4px rgba(0, 0, 0, 0.8)",
            }}
          >
            {recipe.recipeName}
          </span>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={handleNavigateToRecipe}
            className="text-blue-300 hover:text-blue-600"
          >
            <BiBookOpen size={20} />
          </button>
        </div>
      </div>
    </div>
  );
};

export default SimpleDragDropCard;
