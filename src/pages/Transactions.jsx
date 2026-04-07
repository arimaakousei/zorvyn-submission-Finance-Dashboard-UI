import { useState } from 'react';
import { useApp } from '../context/AppContext';
import { CATEGORIES } from '../data/mockData';
import TransactionTable from '../components/TransactionTable';
import TransactionModal from '../components/TransactionModal';

export default function Transactions() {
  const { role, filters, setFilters, getFilteredTransactions, transactions } = useApp();
  const [showAdd, setShowAdd] = useState(false);

  const filtered = getFilteredTransactions();

  function exportCSV() {
    const rows = ['Date,Description,Category,Type,Amount', ...filtered.map(t => `${t.date},"${t.desc}",${t.cat},${t.type},${t.amount}`)];
    const a = document.createElement('a');
    a.href = URL.createObjectURL(new Blob([rows.join('\n')], { type: 'text/csv' }));
    a.download = 'transactions.csv';
    a.click();
  }

  return (
    <div className="card" style={{ marginBottom: 0 }}>
      <div className="section-title">
        All Transactions
        {role === 'admin' && (
          <button className="btn btn-primary btn-sm" onClick={() => setShowAdd(true)}>+ Add Transaction</button>
        )}
      </div>

      <div className="filters">
        <input
          type="text"
          placeholder="Search transactions..."
          value={filters.search}
          onChange={e => setFilters(f => ({ ...f, search: e.target.value }))}
        />
        <select value={filters.type} onChange={e => setFilters(f => ({ ...f, type: e.target.value }))}>
          <option value="all">All Types</option>
          <option value="income">Income</option>
          <option value="expense">Expenses</option>
        </select>
        <select value={filters.cat} onChange={e => setFilters(f => ({ ...f, cat: e.target.value }))}>
          <option value="all">All Categories</option>
          {CATEGORIES.map(c => <option key={c} value={c}>{c}</option>)}
        </select>
        <select value={filters.sortBy} onChange={e => setFilters(f => ({ ...f, sortBy: e.target.value }))}>
          <option value="date">Sort by Date</option>
          <option value="amount">Sort by Amount</option>
          <option value="cat">Sort by Category</option>
        </select>
        <button className="btn btn-sm" onClick={() => setFilters(f => ({ ...f, sortDir: f.sortDir === 'asc' ? 'desc' : 'asc' }))}>
          {filters.sortDir === 'asc' ? '↑ Asc' : '↓ Desc'}
        </button>
        <button className="btn btn-sm" onClick={exportCSV}>↓ CSV</button>
      </div>

      <div style={{ fontSize: 12, color: 'var(--text3)', marginBottom: 10 }}>
        {filtered.length} result{filtered.length !== 1 ? 's' : ''}
      </div>

      <TransactionTable transactions={filtered} />

      {showAdd && <TransactionModal onClose={() => setShowAdd(false)} />}
    </div>
  );
}
