import { Card, CardBody, CardHeader, Divider } from "@nextui-org/react";
import useRecipeStore from "@/hooks/useRecipeStore";

const currencySymbols = {
  USD: "$",
  CAD: "$",
  EUR: "€",
  GBP: "£",
};

const TotalCostCard = ({ currency }) => {
  const { recipe } = useRecipeStore((state) => ({
    recipe: state.recipe,
  }));

  const totalCost = recipe.ingredients.reduce((acc, ingredient) => {
    return acc + (ingredient.estimatedCost || 0);
  }, 0);

  return (
    <Card className="mt-4">
      <CardHeader className="flex gap-3 items-center justify-between bg-slate-300">
        <p className="text-sm font-medium">Total Cost</p>
      </CardHeader>
      <Divider />
      <CardBody>
        <p className="text-2xl font-bol">
          {currencySymbols[currency] || "$"}
          {totalCost.toFixed(2)}
        </p>
      </CardBody>
    </Card>
  );
};

export default TotalCostCard;
