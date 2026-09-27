# OpportunityHub

**Student Opportunity Discovery Platform — built for FIT-FEST 2026**

Discover • Match • Save • Apply

---

## 1. Problem statement

Students today have access to thousands of internships, hackathons,
scholarships, courses, certifications, competitions and workshops — but
these opportunities are scattered across dozens of platforms, college
notice boards and social media posts. As a result, students routinely
miss opportunities they were qualified for, simply because they never
found them, or found them after the deadline had passed.

## 2. Solution

OpportunityHub brings every category of opportunity into a single,
searchable platform, and layers a transparent recommendation engine on
top: every listing is scored against the student's own skills,
interests and preferences, so the most relevant opportunities surface
first — with a plain-language explanation of *why* each one matches.

## 3. Features

**Core**
- Home, Discover, Saved, Dashboard and Profile pages
- Full-text search across title, organization, skill and location
- Category filter (Hackathon, Internship, Scholarship, Competition,
  Course, Certification, Workshop) and mode filter (Online / Offline /
  Hybrid)
- Opportunity detail modal with description, eligibility, reward,
  skills, deadline and an external "Apply / Visit" link
- Bookmark/save any opportunity, persisted in the browser

**Personalization**
- Editable profile: skills, interests, preferred categories, preferred
  mode
