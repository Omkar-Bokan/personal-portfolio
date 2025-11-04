"use client"

import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { projects } from "@/data/projects"

export default function Projects() {
  return (
    <div>
      <h2 className="text-2xl md:text-3xl font-semibold">Projects</h2>
      <p className="mt-2 text-muted-foreground">Some things I&apos;ve built recently</p>

      <div className="mt-8 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {projects.map((p) => (
          <Card key={p.name} className="transition-transform hover:-translate-y-1">
            <CardHeader>
              <img
                src={p.thumbnail || "/placeholder.svg?height=180&width=360&query=project%20screenshot"}
                alt={`${p.name} screenshot`}
                className="w-full h-40 object-cover rounded-lg border border-border"
              />
              <CardTitle className="mt-4">{p.name}</CardTitle>
              <CardDescription>{p.tagline}</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-sm leading-relaxed text-muted-foreground">{p.description}</p>
              <div className="mt-3 flex flex-wrap gap-2">
                {p.tags?.map((t) => (
                  <span key={t} className="text-xs rounded-full border border-border px-2 py-0.5">
                    {t}
                  </span>
                ))}
              </div>
            </CardContent>
            <CardFooter className="flex items-center justify-between">
              <div className="text-xs text-muted-foreground">{p.stack.join(" · ")}</div>
              <div className="flex gap-2">
                {p.live && (
                  <Button asChild size="sm">
                    <a href={p.live} target="_blank" rel="noreferrer">
                      Live Demo
                    </a>
                  </Button>
                )}
                {p.source && (
                  <Button asChild size="sm" variant="outline">
                    <a href={p.source} target="_blank" rel="noreferrer">
                      Source
                    </a>
                  </Button>
                )}
              </div>
            </CardFooter>
          </Card>
        ))}
      </div>
    </div>
  )
}
