import nodemailer from "nodemailer";

interface VerificationEmailInput {
  to: string;
  name: string;
  verificationUrl: string;
}

function getRequiredEnv(name: string) {
  const value = process.env[name];

  if (!value) {
    throw new Error(`${name} is required to send verification emails.`);
  }

  return value;
}

function createTransporter() {
  return nodemailer.createTransport({
    host: getRequiredEnv("SMTP_HOST"),
    port: Number(process.env.SMTP_PORT ?? 587),
    secure: process.env.SMTP_SECURE === "true",
    auth: {
      user: getRequiredEnv("SMTP_USER"),
      pass: getRequiredEnv("SMTP_PASSWORD"),
    },
  });
}

export async function sendVerificationEmail({
  to,
  name,
  verificationUrl,
}: VerificationEmailInput) {
  const appName = process.env.APP_NAME ?? "DriveNow";
  const from = process.env.EMAIL_FROM ?? getRequiredEnv("SMTP_USER");

  await createTransporter().sendMail({
    from,
    to,
    subject: `Verify your ${appName} email`,
    text: [
      `Hi ${name},`,
      "",
      `Verify your email address to activate your ${appName} account:`,
      verificationUrl,
      "",
      "This link expires in 24 hours.",
    ].join("\n"),
    html: `
      <div style="font-family:Arial,sans-serif;line-height:1.6;color:#111827">
        <h2 style="margin:0 0 16px">Verify your email</h2>
        <p>Hi ${name},</p>
        <p>Verify your email address to activate your ${appName} account.</p>
        <p>
          <a href="${verificationUrl}" style="display:inline-block;background:#111827;color:#fff;padding:12px 18px;border-radius:999px;text-decoration:none">
            Verify email
          </a>
        </p>
        <p style="font-size:13px;color:#6b7280">This link expires in 24 hours.</p>
      </div>
    `,
  });
}
