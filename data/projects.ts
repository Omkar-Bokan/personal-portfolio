export type Project = {
  name: string
  tagline: string
  description: string
  stack: string[]
  tags?: string[]
  live?: string
  source?: string
  thumbnail?: string
}

export const projects: Project[] = [
  {
    name: "Project beRent",
    tagline: "Find your stay, book with ease.",
    description: "A web-based platform for booking and managing hotel rooms. It allows users to browse available rooms, check prices, and make reservations online. The system includes features like user authentication, booking history, and responsive UI for a smooth experience across devices.",
    stack: ["MongoDB", "Express", "React", "Node.js"],
    tags: ["#MongoDB", "#Express", "#React", "#Node.js"],
    source: "https://github.com/Omkar-Bokan/beRent",
    live: "https://example.com/",
    thumbnail: "/projects/berent.png",
    
  },
  {
    name: "Human Resource Management System",
    tagline: "Smart HR management for growing teams.",
    description: "An internal HR management tool designed to simplify employee data handling, attendance tracking, leave management, and payroll operations. It helps administrators manage workforce activities efficiently with role-based access and an intuitive dashboard.",
    stack: ["MongoDB", "Express", "React", "Node.js"],
    tags: ["#MongoDB", "#Express", "#React", "#Node.js"],
    source: "https://github.com/Omkar-Bokan/HRMS",
    live: "http://localhost:5173/dashboard",
    thumbnail: "/projects/HRMS thumbnail.png",
  },
  {
    name: "Multi-Modal Transport Management System",
    tagline: "Seamless coordination across every mode of transport.",
    description: "A centralized logistics management system that connects multiple modes of transportation — road, rail, air, and sea. It enables route planning, shipment tracking, and cost optimization, improving coordination between different carriers and reducing delays.",
    stack: ["MongoDB", "Express", "React", "Node.js"],
    tags: ["#MongoDB", "#Express", "#React", "#Node.js"],
    source: "https://github.com/Omkar-Bokan/MTMS",
    live: "http://localhost:5173/bom",
    thumbnail: "/projects/MTMS thumbnail.png",
  },
]
