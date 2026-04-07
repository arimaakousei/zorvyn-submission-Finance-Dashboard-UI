import { useState } from 'react';
import { CATEGORIES } from '../data/mockData';
import { useApp } from '../context/AppContext';

export default function TransactionModal({ txn, onClose }) {
  const { addTransaction, updateTransaction, deleteTransaction } = useApp();
  const isEdit = !!txn;
  const [form, setForm] = useState(txn || {
    date: new Date().toISOString().split('T')[0],
    desc: '', cat: 'Food', type: 'expense', amount: '',
  });

  function handle(e) {
    setForm(f => ({ ...f, [e.target.name]: e.target.value }));
  }

  function submit() {
    if (!form.desc || !form.amount || !form.date) return;
    const data = { ...form, amount: parseFloat(form.amount) };
    if (isEdit) updateTransaction(data);
    else addTransaction(data);
    onClose();
  }

  function remove() {
    deleteTransaction(txn.id);
    onClose();
  }

  return (
    <div className="modal-overlay" onClick={e => e.target === e.currentTarget && onClose()}>
      <div className="modal">
        <div className="modal-title">{isEdit ? 'Edit' : 'Add'} Transaction</div>

        <div className="form-group">
          <label className="form-label">Description</label>
          <input className="form-input" name="desc" value={form.desc} onChange={handle} placeholder="e.g. Grocery Store" />
        </div>

        <div className="form-group">
          <label className="form-label">Amount (₹)</label>
          <input className="form-input" type="number" name="amount" value={form.amount} onChange={handle} placeholder="0" />
        </div>

        <div className="form-group">
          <label className="form-label">Date</label>
          <input className="form-input" type="date" name="date" value={form.date} onChange={handle} />
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10 }}>
          <div className="form-group">
            <label className="form-label">Type</label>
            <select className="form-input" name="type" value={form.type} onChange={handle}>
              <option value="expense">Expense</option>
              <option value="income">Income</option>
            </select>
          </div>
          <div className="form-group">
            <label className="form-label">Category</label>
            <select className="form-input" name="cat" value={form.cat} onChange={handle}>
              {CATEGORIES.map(c => <option key={c} value={c}>{c}</option>)}
            </select>
          </div>
        </div>

        <div className="modal-actions">
          <button className="btn" onClick={onClose}>Cancel</button>
          {isEdit && (
            <button className="btn" style={{ color: 'var(--red)', borderColor: 'var(--red)' }} onClick={remove}>
              Delete
            </button>
          )}
          <button className="btn btn-primary" onClick={submit}>{isEdit ? 'Save' : 'Add'}</button>
        </div>
      </div>
    </div>
  );
}
