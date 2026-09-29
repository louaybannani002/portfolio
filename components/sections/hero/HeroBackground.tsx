"use client";

import dynamic from "next/dynamic";

// Canvas code is split out of the main bundle and only loaded client-side
const NeuralNetworkCanvas = dynamic(() => import("./NeuralNetworkCanvas"), { ssr: false });

/** Hero backdrop: neural-network canvas + glow + edge fades. Purely decorative. */
export function HeroBackground() {
  return (
    <div aria-hidden className="pointer-events-none absolute inset-0 -z-10 overflow-hidden">
      <div className="absolute inset-0 [mask-image:radial-gradient(ellipse_at_center,black_35%,transparent_80%)]">
        <NeuralNetworkCanvas className="h-full w-full opacity-70" />
      </div>
      <div className="bg-accent-gradient absolute top-[18%] left-1/2 h-[28rem] w-[28rem] -translate-x-1/2 rounded-full opacity-[0.12] blur-[120px]" />
      <div className="absolute inset-x-0 bottom-0 h-40 bg-gradient-to-b from-transparent to-background" />
    </div>
  );
}
