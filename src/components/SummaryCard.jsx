export default function SummaryCard({ label, value, sub, color, badge }) {
  return (
    <div className="card-sm">
      <div className="metric-label">{label}</div>
      <div className="metric-value" style={{ color }}>{value}</div>
      {(sub || badge) && (
        <div className="metric-sub">
          {badge && <span className={`badge badge-${badge.variant}`}>{badge.text}</span>}
          {sub && <span>{sub}</span>}
        </div>
      )}
    </div>
  );
}
