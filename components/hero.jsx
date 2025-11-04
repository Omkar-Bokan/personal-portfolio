"use client"

import { Button } from "@/components/ui/button"
import { useEffect, useRef } from "react"
import gsap from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"

gsap.registerPlugin(ScrollTrigger)

export default function Hero() {
  const containerRef = useRef(null)

  useEffect(() => {
    if (!containerRef.current) return
    const ctx = gsap.context(() => {
      const tl = gsap.timeline()
      tl.from(".hero-title", { y: 20, opacity: 0, duration: 0.6, ease: "power2" })
        .from(".hero-tagline", { y: 12, opacity: 0, duration: 0.5 }, "-=0.3")
        .from(".hero-cta", { y: 10, opacity: 0, stagger: 0.1, duration: 0.4 }, "-=0.2")

      // subtle floating background particles
      gsap.to(".hero-bubble", {
        y: -12,
        x: 8,
        repeat: -1,
        yoyo: true,
        duration: 3,
        ease: "sine.inOut",
      })
    }, containerRef)

    return () => ctx.revert()
  }, [])

  return (
    <div ref={containerRef} className="relative overflow-hidden">
      <div className="container mx-auto px-4 py-12 md:py-16 grid gap-8 md:grid-cols-2 items-center">
        <div>
          <h1 className="hero-title text-pretty text-3xl md:text-5xl font-semibold leading-tight">
            Omkar Bokan – Full Stack Web Developer
          </h1>
          <p className="hero-tagline mt-4 text-muted-foreground leading-relaxed">
            I build responsive and user-friendly web apps using React, Node.js, Express.js, and MongoDB.
          </p>

          <div className="mt-6 flex flex-wrap items-center gap-3">
            <Button className="hero-cta" asChild>
              <a href="#projects">View My Work</a>
            </Button>
            <Button className="hero-cta bg-transparent" asChild variant="outline">
              <a href="#contact">Contact Me</a>
            </Button>
            <Button className="hero-cta" asChild variant="secondary">
              <a href="/resume.pdf" download>
                Download Resume
              </a>
            </Button>
          </div>
        </div>

        <div className="relative">
          <img
            src="/main profile photo.png"
            alt="Developer at work illustration"
            className="mx-auto w-56 md:w-72 lg:w-80 max-w-full h-auto object-contain rounded-lg border border-border"
          />
          <div className="hero-bubble absolute -z-10 right-6 -top-6 size-32 rounded-full bg-accent/60" />
          <div className="hero-bubble absolute -z-10 -left-6 bottom-12 size-24 rounded-full bg-muted/60" />
        </div>
      </div>
    </div>
  )
}
