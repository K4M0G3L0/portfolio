"use client";

import { useState, useEffect } from "react";

type PageKey = "dashboard" | "bloomos" | "flowlink" | "moneyos" | "buildos";

const PAGE_TITLES: Record<PageKey, string> = {
  dashboard: "Command Center",
  bloomos: "BloomOS — Opportunity Intelligence",
  flowlink: "Flowlink — Execution Intelligence",
  moneyos: "MoneyOS — Financial Intelligence",
  buildos: "BuildOS — Construction Intelligence",
};

// ── Sub-components ──────────────────────────────────────────────────────── //

function AgentRow({
  icon, name, action, status, color,
}: {
  icon: string; name: string; action: string;
  status: string; color: string;
}) {
  return (
    <div style={{ display: "flex", alignItems: "center", gap: 10, padding: "8px 0", borderBottom: "1px solid #2A2A38" }}>
      <div style={{ width: 30, height: 30, borderRadius: 8, background: color, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 13, flexShrink: 0 }}>{icon}</div>
      <div style={{ flex: 1, minWidth: 0 }}>
        <div style={{ fontSize: 12, fontWeight: 500, color: "#F1F0F5" }}>{name}</div>
        <div style={{ fontSize: 10, color: "#5A5A70", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>{action}</div>
      </div>
      <div style={{ fontSize: 9, fontFamily: "monospace", padding: "2px 8px", borderRadius: 999, flexShrink: 0, background: status === "Active" || status === "Alert" ? "rgba(16,185,129,0.12)" : status === "Running" ? "rgba(139,92,246,0.12)" : "#18181F", color: status === "Active" || status === "Alert" ? "#10B981" : status === "Running" ? "#8B5CF6" : "#5A5A70" }}>{status}</div>
    </div>
  );
}

function TenderRow({ icon, title, meta, score, decision, pillColor }: { icon: string; title: string; meta: string; score: string; decision: string; pillColor: string }) {
  const pillStyles: Record<string, { bg: string; color: string; border: string }> = {
    green: { bg: "rgba(16,185,129,0.12)", color: "#10B981", border: "1px solid rgba(16,185,129,0.2)" },
    cyan: { bg: "rgba(6,182,212,0.12)", color: "#06B6D4", border: "1px solid rgba(6,182,212,0.2)" },
    red: { bg: "rgba(239,68,68,0.10)", color: "#EF4444", border: "1px solid rgba(239,68,68,0.2)" },
  };
  const pill = pillStyles[pillColor] || pillStyles.green;
  return (
    <div style={{ display: "flex", alignItems: "center", gap: 10, padding: "9px 0", borderBottom: "1px solid #2A2A38" }}>
      <div style={{ width: 36, height: 36, borderRadius: 8, background: pill.bg, border: pill.border, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 14, flexShrink: 0 }}>{icon}</div>
      <div style={{ flex: 1, minWidth: 0 }}>
        <div style={{ fontSize: 12, fontWeight: 500, color: "#F1F0F5", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>{title}</div>
        <div style={{ fontSize: 10, color: "#5A5A70", marginTop: 1 }}>{meta}</div>
      </div>
      <div style={{ fontSize: 12, fontWeight: 600, fontFamily: "monospace", color: "#8B5CF6", minWidth: 36, textAlign: "right" }}>{score}</div>
      <div style={{ fontSize: 9, fontFamily: "monospace", padding: "3px 8px", borderRadius: 999, whiteSpace: "nowrap", flexShrink: 0, ...pill }}>{decision}</div>
    </div>
  );
}

function ProgressRow({ label, val, pct, color }: { label: string; val: string; pct: number; color: string }) {
  return (
    <div style={{ marginBottom: 8 }}>
      <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 4 }}>
        <div style={{ fontSize: 10, color: "#9B9BAE" }}>{label}</div>
        <div style={{ fontSize: 10, fontFamily: "monospace", color: "#5A5A70" }}>{val}</div>
      </div>
      <div style={{ height: 4, background: "#202028", borderRadius: 2, overflow: "hidden" }}>
        <div style={{ height: "100%", width: `${pct}%`, background: color, borderRadius: 2 }} />
      </div>
    </div>
  );
}

function Card({ children, style }: { children: React.ReactNode; style?: React.CSSProperties }) {
  return (
    <div style={{ background: "#18181F", border: "1px solid #2A2A38", borderRadius: 10, padding: 16, ...style }}>
      {children}
    </div>
  );
}

function CardHeader({ title, right }: { title: string; right?: React.ReactNode }) {
  return (
    <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 14 }}>
      <div style={{ fontSize: 12, fontWeight: 600, color: "#F1F0F5" }}>{title}</div>
      {right}
    </div>
  );
}

