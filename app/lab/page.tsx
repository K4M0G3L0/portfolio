import { Metadata } from "next";
import Link from "next/link";
import { Badge } from "@/components/ui/Badge";

export const metadata: Metadata = {
  title: "Lab",
  description: "Experiments, technical notes, and work in progress from the engineering lab.",
};

const LAB_ITEMS = [
  {
    id: "memory-architecture",
    type: "Research Note",
    title: "Memory Architecture for AI Agents",
    description: "Comparing in-process dict stores, PostgreSQL JSONB, and pgvector for agent memory. When to use each and why the retrieval pattern matters more than the storage backend.",
    tags: ["RAG", "Vector DB", "Agent Memory"],
    status: "published",
    date: "2026-06-20",
  },
  {
    id: "pppfa-scoring",
    type: "Algorithm",
    title: "PPPFA Preference Point Calculator",
    description: "Implementing South Africa's PPPFA 80/20 and 90/10 scoring systems in Python. Edge cases, BBBEE level mapping, and how to handle EME/QSE sworn affidavits.",
    tags: ["Procurement", "Python", "South Africa"],
    status: "published",
    date: "2026-06-15",
  },
  {
    id: "ceo-agent-routing",
    type: "Design Pattern",
    title: "CEO Agent Routing Pattern",
    description: "How the CEO Agent classifies intent and routes tasks to specialists. The routing map, fallback logic, and why sequential execution beats parallel for Day 4.",
    tags: ["Multi-Agent", "Architecture", "LLM"],
    status: "published",
    date: "2026-06-12",
  },
  {
    id: "jwt-refresh",
    type: "Code Snippet",
    title: "JWT Refresh Token Pattern",
    description: "The complete JWT access + refresh pattern — auto-rotation on 401, request queuing during refresh, and why bcrypt==4.0.1 needs to be pinned.",
    tags: ["Security", "FastAPI", "Authentication"],
    status: "published",
    date: "2026-06-08",
  },
  {
    id: "vector-similarity",
    type: "Benchmark",
    title: "TF-IDF Fallback vs Neural Embeddings",
    description: "Benchmarking our hash-based TF-IDF fallback against sentence-transformers/all-MiniLM-L6-v2. When does the fallback hold up and when does it break?",
    tags: ["NLP", "Embeddings", "Performance"],
    status: "draft",
    date: "2026-06-05",
  },
  {
    id: "luma-score-algorithm",
    type: "Algorithm",
    title: "LUMA Score Algorithm",
    description: "How the business health score is computed from 5 weighted dimensions: opportunity health, agent activity, compliance readiness, decision quality, and risk level.",
    tags: ["Dashboard", "Metrics", "Business Intelligence"],
    status: "published",
    date: "2026-06-23",
  },
];

export default function LabPage() {
  return (
    <div className="max-w-7xl mx-auto px-6 py-16">
      <div className="max-w-2xl mb-16">
        <Badge variant="cyan" className="mb-6">Lab</Badge>
        <h1 className="text-4xl md:text-5xl font-medium text-text-primary mb-4 leading-tight">
          Experiments and technical notes.
        </h1>
        <p className="text-text-secondary text-lg leading-relaxed">
          Smaller pieces from the engineering process.
          Algorithm designs, code patterns, research notes, and benchmarks —
          the thinking that doesn&apos;t fit in a full article.
        </p>
      </div>

      {/* Type legend */}
      <div className="flex flex-wrap gap-2 mb-10">
        {["Research Note", "Algorithm", "Design Pattern", "Code Snippet", "Benchmark"].map((type) => (
          <Badge key={type} variant="outline" size="sm">{type}</Badge>
        ))}
      </div>

      {/* Lab items */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {LAB_ITEMS.filter((i) => i.status === "published").map((item) => (
          <div
            key={item.id}
            className="group bg-base-800 border border-border rounded-xl p-6 hover:border-border-strong transition-all"
          >
            <div className="flex items-center justify-between mb-3">
              <Badge variant="cyan" size="sm">{item.type}</Badge>
              <span className="text-xs font-mono text-text-tertiary">{item.date}</span>
            </div>
            <h3 className="text-text-primary font-medium mb-2">{item.title}</h3>
            <p className="text-text-secondary text-sm leading-relaxed mb-4">{item.description}</p>
            <div className="flex flex-wrap gap-1.5">
              {item.tags.map((tag) => (
                <Badge key={tag} variant="default" size="sm">{tag}</Badge>
              ))}
            </div>
          </div>
        ))}
      </div>

      {/* Currently in lab */}
      <div className="mt-12 bg-base-800/50 border border-border rounded-xl p-6">
        <div className="flex items-center gap-2 mb-4">
          <span className="w-1.5 h-1.5 rounded-full bg-amber-400 animate-pulse" />
          <span className="text-xs font-mono text-amber-400 uppercase tracking-widest">In Progress</span>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {LAB_ITEMS.filter((i) => i.status === "draft").map((item) => (
            <div key={item.id} className="opacity-60">
              <div className="flex items-center gap-2 mb-1">
                <Badge variant="amber" size="sm">{item.type}</Badge>
                <span className="text-xs font-mono text-text-tertiary">Draft</span>
              </div>
              <h4 className="text-text-secondary text-sm font-medium">{item.title}</h4>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
