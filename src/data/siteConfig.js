const siteConfig = {
  company: {
    name: "Neon Industries",
    fullName: "Neon Industries Limited",
    tagline: "Building the Future",
    email: "info@neonindustriesltd.com",
    website: "https://neonindustriesltd.com",
  },

  navigation: [
    { label: "Projects", href: "#products" },
    { label: "Divisions", href: "#divisions" },
    { label: "Contact", href: "#contact" },
  ],

  hero: {
    eyebrow: "Neon Industries Limited",
    titleLine1: "Software that runs",
    titleLine2: "real institutions.",
    copy: "We build SchoolOS, the operating system for schools, and Neon Intelligence, an AI platform for any team. Then we take the same engineering into energy, security, logistics and agriculture.",
    primaryButton: { label: "See SchoolOS live", href: "#schoolos" },
    secondaryButton: { label: "Try Neon Intelligence", href: "#intelligence" },
  },

  heroProof: [
    { value: "30+", label: "SchoolOS screens across people, academics, finance and payroll" },
    { value: "2", label: "Flagship platforms, one integration layer" },
    { value: "8", label: "Divisions on the roadmap" },
  ],

  productsSection: {
    title: "Featured projects",
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
      tag: "AI platform",
      summary: "A general-purpose AI platform. Ask anything, work with documents and data, and connect it to the tools you already use.",
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
    title: "An AI platform that asks before it acts.",
    copy: "Neon Intelligence is a general-purpose AI platform for any organisation. Ask questions, analyse documents and spreadsheets, draft content, and connect it to the systems you already run. When it needs to change something, it shows you exactly what and waits for your approval.",
    points: [
      { title: "Connects to anything", text: "Plug in your own systems and APIs. Answers come from your data, with the source shown." },
      { title: "Documents and data", text: "Import files, query tables and draft reports, letters and messages in one workspace." },
      { title: "Approval-gated", text: "Every change is a reviewable proposal. Nothing is posted, sent or submitted until a person approves it." },
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
      description: "AI platforms, automation and intelligent software for organisations in any industry.",
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
    copy: "Whether it's SchoolOS for your school, Neon Intelligence for your team, or an engineering project, we'd like to hear from you.",
    buttonLabel: "Connect with us",
    email: "info@neonindustriesltd.com",
  },
};

export default siteConfig;