function MetricCard({ label, value, sub, trend, trendColor, children }: {
  label: string; value?: string; sub?: string;
  trend?: string; trendColor?: string;
  children?: React.ReactNode;
}) {
  return (
    <div style={{ background: "#18181F", border: "1px solid #2A2A38", borderRadius: 10, padding: "14px 16px" }}>
      <div style={{ fontSize: 10, color: "#5A5A70", textTransform: "uppercase", letterSpacing: "0.06em", marginBottom: 10, fontFamily: "monospace" }}>{label}</div>
      {children || (
        <>
          <div style={{ display: "flex", alignItems: "flex-end", gap: 8, marginBottom: 4 }}>
            <div style={{ fontSize: 28, fontWeight: 600, lineHeight: 1, letterSpacing: -1, color: trendColor || "#F1F0F5" }}>{value}</div>
            {sub && <div style={{ fontSize: 10, color: "#5A5A70", paddingBottom: 3 }}>{sub}</div>}
          </div>
          {trend && <div style={{ fontSize: 10, fontFamily: "monospace", color: trendColor || "#5A5A70" }}>{trend}</div>}
        </>
      )}
    </div>
  );
}

function Insight({ type, title, msg }: { type: "high" | "med"; title: string; msg: string }) {
  const colors = { high: { bg: "rgba(245,158,11,0.07)", border: "#F59E0B" }, med: { bg: "rgba(6,182,212,0.07)", border: "#06B6D4" } };
  const c = colors[type];
  return (
    <div style={{ borderRadius: 8, padding: "10px 12px", marginBottom: 8, borderLeft: `3px solid ${c.border}`, background: c.bg }}>
      <div style={{ fontSize: 11.5, fontWeight: 500, color: "#F1F0F5", marginBottom: 3 }}>{title}</div>
      <div style={{ fontSize: 10.5, color: "#5A5A70", lineHeight: 1.5 }}>{msg}</div>
    </div>
  );
}

// ── Pages ───────────────────────────────────────────────────────────────── //

