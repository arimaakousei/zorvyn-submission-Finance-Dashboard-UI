import { useApp } from '../context/AppContext';
import SummaryCard from '../components/SummaryCard';
import TransactionTable from '../components/TransactionTable';
import BalanceLineChart from '../components/Charts/LineChart';
import SpendingPieChart from '../components/Charts/PieChart';
import { CATEGORY_COLORS } from '../data/mockData';

function fmt(n) {
  return '₹' + Math.abs(n).toLocaleString('en-IN');
}

export default function Dashboard() {
  const { getStats, transactions, getCategoryData } = useApp();
  const { income, expenses, balance } = getStats();
  const txnCount = transactions.length;
  const avgTxn = txnCount ? Math.round(expenses / txnCount) : 0;
  const catData = getCategoryData().slice(0, 5);
  const recent = [...transactions].sort((a, b) => b.date.localeCompare(a.date)).slice(0, 5);

  return (
    <>
      <div className="grid-4">
        <SummaryCard
          label="Total Balance"
          value={fmt(balance)}
          color={balance >= 0 ? 'var(--green-mid)' : 'var(--red-mid)'}
          badge={{ text: balance >= 0 ? '▲ Surplus' : '▼ Deficit', variant: balance >= 0 ? 'green' : 'red' }}
        />
        <SummaryCard
          label="Total Income"
          value={fmt(income)}
          color="var(--green-mid)"
          badge={{ text: '▲ Income', variant: 'green' }}
        />
        <SummaryCard
          label="Total Expenses"
          value={fmt(expenses)}
          color="var(--red-mid)"
          badge={{ text: '▼ Spent', variant: 'red' }}
        />
        <SummaryCard
          label="Transactions"
          value={txnCount}
          sub={`Avg: ${fmt(avgTxn)}`}
        />
      </div>

      <div className="grid-3">
        <div className="card">
          <div className="section-title">Monthly Overview</div>
          <BalanceLineChart />
        </div>
        <div className="card">
          <div className="section-title">Spending by Category</div>
          <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap', marginBottom: 10 }}>
            {catData.map(([cat]) => (
              <span key={cat} style={{ display: 'flex', alignItems: 'center', gap: 3, fontSize: 11, color: 'var(--text2)' }}>
                <span style={{ width: 8, height: 8, borderRadius: 2, background: CATEGORY_COLORS[cat], display: 'inline-block' }} />
                {cat}
              </span>
            ))}
          </div>
          <SpendingPieChart />
        </div>
      </div>

      <div className="card">
        <div className="section-title">
          Recent Transactions
          <span style={{ fontSize: 12, color: 'var(--text3)', fontWeight: 400 }}>{transactions.length} total</span>
        </div>
        <TransactionTable transactions={recent} limit={5} />
      </div>
    </>
  );
}
