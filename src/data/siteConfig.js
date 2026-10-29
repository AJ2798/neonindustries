const siteConfig = {
  company: {
    name: "Neon Industries",
    fullName: "Neon Industries Limited",
    tagline: "Building the Future",
    email: "info@neonindustriesltd.com",
    website: "https://neonindustriesltd.com",
  },

  navigation: [
    { label: "Products", href: "#products" },
    { label: "SchoolOS", href: "#schoolos" },
    { label: "Neon Intelligence", href: "#intelligence" },
    { label: "Divisions", href: "#divisions" },
    { label: "Contact", href: "#contact" },
  ],

  hero: {
    eyebrow: "Neon Industries Limited",
    titleLine1: "Software that runs",
    titleLine2: "real institutions.",
    copy: "We build operating systems for schools and businesses, and an AI workspace that can act on them safely. Then we take the same engineering into energy, security, logistics and agriculture.",
    primaryButton: { label: "See SchoolOS live", href: "#schoolos" },
    secondaryButton: { label: "Try Neon Intelligence", href: "#intelligence" },
  },

  heroProof: [
    { value: "30+", label: "SchoolOS screens across people, academics, finance and payroll" },
    { value: "2", label: "Flagship platforms, one integration layer" },
    { value: "8", label: "Divisions on the roadmap" },
  ],

  productsSection: {
    kicker: "Flagship platforms",
    title: "Two products. One connected stack.",
    intro: "SchoolOS is the system of record. Neon Intelligence is the assistant that reads it, prepares the work and waits for your approval before anything changes.",
  },

  products: [
    {
      id: "schoolos",
      name: "SchoolOS",
      tag: "Education operations",
      summary: "Students, academics, fees, payroll, procurement and approvals for single schools and multi-campus groups.",
      href: "#schoolos",
    },
    {
      id: "intelligence",
      name: "Neon Intelligence",
      tag: "AI workspace",
      summary: "Ask in plain language. It queries your connected systems, drafts the change, and shows exactly what will be written.",
      href: "#intelligence",
    },
  ],

  schoolos: {
    kicker: "SchoolOS",
    title: "The whole school, on one dashboard.",
    copy: "Every role sees the numbers it is allowed to see: enrolment, attendance, collections, payroll and spending, with approvals routed by policy and every action written to the audit log.",
    features: [
      { title: "Academics", text: "Classes, timetables, attendance, flexible assessment weighting and promotions." },
      { title: "Finance", text: "Fee structures, invoices, payments with proof, refunds and financial account ledgers." },
      { title: "Procurement", text: "Purchase requests to RFQs, quotations, orders, goods receipts and inventory." },
      { title: "Payroll", text: "Salary profiles, payroll runs, payslips and approval ownership." },
      { title: "Control", text: "Roles and permissions, approval policies, MFA and a full audit log." },
      { title: "Multi-campus", text: "Departments, subjects and timetables scoped to each campus." },
    ],
  },

  intelligence: {
    kicker: "Neon Intelligence",
    title: "An assistant that asks before it acts.",
    copy: "Neon Intelligence connects to SchoolOS and NI Business. It answers with live figures, prepares payments, payroll and reminders as reviewable proposals, and only commits after a fresh approval code.",
    points: [
      { title: "Grounded answers", text: "Figures come from the connected system, with the query shown." },
      { title: "Proposals, not surprises", text: "Every change is a snapshot with a before-and-after diff." },
      { title: "Approval-gated", text: "Nothing is posted, sent or submitted until a person approves it." },
    ],
  },

  divisionsSection: {
    kicker: "Neon ecosystem",
    title: "One company. Multiple frontiers.",
    intro: "The platforms come first. The same engineering discipline extends into the industries below.",
  },

  divisions: [
    {
      tag: "AI / Software",
      name: "Neon Intelligence",
      status: "Building",
      description: "AI, software platforms, automation and the assistant layer that connects every Neon product.",
    },
    {
      tag: "Education",
      name: "SchoolOS",
      status: "Building",
      description: "Integrated school operations for academics, finance, staff, enrolment and administration.",
    },
    {
      tag: "Business Technology",
      name: "NI Business",
      status: "Building",
      description: "HR, payroll, procurement, invoicing, inventory, assets, approvals and reporting for organisations of any size.",
    },
    {
      tag: "Security",
      name: "NI Sentinel",
      status: "R&D",
      description: "Security systems, monitoring platforms, vision and public-safety technology.",
    },
    {
      tag: "Logistics",
      name: "LogisticsOS",
      status: "Planned",
      description: "Fleet workflows, movement tracking, planning and coordination for logistics operators.",
    },
    {
      tag: "Agriculture",
      name: "NI AGT",
      status: "Planned",
      description: "Commercial farming and agritech: monitoring, automation and resource efficiency for long-term food security.",
    },
    {
      tag: "Energy",
      name: "Energy Infrastructure",
      status: "Consulting",
      description: "Power-system studies and engineering design, renewable integration, grid analysis and technical software.",
    },
    {
      tag: "Space / Future",
      name: "Orbital NI",
      status: "Long-term",
      description: "Research into space systems, orbital technologies and next-generation engineering.",
    },
  ],

  vision: {
    kicker: "Our direction",
    title: "Build the company that builds the future.",
    copy: "Create useful technology, develop deep engineering capability, and expand into industries where intelligent systems make a measurable difference.",
  },

  contact: {
    kicker: "Work with us",
    title: "Run your school or business on Neon.",
    copy: "Book a walkthrough of SchoolOS, pilot Neon Intelligence with your team, or talk to us about an engineering project.",
    buttonLabel: "Start a conversation",
    email: "info@neonindustriesltd.com",
  },
};

export default siteConfig;