- Weighted match score per opportunity (see [Recommendation logic](#7-recommendation-logic))
- "Why this matches you" breakdown on every opportunity

**Smart features**
- Live deadline countdown (`Xd left`) with urgency tiers: urgent
  (≤3 days), closing soon (≤10 days), open
- Dashboard with recommended-, saved-, closing-soon- and
  skill-matching counts, a ranked recommendation list and deadline
  alerts for saved opportunities
- Friendly empty states for no-results search, no saved items, etc.

**Engineering**
- Fully responsive layout (mobile / tablet / desktop)
- Client-side persistence via `localStorage` — no backend required for
  the MVP
- Clean component architecture (`pages/`, `components/`, `utils/`,
  `data/`)
- Dockerized, with an `nginx` SPA fallback configured for Cloud Run

## 4. Screenshots

_Add screenshots of Home, Discover, the opportunity modal and Dashboard
here before submission._

## 5. Tech stack

| Layer          | Choice                              |
| -------------- | ------------------------------------ |
| Frontend       | React 18 + Vite                     |
| Routing        | react-router-dom                    |
| State          | React state + `localStorage`        |
| Styling        | Plain CSS (custom design system)    |
| Containerizing | Docker (multi-stage) + Nginx        |
| Deployment     | Google Cloud Run                    |

This is intentionally **Version A** from the project plan — a fast,
dependency-light MVP — rather than a full Node/Express/MySQL stack.
The brief allows an open technology stack and prioritizes a working
MVP over a large production system; see [Future scope](#13-future-scope)
for the full-stack extension path (Version B).

## 6. System architecture

```
                    ┌──────────────────┐
                    │   OpportunityHub │
                    │      Website     │
                    └────────┬─────────┘
                             │
                             ▼
                    ┌──────────────────┐
                    │      React       │
                    │     Frontend     │
                    └────────┬─────────┘
                             │
              ┌──────────────┼──────────────┐
              │              │              │
              ▼              ▼              ▼
          Discover       Profile        Dashboard
              │              │              │
              └──────────────┼──────────────┘
                             ▼
                 ┌─────────────────────┐
                 │ Recommendation      │
                 │ Engine              │
                 └──────────┬──────────┘
                             │
                             ▼
                 ┌─────────────────────┐
                 │ Opportunity Dataset │
                 └─────────────────────┘
                             │
                             ▼
                    External Websites
```

## 7. Recommendation logic

Each opportunity is scored 0–100 against the student's profile:

```
Score = SkillMatch    × 40%
      + InterestMatch × 30%
      + CategoryMatch × 15%
      + ModeMatch      × 10%
      + DeadlineRelevance × 5%
```

- **Skill match** — share of the opportunity's required skills that
  overlap with the student's stated skills.
- **Interest match** — share of the opportunity's category + skills
  that overlap with the student's stated interests.
- **Category match** — whether the opportunity's category is in the
  student's preferred categories.
- **Mode match** — whether the opportunity's mode (Online / Offline /
  Hybrid) matches the student's preferred modes.
- **Deadline relevance** — opportunities closing soon are weighted
  slightly higher so time-sensitive matches aren't buried.

The matched skills/category/mode that contributed to the score are
also surfaced as a "why this matches you" list, so the recommendation
is explainable rather than a bare number.

See `src/utils/recommend.js` for the implementation.

## 8. Installation

Requirements: Node.js 18+ and npm.

```bash
git clone <YOUR_GITHUB_REPOSITORY_URL>
cd OpportunityHub
npm install
```

## 9. Running locally

```bash
npm run dev
```

Open `http://localhost:5173`.

## 10. Docker

```bash
docker build -t opportunityhub .
docker run -p 8080:8080 opportunityhub
```

Open `http://localhost:8080`.

## 11. Deployment (Google Cloud Run)

```bash
gcloud auth login
gcloud config set project YOUR_PROJECT_ID
gcloud run deploy opportunityhub --source . --region asia-south1 --allow-unauthenticated
```

Cloud Run returns a URL such as:

```
https://opportunityhub-xxxxx-asia-south1.run.app
```

Use that as the live demo link in your submission. After deploying,
manually re-test every route (`/`, `/discover`, `/saved`, `/dashboard`,
`/profile`) **and refresh on each one** — the included `nginx.conf`
SPA fallback (`try_files $uri $uri/ /index.html`) is what keeps direct
refreshes working on Cloud Run.

## 12. Project structure

```
OpportunityHub/
├── package.json
├── index.html
├── vite.config.js
├── Dockerfile
├── nginx.conf
├── README.md
├── .gitignore
└── src/
    ├── App.jsx
    ├── main.jsx
    ├── styles.css
    ├── pages/
    │   ├── HomePage.jsx
    │   ├── DiscoverPage.jsx
    │   ├── SavedPage.jsx
    │   ├── DashboardPage.jsx
    │   └── ProfilePage.jsx
    ├── components/
    │   ├── Logo.jsx
    │   ├── Navbar.jsx
    │   ├── Footer.jsx
    │   ├── OpportunityCard.jsx
    │   ├── OpportunityModal.jsx
    │   ├── SearchBar.jsx
    │   ├── FilterPanel.jsx
    │   ├── RecommendationBadge.jsx
    │   └── StatCard.jsx
    ├── data/
    │   └── opportunities.js
    └── utils/
        ├── recommend.js
        ├── deadline.js
        └── storage.js
```

## 13. Future scope

- **Full-stack version (Version B):** Node.js + Express API backed by
  MySQL (`users`, `profiles`, `opportunities`, `skills`,
  `saved_opportunities`), so profiles and saved items persist per
  account instead of per browser.
- **Authentication:** email/password + JWT, gating `/dashboard` and
  `/profile` behind a real account.
- **Community submissions:** allow verified organizations to submit
  opportunities, clearly labeled "Community-added" vs. "Official"
  pending moderation.
- **Admin dashboard:** add/edit/delete/approve opportunities, view
  registered users.
- **Larger dataset:** grow from the current curated set toward
  50–100+ opportunities once a backend/admin flow exists to manage
  them safely.
- **Notifications:** email or push reminders as saved deadlines
  approach.

## 14. Team / developer

**Om Gosavi** — BTech, Artificial Intelligence & Data Science

Built for the FIT-FEST 2026 hackathon challenge: a functional MVP for
student opportunity discovery with filtering, recommendations,
bookmarking and a personalized dashboard.
