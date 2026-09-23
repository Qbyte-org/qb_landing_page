import { ArrowRight, Bike, MapPin, Smartphone, Store, UtensilsCrossed } from "lucide-react";
import Container from "@/components/ui/Container";
import MagneticFillButton from "@/components/ui/MagneticFillButton";
import Reveal from "@/components/ui/Reveal";
import SectionHeading from "@/components/ui/SectionHeading";
import SectionTag from "@/components/ui/SectionTag";

const businessSteps = [
  { title: "Start with a neighbourhood.", text: "Begin in Ile-Ife. Learn how people discover food, how kitchens prepare it and how riders move through the city." },
  { title: "Bring local kitchens together.", text: "Build relationships with food sellers and make their menus easier to discover. Keep their local flavour at the centre." },
  { title: "Connect the whole food run.", text: "Bring customers, kitchens and riders into one clear journey, from choosing a meal to the final handover." },
  { title: "Learn, improve, then grow.", text: "Listen to the people using QuickBite. Use what we learn locally to guide improvements and our next communities." },
];

const productSteps = [
  { title: "Find your next favourite.", text: "Make nearby kitchens and familiar dishes easy to browse, with useful information before you choose." },
  { title: "Make ordering feel simple.", text: "Shape a clear path from menu to checkout, with the details of your meal and order in one place." },
  { title: "Keep everyone in the loop.", text: "Design useful order updates for food lovers, kitchens and riders throughout the delivery journey." },
  { title: "Build around real feedback.", text: "Keep improving accessibility, everyday reliability and the small details that make each food run easier." },
];

function BusinessStaircase() {
  return (
    <ol className="relative mt-12 flex flex-col gap-7 sm:gap-0 sm:py-4 lg:mt-0">
      {businessSteps.map((step, index) => (
        <li key={step.title} className={`relative sm:min-h-36 ${["sm:order-4", "sm:order-3", "sm:order-2", "sm:order-1"][index]}`}>
          <Reveal className={`grid grid-cols-[3rem_minmax(0,1fr)] gap-4 sm:grid-cols-[5rem_minmax(0,1fr)] sm:gap-7 ${["sm:ml-0", "sm:ml-9", "sm:ml-18", "sm:ml-27"][index]}`}>
            <div aria-hidden="true" className="relative flex min-h-24 items-start justify-center bg-brand pt-4 font-display text-xl font-semibold text-paper sm:min-h-36 sm:pt-5 sm:text-2xl">
              <span className="relative z-10">0{index + 1}</span>
              <span className="absolute inset-y-0 left-0 w-1/3 bg-dark-ink/15" />
              <svg viewBox="0 0 80 20" preserveAspectRatio="none" className="absolute -top-4 left-0 hidden h-4 w-full text-brand-light sm:block"><path d="M0 20 35 0H115L80 20Z" fill="currentColor" /></svg>
            </div>
            <div className="py-1 sm:pb-8">
              <h3 className="font-display text-xl font-semibold leading-tight sm:text-2xl">{step.title}</h3>
              <p className="mt-3 max-w-sm text-sm leading-relaxed text-cocoa sm:text-base">{step.text}</p>
            </div>
          </Reveal>
        </li>
      ))}
    </ol>
  );
}

