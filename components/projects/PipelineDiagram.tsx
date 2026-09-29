"use client";

import { motion, type Variants } from "motion/react";
import { Fragment } from "react";
import { EASE_OUT } from "@/components/ui/Reveal";

const container: Variants = { hidden: {}, visible: { transition: { staggerChildren: 0.15 } } };
const step: Variants = {
  hidden: { opacity: 0, y: 16 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: EASE_OUT } },
};

/**
 * Step-by-step pipeline: horizontal on desktop, vertical on mobile.
 * Steps reveal in sequence; packets flow along the connectors (hidden with reduced motion).
 */
export function PipelineDiagram({ steps, label }: { steps: string[]; label: string }) {
  return (
    <motion.ol
      aria-label={label}
      variants={container}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.3 }}
      className="flex flex-col md:flex-row md:items-stretch"
    >
      {steps.map((s, i) => (
        <Fragment key={s}>
          <motion.li
            variants={step}
            className="glass node-glow relative flex-1 rounded-card p-5"
            style={{ animationDelay: `${i * 1.2}s` }}
          >
            <span className="label-mono text-gradient font-medium">{String(i + 1).padStart(2, "0")}</span>
            <p className="mt-2 font-medium text-foreground">{s}</p>
          </motion.li>
          {i < steps.length - 1 && (
            <li role="presentation" aria-hidden className="relative mx-auto h-10 w-px md:mx-0 md:h-auto md:w-12">
              <span className="absolute inset-y-0 left-1/2 w-px -translate-x-1/2 bg-gradient-to-b from-accent/70 to-accent-2/70 md:inset-x-0 md:top-1/2 md:bottom-auto md:left-0 md:h-px md:w-auto md:translate-x-0 md:bg-gradient-to-r" />
              <span
                className="flow-packet left-1/2 animate-[flow-down_1.6s_linear_infinite] motion-reduce:hidden md:hidden"
                style={{ animationDelay: `${i * 0.4}s` }}
              />
              <span
                className="flow-packet top-1/2 hidden animate-[flow-x_1.6s_linear_infinite] motion-reduce:hidden md:block"
                style={{ animationDelay: `${i * 0.4}s` }}
              />
            </li>
          )}
        </Fragment>
      ))}
    </motion.ol>
  );
}
