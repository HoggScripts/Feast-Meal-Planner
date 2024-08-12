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
      className={`w-full h-full border rounded-lg bg-white shadow-md flex items-center justify-center relative`}
      style={{ opacity: isDragging ? 0.5 : 1 }}
    >
      {onRemove && (
        <button
          onClick={onRemove}
          className="absolute top-0.5 right-0.5 text-red-500 hover:text-red-700"
        >
          <FaTimes size={8} />
        </button>
      )}
      <div className="flex flex-col items-center">
        <span className="text-xs font-bold truncate">{recipe.recipeName}</span>
        <img
          src={recipe.image || "stockFoodImage.jpg"}
          alt={recipe.recipeName}
          className="w-full h-full object-cover rounded-lg"
        />
      </div>
    </div>
  );
};

export default DragDropCard;
