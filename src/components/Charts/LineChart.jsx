import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { useApp } from '../../context/AppContext';

function fmtK(v) {
  return '₹' + (v / 1000).toFixed(0) + 'k';
}

export default function BalanceLineChart() {
  const { getMonthlyData } = useApp();
  const { labels, data } = getMonthlyData();
  const chartData = labels.map((label, i) => ({
    month: label,
    income: data[i].income,
    expenses: data[i].expenses,
  }));

  return (
    <ResponsiveContainer width="100%" height={220}>
      <LineChart data={chartData} margin={{ top: 5, right: 10, left: 0, bottom: 5 }}>
        <CartesianGrid strokeDasharray="3 3" stroke="rgba(128,128,128,0.15)" />
        <XAxis dataKey="month" tick={{ fontSize: 11, fill: '#888780' }} />
        <YAxis tickFormatter={fmtK} tick={{ fontSize: 11, fill: '#888780' }} width={52} />
        <Tooltip
          formatter={(v, name) => ['₹' + v.toLocaleString('en-IN'), name]}
          contentStyle={{ fontSize: 12, borderRadius: 8, border: '0.5px solid rgba(0,0,0,0.1)' }}
        />
        <Line type="monotone" dataKey="income" stroke="#639922" strokeWidth={2} dot={{ r: 4, fill: '#639922' }} name="Income" />
        <Line type="monotone" dataKey="expenses" stroke="#e24b4a" strokeWidth={2} dot={{ r: 4, fill: '#e24b4a' }} name="Expenses" />
      </LineChart>
    </ResponsiveContainer>
  );
}
