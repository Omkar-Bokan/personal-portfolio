"use client"

import { useEffect } from "react"
import Navbar from "@/components/navbar"
import Hero from "@/components/hero"
import About from "@/components/about"
import Skills from "@/components/skills"
import Projects from "@/components/projects"
import Experience from "@/components/experience"
import ContactForm from "@/components/contact-form"
import Footer from "@/components/footer"
import ScrollProgress from "@/components/scroll-progress"
import RevealOnScroll from "@/components/reveal-on-scroll"

export default function HomePage() {
  // Prefetch anchor targets quickly
  useEffect(() => {
    // no-op: can be used for any client-init if needed
  }, [])

  return (
    <>
      <ScrollProgress />
      <Navbar />
      <main className="min-h-screen">
        <section id="home" className="relative">
          <Hero />
        </section>

        <RevealOnScroll>
          <section id="about" className="container mx-auto px-4 py-16 md:py-24">
            <About />
          </section>
        </RevealOnScroll>

        <RevealOnScroll>
          <section id="skills" className="container mx-auto px-4 py-16 md:py-[60px]">
            <Skills />
          </section>
        </RevealOnScroll>

        <RevealOnScroll>
          <section id="projects" className="container mx-auto px-4 py-16 md:py-[60px]">
            <Projects />
          </section>
        </RevealOnScroll>

        <RevealOnScroll>
          <section id="experience" className="container mx-auto px-4 py-16 md:py-[60px]">
            <Experience />
          </section>
        </RevealOnScroll>

        <RevealOnScroll>
          <section id="contact" className="container mx-auto px-4 py-16 md:py-[60px]">
            <ContactForm />
          </section>
        </RevealOnScroll>
      </main>
      <Footer />
    </>
  )
}
