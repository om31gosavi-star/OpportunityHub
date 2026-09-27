export function getOpportunityStatus(opportunity) {
  const deadline = new Date(opportunity.deadline);
  deadline.setHours(23, 59, 59, 999);
  const now = new Date();

  if (deadline < now) return 'closed';
  if (opportunity.verified === false) return 'unverified';
  return 'active';
}

export function isOpportunityOpen(opportunity) {
  const deadline = new Date(opportunity.deadline);
  deadline.setHours(23, 59, 59, 999);
  return deadline >= new Date();
}

export function getVerificationLabel(opportunity) {
  if (opportunity.verified === false) return 'Needs verification';
  return opportunity.source === 'Official Website' ? 'Official source' : 'Source listed';
}
