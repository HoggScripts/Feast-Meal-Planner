import { BarChart, Bar, XAxis, YAxis, Tooltip, Legend, Cell } from "recharts";

const COLORS = ["#FF8042", "#00C49F", "#FFBB28"];

const CaloriesContributionBarChart = ({ data }) => (
  <BarChart width={500} height={300} data={data}>
    <XAxis dataKey="name" />
    <YAxis />
    <Tooltip />
    <Legend />
    <Bar dataKey="value" fill="var(--primary)">
      {data.map((entry, index) => (
        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
      ))}
    </Bar>
  </BarChart>
);

export default CaloriesContributionBarChart;
