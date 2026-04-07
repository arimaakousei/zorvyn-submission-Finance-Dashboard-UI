import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer } from 'recharts';
import { useApp } from '../../context/AppContext';
import { CATEGORY_COLORS } from '../../data/mockData';

export default function SpendingPieChart() {
  const { getCategoryData } = useApp();
  const catData = getCategoryData().slice(0, 6);

  if (!catData.length) return <div className="empty">No expense data</div>;

  const data = catData.map(([name, value]) => ({ name, value }));

  return (
    <ResponsiveContainer width="100%" height={200}>
      <PieChart>
        <Pie data={data} cx="50%" cy="50%" innerRadius={55} outerRadius={85} dataKey="value" paddingAngle={2}>
          {data.map((entry) => (
            <Cell key={entry.name} fill={CATEGORY_COLORS[entry.name] || '#888'} />
          ))}
        </Pie>
        <Tooltip
          formatter={(v, name) => ['₹' + v.toLocaleString('en-IN'), name]}
          contentStyle={{ fontSize: 12, borderRadius: 8, border: '0.5px solid rgba(0,0,0,0.1)' }}
        />
      </PieChart>
    </ResponsiveContainer>
  );
}
