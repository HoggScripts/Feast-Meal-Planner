import NutritionTable from "./NutritionTable";

function RecipeCardBack({ recipe }) {
  return (
    <div className="flex justify-center items-start h-full text-greyish-black">
      <div className="relative w-full max-w-2xl bg-white border border-gray-300 rounded-lg shadow-lg">
        <div className="relative w-full h-64">
          <img
            src="stockNutritionImage.jpeg"
            alt="Default Recipe"
            className="w-full h-full object-cover rounded-t-lg"
          />
        </div>
        <div className="m-2">
          <NutritionTable recipe={recipe} />
        </div>
      </div>
    </div>
  );
}

export default RecipeCardBack;
