"use client"

import React from "react"
import { useEffect, useRef } from "react"
import gsap from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"

gsap.registerPlugin(ScrollTrigger)

export default function RevealOnScroll({ children }) {
  const ref = useRef(null)

  useEffect(() => {
    if (!ref.current) return
    const el = ref.current
    el.classList.add("opacity-0", "translate-y-8")
    const anim = gsap.to(el, {
      opacity: 1,
      y: 0,
      duration: 0.6,
      ease: "power2.out",
      scrollTrigger: {
        trigger: el,
        start: "top 80%",
        once: true,
      },
    })
    return () => {
      anim.kill()
    }
  }, [])

  return <div ref={ref}>{children}</div>
}
