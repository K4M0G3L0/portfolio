import { Metadata } from "next";
import Link from "next/link";
import { getBuildProgress, expandCommitMessage, getRecentCommits } from "@/lib/github";
import { BUILD_TIMELINE } from "@/lib/data";
import { Badge } from "@/components/ui/Badge";
import { formatDate, timeAgo } from "@/lib/utils";

export const metadata: Metadata = {
  title: "LUMA AIOS Live Build",
  description: "Public engineering journal documenting the 90-day build of LUMA AIOS — an AI Operating System for business intelligence.",
};

export const revalidate = 300;

const MODULE_DESCRIPTIONS: Record<string, string> = {
  "Core Architecture": "FastAPI backend, React frontend, PostgreSQL, JWT auth",
  "Business DNA Engine": "Organizations, profiles, capabilities, certifications",
  "Memory Core": "Structured memory, vector embeddings, RAG pipeline",
  "Multi-Agent Framework": "CEO + Procurement + Finance + Logistics + Security agents",
  "BloomOS Intelligence": "Tender scoring, bid decisions, compliance checking",
  "Command Center": "Dashboard, LUMA Score, agent monitoring, AI insights",
  "Flowlink Handoff": "Winner → supplier coordination pipeline",
  "MoneyOS": "Invoice intelligence, cashflow analysis, financial risk",
  "BuildOS": "Construction AI, CIDB compliance, project scheduling",
  "Security Intelligence": "Fraud detection, supplier verification, POPIA",
  "Cloud Deployment": "AWS/GCP production, monitoring, scaling, CDN",
  "Platform Launch": "Public beta, onboarding, documentation",
};

