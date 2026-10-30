import Link from "next/link";
import Image from "next/image";
import { ArrowLeft } from "lucide-react";
import { inviteCopy } from "@/content/invite";
import { playStoreUrl } from "@/lib/referral";
import BackgroundGrainTexture from "../ui/BackgroundGrainTexture";
import GooglePlayIcon from "../ui/GooglePlayIcon";
import Logo from "../ui/Logo";
import PlatedDish from "../waitlist/sections/PlatedDish";
import CopyCodeButton from "./CopyCodeButton";

/** Where referral links from the app land. `code` is already normalised, or null for a general visit. */
export default function InvitePage({ code }: { code: string | null }) {
  return (
    <main className="relative isolate flex min-h-svh flex-col overflow-hidden bg-dark-ink text-paper">
      <BackgroundGrainTexture />

      {/* Dishes at the edge of the table, as on the waitlist's closing panel, kept clear of the header and footer links. */}
      <div aria-hidden="true" className="pointer-events-none absolute -right-10 -bottom-12 w-36 rotate-[10deg] sm:top-1/2 sm:-right-24 sm:bottom-auto sm:w-72 sm:-translate-y-1/2 lg:-right-20 lg:w-96">
        <div className="relative aspect-square rounded-full bg-[radial-gradient(circle_at_35%_30%,#4a3d36_0,#1c1411_55%,#0d0907_100%)] p-[6%] ring-1 ring-paper/10 [filter:drop-shadow(0_24px_28px_rgba(0,0,0,0.45))]">
          <div className="relative h-full w-full overflow-hidden rounded-full">
            <Image src="/images/food/plate/jollof-bowl.webp" alt="" fill sizes="(min-width: 1024px) 24rem, 18rem" className="object-cover" />
          </div>
        </div>
      </div>
      <div aria-hidden="true" className="pointer-events-none absolute top-[18%] -left-24 hidden w-64 -rotate-[8deg] sm:block lg:-left-16 lg:w-80">
        <PlatedDish src="/images/food/modern-cutouts/burger.webp" alt="" vessel="plate" sizes="(min-width: 1024px) 20rem, 16rem" className="[filter:drop-shadow(0_24px_28px_rgba(0,0,0,0.45))]!" />
      </div>

      <header className="relative mx-auto flex w-full max-w-[90rem] items-center justify-between gap-4 px-5 pt-5 sm:px-8 sm:pt-7 lg:px-12">
        <Logo variant="light" width={150} height={29} priority />
        <Link href={inviteCopy.homeHref} className="inline-flex min-h-11 items-center gap-2 rounded-full px-3 text-sm font-medium text-paper/75 hover:text-paper focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-paper">
          <ArrowLeft aria-hidden="true" className="size-4" />
          {inviteCopy.homeLabel}
        </Link>
      </header>

      <div className="relative mx-auto flex w-full max-w-[40rem] flex-1 flex-col justify-center px-5 py-20 sm:px-8">
        {code ? (
          <div className="flex flex-col gap-8">
            <div className="flex flex-col gap-4">
              <p className="font-display text-lg font-semibold text-brand sm:text-xl">{inviteCopy.invited.greeting}</p>
              <h1 className="font-display text-[clamp(2.4rem,7vw,4rem)] font-semibold leading-[1] tracking-[-0.04em]">{inviteCopy.invited.heading}</h1>
            </div>

            <div className="flex flex-col gap-4 rounded-[2rem] border border-paper/15 bg-ink-soft/70 p-6 sm:p-8">
              <p className="text-sm font-medium text-paper/65">{inviteCopy.invited.codeLabel}</p>
              <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                <p id="invite-code" className="font-display text-[clamp(2.2rem,9vw,3.4rem)] leading-none font-semibold tracking-[0.04em] break-all select-all">{code}</p>
                <CopyCodeButton code={code} />
              </div>
              <p className="max-w-[46ch] text-base leading-relaxed text-paper/75">{inviteCopy.invited.instruction}</p>
            </div>

            <PlayStoreButton code={code} />
          </div>
        ) : (
          <div className="flex flex-col gap-6">
            <h1 className="font-display text-[clamp(2.6rem,8vw,4.75rem)] font-semibold leading-[0.98] tracking-[-0.045em]">{inviteCopy.general.heading}</h1>
            <p className="max-w-[38ch] text-lg leading-relaxed text-paper/75 sm:text-xl">{inviteCopy.general.introduction}</p>
            <PlayStoreButton code={null} />
          </div>
        )}
      </div>

      <footer className="relative mx-auto flex w-full max-w-[90rem] flex-wrap items-center gap-x-6 gap-y-2 px-5 pb-6 text-sm text-paper/55 sm:px-8 lg:px-12">
        {inviteCopy.footer.map((link) => <Link key={link.href} href={link.href} className="hover:text-paper">{link.label}</Link>)}
        <span>{inviteCopy.copyright}</span>
      </footer>
    </main>
  );
}

function PlayStoreButton({ code }: { code: string | null }) {
  return (
    <a
      href={playStoreUrl(code)}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={inviteCopy.playStore.ariaLabel}
      className="inline-flex h-14 items-center justify-center gap-3 self-start rounded-full bg-brand px-7 text-lg font-bold text-white transition-colors hover:bg-brand-dark focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-paper motion-reduce:transition-none max-sm:self-stretch"
    >
      <GooglePlayIcon className="size-5" />
      {inviteCopy.playStore.label}
    </a>
  );
}
