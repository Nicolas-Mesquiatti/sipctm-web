export default function LogoSVG({ size = 32 }) {
  return (
    <>
      <style>{`
        .sipctm-logo { transition: filter 0.3s ease; }
        [data-theme="light"] .sipctm-logo { filter: brightness(0.75) contrast(1.1); }
      `}</style>
      <div
        style={{
          display: 'inline-flex',
          alignItems: 'center',
          justifyContent: 'center',
          flexShrink: 0,
        }}
      >
        <img
          src="/Logo.png"
          alt="SIPCTM"
          className="sipctm-logo"
          style={{
            height: size,
            width: 'auto',
            objectFit: 'contain',
            display: 'block',
          }}
        />
      </div>
    </>
  );
}
