import React from "react";
import { useLocation } from "react-router-dom";
import RecipeCard from "../recipes/flip-card/RecipeCard";

function RecipeCardPage() {
  const { state } = useLocation();

  // Log the received recipe data for debugging purposes
  console.log("RecipeCardPage - State recipe:", state?.recipe);

  return (
    <div className="flex justify-center  min-h-screen  p-4">
      {state?.recipe ? (
        <RecipeCard recipe={state.recipe} />
      ) : (
        <div className="text-center text-gray-700 text-xl">
          Recipe data is not available.
        </div>
      )}
    </div>
  );
}

export default RecipeCardPage;
