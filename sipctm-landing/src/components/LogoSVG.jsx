export default function LogoSVG({ size = 40, animated = false }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 100 100"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      {/* Hexagon outline */}
      <polygon
        points="50,4 93,27 93,73 50,96 7,73 7,27"
        stroke="#3B6BC8"
        strokeWidth="5"
        fill={animated ? 'none' : 'rgba(59,107,200,0.08)'}
        className={animated ? 'logo-hex' : ''}
      />
      {/* Wrench body */}
      <path
        d="M38 62 L55 45 Q64 36 72 38 Q74 46 65 55 L48 72 Q44 76 40 72 Q36 68 38 62Z"
        fill="#3B6BC8"
        className={animated ? 'logo-wrench' : ''}
      />
      {/* Wrench handle */}
      <rect
        x="26"
        y="56"
        width="22"
        height="8"
        rx="4"
        transform="rotate(-45 37 60)"
        fill="#5B8FE8"
        className={animated ? 'logo-wrench' : ''}
      />
      {/* Circuit dot top-left */}
      <circle cx="22" cy="35" r="3" fill="#7AB0FF" className={animated ? 'logo-circuit-1' : ''} />
      {/* Circuit line top */}
      <line x1="22" y1="35" x2="38" y2="35" stroke="#7AB0FF" strokeWidth="2" strokeLinecap="round" className={animated ? 'logo-circuit-1' : ''} />
      {/* Circuit dot top-right */}
      <circle cx="72" cy="30" r="2.5" fill="#7AB0FF" className={animated ? 'logo-circuit-2' : ''} />
      {/* Circuit dot bottom-right */}
      <circle cx="78" cy="65" r="3" fill="#5B8FE8" className={animated ? 'logo-circuit-3' : ''} />
      {/* Circuit line bottom-right */}
      <line x1="78" y1="65" x2="65" y2="65" stroke="#5B8FE8" strokeWidth="2" strokeLinecap="round" className={animated ? 'logo-circuit-3' : ''} />
    </svg>
  );
}
