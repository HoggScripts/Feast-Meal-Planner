import { Card, CardBody, CardHeader, Divider } from "@nextui-org/react";

const currencySymbols = {
  USD: "$",
  CAD: "$",
  EUR: "€",
  GBP: "£",
};

const TotalCostCard = ({ recipe, currency = "USD" }) => {
  console.log("total cost", recipe.totalCost);

  if (!recipe || !recipe.ingredients) {
    return (
      <Card className="mt-4">
        <CardHeader className="flex gap-3 items-center justify-between bg-slate-300">
          <p className="text-sm font-medium">Total Cost</p>
        </CardHeader>
        <Divider />
        <CardBody>
          <p className="text-2xl font-bold">
            {currencySymbols[currency] || "$"}0.00
          </p>
        </CardBody>
      </Card>
    );
  }

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
        <p className="text-2xl font-bold">
          {currencySymbols[currency] || "$"}
          {totalCost.toFixed(2)}
        </p>
      </CardBody>
    </Card>
  );
};

export default TotalCostCard;
