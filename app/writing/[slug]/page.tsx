import { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Badge } from "@/components/ui/Badge";

interface Props {
  params: { slug: string };
}

const ARTICLES: Record<string, {
  title: string;
  description: string;
  category: string;
  date: string;
  readingTime: string;
  content: string;
}> = {
  "why-businesses-need-ai-agents": {
    title: "Why Businesses Need AI Agents, Not Chatbots",
    description: "Chatbots answer questions. Agents take action. The difference is architecture.",
    category: "AI Agents",
    date: "20 Jun 2026",
    readingTime: "8 min read",
    content: `A chatbot responds to input. It has no memory between sessions. It cannot take action in external systems. It knows nothing about your specific business.

An AI agent maintains context across sessions. It retrieves relevant business knowledge. It can call tools, APIs, and databases. It makes decisions, not just responses.

Consider a construction company evaluating a tender opportunity. A chatbot might answer a general question about CIDB grades. An AI agent retrieves the company CIDB grade from memory, extracts the tender requirement from the document, checks BBBEE level, compares experience, calculates PPPFA preference points, assesses financial capacity, and generates a recommendation — STRONG BID, 87% match.

The agent does not just answer. It reasons, retrieves, calculates, and decides.

Building a real AI agent requires four layers. Memory gives agents persistence across sessions — not just conversation history, but business context like certifications, past project outcomes, and financial constraints. Tools connect agents to the real world — databases, APIs, document stores. Reasoning allows agents to break complex questions into steps and synthesize answers. Orchestration coordinates multiple specialist agents under a CEO Agent that routes tasks and synthesizes results.

In LUMA AIOS, the CEO Agent receives a user request and routes it to specialists. Each specialist retrieves relevant memory, applies domain expertise, and returns a structured decision. The CEO Agent synthesizes these into a final recommendation.

For a mid-size construction company evaluating 20 tenders per month, the difference is significant. Manual analysis takes 4-6 hours per tender. An AI agent system completes the full analysis in under 90 seconds with consistent, documented reasoning.

The goal is not to replace human judgment. It is to give human judgment the analysis it needs, instantly, at every decision point.`,
  },
  "building-ai-operating-system": {
    title: "Building an AI Operating System from Scratch",
    description: "What happens when you apply the concept of an operating system to AI.",
    category: "AI Engineering",
    date: "18 Jun 2026",
    readingTime: "12 min read",
    content: `A traditional operating system manages hardware resources and provides a platform for applications. An AI operating system manages intelligence resources — memory, agents, tools, and context — and provides a platform for business decisions.

LUMA AIOS is built on this idea. Instead of applications running on a kernel, specialized AI agents run on an intelligence core. Instead of RAM and CPU, the resources being managed are context windows, memory stores, and model calls.

The Intelligence Core is the foundation. It provides the LLM provider abstraction, memory management, document retrieval, and the agent communication protocol. Every agent builds on this layer.

The Memory Core gives the system persistence. Structured memory stores facts — CIDB grades, BBBEE levels, certifications. Vector memory stores document knowledge, retrievable by semantic similarity. Agent memory stores past decisions, creating an intelligence history.

The Agent Framework defines how specialists are built and coordinated. Every agent inherits from BaseAgent with four methods: analyze, reason, execute, report. Adding a new specialist requires implementing reason() and registering with a decorator.

The CEO Agent is the orchestrator. It classifies user intent, routes tasks to specialists, collects responses, and synthesizes recommendations. It is the only agent that talks directly to users.

The alternative — a single large prompt that tries to handle everything — breaks down quickly. It cannot maintain context across sessions. It cannot coordinate parallel analysis. It cannot improve in one domain without affecting others.

An operating system is valuable not because of what it does directly, but because of what it enables. LUMA AIOS does not analyze tenders — BloomOS does. It does not coordinate suppliers — Flowlink does. LUMA provides the memory, the agent framework, the coordination protocol, and the intelligence infrastructure that makes specialized products possible.

That is what makes it an operating system, not just an AI application.`,
  },
  "how-rag-gives-businesses-memory": {
    title: "How RAG Gives Businesses Memory",
    description: "An AI without context is just autocomplete. RAG changes that.",
    category: "AI Engineering",
    date: "15 Jun 2026",
    readingTime: "10 min read",
    content: `Every time you start a conversation with a standard AI, it starts fresh. It knows nothing about your company, your past decisions, your documents, or your business context. You have to re-explain everything, every time.

For personal use, that is a minor inconvenience. For business use, it is a fundamental limitation.

RAG — Retrieval-Augmented Generation — solves this by giving the AI a way to look things up before answering.

The pipeline has three stages. Indexing happens once — documents are loaded, split into chunks of around 500 characters, converted to vector embeddings, and stored. Retrieval happens at query time — the question is embedded and the most semantically similar chunks are found. Generation uses the retrieved chunks as context — the LLM answers based on what it found, not just what it was trained on.

A construction company uploads their past project portfolio, CIDB certificates, and BBBEE documentation. When the Procurement Agent asks whether the company has experience with school construction projects, it retrieves the relevant project records and gives a specific, documented answer.

Without RAG: the agent has no information about past projects.
With RAG: yes — the company completed a R8M school construction project in Soweto in 2024, documented in the project portfolio.

The second answer requires no re-training. It requires only that the document exists in the system.

The LUMA Memory Core implements RAG using sentence-transformers for embeddings and PostgreSQL for vector storage. The retrieval engine combines semantic search over documents with structured memory lookup. Context is assembled in a specific order: company profile, structured business facts, relevant document chunks, past agent decisions.

An AI agent with RAG does not just answer questions. It answers questions about your business, with evidence from your documents, in context of your past decisions. That is business intelligence.`,
  },
  "ai-in-south-african-procurement": {
    title: "AI in Construction Procurement",
    description: "The compliance complexity of South African procurement is a solved problem — with the right AI layer.",
    category: "ConTech",
    date: "10 Jun 2026",
    readingTime: "9 min read",
    content: `South African public procurement operates under a specific regulatory framework: PPPFA, BBBEE, CIDB, and CSD. Each framework has rules. The rules interact. Getting them wrong means disqualification. Getting them right means competitive advantage.

The PPPFA creates two systems: 80/20 for contracts below R50 million, 90/10 for contracts above. The 80 or 90 points cover price competitiveness. The 20 or 10 points cover BBBEE preference.

BBBEE Level 1 earns maximum preference points. In competitive bids, those points frequently determine the outcome.

CIDB grades define what contracts a company can bid on. Grade 4GB covers General Building contracts up to R13 million. Grade 5GB covers up to R40 million. Bidding above your grade means automatic disqualification.

CSD registration is a hard requirement for most government contracts. An expired or incomplete registration disqualifies an otherwise perfect bid.

BloomOS encodes these rules precisely. The Requirement Extractor reads tender documents and extracts the CIDB grade, BBBEE requirement, estimated value, and mandatory documents. The Opportunity Scorer applies weighted scoring across five dimensions. The Compliance Checker compares tender requirements against company certifications in memory. The Bid Decision Engine produces STRONG_BID, CONSIDER, PARTNER_REQUIRED, or DO_NOT_BID with specific reasoning.

A company that previously spent 4-6 hours on each tender evaluation can now get a full analysis in under 90 seconds. The analysis is consistent — the same rules applied the same way every time.

Companies stop bidding on contracts they cannot win. They also stop avoiding contracts they could win. That is the real value of procurement intelligence: not just speed, but clarity.`,
  },
  "multi-agent-systems-design": {
    title: "Designing Multi-Agent AI Systems",
    description: "When one AI agent is not enough — and how to design specialist agents that collaborate.",
    category: "AI Agents",
    date: "5 Jun 2026",
    readingTime: "11 min read",
    content: `A single AI agent given a complex business question faces a fundamental problem: context window limits, domain expertise breadth, and reasoning depth all compete against each other.

Ask one agent to simultaneously evaluate CIDB compliance, financial viability, execution capacity, and fraud risk — and you get a shallow answer across all four dimensions.

Multi-agent systems solve this by decomposition. One specialist per domain. Each one goes deep. A coordinator synthesizes.

The LUMA AIOS multi-agent architecture has three layers. Specialists are domain experts — each narrow, deep, and independently testable. The CEO Agent is the coordinator — it receives requests, classifies intent, routes tasks, collects responses, and synthesizes recommendations. The Message Bus is the communication layer — every task and response is logged, structured, and observable.

Every specialist inherits from BaseAgent with four methods: analyze, reason, execute, report. Analyze retrieves memory context — the same for every agent. Reason is where domain expertise lives — the only method each specialist implements differently. Execute packages the result into a standard response. Report returns agent status for monitoring.

The CEO Agent maintains a routing map: which agents to activate for which intent categories. A bid evaluation activates all four specialists. A financial question activates only Finance and Security.

Adding a new specialist requires three things: a class inheriting from BaseAgent, an implementation of reason(), and a registration decorator. Nothing else changes. The CEO Agent routing map gets one new entry. Existing specialists are untouched.

Specialists should be independent, communication should be structured, and coordination should be centralized. That is the architecture principle that makes multi-agent systems practical at scale.`,
  },
  "cidb-bbbee-compliance-intelligence": {
    title: "PPPFA, BBBEE, CIDB — Building Procurement Intelligence",
    description: "Encoding South African procurement regulations into an AI scoring system.",
    category: "Business Automation",
    date: "1 Jun 2026",
    readingTime: "7 min read",
    content: `South African public procurement has four main regulatory layers that interact with each other.

PPPFA defines the scoring system. For contracts under R50 million, price is worth 80 points and BBBEE preference is worth 20 points. For contracts above R50 million, price is 90 points and BBBEE is 10 points.

BBBEE determines the preference points. Level 1 earns the maximum available points. The levels are certified by accredited verification agencies and renewed periodically.

CIDB grades define contract eligibility. Each grade has a maximum contract value ceiling and a designation — General Building, Civil Engineering, Electrical. A GB company cannot bid on CE contracts.

CSD is the supplier database. Registration must be current and recently verified.

The BBBEE scoring is straightforward to encode — a lookup table mapping levels to points. The CIDB matching is more nuanced: the grade must meet or exceed the requirement, and the designation must match the scope. The CSD check is binary but requires checking currency, not just existence.

BloomOS uses weighted scoring: CIDB match is 30% because it is often a hard disqualifier. BBBEE is 20% because it directly determines preference points. Experience relevance is 25% because evaluators look for demonstrated capability. Location is 10% because proximity affects cost. Compliance status is 15% because missing documents are the most preventable cause of disqualification.

The rules themselves are encodable. What the AI adds is the ability to read a tender document and extract those requirements accurately, compare them against company data in memory, and generate explanations a business owner can understand and act on.

The compliance rules are the knowledge. The AI is the application layer that makes that knowledge accessible at scale.`,
  },
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const article = ARTICLES[params.slug];
  if (!article) return { title: "Article Not Found" };
  return {
    title: article.title,
    description: article.description,
  };
}

