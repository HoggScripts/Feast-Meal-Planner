import { useState } from "react";
import MealPlanCalendar from "../recipes/meal-plan/MealPlanCalendar";

function PlanMealsPage() {
  const [shoppingList, setShoppingList] = useState([]);

  const addToShoppingList = (ingredients) => {
    setShoppingList((prevList) => [...prevList, ...ingredients]);
  };

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
          {/* Add your recipe search component or functionality here */}
        </div>
      </div>
    </div>
  );
}

export default PlanMealsPage;
