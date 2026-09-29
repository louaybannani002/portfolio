"use client";

import {
  BellRing,
  Bot,
  BrainCircuit,
  ChefHat,
  Circle,
  Database,
  FileText,
  MessagesSquare,
  Package,
  Server,
  ShieldCheck,
  TrendingUp,
  Truck,
  Users,
  Webhook,
  Workflow,
} from "lucide-react";
import { motion, type Variants } from "motion/react";
import { Fragment, type ComponentType } from "react";
import { FaWhatsapp } from "react-icons/fa6";
import { EASE_OUT } from "@/components/ui/Reveal";
import type { ArchitectureIcon, ArchitectureLayer, ArchitectureNode } from "@/data/projects";

const ICONS: Record<ArchitectureIcon, ComponentType<{ className?: string }>> = {
  whatsapp: FaWhatsapp,
  chat: MessagesSquare,
  bot: Bot,
  inventory: Package,
  haccp: ShieldCheck,
  suppliers: Truck,
  hr: Users,
  production: ChefHat,
  forecast: TrendingUp,
  workflow: Workflow,
  server: Server,
  alert: BellRing,
  database: Database,
  api: Webhook,
  model: BrainCircuit,
  document: FileText,
};

// Static class strings so Tailwind can see them. Max 3 per row: the detail column is ~830px wide.
function gridFor(count: number) {
  if (count >= 5) return "grid-cols-2 sm:grid-cols-3";
  if (count === 4) return "grid-cols-2";
  if (count === 3) return "grid-cols-1 sm:grid-cols-3";
  return "grid-cols-1 sm:grid-cols-2";
}

const layerVariants: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: EASE_OUT, staggerChildren: 0.06 } },
};
const nodeVariants: Variants = {
  hidden: { opacity: 0, scale: 0.92 },
  visible: { opacity: 1, scale: 1, transition: { duration: 0.4, ease: EASE_OUT } },
};

function Node({ node, hub, delay }: { node: ArchitectureNode; hub: boolean; delay: number }) {
  const Icon = node.icon ? ICONS[node.icon] : Circle;

  if (hub) {
    return (
      <motion.li variants={nodeVariants} className="gradient-border rounded-card p-px">
        <div className="flex items-center gap-4 rounded-[calc(var(--radius-card)-1px)] bg-background px-6 py-4">
          <span className="bg-accent-gradient flex h-11 w-11 shrink-0 items-center justify-center rounded-control text-white">
            <Icon className="h-5 w-5" />
          </span>
          <span className="text-left">
            <span className="block font-display text-lg font-semibold text-foreground">{node.title}</span>
            {node.subtitle && <span className="block text-sm text-muted">{node.subtitle}</span>}
          </span>
        </div>
      </motion.li>
    );
  }

  return (
    <motion.li
      variants={nodeVariants}
      className="glass node-glow flex min-w-0 items-center gap-3 rounded-control p-3"
      style={{ animationDelay: `${delay}s` }}
    >
      <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg border border-border bg-white/[0.03] text-accent-2">
        <Icon className="h-4 w-4" />
      </span>
      <span className="min-w-0">
        <span className="block text-sm leading-snug font-medium text-foreground">{node.title}</span>
        {node.subtitle && <span className="block text-xs leading-snug text-muted">{node.subtitle}</span>}
      </span>
    </motion.li>
  );
}

/** Vertical connector with request (down) and response (up) packets. */
function Connector({ delay }: { delay: number }) {
  return (
    <div aria-hidden className="relative mx-auto h-12 w-px bg-gradient-to-b from-accent/60 to-accent-2/60">
      <span
        className="flow-packet left-1/2 animate-[flow-down_1.8s_linear_infinite] motion-reduce:hidden"
        style={{ animationDelay: `${delay}s` }}
      />
      <span
        className="flow-packet left-1/2 animate-[flow-up_1.8s_linear_infinite] motion-reduce:hidden"
        style={{ animationDelay: `${delay + 0.9}s`, background: "var(--accent)" }}
      />
    </div>
  );
}

/**
 * Layered architecture diagram from data (top → bottom). A single-node layer is drawn as the hub.
 * Nodes pulse in sequence and packets travel between layers (off with reduced motion).
 */
export function ArchitectureDiagram({ layers, label }: { layers: ArchitectureLayer[]; label: string }) {
  // Running node index across layers → staggered glow delays
  const offsets = layers.map((_, i) => layers.slice(0, i).reduce((n, l) => n + l.nodes.length, 0));
  return (
    <figure aria-label={label} className="relative">
      <div
        aria-hidden
        className="bg-accent-gradient pointer-events-none absolute inset-x-[20%] top-1/3 h-1/3 rounded-full opacity-[0.07] blur-3xl"
      />
      {layers.map((layer, li) => {
        const hub = layer.nodes.length === 1;
        return (
          <Fragment key={layer.label}>
            <motion.section
              aria-label={layer.label}
              variants={layerVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.4 }}
              className={`relative rounded-card p-4 sm:p-5 ${hub ? "" : "border border-dashed border-border-strong/80 bg-white/[0.01]"}`}
            >
              <p className="label-mono mb-3 text-center text-[0.65rem] text-subtle">{layer.label}</p>
              <ul className={hub ? "flex justify-center" : `grid gap-2.5 ${gridFor(layer.nodes.length)}`}>
                {layer.nodes.map((node, ni) => (
                  <Node key={node.title} node={node} hub={hub} delay={((offsets[li] + ni) % 12) * 0.5} />
                ))}
              </ul>
            </motion.section>
            {li < layers.length - 1 && <Connector delay={li * 0.3} />}
          </Fragment>
        );
      })}
    </figure>
  );
}
