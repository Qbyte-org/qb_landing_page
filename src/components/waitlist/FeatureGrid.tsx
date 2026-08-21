"use client";

import { motion } from "motion/react";
import type { LucideIcon } from "lucide-react";

export type WaitlistFeature = {
  title: string;
  description: string;
  icon: LucideIcon;
};

export default function FeatureGrid({ features }: { features: WaitlistFeature[] }) {
  return (
    <div className="relative mx-auto grid h-full w-full max-w-4xl grid-cols-1 gap-4 md:grid-cols-2">
      {features.map((feature, index) => {
        const Icon = feature.icon;

        return (
          <motion.article
            key={feature.title}
            initial={{ opacity: 0, y: 18 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.45, delay: index * 0.06 }}
            whileHover={{ scale: 1.015, y: -2 }}
            className="glass-card relative min-h-44 overflow-hidden rounded-xl p-6"
          >
            <div className="absolute right-0 bottom-0 h-1/3 w-1/3 rounded-tl-3xl border border-[#f06400]/20 bg-[#f06400]/10 blur-sm" />
            <div className="relative flex h-11 w-11 items-center justify-center rounded-lg border border-[#fffaf5]/[0.12] bg-[#fffaf5]/[0.08]">
              <Icon className="h-5 w-5 text-[#f0d7c2]" aria-hidden="true" />
            </div>
            <h3 className="relative mt-4 text-lg font-semibold text-[#fffaf5]">{feature.title}</h3>
            <p className="relative mt-2 text-sm leading-6 text-[#f0d7c2]">{feature.description}</p>
          </motion.article>
        );
      })}
    </div>
  );
}

