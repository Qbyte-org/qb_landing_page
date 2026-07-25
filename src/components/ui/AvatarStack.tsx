// Overlapping initials avatars for social proof. Self-contained (no images).
const people: { initials: string; color: string }[] = [
  { initials: "AO", color: "#ff6b00" },
  { initials: "CN", color: "#22c55e" },
  { initials: "TB", color: "#1a1a2e" },
  { initials: "FE", color: "#ff8c00" },
];

export default function AvatarStack() {
  return (
    <div className="flex -space-x-3" aria-hidden="true">
      {people.map((p) => (
        <span
          key={p.initials}
          className="flex h-9 w-9 items-center justify-center rounded-pill border-2 border-white text-xs font-bold text-white shadow-sm"
          style={{ backgroundColor: p.color }}
        >
          {p.initials}
        </span>
      ))}
    </div>
  );
}
