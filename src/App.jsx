import { useEffect, useMemo, useState } from "react";
import { Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar.jsx";
import Footer from "./components/Footer.jsx";
import OpportunityModal from "./components/OpportunityModal.jsx";
import HomePage from "./pages/HomePage.jsx";
import DiscoverPage from "./pages/DiscoverPage.jsx";
import SavedPage from "./pages/SavedPage.jsx";
import DashboardPage from "./pages/DashboardPage.jsx";
import ProfilePage from "./pages/ProfilePage.jsx";
import opportunitiesData from "./data/opportunities.js";
import { rankOpportunities } from "./utils/recommend.js";
import { getSavedIds, toggleSaved, getProfile, setProfile as persistProfile } from "./utils/storage.js";

export default function App() {
  const [savedIds, setSavedIds] = useState([]);
  const [profile, setProfileState] = useState(getProfile());
  const [activeOpportunity, setActiveOpportunity] = useState(null);

  useEffect(() => {
    setSavedIds(getSavedIds());
  }, []);

  const ranked = useMemo(
    () => rankOpportunities(opportunitiesData, profile),
    [profile]
  );

  function handleToggleSave(id) {
    const next = toggleSaved(id);
    setSavedIds(next);
    setActiveOpportunity((current) =>
      current && current.id === id ? current : current
    );
  }

  function handleUpdateProfile(nextProfile) {
    setProfileState(nextProfile);
    persistProfile(nextProfile);
  }

  const sharedProps = {
    opportunities: ranked,
    savedIds,
    profile,
    onOpen: setActiveOpportunity,
    onToggleSave: handleToggleSave,
  };

  return (
    <div className="app-shell">
      <Navbar />

      <main className="app-main">
        <Routes>
          <Route path="/" element={<HomePage {...sharedProps} />} />
          <Route path="/discover" element={<DiscoverPage {...sharedProps} />} />
          <Route path="/saved" element={<SavedPage {...sharedProps} />} />
          <Route path="/dashboard" element={<DashboardPage {...sharedProps} />} />
          <Route
            path="/profile"
            element={<ProfilePage profile={profile} onUpdate={handleUpdateProfile} />}
          />
        </Routes>
      </main>

      <Footer />

      <OpportunityModal
        opportunity={activeOpportunity}
        isSaved={activeOpportunity ? savedIds.includes(activeOpportunity.id) : false}
        onClose={() => setActiveOpportunity(null)}
        onToggleSave={handleToggleSave}
      />
    </div>
  );
}
