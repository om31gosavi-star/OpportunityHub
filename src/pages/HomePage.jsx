import { Link } from "react-router-dom";
import { CATEGORIES } from "../data/opportunities.js";

const CATEGORY_ICONS = {
  Hackathon: "⚡",
  Internship: "💼",
  Scholarship: "🎓",
  Competition: "🏆",
  Course: "📚",
  Certification: "📜",
  Workshop: "🛠️",
};

export default function HomePage({ opportunities }) {
  const total = opportunities.length;

  return (
    <div>
      <section className="hero">
        <div className="container hero-inner">
          <div className="hero-copy">
            <h1>
              Every opportunity you qualify for.
              <br />
              One place to find it.
            </h1>
            <p className="hero-sub">
              OpportunityHub brings internships, hackathons, scholarships,
              courses, certifications, competitions and workshops together —
              then ranks them against your skills so you spend less time
              searching and more time applying.
            </p>
            <div className="hero-actions">
              <Link to="/discover" className="btn btn-primary btn-lg">
                Discover opportunities
              </Link>
              <Link to="/profile" className="btn btn-outline btn-lg">
                Build your profile
              </Link>
            </div>
          </div>

          <div className="hero-stat-strip">
            <div>
              <span className="hero-stat-value">{total}</span>
              <span className="hero-stat-label">live opportunities</span>
            </div>
            <div>
              <span className="hero-stat-value">7</span>
              <span className="hero-stat-label">categories covered</span>
            </div>
            <div>
              <span className="hero-stat-value">100%</span>
              <span className="hero-stat-label">matched to your skills</span>
            </div>
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <h2 className="section-title">Browse by category</h2>
          <div className="category-grid">
            {CATEGORIES.map((cat) => (
              <Link key={cat} to="/discover" className="category-tile">
                <span className="category-tile-icon">{CATEGORY_ICONS[cat]}</span>
                <span>{cat}</span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="section section-muted">
        <div className="container how-it-works">
          <h2 className="section-title">How it works</h2>
          <div className="steps-grid">
            <div className="step-card">
              <h3>1. Tell us your skills</h3>
              <p>Fill in your skills, interests and preferences once on your profile.</p>
            </div>
            <div className="step-card">
              <h3>2. Get ranked matches</h3>
              <p>
                Every opportunity gets a match score based on skills, interests,
                category and mode — with a plain-language reason why.
              </p>
            </div>
            <div className="step-card">
              <h3>3. Save and apply</h3>
              <p>
                Bookmark what matters, track deadlines from your dashboard, and
                apply directly on the organizer's site.
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
