import { useMemo } from "react";
import { Link } from "react-router-dom";
import OpportunityCard from "../components/OpportunityCard.jsx";
import { daysUntil } from "../utils/deadline.js";

export default function SavedPage({ opportunities, savedIds, onOpen, onToggleSave }) {
  const saved = useMemo(() => {
    return opportunities
      .filter((o) => savedIds.includes(o.id))
      .sort((a, b) => daysUntil(a.deadline) - daysUntil(b.deadline));
  }, [opportunities, savedIds]);

  return (
    <div className="section">
      <div className="container">
        <div className="page-header">
          <h1>My saved opportunities</h1>
          <p>
            {saved.length} saved · sorted by nearest deadline first.
          </p>
        </div>

        {saved.length === 0 ? (
          <div className="empty-state">
            <h3>You haven't saved anything yet.</h3>
            <p>Bookmark opportunities from Discover to track them here.</p>
            <Link to="/discover" className="btn btn-primary">
              Go to Discover
            </Link>
          </div>
        ) : (
          <div className="opportunity-grid">
            {saved.map((opportunity) => (
              <OpportunityCard
                key={opportunity.id}
                opportunity={opportunity}
                isSaved
                onOpen={onOpen}
                onToggleSave={onToggleSave}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
