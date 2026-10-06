import { ArrowDown, ArrowUpRight, Bike, MapPin, Store, UsersRound } from "lucide-react";
import { ridersPage } from "@/content/riders-page";

export default function RiderPathPreview({ dispatch = false }: { dispatch?: boolean }) {
  const { app, dispatch: fleet } = ridersPage.paths;

  return (
    <div aria-hidden="true" className={`relative isolate flex h-[26rem] shrink-0 flex-col overflow-hidden rounded-[2rem] p-5 sm:p-7 ${dispatch ? "bg-dark-ink text-paper" : "bg-cream-200 text-ink"}`}>
      <div className="flex items-center justify-between gap-4 text-[0.65rem] font-semibold uppercase tracking-[0.16em] sm:text-xs">
        <span>{dispatch ? fleet.label : app.label}</span>
        <ArrowUpRight className="size-4 text-brand" />
      </div>
      {dispatch ? (
        <div className="relative mx-auto flex w-full max-w-sm flex-1 flex-col items-center justify-center py-7">
          <div className="relative z-10 flex w-[84%] items-center gap-3 rounded-2xl border border-paper/20 bg-ink-soft p-4">
            <span className="flex size-10 shrink-0 items-center justify-center rounded-xl bg-brand text-paper"><UsersRound className="size-5" /></span>
            <div><p className="text-[0.6rem] uppercase tracking-wider text-paper/60">{fleet.source}</p><p className="mt-1 text-sm font-semibold">{fleet.assignment}</p></div>
          </div>
          <svg viewBox="0 0 320 65" preserveAspectRatio="none" className="h-14 w-full text-brand" fill="none" focusable="false">
            <path d="M160 0V20M53 65V38Q53 26 65 26H255Q267 26 267 38V65M160 26V65" stroke="currentColor" strokeWidth="1.5" strokeDasharray="4 4" />
          </svg>
          <div className="grid w-full grid-cols-3 gap-2 sm:gap-3">
            {fleet.riders.map((rider) => (
              <div key={rider} className="flex flex-col items-center rounded-2xl border border-paper/15 bg-paper/5 px-2 py-4">
                <Bike className="size-6 text-brand" strokeWidth={1.5} />
                <span className="mt-3 text-[0.65rem] font-medium sm:text-xs">{rider}</span>
              </div>
            ))}
          </div>
        </div>
      ) : (
        <div className="relative mx-auto flex w-full max-w-sm flex-1 items-center justify-center py-7">
          <div className="absolute inset-x-0 inset-y-7 rounded-full border border-dashed border-tan/60" />
          <div className="relative w-[86%] max-w-72 rounded-[1.7rem] border-[5px] border-ink bg-paper p-4 sm:p-5">
            <div className="mx-auto mb-5 h-1 w-9 rounded-full bg-ink/20" />
            <p className="mb-5 text-sm font-semibold">{app.title}</p>
            <div className="flex items-center gap-3"><span className="flex size-9 shrink-0 items-center justify-center rounded-full bg-brand/10 text-brand"><Store className="size-4" /></span><div><p className="text-[0.6rem] uppercase tracking-wider text-cocoa">{app.pickupLabel}</p><p className="mt-0.5 text-xs font-semibold">{app.pickup}</p></div></div>
            <ArrowDown className="my-2 ml-2.5 size-4 text-tan" />
            <div className="flex items-center gap-3"><span className="flex size-9 shrink-0 items-center justify-center rounded-full bg-ink text-paper"><MapPin className="size-4" /></span><div><p className="text-[0.6rem] uppercase tracking-wider text-cocoa">{app.destinationLabel}</p><p className="mt-0.5 text-xs font-semibold">{app.destination}</p></div></div>
            <p className="mt-5 border-t border-ink/10 pt-3 text-[0.6rem] text-cocoa">{app.detail}</p>
          </div>
        </div>
      )}
      <p className={`text-center text-xs ${dispatch ? "text-paper/65" : "text-cocoa"}`}>{dispatch ? fleet.caption : app.caption}</p>
    </div>
  );
}
