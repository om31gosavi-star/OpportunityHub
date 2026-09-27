export default function RecommendationBadge({ score }) {
  if (score === undefined || score === null) return null;

  let tone = "low";
  if (score >= 75) tone = "high";
  else if (score >= 50) tone = "mid";

  return (
    <span className={`match-badge match-badge-${tone}`}>
      <span className="match-badge-star">★</span> {score}% match
    </span>
  );
}
