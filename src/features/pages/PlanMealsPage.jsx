import React, { useState } from "react";
import MealPlanCalendar from "../recipes/meal-plan/MealPlanCalendar";
import DragDropCard from "../recipes/meal-plan/DragDropCard";

function PlanMealsPage() {
  const [shoppingList, setShoppingList] = useState([]);

  const addToShoppingList = (ingredients) => {
    setShoppingList((prevList) => [...prevList, ...ingredients]);
  };

  // Mock recipes for testing
  const mockRecipes = [
    {
      recipeName: "Chocolate Cake",
      image: "https://via.placeholder.com/150", // Mock image URL
      mealType: "Dinner", // Add meal type for drag-and-drop functionality
      ingredients: ["Flour", "Sugar", "Cocoa Powder", "Eggs", "Butter"], // Example ingredients
    },
    {
      recipeName: "Caesar Salad",
      image: "https://via.placeholder.com/150", // Mock image URL
      mealType: "Lunch", // Add meal type for drag-and-drop functionality
      ingredients: [
        "Romaine Lettuce",
        "Croutons",
        "Caesar Dressing",
        "Parmesan",
      ], // Example ingredients
    },
  ];

  return (
    <div className="grid grid-cols-8 gap-4 p-4">
      <div className="col-span-6">
        <MealPlanCalendar
          addToShoppingList={addToShoppingList}
          shoppingList={shoppingList}
        />
      </div>
      <div className="col-span-2 bg-red-500">
        <div className="p-4 text-white">
          <h2 className="text-lg font-bold mb-4">Recipe Search</h2>
          {/* Render the mock recipes in a two-column layout */}
          <div className="grid grid-cols-2 gap-4 bg-white p-2 rounded-lg">
            {mockRecipes.map((recipe, index) => (
              <div key={index} className="border p-2 rounded-lg">
                <DragDropCard recipe={recipe} onRemove={() => {}} />
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default PlanMealsPage;
