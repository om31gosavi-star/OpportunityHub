import { useMemo, useState } from "react";
import SearchBar from "../components/SearchBar.jsx";
import FilterPanel from "../components/FilterPanel.jsx";
import OpportunityCard from "../components/OpportunityCard.jsx";
import { daysUntil } from "../utils/deadline.js";

const DEFAULT_FILTERS = {
  categories: [],
  modes: [],
  deadline: "all",
  sort: "recommended",
};

function matchesSearch(opportunity, query) {
  if (!query.trim()) return true;
  const q = query.toLowerCase();
  const haystack = [
    opportunity.title,
    opportunity.organization,
    opportunity.category,
    opportunity.location,
    ...(opportunity.skills || []),
  ]
    .join(" ")
    .toLowerCase();
  return q.split(" ").filter(Boolean).every((term) => haystack.includes(term));
}

function matchesDeadline(opportunity, filter) {
  const days = daysUntil(opportunity.deadline);
  if (days < 0) return false;
  if (filter === "urgent") return days <= 3;
  if (filter === "week") return days <= 7;
  if (filter === "month") return days <= 30;
  return true;
}

export default function DiscoverPage({ opportunities, savedIds, onOpen, onToggleSave }) {
  const [query, setQuery] = useState("");
  const [filters, setFilters] = useState(DEFAULT_FILTERS);

  const filtered = useMemo(() => {
    let list = opportunities.filter((o) => matchesSearch(o, query));

    if (filters.categories.length > 0) {
      list = list.filter((o) => filters.categories.includes(o.category));
    }
    if (filters.modes.length > 0) {
      list = list.filter((o) => filters.modes.includes(o.mode));
    }
    if (filters.deadline !== "all") {
      list = list.filter((o) => matchesDeadline(o, filters.deadline));
    }

    if (filters.sort === "deadline") {
      list = [...list].sort((a, b) => daysUntil(a.deadline) - daysUntil(b.deadline));
    } else if (filters.sort === "newest") {
      list = [...list].sort((a, b) => b.id - a.id);
    } else {
      list = [...list].sort((a, b) => b.match.score - a.match.score);
    }

    return list;
  }, [opportunities, query, filters]);

  return (
    <div className="section">
      <div className="container">
        <div className="page-header">
          <h1>Discover opportunities</h1>
          <p>
            Search {opportunities.length} live opportunities across hackathons,
            internships, scholarships, courses, certifications, competitions
            and workshops.
          </p>
        </div>

        <SearchBar value={query} onChange={setQuery} />

        <div className="discover-layout">
          <FilterPanel
            filters={filters}
            onChange={setFilters}
            onReset={() => setFilters(DEFAULT_FILTERS)}
          />

          <div className="discover-results">
            <div className="discover-results-count">
              {filtered.length} opportunit{filtered.length === 1 ? "y" : "ies"} found
            </div>

            {filtered.length === 0 ? (
              <div className="empty-state">
                <h3>No opportunities found.</h3>
                <p>Try changing your filters or search terms.</p>
              </div>
            ) : (
              <div className="opportunity-grid">
                {filtered.map((opportunity) => (
                  <OpportunityCard
                    key={opportunity.id}
                    opportunity={opportunity}
                    isSaved={savedIds.includes(opportunity.id)}
                    onOpen={onOpen}
                    onToggleSave={onToggleSave}
                  />
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
