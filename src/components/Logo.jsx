export default function Logo({ size = 28 }) {
  return (
    <span className="logo">
      <svg
        width={size}
        height={size}
        viewBox="0 0 100 100"
        aria-hidden="true"
        focusable="false"
      >
        <rect width="100" height="100" rx="22" fill="var(--color-primary)" />
        <path
          d="M30 55 L45 70 L72 35"
          stroke="white"
          strokeWidth="9"
          fill="none"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
      <span className="logo-word">
        Opportunity<span className="logo-word-accent">Hub</span>
      </span>
    </span>
  );
}
