"use client"

import Link from "next/link"
import { Github, Linkedin} from "lucide-react"
import ThemeToggle from "./theme-toggle"

export default function Footer() {
  return (
    <footer className="border-t border-border">
      <div className="container mx-auto px-4 py-8 md:py-10">
        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="text-sm text-muted-foreground">© Omkar Bokan 2025</div>
          <nav className="flex items-center gap-4">
            <a href="#home" className="text-sm hover:text-primary">
              Home
            </a>
            <a href="#about" className="text-sm hover:text-primary">
              About me
            </a>
            <a href="#projects" className="text-sm hover:text-primary">
              Projects
            </a>
            <a href="#skills" className="text-sm hover:text-primary">
              Skills
            </a>
            <a href="#contact" className="text-sm hover:text-primary">
              Contact
            </a>
          </nav>
          <div className="flex items-center gap-3">
            <Link aria-label="GitHub" href="https://github.com/Omkar-Bokan" target="_blank" className="hover:text-primary">
              <Github className="size-5" />
            </Link>
            <Link aria-label="LinkedIn" href="linkedin.com/in/omkar-bokan" target="_blank" className="hover:text-primary">
              <Linkedin className="size-5" />
            </Link>
            <ThemeToggle />
          </div>
        </div>
      </div>
    </footer>
  )
}
