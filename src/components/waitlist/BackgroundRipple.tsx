"use client";

import { useState } from "react";

type Ripple = { x: number; y: number; id: number };

export default function BackgroundRipple() {
  const [ripple, setRipple] = useState<Ripple | null>(null);

  return (
    <div
      className="ripple-grid absolute inset-0 overflow-hidden"
      aria-hidden="true"
      onPointerDown={(event) => {
        const bounds = event.currentTarget.getBoundingClientRect();
        setRipple({
          x: event.clientX - bounds.left,
          y: event.clientY - bounds.top,
          id: Date.now(),
        });
      }}
    >
      {ripple ? (
        <span
          key={ripple.id}
          className="ripple-wave"
          style={{ left: ripple.x, top: ripple.y }}
        />
      ) : null}
    </div>
  );
}
