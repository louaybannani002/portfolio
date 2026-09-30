"use client";

import { AlertCircle, Loader2, Send } from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import { useId, useRef, useState, type FormEvent, type ReactNode } from "react";
import { identity } from "@/data/portfolio";
import { contactLabels } from "@/data/site";

const L = contactLabels.form;
const V = contactLabels.validation;

const ENDPOINT = "https://api.web3forms.com/submit";
// Inlined at build time (static export): set it in .env.local / Netlify env vars, then rebuild
const ACCESS_KEY = process.env.NEXT_PUBLIC_WEB3FORMS_KEY ?? "";

type Field = "name" | "email" | "subject" | "message";
type Values = Record<Field, string>;
type Errors = Partial<Record<Field, string>>;
type Status = "idle" | "submitting" | "success" | "error";

const EMPTY: Values = { name: "", email: "", subject: "", message: "" };
const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

function validate(v: Values): Errors {
  const e: Errors = {};
  if (!v.name.trim()) e.name = V.nameRequired;
  if (!v.email.trim()) e.email = V.emailRequired;
  else if (!EMAIL_RE.test(v.email.trim())) e.email = V.emailInvalid;
  if (!v.message.trim()) e.message = V.messageRequired;
  else if (v.message.trim().length < 10) e.message = V.messageTooShort;
  return e;
}

const inputClass = (invalid: boolean) =>
  `w-full rounded-control border bg-white/[0.03] px-4 py-3 text-foreground placeholder:text-subtle transition-[border-color,box-shadow] duration-200 outline-none focus:border-accent focus:shadow-[0_0_0_3px_rgb(59_130_246/0.2)] ${
    invalid ? "border-danger/60" : "border-border hover:border-border-strong"
  }`;

function FieldShell({
  id,
  label,
  hint,
  error,
  children,
}: {
  id: string;
  label: string;
  hint?: string;
  error?: string;
  children: ReactNode;
}) {
  return (
    <div>
      <label htmlFor={id} className="label-mono mb-2 flex items-baseline gap-2 text-[0.7rem] text-muted">
        {label}
        {hint && <span className="tracking-normal text-subtle normal-case">({hint})</span>}
      </label>
      {children}
      <AnimatePresence initial={false}>
        {error && (
          <motion.p
            id={`${id}-error`}
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="overflow-hidden text-sm text-danger"
          >
            <span className="block pt-1.5">{error}</span>
          </motion.p>
        )}
      </AnimatePresence>
    </div>
  );
}

