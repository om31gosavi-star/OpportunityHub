// Thin wrapper around localStorage so the rest of the app never
// touches window.localStorage directly, and survives environments
// where storage is unavailable (private browsing, SSR, etc).

const SAVED_KEY = "opportunityhub:saved";
const PROFILE_KEY = "opportunityhub:profile";

export const DEFAULT_PROFILE = {
  name: " ",
  education: " ",
  skills: [],
  interests: [],
  preferredCategories: [],
  preferredModes: [],
};

function safeGet(key, fallback) {
  try {
    const raw = window.localStorage.getItem(key);
    if (!raw) return fallback;
    return JSON.parse(raw);
  } catch {
    return fallback;
  }
}

function safeSet(key, value) {
  try {
    window.localStorage.setItem(key, JSON.stringify(value));
  } catch {
    // Storage unavailable — fail silently, app still works in-memory
    // for the current session.
  }
}

export function getSavedIds() {
  return safeGet(SAVED_KEY, []);
}

export function setSavedIds(ids) {
  safeSet(SAVED_KEY, ids);
}

export function toggleSaved(id) {
  const current = getSavedIds();
  const next = current.includes(id)
    ? current.filter((savedId) => savedId !== id)
    : [...current, id];
  setSavedIds(next);
  return next;
}

export function getProfile() {
  return safeGet(PROFILE_KEY, DEFAULT_PROFILE);
}

export function setProfile(profile) {
  safeSet(PROFILE_KEY, profile);
}
