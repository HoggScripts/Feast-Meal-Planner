import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import useIngredientStore from "../../hooks/useIngredientStore";

function UnitSelect() {
  const { currentIngredient, updateCurrentIngredient } = useIngredientStore();

  const handleUnitChange = (unit) => {
    updateCurrentIngredient({ unit });
  };

  return (
    <div className="w-full">
      <Select value={currentIngredient.unit} onValueChange={handleUnitChange}>
        <SelectTrigger className="w-full">
          <SelectValue placeholder="Select a unit" />
        </SelectTrigger>
        <SelectContent>
          <SelectGroup>
            <SelectLabel>Units</SelectLabel>
            {currentIngredient.possibleUnits?.map((unit) => (
              <SelectItem key={unit} value={unit}>
                {unit}
              </SelectItem>
            ))}
          </SelectGroup>
        </SelectContent>
      </Select>
    </div>
  );
}

export default UnitSelect;
