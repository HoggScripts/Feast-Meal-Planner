import {
  PieChart,
  Pie,
  Tooltip,
  Cell,
  Label,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Legend,
} from "recharts";

// Define the COLORS constant directly here
const COLORS = [
  "#0088FE",
  "#00C49F",
  "#FFBB28",
  "#FF8042",
  "#FF6384",
  "#36A2EB",
];

export const renderPieChart = (data, dataKey, label) => (
  <PieChart width={300} height={300}>
    <Tooltip />
    <Pie
      data={data}
      dataKey={dataKey}
      nameKey="name"
      innerRadius={40}
      outerRadius={80}
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

export const renderBarChart = (data, dataKey) => (
  <BarChart width={300} height={300} data={data}>
    <XAxis dataKey="name" />
    <YAxis />
    <Tooltip />
    <Legend />
    <Bar dataKey={dataKey} fill="var(--primary)">
      {data.map((entry, index) => (
        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
      ))}
    </Bar>
  </BarChart>
);
