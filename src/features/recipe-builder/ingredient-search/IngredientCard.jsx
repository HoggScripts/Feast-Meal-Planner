import React, { useEffect, useState } from "react";
import {
  Card,
  CardBody,
  CardFooter,
  Image,
  Popover,
  PopoverTrigger,
  PopoverContent,
  Button,
} from "@nextui-org/react";
import useIngredientStore from "../../../hooks/useIngredientStore";
import AmountInput from "./AmountInput";
import UnitSelect from "./UnitSelect";
import { useIngredientDetails } from "../../../hooks/useIngredientDetails";

function IngredientCard({ ingredient, onSelect }) {
  const {
    currentIngredient,
    addIngredient,
    clearCurrentIngredient,
    updateCurrentIngredient,
  } = useIngredientStore();
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

  useEffect(() => {
    // Update the current ingredient when a new ingredient is selected
    updateCurrentIngredient(ingredient);
  }, [ingredient, updateCurrentIngredient]);

  return (
    <Popover placement="right">
      <PopoverTrigger>
        <Card
          shadow="sm"
          isPressable
          className="w-48 justify-items-center items-center relative"
          onClick={() => onSelect(ingredient)}
        >
          <div className="absolute inset-0 bg-blue-200 opacity-50 z-0"></div>
          <div className="relative p-4">
            <Image
              alt={ingredient.name}
              src={ingredient.image}
              className="object-contain w-full h-32"
            />
          </div>
          <CardFooter className="justify-center text-large relative z-10">
            <p>{ingredient.name}</p>
          </CardFooter>
        </Card>
      </PopoverTrigger>
      <PopoverContent>
        <div className="px-4 py-2">
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
        </div>
      </PopoverContent>
    </Popover>
  );
}

export default IngredientCard;
