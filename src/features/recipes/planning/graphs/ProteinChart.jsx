"use client";

import { Bar, BarChart, XAxis } from "recharts";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { ChartContainer } from "@/components/ui/chart";
import { format, startOfWeek, addDays, isSameDay } from "date-fns";

export default function ProteinChart({
  currentWeekRecipes,
  nextWeekRecipes,
  isNextWeek,
  color = "hsl(var(--chart-1))",
}) {
  const recipes = isNextWeek ? nextWeekRecipes : currentWeekRecipes;

  // Calculate the start of the correct week (current or next)
  const startOfDisplayedWeek = isNextWeek
    ? addDays(startOfWeek(new Date(), { weekStartsOn: 1 }), 7)
    : startOfWeek(new Date(), { weekStartsOn: 1 });

  // Generate the dates for the days of the week
  const weekDays = [...Array(7)].map((_, index) =>
    addDays(startOfDisplayedWeek, index)
  );

  const proteinData = weekDays.map((dayDate) => {
    // Filter recipes that match the current dayDate
    const filteredRecipes = recipes.filter(({ datetime }) => {
      // Convert the UTC datetime to a local date object
      const recipeDate = new Date(datetime);
      return isSameDay(recipeDate, dayDate);
    });

    // Sum up the protein for all recipes on this day
    const dailyProteinTotal = filteredRecipes.reduce(
      (total, { recipe }) => total + (recipe.protein || 0),
      0
    );

    return {
      date: format(dayDate, "EEE"), // Format date as "Mon", "Tue", etc.
      protein: dailyProteinTotal,
    };
  });

  const totalProtein = proteinData.reduce(
    (total, day) => total + day.protein,
    0
  );
  const averageProtein = (totalProtein / proteinData.length).toFixed(1);

  const message = isNextWeek
    ? "Here's the planned protein intake for next week."
    : "Here's the planned protein intake for this week.";

  return (
    <Card className="max-w-xs shadow-md">
      <CardHeader className="p-4 pb-1">
        <CardTitle>Total Protein Intake</CardTitle>
        <CardDescription>
          {message} Your average protein intake is planned to be{" "}
          {averageProtein}g per day.
        </CardDescription>
      </CardHeader>
      <CardContent className="flex flex-row items-baseline gap-4 p-4 pt-0">
        <div className="flex items-baseline gap-1 text-3xl font-bold tabular-nums leading-none">
          {totalProtein}g
          <span className="text-sm font-normal text-muted-foreground">
            total/week
          </span>
        </div>
        <ChartContainer
          config={{
            protein: {
              label: "Protein",
              color: color,
            },
          }}
          className="ml-auto w-[72px]"
        >
          <BarChart
            margin={{
              left: 0,
              right: 0,
              top: 0,
              bottom: 0,
            }}
            data={proteinData}
          >
            <Bar dataKey="protein" fill={color} radius={2} fillOpacity={0.8} />
            <XAxis
              dataKey="date"
              tickLine={false}
              axisLine={false}
              tickMargin={4}
              hide={true}
            />
          </BarChart>
        </ChartContainer>
      </CardContent>
    </Card>
  );
}
