// Deadline helpers shared across the app.

export function daysUntil(deadline) {
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  const target = new Date(deadline);
  target.setHours(0, 0, 0, 0);
  const diffMs = target.getTime() - today.getTime();
  return Math.ceil(diffMs / (1000 * 60 * 60 * 24));
}

export function deadlineStatus(deadline) {
  const days = daysUntil(deadline);
  if (days < 0) return { label: "Closed", tone: "closed", days };
  if (days <= 3) return { label: `${days} day${days === 1 ? "" : "s"} left`, tone: "urgent", days };
  if (days <= 10) return { label: `${days} days left`, tone: "soon", days };
  return { label: `${days} days left`, tone: "open", days };
}

export function formatDate(deadline) {
  return new Date(deadline).toLocaleDateString("en-IN", {
    day: "numeric",
    month: "short",
    year: "numeric",
  });
}
