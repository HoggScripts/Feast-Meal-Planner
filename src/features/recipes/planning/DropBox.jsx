import React from "react";
import { useDrop } from "react-dnd";
import DragDropCard from "./DragDropCard";
import SimpleDragDropCard from "./SimpleDragDropCard";
import useMealPlanStore from "@/stores/useMealPlanStore";

const DropBox = ({ mealType, datetime }) => {
  const { addRecipeToSchedule, removeRecipeFromSchedule, scheduledRecipes } =
    useMealPlanStore();

  const normalizedDatetime = new Date(datetime);

  const droppedItem = scheduledRecipes.find(
    (item) =>
      item.mealType === mealType &&
      new Date(item.datetime).getTime() === normalizedDatetime.getTime()
  );

  const [{ isOver, canDrop }, drop] = useDrop(() => ({
    accept: "RECIPE_CARD",
    canDrop: (item) => item.mealType === mealType,
    drop: (item) => {
      addRecipeToSchedule(item, mealType, normalizedDatetime);
    },
    collect: (monitor) => ({
      isOver: !!monitor.isOver(),
      canDrop: !!monitor.canDrop(),
    }),
  }));

  const handleRemove = () => {
    if (droppedItem) {
      removeRecipeFromSchedule(droppedItem.recipe.id, mealType, datetime);
    }
  };

  return (
    <div
      ref={drop}
      className={`border-2 border-dashed ${
        isOver && canDrop ? "border-green-500 bg-green-100" : "border-gray-400"
      } bg-white rounded flex items-center justify-center ${
        !canDrop && isOver ? "bg-red-100" : ""
      }`}
      style={{ width: "100%", height: "100px" }}
    >
      {droppedItem ? (
        <SimpleDragDropCard
          recipe={droppedItem.recipe}
          onRemove={handleRemove}
        />
      ) : (
        !canDrop &&
        isOver && <div className="text-red-500">Invalid Meal Type</div>
      )}
    </div>
  );
};

export default DropBox;
