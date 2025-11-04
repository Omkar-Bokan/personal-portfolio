"use client"

import { useEffect, useRef } from "react"
import gsap from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"

gsap.registerPlugin(ScrollTrigger)

const skills = [
  { name: "HTML", level: 80, category: "Frontend" },
  { name: "CSS", level: 80, category: "Frontend" },
  { name: "JavaScript", level: 40, category: "Frontend" },
  { name: "React", level: 40, category: "Frontend" },
  { name: "MUI", level: 70, category: "Frontend" },
  { name: "Bootstrap", level: 70, category: "Frontend" },
  { name: "GSAP", level: 40, category: "Frontend" },
  { name: "Node.js", level: 40, category: "Backend" },
  { name: "Express.js", level: 40, category: "Backend" },
  { name: "MongoDB", level: 50, category: "Database" },
  { name: "Git", level: 50, category: "Tools" },
  { name: "GitHub", level: 60, category: "Tools" },
  { name: "VS Code", level: 80, category: "Tools" },
  { name: "Postman", level: 70, category: "Tools" },
]

const categories = ["Frontend", "Backend", "Database", "Tools"]

export default function Skills() {
  const rootRef = useRef(null)

  useEffect(() => {
    if (!rootRef.current) return
    const ctx = gsap.context(() => {
      const bars = gsap.utils.toArray(".skill-bar-fill")
      bars.forEach((bar) => {
        const targetWidth = bar.dataset.width ? Number.parseInt(bar.dataset.width, 10) : 0
        gsap.fromTo(
          bar,
          { width: "0%" },
          {
            width: `${targetWidth}%`,
            duration: 1,
            ease: "power2.out",
            scrollTrigger: {
              trigger: bar,
              start: "top 85%",
            },
          },
        )
      })
    }, rootRef)
    return () => ctx.revert()
  }, [])

  return (
    <div ref={rootRef}>
      <h2 className="text-2xl md:text-3xl font-semibold">Skills</h2>
      <p className="mt-2 text-muted-foreground">Tech I work with</p>

      <div className="mt-8 grid gap-8 md:grid-cols-2">
        {categories.map((cat) => {
          const list = skills.filter((s) => s.category === cat)
          return (
            <div key={cat} className="rounded-lg border border-border p-5">
              <h3 className="font-medium">{cat}</h3>
              <div className="mt-4 grid gap-4">
                <TooltipProvider>
                  {list.map((s) => (
                    <div key={s.name}>
                      <div className="flex items-center justify-between text-sm">
                        <Tooltip>
                          <TooltipTrigger asChild>
                            <span className="font-medium hover:text-primary cursor-help">{s.name}</span>
                          </TooltipTrigger>
                          <TooltipContent>
                            <p>{s.level}% proficiency</p>
                          </TooltipContent>
                        </Tooltip>
                        <span className="text-muted-foreground">{s.level}%</span>
                      </div>
                      <div className="mt-2 h-2 rounded-full bg-muted">
                        <div
                          className="skill-bar-fill h-2 rounded-full bg-primary"
                          data-width={s.level}
                          aria-label={`${s.name} proficiency ${s.level}%`}
                          role="progressbar"
                          aria-valuemin={0}
                          aria-valuemax={100}
                          aria-valuenow={s.level}
                        />
                      </div>
                    </div>
                  ))}
                </TooltipProvider>
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}
