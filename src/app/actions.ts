"use server";

import type { ContactState } from "@/lib/contact";

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const field = (formData: FormData, name: string) =>
  String(formData.get(name) ?? "").trim();

/** Emails a contact-form message to the site owner through Resend. */
export async function sendMessage(
  _previous: ContactState,
  formData: FormData,
): Promise<ContactState> {
  const values = {
    name: field(formData, "name"),
    email: field(formData, "email"),
    message: field(formData, "message"),
  };
  const { name, email, message } = values;
  // Errors send the typed values back so the form keeps them.
  const fail = (text: string): ContactState => ({
    status: "error",
    message: text,
    values,
  });

  // Hidden field that people never see; bots fill it in. Pretend it worked.
  if (field(formData, "company")) return { status: "sent", message: "" };

  if (!name || name.length > 100) return fail("Please enter your name.");
  if (!EMAIL_PATTERN.test(email) || email.length > 200) {
    return fail("Please enter a valid email address.");
  }
  if (message.length < 10 || message.length > 5000) {
    return fail("Please write a message of at least 10 characters.");
  }

  const apiKey = process.env.RESEND_API_KEY;
  const to = process.env.CONTACT_TO_EMAIL;
  if (!apiKey || !to) return fail("The contact form isn't set up yet.");

  try {
    const response = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${apiKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        from:
          process.env.CONTACT_FROM_EMAIL ?? "Portfolio <onboarding@resend.dev>",
        to: [to],
        reply_to: email,
        subject: `Portfolio message from ${name}`,
        text: `${message}\n\n— ${name} <${email}>`,
      }),
      signal: AbortSignal.timeout(10_000),
    });
    if (!response.ok) {
      console.error(
        "Resend rejected the message:",
        response.status,
        await response.text(),
      );
      throw new Error("send failed");
    }
  } catch {
    return fail(
      "Couldn't send that just now. Please try again, or reach me on LinkedIn.",
    );
  }

  return { status: "sent", message: "" };
}
