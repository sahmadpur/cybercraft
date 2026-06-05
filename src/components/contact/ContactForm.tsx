"use client";

import { useActionState } from "react";
import {
  sendContactMessage,
  type ContactFormState,
} from "@/app/actions/contact";
import { ArrowButton } from "@/components/buttons/ArrowButton";
import type { ContactFormLabels } from "@/content/types";

const fieldClasses =
  "w-full rounded-lg border border-line bg-surface px-4 py-3 text-sm text-ink placeholder:text-ink-muted/70 transition-colors duration-200 hover:border-line-strong focus:border-brand-dark focus:outline-none";

const initialState: ContactFormState = { status: "idle" };

/** Contact form — submissions are emailed via the `sendContactMessage` server action. */
export function ContactForm({ labels }: { labels: ContactFormLabels }) {
  const [state, formAction, pending] = useActionState(
    sendContactMessage,
    initialState,
  );

  return (
    <form action={formAction} aria-label={labels.submit} className="flex flex-col gap-4">
      <div className="grid gap-4 sm:grid-cols-2">
        <label className="sr-only" htmlFor="contact-first-name">
          {labels.firstName}
        </label>
        <input
          id="contact-first-name"
          name="firstName"
          type="text"
          required
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
          required
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
        required
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
        <ArrowButton
          label={pending ? labels.sending : labels.submit}
          size="lg"
          disabled={pending}
        />
      </div>
      <p aria-live="polite" className="min-h-5 text-sm">
        {state.status === "success" && (
          <span className="font-medium text-brand-dark">{labels.success}</span>
        )}
        {state.status === "error" && !pending && (
          <span className="font-medium text-red-600">{labels.error}</span>
        )}
      </p>
    </form>
  );
}
