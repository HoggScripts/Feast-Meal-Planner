import React from "react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress"; // Import the Progress component from shadcn

const calculateTotalCost = (recipes) => {
  return recipes.reduce(
    (total, { recipe }) => total + (recipe.estimatedCost || 0),
    0
  );
};

const CostComparisonCard = ({
  currentWeekRecipes,
  nextWeekRecipes,
  isNextWeek,
}) => {
  const currentWeekCost = calculateTotalCost(currentWeekRecipes);
  const nextWeekCost = calculateTotalCost(nextWeekRecipes);

  // Display the appropriate cost based on the isNextWeek boolean
  const displayedWeekCost = isNextWeek ? nextWeekCost : currentWeekCost;
  const comparisonWeekCost = isNextWeek ? currentWeekCost : nextWeekCost;

  // Simplify the logic to determine "more" or "less"
  let comparisonText;
  if (displayedWeekCost > comparisonWeekCost) {
    comparisonText = "more than";
  } else if (displayedWeekCost < comparisonWeekCost) {
    comparisonText = "less than";
  } else {
    comparisonText = "the same as";
  }

  // Calculate the percentage difference
  const percentageDifference =
    comparisonWeekCost === 0
      ? 0
      : ((displayedWeekCost - comparisonWeekCost) / comparisonWeekCost) * 100;

  // Format the cost to two decimal places
  const formattedWeekCost = `$${displayedWeekCost.toFixed(2)}`;

  return (
    <Card className="shadow-md" style={{ height: "250px", width: "360px" }}>
      <CardHeader className="pb-2">
        <CardTitle>{isNextWeek ? "Next Week" : "This Week"}</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="text-4xl">{formattedWeekCost}</div>
        <div className="text-sm text-muted-foreground mt-2">
          {isNextWeek
            ? `This is ${Math.abs(percentageDifference).toFixed(
                1
              )}% ${comparisonText} the current week.`
            : `This is ${Math.abs(percentageDifference).toFixed(
                1
              )}% ${comparisonText} the next week.`}
        </div>
        {isFinite(percentageDifference) && (
          <Progress value={Math.abs(percentageDifference)} className="mt-2" />
        )}
      </CardContent>
    </Card>
  );
};

export default CostComparisonCard;
