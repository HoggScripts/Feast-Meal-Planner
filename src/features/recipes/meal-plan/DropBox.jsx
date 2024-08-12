import React, { useState, useEffect } from "react";
import { useDrop } from "react-dnd";
import DragDropCard from "./DragDropCard";

const DropBox = ({ mealType, datetime, addToShoppingList }) => {
  const [droppedItem, setDroppedItem] = useState(null);

  const [{ isOver, canDrop }, drop] = useDrop(() => ({
    accept: "RECIPE_CARD",
    canDrop: (item) => item.mealType === mealType,
    drop: (item) => {
      setDroppedItem(item);
      addToShoppingList(item.ingredients || []);
      return undefined;
    },
    collect: (monitor) => ({
      isOver: !!monitor.isOver(),
      canDrop: !!monitor.canDrop(),
    }),
  }));

  useEffect(() => {
    if (datetime) {
      // Reset drop box when date changes
      setDroppedItem(null);
    }
  }, [datetime]);

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
        <DragDropCard recipe={droppedItem} />
      ) : (
        !canDrop &&
        isOver && <div className="text-red-500">Invalid Meal Type</div>
      )}
    </div>
  );
};

export default DropBox;
