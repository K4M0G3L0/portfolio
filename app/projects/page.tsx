import { Metadata } from "next";
import Link from "next/link";
import { SYSTEMS } from "@/lib/data";
import { getAllContent } from "@/lib/mdx";
import { Badge } from "@/components/ui/Badge";
import { formatDate } from "@/lib/utils";

export const metadata: Metadata = {
  title: "Projects",
  description: "Engineering case studies — not tutorials. Each project has a problem, an architecture, and a business outcome.",
};

export default function ProjectsPage() {
  const contentProjects = getAllContent("projects");

  return (
    <div className="max-w-7xl mx-auto px-6 py-16">
      <div className="max-w-2xl mb-16">
        <Badge variant="violet" className="mb-6">Case Studies</Badge>
        <h1 className="text-4xl md:text-5xl font-medium text-text-primary mb-4 leading-tight">
          Systems I&apos;ve built and why they matter.
        </h1>
        <p className="text-text-secondary text-lg leading-relaxed">
          Not tutorials. Not demos. Each project starts with a real business problem,
          gets engineered into a system, and delivers measurable value.
        </p>
      </div>

      {/* Featured LUMA AIOS */}
      <div className="mb-12">
        <Link
          href="/projects/luma-aios"
          className="group block bg-base-800 border border-border rounded-2xl p-8 hover:border-border-accent transition-all duration-300"
        >
          <div className="flex items-start justify-between gap-4 mb-6">
            <div>
              <div className="flex items-center gap-2 mb-3">
                <Badge variant="violet">Featured</Badge>
                <Badge variant="emerald">Live Build</Badge>
              </div>
              <h2 className="text-2xl font-medium text-text-primary group-hover:text-accent-violet transition-colors">
                LUMA AIOS
              </h2>
              <p className="text-text-tertiary font-mono text-sm mt-1">AI Operating System</p>
            </div>
            <div className="text-right text-sm text-text-tertiary">
              <div className="font-mono">Day 6 / 90</div>
              <div>Active</div>
            </div>
          </div>

          <p className="text-text-secondary leading-relaxed mb-6 max-w-2xl">
            <strong className="text-text-primary">Problem:</strong> South African SMEs lose tenders
            they&apos;re qualified to win because they lack the analysis capacity to score opportunities,
            check compliance, coordinate suppliers, and manage project finances in parallel.
          </p>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
            {[
              { label: "Architecture", value: "Multi-Agent AI OS" },
              { label: "Agents", value: "5 Specialists + CEO" },
              { label: "Memory", value: "RAG + Structured" },
              { label: "Industry", value: "GovTech / ConTech" },
            ].map((stat) => (
              <div key={stat.label} className="bg-base-700 rounded-lg p-3">
                <div className="text-xs font-mono text-text-tertiary mb-1">{stat.label}</div>
                <div className="text-text-primary text-sm font-medium">{stat.value}</div>
              </div>
            ))}
          </div>

          <div className="flex flex-wrap gap-2">
            {["FastAPI", "React", "PostgreSQL", "Claude API", "RAG Pipeline", "Vector DB", "PPPFA/BBBEE"].map((t) => (
              <Badge key={t} variant="default" size="sm">{t}</Badge>
            ))}
          </div>
        </Link>
      </div>

      {/* Other systems */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
        {SYSTEMS.filter((s) => s.id !== "luma-aios").map((system) => (
          <div
            key={system.id}
            className="bg-base-800 border border-border rounded-xl p-6 hover:border-border-strong transition-all"
          >
            <div className="flex items-start justify-between mb-4">
              <div>
                <Badge
                  variant={
                    system.status === "complete" ? "emerald" :
                    system.status === "active" ? "violet" :
                    system.status === "building" ? "cyan" : "default"
                  }
                  size="sm"
                  className="mb-2"
                >
                  {system.statusLabel}
                </Badge>
                <h3 className="text-text-primary font-medium">{system.name}</h3>
                <p className="text-text-tertiary text-xs font-mono">{system.tagline}</p>
              </div>
            </div>

            <p className="text-text-secondary text-sm leading-relaxed mb-4">{system.description}</p>

            <div className="flex flex-wrap gap-1.5">
              {system.tech?.slice(0, 4).map((t) => (
                <Badge key={t} variant="default" size="sm">{t}</Badge>
              ))}
            </div>

            {system.github && (
              <a
                href={system.github}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-4 block text-xs font-mono text-text-tertiary hover:text-accent-violet transition-colors"
              >
                View on GitHub →
              </a>
            )}
          </div>
        ))}
      </div>

      {/* MDX projects */}
      {contentProjects.length > 0 && (
        <div>
          <h2 className="text-xl font-medium text-text-primary mb-6">Additional Case Studies</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {contentProjects.map((project) => (
              <Link
                key={project.slug}
                href={`/projects/${project.slug}`}
                className="group bg-base-800 border border-border rounded-xl p-6 hover:border-border-strong transition-all"
              >
                <div className="text-xs font-mono text-text-tertiary mb-2">{project.frontMatter.industry}</div>
                <h3 className="text-text-primary font-medium mb-2 group-hover:text-accent-violet transition-colors">
                  {project.frontMatter.title}
                </h3>
                <p className="text-text-secondary text-sm leading-relaxed mb-4">{project.frontMatter.description}</p>
                <div className="flex flex-wrap gap-1.5">
                  {project.frontMatter.tech?.slice(0, 4).map((t) => (
                    <Badge key={t} variant="default" size="sm">{t}</Badge>
                  ))}
                </div>
              </Link>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
