"use client";

import { useState } from "react";
import { Badge } from "@/components/ui/Badge";
import { SERVICES, SITE_CONFIG } from "@/lib/data";

export default function ContactPage() {
  const [form, setForm] = useState({ name: "", email: "", company: "", message: "", type: "consulting" });
  const [sent, setSent] = useState(false);
  const [sending, setSending] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSending(true);
    await new Promise((r) => setTimeout(r, 1000));
    setSent(true);
    setSending(false);
  };

  return (
    <div className="max-w-7xl mx-auto px-6 py-16">
      <div className="max-w-2xl mb-16">
        <Badge variant="violet" className="mb-6">Contact</Badge>
        <h1 className="text-4xl md:text-5xl font-medium text-text-primary mb-4 leading-tight">
          Let&apos;s build intelligent systems.
        </h1>
        <p className="text-text-secondary text-lg leading-relaxed">
          Whether you have a specific project in mind or just want to explore what AI systems
          could do for your business — start with a message.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-5 gap-12">
        {/* Form */}
        <div className="lg:col-span-3">
          {sent ? (
            <div className="bg-emerald-500/10 border border-emerald-500/30 rounded-xl p-8 text-center">
              <div className="text-emerald-400 text-3xl mb-4">✓</div>
              <h3 className="text-text-primary font-medium text-lg mb-2">Message received</h3>
              <p className="text-text-secondary">I&apos;ll be in touch within 24 hours.</p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-5">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                <div>
                  <label className="block text-xs font-mono text-text-tertiary uppercase tracking-widest mb-2">Name *</label>
                  <input
                    type="text"
                    required
                    value={form.name}
                    onChange={(e) => setForm({ ...form, name: e.target.value })}
                    placeholder="Your name"
                    className="w-full bg-base-800 border border-border rounded-lg px-4 py-3 text-text-primary placeholder:text-text-tertiary text-sm focus:outline-none focus:border-accent-violet transition-colors"
                  />
                </div>
                <div>
                  <label className="block text-xs font-mono text-text-tertiary uppercase tracking-widest mb-2">Email *</label>
                  <input
                    type="email"
                    required
                    value={form.email}
                    onChange={(e) => setForm({ ...form, email: e.target.value })}
                    placeholder="you@company.com"
                    className="w-full bg-base-800 border border-border rounded-lg px-4 py-3 text-text-primary placeholder:text-text-tertiary text-sm focus:outline-none focus:border-accent-violet transition-colors"
                  />
                </div>
              </div>
              <div>
                <label className="block text-xs font-mono text-text-tertiary uppercase tracking-widest mb-2">Company</label>
                <input
                  type="text"
                  value={form.company}
                  onChange={(e) => setForm({ ...form, company: e.target.value })}
                  placeholder="Company name"
                  className="w-full bg-base-800 border border-border rounded-lg px-4 py-3 text-text-primary placeholder:text-text-tertiary text-sm focus:outline-none focus:border-accent-violet transition-colors"
                />
              </div>
              <div>
                <label className="block text-xs font-mono text-text-tertiary uppercase tracking-widest mb-2">Interest</label>
                <select
                  value={form.type}
                  onChange={(e) => setForm({ ...form, type: e.target.value })}
                  className="w-full bg-base-800 border border-border rounded-lg px-4 py-3 text-text-primary text-sm focus:outline-none focus:border-accent-violet transition-colors"
                >
                  <option value="consulting">AI Strategy & Consulting</option>
                  <option value="rag">RAG / Knowledge System</option>
                  <option value="agents">Custom AI Agent System</option>
                  <option value="automation">Business Intelligence Automation</option>
                  <option value="other">Other</option>
                </select>
              </div>
              <div>
                <label className="block text-xs font-mono text-text-tertiary uppercase tracking-widest mb-2">Message *</label>
                <textarea
                  required
                  rows={5}
                  value={form.message}
                  onChange={(e) => setForm({ ...form, message: e.target.value })}
                  placeholder="Describe your business problem, project, or question..."
                  className="w-full bg-base-800 border border-border rounded-lg px-4 py-3 text-text-primary placeholder:text-text-tertiary text-sm focus:outline-none focus:border-accent-violet transition-colors resize-none"
                />
              </div>
              <button
                type="submit"
                disabled={sending}
                className="w-full bg-accent-violet text-white py-3.5 rounded-lg font-medium hover:bg-accent-violet-dim transition-colors disabled:opacity-50"
              >
                {sending ? "Sending..." : "Send message →"}
              </button>
            </form>
          )}
        </div>

        {/* Info panel */}
        <div className="lg:col-span-2 space-y-6">
          <div className="bg-base-800 border border-border rounded-xl p-6">
            <div className="text-xs font-mono text-text-tertiary uppercase tracking-widest mb-4">Direct</div>
            <a
              href={`mailto:${SITE_CONFIG.email}`}
              className="text-text-primary hover:text-accent-violet transition-colors font-medium"
            >
              {SITE_CONFIG.email}
            </a>
            <div className="mt-4 flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
              <span className="text-text-secondary text-sm">Typically responds within 24 hours</span>
            </div>
          </div>

          <div className="bg-base-800 border border-border rounded-xl p-6">
            <div className="text-xs font-mono text-text-tertiary uppercase tracking-widest mb-4">I work on</div>
            <div className="space-y-3">
              {SERVICES.map((s) => (
                <div key={s.id} className="flex items-start gap-3">
                  <span>{s.icon}</span>
                  <div>
                    <div className="text-text-primary text-sm font-medium">{s.title}</div>
                    <div className="text-text-tertiary text-xs">{s.description.split(".")[0]}.</div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-base-800 border border-border rounded-xl p-6">
            <div className="text-xs font-mono text-text-tertiary uppercase tracking-widest mb-4">Find me</div>
            <a href={SITE_CONFIG.github} target="_blank" rel="noopener noreferrer"
               className="text-text-secondary hover:text-text-primary text-sm transition-colors block mb-2">
              GitHub: K4M0G3L0 →
            </a>
            <span className="text-text-secondary text-sm">Johannesburg, South Africa</span>
          </div>
        </div>
      </div>
    </div>
  );
}
