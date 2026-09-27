import { useMemo } from "react";
import { Link } from "react-router-dom";
import StatCard from "../components/StatCard.jsx";
import RecommendationBadge from "../components/RecommendationBadge.jsx";
import { daysUntil, deadlineStatus, formatDate } from "../utils/deadline.js";

function greeting() {
  const hour = new Date().getHours();
  if (hour < 12) return "Good morning";
  if (hour < 18) return "Good afternoon";
  return "Good evening";
}

export default function DashboardPage({ opportunities, savedIds, profile, onOpen }) {
  const stats = useMemo(() => {
    const recommended = opportunities.filter((o) => o.match.score >= 75).length;
    const closingSoon = opportunities.filter((o) => {
      const days = daysUntil(o.deadline);
      return days >= 0 && days <= 7;
    }).length;
    const matchingSkills = opportunities.filter((o) => o.match.reasons.length > 0).length;
    return { recommended, saved: savedIds.length, closingSoon, matchingSkills };
  }, [opportunities, savedIds]);

  const topRecommended = useMemo(
    () => opportunities.slice(0, 5),
    [opportunities]
  );

  const deadlineAlerts = useMemo(() => {
    return opportunities
      .filter((o) => savedIds.includes(o.id))
      .map((o) => ({ opportunity: o, status: deadlineStatus(o.deadline) }))
      .filter(({ status }) => status.tone === "urgent" || status.tone === "soon")
      .sort((a, b) => a.status.days - b.status.days)
      .slice(0, 5);
  }, [opportunities, savedIds]);

  return (
    <div className="section">
      <div className="container">
        <div className="page-header">
          <h1>
            {greeting()}, {profile.name.split(" ")[0]} 👋
          </h1>
          <p>Your personalized opportunity dashboard.</p>
        </div>

        <div className="stat-grid">
          <StatCard value={stats.recommended} label="Recommended" tone="primary" />
          <StatCard value={stats.saved} label="Saved" tone="default" />
          <StatCard value={stats.closingSoon} label="Closing soon" tone="urgent" />
          <StatCard value={stats.matchingSkills} label="Matching your skills" tone="default" />
        </div>

        <div className="dashboard-grid">
          <div className="dashboard-panel">
            <div className="dashboard-panel-header">
              <h2>Recommended for you</h2>
              <Link to="/discover" className="link-btn">
                See all
              </Link>
            </div>
            <ul className="recommend-list">
              {topRecommended.map((o) => (
                <li key={o.id}>
                  <button className="recommend-list-item" onClick={() => onOpen(o)}>
                    <div>
                      <span className="recommend-list-title">{o.title}</span>
                      <span className="recommend-list-org">{o.organization}</span>
                    </div>
                    <RecommendationBadge score={o.match.score} />
                  </button>
                </li>
              ))}
            </ul>
          </div>

          <div className="dashboard-panel">
            <div className="dashboard-panel-header">
              <h2>Deadline alerts</h2>
              <Link to="/saved" className="link-btn">
                View saved
              </Link>
            </div>
            {deadlineAlerts.length === 0 ? (
              <p className="dashboard-empty">
                No saved opportunities are closing soon. Save a few from
                Discover to track their deadlines here.
              </p>
            ) : (
              <ul className="alert-list">
                {deadlineAlerts.map(({ opportunity, status }) => (
                  <li key={opportunity.id} className={`alert-item alert-${status.tone}`}>
                    <span>{opportunity.title}</span>
                    <span className={`deadline-chip deadline-${status.tone}`}>
                      {status.label} · {formatDate(opportunity.deadline)}
                    </span>
                  </li>
                ))}
              </ul>
            )}
          </div>
        </div>

        <div className="dashboard-panel dashboard-profile-summary">
          <div className="dashboard-panel-header">
            <h2>Profile snapshot</h2>
            <Link to="/profile" className="link-btn">
              Edit profile
            </Link>
          </div>
          <div className="profile-summary-grid">
            <div>
              <span className="profile-summary-label">Education</span>
              <p>{profile.education}</p>
            </div>
            <div>
              <span className="profile-summary-label">Skills</span>
              <div className="opportunity-card-skills">
                {profile.skills.map((skill) => (
                  <span key={skill} className="pill">
                    {skill}
                  </span>
                ))}
              </div>
            </div>
            <div>
              <span className="profile-summary-label">Interests</span>
              <div className="opportunity-card-skills">
                {profile.interests.map((interest) => (
                  <span key={interest} className="pill pill-muted">
                    {interest}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
