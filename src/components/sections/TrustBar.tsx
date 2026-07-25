import Container from "../ui/Container";
import Counter from "../ui/Counter";
import Reveal from "../ui/Reveal";
import { stats } from "@/content/site";

export default function TrustBar() {
  return (
    <section data-nav-theme="light" className="bg-white py-12 sm:py-16">
      <Container>
        <div className="grid grid-cols-2 gap-6 rounded-[1.5rem] bg-navy p-8 sm:p-10 lg:grid-cols-4">
          {stats.map((stat, i) => (
            <Reveal key={stat.label} delay={i * 0.08} className="text-center">
              <Counter
                value={stat.value}
                className="font-display text-3xl font-extrabold tracking-tight text-brand-light sm:text-4xl lg:text-5xl"
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
