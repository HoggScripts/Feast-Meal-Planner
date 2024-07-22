import { BarChart, Bar, XAxis, YAxis, Tooltip, Legend, Cell } from "recharts";

const COLORS = ["#FF8042", "#FF6384", "#36A2EB"];

const CostContributionBarChart = ({ data }) => (
  <BarChart width={500} height={300} data={data}>
    <XAxis dataKey="name" />
    <YAxis />
    <Tooltip />
    <Legend />
    <Bar dataKey="value" fill="#8884d8">
      {data.map((entry, index) => (
        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
      ))}
    </Bar>
  </BarChart>
);

export default CostContributionBarChart;
