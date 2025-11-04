export type ExperienceItem = {
  title: string
  org: string
  year: string
  details: string
}

export type CertificateItem = {
  name: string
  issuer: string
  year: string
}

export const experiences: ExperienceItem[] = [
  {
    title: "Bachelor of Computer Applications (BCA)",
    org: "Choice College Art and Commerce",
    year: "2024",
    details: "Graduated with a focus on full-stack web development.",
  },
  {
    title: "Fresher Web Developer",
    org: "ATUM information technology",
    year: "22 MAY 2025 - 22 AUG 2025",
    details: "Built responsive websites and small web apps for local businesses using React and Node.js.",
  },
]

export const certificates: CertificateItem[] = [
  { name: "Web developer intership", issuer: "ATUM information technology", year: "2025" },
]
