export default function SearchBar({ value, onChange, placeholder }) {
  return (
    <div className="search-bar">
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden="true">
        <circle cx="11" cy="11" r="7" stroke="currentColor" strokeWidth="2" />
        <path d="M21 21l-4.3-4.3" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
      </svg>
      <input
        type="text"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder || "Search by title, organization, skill or location..."}
        aria-label="Search opportunities"
      />
      {value && (
        <button className="search-clear" onClick={() => onChange("")} aria-label="Clear search">
          ✕
        </button>
      )}
    </div>
  );
}
