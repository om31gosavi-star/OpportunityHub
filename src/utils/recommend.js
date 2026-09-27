import { daysUntil } from "./deadline.js";

// Weighted recommendation engine.
//
//   Score = SkillMatch    x 0.40
//         + InterestMatch x 0.30
//         + CategoryMatch x 0.15
//         + ModeMatch     x 0.10
//         + DeadlineScore x 0.05
//
// Each component is 0-100. The final score is rounded to the
// nearest whole percent and returned alongside the specific
// matched values, so the UI can show a transparent
// "why this matches you" breakdown instead of a bare number.

const WEIGHTS = {
  skills: 0.4,
  interests: 0.3,
  category: 0.15,
  mode: 0.1,
  deadline: 0.05,
};

function overlap(listA = [], listB = []) {
  const a = listA.map((item) => item.toLowerCase());
  const b = listB.map((item) => item.toLowerCase());
  return a.filter((item) => b.includes(item));
}

function ratioScore(matched, total) {
  if (!total || total.length === 0) return 0;
  return Math.round((matched.length / total.length) * 100);
}

function deadlineScore(deadline) {
  const days = daysUntil(deadline);
  if (days < 0) return 0;
  if (days <= 14) return 100;
  if (days <= 30) return 75;
  if (days <= 60) return 50;
  return 25;
}

export function scoreOpportunity(opportunity, profile) {
  const matchedSkills = overlap(profile.skills, opportunity.skills);
  const skillScore = ratioScore(matchedSkills, opportunity.skills);

  const matchedInterests = overlap(profile.interests, [
    opportunity.category,
    ...opportunity.skills,
  ]);
  const interestScore = ratioScore(
    matchedInterests,
    [opportunity.category, ...opportunity.skills].filter((v, i, arr) => arr.indexOf(v) === i)
  );

  const categoryMatch = profile.preferredCategories?.includes(opportunity.category);
  const categoryScore = categoryMatch ? 100 : 0;

  const modeMatch = profile.preferredModes?.includes(opportunity.mode);
  const modeScore = modeMatch ? 100 : 0;

  const dScore = deadlineScore(opportunity.deadline);

  const total =
    skillScore * WEIGHTS.skills +
    interestScore * WEIGHTS.interests +
    categoryScore * WEIGHTS.category +
    modeScore * WEIGHTS.mode +
    dScore * WEIGHTS.deadline;

  const reasons = [];
  matchedSkills.forEach((skill) => reasons.push(skill));
  if (categoryMatch) reasons.push(opportunity.category);
  if (modeMatch) reasons.push(opportunity.mode);

  return {
    score: Math.round(total),
    reasons: [...new Set(reasons)].slice(0, 6),
  };
}

export function rankOpportunities(opportunities, profile) {
  return opportunities
    .map((opportunity) => ({
      ...opportunity,
      match: scoreOpportunity(opportunity, profile),
    }))
    .sort((a, b) => b.match.score - a.match.score);
}
