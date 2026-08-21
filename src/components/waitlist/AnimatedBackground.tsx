const particles = Array.from({ length: 50 }, (_, index) => ({
  left: `${(index * 37 + 7) % 100}%`,
  top: `${(index * 53 + 11) % 100}%`,
  size: 4 + (index % 5),
  delay: `${-(index % 11) * 1.7}s`,
  duration: `${14 + (index % 7) * 2}s`,
  drift: `${(index % 2 === 0 ? 1 : -1) * (20 + (index % 5) * 9)}px`,
}));

export default function AnimatedBackground() {
  return (
    <div className="fixed inset-0 z-0 overflow-hidden bg-[#2a211d]" aria-hidden="true">
      <div className="background-glow background-glow-top" />
      <div className="background-glow background-glow-bottom" />
      <div className="absolute inset-0 opacity-70">
        {particles.map((particle, index) => (
          <span
            key={index}
            className="particle"
            style={
              {
                left: particle.left,
                top: particle.top,
                width: particle.size,
                height: particle.size,
                animationDelay: particle.delay,
                animationDuration: particle.duration,
                "--particle-drift": particle.drift,
              } as React.CSSProperties
            }
          />
        ))}
      </div>
      <div className="background-grid absolute inset-0" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_0%,rgba(42,33,29,0.18)_55%,rgba(42,33,29,0.78)_100%)]" />
    </div>
  );
}
