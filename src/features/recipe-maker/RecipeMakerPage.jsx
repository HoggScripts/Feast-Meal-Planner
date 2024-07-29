import React from "react";
import { RecipeForm } from "./RecipeForm";
import RecipeCard from "./RecipeCard";

function RecipeMakerPage() {
  return (
    <div className="grid grid-cols-12 min-h-screen bg-white">
      <div className="col-span-4 p-4 border-r border-gray-300 bg-ecruWhite">
        <RecipeForm />
      </div>
      <div className="col-span-8 flex justify-center items-center p-4 bg-white">
        <div className="w-full max-w-2xl">
          <RecipeCard />
        </div>
      </div>
    </div>
  );
}

export default RecipeMakerPage;
