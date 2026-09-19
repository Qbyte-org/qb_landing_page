/** Preserve small wheel gestures while bounding spikes and queued travel. */
export function limitWheelDelta(delta: number, pending: number, viewportHeight: number) {
  if (!Number.isFinite(delta) || delta === 0) return 0;
  const maxStep = Math.min(240, Math.max(120, viewportHeight * 0.35));
  const maxAhead = Math.min(800, Math.max(360, viewportHeight * 0.8));
  const step = Math.sign(delta) * Math.min(Math.abs(delta), maxStep);
  // Reversing the wheel should reverse the page immediately, without first
  // working through the unrendered travel from the previous gesture.
  const ahead = Math.sign(step) === Math.sign(pending) ? pending : 0;
  const next = Math.max(-maxAhead, Math.min(ahead + step, maxAhead));
  return next - pending;
}
