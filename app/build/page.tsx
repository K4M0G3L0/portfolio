import { Metadata } from "next";
import Link from "next/link";
import { getBuildProgress, expandCommitMessage, getRecentCommits } from "@/lib/github";
import { BUILD_TIMELINE } from "@/lib/data";
import { Badge } from "@/components/ui/Badge";
import { timeAgo } from "@/lib/utils";
import { LiveClock } from "@/components/ui/LiveClock";

export const metadata: Metadata = {
  title: "LUMA AIOS — Live Build",
  description: "Public engineering journal documenting the build of LUMA AIOS — a B2B SaaS AI Operating System for operational businesses.",
};

export const revalidate = 300;

export default async function BuildPage() {
  const [progress, commits] = await Promise.all([
    getBuildProgress(),
    getRecentCommits("luma-aios", 15),
  ]);

  return (
    <div className="max-w-7xl mx-auto px-6 py-16">

      {/* Header */}
      <div className="mb-16">
        <div className="flex items-center justify-between flex-wrap gap-4 mb-6">
          <div className="flex items-center gap-2">
            <Badge variant="emerald">Live Build</Badge>
            <Badge variant="outline">B2B SaaS Platform</Badge>
          </div>
          <LiveClock />
        </div>

        <h1 className="text-4xl md:text-5xl font-medium text-text-primary mb-4 leading-tight">
          Building LUMA AIOS<br />
          <span className="text-text-secondary font-light">in public. Commit by commit.</span>
        </h1>
        <p className="text-text-secondary text-lg max-w-2xl leading-relaxed">
          An AI Operating System for operational businesses. Construction is the first vertical.
          The platform is reusable across industries. This is the engineering and business journal.
        </p>
      </div>

      {/* Phase Cards — replace the day counter */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-12">

        {/* Current Phase */}
        <div className="bg-base-800 border border-accent-violet/30 rounded-xl p-6 relative overflow-hidden">
          <div className="absolute top-0 left-0 right-0 h-0.5 bg-gradient-to-r from-accent-violet to-accent-cyan" />
          <div className="text-xs font-mono text-text-tertiary uppercase tracking-widest mb-2">Current Phase</div>
          <div className="text-text-primary font-semibold text-lg mb-1">Product Validation</div>
          <div className="text-text-tertiary text-xs leading-relaxed">
            Customer discovery interviews. Validating the operating system of a construction business before scaling.
          </div>
          <div className="mt-4 flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-accent-violet animate-pulse" />
            <span className="text-xs text-accent-violet font-mono">Phase 2 of 4</span>
          </div>
        </div>

        {/* Current Sprint */}
        <div className="bg-base-800 border border-border rounded-xl p-6">
          <div className="text-xs font-mono text-text-tertiary uppercase tracking-widest mb-2">Current Sprint</div>
          <div className="text-text-primary font-semibold mb-1">{progress.currentModule}</div>
          <div className="text-text-tertiary text-xs leading-relaxed mb-4">
            Platform foundation complete. Now validating with real customers.
          </div>
          <div className="flex items-center justify-between text-xs font-mono">
            <span className="text-text-tertiary">Latest release</span>
            <span className="text-emerald-400">v0.10.0-alpha</span>
          </div>
        </div>

        {/* Next Milestone */}
        <div className="bg-base-800 border border-border rounded-xl p-6">
          <div className="text-xs font-mono text-text-tertiary uppercase tracking-widest mb-2">Next Milestone</div>
          <div className="text-text-primary font-semibold mb-1">Private Alpha</div>
          <div className="text-text-tertiary text-xs leading-relaxed mb-4">
            2-3 pilot companies running LUMA on live tenders and projects.
          </div>
          <div className="flex items-center justify-between text-xs font-mono">
            <span className="text-text-tertiary">Interviews completed</span>
            <span className="text-text-primary">0 / 20</span>
          </div>
        </div>

        {/* North Star */}
        <div className="bg-base-800 border border-emerald-500/20 rounded-xl p-6 relative overflow-hidden">
          <div className="absolute top-0 left-0 right-0 h-0.5 bg-emerald-400/40" />
          <div className="text-xs font-mono text-text-tertiary uppercase tracking-widest mb-2">North Star Goal</div>
          <div className="text-text-primary font-semibold text-lg mb-1">First Paying Customer</div>
          <div className="text-text-tertiary text-xs leading-relaxed">
            One construction company paying R4,500/month for BloomOS + MoneyOS.
          </div>
          <div className="mt-4 flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-emerald-400" />
            <span className="text-xs text-emerald-400 font-mono">Target: next 30 days</span>
          </div>
        </div>
      </div>

      {/* Platform Status Bar */}
      <div className="bg-base-800 border border-border rounded-xl p-6 mb-12">
        <div className="flex items-center justify-between mb-4 flex-wrap gap-4">
          <div>
            <div className="text-xs font-mono text-text-tertiary uppercase tracking-widest mb-1">Platform Status</div>
            <div className="text-text-primary font-medium">Core Intelligence Layer — 10 modules complete</div>
          </div>
          <div className="flex items-center gap-6 text-xs font-mono">
            <div className="text-center">
              <div className="text-text-primary font-semibold text-lg">80</div>
              <div className="text-text-tertiary">tests passing</div>
            </div>
            <div className="text-center">
              <div className="text-text-primary font-semibold text-lg">10</div>
              <div className="text-text-tertiary">modules</div>
            </div>
            <div className="text-center">
              <div className="text-text-primary font-semibold text-lg">5</div>
              <div className="text-text-tertiary">AI agents</div>
            </div>
            <div className="text-center">
              <div className="text-text-primary font-semibold text-lg">53+</div>
              <div className="text-text-tertiary">API routes</div>
            </div>
          </div>
        </div>

        {/* Module completion grid */}
        <div className="grid grid-cols-2 md:grid-cols-5 gap-2">
          {[
            { name: "Core", done: true },
            { name: "Memory", done: true },
            { name: "Agents", done: true },
            { name: "BloomOS", done: true },
            { name: "Transparency", done: true },
            { name: "Action Engine", done: true },
            { name: "Flowlink", done: true },
            { name: "MoneyOS", done: true },
            { name: "BuildOS", done: true },
            { name: "CapitalOS", done: false },
          ].map((m) => (
            <div
              key={m.name}
              className={`flex items-center gap-2 px-3 py-2 rounded-lg text-xs font-mono ${
                m.done
                  ? "bg-emerald-400/5 border border-emerald-400/20 text-emerald-400"
                  : "bg-base-700/50 border border-border text-text-tertiary"
              }`}
            >
              <span>{m.done ? "✓" : "○"}</span>
              {m.name}
            </div>
          ))}
        </div>
      </div>

      {/* Latest commit banner */}
      {progress.lastCommit && (
        <div className="bg-base-800 border border-emerald-500/20 rounded-xl p-4 mb-12 flex items-center gap-4 flex-wrap">
          <div className="flex items-center gap-2 flex-shrink-0">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
            <span className="text-xs font-mono text-emerald-400 uppercase tracking-widest">Latest commit</span>
          </div>
          <code className="text-xs font-mono text-accent-violet bg-accent-violet/10 px-2 py-0.5 rounded flex-shrink-0">
            {progress.lastCommit.sha}
          </code>
          <span className="text-sm text-text-secondary flex-1 min-w-0 truncate">
            {progress.lastCommit.message}
          </span>
          <span className="text-xs text-text-tertiary font-mono flex-shrink-0">
            {timeAgo(progress.lastCommit.date)}
          </span>
        </div>
      )}

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
                <div className="flex-shrink-0 w-12 text-right">
                  <span className="text-xs font-mono text-text-tertiary">D{item.day}</span>
                </div>

                <div className="flex-shrink-0 mt-0.5">
                  <div className={`w-2.5 h-2.5 rounded-full mt-0.5 ${
                    item.status === "complete"  ? "bg-emerald-400" :
                    item.status === "building"  ? "bg-accent-violet animate-pulse" :
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

        {/* Engineering log */}
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
                {expandCommitMessage(commit.message) !== commit.message && (
                  <p className="text-xs text-text-tertiary leading-relaxed italic">
                    {expandCommitMessage(commit.message)}
                  </p>
                )}
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

      {/* System Architecture */}
      <div className="mt-16">
        <h2 className="text-lg font-medium text-text-primary mb-8">Platform Architecture</h2>
        <div className="bg-base-800 border border-border rounded-xl p-8">

          {/* Three layer diagram */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            <div className="space-y-2">
              <div className="text-xs font-mono text-text-tertiary uppercase tracking-widest mb-3">Core Platform</div>
              {["CEO Agent", "Memory Core", "Event Bus", "Transparency", "Identity + RBAC", "Analytics"].map(m => (
                <div key={m} className="text-xs px-3 py-1.5 rounded-md bg-accent-violet/5 border border-accent-violet/20 text-accent-violet font-mono">{m}</div>
              ))}
            </div>

            <div className="space-y-2">
              <div className="text-xs font-mono text-text-tertiary uppercase tracking-widest mb-3">Business Layer</div>
              {[
                { name: "BloomOS", label: "Opportunities" },
                { name: "Flowlink", label: "Operations" },
                { name: "MoneyOS", label: "Finance" },
              ].map(m => (
                <div key={m.name} className="text-xs px-3 py-1.5 rounded-md bg-emerald-400/5 border border-emerald-400/20 text-emerald-400 font-mono flex justify-between">
                  <span>{m.name}</span><span className="text-text-tertiary">{m.label}</span>
                </div>
              ))}
            </div>

            <div className="space-y-2">
              <div className="text-xs font-mono text-text-tertiary uppercase tracking-widest mb-3">Industry Layer</div>
              {[
                { name: "BuildOS", label: "Construction", live: true },
                { name: "RouteOS", label: "Logistics", live: false },
                { name: "HealthOS", label: "Healthcare", live: false },
                { name: "FactoryOS", label: "Manufacturing", live: false },
              ].map(m => (
                <div key={m.name} className={`text-xs px-3 py-1.5 rounded-md border font-mono flex justify-between ${
                  m.live
                    ? "bg-cyan-400/5 border-cyan-400/20 text-cyan-400"
                    : "bg-base-700/50 border-border text-text-tertiary"
                }`}>
                  <span>{m.name}</span>
                  <span>{m.live ? "Live" : m.label}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="pt-6 border-t border-border">
            <div className="flex flex-wrap gap-4 text-xs font-mono text-text-tertiary">
              <span>FastAPI · Python 3.12</span>
              <span>React 18 · Next.js</span>
              <span>PostgreSQL 16</span>
              <span>SQLAlchemy 2.0</span>
              <span>Anthropic Claude</span>
              <span>JWT Auth · RBAC</span>
              <span>Vector Embeddings</span>
              <span>Event-Driven Architecture</span>
              <span>80+ tests passing</span>
              <span>53+ API endpoints</span>
            </div>
          </div>
        </div>
      </div>

      {/* CTA */}
      <div className="mt-16 text-center">
        <p className="text-text-secondary mb-4">
          Are you running a construction or operational business in South Africa?
        </p>
        <div className="flex items-center justify-center gap-4 flex-wrap">
          <Link
            href="/demo"
            className="inline-flex items-center gap-2 bg-accent-violet text-white px-5 py-2.5 rounded-lg text-sm font-medium hover:bg-accent-violet-dim transition-colors"
          >
            See the live demo →
          </Link>
          <Link
            href="/contact"
            className="inline-flex items-center gap-2 bg-base-800 border border-border text-text-primary px-5 py-2.5 rounded-lg text-sm hover:border-border-strong transition-colors"
          >
            Book a discovery call
          </Link>
        </div>
      </div>

    </div>
  );
}
