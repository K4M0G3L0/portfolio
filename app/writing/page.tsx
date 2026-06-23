import { Metadata } from "next";
import Link from "next/link";
import { Badge } from "@/components/ui/Badge";

export const metadata: Metadata = {
  title: "Technical Writing",
  description: "Engineering articles on AI systems, RAG pipelines, agent architectures, and business intelligence.",
};

const CATEGORIES = ["AI Engineering", "AI Agents", "Cloud Architecture", "Cybersecurity", "Business Automation", "ConTech", "FinTech"];

const ARTICLES = [
  {
    slug: "why-businesses-need-ai-agents",
    title: "Why Businesses Need AI Agents, Not Chatbots",
    description: "Chatbots answer questions. Agents take action. The difference is architecture — and it determines whether AI creates real business value or just impressive demos.",
    category: "AI Agents",
    date: "20 Jun 2026",
    readingTime: "8 min read",
    featured: true,
  },
  {
    slug: "building-ai-operating-system",
    title: "Building an AI Operating System from Scratch",
    description: "What happens when you take the concept of an operating system and apply it to AI? You get a coordination layer where agents, memory, and tools work together like departments in a company.",
    category: "AI Engineering",
    date: "18 Jun 2026",
    readingTime: "12 min read",
    featured: true,
  },
  {
    slug: "how-rag-gives-businesses-memory",
    title: "How RAG Gives Businesses Memory",
    description: "An AI without context is just autocomplete. RAG is how you give an AI system the ability to remember what your company knows — and retrieve it precisely when needed.",
    category: "AI Engineering",
    date: "15 Jun 2026",
    readingTime: "10 min read",
    featured: false,
  },
  {
    slug: "ai-in-south-african-procurement",
    title: "AI in Construction Procurement",
    description: "South African construction companies lose tenders they could win. CIDB grading confusion, BBBEE miscalculations, missing documents — all solvable with the right AI layer.",
    category: "ConTech",
    date: "10 Jun 2026",
    readingTime: "9 min read",
    featured: false,
  },
  {
    slug: "multi-agent-systems-design",
    title: "Designing Multi-Agent AI Systems",
    description: "When one AI agent is not enough. How to design specialist agents that collaborate — and why the orchestration layer matters more than any individual agent.",
    category: "AI Agents",
    date: "5 Jun 2026",
    readingTime: "11 min read",
    featured: false,
  },
  {
    slug: "cidb-bbbee-compliance-intelligence",
    title: "PPPFA, BBBEE, CIDB — Building Procurement Intelligence",
    description: "The regulatory complexity of South African public procurement is a solved problem — if you encode the rules correctly. Here is how BloomOS does it.",
    category: "Business Automation",
    date: "1 Jun 2026",
    readingTime: "7 min read",
    featured: false,
  },
];

export default function WritingPage() {
  const featured = ARTICLES.filter((a) => a.featured);
  const rest = ARTICLES.filter((a) => !a.featured);

  return (
    <div className="max-w-7xl mx-auto px-6 py-16">
      <div className="max-w-2xl mb-16">
        <Badge variant="violet" className="mb-6">Technical Writing</Badge>
        <h1 className="text-4xl md:text-5xl font-medium text-text-primary mb-4 leading-tight">
          Engineering articles and research.
        </h1>
        <p className="text-text-secondary text-lg leading-relaxed">
          Writing that explains the thinking behind the systems I build.
          Every article starts with a problem, works through the architecture, and ends with the business impact.
        </p>
      </div>

      <div className="flex flex-wrap gap-2 mb-12">
        <Badge variant="violet">All</Badge>
        {CATEGORIES.map((cat) => (
          <Badge key={cat} variant="outline">{cat}</Badge>
        ))}
      </div>

      {featured.length > 0 && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
          {featured.map((article) => (
            <Link
              key={article.slug}
              href={`/writing/${article.slug}`}
              className="group bg-base-800 border border-border rounded-xl p-6 hover:border-border-accent transition-all"
            >
              <div className="flex items-center justify-between mb-4">
                <Badge variant="violet" size="sm">{article.category}</Badge>
                <span className="text-xs font-mono text-text-tertiary">{article.readingTime}</span>
              </div>
              <h2 className="text-text-primary font-medium text-lg mb-3 group-hover:text-accent-violet transition-colors leading-snug">
                {article.title}
              </h2>
              <p className="text-text-secondary text-sm leading-relaxed">{article.description}</p>
              <div className="mt-4 text-xs font-mono text-text-tertiary">{article.date}</div>
            </Link>
          ))}
        </div>
      )}

      <div className="space-y-px">
        {rest.map((article) => (
          <Link
            key={article.slug}
            href={`/writing/${article.slug}`}
            className="group flex items-start justify-between gap-6 py-5 border-b border-border hover:bg-base-800/40 px-4 -mx-4 rounded-lg transition-colors"
          >
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-3 mb-1">
                <Badge variant="default" size="sm">{article.category}</Badge>
                <span className="text-xs font-mono text-text-tertiary hidden sm:block">{article.date}</span>
              </div>
              <h3 className="text-text-primary font-medium group-hover:text-accent-violet transition-colors">
                {article.title}
              </h3>
              <p className="text-text-secondary text-sm mt-1 line-clamp-1">{article.description}</p>
            </div>
            <div className="flex-shrink-0 text-xs font-mono text-text-tertiary whitespace-nowrap">
              {article.readingTime}
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}