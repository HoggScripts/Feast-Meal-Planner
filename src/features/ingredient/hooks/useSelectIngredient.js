import { useCallback, useEffect, useState } from "react";
import useIngredientStore from "./useIngredientStore";
import { usePossibleUnits } from "./usePossibleUnits";

export const useSelectIngredient = () => {
  const { updateCurrentIngredient } = useIngredientStore();

  const {
    fetchPossibleUnits,
    possibleUnits,
    possibleUnitsLoading,
    possibleUnitsError,
  } = usePossibleUnits();

  const [selectedIngredient, setSelectedIngredient] = useState(null);

  const handleSelect = useCallback(
    (ingredient) => {
      setSelectedIngredient(ingredient);
      fetchPossibleUnits(ingredient.id);
    },
    [fetchPossibleUnits]
  );

  useEffect(() => {
    if (selectedIngredient && possibleUnits) {
      updateCurrentIngredient({ ...selectedIngredient, possibleUnits });
      console.log("Selected ingredient with possible units:", {
        ...selectedIngredient,
        possibleUnits,
      });
    }
  }, [selectedIngredient, possibleUnits, updateCurrentIngredient]);

  return {
    handleSelect,
    possibleUnitsLoading,
    possibleUnitsError,
  };
};
