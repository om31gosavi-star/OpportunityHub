import { useState } from "react";
import { NavLink } from "react-router-dom";
import Logo from "./Logo.jsx";

const LINKS = [
  { to: "/", label: "Home", end: true },
  { to: "/discover", label: "Discover" },
  { to: "/saved", label: "Saved" },
  { to: "/dashboard", label: "Dashboard" },
  { to: "/profile", label: "Profile" },
];

export default function Navbar() {
  const [open, setOpen] = useState(false);

  return (
    <header className="navbar">
      <div className="navbar-inner container">
        <NavLink to="/" className="navbar-brand" onClick={() => setOpen(false)}>
          <Logo />
        </NavLink>

        <nav className={`navbar-links ${open ? "is-open" : ""}`}>
          {LINKS.map((link) => (
            <NavLink
              key={link.to}
              to={link.to}
              end={link.end}
              className={({ isActive }) =>
                "navbar-link" + (isActive ? " is-active" : "")
              }
              onClick={() => setOpen(false)}
            >
              {link.label}
            </NavLink>
          ))}
          <NavLink
            to="/discover"
            className="btn btn-primary navbar-cta"
            onClick={() => setOpen(false)}
          >
            Get started
          </NavLink>
        </nav>

        <button
          className="navbar-toggle"
          aria-label="Toggle navigation menu"
          aria-expanded={open}
          onClick={() => setOpen((v) => !v)}
        >
          <span />
          <span />
          <span />
        </button>
      </div>
    </header>
  );
}
