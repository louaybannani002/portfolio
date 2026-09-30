import { readFileSync } from "node:fs";
import { join } from "node:path";

const STORAGE_KEY = "lb-intro-seen";

// Inlined at build time (≈6 KB): no network request, so the LCP can paint with the first frame
// instead of queueing behind scripts and fonts on slow connections.
const LOGO_SRC = `data:image/webp;base64,${readFileSync(join(process.cwd(), "public/images/intro-logo.webp")).toString("base64")}`;

/**
 * Runs inline in <head> before first paint. On the first visit of a browser session (and never
 * with reduced motion) it sets `data-intro` on <html>, which reveals the loader via CSS.
 * The loader hides itself with a CSS animation after 1.2s, so it can't get stuck even if
 * hydration is slow; `data-intro` is removed shortly after (restoring scroll), while
 * `data-intro-delay` stays so the CSS hero entrance keeps its offset (no mid-animation jump).
 */
export const introScript = `(function(){try{var d=document.documentElement;if(sessionStorage.getItem("${STORAGE_KEY}"))return;sessionStorage.setItem("${STORAGE_KEY}","1");if(matchMedia("(prefers-reduced-motion: reduce)").matches)return;d.setAttribute("data-intro","");d.setAttribute("data-intro-delay","");setTimeout(function(){d.removeAttribute("data-intro")},1300)}catch(e){}})();`;

/**
 * Full-screen "LB" intro (≤1.2s). Hidden by default; shown only while <html data-intro>.
 * The logo is an image (same artwork as the favicon), fully opaque from the first frame with
 * only a gentle scale. It is what visitors see first, so it is also the Largest Contentful
 * Paint — as an image it doesn't wait for (or re-render on) web-font loading, which text would.
 */
export function IntroLoader() {
  return (
    <div className="intro-loader" aria-hidden>
      <div className="relative flex flex-col items-center gap-8">
        <span className="bg-accent-gradient absolute top-1/2 left-1/2 -z-10 h-56 w-56 -translate-x-1/2 -translate-y-1/2 rounded-full opacity-25 blur-3xl" />
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={LOGO_SRC}
          alt=""
          width={144}
          height={144}
          fetchPriority="high"
          decoding="sync"
          className="intro-logo h-36 w-36"
        />
        <span className="intro-bar block h-px w-28 overflow-hidden rounded-full bg-white/10">
          <span className="bg-accent-gradient block h-full w-full" />
        </span>
      </div>
    </div>
  );
}
