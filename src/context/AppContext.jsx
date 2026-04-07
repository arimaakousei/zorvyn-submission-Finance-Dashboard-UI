import { createContext, useContext, useState, useEffect } from 'react';
import { INITIAL_TRANSACTIONS } from '../data/mockData';

const AppContext = createContext(null);

export function AppProvider({ children }) {
  const [transactions, setTransactions] = useState(() => {
    try {
      const saved = localStorage.getItem('fintrack_txns');
      return saved ? JSON.parse(saved) : INITIAL_TRANSACTIONS;
    } catch {
      return INITIAL_TRANSACTIONS;
    }
  });

  const [role, setRole] = useState(() => localStorage.getItem('fintrack_role') || 'viewer');
  const [theme, setTheme] = useState(() => localStorage.getItem('fintrack_theme') || 'light');
  const [tab, setTab] = useState('dashboard');
  const [filters, setFilters] = useState({ search: '', type: 'all', cat: 'all', sortBy: 'date', sortDir: 'desc' });

  useEffect(() => {
    localStorage.setItem('fintrack_txns', JSON.stringify(transactions));
  }, [transactions]);

  useEffect(() => {
    localStorage.setItem('fintrack_role', role);
  }, [role]);

  useEffect(() => {
    localStorage.setItem('fintrack_theme', theme);
    document.documentElement.setAttribute('data-theme', theme);
  }, [theme]);

  function addTransaction(txn) {
    setTransactions(prev => [{ ...txn, id: Date.now() }, ...prev]);
  }

  function updateTransaction(updated) {
    setTransactions(prev => prev.map(t => t.id === updated.id ? updated : t));
  }

  function deleteTransaction(id) {
    setTransactions(prev => prev.filter(t => t.id !== id));
  }

  function toggleTheme() {
    setTheme(t => t === 'dark' ? 'light' : 'dark');
  }

  function toggleRole() {
    setRole(r => r === 'admin' ? 'viewer' : 'admin');
  }

  function getStats() {
    const income = transactions.filter(t => t.type === 'income').reduce((a, t) => a + t.amount, 0);
    const expenses = transactions.filter(t => t.type === 'expense').reduce((a, t) => a + t.amount, 0);
    return { income, expenses, balance: income - expenses };
  }

  function getFilteredTransactions() {
    let list = [...transactions];
    if (filters.search) {
      const q = filters.search.toLowerCase();
      list = list.filter(t => t.desc.toLowerCase().includes(q) || t.cat.toLowerCase().includes(q));
    }
    if (filters.type !== 'all') list = list.filter(t => t.type === filters.type);
    if (filters.cat !== 'all') list = list.filter(t => t.cat === filters.cat);
    list.sort((a, b) => {
      const av = a[filters.sortBy], bv = b[filters.sortBy];
      if (typeof av === 'string') return filters.sortDir === 'asc' ? av.localeCompare(bv) : bv.localeCompare(av);
      return filters.sortDir === 'asc' ? av - bv : bv - av;
    });
    return list;
  }

  function getMonthlyData() {
    const months = {};
    transactions.forEach(t => {
      const key = t.date.substring(0, 7);
      if (!months[key]) months[key] = { income: 0, expenses: 0 };
      months[key][t.type === 'income' ? 'income' : 'expenses'] += t.amount;
    });
    const sorted = Object.keys(months).sort();
    return {
      labels: sorted.map(k => {
        const [y, m] = k.split('-');
        return new Date(y, m - 1).toLocaleDateString('en-IN', { month: 'short', year: '2-digit' });
      }),
      data: sorted.map(k => months[k]),
    };
  }

  function getCategoryData() {
    const cats = {};
    transactions.filter(t => t.type === 'expense').forEach(t => {
      cats[t.cat] = (cats[t.cat] || 0) + t.amount;
    });
    return Object.entries(cats).sort((a, b) => b[1] - a[1]);
  }

  return (
    <AppContext.Provider value={{
      transactions, role, theme, tab, filters,
      setTab, setFilters,
      addTransaction, updateTransaction, deleteTransaction,
      toggleTheme, toggleRole,
      getStats, getFilteredTransactions, getMonthlyData, getCategoryData,
    }}>
      {children}
    </AppContext.Provider>
  );
}

export function useApp() {
  return useContext(AppContext);
}
