"use client"

import { experiences, certificates } from "@/data/experience"
import { GraduationCap, BadgeCheck } from "lucide-react"

export default function Experience() {
  return (
    <div>
      <h2 className="text-2xl md:text-3xl font-semibold">Experience & Education</h2>
      <p className="mt-2 text-muted-foreground">Timeline & certificates</p>

      <div className="mt-8 grid grid-cols-1 gap-8">
        <div>
          <h3 className="font-medium flex items-center gap-2">
            <GraduationCap className="size-5" /> Education & Experience
          </h3>
          <ol className="mt-4 relative border-l border-border pl-4 space-y-6">
            {experiences.map((e) => (
              <li key={e.title} className="ml-2">
                <div className="absolute -left-1.5 mt-1 size-3 rounded-full bg-primary" aria-hidden />
                <div className="text-sm">
                  <div className="font-medium">{e.title}</div>
                  <div className="text-muted-foreground">
                    {e.org} · {e.year}
                  </div>
                  <p className="mt-2 text-muted-foreground leading-relaxed">{e.details}</p>
                </div>
              </li>
            ))}
          </ol>
        </div>

        <div>
          <h3 className="font-medium flex items-center gap-2">
            <BadgeCheck className="size-5" /> Certificates
          </h3>
          <ul className="mt-4 grid gap-3">
            {certificates.map((c) => (
              <li key={c.name} className="rounded-md border border-border p-4">
                <div className="text-sm font-medium">{c.name}</div>
                <div className="text-xs text-muted-foreground">
                  {c.issuer} · {c.year}
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  )
}