function DashboardPage() {
  return (
    <>
      {/* Metrics */}
      <div style={{ display: "grid", gridTemplateColumns: "1.4fr 1fr 1fr 1fr 1fr", gap: 12 }}>
        {/* LUMA Score */}
        <MetricCard label="LUMA Score">
          <div style={{ display: "flex", gap: 14, alignItems: "center" }}>
            <div style={{ position: "relative", width: 64, height: 64, flexShrink: 0 }}>
              <svg width="64" height="64" viewBox="0 0 64 64" style={{ transform: "rotate(-90deg)" }}>
                <circle cx="32" cy="32" r="26" fill="none" stroke="#1A1A2E" strokeWidth="6" />
                <circle cx="32" cy="32" r="26" fill="none" stroke="url(#sg)" strokeWidth="6"
                  strokeDasharray="163.4" strokeDashoffset="26" strokeLinecap="round" />
                <defs>
                  <linearGradient id="sg" x1="0%" y1="0%" x2="100%" y2="0%">
                    <stop offset="0%" stopColor="#8B5CF6" />
                    <stop offset="100%" stopColor="#06B6D4" />
                  </linearGradient>
                </defs>
              </svg>
              <div style={{ position: "absolute", inset: 0, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", fontSize: 15, fontWeight: 700, color: "#8B5CF6", lineHeight: 1.1 }}>
                84<span style={{ fontSize: 8, color: "#5A5A70", fontWeight: 400 }}>/100</span>
              </div>
            </div>
            <div>
              <div style={{ fontSize: 10, color: "#5A5A70", textTransform: "uppercase", letterSpacing: "0.06em", marginBottom: 6, fontFamily: "monospace" }}>LUMA Score</div>
              <div style={{ fontSize: 11, fontWeight: 600, color: "#10B981" }}>● Healthy</div>
              <div style={{ fontSize: 10, color: "#5A5A70" }}>Operating at capacity</div>
            </div>
          </div>
        </MetricCard>
        <MetricCard label="Opportunities" value="14" sub="active" trend="↑ 3 new this week" trendColor="#10B981" />
        <MetricCard label="Strong Bids" value="5" sub="high match" trend="2 closing in 7 days" trendColor="#8B5CF6" />
        <MetricCard label="Active Projects" value="2" sub="in execution" trend="R18.5M pipeline" trendColor="#06B6D4" />
        <MetricCard label="Agent Actions" value="47" sub="today" trend="↑ 12 from yesterday" trendColor="#F59E0B" />
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}>
        <Card>
          <CardHeader title="Agent Status" right={<span style={{ fontSize: 10, color: "#8B5CF6", fontFamily: "monospace" }}>View all →</span>} />
          <AgentRow icon="⚙" name="CEO Agent" action="Orchestrated 11 decisions today" status="Active" color="rgba(139,92,246,0.15)" />
          <AgentRow icon="🌸" name="BloomOS" action="Discovered 3 high-match tenders" status="Active" color="rgba(16,185,129,0.15)" />
          <AgentRow icon="⛓" name="Flowlink" action="FL-2026-0001 — Day 22 on site" status="Running" color="rgba(6,182,212,0.15)" />
          <AgentRow icon="💰" name="MoneyOS" action="Invoice INV-2026-2-0001 overdue 4d" status="Alert" color="rgba(245,158,11,0.15)" />
          <div style={{ display: "flex", alignItems: "center", gap: 10, padding: "8px 0" }}>
            <div style={{ width: 30, height: 30, borderRadius: 8, background: "rgba(139,92,246,0.15)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 13, flexShrink: 0 }}>🏗</div>
            <div style={{ flex: 1 }}>
              <div style={{ fontSize: 12, fontWeight: 500, color: "#F1F0F5" }}>BuildOS</div>
              <div style={{ fontSize: 10, color: "#5A5A70" }}>Programme 34% complete — on track</div>
            </div>
            <div style={{ fontSize: 9, fontFamily: "monospace", padding: "2px 8px", borderRadius: 999, background: "rgba(16,185,129,0.12)", color: "#10B981" }}>Active</div>
          </div>
        </Card>

        <Card>
          <CardHeader title="What needs your attention" right={<span style={{ fontSize: 10, color: "#8B5CF6", fontFamily: "monospace" }}>Action Center →</span>} />
          <Insight type="high" title="School tender closes in 5 days — 91% match" msg="Submission readiness: 78%. Missing: Tax Clearance PIN. Start preparation today." />
          <Insight type="high" title="Invoice R1.037M overdue — 4 days past PFMA deadline" msg="Gauteng DoE. Escalate to client finance department in writing." />
          <Insight type="med" title="Electrical subcontractor CIDB non-compliant" msg="BudgetElec CC is EP2 — EP4 required for DB installation. Suspend immediately." />
          <Insight type="med" title="Road Rehabilitation — 83% match, no bid decision" msg="R6.2M Ekurhuleni. Closing 22 Aug. Review and decide today." />
        </Card>
      </div>

      {/* Activity Feed */}
      <Card>
        <CardHeader title="Intelligence Feed" right={<span style={{ fontSize: 10, color: "#8B5CF6", fontFamily: "monospace" }}>All activity →</span>} />
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 0 }}>
          {[
            { label: "BLOOMOS", items: [{ dot: "#10B981", text: "STRONG BID — School 91% match", time: "2m ago" }, { dot: "#06B6D4", text: "CONSIDER — Road rehab R6.2M", time: "14m ago" }, { dot: "#5A5A70", text: "DO NOT BID — Clinic, CIDB gap", time: "1h ago" }] },
            { label: "FLOWLINK · BUILDOS", items: [{ dot: "#8B5CF6", text: "Foundations inspection PASSED", time: "32m ago" }, { dot: "#EF4444", text: "CIDB alert: BudgetElec EP2 insufficient", time: "1h ago" }, { dot: "#06B6D4", text: "SteelMaster confirmed delivery +2d", time: "3h ago" }] },
            { label: "MONEYOS", items: [{ dot: "#F59E0B", text: "Invoice overdue 4 days", time: "Now" }, { dot: "#EF4444", text: "Cashflow gap R620K in week 3", time: "6h ago" }, { dot: "#8B5CF6", text: "Milestone 1 invoice: R1.037M", time: "Yesterday" }] },
          ].map((col, ci) => (
            <div key={ci} style={{ padding: "0 16px", borderRight: ci < 2 ? "1px solid #2A2A38" : "none", paddingLeft: ci === 0 ? 0 : 16, paddingRight: ci === 2 ? 0 : 16 }}>
              <div style={{ fontSize: 10, color: "#5A5A70", marginBottom: 10, fontFamily: "monospace" }}>{col.label}</div>
              {col.items.map((item, ii) => (
                <div key={ii} style={{ display: "flex", gap: 10, padding: "7px 0", borderBottom: ii < 2 ? "1px solid #2A2A38" : "none" }}>
                  <div style={{ width: 6, height: 6, borderRadius: "50%", background: item.dot, marginTop: 4, flexShrink: 0 }} />
                  <div>
                    <div style={{ fontSize: 11, color: "#9B9BAE", lineHeight: 1.45 }}>{item.text}</div>
                    <div style={{ fontSize: 10, color: "#5A5A70", fontFamily: "monospace", marginTop: 2 }}>{item.time}</div>
                  </div>
                </div>
              ))}
            </div>
          ))}
        </div>
      </Card>
    </>
  );
}

function BloomOSPage() {
  return (
    <>
      <Card>
        <CardHeader title="BloomOS — Opportunity Intelligence" right={
          <div style={{ display: "flex", gap: 8 }}>
            <div style={{ fontSize: 10, fontFamily: "monospace", background: "#18181F", border: "1px solid #2A2A38", padding: "4px 10px", borderRadius: 6, cursor: "pointer", color: "#9B9BAE" }}>+ Add Tender</div>
            <div style={{ fontSize: 10, fontFamily: "monospace", background: "rgba(139,92,246,0.12)", border: "1px solid #6D28D9", padding: "4px 10px", borderRadius: 6, cursor: "pointer", color: "#8B5CF6" }}>Scan eTenders</div>
          </div>
        } />
        <div style={{ display: "flex", gap: 2, background: "#202028", borderRadius: 8, padding: 3, marginBottom: 14 }}>
          {["All Tenders (14)", "Strong Bids (5)", "Closing Soon (2)", "Decided (7)"].map((t, i) => (
            <div key={t} style={{ flex: 1, textAlign: "center", fontSize: 11, padding: "5px 8px", borderRadius: 6, cursor: "pointer", background: i === 0 ? "#18181F" : "transparent", color: i === 0 ? "#F1F0F5" : "#5A5A70", fontWeight: i === 0 ? 500 : 400 }}>{t}</div>
          ))}
        </div>
        <TenderRow icon="🏫" title="Construction of 24-Classroom School, Soweto — Gauteng DoE" meta="Gauteng · R9.5M · Closes 15 Aug · CIDB 5GB required" score="91%" decision="STRONG BID" pillColor="green" />
        <TenderRow icon="🛣" title="Road Rehabilitation Project — Ekurhuleni Municipality" meta="Gauteng · R6.2M · Closes 22 Aug · CIDB 4CE required" score="83%" decision="STRONG BID" pillColor="green" />
        <TenderRow icon="🏥" title="Tembisa Clinic Extension — Ekurhuleni Health" meta="Gauteng · R4.1M · Closes 10 Sep · CIDB 4GB required" score="74%" decision="CONSIDER" pillColor="cyan" />
        <TenderRow icon="⚡" title="Electrical Upgrade — Johannesburg City Power" meta="Gauteng · R2.8M · Closes 5 Sep · EP6 required" score="41%" decision="DO NOT BID" pillColor="red" />
      </Card>

      <Card>
        <CardHeader title="Decision Passport — School Construction" right={<span style={{ fontSize: 10, color: "#10B981", fontFamily: "monospace" }}>● Confidence: 87%</span>} />
        <div style={{ background: "#202028", borderRadius: 8, padding: 12, marginTop: 8 }}>
          <div style={{ fontFamily: "monospace", fontSize: 10, color: "#8B5CF6", marginBottom: 8 }}>LUMA-202607-0042</div>
          {[
            ["Decision", "STRONG BID", "#10B981"],
            ["CIDB Grade", "5GB (required: 4GB) ✓", "#F1F0F5"],
            ["BBBEE Level", "Level 1 — 20/20 preference points", "#F1F0F5"],
            ["PPPFA Score", "91/100 (80/20 system)", "#F1F0F5"],
            ["Submission Readiness", "78% — Missing: Tax Clearance PIN", "#F59E0B"],
            ["Agent", "CEO Agent + Procurement Specialist", "#F1F0F5"],
            ["Review Status", "Pending human review", "#5A5A70"],
          ].map(([k, v, c], i) => (
            <div key={k} style={{ display: "flex", justifyContent: "space-between", padding: "5px 0", borderBottom: i < 6 ? "1px solid #2A2A38" : "none" }}>
              <div style={{ fontSize: 10, color: "#5A5A70" }}>{k}</div>
              <div style={{ fontSize: 10, fontWeight: 500, color: c }}>{v}</div>
            </div>
          ))}
        </div>
      </Card>
    </>
  );
}

function FlowlinkPage() {
  return (
    <>
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 12 }}>
        <MetricCard label="Active Projects" value="2" trend="R18.5M total value" trendColor="#06B6D4" />
        <MetricCard label="Avg Completion" value="34%" trend="On track" trendColor="#10B981" />
        <MetricCard label="Deliveries Logged" value="18" trend="SHA-256 verified" trendColor="#8B5CF6" />
      </div>
      <Card>
        <CardHeader title="FL-2026-0001 — School Construction, Soweto" right={<span style={{ fontSize: 9, fontFamily: "monospace", padding: "3px 8px", borderRadius: 999, background: "rgba(16,185,129,0.12)", color: "#10B981", border: "1px solid rgba(16,185,129,0.2)" }}>Active</span>} />
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 20 }}>
          <div>
            <div style={{ fontSize: 10, color: "#5A5A70", marginBottom: 8, fontFamily: "monospace" }}>MILESTONE PROGRESS</div>
            <ProgressRow label="Mobilisation" val="Paid ✓" pct={100} color="#10B981" />
            <ProgressRow label="20% Works" val="Invoiced" pct={100} color="#F59E0B" />
            <ProgressRow label="50% Works" val="34% done" pct={34} color="#8B5CF6" />
            <ProgressRow label="80% Works" val="–" pct={0} color="#2A2A38" />
            <ProgressRow label="Practical Completion" val="–" pct={0} color="#2A2A38" />
          </div>
          <div>
            <div style={{ fontSize: 10, color: "#5A5A70", marginBottom: 8, fontFamily: "monospace" }}>SUPPLIERS</div>
            <AgentRow icon="🧱" name="BrickMaster Supplies" action="50,000 face bricks · R450K" status="Active" color="rgba(16,185,129,0.12)" />
            <AgentRow icon="⚙" name="SteelMaster Suppliers" action="Structural steel · R620K (+2 days)" status="Running" color="rgba(245,158,11,0.12)" />
            <AgentRow icon="🏗" name="CementPro CC" action="2,000 bags cement · R85K" status="Idle" color="rgba(90,90,112,0.15)" />
          </div>
        </div>
      </Card>
    </>
  );
}

