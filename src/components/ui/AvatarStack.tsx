// Overlapping initials avatars for social proof. Self-contained (no images).

import { people } from "@/content/ui";

export default function AvatarStack() {
  return (
    <div className="flex -space-x-3" aria-hidden="true">
      {people.map((p) => (
        <span
          key={p.initials}
          className="flex h-9 w-9 items-center justify-center rounded-pill border-2 border-white text-xs font-bold text-white"
          style={{ backgroundColor: p.color }}
        >
          {p.initials}
        </span>
      ))}
    </div>
  );
}
