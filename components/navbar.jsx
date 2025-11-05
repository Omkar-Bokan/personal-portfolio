"use client"

import { useEffect, useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import ThemeToggle from "./theme-toggle"
import { Menu, X } from "lucide-react"

const navItems = [
  { href: "#home", label: "Home" },
  { href: "#about", label: "About Me" },
  { href: "#projects", label: "Projects" },
  { href: "#skills", label: "Skills" },
  { href: "#contact", label: "Contact" },
]

export default function Navbar() {
  const [open, setOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 4)
    onScroll()
    window.addEventListener("scroll", onScroll)
    return () => window.removeEventListener("scroll", onScroll)
  }, [])

  return (
    <header
      className={`sticky top-0 z-50 transition-all ${
        scrolled
          ? "supports-[backdrop-filter]:backdrop-blur-md bg-background/60 border-b border-border"
          : "bg-background/30"
      }`}
      role="banner"
      aria-label="Primary Navigation"
    >
      <nav className="container mx-auto px-4 py-3 md:py-4 flex items-center justify-between text-left">
        <Link href="#home" className="font-semibold tracking-tight">
          Omkar Bokan
        </Link>

        <div className="hidden md:flex items-center gap-6">
          {navItems.map((item) => (
            <a key={item.href} href={item.href} className="text-sm hover:text-primary transition-colors">
              {item.label}
            </a>
          ))}
          <Button asChild size="sm">
            <a href="/projects/Omkar bokan Resume.pdf" download>
              Resume
            </a>
          </Button>
          <ThemeToggle />
        </div>

        <button
          className="md:hidden inline-flex items-center justify-center rounded-md border border-border px-2.5 py-2 hover:bg-accent"
          aria-label="Toggle menu"
          aria-controls="mobile-menu"
          aria-expanded={open}
          onClick={() => setOpen((v) => !v)}
        >
          {open ? <X className="size-5" /> : <Menu className="size-5" />}
        </button>
      </nav>

      <div id="mobile-menu" className={`md:hidden border-t border-border ${open ? "block" : "hidden"}`}>
        <div className="container mx-auto px-4 py-3 flex flex-col gap-3">
          {navItems.map((item) => (
            <a key={item.href} href={item.href} className="py-1 hover:text-primary" onClick={() => setOpen(false)}>
              {item.label}
            </a>
          ))}
          <div className="flex items-center gap-3 pt-2">
            <Button asChild size="sm" className="w-full">
              <a href="/resume.pdf" download>
                Resume
              </a>
            </Button>
            <ThemeToggle />
          </div>
        </div>
      </div>
    </header>
  )
}
