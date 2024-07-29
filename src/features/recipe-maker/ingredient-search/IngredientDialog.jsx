import * as React from "react";
import { Button, Input } from "@nextui-org/react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

export function IngredientDialog({
  isOpen,
  onClose,
  ingredient,
  possibleUnits,
}) {
  const [selectedUnit, setSelectedUnit] = React.useState("");
  const [amount, setAmount] = React.useState(1);

  if (!ingredient) return null;

  const handleUnitChange = (unit) => {
    setSelectedUnit(unit);
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[300px] bg-white">
        <DialogHeader>
          <DialogTitle className="text-sm">{ingredient.name}</DialogTitle>
          <DialogDescription className="text-xs">
            Select a unit for the ingredient.
          </DialogDescription>
        </DialogHeader>
        <div className="p-2 pb-0">
          <img
            src={ingredient.image}
            alt={ingredient.name}
            className="w-full h-auto rounded"
          />
          <div className="mt-4">
            {possibleUnits.length > 0 ? (
              <div>
                <select
                  className="w-full p-2 border rounded text-sm"
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
          <Button
            className="mr-2"
            onClick={() => console.log({ amount, selectedUnit })}
          >
            Submit
          </Button>
          <Button variant="outline" onClick={onClose}>
            Cancel
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
