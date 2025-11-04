"use client"

import { Button } from "@/components/ui/button"

export default function About() {
  return (
    <div className="grid gap-8 md:grid-cols-2 md:gap-10 items-center">
      <div>
        <h2 className="text-2xl md:text-3xl font-semibold">About Me</h2>
        <p className="mt-4 text-muted-foreground leading-relaxed">
          My name is Omkar Bokan, a fresher web developer from Pune, India. I have good knowledge of React and Node.js and like creating interactive and responsive web apps.
        </p>
        <p className="mt-3 text-muted-foreground leading-relaxed">
          I enjoy exploring new tools and learning how to make better web experiences.
        </p>
        <div className="mt-6">
          <Button asChild>
            <a href="/resume.pdf" download>
              Download Resume
            </a>
          </Button>
        </div>
      </div>

      <div className="justify-self-center">
        <img
          src="/projects/image 8.jpg"
          alt="Omkar Bokan portrait"
          className="size-64 md:size-72 rounded-full border border-border object-cover transition-transform duration-300 hover:scale-105"
        />
      </div>
    </div>
  )
}
