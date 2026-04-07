import { useApp } from '../context/AppContext';
import { CATEGORY_COLORS } from '../data/mockData';

function fmt(n) {
  return '₹' + Math.abs(n).toLocaleString('en-IN');
}

export default function Insights() {
  const { getStats, getCategoryData, getMonthlyData } = useApp();
  const { income, expenses, balance } = getStats();
  const catData = getCategoryData();
  const monthly = getMonthlyData();
  const topCat = catData[0];
  const savingsRate = income ? Math.round((balance / income) * 100) : 0;
  const expenseRatio = income ? Math.round((expenses / income) * 100) : 0;
  const savColor = savingsRate > 20 ? 'var(--green-mid)' : savingsRate > 0 ? 'var(--amber-mid)' : 'var(--red-mid)';

  return (
    <>
      <div className="grid-4" style={{ marginBottom: 20 }}>
        <div className="insight-card">
          <div className="metric-label">Savings Rate</div>
          <div className="insight-num" style={{ color: savColor }}>{savingsRate}%</div>
          <div className="insight-desc">{savingsRate > 20 ? 'Healthy savings' : 'Try to save more'}</div>
        </div>
        <div className="insight-card">
          <div className="metric-label">Top Spending</div>
          <div className="insight-num" style={{ color: 'var(--red-mid)' }}>{topCat ? topCat[0] : '—'}</div>
          <div className="insight-desc">{topCat ? fmt(topCat[1]) + ' spent' : 'No data'}</div>
        </div>
        <div className="insight-card">
          <div className="metric-label">Expense Ratio</div>
          <div className="insight-num">{expenseRatio}%</div>
          <div className="insight-desc">of income spent</div>
        </div>
        <div className="insight-card">
          <div className="metric-label">Net Saved</div>
          <div className="insight-num" style={{ color: balance >= 0 ? 'var(--green-mid)' : 'var(--red-mid)' }}>
            {fmt(balance)}
          </div>
          <div className="insight-desc">{balance >= 0 ? "You're in the green" : 'Spending exceeds income'}</div>
        </div>
      </div>

      <div className="grid-2">
        <div className="card">
          <div className="section-title">Category Breakdown</div>
          {catData.length === 0 ? (
            <div className="empty">No expense data</div>
          ) : (
            catData.slice(0, 6).map(([cat, amt]) => {
              const pct = expenses ? Math.round((amt / expenses) * 100) : 0;
              return (
                <div key={cat} style={{ marginBottom: 12 }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 13, marginBottom: 4 }}>
                    <span style={{ display: 'flex', alignItems: 'center' }}>
                      <span className="cat-dot" style={{ background: CATEGORY_COLORS[cat] || '#888' }} />
                      {cat}
                    </span>
                    <span style={{ color: 'var(--text2)' }}>
                      {fmt(amt)} <span style={{ color: 'var(--text3)' }}>({pct}%)</span>
                    </span>
                  </div>
                  <div className="progress-bar">
                    <div className="progress-fill" style={{ width: pct + '%', background: CATEGORY_COLORS[cat] || '#888' }} />
                  </div>
                </div>
              );
            })
          )}
        </div>

        <div className="card">
          <div className="section-title">Monthly Trend</div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
            {monthly.labels.map((label, i) => {
              const d = monthly.data[i];
              const net = d.income - d.expenses;
              return (
                <div key={label} className="insight-card" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '10px 14px' }}>
                  <span style={{ fontSize: 13, fontWeight: 500 }}>{label}</span>
                  <span style={{ fontSize: 12, color: 'var(--green-mid)' }}>+{fmt(d.income)}</span>
                  <span style={{ fontSize: 12, color: 'var(--red-mid)' }}>-{fmt(d.expenses)}</span>
                  <span style={{ fontSize: 13, fontWeight: 600, color: net >= 0 ? 'var(--green-mid)' : 'var(--red-mid)' }}>
                    {net >= 0 ? '+' : ''}{fmt(net)}
                  </span>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </>
  );
}
