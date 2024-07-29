import { PieChart, Pie, Tooltip, Cell, Label } from "recharts";

const COLORS = ["#FF8042", "#FF6384", "#36A2EB"];

const CostContributionPieChart = ({ data }) => (
  <PieChart width={400} height={400}>
    <Tooltip />
    <Pie
      data={data}
      dataKey="value"
      nameKey="name"
      innerRadius={60}
      outerRadius={120}
      fill="var(--primary)"
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
                  className="fill-foreground text-3xl font-bold"
                >
                  {data
                    .reduce((acc, curr) => acc + curr.value, 0)
                    .toLocaleString()}
                </tspan>
                <tspan
                  x={viewBox.cx}
                  y={(viewBox.cy || 0) + 24}
                  className="fill-muted-foreground"
                >
                  Total Cost
                </tspan>
              </text>
            );
          }
        }}
      />
    </Pie>
  </PieChart>
);

export default CostContributionPieChart;