function MoneyOSPage() {
  return (
    <>
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 12 }}>
        <MetricCard label="Total Invoiced" value="R2.1M" trend="2 invoices" trendColor="#10B981" />
        <MetricCard label="Cash Received" value="R1.1M" trend="Milestone 1 paid" trendColor="#06B6D4" />
        <MetricCard label="Cashflow Gap (Wk3)" value="R620K" trend="Suppliers due before payment" trendColor="#EF4444" />
      </div>
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}>
        <Card>
          <CardHeader title="Invoices" />
          <TenderRow icon="📄" title="INV-2026-2-0001 — Mobilisation milestone" meta="Gross R950K · VAT R135K · Total R1.037M" score="" decision="4d overdue" pillColor="red" />
          <TenderRow icon="📄" title="INV-2026-2-0002 — 20% works completion" meta="Gross R1.9M · VAT R270K · Total R2.07M" score="" decision="Draft" pillColor="cyan" />
        </Card>
        <Card>
          <CardHeader title="Margin Tracker" />
          {[
            ["Estimated margin", "15.0%", "#F1F0F5"],
            ["Actual margin (to date)", "13.8%", "#10B981"],
            ["Trend", "Declining ↓", "#F59E0B"],
            ["BBBEE spend", "62%", "#F1F0F5"],
          ].map(([k, v, c]) => (
            <div key={k} style={{ display: "flex", justifyContent: "space-between", marginBottom: 8 }}>
              <div style={{ fontSize: 11, color: "#5A5A70" }}>{k}</div>
              <div style={{ fontSize: 11, fontFamily: "monospace", color: c }}>{v}</div>
            </div>
          ))}
          <div style={{ display: "flex", alignItems: "flex-end", gap: 3, height: 40, marginTop: 10 }}>
            {[60, 75, 65, 70, 55, 52, 50].map((h, i) => (
              <div key={i} style={{ flex: 1, height: `${h}%`, borderRadius: "2px 2px 0 0", background: i < 4 ? "#8B5CF6" : "#F59E0B", opacity: 0.8 }} />
            ))}
          </div>
          <div style={{ fontSize: 9, color: "#5A5A70", marginTop: 4, fontFamily: "monospace" }}>7-week margin trend</div>
        </Card>
      </div>
    </>
  );
}

