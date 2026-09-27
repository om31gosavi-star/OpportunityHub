import { CATEGORIES, MODES } from "../data/opportunities.js";

const DEADLINE_OPTIONS = [
  { value: "all", label: "Any time" },
  { value: "urgent", label: "Ending soon (≤3 days)" },
  { value: "week", label: "This week" },
  { value: "month", label: "This month" },
];

const SORT_OPTIONS = [
  { value: "recommended", label: "Recommended for you" },
  { value: "deadline", label: "Deadline — soonest first" },
  { value: "newest", label: "Newest" },
];

export default function FilterPanel({ filters, onChange, onReset }) {
  function toggle(key, value) {
    const current = filters[key];
    const next = current.includes(value)
      ? current.filter((v) => v !== value)
      : [...current, value];
    onChange({ ...filters, [key]: next });
  }

  return (
    <aside className="filter-panel">
      <div className="filter-panel-header">
        <h3>Filters</h3>
        <button className="link-btn" onClick={onReset}>
          Reset
        </button>
      </div>

      <div className="filter-group">
        <span className="filter-group-label">Sort by</span>
        <select
          value={filters.sort}
          onChange={(e) => onChange({ ...filters, sort: e.target.value })}
        >
          {SORT_OPTIONS.map((opt) => (
            <option key={opt.value} value={opt.value}>
              {opt.label}
            </option>
          ))}
        </select>
      </div>

      <div className="filter-group">
        <span className="filter-group-label">Category</span>
        <div className="filter-checkboxes">
          {CATEGORIES.map((cat) => (
            <label key={cat} className="checkbox-row">
              <input
                type="checkbox"
                checked={filters.categories.includes(cat)}
                onChange={() => toggle("categories", cat)}
              />
              {cat}
            </label>
          ))}
        </div>
      </div>

      <div className="filter-group">
        <span className="filter-group-label">Mode</span>
        <div className="filter-checkboxes">
          {MODES.map((mode) => (
            <label key={mode} className="checkbox-row">
              <input
                type="checkbox"
                checked={filters.modes.includes(mode)}
                onChange={() => toggle("modes", mode)}
              />
              {mode}
            </label>
          ))}
        </div>
      </div>

      <div className="filter-group">
        <span className="filter-group-label">Deadline</span>
        <select
          value={filters.deadline}
          onChange={(e) => onChange({ ...filters, deadline: e.target.value })}
        >
          {DEADLINE_OPTIONS.map((opt) => (
            <option key={opt.value} value={opt.value}>
              {opt.label}
            </option>
          ))}
        </select>
      </div>
    </aside>
  );
}
