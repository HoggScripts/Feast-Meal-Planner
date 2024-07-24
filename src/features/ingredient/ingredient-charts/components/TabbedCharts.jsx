"use client";
import * as React from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Switch } from "@/components/ui/switch";
import useIngredientStore from "../../hooks/useIngredientStore";
import { renderPieChart, renderBarChart } from "./Charts";
import "@/index.css";

const TabbedCharts = () => {
  const { ingredients } = useIngredientStore();
  const [isPieChart, setIsPieChart] = React.useState(true);

  const nutrientData = React.useMemo(() => {
    const totals = ingredients.reduce(
      (acc, ingredient) => {
        acc.carbohydrates += ingredient.carbohydrates || 0;
        acc.fat += ingredient.fat || 0;
        acc.protein += ingredient.protein || 0;
        return acc;
      },
      { carbohydrates: 0, fat: 0, protein: 0 }
    );

    return [
      { name: "Carbohydrates", value: totals.carbohydrates },
      { name: "Fat", value: totals.fat },
      { name: "Protein", value: totals.protein },
    ];
  }, [ingredients]);

  const costData = React.useMemo(() => {
    return ingredients.map((ingredient) => ({
      name: ingredient.name,
      value: ingredient.estimatedCost || 0,
    }));
  }, [ingredients]);

  const caloriesData = React.useMemo(() => {
    return ingredients.map((ingredient) => ({
      name: ingredient.name,
      value: ingredient.calories || 0,
    }));
  }, [ingredients]);

  const renderChart = (data, valueKey, label) => {
    return isPieChart
      ? renderPieChart(data, valueKey, label)
      : renderBarChart(data, valueKey, label);
  };

  return (
    <div className="w-1/2">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-xl font-semibold">Charts</h2>
        <div className="flex items-center space-x-2">
          <span>Pie Chart</span>
          <Switch checked={isPieChart} onCheckedChange={setIsPieChart} />
          <span>Bar Chart</span>
        </div>
      </div>
      <Tabs defaultValue="macro" className="w-full">
        <TabsList className="grid grid-cols-3 mb-4">
          <TabsTrigger value="macro">Macro</TabsTrigger>
          <TabsTrigger value="cost">Cost</TabsTrigger>
          <TabsTrigger value="calories">Calories</TabsTrigger>
        </TabsList>
        <TabsContent value="macro">
          <Card className="h-full">
            <CardHeader>
              <CardTitle>Macronutrient Distribution</CardTitle>
              <CardDescription>
                Percentage of carbohydrates, fats, and proteins
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-2">
              {renderChart(nutrientData, "value", "Macronutrients")}
            </CardContent>
            <CardFooter>{/* Optional Footer */}</CardFooter>
          </Card>
        </TabsContent>
        <TabsContent value="cost">
          <Card className="h-full">
            <CardHeader>
              <CardTitle>Cost Contribution</CardTitle>
              <CardDescription>
                Cost contribution of each ingredient
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-2">
              {renderChart(costData, "value", "Total Cost")}
            </CardContent>
            <CardFooter>{/* Optional Footer */}</CardFooter>
          </Card>
        </TabsContent>
        <TabsContent value="calories">
          <Card className="h-full">
            <CardHeader>
              <CardTitle>Calories Contribution</CardTitle>
              <CardDescription>
                Percentage of total calories contributed by each ingredient
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-2">
              {renderChart(caloriesData, "value", "Total Calories")}
            </CardContent>
            <CardFooter>{/* Optional Footer */}</CardFooter>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default TabbedCharts;
