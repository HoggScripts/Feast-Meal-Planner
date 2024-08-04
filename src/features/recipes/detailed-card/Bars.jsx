import { NutritionChart } from "./NutritionChart";
import useRecipeStore from "@/hooks/useRecipeStore";

export function Bars() {
  const recipe = useRecipeStore((state) => state.recipe);

  const data = {
    calories: recipe.ingredients.map((ingredient) => ({
      name: ingredient.name,
      value: ingredient.calories || 0,
    })),
    fats: recipe.ingredients.map((ingredient) => ({
      name: ingredient.name,
      value: ingredient.fat || 0,
    })),
    carbs: recipe.ingredients.map((ingredient) => ({
      name: ingredient.name,
      value: ingredient.carbohydrates || 0,
    })),
    protein: recipe.ingredients.map((ingredient) => ({
      name: ingredient.name,
      value: ingredient.protein || 0,
    })),
  };

  return (
    <div className="grid grid-cols-2 gap-4">
      {Object.keys(data).map((key) => (
        <NutritionChart
          key={key}
          type="bar"
          data={data[key]}
          dataKey="value"
          title={key.charAt(0).toUpperCase() + key.slice(1)}
        />
      ))}
    </div>
  );
}
