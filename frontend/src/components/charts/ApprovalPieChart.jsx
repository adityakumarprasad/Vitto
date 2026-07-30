// ============================================================
// ApprovalPieChart.jsx – Approved vs Rejected pie chart
// ============================================================

import { PieChart, Pie, Cell, Tooltip, Legend, ResponsiveContainer } from 'recharts';

const COLORS = ['#2f8f72', '#c45c4a'];

function ApprovalPieChart({ data = [] }) {
  const hasData = data.some((d) => d.value > 0);

  if (!hasData) {
    return <p className="py-10 text-center text-sm text-ink-700/50">No data yet</p>;
  }

  return (
    <ResponsiveContainer width="100%" height={260}>
      <PieChart>
        <Pie
          data={data}
          dataKey="value"
          nameKey="name"
          cx="50%"
          cy="50%"
          innerRadius={55}
          outerRadius={90}
          paddingAngle={3}
        >
          {data.map((entry, index) => (
            <Cell key={entry.name} fill={COLORS[index % COLORS.length]} />
          ))}
        </Pie>
        <Tooltip />
        <Legend />
      </PieChart>
    </ResponsiveContainer>
  );
}

export default ApprovalPieChart;
