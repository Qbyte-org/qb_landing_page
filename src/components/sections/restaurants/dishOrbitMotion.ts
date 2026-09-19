/** The six resting positions keep the original upper-arc layout. */
export function getDishOrbitFrame(phase: number, dishCount: number) {
  const slot = ((phase % dishCount) + dishCount) % dishCount;
  const lastSlot = dishCount - 1;
  const stepAngle = 160 / lastSlot;
  const isWrapping = slot > lastSlot;
  const progress = slot - lastSlot;

  // The return leg goes around the back of the ellipse, never across its
  // centre. Match the visible arc's speed at both ends of this hidden leg.
  const angleDegrees = isWrapping
    ? -10 + stepAngle * progress + (200 - stepAngle) * (3 * progress ** 2 - 2 * progress ** 3)
    : -170 + slot * stepAngle;
  const angle = angleDegrees * Math.PI / 180;
  const opacity = isWrapping
    ? Math.max(0, 1 - Math.min(progress, 1 - progress) / 0.12)
    : 1;

  return {
    x: Number((50 + 42 * Math.cos(angle)).toFixed(3)),
    y: Number((64 + 50 * Math.sin(angle)).toFixed(3)),
    opacity: Number(opacity.toFixed(3)),
    isWrapping,
  };
}
