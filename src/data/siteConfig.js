const siteConfig = {
  company: {
    name: "Neon Industries",
    fullName: "Neon Industries Limited",
    tagline: "Building the Future",
    email: "info@neonindustriesltd.com",
    website: "https://neonindustriesltd.com",
  },

  navigation: [
    { label: "Divisions", href: "#divisions" },
    { label: "Projects", href: "#projects" },
    { label: "Vision", href: "#vision" },
    { label: "Contact", href: "#contact" },
  ],

  hero: {
    eyebrow: "Building what comes next",
    titleLine1: "Technology.",
    titleLine2: "Engineered forward.",
    copy: "Neon Industries is a multi-industry technology company building products, platforms and engineering systems across software, AI, business, logistics, energy, security and future technologies.",
    primaryButton: { label: "Explore our divisions", href: "#divisions" },
    secondaryButton: { label: "See what we're building", href: "#projects" },
    note: "Built for scalable impact across industries.",
  },

  divisionsSection: {
    kicker: "Neon ecosystem",
    title: "One company. Multiple frontiers.",
  },

  divisions: [
    { tag: "AI / Software", icon: "✦", name: "Neon Intelligence", description: "Artificial intelligence, software platforms, automation systems, digital infrastructure and intelligent products.", large: true },
    { tag: "Security", icon: "⬡", name: "NI Sentinel", description: "Security systems, monitoring platforms, public-safety technology and mission-critical digital infrastructure.", large: true },
    { tag: "Education", icon: "▦", name: "SchoolOS", description: "Integrated school operations software for academics, finance, staff management, enrollment and administration." },
    { tag: "Logistics", icon: "⇄", name: "LogisticsOS", description: "Digital operations infrastructure for logistics, fleet workflows, movement tracking, planning and business coordination." },
    { tag: "Energy / Power Systems", icon: "⚡", name: "Energy Infrastructure", description: "End-to-end energy and power infrastructure development — from consultancy, power-system studies and engineering design to renewable integration, grid analysis, monitoring, technical software and implementation support.", large: true },
    { tag: "Business Technology", icon: "▤", name: "NI Business", description: "Business software, operational systems and digital tools designed to improve management, workflows and organizational efficiency." },
    { tag: "Agriculture / Food Security", icon: "⌘", name: "NI AGT", description: "NI AGT combines commercial farming, food production and agritech, developing and operating agricultural ventures while using technology to improve productivity, monitoring, automation, resource efficiency and long-term food security." },
    { tag: "Space / Future", icon: "◉", name: "Orbital NI", description: "Long-term research and development in space systems, orbital technologies and next-generation engineering." },
  ],

  projectsSection: {
    kicker: "Featured system",
    title: "From idea to working infrastructure.",
    intro: "We focus on systems that solve operational problems, become dependable infrastructure, and scale into larger platforms.",
  },

  featuredProject: {
    pill: "Live product development",
    title: "SchoolOS",
    description: "A connected school management platform built to centralize academics, enrollment, finance, staff workflows, reporting, procurement and daily school operations.",
    points: ["Multi-campus", "Finance", "Academics", "Staff", "Analytics"],
  },

  stats: [
    { value: 8, suffix: "+", label: "Products & technology areas" },
    { value: 1, suffix: "+", label: "Core company vision" },
    { value: 100, suffix: "", label: "% product-first mindset" },
    { value: "∞", suffix: "", label: "Room to expand" },
  ],

  vision: {
    kicker: "Our direction",
    title: "Build the company that builds the future.",
    copy: "Neon Industries is designed around a simple principle: create useful technology, develop deep engineering capability, and expand into industries where intelligent systems can make a meaningful difference.",
    buttonLabel: "Connect with Neon Industries",
    buttonHref: "#contact",
  },

  contact: {
    kicker: "Work with us",
    title: "Ideas become products when engineering meets execution.",
    buttonLabel: "Start a conversation",
    email: "info@neonindustriesltd.com",
  },
};

export default siteConfig;