function ProductVision() {
  return (
    <div aria-hidden="true" className="relative mx-auto flex aspect-[1.2] w-full max-w-[38rem] items-center justify-end overflow-hidden lg:aspect-auto lg:h-full lg:min-h-[36rem]">
      <svg viewBox="0 0 600 600" preserveAspectRatio="none" className="absolute inset-0 h-full w-full text-brand">
        {Array.from({ length: 13 }, (_, index) => (
          <path key={index} d={`M0 ${30 + index * 45} C210 ${230 + index * 12}, 300 300, 445 300`} fill="none" stroke="currentColor" strokeWidth="1.35" opacity=".7" />
        ))}
        <path d="M420 300H600" fill="none" stroke="currentColor" strokeWidth="1.5" />
      </svg>
      <div className="relative mr-[7%] flex aspect-[.58] w-[30%] flex-col items-center justify-center rounded-[1.7rem] border-4 border-dark-ink bg-cream-200 px-3 py-8 text-center shadow-[12px_18px_0_color-mix(in_srgb,var(--color-ink)_8%,transparent)] sm:rounded-[2rem]">
        <div className="absolute inset-x-[32%] top-3 h-1 rounded-full bg-ink/30" />
        <span className="grid size-12 place-items-center rounded-full bg-brand text-paper sm:size-16"><UtensilsCrossed className="size-6 sm:size-8" strokeWidth={1.5} /></span>
        <p className="mt-4 font-display text-sm font-semibold leading-tight sm:text-lg">One simpler<br />food run.</p>
        <span className="mt-5 h-1 w-12 rounded-full bg-ink/10" />
        <span className="mt-2 h-1 w-9 rounded-full bg-ink/10" />
      </div>
      <div className="absolute bottom-[11%] right-0 flex gap-2 rounded-full border border-ink/10 bg-paper px-4 py-3 text-brand"><Store size={17} /><Bike size={17} /><Smartphone size={17} /></div>
    </div>
  );
}

export default function CompanyPlans() {
  return (
    <>
      <section id="business-plan" data-nav-theme="neutral" className="scroll-mt-28 bg-paper py-16 text-ink sm:py-24 lg:py-28">
        <Container>
          <div className="grid gap-8 lg:grid-cols-[.8fr_1.2fr] lg:gap-14">
            <Reveal>
              <SectionTag>Our business plan</SectionTag>
              <SectionHeading align="left" warm className="mt-6" title={<>Local roots.<br />Room to grow.</>} />
              <p className="mt-6 max-w-sm text-base leading-relaxed text-cocoa sm:text-lg">A useful food delivery service starts with the people it serves. This is the path we are building around.</p>
              <span className="mt-8 inline-flex items-center gap-2 rounded-full border border-ink/15 px-4 py-3 text-xs font-semibold"><MapPin size={15} className="text-brand" aria-hidden="true" />First chapter: Ile-Ife, Nigeria</span>
              <p className="mt-5 max-w-xs text-xs leading-relaxed text-cocoa">Our direction, step by step. We will share launch and location updates as they are confirmed.</p>
            </Reveal>
            <BusinessStaircase />
          </div>
        </Container>
      </section>

      <section id="product-plan" data-nav-theme="neutral" className="scroll-mt-28 bg-cream-200 py-16 text-ink sm:py-24 lg:py-28">
        <Container>
          <Reveal>
            <SectionTag>Our product plan</SectionTag>
            <SectionHeading align="left" warm className="mt-6" title={<>Every detail.<br />One shared direction.</>} subtitle="An easier experience for food lovers, local kitchens and riders." />
          </Reveal>
          <div className="mt-12 grid gap-8 lg:grid-cols-[1fr_1fr] lg:gap-0">
            <ol className="divide-y divide-ink/15 border-y border-ink/15">
              {productSteps.map((step, index) => (
                <li key={step.title}>
                  <Reveal className="grid grid-cols-[2.5rem_1fr] gap-3 py-6 sm:grid-cols-[3rem_1fr] sm:gap-5 sm:py-8">
                    <span className="font-display text-2xl font-semibold text-brand sm:text-3xl">0{index + 1}</span>
                    <div><h3 className="font-display text-xl font-semibold sm:text-2xl">{step.title}</h3><p className="mt-3 max-w-md text-sm leading-relaxed text-cocoa sm:text-base">{step.text}</p></div>
                  </Reveal>
                </li>
              ))}
            </ol>
            <Reveal direction="none"><ProductVision /></Reveal>
          </div>
          <Reveal className="mt-12 flex flex-col justify-between gap-5 border-t border-ink/15 pt-8 sm:flex-row sm:items-center">
            <div><h3 className="font-display text-2xl font-semibold">Help shape what comes next.</h3><p className="mt-2 text-base text-cocoa">Have an idea, a kitchen or a question? We are listening.</p></div>
            <MagneticFillButton href="/contact" variant="brand" className="min-h-14 shrink-0 rounded-full bg-brand! px-7 py-4 text-base">Talk to our team<ArrowRight size={18} aria-hidden="true" /></MagneticFillButton>
          </Reveal>
        </Container>
      </section>
    </>
  );
}
