import { useState } from "react";
import { CATEGORIES, MODES } from "../data/opportunities.js";

function TagInput({ label, values, onChange, placeholder }) {
  const [draft, setDraft] = useState("");

  function addTag() {
    const value = draft.trim();
    if (value && !values.includes(value)) {
      onChange([...values, value]);
    }
    setDraft("");
  }

  function removeTag(tag) {
    onChange(values.filter((v) => v !== tag));
  }

  return (
    <div className="form-group">
      <label>{label}</label>
      <div className="tag-input">
        {values.map((tag) => (
          <span key={tag} className="pill pill-removable">
            {tag}
            <button type="button" onClick={() => removeTag(tag)} aria-label={`Remove ${tag}`}>
              ✕
            </button>
          </span>
        ))}
        <input
          value={draft}
          onChange={(e) => setDraft(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter" || e.key === ",") {
              e.preventDefault();
              addTag();
            }
          }}
          onBlur={addTag}
          placeholder={placeholder}
        />
      </div>
    </div>
  );
}

export default function ProfilePage({ profile, onUpdate }) {
  const [form, setForm] = useState(profile);
  const [savedFlash, setSavedFlash] = useState(false);

  function update(key, value) {
    setForm((prev) => ({ ...prev, [key]: value }));
  }

  function toggleListValue(key, value) {
    const current = form[key];
    const next = current.includes(value)
      ? current.filter((v) => v !== value)
      : [...current, value];
    update(key, next);
  }

  function handleSubmit(e) {
    e.preventDefault();
    onUpdate(form);
    setSavedFlash(true);
    setTimeout(() => setSavedFlash(false), 2000);
  }

  return (
    <div className="section">
      <div className="container container-narrow">
        <div className="page-header">
          <h1>My profile</h1>
          <p>
            Your skills, interests and preferences power every match score you
            see across the app.
          </p>
        </div>

        <form className="card profile-form" onSubmit={handleSubmit}>
          <div className="form-row">
            <div className="form-group">
              <label htmlFor="name">Name</label>
              <input
                id="name"
                type="text"
                value={form.name}
                onChange={(e) => update("name", e.target.value)}
                required
              />
            </div>
            <div className="form-group">
              <label htmlFor="education">Education</label>
              <input
                id="education"
                type="text"
                value={form.education}
                onChange={(e) => update("education", e.target.value)}
              />
            </div>
          </div>

          <TagInput
            label="Skills"
            values={form.skills}
            onChange={(v) => update("skills", v)}
            placeholder="Add a skill and press Enter"
          />

          <TagInput
            label="Interests"
            values={form.interests}
            onChange={(v) => update("interests", v)}
            placeholder="Add an interest and press Enter"
          />

          <div className="form-group">
            <label>Preferred opportunity types</label>
            <div className="filter-checkboxes filter-checkboxes-row">
              {CATEGORIES.map((cat) => (
                <label key={cat} className="checkbox-row">
                  <input
                    type="checkbox"
                    checked={form.preferredCategories.includes(cat)}
                    onChange={() => toggleListValue("preferredCategories", cat)}
                  />
                  {cat}
                </label>
              ))}
            </div>
          </div>

          <div className="form-group">
            <label>Preferred mode</label>
            <div className="filter-checkboxes filter-checkboxes-row">
              {MODES.map((mode) => (
                <label key={mode} className="checkbox-row">
                  <input
                    type="checkbox"
                    checked={form.preferredModes.includes(mode)}
                    onChange={() => toggleListValue("preferredModes", mode)}
                  />
                  {mode}
                </label>
              ))}
            </div>
          </div>

          <div className="form-actions">
            <button type="submit" className="btn btn-primary">
              Save profile
            </button>
            {savedFlash && <span className="form-saved-flash">Saved ✓</span>}
          </div>
        </form>
      </div>
    </div>
  );
}
