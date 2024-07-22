import * as React from "react";
import {
  Label,
  Pie,
  PieChart,
  Tooltip,
  Cell,
  Bar,
  BarChart,
  XAxis,
  YAxis,
  Legend,
} from "recharts";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import useIngredientStore from "../../hooks/useIngredientStore";
import styles from "../styles/TabbedCharts.module.css";

const COLORS = [
  "#0088FE",
  "#00C49F",
  "#FFBB28",
  "#FF8042",
  "#FF6384",
  "#36A2EB",
];

const TabbedCharts = () => {
  const { ingredients } = useIngredientStore();

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

  const renderPieChart = (data, dataKey, label) => (
    <PieChart width={300} height={300} className={styles.chart}>
      <Tooltip />
      <Pie
        data={data}
        dataKey={dataKey}
        nameKey="name"
        innerRadius={40}
        outerRadius={80}
        fill="#8884d8"
        label
      >
        {data.map((entry, index) => (
          <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
        ))}
        <Label
          content={({ viewBox }) => {
            if (viewBox && "cx" in viewBox && "cy" in viewBox) {
              return (
                <text
                  x={viewBox.cx}
                  y={viewBox.cy}
                  textAnchor="middle"
                  dominantBaseline="middle"
                >
                  <tspan
                    x={viewBox.cx}
                    y={viewBox.cy}
                    className="fill-foreground text-2xl font-bold"
                  >
                    {data
                      .reduce((acc, curr) => acc + curr.value, 0)
                      .toLocaleString()}
                  </tspan>
                  <tspan
                    x={viewBox.cx}
                    y={(viewBox.cy || 0) + 20}
                    className="fill-muted-foreground"
                  >
                    {label}
                  </tspan>
                </text>
              );
            }
          }}
        />
      </Pie>
    </PieChart>
  );

  const renderBarChart = (data, dataKey, label) => (
    <BarChart width={300} height={300} data={data} className={styles.chart}>
      <XAxis dataKey="name" />
      <YAxis />
      <Tooltip />
      <Legend />
      <Bar dataKey={dataKey} fill="#8884d8">
        {data.map((entry, index) => (
          <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
        ))}
      </Bar>
    </BarChart>
  );

  return (
    <Tabs defaultValue="tab1" className="w-full">
      <TabsList className="grid grid-cols-6 mb-4">
        <TabsTrigger value="tab1">Macro Pie</TabsTrigger>
        <TabsTrigger value="tab2">Cost Pie</TabsTrigger>
        <TabsTrigger value="tab3">Calories Pie</TabsTrigger>
        <TabsTrigger value="tab4">Macro Bar</TabsTrigger>
        <TabsTrigger value="tab5">Cost Bar</TabsTrigger>
        <TabsTrigger value="tab6">Calories Bar</TabsTrigger>
      </TabsList>
      <TabsContent value="tab1">
        <Card className={`${styles.card} h-full`}>
          <CardHeader className={styles.chartHeader}>
            <CardTitle className={styles.chartTitle}>
              Macronutrient Distribution
            </CardTitle>
            <CardDescription className={styles.chartDescription}>
              Percentage of carbohydrates, fats, and proteins
            </CardDescription>
          </CardHeader>
          <CardContent className={styles.chartContainer}>
            {renderPieChart(nutrientData, "value", "Macronutrients")}
          </CardContent>
          <CardFooter className={styles.cardFooter}>
            {/* Optional Footer */}
          </CardFooter>
        </Card>
      </TabsContent>
      <TabsContent value="tab2">
        <Card className={`${styles.card} h-full`}>
          <CardHeader className={styles.chartHeader}>
            <CardTitle className={styles.chartTitle}>
              Cost Contribution
            </CardTitle>
            <CardDescription className={styles.chartDescription}>
              Cost contribution of each ingredient
            </CardDescription>
          </CardHeader>
          <CardContent className={styles.chartContainer}>
            {renderPieChart(costData, "value", "Total Cost")}
          </CardContent>
          <CardFooter className={styles.cardFooter}>
            {/* Optional Footer */}
          </CardFooter>
        </Card>
      </TabsContent>
      <TabsContent value="tab3">
        <Card className={`${styles.card} h-full`}>
          <CardHeader className={styles.chartHeader}>
            <CardTitle className={styles.chartTitle}>
              Calories Contribution
            </CardTitle>
            <CardDescription className={styles.chartDescription}>
              Percentage of total calories contributed by each ingredient
            </CardDescription>
          </CardHeader>
          <CardContent className={styles.chartContainer}>
            {renderPieChart(caloriesData, "value", "Total Calories")}
          </CardContent>
          <CardFooter className={styles.cardFooter}>
            {/* Optional Footer */}
          </CardFooter>
        </Card>
      </TabsContent>
      <TabsContent value="tab4">
        <Card className={`${styles.card} h-full`}>
          <CardHeader className={styles.chartHeader}>
            <CardTitle className={styles.chartTitle}>
              Macronutrient Distribution
            </CardTitle>
            <CardDescription className={styles.chartDescription}>
              Percentage of carbohydrates, fats, and proteins
            </CardDescription>
          </CardHeader>
          <CardContent className={styles.chartContainer}>
            {renderBarChart(nutrientData, "value", "Macronutrients")}
          </CardContent>
          <CardFooter className={styles.cardFooter}>
            {/* Optional Footer */}
          </CardFooter>
        </Card>
      </TabsContent>
      <TabsContent value="tab5">
        <Card className={`${styles.card} h-full`}>
          <CardHeader className={styles.chartHeader}>
            <CardTitle className={styles.chartTitle}>
              Cost Contribution
            </CardTitle>
            <CardDescription className={styles.chartDescription}>
              Cost contribution of each ingredient
            </CardDescription>
          </CardHeader>
          <CardContent className={styles.chartContainer}>
            {renderBarChart(costData, "value", "Total Cost")}
          </CardContent>
          <CardFooter className={styles.cardFooter}>
            {/* Optional Footer */}
          </CardFooter>
        </Card>
      </TabsContent>
      <TabsContent value="tab6">
        <Card className={`${styles.card} h-full`}>
          <CardHeader className={styles.chartHeader}>
            <CardTitle className={styles.chartTitle}>
              Calories Contribution
            </CardTitle>
            <CardDescription className={styles.chartDescription}>
              Percentage of total calories contributed by each ingredient
            </CardDescription>
          </CardHeader>
          <CardContent className={styles.chartContainer}>
            {renderBarChart(caloriesData, "value", "Total Calories")}
          </CardContent>
          <CardFooter className={styles.cardFooter}>
            {/* Optional Footer */}
          </CardFooter>
        </Card>
      </TabsContent>
    </Tabs>
  );
};

export default TabbedCharts;
