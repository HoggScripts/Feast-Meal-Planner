import React, { useState, useEffect } from "react";
import MealPlanCalendar from "../recipes/planning/MealPlanCalendar";

import { useFetchRecipes } from "@/hooks/useRecipeActions";
import RecipeSearch from "../recipes/planning/RecipeSearch";

function PlanMealsPage() {
  const { data: recipes, isLoading, error } = useFetchRecipes();
  const [userRecipes, setUserRecipes] = useState([]);

  // Set the fetched recipes into state
  useEffect(() => {
    if (recipes) {
      setUserRecipes(recipes);
    }
  }, [recipes]);

  if (isLoading) {
    return <div>Loading...</div>; // Loading state
  }

  if (error) {
    return <div>Error loading recipes: {error.message}</div>; // Error state
  }

  return (
    <div className="grid grid-cols-8 gap-4 p-4">
      <div className="col-span-6">
        <MealPlanCalendar />
      </div>
      <div className="col-span-2 bg-bluesecondary p-4 text-white rounded-lg mt-4">
        <h2 className="text-lg font-bold mb-4">Recipe Search</h2>
        <div className="flex flex-col gap-4">
          <RecipeSearch></RecipeSearch>
        </div>
      </div>
    </div>
  );
}

export default PlanMealsPage;
