import * as React from "react";
import { Button, Input } from "@nextui-org/react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { getIngredientDetails } from "@/lib/ingredientApi";
import useRecipeStore from "@/stores/useRecipeStore";

export function IngredientDialog({
  isOpen,
  onClose,
  ingredient,
  possibleUnits,
  setIngredients,
}) {
  const [selectedUnit, setSelectedUnit] = React.useState("");
  const [amount, setAmount] = React.useState(1);
  const { addIngredient } = useRecipeStore((state) => ({
    addIngredient: state.addIngredient,
  }));

  if (!ingredient) return null;

  const handleUnitChange = (unit) => {
    setSelectedUnit(unit);
  };

  const handleSubmit = async () => {
    try {
      const detailedIngredient = await getIngredientDetails(
        ingredient.id,
        amount,
        selectedUnit
      );
      detailedIngredient.name = ingredient.name;
      detailedIngredient.image = ingredient.image;
      addIngredient(detailedIngredient);
      console.log("Added detailed ingredient:", detailedIngredient);
      onClose();
    } catch (error) {
      console.error("Failed to fetch ingredient details:", error);
    } finally {
      setIngredients([]);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[300px] sm:max-h-[400px] bg-white p-4">
        <DialogHeader>
          <DialogTitle className="text-lg font-semibold">
            {ingredient.name}
          </DialogTitle>
          <DialogDescription className="text-xs">
            Select a unit for the ingredient.
          </DialogDescription>
        </DialogHeader>
        <div className="p-2 pb-0">
          <img
            src={ingredient.image}
            alt={ingredient.name}
            className="w-24 h-24 rounded mx-auto"
          />
          <div className="mt-4">
            {possibleUnits.length > 0 ? (
              <div>
                <select
                  className="w-full p-1 border rounded text-sm"
                  onChange={(e) => handleUnitChange(e.target.value)}
                  value={selectedUnit}
                >
                  <option value="" disabled>
                    Select Unit
                  </option>
                  {possibleUnits.map((unit) => (
                    <option key={unit} value={unit}>
                      {unit}
                    </option>
                  ))}
                </select>
                <Input
                  type="number"
                  value={amount}
                  onChange={(e) => setAmount(e.target.value)}
                  placeholder="Amount"
                  className="w-full mt-2 text-sm"
                  min="1"
                />
              </div>
            ) : (
              <p className="text-xs">No units available</p>
            )}
          </div>
        </div>
        <div className="mt-4 flex justify-end">
          <Button className="mr-2" onClick={handleSubmit}>
            Add to Recipe
          </Button>
          <Button variant="outline" onClick={onClose}>
            Cancel
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
