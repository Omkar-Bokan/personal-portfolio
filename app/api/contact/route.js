import { NextResponse } from "next/server"
import nodemailer from "nodemailer"

export async function POST(req) {
  try {
    const formData = await req.formData()
    const name = formData.get("name")
    const email = formData.get("email")
    const message = formData.get("message")

    if (!name || !email || !message) {
      return NextResponse.json({ error: "Missing fields" }, { status: 400 })
    }

    // Create transporter from environment variables
    // Make sure to add these in the Vars sidebar:
    // SMTP_HOST, SMTP_PORT, SMTP_USER, SMTP_PASS, CONTACT_TO_EMAIL (optional)
    const host = process.env.SMTP_HOST
    const port = Number(process.env.SMTP_PORT || 587)
    const user = process.env.SMTP_USER
    const pass = process.env.SMTP_PASS
    const to = process.env.CONTACT_TO_EMAIL || user

    if (!host || !user || !pass) {
      return NextResponse.json(
        { error: "Email transport not configured. Please set SMTP_* env vars." },
        { status: 500 },
      )
    }

    const transporter = nodemailer.createTransport({
      host,
      port,
      secure: port === 465,
      auth: { user, pass },
    })

    const info = await transporter.sendMail({
      from: `"Portfolio Contact" <${user}>`,
      to,
      replyTo: email,
      subject: `New message from ${name}`,
      text: `From: ${name} <${email}>\n\n${message}`,
      html: `
        <p><strong>From:</strong> ${name} &lt;${email}&gt;</p>
        <p>${message.replace(/\n/g, "<br/>")}</p>
      `,
    })

    return NextResponse.json({ ok: true, id: info.messageId })
  } catch (err) {
    console.error("Email send error:", err)
    return NextResponse.json({ error: err.message || "Server error" }, { status: 500 })
  }
}
