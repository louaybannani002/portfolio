// Works around a Windows-only Next.js bug: next-font-manifest-plugin matches the font loader with
// a forward-slash path ("/next-font-loader/index.js?"), but on Windows module requests use
// backslashes, so the manifest stays empty. Result: no <link rel="preload"> for fonts and no
// size-adjust flag — which caused a 0.29 CLS on project pages (mono pills re-wrapping on swap).
//
// Runs on `postinstall`. Idempotent; a no-op on Linux/macOS builds (e.g. Netlify), which aren't
// affected. If a future Next.js version changes this code, it only prints a warning.
import { existsSync, readFileSync, writeFileSync } from "node:fs";

const FILE = "node_modules/next/dist/build/webpack/plugins/next-font-manifest-plugin.js";
const BUGGY = "_mod_request.includes('/next-font-loader/index.js?')";
const FIXED = "_mod_request.split('\\\\').join('/').includes('/next-font-loader/index.js?')";

if (!existsSync(FILE)) {
  console.warn("[fix-next-font-windows] plugin not found, skipping");
} else {
  const src = readFileSync(FILE, "utf8");
  if (src.includes(FIXED)) {
    console.log("[fix-next-font-windows] already applied");
  } else if (src.includes(BUGGY)) {
    writeFileSync(FILE, src.replace(BUGGY, FIXED));
    console.log("[fix-next-font-windows] applied");
  } else {
    console.warn("[fix-next-font-windows] pattern not found (Next.js changed?) — skipping");
  }
}
