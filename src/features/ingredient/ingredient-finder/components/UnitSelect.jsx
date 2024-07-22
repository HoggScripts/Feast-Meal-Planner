import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";
import useIngredientStore from "../../hooks/useIngredientStore";
import styles from "../styles/UnitSelect.module.css";

function UnitSelect() {
  const { currentIngredient, updateCurrentIngredient } = useIngredientStore();

  const handleUnitChange = (unit) => {
    updateCurrentIngredient({ unit });
  };

  return (
    <div className={styles.toggleGroupContainer}>
      <ToggleGroup
        type="single"
        value={currentIngredient.unit}
        onValueChange={handleUnitChange}
        className={styles.toggleGroup}
        variant="outline"
        size="lg"
      >
        {currentIngredient.possibleUnits?.map((unit) => (
          <ToggleGroupItem
            key={unit}
            value={unit}
            className={`${styles.toggleGroupItem} ${
              currentIngredient.unit === unit
                ? styles.toggleGroupItemActive
                : ""
            }`}
          >
            {unit}
          </ToggleGroupItem>
        ))}
      </ToggleGroup>
    </div>
  );
}

export default UnitSelect;
