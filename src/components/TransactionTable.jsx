import { useState } from 'react';
import { CATEGORY_COLORS } from '../data/mockData';
import { useApp } from '../context/AppContext';
import TransactionModal from './TransactionModal';

function fmt(n) {
  return '₹' + Math.abs(n).toLocaleString('en-IN');
}
function fmtDate(d) {
  return new Date(d).toLocaleDateString('en-IN', { day: '2-digit', month: 'short', year: 'numeric' });
}

export default function TransactionTable({ transactions, limit }) {
  const { role } = useApp();
  const [editTxn, setEditTxn] = useState(null);
  const list = limit ? transactions.slice(0, limit) : transactions;

  if (!list.length) return <div className="empty">No transactions found</div>;

  return (
    <>
      <div style={{ overflowX: 'auto' }}>
        <table>
          <thead>
            <tr>
              <th>Date</th>
              <th>Description</th>
              <th>Category</th>
              <th>Type</th>
              <th style={{ textAlign: 'right' }}>Amount</th>
              {role === 'admin' && <th></th>}
            </tr>
          </thead>
          <tbody>
            {list.map(t => (
              <tr key={t.id}>
                <td style={{ color: 'var(--text2)', fontSize: 12 }}>{fmtDate(t.date)}</td>
                <td style={{ fontWeight: 500 }}>{t.desc}</td>
                <td>
                  <span style={{ display: 'flex', alignItems: 'center' }}>
                    <span className="cat-dot" style={{ background: CATEGORY_COLORS[t.cat] || '#888' }} />
                    {t.cat}
                  </span>
                </td>
                <td>
                  <span className={`badge badge-${t.type === 'income' ? 'green' : 'red'}`}>
                    {t.type === 'income' ? '↑ Income' : '↓ Expense'}
                  </span>
                </td>
                <td style={{
                  textAlign: 'right', fontWeight: 500,
                  fontFamily: "'DM Mono', monospace",
                  color: t.type === 'income' ? 'var(--green-mid)' : 'var(--red-mid)',
                }}>
                  {t.type === 'income' ? '+' : '-'}{fmt(t.amount)}
                </td>
                {role === 'admin' && (
                  <td>
                    <button className="btn btn-sm" onClick={() => setEditTxn(t)}>edit</button>
                  </td>
                )}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {editTxn && <TransactionModal txn={editTxn} onClose={() => setEditTxn(null)} />}
    </>
  );
}
