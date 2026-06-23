import Link from "next/link";
import { getBuildProgress } from "@/lib/github";
import { SYSTEMS, SKILLS, SITE_CONFIG } from "@/lib/data";
import { Badge } from "@/components/ui/Badge";
import { timeAgo } from "@/lib/utils";

export const revalidate = 300; // Revalidate every 5 minutes

export default async function HomePage() {
  const buildProgress = await getBuildProgress();

  return (
    <div className="min-h-screen">
      {/* Hero */}
      <section className="relative min-h-[90vh] flex items-center">
        {/* Background grid */}
        <div className="absolute inset-0 bg-dots opacity-40" />
        {/* Radial glow */}
        <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full bg-accent-violet/5 blur-3xl pointer-events-none" />

        <div className="relative max-w-7xl mx-auto px-6 py-24">
          <div className="max-w-3xl">
            {/* Status bar */}
            <div className="flex items-center gap-2 mb-8">
              <div className="flex items-center gap-1.5 bg-base-800 border border-border rounded-full px-3 py-1">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                <span className="text-xs font-mono text-text-secondary">
                  Building LUMA AIOS · Day {buildProgress.currentDay}/{buildProgress.totalDays}
                </span>
              </div>
              <div className="text-text-tertiary text-xs font-mono">
                {buildProgress.percentComplete}% complete
              </div>
            </div>

            {/* Headline */}
            <h1 className="text-5xl md:text-6xl font-medium text-text-primary leading-[1.1] tracking-tight mb-6">
              Building intelligent{" "}
              <span className="gradient-text">systems</span>{" "}
              that help businesses think, decide, and operate smarter.
            </h1>

            <p className="text-xl text-text-secondary leading-relaxed mb-10 max-w-2xl">
              AI Solutions Architect · Technical Founder · Systems Builder.
              I design AI operating systems where specialized agents coordinate to turn business complexity into clarity.
            </p>

            {/* CTA row */}
            <div className="flex flex-col sm:flex-row gap-4 mb-14">
              <Link
                href="/build"
                className="inline-flex items-center gap-2 bg-accent-violet text-white px-6 py-3 rounded-lg font-medium hover:bg-accent-violet-dim transition-colors"
              >
                <span className="w-2 h-2 rounded-full bg-white/80 animate-pulse" />
                Follow the Live Build
              </Link>
              <Link
                href="/projects"
                className="inline-flex items-center gap-2 bg-base-800 border border-border text-text-primary px-6 py-3 rounded-lg font-medium hover:border-border-strong transition-colors"
              >
                View Case Studies
              </Link>
            </div>

            {/* Skills pills */}
            <div className="flex flex-wrap gap-2">
              {["AI Engineering", "RAG Systems", "Multi-Agent Frameworks", "Cloud Architecture", "Cybersecurity", "Business Intelligence"].map((skill) => (
                <Badge key={skill} variant="outline">{skill}</Badge>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Live build status */}
      <section className="border-y border-border bg-base-800/40">
        <div className="max-w-7xl mx-auto px-6 py-6">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div className="flex items-center gap-6">
              <div>
                <div className="text-xs font-mono text-text-tertiary uppercase tracking-widest mb-1">Current Module</div>
                <div className="text-text-primary font-medium">{buildProgress.currentModule}</div>
              </div>
              <div className="w-px h-8 bg-border hidden md:block" />
              <div>
                <div className="text-xs font-mono text-text-tertiary uppercase tracking-widest mb-1">Progress</div>
                <div className="flex items-center gap-3">
                  <div className="w-32 h-1.5 bg-base-700 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-accent-violet rounded-full transition-all"
                      style={{ width: `${buildProgress.percentComplete}%` }}
                    />
                  </div>
                  <span className="text-text-secondary text-sm font-mono">{buildProgress.percentComplete}%</span>
                </div>
              </div>
            </div>
            {buildProgress.lastCommit && (
              <div className="flex items-center gap-3 bg-base-800 border border-border rounded-lg px-4 py-2.5">
                <div className="w-2 h-2 rounded-full bg-emerald-400" />
                <div>
                  <div className="text-xs text-text-tertiary font-mono">Latest commit · {buildProgress.lastCommit.sha}</div>
                  <div className="text-sm text-text-secondary truncate max-w-xs">{buildProgress.lastCommit.message}</div>
                </div>
                <span className="text-xs text-text-tertiary ml-2">{timeAgo(buildProgress.lastCommit.date)}</span>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Systems */}
      <section className="max-w-7xl mx-auto px-6 py-24">
        <div className="flex items-end justify-between mb-12">
          <div>
            <div className="text-xs font-mono text-accent-violet uppercase tracking-widest mb-3">Intelligence Systems</div>
            <h2 className="text-3xl font-medium text-text-primary">What I&apos;m building</h2>
          </div>
          <Link href="/projects" className="text-text-secondary hover:text-text-primary text-sm transition-colors hover-underline">
            All case studies →
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {SYSTEMS.slice(0, 6).map((system) => (
            <div
              key={system.id}
              className="group relative bg-base-800 border border-border rounded-xl p-6 hover:border-border-strong transition-all duration-300"
            >
              {/* Status indicator */}
              <div className="flex items-center justify-between mb-4">
                <div
                  className="w-8 h-8 rounded-lg flex items-center justify-center border"
                  style={{ background: `${system.color}15`, borderColor: `${system.color}30` }}
                >
                  <div className="w-3 h-3 rounded-full" style={{ background: system.color }} />
                </div>
                <Badge
                  variant={
                    system.status === "active" ? "emerald" :
                    system.status === "building" ? "cyan" :
                    system.status === "complete" ? "violet" : "default"
                  }
                  size="sm"
                >
                  {system.statusLabel}
                </Badge>
              </div>

              <h3 className="text-text-primary font-medium mb-1">{system.name}</h3>
              <div className="text-text-tertiary text-xs font-mono mb-3">{system.tagline}</div>
              <p className="text-text-secondary text-sm leading-relaxed mb-4 line-clamp-3">
                {system.description}
              </p>

              <div className="flex flex-wrap gap-1.5">
                {system.tech?.slice(0, 3).map((t) => (
                  <Badge key={t} variant="default" size="sm">{t}</Badge>
                ))}
              </div>

              {system.github && (
                <a
                  href={system.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="absolute inset-0 rounded-xl"
                  aria-label={`View ${system.name} on GitHub`}
                />
              )}
            </div>
          ))}
        </div>
      </section>

      {/* Skills */}
      <section className="border-t border-border">
        <div className="max-w-7xl mx-auto px-6 py-20">
          <div className="text-xs font-mono text-accent-violet uppercase tracking-widest mb-10 text-center">
            Technical Depth
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {SKILLS.map((skillGroup) => (
              <div key={skillGroup.category} className="bg-base-800/50 border border-border rounded-lg p-5">
                <div className="text-text-secondary text-xs font-mono uppercase tracking-widest mb-4">
                  {skillGroup.category}
                </div>
                <div className="flex flex-wrap gap-1.5">
                  {skillGroup.items.map((item) => (
                    <span
                      key={item}
                      className="text-xs text-text-secondary bg-base-700 border border-border rounded-md px-2 py-0.5"
                    >
                      {item}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="max-w-7xl mx-auto px-6 py-24">
        <div className="relative bg-base-800 border border-border rounded-2xl p-12 overflow-hidden text-center">
          <div className="absolute inset-0 bg-dots opacity-30" />
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-accent-violet/10 rounded-full blur-3xl" />
          <div className="relative">
            <div className="text-xs font-mono text-accent-violet uppercase tracking-widest mb-4">Ready to build?</div>
            <h2 className="text-3xl md:text-4xl font-medium text-text-primary mb-4">
              Let&apos;s build intelligent systems.
            </h2>
            <p className="text-text-secondary max-w-xl mx-auto mb-8">
              Whether you need an AI strategy, a custom agent system, or a full intelligence platform — let&apos;s map the problem and design the solution.
            </p>
            <Link
              href="/contact"
              className="inline-flex items-center gap-2 bg-accent-violet text-white px-8 py-3.5 rounded-lg font-medium hover:bg-accent-violet-dim transition-colors"
            >
              Start a conversation →
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
