export default function LogoSVG({ size = 32, color = '#3B6BC8' }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 100 100"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      {/* Hexágono outline */}
      <polygon
        points="50,5 90,27.5 90,72.5 50,95 10,72.5 10,27.5"
        stroke={color}
        strokeWidth="5"
        fill="none"
      />

      {/* Llave inglesa — cuerpo */}
      <path
        d="M45 25 C38 25 32 31 32 38 C32 42 34 46 37 48 L28 65 C26 68 27 72 30 74 C33 76 37 75 39 72 L48 55 C51 56 54 56 57 54 C63 51 66 44 63 38 C61 34 57 31 53 31 L50 38 L45 38 L42 35 L45 28 Z"
        fill={color}
        opacity="0.9"
      />

      {/* Trazados de circuito */}
      <line x1="62" y1="45" x2="75" y2="45" stroke={color} strokeWidth="3" strokeLinecap="round" />
      <line x1="75" y1="45" x2="75" y2="35" stroke={color} strokeWidth="3" strokeLinecap="round" />
      <line x1="75" y1="35" x2="85" y2="35" stroke={color} strokeWidth="3" strokeLinecap="round" />
      <line x1="75" y1="45" x2="75" y2="55" stroke={color} strokeWidth="3" strokeLinecap="round" />
      <line x1="75" y1="55" x2="85" y2="55" stroke={color} strokeWidth="3" strokeLinecap="round" />

      {/* Nodos del circuito */}
      <circle cx="85" cy="35" r="3" fill={color} />
      <circle cx="85" cy="55" r="3" fill={color} />
      <circle cx="75" cy="45" r="3" fill={color} />
    </svg>
  );
}
