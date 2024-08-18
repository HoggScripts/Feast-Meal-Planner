import { MdFastfood, MdLunchDining } from "react-icons/md";

import { PiCoffeeFill } from "react-icons/pi";
import { FaPepperHot } from "react-icons/fa";
import { PiBowlFood, PiClock } from "react-icons/pi";
import CurrencyConverter from "./CurrencyConverter";

// Map meal type to corresponding icon
const mealTypeIcons = {
  Breakfast: <PiCoffeeFill size={24} />,
  Lunch: <MdLunchDining size={24} />,
  Dinner: <MdFastfood size={24} />,
};

function RecipeCardFront({ recipe }) {
  if (!recipe) {
    return <div>Recipe data is not available.</div>;
  }

  const getImageSrc = () => {
    if (recipe.image instanceof File) {
      return URL.createObjectURL(recipe.image);
    } else if (typeof recipe.image === "string" && recipe.image.trim() !== "") {
      return recipe.image;
    } else {
      return "/stockFoodImage.jpg"; // Ensure the correct path to the image
    }
  };

  const renderSpicinessIcons = (spicinessLevel) => {
    const icons = [];
    for (let i = 0; i < spicinessLevel; i++) {
      icons.push(<FaPepperHot key={i} color="red" size={24} />);
    }
    return icons;
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
        <div className="p-6">
          <h2 className="text-3xl font-bold mb-4">
            {recipe.recipeName || "No Recipe Name"}
          </h2>
          <div className="flex items-center text-lg font-medium mb-6">
            {mealTypeIcons[recipe.mealType] || null}
            <span className="ml-2">{recipe.mealType}</span>
            <span className="flex items-center ml-3">
              {renderSpicinessIcons(recipe.spicinessLevel || 0)}{" "}
            </span>
          </div>
          <div className="flex justify-start gap-6 border-b border-gray-300 pb-4 mb-4 items-center">
            <div className="flex items-center gap-2">
              <PiBowlFood size={24} />
              <p>
                <strong>Servings:</strong> {recipe.servings || "N/A"}
              </p>
            </div>
            <div className="flex items-center gap-2">
              <PiClock size={24} />
              <p>
                <strong>Cook Time:</strong> {recipe.cookTime || "N/A"} minutes
              </p>
            </div>
          </div>
          <div className="flex">
            <div className="w-3/5 pr-6">
              <h3 className="text-2xl font-semibold mb-2">Instructions</h3>
              {recipe.instructions && recipe.instructions.length > 0 ? (
                <ol className="list-decimal pl-5 space-y-2">
                  {recipe.instructions.map((step, index) => (
                    <li key={index} className="mb-2">
                      {step}
                    </li>
                  ))}
                </ol>
              ) : (
                <p>No instructions provided.</p>
              )}
            </div>
            <div className="w-2/5 pl-6 border-l border-gray-300">
              <h3 className="text-2xl font-semibold mb-2">Ingredients</h3>
              {recipe.ingredients && recipe.ingredients.length > 0 ? (
                <ul className="list-disc pl-5 space-y-2">
                  {recipe.ingredients.map((ingredient, index) => (
                    <li key={index} className="mb-2">
                      {`${ingredient.amount} ${ingredient.unit} ${ingredient.name}`}
                    </li>
                  ))}
                </ul>
              ) : (
                <p>No ingredients added yet.</p>
              )}
              <div className="mt-4">
                <CurrencyConverter recipe={recipe} />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default RecipeCardFront;
