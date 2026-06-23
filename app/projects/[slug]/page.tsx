import { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { SYSTEMS } from "@/lib/data";
import { Badge } from "@/components/ui/Badge";

interface Props {
  params: { slug: string };
}

const PROJECT_DETAILS: Record<string, {
  problem: string;
  industry: string;
  why: string;
  architecture: string[];
  businessValue: string[];
  lessons: string[];
  metrics?: { label: string; value: string }[];
}> = {
  "luma-aios": {
    problem: "South African SMEs operate with fragmented intelligence. Procurement decisions take days of manual research. Compliance checks are done by memory. Tender eligibility is guessed. Finance, logistics, and risk are evaluated separately, slowly, and inconsistently.",
    industry: "GovTech · Construction · Business Intelligence",
    why: "Businesses that can analyze faster and decide with more context win more work and avoid costly mistakes. An AI operating system that coordinates specialist agents gives SMEs the intelligence capacity of a much larger organization.",
    architecture: [
      "CEO Agent receives any natural language business request and classifies intent",
      "Routes tasks to specialist agents: Procurement, Finance, Logistics, Security",
      "Each agent retrieves relevant company memory from the Memory Core (structured facts + vector RAG)",
      "Agents reason using Claude API with domain-specific prompts and business context",
      "CEO Agent synthesizes specialist reports into a single executive recommendation",
      "All decisions are saved back to memory for future agent retrieval",
      "Command Center dashboard shows LUMA Score, agent status, activity feed, and AI insights",
    ],
    businessValue: [
      "Tender analysis reduced from 4-6 hours to under 90 seconds",
      "CIDB, BBBEE, and compliance checks automated with audit trail",
      "BloomOS surfaces high-match opportunities companies would have missed",
      "Agents coordinate across departments — procurement, finance, logistics — simultaneously",
      "Every AI decision is logged, explainable, and retrievable for future context",
    ],
    lessons: [
      "Memory architecture matters more than model choice — context-aware agents outperform generic ones",
      "Sequential agent execution is more debuggable than parallel for Day 1; optimize later",
      "The CEO Agent routing pattern scales cleanly — adding a new specialist requires no changes to existing agents",
      "Storing decisions back to memory closes the intelligence loop and improves future answers",
    ],
    metrics: [
      { label: "Build Days", value: "6 / 90" },
      { label: "API Routes", value: "53" },
      { label: "AI Agents", value: "5" },
      { label: "DB Tables", value: "18+" },
    ],
  },
  "bloomos": {
    problem: "Construction companies regularly lose tenders they are qualified to win. The reasons are operational — wrong CIDB grade interpretation, BBBEE miscalculation, missing documents, or simply not seeing the opportunity in time.",
    industry: "Construction · Government Procurement · South Africa",
    why: "South African public procurement is R800B+ annually. The regulatory complexity (PPPFA, BBBEE, CIDB, CSD) creates a compliance barrier that favors larger firms with dedicated procurement teams. BloomOS levels the playing field.",
    architecture: [
      "Requirement Extractor parses tender documents (PDF/TXT) using LLM to extract CIDB, BBBEE, scope, mandatory documents",
      "Opportunity Scorer compares tender requirements against company DNA in structured memory",
      "Scoring dimensions: CIDB match (30%), BBBEE advantage (20%), experience (25%), location (10%), compliance (15%)",
      "Bid Decision Engine produces STRONG_BID / CONSIDER / PARTNER_REQUIRED / DO_NOT_BID with confidence",
      "Compliance Checker assesses submission readiness and lists missing documents",
      "Proposal Assistant drafts bid sections using company memory and tender context",
    ],
    businessValue: [
      "Opportunity scoring in seconds vs hours of manual eligibility checking",
      "PPPFA preference point calculation automated and documented",
      "Submission readiness score prevents disqualification from missing documents",
      "Companies discover high-match tenders they would have skipped",
    ],
    lessons: [
      "The CIDB grading system has nuances that require careful rule encoding",
      "Confidence scores are more useful than binary recommendations",
      "Compliance checking prevents the most avoidable bid failures",
    ],
    metrics: [
      { label: "Opportunity Score", value: "91%" },
      { label: "Decision", value: "STRONG BID" },
      { label: "Compliance", value: "78%" },
      { label: "Analysis Time", value: "< 90s" },
    ],
  },
  "flowlink": {
    problem: "After winning a tender, execution becomes the risk. Supplier coordination is manual, proof of service is paper-based, and cashflow management against government payment timelines is guesswork.",
    industry: "Logistics · Supply Chain · Construction",
    why: "The gap between winning a bid and successfully completing a project is where most construction SMEs fail. Flowlink closes that gap with AI-coordinated execution intelligence.",
    architecture: [
      "Receives handoff from BloomOS when a tender bid is marked Won",
      "Creates supplier coordination tasks based on tender scope",
      "Tracks proof of service with SHA-256 document hashing for tamper-evident records",
      "Monitors project cashflow against tender payment milestone schedule",
      "Logistics Agent evaluates execution capacity before project commitment",
    ],
    businessValue: [
      "Supplier coordination time reduced significantly",
      "Tamper-evident proof of service protects against disputes",
      "Cashflow warnings before payment delays become crises",
    ],
    lessons: [
      "The handoff from procurement to execution is where most value is lost",
      "Hash-based proof of service is simple to implement and legally significant",
    ],
    metrics: [
      { label: "Status", value: "Building" },
      { label: "Day", value: "7 / 90" },
    ],
  },
  "trading-intelligence": {
    problem: "Retail traders lack the analytical infrastructure to consistently identify high-probability setups. Manual chart reading is slow, inconsistent, and emotional.",
    industry: "FinTech · Trading · Market Analysis",
    why: "Systematic, rules-based analysis removes emotional decision-making from trading. An AI layer that explains its reasoning helps traders understand and trust the signals.",
    architecture: [
      "MarketStructureEngine classifies trend direction using swing high/low analysis",
      "IndicationEngine detects swing level breaks as entry signals",
      "Two-gate architecture: both engines must agree before generating a signal",
      "AI Explainer module generates natural language reasoning for each signal",
      "FastAPI backend with SQLAlchemy persistence and Pydantic validation",
    ],
    businessValue: [
      "Consistent, rules-based signal generation removes emotional bias",
      "AI explainer makes reasoning transparent and educational",
      "Two-gate architecture reduces false positives significantly",
    ],
    lessons: [
      "Two-gate confirmation significantly reduces false signals",
      "Explainability is as important as accuracy for trader adoption",
      "Market structure classification must handle edge cases carefully",
    ],
    metrics: [
      { label: "Status", value: "Shipped" },
      { label: "Architecture", value: "Two-Gate" },
      { label: "Stack", value: "FastAPI + AI" },
    ],
  },
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const system = SYSTEMS.find((s) => s.id === params.slug);
  if (!system) return { title: "Project Not Found" };
  return {
    title: `${system.name} — Case Study`,
    description: system.description,
  };
}

export default function ProjectPage({ params }: Props) {
  const system = SYSTEMS.find((s) => s.id === params.slug);
  const details = PROJECT_DETAILS[params.slug];

  if (!system || !details) notFound();

  return (
    <div className="max-w-4xl mx-auto px-6 py-16">
      <Link href="/projects" className="text-text-tertiary hover:text-text-primary text-sm transition-colors mb-8 block">
        ← All projects
      </Link>

      <div className="mb-12">
        <div className="flex items-center gap-3 mb-4">
          <Badge
            variant={
              system.status === "complete" ? "emerald" :
              system.status === "active" ? "violet" :
              system.status === "building" ? "cyan" : "default"
            }
          >
            {system.statusLabel}
          </Badge>
          <span className="text-text-tertiary text-sm font-mono">{details.industry}</span>
        </div>
        <h1 className="text-4xl md:text-5xl font-medium text-text-primary mb-3 leading-tight">
          {system.name}
        </h1>
        <p className="text-text-secondary text-xl">{system.tagline}</p>
      </div>

      {details.metrics && (
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-12">
          {details.metrics.map((m) => (
            <div key={m.label} className="bg-base-800 border border-border rounded-lg p-4">
              <div className="text-xs font-mono text-text-tertiary mb-1">{m.label}</div>
              <div className="text-text-primary font-medium">{m.value}</div>
            </div>
          ))}
        </div>
      )}

      <section className="mb-10">
        <div className="text-xs font-mono text-accent-violet uppercase tracking-widest mb-3">The Problem</div>
        <p className="text-text-secondary leading-relaxed text-lg">{details.problem}</p>
      </section>

      <section className="mb-10">
        <div className="text-xs font-mono text-accent-violet uppercase tracking-widest mb-3">Why It Matters</div>
        <p className="text-text-secondary leading-relaxed">{details.why}</p>
      </section>

      <section className="mb-10">
        <div className="text-xs font-mono text-accent-violet uppercase tracking-widest mb-4">Architecture</div>
        <div className="bg-base-800 border border-border rounded-xl p-6 space-y-3">
          {details.architecture.map((step, i) => (
            <div key={i} className="flex gap-4">
              <span className="text-accent-violet font-mono text-sm flex-shrink-0 mt-0.5">{String(i + 1).padStart(2, "0")}</span>
              <p className="text-text-secondary text-sm leading-relaxed">{step}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="mb-10">
        <div className="text-xs font-mono text-accent-violet uppercase tracking-widest mb-4">Technology</div>
        <div className="flex flex-wrap gap-2">
          {system.tech?.map((t) => (
            <Badge key={t} variant="default">{t}</Badge>
          ))}
        </div>
      </section>

      <section className="mb-10">
        <div className="text-xs font-mono text-accent-violet uppercase tracking-widest mb-4">Business Value</div>
        <ul className="space-y-3">
          {details.businessValue.map((v, i) => (
            <li key={i} className="flex gap-3 text-text-secondary text-sm leading-relaxed">
              <span className="text-emerald-400 flex-shrink-0">✓</span>
              {v}
            </li>
          ))}
        </ul>
      </section>

      <section className="mb-12">
        <div className="text-xs font-mono text-accent-violet uppercase tracking-widest mb-4">Lessons Learned</div>
        <ul className="space-y-3">
          {details.lessons.map((l, i) => (
            <li key={i} className="flex gap-3 text-text-secondary text-sm leading-relaxed">
              <span className="text-accent-violet flex-shrink-0">→</span>
              {l}
            </li>
          ))}
        </ul>
      </section>

      {system.github && (
        <div className="border-t border-border pt-8">
          
            href={system.github}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 bg-base-800 border border-border text-text-primary px-5 py-2.5 rounded-lg text-sm hover:border-border-strong transition-colors"
          >
            View source on GitHub →
          </a>
        </div>
      )}
    </div>
  );
}

export function generateStaticParams() {
  return SYSTEMS.map((s) => ({ slug: s.id }));
}