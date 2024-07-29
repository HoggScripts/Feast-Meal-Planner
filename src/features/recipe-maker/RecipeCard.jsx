import useRecipeStore from "@/hooks/useRecipeStore";

function RecipeCard() {
  const recipe = useRecipeStore((state) => state.recipe);

  return (
    <div className="flex justify-center items-center h-full m-4 text-greyish-black">
      <div className="relative border-grayishBlack rounded w-full border-2 max-w-2xl bg-vanilla-ice overflow-hidden">
        <div className="relative w-full h-64">
          {recipe.image ? (
            <img
              src={URL.createObjectURL(recipe.image)}
              alt="Recipe"
              className="w-full h-full object-cover"
            />
          ) : (
            <img
              src="stockFoodImage.jpg"
              alt="Default Recipe"
              className="w-full h-full object-cover"
            />
          )}
        </div>
        <div className="p-4">
          <h2 className="text-4xl font-bold mb-4">{recipe.recipeName}</h2>
          <div className="flex justify-start gap-4 border-b border-gray-300 p-4">
            <p>
              <strong>Servings:</strong> {recipe.servings}
            </p>
            <p>
              <strong>Cook Time:</strong> {recipe.cookTime} minutes
            </p>
          </div>
          <div className="mt-4">
            <h3 className="text-2xl font-semibold mb-2">Instructions</h3>
            {recipe.instructions && recipe.instructions.length > 0 ? (
              <ol className="list-decimal pl-5">
                {recipe.instructions.map((step, index) => (
                  <li key={index} className="mb-2">
                    {step}
                  </li>
                ))}
              </ol>
            ) : (
              <p>
                No instructions provided. Are you a cooking wizard? Just wing it
                and let the magic happen!
              </p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default RecipeCard;
