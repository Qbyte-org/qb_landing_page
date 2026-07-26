import { stats } from "@/content/site";
import Container from "../ui/Container";
import Counter from "../ui/Counter";
import Reveal from "../ui/Reveal";

export default function TrustBar() {
  return (
    <section
      id="trust"
      data-nav-theme="dark"
      className="relative z-10 bg-[#fff8f1] pb-18 sm:pb-24"
    >
      <Container className="max-w-[103rem] pt-16 sm:pt-20">
        <Reveal className="max-w-4xl sm:pl-10 xl:pl-20">
          <p className="text-sm font-extrabold uppercase text-brand-dark">
            Built for everyday cravings
          </p>
          <h2 className="mt-4 font-display text-3xl font-extrabold leading-tight text-[#24180f] sm:text-5xl lg:text-6xl">
            Browse nearby kitchens, order in seconds, and track every bite.
          </h2>
        </Reveal>

        <div className="mt-10 grid grid-cols-2 gap-4 rounded-[2rem] border border-[#3a2112]/12 bg-[#21170f] p-5 sm:p-6 lg:grid-cols-4">
          {stats.map((stat, index) => (
            <Reveal
              key={stat.label}
              delay={index * 0.08}
              className="rounded-[1.25rem] border border-white/10 bg-white/[0.045] p-4 text-center"
            >
              <Counter
                value={stat.value}
                className="font-display text-3xl font-extrabold text-[#ffad5c] sm:text-4xl lg:text-3xl xl:text-4xl"
              />
              <p className="mt-2 text-sm font-medium text-white/70 sm:text-base">
                {stat.label}
              </p>
            </Reveal>
          ))}
        </div>
      </Container>
    </section>
  );
}