export default function ArticlePage({ params }: Props) {
  const article = ARTICLES[params.slug];
  if (!article) notFound();

  const paragraphs = article.content.trim().split("\n\n").filter((p) => p.trim());

  return (
    <div className="max-w-3xl mx-auto px-6 py-16">
      <Link href="/writing" className="text-text-tertiary hover:text-text-primary text-sm transition-colors mb-8 block">
        ← All articles
      </Link>

      <div className="mb-10">
        <div className="flex items-center gap-3 mb-4">
          <Badge variant="violet" size="sm">{article.category}</Badge>
          <span className="text-text-tertiary text-sm font-mono">{article.readingTime}</span>
          <span className="text-text-tertiary text-sm font-mono">{article.date}</span>
        </div>
        <h1 className="text-3xl md:text-4xl font-medium text-text-primary mb-4 leading-tight">
          {article.title}
        </h1>
        <p className="text-text-secondary text-lg leading-relaxed">{article.description}</p>
      </div>

      <div className="border-t border-border pt-10 space-y-5">
        {paragraphs.map((block, i) => (
          <p key={i} className="text-text-secondary leading-relaxed">
            {block}
          </p>
        ))}
      </div>

      <div className="border-t border-border mt-12 pt-8 flex items-center justify-between">
        <Link href="/writing" className="text-text-tertiary hover:text-text-primary text-sm transition-colors">
          ← Back to writing
        </Link>
        <Link href="/contact" className="text-accent-violet hover:text-accent-violet-dim text-sm transition-colors">
          {"Let's discuss →"}
        </Link>
      </div>
    </div>
  );
}

export function generateStaticParams() {
  return Object.keys(ARTICLES).map((slug) => ({ slug }));
}