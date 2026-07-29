function Logo({ size = 36 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 64 64">
      <rect x="6" y="6" width="52" height="52" rx="14" fill="#4C6FFF" />
      <path
        d="M22 42 L22 22 L38 22"
        fill="none"
        stroke="#0B1120"
        strokeWidth="5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M22 22 L42 42"
        fill="none"
        stroke="#0B1120"
        strokeWidth="5"
        strokeLinecap="round"
      />
      <circle cx="42" cy="42" r="3.5" fill="#F2B84B" />
    </svg>
  );
}

export default Logo;