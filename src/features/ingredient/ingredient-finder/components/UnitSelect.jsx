import React from "react";
import {
  Dropdown,
  DropdownTrigger,
  DropdownMenu,
  DropdownItem,
  Button,
} from "@nextui-org/react";
import useIngredientStore from "../../hooks/useIngredientStore";

function UnitSelect() {
  const { currentIngredient, updateCurrentIngredient } = useIngredientStore();

  const handleUnitChange = (unit) => {
    updateCurrentIngredient({ unit });
  };

  return (
    <Dropdown>
      <DropdownTrigger>
        <Button>{currentIngredient.unit || "Select a unit"}</Button>
      </DropdownTrigger>
      <DropdownMenu onAction={handleUnitChange}>
        {currentIngredient.possibleUnits?.map((unit) => (
          <DropdownItem key={unit}>{unit}</DropdownItem>
        ))}
      </DropdownMenu>
    </Dropdown>
  );
}

export default UnitSelect;
