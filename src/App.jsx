import { useApp } from './context/AppContext';
import RoleSwitcher from './components/RoleSwitcher';
import Dashboard from './pages/Dashboard';
import Transactions from './pages/Transactions';
import Insights from './components/Insights';

const TABS = [
  { id: 'dashboard', label: 'Dashboard' },
  { id: 'transactions', label: 'Transactions' },
  { id: 'insights', label: 'Insights' },
];

export default function App() {
  const { tab, setTab, theme, toggleTheme } = useApp();

  return (
    <div id="app" data-theme={theme}>
      <div className="topbar">
        <div className="topbar-left">
          <div className="logo">fin<span>track</span></div>
          <div className="nav-tabs">
            {TABS.map(t => (
              <button
                key={t.id}
                className={`nav-tab ${tab === t.id ? 'active' : ''}`}
                onClick={() => setTab(t.id)}
              >
                {t.label}
              </button>
            ))}
          </div>
        </div>
        <div className="topbar-right">
          <RoleSwitcher />
          <button className="dark-toggle" onClick={toggleTheme}>
            {theme === 'dark' ? '☾' : '☀'}
          </button>
        </div>
      </div>

      <div className="main">
        {tab === 'dashboard' && <Dashboard />}
        {tab === 'transactions' && <Transactions />}
        {tab === 'insights' && <Insights />}
      </div>
    </div>
  );
}
