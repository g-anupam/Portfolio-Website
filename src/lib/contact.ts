export type ContactState = {
  status: "idle" | "sent" | "error";
  message: string;
  /** What the visitor typed, sent back on an error so the form can keep it. */
  values?: { name: string; email: string; message: string };
};

export const initialContactState: ContactState = {
  status: "idle",
  message: "",
};

/** The form is only shown when the mail settings exist, so the site never has a dead form. */
export function contactFormEnabled() {
  return Boolean(process.env.RESEND_API_KEY && process.env.CONTACT_TO_EMAIL);
}
