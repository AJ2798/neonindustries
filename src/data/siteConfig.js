const siteConfig = {
  company: {
    name: "Neon Industries",
    fullName: "Neon Industries Limited",
    tagline: "Building the Future.",
    email: "info@neonindustriesltd.com",
    website: "https://www.neonindustriesltd.com",
    websiteLabel: "www.neonindustriesltd.com",
    country: "Zambia",
  },

  navigation: [
    { label: "Projects", href: "/#projects" },
    { label: "Divisions", href: "/#divisions" },
    { label: "About", href: "/about" },
    { label: "Contact", href: "/#contact" },
  ],

  hero: {
    eyebrow: "Technology & innovation · Zambia",
    titleLine1: "Building",
    titleLine2: "the future.",
    copy: "Neon Industries builds intelligent, practical software for schools, businesses and institutions, starting with SchoolOS and Neon Intelligence and extending into security, energy and agriculture.",
    primaryButton: { label: "See our projects", href: "#projects" },
    secondaryButton: { label: "About the company", href: "/about" },
  },

  sectors: ["Artificial intelligence", "Education", "Enterprise software", "Public safety", "Energy", "Agriculture", "Logistics", "Space systems"],

  productsSection: {
    index: "01",
    kicker: "Projects",
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
    copy: "Every role sees the numbers it is allowed to see: enrollment, attendance, collections, payroll and spending, with approvals routed by policy and every action written to the audit log.",
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
    copy: "Neon Intelligence is a general-purpose AI platform for any organization. Ask questions, analyze documents and spreadsheets, draft content, and connect it to the systems you already run. When it needs to change something, it shows you exactly what and waits for your approval.",
    points: [
      { title: "Connects to anything", text: "Plug in your own systems and APIs. Answers come from your data, with the source shown." },
      { title: "Documents and data", text: "Import files, query tables and draft reports, letters and messages in one workspace." },
      { title: "Approval-gated", text: "Every change is a reviewable proposal. Nothing is posted, sent or submitted until a person approves it." },
    ],
  },

  divisionsSection: {
    index: "02",
    kicker: "Divisions",
    title: "One company. Multiple frontiers.",
    intro: "The platforms come first. The same engineering discipline extends into the industries below.",
  },

  divisions: [
    { tag: "AI / Software", name: "Neon Intelligence", status: "Building", description: "AI platforms, automation and intelligent software for organizations in any industry." },
    { tag: "Education", name: "SchoolOS", status: "Building", description: "Integrated school operations for academics, finance, staff, enrollment and administration." },
    { tag: "Business Technology", name: "NI Business", status: "Building", description: "HR, payroll, procurement, invoicing, inventory, assets, approvals and reporting for organizations of any size." },
    { tag: "Security", name: "NI Sentinel", status: "R&D", description: "National security, public safety, monitoring platforms and institutional accountability." },
    { tag: "Logistics", name: "LogisticsOS", status: "Planned", description: "Fleet workflows, movement tracking, planning and coordination for logistics operators." },
    { tag: "Agriculture", name: "NI AGT", status: "Planned", description: "Commercial farming and agritech: monitoring, automation and resource efficiency for long-term food security." },
    { tag: "Energy", name: "Energy Infrastructure", status: "Consulting", description: "Power-system studies and engineering design, renewable integration, grid analysis and technical software." },
    { tag: "Space / Future", name: "Orbital NI", status: "Long-term", description: "Research into space systems, orbital technologies and next-generation engineering." },
  ],

  aboutTeaser: {
    index: "03",
    kicker: "About",
    title: "A Zambian company, building with global relevance.",
    copy: "Neon Industries was founded on innovation, integrity and continuous improvement. We build technology that is locally relevant, internationally competitive and adaptable to diverse environments.",
    link: { label: "Read about us", href: "/about" },
  },

  contact: {
    kicker: "Work with us",
    title: "Let's build something meaningful.",
    copy: "Whether it's SchoolOS for your school, Neon Intelligence for your team, or an engineering project, we'd like to hear from you.",
    buttonLabel: "Connect with us",
    email: "info@neonindustriesltd.com",
  },

  about: {
    title: "About Neon Industries",
    tagline: "Building the Future.",
    lede: "A Zambian technology and innovation company developing intelligent, practical and scalable solutions for individuals, businesses and institutions.",

    whoWeAre: [
      "Neon Industries Limited is a Zambian technology and innovation company dedicated to developing intelligent, practical and scalable solutions that transform how individuals, businesses and institutions operate. Our work spans national security and public safety, education, enterprise operations, energy and agriculture: sectors where dependable technology has a direct effect on people's lives.",
      "We believe technology should do more than simplify tasks. It should create opportunities, solve meaningful problems, improve efficiency, and empower people to achieve more.",
      "Through software engineering, artificial intelligence, digital infrastructure and innovative technology solutions, we are building an ecosystem of products and services designed to address real-world challenges across multiple industries.",
      "Our ambition extends beyond developing applications. We are building technologies that connect people, information and systems, enabling organizations to make better decisions, streamline operations and prepare for an increasingly digital future.",
      "Founded on the principles of innovation, integrity and continuous improvement, Neon Industries is committed to contributing to Africa's technological advancement while developing solutions with global relevance.",
    ],

    vision: "To become a leading technology and innovation company, creating intelligent solutions that empower industries, transform communities, and shape a more connected and sustainable future.",
    mission: "To design, develop and deliver innovative, accessible and reliable technology solutions that solve real-world challenges, improve operational efficiency, and enable individuals and organizations to thrive in a rapidly evolving digital world.",

    whatWeDoIntro: "We bring together technology, engineering and intelligent systems to create solutions that address the evolving needs of modern society. Our work spans five strategic areas.",
    areas: [
      {
        title: "Artificial Intelligence & Intelligent Systems",
        products: ["Neon Intelligence"],
        text: [
          "We develop AI-powered platforms that help individuals and organizations interact with information, automate workflows, analyze data and make informed decisions.",
          "Through Neon Intelligence, we are working toward a future where artificial intelligence becomes an accessible and integrated part of everyday work.",
        ],
      },
      {
        title: "Enterprise Software & Digital Transformation",
        products: ["SchoolOS", "NI Business"],
        text: [
          "We design scalable digital platforms that help organizations manage operations, finances, people and resources more effectively.",
          "Our solutions include SchoolOS, an integrated school management platform, and NI Business, a modular business management ecosystem designed to support organizations as they grow.",
        ],
      },
      {
        title: "Public Safety & Digital Infrastructure",
        products: ["NI Sentinel"],
        text: [
          "Through NI Sentinel, we explore and develop technology that supports national security, public safety, operational accountability and more effective institutional management.",
          "Our work includes digital platforms designed to modernize processes, improve access to information and strengthen operational coordination.",
        ],
      },
      {
        title: "Energy & Engineering Technology",
        products: ["Energy Infrastructure"],
        text: [
          "Reliable, efficient and sustainable energy infrastructure is critical to economic development.",
          "Our energy initiatives apply engineering expertise, intelligent analysis and digital innovation to challenges in electrical power systems, energy infrastructure and emerging technologies.",
        ],
      },
      {
        title: "Agriculture & Emerging Technologies",
        products: ["NI AGT"],
        text: [
          "We are exploring technology-driven solutions that improve productivity, accessibility and decision-making in agriculture and other essential industries.",
          "Through initiatives such as NI AGT, our long-term ambition is to contribute to more efficient, resilient and technologically empowered industries.",
        ],
      },
    ],

    approach: {
      title: "Innovation with purpose.",
      text: "Meaningful innovation begins with understanding real problems. Our approach combines practical problem-solving, modern engineering principles and a commitment to continuous development. We prioritize solutions that are:",
      principles: [
        { title: "Practical", text: "Designed to address genuine operational and societal challenges." },
        { title: "Scalable", text: "Built to evolve alongside the needs of users and organizations." },
        { title: "Accessible", text: "Developed with usability, affordability and real-world adoption in mind." },
        { title: "Reliable", text: "Grounded in sound engineering, security and responsible technology practices." },
        { title: "Future-ready", text: "Designed to adapt to technological advancement and changing industry demands." },
      ],
    },

    values: [
      { title: "Innovation", text: "We challenge conventional thinking and continuously explore better ways of solving problems." },
      { title: "Integrity", text: "We value transparency, accountability and responsible business practices." },
      { title: "Excellence", text: "We pursue quality in our products, services and professional relationships." },
      { title: "Collaboration", text: "Meaningful progress is achieved through shared knowledge, partnerships and teamwork." },
      { title: "Impact", text: "We measure success not only by the technologies we develop, but by the positive difference they make." },
    ],

    story: [
      "Neon Industries was born from a vision to create technology that addresses real challenges while opening new possibilities for businesses, institutions and communities.",
      "What began as an ambition to develop practical digital solutions has grown into a broader commitment to building an interconnected ecosystem of intelligent technologies.",
      "As a Zambian-founded company, we understand the opportunities and challenges of developing markets. This perspective inspires us to build solutions that are locally relevant, internationally competitive and adaptable to diverse environments.",
      "We are still at the beginning of our journey, but our direction is clear: to build a company where innovation is purposeful, technology is accessible, and every solution contributes toward a better future.",
    ],

    lookingAhead: [
      "The future of technology will be shaped by intelligent systems, interconnected platforms, sustainable infrastructure, and the ability to turn information into meaningful action. At Neon Industries, we aim to be part of shaping that future.",
      "We are investing in an ecosystem where our technologies work together, empowering individuals and organizations to operate more intelligently, efficiently and confidently.",
      "Our journey is driven by curiosity, strengthened by collaboration, and guided by the belief that great innovations can emerge from anywhere.",
    ],
    closingLine: "From Zambia to the world, we are building the future.",

    cta: {
      title: "Let's build something meaningful.",
      text: "Whether you are an organization seeking digital transformation, an institution looking to modernize operations, or a potential partner interested in innovation, we welcome opportunities to collaborate.",
      email: "info@neonindustriesltd.com",
    },
  },
};

export default siteConfig;
