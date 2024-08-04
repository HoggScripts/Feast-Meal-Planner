import React from "react";
import { RecipeForm } from "../recipes/creation-form/RecipeForm";
import RecipeCard from "../recipes/detailed-card/RecipeCard";

function CreateRecipesPage() {
  return (
    <div className="grid grid-cols-12 min-h-screen bg-closewhite p-4">
      <div className="col-span-5 p-4 bg-ecruWhite h-screen overflow-y-auto">
        <RecipeForm />
      </div>
      <div className="col-span-7 flex justify-center items-start m-10 bg-closewhite h-screen">
        <RecipeCard />
      </div>
    </div>
  );
}

export default CreateRecipesPage;
