"use client";

import { ArrowButton } from "@/components/buttons/ArrowButton";
import type { ContactFormLabels } from "@/content/types";

const fieldClasses =
  "w-full rounded-lg border border-line bg-surface px-4 py-3 text-sm text-ink placeholder:text-ink-muted/70 transition-colors duration-200 hover:border-line-strong focus:border-brand-dark focus:outline-none";

/**
 * Visual-only contact form (phase 1) — mirrors the live site's fields.
 * Submission is intentionally a no-op; wire a handler to `onSubmit` in the
 * next phase.
 */
export function ContactForm({ labels }: { labels: ContactFormLabels }) {
  return (
    <form
      onSubmit={(e) => e.preventDefault()}
      aria-label={labels.submit}
      className="flex flex-col gap-4"
    >
      <div className="grid gap-4 sm:grid-cols-2">
        <label className="sr-only" htmlFor="contact-first-name">
          {labels.firstName}
        </label>
        <input
          id="contact-first-name"
          name="firstName"
          type="text"
          autoComplete="given-name"
          placeholder={labels.firstName}
          className={fieldClasses}
        />
        <label className="sr-only" htmlFor="contact-last-name">
          {labels.lastName}
        </label>
        <input
          id="contact-last-name"
          name="lastName"
          type="text"
          autoComplete="family-name"
          placeholder={labels.lastName}
          className={fieldClasses}
        />
      </div>
      <label className="sr-only" htmlFor="contact-email">
        {labels.email}
      </label>
      <input
        id="contact-email"
        name="email"
        type="email"
        autoComplete="email"
        placeholder={labels.email}
        className={fieldClasses}
      />
      <label className="sr-only" htmlFor="contact-telephone">
        {labels.telephone}
      </label>
      <input
        id="contact-telephone"
        name="telephone"
        type="tel"
        autoComplete="tel"
        placeholder={labels.telephone}
        className={fieldClasses}
      />
      <div className="pt-2">
        <ArrowButton label={labels.submit} size="lg" />
      </div>
    </form>
  );
}
