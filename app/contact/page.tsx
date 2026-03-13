import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { ContactForm } from "@/components/contact-form"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { ArrowLeft } from "lucide-react"

export default function ContactPage() {
  return (
    <div className="container mx-auto p-4 md:p-6 lg:p-8">
      <div className="mb-6 md:mb-8">
        <Button variant="ghost" size="sm" asChild>
          <Link href="/" className="gap-2">
            <ArrowLeft className="h-4 w-4" aria-hidden />
            Back
          </Link>
        </Button>
      </div>

      <div className="max-w-xl mx-auto">
        <Card>
          <CardHeader>
            <CardTitle>Contact</CardTitle>
            <CardDescription>
              Example form with server-side validation (zod). See{" "}
              <code className="text-xs bg-muted px-1.5 py-0.5 rounded">
                app/api/contact/route.ts
              </code>{" "}
              for the secure API pattern.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <ContactForm />
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
