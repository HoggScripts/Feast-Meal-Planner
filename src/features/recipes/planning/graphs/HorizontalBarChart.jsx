import React from "react";
import {
  Bar,
  BarChart,
  XAxis,
  YAxis,
  LabelList,
  CartesianGrid,
} from "recharts";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import { startOfWeek, addDays, isSameDay, format } from "date-fns";

export function HorizontalBarChart({
  currentWeekRecipes,
  nextWeekRecipes,
  isNextWeek,
  dataKey,
  title,
  colors,
}) {
  const recipes = isNextWeek ? nextWeekRecipes : currentWeekRecipes;

  // Determine the start of the current or next week
  const startOfDisplayedWeek = isNextWeek
    ? addDays(startOfWeek(new Date(), { weekStartsOn: 1 }), 7)
    : startOfWeek(new Date(), { weekStartsOn: 1 });

  // Generate chart data for each day of the week
  const chartData = [...Array(7)].map((_, index) => {
    const dayDate = addDays(startOfDisplayedWeek, index);
    const dayName = format(dayDate, "EEE");

    // Filter recipes for the current day and calculate the total for the dataKey
    const dayTotal = recipes
      .filter(({ datetime }) => isSameDay(new Date(datetime), dayDate))
      .reduce((total, { recipe }) => total + (recipe[dataKey] || 0), 0);

    return {
      name: dayName,
      [dataKey]: dayTotal,
    };
  });

  const totalValue = chartData.reduce((acc, curr) => acc + curr[dataKey], 0);

  const chartConfig = {
    [title.toLowerCase()]: {
      label: title,
      color: colors ? colors[0] : "var(--chart-1)",
    },
  };

  return (
    <Card className="flex flex-col shadow-md">
      <CardHeader className="">
        <CardTitle>{title}</CardTitle>
        <CardDescription>
          {format(startOfDisplayedWeek, "MMM dd")} -{" "}
          {format(addDays(startOfDisplayedWeek, 6), "MMM dd")}
        </CardDescription>
      </CardHeader>
      <CardContent className="">
        <ChartContainer config={chartConfig} className="mx-auto">
          <BarChart layout="vertical" data={chartData}>
            <CartesianGrid horizontal={false} />
            <XAxis type="number" hide />
            <YAxis
              type="category"
              dataKey="name"
              tickLine={false}
              axisLine={false}
              width={150}
              hide
            />
            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent hideLabel />}
            />
            <Bar dataKey={dataKey} fill={colors[0]} radius={4}>
              <LabelList
                dataKey="name"
                position="insideLeft"
                offset={8}
                className="fill-[--color-label]"
                fontSize={12}
              />
            </Bar>
          </BarChart>
        </ChartContainer>
        <div className="leading-none text-muted-foreground flex p-5">
          Total calories for the week: {totalValue} kcal
        </div>
      </CardContent>
    </Card>
  );
}
