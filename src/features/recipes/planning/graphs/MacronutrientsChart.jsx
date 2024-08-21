"use client";

import { Bar, BarChart, LabelList, XAxis, YAxis } from "recharts";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { ChartContainer } from "@/components/ui/chart";
import { Separator } from "@/components/ui/separator";

export default function MacronutrientsChart({
  currentWeekRecipes,
  nextWeekRecipes,
  isNextWeek,
  colors = {},
}) {
  const recipes = isNextWeek ? nextWeekRecipes : currentWeekRecipes;

  const chartColors = {
    fat: "#7FC8E0", // Use bluesecondary for fat
    carbs: "#7FC8E0", // Use bluesecondary for carbs
    protein: "#7FC8E0", // Use bluesecondary for protein
    ...colors,
  };

  const totals = recipes.reduce(
    (acc, { recipe }) => {
      acc.fat += recipe.fat || 0;
      acc.carbs += recipe.carbohydrates || 0;
      acc.protein += recipe.protein || 0;
      return acc;
    },
    { fat: 0, carbs: 0, protein: 0 }
  );

  const data = [
    {
      nutrient: "Fat",
      value: totals.fat,
      label: `${totals.fat}g`,
      fill: chartColors.fat,
    },
    {
      nutrient: "Carbs",
      value: totals.carbs,
      label: `${totals.carbs}g`,
      fill: chartColors.carbs,
    },
    {
      nutrient: "Protein",
      value: totals.protein,
      label: `${totals.protein}g`,
      fill: chartColors.protein,
    },
  ];

  return (
    <Card className="shadow-md" style={{ height: "250px", width: "360px" }}>
      {" "}
      {/* Use w-full to take up full width */}
      <CardContent className="flex gap-4 p-4 pb-2">
        <ChartContainer
          config={{
            fat: {
              label: "Fat",
              color: chartColors.fat,
            },
            carbs: {
              label: "Carbs",
              color: chartColors.carbs,
            },
            protein: {
              label: "Protein",
              color: chartColors.protein,
            },
          }}
          className="h-[140px] w-full" // Ensure it takes up the full width
        >
          <BarChart
            margin={{
              left: 0,
              right: 0,
              top: 0,
              bottom: 10,
            }}
            data={data}
            layout="vertical"
            barSize={32}
            barGap={2}
          >
            <XAxis type="number" dataKey="value" hide />
            <YAxis
              dataKey="nutrient"
              type="category"
              tickLine={false}
              tickMargin={4}
              axisLine={false}
              className="capitalize"
            />
            <Bar dataKey="value" radius={5}>
              <LabelList
                position="insideLeft"
                dataKey="label"
                fill="white"
                offset={8}
                fontSize={12}
              />
            </Bar>
          </BarChart>
        </ChartContainer>
      </CardContent>
      <CardFooter className="flex flex-row border-t p-4">
        <div className="flex w-full items-center gap-2">
          <div className="grid flex-1 auto-rows-min gap-0.5">
            <div className="text-xs text-muted-foreground">Fat</div>
            <div className="flex items-baseline gap-1 text-2xl font-bold tabular-nums leading-none">
              {totals.fat}
              <span className="text-sm font-normal text-muted-foreground">
                g
              </span>
            </div>
          </div>
          <Separator orientation="vertical" className="mx-2 h-10 w-px" />
          <div className="grid flex-1 auto-rows-min gap-0.5">
            <div className="text-xs text-muted-foreground">Carbs</div>
            <div className="flex items-baseline gap-1 text-2xl font-bold tabular-nums leading-none">
              {totals.carbs}
              <span className="text-sm font-normal text-muted-foreground">
                g
              </span>
            </div>
          </div>
          <Separator orientation="vertical" className="mx-2 h-10 w-px" />
          <div className="grid flex-1 auto-rows-min gap-0.5">
            <div className="text-xs text-muted-foreground">Protein</div>
            <div className="flex items-baseline gap-1 text-2xl font-bold tabular-nums leading-none">
              {totals.protein}
              <span className="text-sm font-normal text-muted-foreground">
                g
              </span>
            </div>
          </div>
        </div>
      </CardFooter>
    </Card>
  );
}
