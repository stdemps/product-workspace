import { NextRequest, NextResponse } from "next/server"
import { z } from "zod"

/**
 * Example secure API route: validates input with zod, returns safe JSON.
 * Use this pattern for any user-submitted data (forms, webhooks, etc.).
 */

const contactSchema = z.object({
  name: z.string().min(1, "Name is required").max(200),
  email: z.string().email("Invalid email address"),
  message: z.string().min(1, "Message is required").max(5000),
})

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()

    const parsed = contactSchema.safeParse(body)
    if (!parsed.success) {
      const errors = parsed.error.flatten().fieldErrors
      return NextResponse.json(
        { success: false, error: "Validation failed", errors },
        { status: 400 }
      )
    }

    const { name, email, message } = parsed.data

    // Example: log safely (no PII in production logs if required by policy),
    // or send to email/CRM. Never expose internal errors to the client.
    if (process.env.NODE_ENV === "development") {
      console.info("[Contact]", { name, email, messageLength: message.length })
    }

    return NextResponse.json({
      success: true,
      message: "Thank you for your message.",
    })
  } catch {
    return NextResponse.json(
      { success: false, error: "Something went wrong." },
      { status: 500 }
    )
  }
}
