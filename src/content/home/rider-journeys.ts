

export const riderComparisonRows = [
  { label: "Earnings model", app: "Personal rider payouts", dispatch: "Fleet partner payouts" },
  { label: "Operations", app: "Accept and deliver yourself", dispatch: "Assign orders to riders" },
  { label: "Team size", app: "One rider", dispatch: "Multiple riders" },
] as const;

export const journeys = [
  {
    id: "app-rider",
    eyebrow: "App rider",
    title: "Ride directly from your phone",
    shortTitle: "App Rider",
    description:
      "Accept orders, navigate pickups, update delivery status and track earnings from the QuickBite rider app.",
    accent: "var(--color-brand)",
    manifestTitle: "Solo duty slip",
    manifestCode: "AR / IFE / 042",
    assignedTo: "Solo riders",
    tool: "Rider app",
    payout: "Personal wallet",
    routeRows: ["Campus pickup", "Market run", "Doorstep drop"],
    stats: [
      { label: "Best for", value: "Solo riders" },
      { label: "Tool", value: "Rider app" },
      { label: "Payout", value: "Personal wallet" },
    ],
    points: [
      "Accept delivery requests directly",
      "Update pickup and drop-off status",
      "Track daily and weekly earnings",
    ],
  },
  {
    id: "dispatch-partner",
    eyebrow: "Dispatch partner",
    title: "Manage riders from one desk",
    shortTitle: "Dispatch Partner",
    description:
      "Coordinate a fleet, assign delivery requests, and manage riders through a dispatcher workspace.",
    accent: "var(--color-ink)",
    manifestTitle: "Fleet route roster",
    manifestCode: "DP / IFE / 118",
    assignedTo: "Fleet owners",
    tool: "Web portal",
    payout: "Partner account",
    routeRows: ["Rider 01 assigned", "Rider 02 standby", "Rider 03 returning"],
    stats: [
      { label: "Best for", value: "Fleet owners" },
      { label: "Tool", value: "Web portal" },
      { label: "Payout", value: "Partner account" },
    ],
    points: [
      "Assign orders across multiple riders",
      "Coordinate riders without smartphones",
      "Monitor fleet activity and earnings",
    ],
  },
] as const;