function SuccessState({ onReset }: { onReset: () => void }) {
  return (
    <motion.div
      key="success"
      role="status"
      initial={{ opacity: 0, scale: 0.96 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
      className="flex min-h-[26rem] flex-col items-center justify-center gap-5 text-center"
    >
      <svg viewBox="0 0 52 52" className="h-16 w-16" aria-hidden>
        <motion.circle
          cx="26"
          cy="26"
          r="24"
          fill="none"
          stroke="var(--success)"
          strokeWidth="2"
          initial={{ pathLength: 0 }}
          animate={{ pathLength: 1 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
        />
        <motion.path
          d="M15 27l7 7 15-16"
          fill="none"
          stroke="var(--success)"
          strokeWidth="3"
          strokeLinecap="round"
          strokeLinejoin="round"
          initial={{ pathLength: 0 }}
          animate={{ pathLength: 1 }}
          transition={{ duration: 0.4, delay: 0.5, ease: "easeOut" }}
        />
      </svg>
      <div>
        <p className="font-display text-2xl font-semibold text-foreground">{L.successTitle}</p>
        <p className="mt-2 text-muted">{L.successText}</p>
      </div>
      <button
        type="button"
        onClick={onReset}
        className="glass rounded-pill px-5 py-2.5 text-sm font-medium text-foreground transition-colors hover:border-border-strong"
      >
        {L.sendAnother}
      </button>
    </motion.div>
  );
}

/** Web3Forms contact form: client-side validation, honeypot, loading and animated result states. */
export function ContactForm() {
  const uid = useId();
  const [values, setValues] = useState<Values>(EMPTY);
  const [errors, setErrors] = useState<Errors>({});
  const [touched, setTouched] = useState<Partial<Record<Field, boolean>>>({});
  const [status, setStatus] = useState<Status>("idle");
  const [errorKind, setErrorKind] = useState<"failed" | "not-configured">("failed");
  const honeypot = useRef<HTMLInputElement>(null);
  const fieldRefs = useRef<Partial<Record<Field, HTMLInputElement | HTMLTextAreaElement | null>>>({});

  const id = (f: Field) => `${uid}-${f}`;

  const update = (f: Field, value: string) => {
    const next = { ...values, [f]: value };
    setValues(next);
    // Live re-validation once a field has been visited
    if (touched[f]) setErrors((prev) => ({ ...prev, [f]: validate(next)[f] }));
    if (status === "error") setStatus("idle");
  };

  // Validate against the field's live value (state may not have re-rendered yet)
  const blur = (f: Field, value: string) => {
    setTouched((t) => ({ ...t, [f]: true }));
    setErrors((prev) => ({ ...prev, [f]: validate({ ...values, [f]: value })[f] }));
  };

  const onSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (status === "submitting") return;

    const found = validate(values);
    setErrors(found);
    setTouched({ name: true, email: true, subject: true, message: true });
    const firstInvalid = (["name", "email", "subject", "message"] as Field[]).find((f) => found[f]);
    if (firstInvalid) {
      fieldRefs.current[firstInvalid]?.focus();
      return;
    }

    // Honeypot filled → a bot. Pretend it worked, send nothing.
    if (honeypot.current?.checked) {
      setStatus("success");
      return;
    }

    if (!ACCESS_KEY) {
      if (process.env.NODE_ENV !== "production") {
        console.warn("NEXT_PUBLIC_WEB3FORMS_KEY is not set — see .env.example");
      }
      setErrorKind("not-configured");
      setStatus("error");
      return;
    }

    setStatus("submitting");
    const controller = new AbortController();
    const timeout = window.setTimeout(() => controller.abort(), 15000);
    try {
      const res = await fetch(ENDPOINT, {
        method: "POST",
        headers: { "Content-Type": "application/json", Accept: "application/json" },
        body: JSON.stringify({
          access_key: ACCESS_KEY,
          name: values.name.trim(),
          email: values.email.trim(),
          subject: values.subject.trim() || L.defaultSubject,
          message: values.message.trim(),
          from_name: L.fromName,
          botcheck: false,
        }),
        signal: controller.signal,
      });
      const data = (await res.json().catch(() => ({}))) as { success?: boolean };
      if (!res.ok || !data.success) throw new Error("Submission failed");
      setStatus("success");
      setValues(EMPTY);
      setTouched({});
      setErrors({});
    } catch {
      setErrorKind("failed");
      setStatus("error");
    } finally {
      window.clearTimeout(timeout);
    }
  };

  const reset = () => setStatus("idle");
  const submitting = status === "submitting";

  const fieldProps = (f: Field) => ({
    id: id(f),
    name: f,
    value: values[f],
    disabled: submitting,
    "aria-invalid": !!errors[f] || undefined,
    "aria-describedby": errors[f] ? `${id(f)}-error` : undefined,
    onBlur: (e: { target: { value: string } }) => blur(f, e.target.value),
    className: inputClass(!!errors[f]),
  });

  return (
    <div className="glass relative overflow-hidden rounded-card p-6 sm:p-8">
      <AnimatePresence mode="wait" initial={false}>
        {status === "success" ? (
          <SuccessState key="success" onReset={reset} />
        ) : (
          <motion.form
            key="form"
            noValidate
            onSubmit={onSubmit}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0, scale: 0.98 }}
            transition={{ duration: 0.3 }}
            className="flex flex-col gap-5"
          >
            <div className="grid gap-5 sm:grid-cols-2">
              <FieldShell id={id("name")} label={L.name} error={errors.name}>
                <input
                  {...fieldProps("name")}
                  ref={(el) => {
                    fieldRefs.current.name = el;
                  }}
                  type="text"
                  autoComplete="name"
                  maxLength={100}
                  required
                  onChange={(e) => update("name", e.target.value)}
                />
              </FieldShell>
              <FieldShell id={id("email")} label={L.email} error={errors.email}>
                <input
                  {...fieldProps("email")}
                  ref={(el) => {
                    fieldRefs.current.email = el;
                  }}
                  type="email"
                  autoComplete="email"
                  inputMode="email"
                  maxLength={150}
                  required
                  onChange={(e) => update("email", e.target.value)}
                />
              </FieldShell>
            </div>

            <FieldShell id={id("subject")} label={L.subject} hint={L.subjectOptional} error={errors.subject}>
              <input
                {...fieldProps("subject")}
                ref={(el) => {
                  fieldRefs.current.subject = el;
                }}
                type="text"
                maxLength={150}
                onChange={(e) => update("subject", e.target.value)}
              />
            </FieldShell>

            <FieldShell id={id("message")} label={L.message} error={errors.message}>
              <textarea
                {...fieldProps("message")}
                ref={(el) => {
                  fieldRefs.current.message = el;
                }}
                rows={6}
                maxLength={5000}
                required
                data-lenis-prevent
                onChange={(e) => update("message", e.target.value)}
                className={`${inputClass(!!errors.message)} min-h-40 resize-y`}
              />
            </FieldShell>

            {/* Honeypot: invisible to people, tempting to bots (Web3Forms "botcheck") */}
            <input
              ref={honeypot}
              type="checkbox"
              name="botcheck"
              tabIndex={-1}
              autoComplete="off"
              aria-hidden
              className="hidden"
              style={{ display: "none" }}
            />

            <AnimatePresence initial={false}>
              {status === "error" && (
                <motion.div
                  role="alert"
                  initial={{ opacity: 0, y: -6, height: 0 }}
                  animate={{ opacity: 1, y: 0, height: "auto" }}
                  exit={{ opacity: 0, height: 0 }}
                  className="overflow-hidden"
                >
                  <div className="flex gap-3 rounded-control border border-danger/40 bg-danger/10 p-4 text-sm">
                    <AlertCircle aria-hidden className="mt-0.5 h-4 w-4 shrink-0 text-danger" />
                    <div>
                      <p className="font-medium text-foreground">{L.errorTitle}</p>
                      <p className="mt-1 text-muted">
                        {errorKind === "not-configured" ? L.notConfigured : L.errorText}{" "}
                        <a href={`mailto:${identity.email}`} className="text-accent-2 underline-offset-4 hover:underline">
                          {identity.email}
                        </a>
                      </p>
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            <button
              type="submit"
              disabled={submitting}
              aria-busy={submitting}
              className="group/submit bg-accent-gradient relative inline-flex items-center justify-center gap-2 self-start rounded-pill px-6 py-3.5 text-sm font-medium text-white shadow-[0_8px_30px_-8px_rgb(139_92_246/0.6)] transition-opacity disabled:cursor-wait disabled:opacity-80 max-sm:w-full"
            >
              {submitting ? (
                <>
                  <Loader2 aria-hidden className="h-4 w-4 animate-spin" />
                  {L.sending}
                </>
              ) : (
                <>
                  {status === "error" && errorKind === "failed" ? L.retry : L.submit}
                  <Send
                    aria-hidden
                    className="h-4 w-4 transition-transform duration-300 group-hover/submit:translate-x-0.5 group-hover/submit:-translate-y-0.5"
                  />
                </>
              )}
            </button>
          </motion.form>
        )}
      </AnimatePresence>
    </div>
  );
}
