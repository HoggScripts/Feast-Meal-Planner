"use client";

import React from "react";
import {
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer,
  Tooltip,
  Legend,
} from "recharts";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardFooter,
} from "@/components/ui/card";

const CookingTimePieChart = ({
  currentWeekRecipes,
  nextWeekRecipes,
  isNextWeek,
  height,
  width,
}) => {
  const recipes = isNextWeek ? nextWeekRecipes : currentWeekRecipes;

  // Prepare data for the pie chart
  const cookingTimeData = recipes.map(({ recipe }) => ({
    name: recipe.recipeName || "Unnamed Recipe", // Use the recipe name or a fallback
    minutes: recipe.cookTime || 0, // Use the cookingTime property
  }));

  // Calculate the total cooking time
  const totalTime = cookingTimeData.reduce(
    (total, recipe) => total + recipe.minutes,
    0
  );

  // Define the colors for the pie chart segments
  const COLORS = ["#51B2D4", "#7FC8E0"];

  return (
    <Card
      className="flex flex-col shadow-md"
      style={{ height: `${height}px`, width: `${width}px` }}
    >
      <CardHeader className="items-center pb-0">
        <CardTitle>Cooking Time Distribution</CardTitle>
      </CardHeader>
      <CardContent className="flex-1 pb-0">
        <ResponsiveContainer width="100%" height={200}>
          <PieChart>
            <Pie
              data={cookingTimeData}
              dataKey="minutes"
              nameKey="name"
              cx="50%"
              cy="50%"
              outerRadius={90}
              label={false}
            >
              {cookingTimeData.map((entry, index) => (
                <Cell
                  key={`cell-${index}`}
                  fill={COLORS[index % COLORS.length]}
                />
              ))}
            </Pie>
            <Tooltip formatter={(value, name) => [`${value} min`, name]} />
          </PieChart>
        </ResponsiveContainer>
      </CardContent>
      <CardFooter className="flex-col gap-2 text-sm">
        <div className="leading-none text-muted-foreground p-2">
          {isNextWeek
            ? `You will spend ${totalTime} minutes cooking next week`
            : `You will spend ${totalTime} minutes cooking this week`}
        </div>
      </CardFooter>
    </Card>
  );
};

export default CookingTimePieChart;
