import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import useIngredientStore from "../../hooks/useIngredientStore";
import AmountInput from "./AmountInput";
import UnitSelect from "./UnitSelect";
import styles from "../styles/IngredientCard.module.css";
import { useIngredientDetails } from "../../hooks/useIngredientDetails";
import { useEffect, useState } from "react";

function IngredientCard({ ingredient, onSelect }) {
  const { currentIngredient, addIngredient, clearCurrentIngredient } =
    useIngredientStore();
  const { details, fetchIngredientDetails, detailsLoading } =
    useIngredientDetails();
  const [shouldAdd, setShouldAdd] = useState(false); // Add this state

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
    setShouldAdd(true); // Set this flag to true when the button is clicked
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
      setShouldAdd(false); // Reset the flag after adding the ingredient
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
      className={cn(styles.cardContainer, "hover:shadow-lg hover:bg-gray-100")}
      onClick={() => onSelect(ingredient)}
    >
      <div className="flex-shrink-0 mr-4">
        <h3 className="text-lg font-semibold">{ingredient.name}</h3>
        <img
          src={ingredient.image}
          alt={ingredient.name}
          className="w-16 h-16 mt-2"
        />
      </div>
      {ingredient.id === currentIngredient.id && (
        <>
          <AmountInput />
          <UnitSelect />
          <Button
            onClick={handleAddToRecipe}
            className="w-full"
            disabled={detailsLoading}
          >
            {detailsLoading ? "Loading..." : "Add to Recipe"}
          </Button>
        </>
      )}
    </Card>
  );
}

export default IngredientCard;
