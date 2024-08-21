import React from "react";
import { LineChart, Line, XAxis, CartesianGrid } from "recharts";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
  CardFooter,
} from "@/components/ui/card";
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import { format, startOfWeek, addDays, isSameDay } from "date-fns";

export default function CalorieTrendChart({
  currentWeekRecipes,
  nextWeekRecipes,
  isNextWeek,
}) {
  const recipes = isNextWeek ? nextWeekRecipes : currentWeekRecipes;

  const startOfDisplayedWeek = isNextWeek
    ? addDays(startOfWeek(new Date(), { weekStartsOn: 1 }), 7)
    : startOfWeek(new Date(), { weekStartsOn: 1 });

  const weekDays = [...Array(7)].map((_, index) =>
    addDays(startOfDisplayedWeek, index)
  );

  // Prepare calorie data for the chart
  const calorieData = weekDays.map((dayDate) => {
    // Filter recipes that match the current dayDate
    const filteredRecipes = recipes.filter(({ datetime }) => {
      const recipeDate = new Date(datetime);
      return isSameDay(recipeDate, dayDate);
    });

    // Sum up the calories for all recipes on this day
    const dailyCalorieTotal = filteredRecipes.reduce(
      (total, { recipe }) => total + (recipe.calories || 0),
      0
    );

    return {
      date: format(dayDate, "EEE"),
      calories: dailyCalorieTotal,
    };
  });

  const totalCalories = calorieData.reduce(
    (total, day) => total + day.calories,
    0
  );
  const averageCalories = (totalCalories / calorieData.length).toFixed(1);

  return (
    <Card className="flex flex-col shadow-md">
      <CardHeader className="pb-2 ">
        <CardTitle>
          {isNextWeek
            ? "Calorie Trend for Next Week"
            : "Calorie Trend for This Week"}
        </CardTitle>
        <CardDescription>
          {format(startOfDisplayedWeek, "MMM dd")} -{" "}
          {format(addDays(startOfDisplayedWeek, 6), "MMM dd")}
        </CardDescription>
      </CardHeader>
      <CardContent className="flex-1 pb-4">
        <ChartContainer
          config={{
            calories: {
              label: "Calories",
              color: "#7FC8E0",
            },
          }}
          className="mx-auto aspect-square max-h-[250px]"
        >
          <LineChart
            data={calorieData}
            margin={{
              left: 12,
              right: 12,
            }}
          >
            <CartesianGrid vertical={false} />
            <XAxis
              dataKey="date"
              tickLine={false}
              axisLine={false}
              tickMargin={8}
              tickFormatter={(value) => value.slice(0, 3)}
            />
            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent hideLabel />}
            />
            <Line
              dataKey="calories"
              type="linear"
              stroke="#7FC8E0"
              strokeWidth={2}
              dot={true}
            />
          </LineChart>
        </ChartContainer>
      </CardContent>
    </Card>
  );
}
