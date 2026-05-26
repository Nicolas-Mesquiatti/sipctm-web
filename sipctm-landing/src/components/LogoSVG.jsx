export default function LogoSVG({ size = 32, color = '#3B6BC8' }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 100 100"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      {/* Hexágono outline — parcialmente visible detrás de la llave */}
      <polygon
        points="50,8 85,28 85,72 50,92 15,72 15,28"
        stroke={color}
        strokeWidth="3"
        fill="none"
        opacity="0.45"
      />

      {/* Llave inglesa (wrench) — prominente, vertical, centrada */}
      {/* Cabeza abierta (open-end jaw) arriba */}
      <path
        d="
          M 38 22
          C 34 22 30 26 30 31
          C 30 36 34 40 38 40
          L 36 40
          L 36 42
          L 38 42
          C 35 42 32 44 32 47
          L 32 47
          C 32 44 35 42 38 42
          L 38 40
          M 62 22
          C 66 22 70 26 70 31
          C 70 36 66 40 62 40
          L 64 40
          L 64 42
          L 62 42
          C 65 42 68 44 68 47
          L 68 47
          C 68 44 65 42 62 42
          L 62 40
        "
        stroke={color}
        strokeWidth="2"
        fill="none"
      />
      {/* Cuerpo principal de la llave */}
      <path
        d="
          M 38 22 Q 34 20 30 24 Q 26 28 30 32 Q 33 36 38 35
          L 42 35 L 42 72
          Q 42 78 50 80 Q 58 78 58 72
          L 58 35 L 62 35
          Q 67 36 70 32 Q 74 28 70 24 Q 66 20 62 22
          L 60 22 Q 55 18 50 18 Q 45 18 40 22 Z
        "
        fill={color}
        opacity="0.92"
      />
      {/* Orificio redondo en la parte inferior del mango */}
      <circle cx="50" cy="69" r="4.5" fill="none" stroke="var(--bg, #060810)" strokeWidth="2.5" />

      {/* Trazados orgánicos de circuito hacia la derecha */}
      <path d="M 68 38 Q 76 38 76 44" stroke={color} strokeWidth="2.2" strokeLinecap="round" fill="none" />
      <path d="M 76 44 L 88 44" stroke={color} strokeWidth="2.2" strokeLinecap="round" fill="none" />
      <path d="M 76 44 Q 76 52 82 52 L 88 52" stroke={color} strokeWidth="2.2" strokeLinecap="round" fill="none" />
      <path d="M 76 44 Q 76 36 82 34 L 88 34" stroke={color} strokeWidth="2.2" strokeLinecap="round" fill="none" />

      {/* Nodos circulares en los extremos del circuito */}
      <circle cx="88" cy="44" r="3" fill={color} />
      <circle cx="88" cy="52" r="3" fill={color} />
      <circle cx="88" cy="34" r="3" fill={color} />
      <circle cx="76" cy="44" r="2.5" fill={color} opacity="0.6" />
    </svg>
  );
}
