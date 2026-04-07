import { useApp } from '../context/AppContext';

export default function RoleSwitcher() {
  const { role, toggleRole } = useApp();
  return (
    <button className={`role-badge ${role}`} onClick={toggleRole} title="Click to switch role">
      {role === 'admin' ? '⚙ Admin' : '◉ Viewer'}
    </button>
  );
}
