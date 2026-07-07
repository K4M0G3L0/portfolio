export const SITE_CONFIG = {
  name: "Kamogelo Kgashane",
  title: "AI Solutions Architect · Technical Founder",
  description: "Building intelligent systems that help businesses think, decide, and operate smarter.",
  url: "https://kgashane.dev",
  github: "https://github.com/K4M0G3L0",
  email: "kgashanekamogelo@gmail.com",
  twitter: "@KMKgashane",
};

export const SKILLS = [
  { category: "AI Engineering", items: ["LLM Systems", "RAG Pipelines", "Multi-Agent Frameworks", "Vector Databases", "Prompt Engineering"] },
  { category: "Cloud & Infrastructure", items: ["AWS", "GCP", "Docker", "PostgreSQL", "FastAPI", "Vercel"] },
  { category: "Cybersecurity", items: ["RBAC", "JWT Auth", "Audit Trails", "POPIA Compliance", "Threat Modeling"] },
  { category: "Software Architecture", items: ["System Design", "API Design", "Microservices", "Event-Driven Systems", "Domain Modeling"] },
  { category: "Business Intelligence", items: ["Procurement Intelligence", "Tender Analysis", "PPPFA/BBBEE", "Financial Modeling", "Risk Assessment"] },
];

export const TECH_STACK = [
  { name: "Python", icon: "🐍", level: 90 },
  { name: "FastAPI", icon: "⚡", level: 88 },
  { name: "React / Next.js", icon: "⚛", level: 85 },
  { name: "TypeScript", icon: "📘", level: 80 },
  { name: "PostgreSQL", icon: "🐘", level: 82 },
  { name: "LLM / Claude API", icon: "🧠", level: 92 },
  { name: "Docker", icon: "🐳", level: 75 },
  { name: "Git / GitHub", icon: "🔀", level: 88 },
];

export const SYSTEMS = [
  {
    id: "luma-aios",
    name: "LUMA AIOS",
    tagline: "AI Operating System",
    description: "A multi-agent AI operating system for business intelligence, automation, and decision support. CEO Agent coordinates specialists across procurement, finance, logistics, and security.",
    status: "active",
    statusLabel: "Building Live",
    color: "#8B5CF6",
    tech: ["FastAPI", "React", "PostgreSQL", "Claude API", "RAG", "Vector DB"],
    github: "https://github.com/K4M0G3L0/luma-aios",
    metrics: { days: 8, commits: 32, modules: 9 },
  },
  {
    id: "bloomos",
    name: "BloomOS",
    tagline: "Opportunity Intelligence",
    description: "AI procurement intelligence for South African businesses. Scores tenders against company DNA, checks CIDB/BBBEE compliance, recommends bid decisions with confidence levels.",
    status: "active",
    statusLabel: "Module 5 Complete",
    color: "#10B981",
    tech: ["Procurement AI", "PPPFA Scoring", "Document RAG", "Compliance Engine"],
    github: "https://github.com/K4M0G3L0/luma-aios",
    metrics: { score: 91, decisions: "STRONG_BID", compliance: "78%" },
  },
  {
    id: "flowlink",
    name: "Flowlink",
    tagline: "Execution Intelligence",
    description: "Event-driven execution layer. TenderWon event activates project workspace, auto-generates milestones, coordinates suppliers, records SHA-256 tamper-evident delivery proofs, and monitors cashflow gaps.",
    status: "active",
    statusLabel: "Day 8 Complete",
    color: "#06B6D4",
    tech: ["Event Bus", "SHA-256 Proof", "Supplier Coordination", "Cashflow Tracking", "Risk Monitor"],
    github: "https://github.com/K4M0G3L0/luma-aios",
    metrics: { tests: "8/8", events: "TenderWon", hashing: "SHA-256" },
  },
  {
    id: "buildos",
    name: "BuildOS",
    tagline: "Construction Intelligence",
    description: "AI system for the South African construction sector. Project scheduling, contractor management, CIDB compliance tracking, and construction risk assessment.",
    status: "planned",
    statusLabel: "Roadmap",
    color: "#F59E0B",
    tech: ["Construction AI", "CIDB Integration", "Risk Modeling", "Project Intelligence"],
  },
  {
    id: "trading-intelligence",
    name: "Trading Intelligence",
    tagline: "Market Structure Analysis",
    description: "AI trading analysis system with two-gate architecture: MarketStructureEngine for trend classification and IndicationEngine for swing level break detection.",
    status: "complete",
    statusLabel: "Shipped",
    color: "#EF4444",
    tech: ["FastAPI", "SQLAlchemy", "Technical Analysis", "AI Explainer"],
    github: "https://github.com/K4M0G3L0/AI-Trading-Intelligence-System",
  },
];

