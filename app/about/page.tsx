import { Metadata } from "next";
import { STORY_ARC, SKILLS, SERVICES, SITE_CONFIG } from "@/lib/data";
import { Badge } from "@/components/ui/Badge";

export const metadata: Metadata = {
  title: "About",
  description: "From culinary operations to AI systems architecture. The story of Kamogelo Kgashane.",
};

export default function AboutPage() {
  return (
    <div className="max-w-7xl mx-auto px-6 py-16">
      {/* Header */}
      <div className="max-w-2xl mb-20">
        <Badge variant="violet" className="mb-6">About</Badge>
        <h1 className="text-4xl md:text-5xl font-medium text-text-primary mb-6 leading-tight">
          I design systems that make businesses smarter.
        </h1>
        <p className="text-text-secondary text-lg leading-relaxed">
          AI Solutions Architect based in Johannesburg, South Africa.
          I build intelligent operating systems for businesses — where AI agents handle the analysis,
          coordination, and decision support so humans can focus on judgment.
        </p>
      </div>

      {/* Story arc */}
      <section className="mb-24">
        <div className="text-xs font-mono text-accent-violet uppercase tracking-widest mb-10">Origin</div>
        <div className="relative">
          {/* Vertical line */}
          <div className="absolute left-4 top-0 bottom-0 w-px bg-border hidden md:block" />

          <div className="space-y-0">
            {STORY_ARC.map((era, i) => (
              <div key={i} className="relative md:pl-14">
                {/* Dot on timeline */}
                <div className="absolute left-2.5 top-6 w-3 h-3 rounded-full border-2 border-accent-violet bg-base-900 hidden md:block" />

                <div className="bg-base-800 border border-border rounded-xl p-8 mb-4 hover:border-border-strong transition-colors">
                  <div className="flex items-start justify-between gap-4 mb-4">
                    <div>
                      <div className="text-xs font-mono text-text-tertiary mb-1">{era.period}</div>
                      <h3 className="text-text-primary font-medium text-lg">{era.title}</h3>
                    </div>
                    <span className="text-2xl">{era.icon}</span>
                  </div>
                  <p className="text-text-secondary leading-relaxed mb-4">{era.description}</p>
                  <div className="border-l-2 border-accent-violet/40 pl-4">
                    <p className="text-text-tertiary text-sm italic">&ldquo;{era.insight}&rdquo;</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Philosophy */}
      <section className="mb-24">
        <div className="text-xs font-mono text-accent-violet uppercase tracking-widest mb-10">Philosophy</div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {[
            {
              title: "Systems over solutions",
              body: "A chatbot solves a question. A system solves a category of problems. I design systems — not one-time answers.",
            },
            {
              title: "Business first, technology second",
              body: "I've run businesses. I understand what matters: decisions, cashflow, risk, time. Technology earns its place by making those better.",
            },
            {
              title: "Intelligence should be earned",
              body: "An AI agent without business context is just a slow search engine. Memory, domain knowledge, and historical decisions make intelligence real.",
            },
          ].map((p) => (
            <div key={p.title} className="bg-base-800 border border-border rounded-xl p-6">
              <h3 className="text-text-primary font-medium mb-3">{p.title}</h3>
              <p className="text-text-secondary text-sm leading-relaxed">{p.body}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Services */}
      <section className="mb-24">
        <div className="text-xs font-mono text-accent-violet uppercase tracking-widest mb-10">Services</div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {SERVICES.map((service) => (
            <div key={service.id} className="bg-base-800 border border-border rounded-xl p-6 hover:border-border-strong transition-colors">
              <div className="text-2xl mb-4">{service.icon}</div>
              <h3 className="text-text-primary font-medium text-lg mb-2">{service.title}</h3>
              <p className="text-text-secondary text-sm leading-relaxed mb-4">{service.description}</p>
              <div className="border-t border-border pt-4">
                <div className="text-xs font-mono text-text-tertiary uppercase tracking-widest mb-2">Deliverables</div>
                <div className="flex flex-wrap gap-1.5">
                  {service.deliverables.map((d) => (
                    <Badge key={d} variant="default" size="sm">{d}</Badge>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Currently */}
      <section>
        <div className="bg-base-800 border border-border-accent rounded-xl p-8">
          <div className="flex items-center gap-3 mb-6">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
            <span className="text-xs font-mono text-emerald-400 uppercase tracking-widest">Currently</span>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div>
              <div className="text-xs font-mono text-text-tertiary uppercase tracking-widest mb-2">Building</div>
              <div className="text-text-primary font-medium">LUMA AIOS</div>
              <div className="text-text-secondary text-sm">Day 6 / 90</div>
            </div>
            <div>
              <div className="text-xs font-mono text-text-tertiary uppercase tracking-widest mb-2">Location</div>
              <div className="text-text-primary font-medium">Johannesburg, South Africa</div>
              <div className="text-text-secondary text-sm">Available remotely</div>
            </div>
            <div>
              <div className="text-xs font-mono text-text-tertiary uppercase tracking-widest mb-2">Open to</div>
              <div className="text-text-primary font-medium">Consulting · Advisory</div>
              <div className="text-text-secondary text-sm">AI systems projects</div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
