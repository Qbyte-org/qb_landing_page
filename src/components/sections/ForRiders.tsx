"use client";

import { useState, type KeyboardEvent } from "react";
import { AnimatePresence, motion } from "motion/react";
import Container from "../ui/Container";
import MagneticFillButton from "../ui/MagneticFillButton";

const ease = [0.22, 1, 0.36, 1] as const;
const manifestClipPath =
  "polygon(0 0, calc(100% - 20px) 0, 100% 20px, 100% 100%, 18px 100%, 0 calc(100% - 18px))";
const tagClipPath =
  "polygon(12px 0, 100% 0, 100% 100%, 0 100%, 0 12px)";

const journeys = [
  {
    id: "app-rider",
    eyebrow: "App rider",
    title: "Ride directly from your phone",
    shortTitle: "App Rider",
    description:
      "Accept orders, navigate pickups, update delivery status and track earnings from the QuickBite rider app.",
    accent: "#f06400",
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
    accent: "#2a211d",
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

type Journey = (typeof journeys)[number];
type JourneyId = Journey["id"];

function ArrowGlyph() {
  return (
    <svg
      aria-hidden="true"
      className="h-4 w-7"
      viewBox="0 0 34 18"
      fill="none"
      stroke="currentColor"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth="3"
    >
      <path d="M2 9H30" />
      <path d="M23 2L31 9L23 16" />
    </svg>
  );
}

function DispatchBikeMark() {
  return (
    <svg
      aria-hidden="true"
      className="h-10 w-16"
      viewBox="0 0 150 92"
      fill="none"
      stroke="currentColor"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <circle cx="42" cy="66" r="16" strokeWidth="8" />
      <circle cx="110" cy="66" r="16" strokeWidth="8" />
      <path d="M43 66L72 38H92L110 66M67 66H88L72 38" strokeWidth="8" />
      <path d="M54 31H88" strokeWidth="8" />
      <path d="M24 25H50V46H24Z" strokeWidth="7" />
      <path d="M93 31L119 21L131 25" strokeWidth="8" />
    </svg>
  );
}

function RouteTag() {
  return (
    <div
      className="relative inline-flex rotate-[-1.5deg] items-center gap-3 border border-[#2a211d]/20 bg-[#fffaf5] px-4 py-3 text-left"
      style={{ clipPath: tagClipPath }}
    >
      <span className="grid h-4 w-4 place-items-center border border-[#2a211d]/35 bg-white">
        <span className="h-1.5 w-1.5 rounded-[50%] bg-[#f06400]" />
      </span>
      <span>
        <span className="block font-mono text-[0.65rem] font-bold text-[#f06400]">
          route tag
        </span>
        <span className="block font-mono text-sm font-black text-[#241813]">
          rider manifest
        </span>
      </span>
    </div>
  );
}

function CheckboxMark({ active = false }: { active?: boolean }) {
  return (
    <span
      aria-hidden="true"
      className={`grid h-5 w-5 shrink-0 place-items-center border-2 ${
        active ? "border-[#f06400] text-[#f06400]" : "border-[#2a211d]/34 text-transparent"
      }`}
    >
      <svg className="h-3.5 w-3.5" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
        <path d="M3 8.5L6.5 12L13 4" />
      </svg>
    </span>
  );
}

function ManifestDocument({ journey, active }: { journey: Journey; active: boolean }) {
  return (
    <motion.div
      aria-hidden="true"
      className="relative mx-auto min-h-[16.5rem] max-w-[25rem] border border-[#2a211d]/18 bg-[#fffaf5] p-4 text-[#241813]"
      style={{ clipPath: manifestClipPath }}
      animate={{
        rotate: active ? -1.25 : 0.8,
        y: active ? -3 : 0,
      }}
      transition={{ duration: 0.38, ease }}
    >
      <div className="absolute inset-0 opacity-[0.16] [background-image:radial-gradient(circle,rgba(42,33,29,.42)_0_1px,transparent_1.15px)] [background-size:13px_13px]" />
      <div className="relative">
        <div className="flex items-start justify-between gap-4 border-b border-dashed border-[#2a211d]/24 pb-3 font-mono">
          <div>
            <p className="text-[0.64rem] font-bold text-[#f06400]">
              QUICKBITE DISPATCH
            </p>
            <p className="mt-1 text-xl font-black leading-none tracking-[-0.05em]">
              {journey.manifestTitle}
            </p>
          </div>
          <span className="text-right text-[0.68rem] font-bold text-[#6f5f55]">
            {journey.manifestCode}
            <br />
            07:30am
          </span>
        </div>

        <div className="mt-4 grid gap-2 font-mono text-[0.72rem] font-bold">
          <div className="flex justify-between border-b border-dashed border-[#2a211d]/16 pb-1.5">
            <span className="text-[#6f5f55]">assigned to</span>
            <span>{journey.assignedTo}</span>
          </div>
          <div className="flex justify-between border-b border-dashed border-[#2a211d]/16 pb-1.5">
            <span className="text-[#6f5f55]">tool</span>
            <span>{journey.tool}</span>
          </div>
          <div className="flex justify-between border-b border-dashed border-[#2a211d]/16 pb-1.5">
            <span className="text-[#6f5f55]">payout</span>
            <span>{journey.payout}</span>
          </div>
        </div>

        <div className="mt-4 space-y-2">
          {journey.routeRows.map((row, index) => (
            <div key={row} className="flex items-center gap-2 font-mono text-[0.7rem] font-bold text-[#2a211d]/78">
              <CheckboxMark active={active || index === 0} />
              {row}
            </div>
          ))}
        </div>

        <div
          className={`absolute bottom-1 right-1 rotate-[-8deg] border-[3px] border-dashed px-4 py-2 font-mono text-sm font-black ${
            active ? "border-[#f06400] text-[#f06400]" : "border-[#2a211d]/28 text-[#2a211d]/28"
          }`}
        >
          {active ? "CLEARED" : "STANDBY"}
        </div>
      </div>
    </motion.div>
  );
}

function JourneyCard({
  journey,
  active,
  onSelect,
}: {
  journey: Journey;
  active: boolean;
  onSelect: () => void;
}) {
  const onKeyDown = (event: KeyboardEvent<HTMLElement>) => {
    if (event.key === "Enter" || event.key === " ") {
      event.preventDefault();
      onSelect();
    }
  };

  return (
    <motion.article
      role="button"
      tabIndex={0}
      aria-pressed={active}
      onClick={onSelect}
      onKeyDown={onKeyDown}
      className={`group relative isolate cursor-pointer border bg-[#fffaf5] p-4 text-[#241813] outline-none transition-colors duration-300 focus-visible:ring-2 focus-visible:ring-[#f06400] sm:p-5 ${
        active ? "border-[#f06400]" : "border-[#2a211d]/14"
      }`}
      style={{ clipPath: manifestClipPath }}
      // The card moves like paper being lifted from a dispatch board, not a glowing SaaS tile.
      animate={{
        y: active ? -4 : 0,
        rotate: active ? -0.35 : 0.25,
      }}
      whileHover={{
        y: active ? -6 : -3,
        rotate: active ? -0.55 : 0,
      }}
      transition={{ duration: 0.36, ease }}
    >
      <div className="absolute inset-0 -z-10 opacity-[0.13] [background-image:radial-gradient(circle,rgba(42,33,29,.5)_0_1px,transparent_1.2px)] [background-size:15px_15px]" />
      <div className="absolute left-6 top-0 h-6 w-16 border-x border-b border-[#2a211d]/18 bg-[#f5e3d4]" aria-hidden="true" />

      <div className="flex items-start justify-between gap-4">
        <div className="font-mono">
          <p className="text-[0.72rem] font-bold text-[#f06400]">{journey.eyebrow}</p>
          <h3 className="mt-2 max-w-md font-display text-3xl font-black leading-[0.94] tracking-[-0.065em] sm:text-4xl">
            {journey.title}
          </h3>
        </div>

        <div
          className={`relative shrink-0 rotate-[-4deg] border-[3px] border-dashed px-3 py-2 font-mono text-[0.72rem] font-black ${
            active ? "border-[#f06400] text-[#f06400]" : "border-[#2a211d]/28 text-[#2a211d]/38"
          }`}
        >
          {active ? "SELECTED" : "OPEN"}
        </div>
      </div>

      <p className="mt-4 max-w-xl text-sm font-semibold leading-relaxed text-[#6f5f55] sm:text-base">
        {journey.description}
      </p>

      <div className="mt-6">
        <ManifestDocument journey={journey} active={active} />
      </div>

      <div className="mt-5 grid gap-2 font-mono text-[0.72rem] font-bold sm:grid-cols-3">
        {journey.stats.map((stat) => (
          <div key={stat.label} className="border border-dashed border-[#2a211d]/18 bg-white/50 p-3">
            <p className="text-[#6f5f55]">{stat.label}</p>
            <p className="mt-1 text-[#241813]">{stat.value}</p>
          </div>
        ))}
      </div>

      <AnimatePresence initial={false}>
        {active ? (
          <motion.div
            key="manifest-details"
            // Active details unfold like an extra carbon-copy slip under the manifest.
            initial={{ opacity: 0, height: 0, y: -8 }}
            animate={{ opacity: 1, height: "auto", y: 0 }}
            exit={{ opacity: 0, height: 0, y: -8 }}
            transition={{ duration: 0.34, ease }}
            className="overflow-hidden"
          >
            <div className="mt-6 border-t border-dashed border-[#2a211d]/22 pt-5">
              <ul className="space-y-3">
                {journey.points.map((point) => (
                  <li key={point} className="flex items-start gap-3 text-sm font-bold text-[#3c302a]">
                    <CheckboxMark active />
                    <span>{point}</span>
                  </li>
                ))}
              </ul>

              <MagneticFillButton
                href="/riders"
                variant="brand"
                customFillClass="bg-[#2a211d]"
                customHoverTextColor="#fffaf5"
                ariaLabel={`Apply as ${journey.shortTitle}`}
                className="mt-6 h-[3.25rem] w-full bg-[#f06400] px-6 text-sm font-black text-white [clip-path:polygon(0_0,calc(100%_-_14px)_0,100%_14px,100%_100%,14px_100%,0_calc(100%_-_14px))]"
              >
                Apply as {journey.shortTitle}
                <ArrowGlyph />
              </MagneticFillButton>
            </div>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </motion.article>
  );
}

function ComparisonLedger({ activeJourney }: { activeJourney: JourneyId }) {
  const rows = [
    {
      label: "Earnings model",
      app: "Personal rider payouts",
      dispatch: "Fleet partner payouts",
    },
    {
      label: "Operations",
      app: "Accept and deliver yourself",
      dispatch: "Assign orders to riders",
    },
    {
      label: "Team size",
      app: "One rider",
      dispatch: "Multiple riders",
    },
  ];

  return (
    <div
      className="relative overflow-hidden border border-[#2a211d]/16 bg-[#fffaf5] p-4 text-[#241813] sm:p-5"
      style={{ clipPath: manifestClipPath }}
    >
      <div className="absolute inset-0 opacity-[0.12] [background-image:radial-gradient(circle,rgba(42,33,29,.45)_0_1px,transparent_1.2px)] [background-size:14px_14px]" />
      <div className="relative">
        <div className="flex flex-col justify-between gap-3 border-b border-dashed border-[#2a211d]/24 pb-4 sm:flex-row sm:items-end">
          <div>
            <p className="font-mono text-[0.72rem] font-bold text-[#f06400]">
              duty log / compare
            </p>
            <h3 className="mt-1 font-display text-3xl font-black leading-none tracking-[-0.06em]">
              Rider path ledger
            </h3>
          </div>
          <div className="rotate-[-2deg] border-[3px] border-dashed border-[#f06400] px-4 py-2 font-mono text-sm font-black text-[#f06400]">
            {activeJourney === "app-rider" ? "APP RIDER CHECKED" : "DISPATCH CHECKED"}
          </div>
        </div>

        <div className="mt-4 overflow-x-auto">
          <table className="w-full min-w-[42rem] border-collapse font-mono text-sm">
            <thead>
              <tr className="text-left text-[0.72rem] text-[#6f5f55]">
                <th className="border-b border-dashed border-[#2a211d]/20 py-3 pr-4">record</th>
                <th className={`border-b border-dashed border-[#2a211d]/20 px-4 py-3 ${activeJourney === "app-rider" ? "bg-[#f5e3d4]" : ""}`}>
                  App Rider
                </th>
                <th className={`border-b border-dashed border-[#2a211d]/20 px-4 py-3 ${activeJourney === "dispatch-partner" ? "bg-[#f5e3d4]" : ""}`}>
                  Dispatch Partner
                </th>
              </tr>
            </thead>
            <tbody>
              {rows.map((row) => (
                <tr key={row.label}>
                  <td className="border-b border-dashed border-[#2a211d]/14 py-3 pr-4 font-black">
                    {row.label}
                  </td>
                  <td className={`border-b border-dashed border-[#2a211d]/14 px-4 py-3 ${activeJourney === "app-rider" ? "bg-[#f5e3d4]" : ""}`}>
                    {row.app}
                  </td>
                  <td className={`border-b border-dashed border-[#2a211d]/14 px-4 py-3 ${activeJourney === "dispatch-partner" ? "bg-[#f5e3d4]" : ""}`}>
                    {row.dispatch}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default function ForRiders() {
  const [activeJourney, setActiveJourney] = useState<JourneyId>("app-rider");

  return (
    <section
      id="riders"
      data-nav-theme="light"
      className="relative isolate overflow-hidden bg-white py-16 text-[#241813] sm:py-24"
    >
      <div aria-hidden="true" className="absolute inset-0 -z-10">
        <div className="absolute inset-0 bg-[#fffaf5]" />
        <div className="absolute inset-0 opacity-[0.1] [background-image:linear-gradient(115deg,transparent_0_44%,rgba(42,33,29,.22)_45%,transparent_46%),radial-gradient(circle,rgba(42,33,29,.34)_0_1px,transparent_1.2px)] [background-size:96px_96px,18px_18px]" />
        <div className="absolute left-0 right-0 top-20 h-10 border-y border-dashed border-[#2a211d]/10 bg-[#f5e3d4]/35" />
      </div>

      <Container>
        <div className="mx-auto flex max-w-5xl flex-col items-start justify-between gap-7 md:flex-row md:items-end">
          <div>
            <RouteTag />
            <h2 className="mt-5 font-display text-4xl font-black leading-[0.96] tracking-[-0.07em] sm:text-6xl lg:text-7xl">
              Ride with
              <br />
              <span className="text-[#f06400]">QuickBite.</span>
            </h2>
            <p className="mt-5 max-w-2xl text-base font-semibold leading-relaxed text-[#6f5f55] sm:text-lg">
              Earn as an app rider, or coordinate a dispatch team from one
              partner workspace. Pick the path that matches how you work.
            </p>
          </div>

          <div className="hidden text-[#f06400] md:block">
            <DispatchBikeMark />
          </div>
        </div>

        <div className="mt-12 grid gap-5 lg:grid-cols-2">
          {journeys.map((journey) => (
            <JourneyCard
              key={journey.id}
              journey={journey}
              active={activeJourney === journey.id}
              onSelect={() => setActiveJourney(journey.id)}
            />
          ))}
        </div>

        <div className="mt-6">
          <ComparisonLedger activeJourney={activeJourney} />
        </div>
      </Container>
    </section>
  );
}