export const BUILD_TIMELINE = [
  { day: 1, module: "Core Architecture", status: "complete", description: "Backend API, frontend foundation, database structure, authentication" },
  { day: 2, module: "Business DNA Engine", status: "complete", description: "Organizations, company profiles, user management, capabilities" },
  { day: 3, module: "Memory Core", status: "complete", description: "Structured memory, vector embeddings, document RAG, retrieval engine" },
  { day: 4, module: "Multi-Agent Framework", status: "complete", description: "CEO Agent + Procurement, Finance, Logistics, Security specialists" },
  { day: 5, module: "BloomOS Intelligence", status: "complete", description: "Tender analysis, opportunity scoring, bid decisions, compliance" },
  { day: 6, module: "Command Center", status: "complete", description: "Dashboard, LUMA Score, agent monitoring, AI insights" },
  { day: 6, module: "Transparency Engine", status: "complete", description: "Decision Passports, evidence tracing, confidence scoring, human review" },
  { day: 7, module: "Action Intelligence Engine", status: "complete", description: "Proactive events, priority scoring, smart notifications, escalation" },
  { day: 8, module: "Flowlink — Execution Intelligence", status: "complete", description: "Event-driven architecture: TenderWon event bus, project activation, SHA-256 proof-of-service, cashflow tracking, risk monitor — 8/8 tests passing" },
  { day: 9, module: "MoneyOS", status: "building", description: "Invoice intelligence, cashflow forecasting, financial risk alerts, margin tracking" },
  { day: 21, module: "BuildOS", status: "planned", description: "Construction project intelligence, CIDB compliance tracking" },
  { day: 30, module: "Security Intelligence", status: "planned", description: "Fraud detection, supplier verification, audit trails" },
  { day: 60, module: "Cloud Deployment", status: "planned", description: "AWS/GCP production deployment, monitoring, scaling" },
  { day: 90, module: "Platform Launch", status: "planned", description: "Public beta, onboarding, documentation, go-to-market" },
];

export const STORY_ARC = [
  {
    era: "Operations",
    period: "2019-2021",
    title: "Culinary Operations",
    description: "Worked in culinary operations. Learned that every kitchen runs on systems - mise en place, timing, coordination. A service failure is always a process failure in disguise.",
    icon: "🍳",
    insight: "Every kitchen is a system. Every service failure is a process gap.",
  },
  {
    era: "Engineering",
    period: "2024-2025",
    title: "Software Engineering - NQF Level 6",
    description: "Completed a Software Engineering qualification at NQF Level 6. Built backend systems, APIs, and databases. Started seeing code as a tool for designing processes - not just writing programs.",
    icon: "💻",
    insight: "Software is policy encoded in logic.",
  },
  {
    era: "Intelligence",
    period: "2026-Present",
    title: "AI Systems Architecture",
    description: "Building LUMA AIOS - an AI operating system where intelligent agents handle procurement intelligence, logistics coordination, financial analysis, and risk assessment for real businesses.",
    icon: "🧠",
    insight: "AI agents are the first technology that can hold context, make decisions, and act - like a department, not just a tool.",
  },
];

export const SERVICES = [
  {
    id: "ai-strategy",
    title: "AI Strategy & Architecture",
    description: "Map your business processes to AI opportunities. Design systems that create lasting competitive advantage - not demos.",
    deliverables: ["AI readiness assessment", "System architecture", "Implementation roadmap", "ROI modeling"],
    icon: "🧭",
  },
  {
    id: "rag-systems",
    title: "RAG & Knowledge Systems",
    description: "Build document intelligence that actually retrieves the right information. From procurement documents to contracts to compliance records.",
    deliverables: ["Document pipeline", "Vector storage", "Retrieval optimization", "Context assembly"],
    icon: "📚",
  },
  {
    id: "ai-agents",
    title: "Custom AI Agent Systems",
    description: "Design specialist AI agents that collaborate. Procurement agents, finance agents, logistics agents - all coordinated by an orchestrating CEO agent.",
    deliverables: ["Agent architecture", "Memory systems", "Tool integration", "Decision logging"],
    icon: "🤖",
  },
  {
    id: "automation",
    title: "Business Intelligence Automation",
    description: "Turn your business processes into AI workflows. Tender analysis, supplier vetting, invoice processing, compliance checking.",
    deliverables: ["Process mapping", "AI workflow design", "Integration", "Monitoring dashboard"],
    icon: "⚡",
  },
];
