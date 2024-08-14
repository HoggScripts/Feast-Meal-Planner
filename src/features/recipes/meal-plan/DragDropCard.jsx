import React from "react";
import { useDrag } from "react-dnd";
import { FaTimes } from "react-icons/fa";

const DragDropCard = ({ recipe, onRemove }) => {
  const [{ isDragging }, drag] = useDrag(() => ({
    type: "RECIPE_CARD",
    item: recipe,
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  }));

  return (
    <div
      ref={drag}
      className={`w-full h-full bg-white rounded-lg flex items-center justify-center relative p-1`}
      style={{ opacity: isDragging ? 0.5 : 1 }}
    >
      {onRemove && (
        <button
          onClick={onRemove}
          className="absolute top-1 right-1 text-red-500 hover:text-red-700"
        >
          <FaTimes size={12} />
        </button>
      )}
      <div className="flex flex-col items-center">
        <span className="text-xs font-semibold text-gray-700 truncate mb-1">
          {recipe.recipeName}
        </span>
        <img
          src={recipe.image || "stockFoodImage.jpg"}
          alt={recipe.recipeName}
          className="w-16 h-16 object-cover rounded-md"
        />
      </div>
    </div>
  );
};

export default DragDropCard;
