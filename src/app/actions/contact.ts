"use server";

import { Resend } from "resend";
import { common } from "@/content/en/common";

/**
 * Submissions go to the address shown on the Contact Us page so display and
 * delivery never drift apart (currently the commercial director).
 */
const RECIPIENT = common.contact.email;

/** Must be on a Resend-verified domain; override via env if needed. */
const FROM =
  process.env.CONTACT_FROM_EMAIL ?? "Cybercraft Website <website@cybercraft.az>";

export interface ContactFormState {
  status: "idle" | "success" | "error";
}

const escapeHtml = (value: string) =>
  value
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;");

export async function sendContactMessage(
  _prevState: ContactFormState,
  formData: FormData,
): Promise<ContactFormState> {
  const field = (name: string) => String(formData.get(name) ?? "").trim();

  const firstName = field("firstName");
  const lastName = field("lastName");
  const email = field("email");
  const telephone = field("telephone");

  // Server-side mirror of the client `required` / `type="email"` validation.
  if (!firstName || !lastName || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return { status: "error" };
  }

  try {
    const resend = new Resend(process.env.RESEND_API_KEY);
    const { error } = await resend.emails.send({
      from: FROM,
      to: RECIPIENT,
      replyTo: email,
      subject: `Website contact request — ${firstName} ${lastName}`,
      html: [
        "<h2>New contact request from cybercraft.az</h2>",
        `<p><strong>Name:</strong> ${escapeHtml(firstName)} ${escapeHtml(lastName)}</p>`,
        `<p><strong>Email:</strong> ${escapeHtml(email)}</p>`,
        `<p><strong>Telephone:</strong> ${escapeHtml(telephone) || "—"}</p>`,
      ].join("\n"),
    });

    if (error) {
      console.error("Contact form delivery failed:", error);
      return { status: "error" };
    }
    return { status: "success" };
  } catch (err) {
    console.error("Contact form delivery failed:", err);
    return { status: "error" };
  }
}
