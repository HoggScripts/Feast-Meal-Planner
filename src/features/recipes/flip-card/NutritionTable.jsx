import {
  Table,
  TableHeader,
  TableColumn,
  TableBody,
  TableRow,
  TableCell,
} from "@nextui-org/react";

function NutritionTable({ recipe }) {
  if (!recipe || !recipe.ingredients) {
    return <div>Nutrition data is not available.</div>;
  }

  const totalNutrients = recipe.ingredients.reduce(
    (totals, ingredient) => {
      totals.calories += ingredient.calories || 0;
      totals.fat += ingredient.fat || 0;
      totals.protein += ingredient.protein || 0;
      totals.carbohydrates += ingredient.carbohydrates || 0;
      return totals;
    },
    { calories: 0, fat: 0, protein: 0, carbohydrates: 0 }
  );

  return (
    <div className="p-4">
      <Table aria-label="Nutrition Facts Table">
        <TableHeader>
          <TableColumn>Ingredient</TableColumn>
          <TableColumn>Calories</TableColumn>
          <TableColumn>Fat (g)</TableColumn>
          <TableColumn>Protein (g)</TableColumn>
          <TableColumn>Carbs (g)</TableColumn>
        </TableHeader>
        <TableBody>
          {recipe.ingredients.map((ingredient, index) => (
            <TableRow key={index}>
              <TableCell>{ingredient.name}</TableCell>
              <TableCell>{ingredient.calories || "N/A"}</TableCell>
              <TableCell>{ingredient.fat || "N/A"}</TableCell>
              <TableCell>{ingredient.protein || "N/A"}</TableCell>
              <TableCell>{ingredient.carbohydrates || "N/A"}</TableCell>
            </TableRow>
          ))}
          <TableRow>
            <TableCell>
              <strong>Total</strong>
            </TableCell>
            <TableCell>
              <strong>{totalNutrients.calories}</strong>
            </TableCell>
            <TableCell>
              <strong>{totalNutrients.fat}</strong>
            </TableCell>
            <TableCell>
              <strong>{totalNutrients.protein}</strong>
            </TableCell>
            <TableCell>
              <strong>{totalNutrients.carbohydrates}</strong>
            </TableCell>
          </TableRow>
        </TableBody>
      </Table>
    </div>
  );
}

export default NutritionTable;