function BuildOSPage() {
  return (
    <>
      <Card>
        <CardHeader title="BuildOS — Construction Intelligence" right={<span style={{ fontSize: 9, fontFamily: "monospace", padding: "3px 8px", borderRadius: 999, background: "rgba(16,185,129,0.12)", color: "#10B981", border: "1px solid rgba(16,185,129,0.2)" }}>Programme on track</span>} />
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 }}>
          <div>
            <div style={{ fontSize: 10, color: "#5A5A70", marginBottom: 8, fontFamily: "monospace" }}>PROGRAMME — PROG-FL-2026-0001</div>
            <ProgressRow label="Mobilisation" val="100%" pct={100} color="#10B981" />
            <ProgressRow label="Substructure" val="100%" pct={100} color="#10B981" />
            <ProgressRow label="Superstructure" val="45%" pct={45} color="#F59E0B" />
            <ProgressRow label="Roof" val="Not started" pct={0} color="#2A2A38" />
            <ProgressRow label="Services" val="Not started" pct={0} color="#2A2A38" />
          </div>
          <div>
            <div style={{ fontSize: 10, color: "#5A5A70", marginBottom: 8, fontFamily: "monospace" }}>BUILD AGENT — LAST RESPONSE</div>
            <div style={{ background: "#202028", borderRadius: 8, padding: 12, marginBottom: 8 }}>
              <div style={{ fontSize: 10, color: "#5A5A70", marginBottom: 4, fontFamily: "monospace" }}>QUERY</div>
              <div style={{ fontSize: 11, color: "#8B5CF6", marginBottom: 6 }}>&ldquo;Why is Project Alpha behind?&rdquo;</div>
              <div style={{ fontSize: 11, color: "#9B9BAE", lineHeight: 1.5 }}>Superstructure 45% vs 52% planned — 5 days behind on brickwork. Primary cause: SteelMaster delivery delay (+2 days) on critical path. Recommendation: add second brickwork crew to recover ~3 days.</div>
              <div style={{ fontSize: 9, color: "#5A5A70", marginTop: 6, fontFamily: "monospace" }}>Confidence: 82% · Programme, Flowlink, BuildOS</div>
            </div>
            <div style={{ fontSize: 10, color: "#5A5A70", marginBottom: 8, fontFamily: "monospace" }}>CIDB COMPLIANCE</div>
            <AgentRow icon="⚡" name="PowerPro Electrical" action="EP4 · DB installation" status="Active" color="rgba(16,185,129,0.12)" />
            <AgentRow icon="⚡" name="BudgetElec CC" action="EP2 — EP4 required" status="Idle" color="rgba(239,68,68,0.10)" />
          </div>
        </div>
      </Card>

      <Card>
        <CardHeader title="Delay Prediction Engine" right={<span style={{ fontSize: 10, color: "#F59E0B", fontFamily: "monospace" }}>Risk: Medium</span>} />
        <div style={{ display: "grid", gridTemplateColumns: "repeat(4,1fr)", gap: 12 }}>
          {[
            { val: "28%", label: "Delay probability", color: "#F59E0B" },
            { val: "5", label: "Expected delay days", color: "#06B6D4" },
            { val: "R34K", label: "Penalty exposure", color: "#9B9BAE" },
            { val: "75%", label: "Confidence", color: "#10B981" },
          ].map(({ val, label, color }) => (
            <div key={label} style={{ textAlign: "center", padding: 12, background: "#202028", borderRadius: 8 }}>
              <div style={{ fontSize: 22, fontWeight: 700, color }}>{val}</div>
              <div style={{ fontSize: 10, color: "#5A5A70", marginTop: 4 }}>{label}</div>
            </div>
          ))}
        </div>
      </Card>
    </>
  );
}

