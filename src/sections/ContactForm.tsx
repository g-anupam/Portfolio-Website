"use client";

import { useActionState } from "react";
import { sendMessage } from "@/app/actions";
import { initialContactState } from "@/lib/contact";

const labelClass = "text-muted font-mono text-xs tracking-[0.06em] uppercase";
const inputClass =
  "border-muted focus:border-ink w-full border bg-transparent px-3.5 py-3 text-base outline-none";

export function ContactForm() {
  const [state, formAction, pending] = useActionState(
    sendMessage,
    initialContactState,
  );

  if (state.status === "sent") {
    return (
      <p role="status" className="border-ink border-t pt-6 text-[21px]">
        Thanks, your message is on its way. I&apos;ll reply by email.
      </p>
    );
  }

  return (
    <form action={formAction} className="flex flex-col gap-5">
      <div className="flex flex-wrap gap-5">
        <div className="flex flex-[1_1_220px] flex-col gap-2">
          <label htmlFor="contact-name" className={labelClass}>
            Name
          </label>
          <input
            id="contact-name"
            defaultValue={state.values?.name}
            name="name"
            type="text"
            required
            maxLength={100}
            autoComplete="name"
            className={inputClass}
          />
        </div>
        <div className="flex flex-[1_1_220px] flex-col gap-2">
          <label htmlFor="contact-email" className={labelClass}>
            Your email
          </label>
          <input
            id="contact-email"
            defaultValue={state.values?.email}
            name="email"
            type="email"
            required
            maxLength={200}
            autoComplete="email"
            className={inputClass}
          />
        </div>
      </div>
      <div className="flex flex-col gap-2">
        <label htmlFor="contact-message" className={labelClass}>
          Message
        </label>
        <textarea
          id="contact-message"
          defaultValue={state.values?.message}
          name="message"
          required
          minLength={10}
          maxLength={5000}
          rows={6}
          className={`${inputClass} resize-y`}
        />
      </div>
      {/* Honeypot: hidden from people and assistive tech, filled in by bots. */}
      <div aria-hidden="true" className="hidden">
        <label htmlFor="contact-company">Company</label>
        <input
          id="contact-company"
          name="company"
          type="text"
          tabIndex={-1}
          autoComplete="off"
        />
      </div>
      <div className="flex flex-wrap items-center gap-x-6 gap-y-3">
        <button
          type="submit"
          disabled={pending}
          className="bg-accent text-on-accent cursor-pointer px-5 py-[13px] font-semibold hover:opacity-90 disabled:cursor-default disabled:opacity-60"
        >
          {pending ? "Sending…" : "Send message"}
        </button>
        <p aria-live="polite" className="text-base">
          {state.status === "error" ? state.message : ""}
        </p>
      </div>
    </form>
  );
}
