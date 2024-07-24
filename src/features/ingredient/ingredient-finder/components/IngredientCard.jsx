import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import useIngredientStore from "../../hooks/useIngredientStore";
import AmountInput from "./AmountInput";
import UnitSelect from "./UnitSelect";
import { useIngredientDetails } from "../../hooks/useIngredientDetails";
import { useEffect, useState } from "react";

function IngredientCard({ ingredient, onSelect }) {
  const { currentIngredient, addIngredient, clearCurrentIngredient } =
    useIngredientStore();
  const { details, fetchIngredientDetails, detailsLoading } =
    useIngredientDetails();
  const [shouldAdd, setShouldAdd] = useState(false);

  const handleAddToRecipe = () => {
    if (!currentIngredient.amount || !currentIngredient.unit) {
      console.log("Missing required fields to add ingredient.");
      return;
    }

    fetchIngredientDetails({
      id: currentIngredient.id,
      amount: currentIngredient.amount,
      unit: currentIngredient.unit,
    });
    setShouldAdd(true);
  };

  useEffect(() => {
    if (shouldAdd && details && currentIngredient.id) {
      const ingredientWithDetails = {
        ...currentIngredient,
        calories: details.calories,
        fat: details.fat,
        protein: details.protein,
        carbohydrates: details.carbohydrates,
        estimatedCost: details.estimatedCost,
      };

      console.log("Ingredient with details:", ingredientWithDetails);

      addIngredient(ingredientWithDetails);
      clearCurrentIngredient();
      setShouldAdd(false);
    }
  }, [
    details,
    currentIngredient.id,
    addIngredient,
    clearCurrentIngredient,
    currentIngredient,
    shouldAdd,
  ]);

  return (
    <Card
      className="hover:shadow-lg w-72 h-auto p-4"
      onClick={() => onSelect(ingredient)}
    >
      <CardHeader>
        <CardTitle className="text-lg font-semibold">
          {ingredient.name}
        </CardTitle>
      </CardHeader>
      <CardContent className="flex flex-col items-center space-y-4">
        <img
          src={ingredient.image}
          alt={ingredient.name}
          className="w-20 h-20 border border-gray-200 rounded-md p-1"
        />
        {ingredient.id === currentIngredient.id && (
          <div className="flex flex-col space-y-2 w-full">
            <AmountInput />
            <UnitSelect />
            <Button
              onClick={handleAddToRecipe}
              className="w-full mt-2"
              disabled={detailsLoading}
            >
              {detailsLoading ? "Loading..." : "Add to Recipe"}
            </Button>
          </div>
        )}
      </CardContent>
    </Card>
  );
}

export default IngredientCard;
