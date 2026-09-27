import Logo from "./Logo.jsx";

export default function Footer() {
  return (
    <footer className="footer">
      <div className="container footer-inner">
        <div>
          <Logo size={22} />
          <p className="footer-tagline">
            One place to discover, match and apply — built for FIT-FEST 2026.
          </p>
        </div>
        <div className="footer-meta">
          <span>Discover • Match • Save • Apply</span>
          <span>&copy; {new Date().getFullYear()} OpportunityHub</span>
        </div>
      </div>
    </footer>
  );
}
