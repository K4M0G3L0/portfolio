import Link from "next/link";
import { SITE_CONFIG } from "@/lib/data";

export function Footer() {
  return (
    <footer className="border-t border-border mt-32">
      <div className="max-w-7xl mx-auto px-6 py-12">
        <div className="flex flex-col md:flex-row justify-between items-start gap-8">
          <div>
            <div className="font-medium text-text-primary mb-1">{SITE_CONFIG.name}</div>
            <div className="text-text-tertiary text-sm max-w-xs">{SITE_CONFIG.description}</div>
          </div>
          <div className="flex gap-8">
            <div>
              <div className="text-text-tertiary text-xs font-mono uppercase tracking-widest mb-3">Navigate</div>
              <div className="flex flex-col gap-2">
                {[["Projects", "/projects"], ["Live Build", "/build"], ["Writing", "/writing"], ["Contact", "/contact"]].map(([label, href]) => (
                  <Link key={href} href={href} className="text-text-secondary hover:text-text-primary text-sm transition-colors">{label}</Link>
                ))}
              </div>
            </div>
            <div>
              <div className="text-text-tertiary text-xs font-mono uppercase tracking-widest mb-3">Links</div>
              <div className="flex flex-col gap-2">
                <a href={SITE_CONFIG.github} target="_blank" rel="noopener noreferrer" className="text-text-secondary hover:text-text-primary text-sm transition-colors">GitHub</a>
                <a href={`mailto:${SITE_CONFIG.email}`} className="text-text-secondary hover:text-text-primary text-sm transition-colors">Email</a>
              </div>
            </div>
          </div>
        </div>
        <div className="mt-8 pt-8 border-t border-border flex flex-col md:flex-row justify-between gap-4">
          <div className="text-text-tertiary text-xs font-mono">
            © {new Date().getFullYear()} {SITE_CONFIG.name}. Building in public.
          </div>
          <div className="text-text-tertiary text-xs font-mono">
            LUMA AIOS · Day 6/90 · Built with Next.js + Tailwind
          </div>
        </div>
      </div>
    </footer>
  );
}
