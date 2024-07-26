import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import useIngredientStore from "@/features/ingredient/hooks/useIngredientStore";
import { DollarSign } from "lucide-react";

const currencySymbols = {
  USD: "$",
  CAD: "$",
  EUR: "€",
  GBP: "£",
};

const TotalCostCard = ({ currency }) => {
  const { ingredients } = useIngredientStore();

  const totalCost = ingredients.reduce((acc, ingredient) => {
    return acc + (ingredient.estimatedCost || 0);
  }, 0);

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium">Total Cost</CardTitle>
        <DollarSign className="h-4 w-4 text-muted-foreground" />
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold">
          {currencySymbols[currency] || "$"}
          {totalCost.toFixed(2)}
        </div>
      </CardContent>
    </Card>
  );
};

export default TotalCostCard;