// ── Main Component ──────────────────────────────────────────────────────── //

export function LumaDemo() {
  const [page, setPage] = useState<PageKey>("dashboard");
  const [time, setTime] = useState("--:--:--");

  useEffect(() => {
    const update = () => {
      const cat = new Intl.DateTimeFormat("en-ZA", {
        timeZone: "Africa/Johannesburg",
        hour: "2-digit", minute: "2-digit", second: "2-digit", hour12: false,
      }).format(new Date());
      setTime(cat);
    };
    update();
    const interval = setInterval(update, 1000);
    return () => clearInterval(interval);
  }, []);

  const navItems: { key: PageKey; icon: string; label: string; badge?: string; dotColor?: string }[] = [
    { key: "dashboard", icon: "⌂", label: "Command Center" },
    { key: "bloomos", icon: "🌸", label: "BloomOS", badge: "14", dotColor: "#10B981" },
    { key: "flowlink", icon: "⛓", label: "Flowlink", dotColor: "#06B6D4" },
    { key: "moneyos", icon: "💰", label: "MoneyOS", dotColor: "#F59E0B" },
    { key: "buildos", icon: "🏗", label: "BuildOS", dotColor: "#8B5CF6" },
  ];

  return (
    <div style={{ display: "flex", height: "100vh", background: "#0A0A0F", color: "#F1F0F5", fontFamily: "-apple-system, BlinkMacSystemFont, 'Inter', sans-serif", fontSize: 13, overflow: "hidden" }}>

      {/* Sidebar */}
      <nav style={{ width: 220, minWidth: 220, background: "#111118", borderRight: "1px solid #2A2A38", display: "flex", flexDirection: "column" }}>
        {/* Brand */}
        <div style={{ padding: "18px 16px 14px", borderBottom: "1px solid #2A2A38" }}>
          <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 2 }}>
            <div style={{ width: 28, height: 28, borderRadius: 7, background: "linear-gradient(135deg, #8B5CF6, #06B6D4)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 13 }}>⚙</div>
            <span style={{ fontWeight: 600, fontSize: 14, letterSpacing: -0.3 }}>LUMA AIOS</span>
          </div>
          <div style={{ fontSize: 10, color: "#5A5A70", fontFamily: "monospace" }}>v0.10.0 · Day 22/90</div>
        </div>

        {/* Nav */}
        <div style={{ padding: "14px 10px 4px" }}>
          <div style={{ fontSize: 9, color: "#5A5A70", letterSpacing: "0.08em", textTransform: "uppercase", padding: "0 6px 6px" }}>Intelligence</div>
          {navItems.map(({ key, label, badge, dotColor }) => (
            <div
              key={key}
              onClick={() => setPage(key)}
              style={{ display: "flex", alignItems: "center", gap: 9, padding: "7px 10px", borderRadius: 7, cursor: "pointer", fontSize: 12.5, color: page === key ? "#F1F0F5" : "#9B9BAE", background: page === key ? "rgba(139,92,246,0.12)" : "transparent", marginBottom: 1, transition: "all 0.15s" }}
            >
              <div style={{ width: 5, height: 5, borderRadius: "50%", background: page === key ? (dotColor || "#8B5CF6") : "#5A5A70", flexShrink: 0 }} />
              {label}
              {badge && <div style={{ marginLeft: "auto", fontSize: 9, fontFamily: "monospace", background: "rgba(139,92,246,0.12)", color: "#8B5CF6", padding: "1px 6px", borderRadius: 999, border: "1px solid #6D28D9" }}>{badge}</div>}
            </div>
          ))}
        </div>

        <div style={{ padding: "14px 10px 4px" }}>
          <div style={{ fontSize: 9, color: "#5A5A70", letterSpacing: "0.08em", textTransform: "uppercase", padding: "0 6px 6px" }}>Platform</div>
          {["Organizations", "AI Agents", "Documents", "Transparency", "Action Center"].map(item => (
            <div key={item} style={{ display: "flex", alignItems: "center", gap: 9, padding: "7px 10px", borderRadius: 7, cursor: "pointer", fontSize: 12.5, color: "#9B9BAE", marginBottom: 1 }}>
              <div style={{ width: 5, height: 5, borderRadius: "50%", background: "#5A5A70", flexShrink: 0 }} />
              {item}
              {item === "Action Center" && <div style={{ marginLeft: "auto", fontSize: 9, fontFamily: "monospace", background: "rgba(139,92,246,0.12)", color: "#8B5CF6", padding: "1px 6px", borderRadius: 999, border: "1px solid #6D28D9" }}>3</div>}
            </div>
          ))}
        </div>

        {/* Footer */}
        <div style={{ marginTop: "auto", padding: "12px 10px", borderTop: "1px solid #2A2A38", display: "flex", alignItems: "center", gap: 9 }}>
          <div style={{ width: 28, height: 28, borderRadius: 7, background: "linear-gradient(135deg, #6D28D9, #06B6D4)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 11, fontWeight: 600 }}>KK</div>
          <div>
            <div style={{ fontSize: 12, fontWeight: 500 }}>Kamogelo K.</div>
            <div style={{ fontSize: 10, color: "#5A5A70" }}>AI Solutions Architect</div>
          </div>
        </div>
      </nav>

      {/* Main */}
      <div style={{ flex: 1, display: "flex", flexDirection: "column", overflow: "hidden" }}>
        {/* Topbar */}
        <div style={{ height: 52, minHeight: 52, background: "#111118", borderBottom: "1px solid #2A2A38", display: "flex", alignItems: "center", padding: "0 20px", gap: 16 }}>
          <div style={{ fontSize: 14, fontWeight: 600, flex: 1 }}>{PAGE_TITLES[page]}</div>
          <div style={{ display: "flex", alignItems: "center", gap: 6, fontSize: 10, fontFamily: "monospace", color: "#10B981" }}>
            <div style={{ width: 6, height: 6, borderRadius: "50%", background: "#10B981", animation: "pulse 2s infinite" }} />
            LIVE
          </div>
          <div style={{ fontSize: 11, fontFamily: "monospace", color: "#5A5A70" }}>{time} CAT</div>
          <a href="/build" style={{ fontSize: 10, fontFamily: "monospace", color: "#5A5A70", textDecoration: "none", padding: "4px 10px", border: "1px solid #2A2A38", borderRadius: 6 }}>← Live Build</a>
        </div>

        {/* Content */}
        <div style={{ flex: 1, overflowY: "auto", padding: 20, display: "flex", flexDirection: "column", gap: 12 }}>
          <style>{`@keyframes pulse { 0%,100% { opacity: 1; } 50% { opacity: 0.4; } }`}</style>
          {page === "dashboard" && <DashboardPage />}
          {page === "bloomos" && <BloomOSPage />}
          {page === "flowlink" && <FlowlinkPage />}
          {page === "moneyos" && <MoneyOSPage />}
          {page === "buildos" && <BuildOSPage />}
        </div>
      </div>
    </div>
  );
}