export default async function BuildPage() {
  const [progress, commits] = await Promise.all([
    getBuildProgress(),
    getRecentCommits("luma-aios", 15),
  ]);

  const completedModules = BUILD_TIMELINE.filter((t) => t.status === "complete");
  const buildingModules = BUILD_TIMELINE.filter((t) => t.status === "building");
  const plannedModules = BUILD_TIMELINE.filter((t) => t.status === "planned");

  return (
    <div className="max-w-7xl mx-auto px-6 py-16">
      {/* Header */}
      <div className="mb-16">
        <div className="flex items-center gap-2 mb-6">
          <Badge variant="emerald">Live Build</Badge>
          <Badge variant="outline">Public · 90 Days</Badge>
        </div>
        <h1 className="text-4xl md:text-5xl font-medium text-text-primary mb-4 leading-tight">
          Building LUMA AIOS<br />
          <span className="text-text-secondary font-light">in public, from Day 1.</span>
        </h1>
        <p className="text-text-secondary text-lg max-w-2xl leading-relaxed">
          An AI Operating System for business intelligence. Documented commit by commit,
          decision by decision, for 90 days. This is the engineering journal.
        </p>
      </div>

      {/* Progress Overview */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-12">
        <div className="md:col-span-2 bg-base-800 border border-border rounded-xl p-6">
          <div className="flex items-start justify-between mb-6">
            <div>
              <div className="text-xs font-mono text-text-tertiary uppercase tracking-widest mb-1">Current Day</div>
              <div className="flex items-baseline gap-2">
                <span className="text-5xl font-medium text-text-primary">{progress.currentDay}</span>
                <span className="text-text-tertiary text-xl">/ {progress.totalDays}</span>
              </div>
            </div>
            <div className="text-right">
              <div className="text-xs font-mono text-text-tertiary uppercase tracking-widest mb-1">Complete</div>
              <div className="text-3xl font-medium gradient-text">{progress.percentComplete}%</div>
            </div>
          </div>
          <div className="w-full h-2 bg-base-700 rounded-full overflow-hidden mb-4">
            <div
              className="h-full bg-gradient-to-r from-accent-violet to-accent-cyan rounded-full transition-all"
              style={{ width: `${progress.percentComplete}%` }}
            />
          </div>
          <div className="flex justify-between text-xs font-mono text-text-tertiary">
            <span>Day 1 · Foundation</span>
            <span>Day 90 · Launch</span>
          </div>
        </div>

        <div className="bg-base-800 border border-border rounded-xl p-6">
          <div className="text-xs font-mono text-text-tertiary uppercase tracking-widest mb-2">Active Module</div>
          <div className="text-text-primary font-medium mb-1">{progress.currentModule}</div>
          <div className="text-text-tertiary text-xs leading-relaxed">
            {MODULE_DESCRIPTIONS[progress.currentModule] || "In progress"}
          </div>
          <div className="mt-4 flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
            <span className="text-xs text-emerald-400 font-mono">Building</span>
          </div>
        </div>

        <div className="bg-base-800 border border-border rounded-xl p-6">
          {progress.stats && (
            <>
              <div className="text-xs font-mono text-text-tertiary uppercase tracking-widest mb-4">GitHub · luma-aios</div>
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="text-text-tertiary">Stars</span>
                  <span className="text-text-primary font-mono">{progress.stats.stars}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-text-tertiary">Primary Lang</span>
                  <span className="text-text-primary font-mono">{progress.stats.language}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-text-tertiary">Last Push</span>
                  <span className="text-text-primary font-mono">{timeAgo(progress.stats.lastCommit)}</span>
                </div>
              </div>
            </>
          )}
          <a
            href="https://github.com/K4M0G3L0/luma-aios"
            target="_blank"
            rel="noopener noreferrer"
            className="mt-4 block text-center text-xs font-mono text-accent-violet hover:text-accent-violet-dim transition-colors"
          >
            View repository →
          </a>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Build Timeline */}
        <div className="lg:col-span-2">
          <h2 className="text-lg font-medium text-text-primary mb-6">Build Timeline</h2>
          <div className="space-y-2">
            {BUILD_TIMELINE.map((item, i) => (
              <div
                key={i}
                className={`relative flex gap-4 p-4 rounded-lg border transition-all ${
                  item.status === "complete"
                    ? "bg-base-800 border-border"
                    : item.status === "building"
                    ? "bg-accent-violet/5 border-accent-violet/30"
                    : "bg-base-800/40 border-border/50"
                }`}
              >
                {/* Day number */}
                <div className="flex-shrink-0 w-12 text-right">
                  <span className="text-xs font-mono text-text-tertiary">D{item.day}</span>
                </div>

                {/* Status dot */}
                <div className="flex-shrink-0 mt-0.5">
                  <div className={`w-2.5 h-2.5 rounded-full mt-0.5 ${
                    item.status === "complete" ? "bg-emerald-400" :
                    item.status === "building" ? "bg-accent-violet animate-pulse" :
                    "bg-base-600"
                  }`} />
                </div>

                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between gap-2">
                    <span className={`text-sm font-medium ${
                      item.status === "planned" ? "text-text-tertiary" : "text-text-primary"
                    }`}>
                      {item.module}
                    </span>
                    <Badge
                      variant={
                        item.status === "complete" ? "emerald" :
                        item.status === "building" ? "violet" : "default"
                      }
                      size="sm"
                    >
                      {item.status === "complete" ? "Done" :
                       item.status === "building" ? "Active" : "Planned"}
                    </Badge>
                  </div>
                  <p className="text-text-tertiary text-xs mt-0.5 leading-relaxed">{item.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Commit feed */}
        <div>
          <h2 className="text-lg font-medium text-text-primary mb-6">Engineering Log</h2>
          <div className="space-y-3">
            {commits.map((commit, i) => (
              <div
                key={i}
                className="bg-base-800 border border-border rounded-lg p-4 hover:border-border-strong transition-colors"
              >
                <div className="flex items-center justify-between mb-2">
                  <code className="text-xs font-mono text-accent-violet bg-accent-violet/10 px-2 py-0.5 rounded">
                    {commit.sha}
                  </code>
                  <span className="text-xs text-text-tertiary font-mono">{timeAgo(commit.date)}</span>
                </div>
                <p className="text-sm text-text-secondary mb-2 leading-relaxed">{commit.message}</p>
                <p className="text-xs text-text-tertiary leading-relaxed italic">
                  {expandCommitMessage(commit.message) !== commit.message
                    ? expandCommitMessage(commit.message)
                    : null}
                </p>
                {commit.url !== "#" && (
                  <a
                    href={commit.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-2 inline-block text-xs text-text-tertiary hover:text-accent-violet transition-colors"
                  >
                    View on GitHub →
                  </a>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Architecture Overview */}
      <div className="mt-16">
        <h2 className="text-lg font-medium text-text-primary mb-8">System Architecture</h2>
        <div className="bg-base-800 border border-border rounded-xl p-8">
          <div className="grid grid-cols-1 md:grid-cols-5 gap-6 items-center">
            {/* Core */}
            <div className="md:col-span-1 bg-base-700 border border-accent-violet/30 rounded-lg p-4 text-center">
              <div className="text-xs font-mono text-accent-violet mb-1 uppercase tracking-widest">Core</div>
              <div className="text-text-primary font-medium text-sm">LUMA AIOS</div>
              <div className="text-text-tertiary text-xs mt-1">AI OS</div>
            </div>

            {/* Arrow */}
            <div className="hidden md:flex md:col-span-1 items-center justify-center">
              <div className="text-text-tertiary">→</div>
            </div>

            {/* Agents */}
            <div className="md:col-span-3 grid grid-cols-2 gap-3">
              {[
                { name: "BloomOS", label: "Opportunities", color: "#10B981" },
                { name: "Flowlink", label: "Execution", color: "#06B6D4" },
                { name: "MoneyOS", label: "Finance", color: "#F59E0B" },
                { name: "BuildOS", label: "Construction", color: "#8B5CF6" },
              ].map((s) => (
                <div
                  key={s.name}
                  className="border rounded-lg p-3"
                  style={{ borderColor: `${s.color}30`, background: `${s.color}08` }}
                >
                  <div className="text-sm font-medium" style={{ color: s.color }}>{s.name}</div>
                  <div className="text-text-tertiary text-xs">{s.label}</div>
                </div>
              ))}
            </div>
          </div>

          <div className="mt-6 pt-6 border-t border-border">
            <div className="flex flex-wrap gap-4 text-xs font-mono text-text-tertiary">
              <span>FastAPI · Python 3.12</span>
              <span>React 18 · Vite</span>
              <span>PostgreSQL 16</span>
              <span>SQLAlchemy 2.0</span>
              <span>Anthropic Claude</span>
              <span>JWT Auth · RBAC</span>
              <span>Vector Embeddings</span>
              <span>RAG Pipeline</span>
            </div>
          </div>
        </div>
      </div>

      {/* Subscribe / Follow CTA */}
      <div className="mt-16 text-center">
        <p className="text-text-secondary mb-4">This build updates every time I push code.</p>
        <div className="flex items-center justify-center gap-4">
          <a
            href="https://github.com/K4M0G3L0/luma-aios"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 bg-base-800 border border-border text-text-primary px-5 py-2.5 rounded-lg text-sm hover:border-border-strong transition-colors"
          >
            Star the repo
          </a>
          <Link
            href="/writing"
            className="inline-flex items-center gap-2 text-text-secondary hover:text-text-primary text-sm transition-colors"
          >
            Read the engineering articles →
          </Link>
        </div>
      </div>
    </div>
  );
}
