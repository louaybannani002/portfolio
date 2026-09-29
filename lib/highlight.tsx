import type { ReactNode } from "react";

const escape = (s: string) => s.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");

/** Wraps the listed phrases in a styled span. Styling only: the text is unchanged. */
export function highlightPhrases(
  text: string,
  phrases: string[],
  className = "font-medium text-foreground",
): ReactNode {
  if (!phrases.length) return text;
  const parts = text.split(new RegExp(`(${phrases.map(escape).join("|")})`, "g"));
  return parts.map((part, i) =>
    phrases.includes(part) ? (
      <span key={i} className={className}>
        {part}
      </span>
    ) : (
      part
    ),
  );
}

/** Percentages, optionally followed by a metric name: "93%", "9% MAPE". */
const METRIC = /(\d+(?:\.\d+)?%(?:\s(?:MAPE|RMSE|MAE|accuracy))?)/g;

/** Highlights metrics inside a sentence with the accent color. */
export function highlightMetrics(text: string, className = "font-semibold text-gradient"): ReactNode {
  const parts = text.split(METRIC);
  if (parts.length === 1) return text;
  return parts.map((part, i) =>
    i % 2 === 1 ? (
      <span key={i} className={className}>
        {part}
      </span>
    ) : (
      part
    ),
  );
}
