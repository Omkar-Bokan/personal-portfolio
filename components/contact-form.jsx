"use client"

import React from "react"

import { useState, useRef } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { useToast } from "@/hooks/use-toast"
import gsap from "gsap"

export default function ContactForm() {
  const { toast } = useToast()
  const [loading, setLoading] = useState(false)
  const ref = useRef(null)

  const onSubmit = async (e) => {
    e.preventDefault()
    const form = e.currentTarget
    const formData = new FormData(form)
    setLoading(true)
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        body: formData,
      })
      const data = await res.json()

      if (!res.ok) {
        throw new Error(data?.error || "Failed to send message")
      }

      form.reset()
      toast({ title: "Success!", description: "Your message has been sent successfully!" })

      if (ref.current) {
        const el = ref.current.querySelector(".success-pulse")
        if (el) {
          gsap.fromTo(el, { scale: 0.9, opacity: 0 }, { scale: 1, opacity: 1, duration: 0.4, ease: "power2.out" })
        }
      }
    } catch (err) {
      toast({ title: "Something went wrong", description: err.message, variant: "destructive" })
    } finally {
      setLoading(false)
    }
  }

  return (
    <div ref={ref}>
      <h2 className="text-2xl md:text-3xl font-semibold">Contact</h2>
      <p className="mt-2 text-muted-foreground">Have a question or want to work together? Send a message.</p>
      <div className="mt-8 max-w-xl">
        <form onSubmit={onSubmit} className="grid gap-4">
          <Input name="name" placeholder="Your name" required />
          <Input type="email" name="email" placeholder="Your email" required />
          <Textarea name="message" placeholder="Your message" rows={5} required />
          <Button type="submit" disabled={loading}>
            {loading ? "Sending..." : "Send Message"}
          </Button>
        </form>

        <div className="success-pulse mt-4 rounded-md border border-border p-3 text-sm" aria-live="polite">
          I&apos;ll get back to you as soon as possible!
        </div>
      </div>
    </div>
  )
}
