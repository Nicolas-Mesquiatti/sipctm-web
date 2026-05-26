export default function LogoSVG({ size = 32 }) {
  return (
    <div
      style={{
        background: 'rgba(6,8,16,0.07)',
        borderRadius: 8,
        padding: 3,
        display: 'inline-flex',
        alignItems: 'center',
        justifyContent: 'center',
        flexShrink: 0,
      }}
    >
      <img
        src="/Logo.png"
        alt="SIPCTM"
        style={{
          height: size,
          width: 'auto',
          objectFit: 'contain',
          display: 'block',
        }}
      />
    </div>
  );
}
