"use client";

import { ArrowUpRight, Check, Copy, Mail, Phone, X } from "lucide-react";
import { Fragment, useEffect, useRef, useState, type ComponentType, type ReactNode } from "react";
import { FaGithub, FaLinkedinIn } from "react-icons/fa6";
import { Toast } from "@/components/ui/Toast";
import { identity } from "@/data/portfolio";
import { contactLabels } from "@/data/site";

const L = contactLabels;

async function copyText(text: string) {
  try {
    await navigator.clipboard.writeText(text);
    return true;
  } catch {
    // Fallback for insecure contexts / older browsers
    const el = document.createElement("textarea");
    el.value = text;
    el.setAttribute("readonly", "");
    el.style.position = "fixed";
    el.style.opacity = "0";
    document.body.appendChild(el);
    el.select();
    const ok = document.execCommand("copy");
    el.remove();
    return ok;
  }
}

/** Adds soft break points after "@" and "/" so long addresses wrap at natural boundaries. */
function withBreaks(value: string) {
  return value.split(/(?<=[@/])/).map((part, i) => (
    <Fragment key={i}>
      {i > 0 && <wbr />}
      {part}
    </Fragment>
  ));
}

function ChannelRow({
  icon: Icon,
  label,
  value,
  href,
  external,
  action,
}: {
  icon: ComponentType<{ className?: string }>;
  label: string;
  value: string;
  href: string;
  external?: boolean;
  action?: ReactNode;
}) {
  return (
    <li className="group/row flex items-center gap-4 rounded-control p-3 transition-colors duration-200 hover:bg-white/[0.03]">
      <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-control border border-border bg-white/[0.03] text-foreground/85 transition-colors group-hover/row:border-accent/40 group-hover/row:text-accent-2">
        <Icon className="h-[18px] w-[18px]" />
      </span>
      <a
        href={href}
        {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
        className="min-w-0 flex-1"
      >
        <span className="label-mono block text-[0.65rem] text-subtle">{label}</span>
        {/* Wrap rather than truncate: contact details must stay fully readable on phones */}
        <span className="mt-0.5 flex items-center gap-1 text-sm font-medium text-foreground sm:text-base">
          <span className="min-w-0 [overflow-wrap:anywhere]">{withBreaks(value)}</span>
          {external && (
            <ArrowUpRight
              aria-hidden
              className="h-4 w-4 shrink-0 text-muted transition-transform group-hover/row:translate-x-0.5 group-hover/row:-translate-y-0.5"
            />
          )}
        </span>
      </a>
      {action}
    </li>
  );
}

/** Email (with copy-to-clipboard + toast), phone, LinkedIn and GitHub. */
export function ContactChannels() {
  const [toast, setToast] = useState<{ ok: boolean } | null>(null);
  const timer = useRef<number>(0);

  useEffect(() => () => window.clearTimeout(timer.current), []);

  const onCopy = async () => {
    const ok = await copyText(identity.email);
    setToast({ ok });
    window.clearTimeout(timer.current);
    timer.current = window.setTimeout(() => setToast(null), 2200);
  };

  return (
    <>
      <ul className="glass flex flex-col gap-1 rounded-card p-3">
        <ChannelRow
          icon={Mail}
          label={L.channels.email}
          value={identity.email}
          href={`mailto:${identity.email}`}
          action={
            <button
              type="button"
              onClick={onCopy}
              aria-label={L.copyEmail}
              title={L.copyEmail}
              className="flex h-10 w-10 shrink-0 items-center justify-center rounded-control border border-border text-muted transition-colors hover:border-border-strong hover:text-foreground"
            >
              {toast?.ok ? (
                <Check aria-hidden className="h-4 w-4 text-success" />
              ) : (
                <Copy aria-hidden className="h-4 w-4" />
              )}
            </button>
          }
        />
        {identity.phone && (
          <ChannelRow
            icon={Phone}
            label={L.channels.phone}
            value={identity.phone}
            href={`tel:${identity.phone.replace(/\s+/g, "")}`}
          />
        )}
        <ChannelRow
          icon={FaLinkedinIn}
          label={L.channels.linkedin}
          value={identity.linkedin.handle}
          href={identity.linkedin.url}
          external
        />
        <ChannelRow
          icon={FaGithub}
          label={L.channels.github}
          value={identity.github.handle}
          href={identity.github.url}
          external
        />
      </ul>

      <Toast
        message={toast ? (toast.ok ? L.copied : L.copyFailed) : null}
        icon={
          toast?.ok ? (
            <Check aria-hidden className="h-4 w-4 text-success" />
          ) : (
            <X aria-hidden className="h-4 w-4 text-danger" />
          )
        }
      />
    </>
  );
}
