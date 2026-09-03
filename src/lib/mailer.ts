import nodemailer from "nodemailer";

export async function sendContactEmail(input: {
  name: string;
  email: string;
  phone?: string;
  message: string;
}) {
  const transporter = nodemailer.createTransport({
    host: process.env.SMTP_HOST,
    port: Number(process.env.SMTP_PORT ?? 587),
    secure: Number(process.env.SMTP_PORT) === 465,
    auth: {
      user: process.env.SMTP_USER,
      pass: process.env.SMTP_PASSWORD,
    },
  });

  await transporter.sendMail({
    from: process.env.SMTP_FROM,
    to: process.env.CONTACT_TO_EMAIL,
    replyTo: input.email,
    subject: `New inquiry from ${input.name}`,
    text: [
      `Name: ${input.name}`,
      `Email: ${input.email}`,
      input.phone ? `Phone: ${input.phone}` : null,
      "",
      input.message,
    ]
      .filter(Boolean)
      .join("\n"),
  });
}
