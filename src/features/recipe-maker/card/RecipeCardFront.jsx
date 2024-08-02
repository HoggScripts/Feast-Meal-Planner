import useRecipeStore from "@/hooks/useRecipeStore";
import CurrencyConverter from "./CurrencyConverter";

function RecipeCardFront() {
  const recipe = useRecipeStore((state) => state.recipe);

  // Function to determine the image source
  const getImageSrc = () => {
    if (recipe.image instanceof File) {
      // If recipe.image is a File object, create an object URL
      return URL.createObjectURL(recipe.image);
    } else if (typeof recipe.image === "string") {
      // If recipe.image is a string (URL), use it directly
      return recipe.image;
    } else {
      // Fallback to a default image
      return "stockFoodImage.jpg";
    }
  };

  return (
    <div className="flex justify-center items-start h-full text-greyish-black">
      <div className="relative w-full max-w-2xl bg-white border border-gray-300 rounded-lg shadow-lg">
        <div className="relative w-full h-64">
          <img
            src={getImageSrc()}
            alt="Recipe"
            className="w-full h-full object-cover rounded-t-lg"
          />
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
          <div className="flex mt-4">
            <div className="w-3/5 pr-4">
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
                  No instructions provided. Are you a cooking wizard? Just wing
                  it and let the magic happen!
                </p>
              )}
            </div>
            <div className="w-2/5 pl-4 border-l border-gray-300">
              <h3 className="text-2xl font-semibold mb-2">Ingredients</h3>
              {recipe.ingredients && recipe.ingredients.length > 0 ? (
                <ul className="list-disc pl-5">
                  {recipe.ingredients.map((ingredient, index) => (
                    <li key={index} className="mb-2">
                      <div className="flex items-center">
                        <span>{`${ingredient.amount} ${ingredient.unit} ${ingredient.name}`}</span>
                      </div>
                    </li>
                  ))}
                </ul>
              ) : (
                <p>
                  No ingredients added yet. Add some ingredients to make your
                  recipe complete!
                </p>
              )}
              {recipe.ingredients.length > 0 && <CurrencyConverter />}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default RecipeCardFront;
