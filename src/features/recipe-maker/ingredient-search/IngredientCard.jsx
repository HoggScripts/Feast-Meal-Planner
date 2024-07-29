import { usePossibleUnits } from "@/hooks/usePossibleUnits";
import { Card } from "@nextui-org/react";
import { useEffect, useState } from "react";
import { IngredientDialog } from "./IngredientDialog";

function IngredientCard({
  ingredient,
  selectedIngredient,
  setSelectedIngredient,
}) {
  const {
    fetchPossibleUnits,
    possibleUnits,
    possibleUnitsLoading,
    possibleUnitsError,
  } = usePossibleUnits();
  const [units, setUnits] = useState([]);
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  useEffect(() => {
    if (selectedIngredient === ingredient.id) {
      fetchPossibleUnits(ingredient.id);
    }
  }, [selectedIngredient]);

  useEffect(() => {
    if (possibleUnits) {
      setUnits(possibleUnits);
    }
  }, [possibleUnits]);

  const handleClick = () => {
    setSelectedIngredient(ingredient.id);
    setIsDialogOpen(true);
  };

  const handleClose = () => {
    setIsDialogOpen(false);
  };

  return (
    <>
      <div onClick={handleClick} className="w-full">
        <Card className="flex flex-row mb-1 justify-left items-center p-2 border border-gray-200 rounded-lg shadow-sm hover:shadow-md transition-shadow duration-300 ease-in-out transform hover:scale-105 hover:bg-gray-100">
          <img
            src={ingredient.image}
            alt={ingredient.name}
            className="h-10 w-10 rounded-full object-cover"
          />
          <h1 className="flex items-center ml-2 font-medium text-gray-800">
            {ingredient.name}
          </h1>
        </Card>
      </div>
      {selectedIngredient === ingredient.id && (
        <IngredientDialog
          isOpen={isDialogOpen}
          onClose={handleClose}
          ingredient={ingredient}
          possibleUnits={units}
        />
      )}
    </>
  );
}

export default IngredientCard;
