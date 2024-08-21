import { RecipeForm } from "../recipes/creating/RecipeForm";
import RecipeCard from "../recipes/flip-card/RecipeCard";

function CreateRecipesPage() {
  return (
    <div className="grid grid-cols-12 min-h-screen">
      <div className="col-span-5 ml-5 flex items-center justify-center bg-white border-1 border-slate-300 mb-5 shadow-md">
        <RecipeForm />
      </div>

      <div className="col-span-7 flex items-start bg-white h-full w-full">
        <div className="mt-32 w-full flex justify-center">
          <RecipeCard />
        </div>
      </div>
    </div>
  );
}

export default CreateRecipesPage;
