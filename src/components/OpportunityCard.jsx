import { deadlineStatus, formatDate } from "../utils/deadline.js";
import RecommendationBadge from "./RecommendationBadge.jsx";

export default function OpportunityCard({
  opportunity,
  isSaved,
  onOpen,
  onToggleSave,
}) {
  const status = deadlineStatus(opportunity.deadline);

  return (
    <article className="card opportunity-card">
      <div className="opportunity-card-top">
        <span className="tag">{opportunity.category}</span>
        <button
          className={`save-btn ${isSaved ? "is-saved" : ""}`}
          onClick={(e) => {
            e.stopPropagation();
            onToggleSave(opportunity.id);
          }}
          aria-pressed={isSaved}
          aria-label={isSaved ? "Remove from saved" : "Save opportunity"}
          title={isSaved ? "Remove from saved" : "Save opportunity"}
        >
          {isSaved ? "★" : "☆"}
        </button>
      </div>

      <button className="opportunity-card-body" onClick={() => onOpen(opportunity)}>
        <h3 className="opportunity-card-title">{opportunity.title}</h3>
        <p className="opportunity-card-org">{opportunity.organization}</p>

        <div className="opportunity-card-meta">
          <span>{opportunity.mode}</span>
          <span aria-hidden="true">·</span>
          <span>{opportunity.location}</span>
        </div>

        {opportunity.skills?.length > 0 && (
          <div className="opportunity-card-skills">
            {opportunity.skills.slice(0, 3).map((skill) => (
              <span key={skill} className="pill">
                {skill}
              </span>
            ))}
            {opportunity.skills.length > 3 && (
              <span className="pill pill-muted">+{opportunity.skills.length - 3}</span>
            )}
          </div>
        )}
      </button>

      <div className="opportunity-card-footer">
        <span className={`deadline-chip deadline-${status.tone}`}>
          {status.tone === "closed" ? "Closed" : status.label}
        </span>
        <span className="opportunity-card-date">{formatDate(opportunity.deadline)}</span>
        {opportunity.match && <RecommendationBadge score={opportunity.match.score} />}
      </div>
    </article>
  );
}
