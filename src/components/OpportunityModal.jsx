import { useEffect } from "react";
import { deadlineStatus, formatDate } from "../utils/deadline.js";
import RecommendationBadge from "./RecommendationBadge.jsx";

export default function OpportunityModal({ opportunity, isSaved, onClose, onToggleSave }) {
  useEffect(() => {
    function onKey(e) {
      if (e.key === "Escape") onClose();
    }
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [onClose]);

  if (!opportunity) return null;

  const status = deadlineStatus(opportunity.deadline);

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div
        className="modal"
        role="dialog"
        aria-modal="true"
        aria-labelledby="modal-title"
        onClick={(e) => e.stopPropagation()}
      >
        <button className="modal-close" onClick={onClose} aria-label="Close">
          ✕
        </button>

        <span className="tag">{opportunity.category}</span>
        <h2 id="modal-title" className="modal-title">
          {opportunity.title}
        </h2>
        <p className="modal-org">{opportunity.organization}</p>

        {opportunity.match && (
          <div className="modal-match">
            <RecommendationBadge score={opportunity.match.score} />
            {opportunity.match.reasons.length > 0 && (
              <div className="modal-match-reasons">
                <span className="modal-match-label">Why this matches you</span>
                <ul>
                  {opportunity.match.reasons.map((reason) => (
                    <li key={reason}>✓ {reason}</li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        )}

        <dl className="modal-grid">
          <div>
            <dt>Location</dt>
            <dd>{opportunity.location}</dd>
          </div>
          <div>
            <dt>Mode</dt>
            <dd>{opportunity.mode}</dd>
          </div>
          <div>
            <dt>Deadline</dt>
            <dd>
              {formatDate(opportunity.deadline)}{" "}
              <span className={`deadline-chip deadline-${status.tone}`}>
                {status.tone === "closed" ? "Closed" : status.label}
              </span>
            </dd>
          </div>
          <div>
            <dt>Reward</dt>
            <dd>{opportunity.reward}</dd>
          </div>
        </dl>

        {opportunity.skills?.length > 0 && (
          <div className="modal-section">
            <h3>Skills</h3>
            <div className="opportunity-card-skills">
              {opportunity.skills.map((skill) => (
                <span key={skill} className="pill">
                  {skill}
                </span>
              ))}
            </div>
          </div>
        )}

        <div className="modal-section">
          <h3>Description</h3>
          <p>{opportunity.description}</p>
        </div>

        <div className="modal-section">
          <h3>Eligibility</h3>
          <p>{opportunity.eligibility}</p>
        </div>

        <p className="modal-source">Source: {opportunity.source}</p>

        <div className="modal-actions">
          <a
            className="btn btn-primary"
            href={opportunity.applyUrl}
            target="_blank"
            rel="noopener noreferrer"
          >
            Apply / Visit
          </a>
          <button
            className={`btn btn-outline ${isSaved ? "is-saved" : ""}`}
            onClick={() => onToggleSave(opportunity.id)}
          >
            {isSaved ? "★ Saved" : "☆ Save"}
          </button>
        </div>
      </div>
    </div>
  );
}
