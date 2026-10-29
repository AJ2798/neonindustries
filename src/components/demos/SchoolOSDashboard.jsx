// Interactive replica of the SchoolOS desktop shell + Overview page
// (schoolos/front-end-app/src/components/dashboard). Runs on synthetic
// data only — nothing here talks to a SchoolOS backend.
import { useState } from "react";
import {
  Award, BadgeDollarSign, Bell, Boxes, Briefcase, Building2, CalendarCheck, CalendarDays,
  ChartColumn, ChevronDown, ChevronRight, ChevronsUpDown, ClipboardCheck, ClipboardList, Coins,
  Contact, FileSpreadsheet, FileText, GraduationCap, HandCoins, Handshake, KeyRound, Landmark,
  LayoutDashboard, Moon, Package, PackageCheck, PanelLeftClose, Receipt, RefreshCw, School,
  ScrollText, Search, Settings, ShoppingCart, Store, Sun, TrendingUp, UserCog, UserPlus, UsersRound,
  Workflow, ArrowUpRight, ArrowDownRight, ArrowRight, Wallet,
} from "lucide-react";
import "./schoolos.css";

const NAV = [
  { id: "overview", label: "Dashboard", icon: LayoutDashboard },
  { id: "reports", label: "Reports", icon: ChartColumn },
  {
    group: "People",
    items: [
      { id: "students", label: "Students", icon: GraduationCap },
      { id: "guardians", label: "Parents & Guardians", icon: Contact },
      { id: "teachers", label: "Staff", icon: Briefcase },
    ],
  },
  {
    group: "Academics",
    items: [
      { id: "department", label: "Departments", icon: Building2 },
      { id: "classes", label: "Classes", icon: School },
      { id: "attendance", label: "Attendance", icon: CalendarCheck },
      { id: "grades", label: "Examinations", icon: ClipboardCheck },
      { id: "performance", label: "Performance", icon: TrendingUp },
    ],
  },
  {
    group: "Finance",
    items: [
      { id: "fees", label: "Fees", icon: Coins },
      { id: "income", label: "Income", icon: HandCoins },
      { id: "financial-accounts", label: "Accounts", icon: Landmark },
      { id: "expenses", label: "Expenses", icon: Receipt },
      { id: "assets", label: "Assets", icon: Package },
      { id: "inventory", label: "Inventory", icon: Boxes },
    ],
  },
  {
    group: "Procurement",
    items: [
      { id: "purchases", label: "Purchase Requests", icon: ShoppingCart },
      { id: "rfqs", label: "RFQs", icon: FileSpreadsheet },
      { id: "quotations", label: "Supplier Quotations", icon: Handshake },
      { id: "purchase-orders", label: "Purchase Orders", icon: FileText },
      { id: "goods-receipts", label: "Goods Receipts", icon: PackageCheck },
      { id: "suppliers", label: "Suppliers", icon: Store },
    ],
  },
  {
    group: "Payroll",
    items: [
      { id: "payroll", label: "Payroll Runs", icon: BadgeDollarSign },
      { id: "payslips", label: "Payslips", icon: FileText },
      { id: "salary-profiles", label: "Salary Profiles", icon: UserCog },
      { id: "payroll-setup", label: "Setup", icon: Settings },
    ],
  },
  {
    group: "Administration",
    items: [
      { id: "academic", label: "Academic Years", icon: CalendarDays },
      { id: "notifications", label: "Notifications", icon: Bell },
      { id: "settings", label: "School Settings", icon: School },
      { id: "approval-policies", label: "Approval Policies", icon: Workflow },
      { id: "users", label: "User Management", icon: UsersRound },
      { id: "roles", label: "Roles & Permissions", icon: KeyRound },
      { id: "audit", label: "Audit Log", icon: ScrollText },
    ],
  },
];

const ALL_ITEMS = NAV.flatMap((n) => (n.items ? n.items : [n]));
const MOBILE_TABS = ["overview", "students", "fees", "payroll", "attendance"];

const PAGE_META = {
  overview: { title: "Dashboard", sub: "Here's what's happening across Northgate Academy today." },
  students: { title: "Students", sub: "Enrolment, guardians and class placement across both campuses." },
  fees: { title: "Fees", sub: "Term 3 invoices, collections and outstanding balances." },
  payroll: { title: "Payroll Runs", sub: "Monthly runs, approvals and net pay." },
  attendance: { title: "Attendance", sub: "Daily registers by class." },
};

const STUDENTS = [
  { name: "Mutale Banda", id: "NGA-2024-0412", cls: "Grade 10B", guardian: "Esther Banda", status: ["Partial", "warning"], balance: "K1,700.00" },
  { name: "Thandiwe Phiri", id: "NGA-2023-0198", cls: "Grade 11A", guardian: "Joseph Phiri", status: ["Paid", "success"], balance: "K0.00" },
  { name: "Bwalya Mulenga", id: "NGA-2025-0077", cls: "Grade 8C", guardian: "Grace Mulenga", status: ["Unpaid", "danger"], balance: "K4,200.00" },
  { name: "Natasha Zulu", id: "NGA-2022-0341", cls: "Grade 12A", guardian: "Peter Zulu", status: ["Paid", "success"], balance: "K0.00" },
  { name: "Kondwani Tembo", id: "NGA-2024-0260", cls: "Grade 9B", guardian: "Ruth Tembo", status: ["Partial", "warning"], balance: "K2,050.00" },
  { name: "Chipo Lungu", id: "NGA-2025-0103", cls: "Grade 7A", guardian: "Moses Lungu", status: ["Paid", "success"], balance: "K0.00" },
  { name: "Mwila Sakala", id: "NGA-2023-0455", cls: "Grade 10A", guardian: "Agnes Sakala", status: ["Unpaid", "danger"], balance: "K4,200.00" },
];

const INVOICES = [
  { no: "INV-1024", student: "Mutale Banda", term: "Term 3 · 2026", total: "K4,200.00", paid: "K2,500.00", status: ["Partial", "warning"] },
  { no: "INV-1025", student: "Thandiwe Phiri", term: "Term 3 · 2026", total: "K4,650.00", paid: "K4,650.00", status: ["Paid", "success"] },
  { no: "INV-1026", student: "Bwalya Mulenga", term: "Term 3 · 2026", total: "K4,200.00", paid: "K0.00", status: ["Overdue", "danger"] },
  { no: "INV-1027", student: "Natasha Zulu", term: "Term 3 · 2026", total: "K5,100.00", paid: "K5,100.00", status: ["Paid", "success"] },
  { no: "INV-1028", student: "Kondwani Tembo", term: "Term 3 · 2026", total: "K4,200.00", paid: "K2,150.00", status: ["Partial", "warning"] },
  { no: "INV-1029", student: "Chipo Lungu", term: "Term 3 · 2026", total: "K3,800.00", paid: "K3,800.00", status: ["Paid", "success"] },
];

const PAYROLL = [
  { period: "October 2026", staff: 86, gross: "K468,900.00", net: "K386,200.00", status: ["Awaiting approval", "warning"] },
  { period: "September 2026", staff: 85, gross: "K462,300.00", net: "K381,050.00", status: ["Paid", "success"] },
  { period: "August 2026", staff: 85, gross: "K462,300.00", net: "K381,050.00", status: ["Paid", "success"] },
  { period: "July 2026", staff: 83, gross: "K451,700.00", net: "K372,480.00", status: ["Paid", "success"] },
];

const ATTENDANCE = [
  { cls: "Grade 7A", teacher: "Mrs. Mwansa", present: 38, total: 40 },
  { cls: "Grade 8C", teacher: "Mr. Chilufya", present: 35, total: 39 },
  { cls: "Grade 9B", teacher: "Ms. Kabwe", present: 41, total: 42 },
  { cls: "Grade 10B", teacher: "Mr. Ngoma", present: 36, total: 40 },
  { cls: "Grade 11A", teacher: "Mrs. Daka", present: 33, total: 34 },
  { cls: "Grade 12A", teacher: "Mr. Siame", present: 30, total: 31 },
];

const ACTIVITY = [
  { who: "EB", tone: "success", text: <><strong>Esther Banda</strong> paid <strong>K2,500.00</strong> against INV-1024</>, module: "fees", when: "12 min ago" },
  { who: "JN", tone: "brand", text: <><strong>John Ngoma</strong> submitted October payroll for approval</>, module: "payroll", when: "1 hr ago" },
  { who: "MK", tone: "warning", text: <><strong>Mary Kabwe</strong> raised PR-0087 for science lab consumables</>, module: "purchases", when: "3 hrs ago" },
  { who: "PD", tone: "info", text: <><strong>Paul Daka</strong> published Grade 11 mid-term results</>, module: "assessments", when: "Yesterday" },
];

const QUICK = [
  { label: "Enrol a student", desc: "Admission, class and guardian", icon: UserPlus, tone: "brand", go: "students" },
  { label: "Record a payment", desc: "Against an open invoice", icon: Wallet, tone: "success", go: "fees" },
  { label: "Take attendance", desc: "Today's class registers", icon: ClipboardList, tone: "info", go: "attendance" },
  { label: "Run payroll", desc: "October 2026 · 86 staff", icon: BadgeDollarSign, tone: "warning", go: "payroll" },
];

const toneVars = (tone) => ({
  color: `var(--sos-${tone}-text)`,
  background: `var(--sos-${tone}-soft)`,
});

function StatCard({ icon: Icon, label, value, change, trend, tone, bars, onClick }) {
  const color = `var(--sos-${tone}-text)`;
  const TrendIcon = trend === "up" ? ArrowUpRight : trend === "down" ? ArrowDownRight : ArrowRight;
  return (
    <button type="button" className="sos-kpi" onClick={onClick} style={{ "--stat-color": color }}>
      <div className="sos-kpi-label">{label}</div>
      <div className="sos-kpi-value">{value}</div>
      <span className="sos-kpi-icon" style={toneVars(tone)}><Icon size={18} /></span>
      <div className="stat-bars" aria-hidden="true">
        {bars.map((v, i) => (
          <span
            key={i}
            style={{
              height: `${Math.max(v * 100, 8)}%`,
              background: i === bars.length - 1 ? color : `color-mix(in srgb, ${color} 25%, transparent)`,
            }}
          />
        ))}
      </div>
      <div className="stat-change" data-tone={trend === "up" ? "success" : trend === "down" ? "danger" : "neutral"}>
        <TrendIcon size={14} />
        <span>{change}</span>
      </div>
    </button>
  );
}

function Overview({ go }) {
  const [refreshing, setRefreshing] = useState(false);
  const refresh = () => {
    setRefreshing(true);
    setTimeout(() => setRefreshing(false), 900);
  };
  const today = new Date().toLocaleDateString(undefined, { weekday: "long", day: "numeric", month: "long" });

  return (
    <div className="ov-root">
      <section className="ov-hero">
        <div>
          <div className="ov-hero-date">{today}</div>
          <div className="ov-hero-name">Chanda Mwila</div>
          <div className="ov-hero-meta">
            <span className="ov-role"><span className="ov-role-dot" />School Administrator</span>
            <span>·</span><span>14 modules</span>
            <span>·</span><span>212 permissions</span>
          </div>
        </div>
        <button type="button" className="sos-btn" onClick={refresh} disabled={refreshing}>
          <RefreshCw size={15} className={refreshing ? "ov-spin" : undefined} />
          <span>{refreshing ? "Refreshing…" : "Refresh"}</span>
        </button>
      </section>

      <div className="ov-stats">
        <StatCard icon={GraduationCap} label="Total Students" value="1,284" change="+46 new this term" trend="up" tone="info"
          bars={[0.62, 0.66, 0.7, 0.72, 0.78, 0.82, 0.9]} onClick={() => go("students")} />
        <StatCard icon={CalendarCheck} label="Attendance Today" value="94.2%" change="1,209 of 1,284 present" trend="up" tone="success"
          bars={[0.9, 0.92, 0.88, 0.93, 0.91, 0.95, 0.94]} onClick={() => go("attendance")} />
        <StatCard icon={Award} label="Average Grade" value="71.4%" change="Across 3,912 scored assessments" trend="up" tone="brand"
          bars={[0.75, 0.74, 0.76, 0.73, 0.74, 0.73, 0.71]} onClick={() => go("grades")} />
        <StatCard icon={Briefcase} label="Active Staff" value="86" change="Teaching and support staff" trend={null} tone="warning"
          bars={[0.65, 0.69, 0.72, 0.76, 0.8, 0.86, 0.9]} onClick={() => go("teachers")} />
      </div>

      <section className="sos-card">
        <div className="sos-card-header">
          <div>
            <div className="sos-card-title">Finance and operations</div>
            <div className="sos-card-sub">Collections, payroll, spending and approvals</div>
          </div>
        </div>
        <div className="ov-metrics">
          <button type="button" className="ov-metric" data-tone="warning" onClick={() => go("fees")}>
            <span className="ov-metric-label">Fee collection rate</span>
            <span className="ov-metric-value">78%</span>
            <span className="ov-meter"><span style={{ width: "78%" }} /></span>
            <span className="ov-metric-sub">K1.46M of K1.87M</span>
          </button>
          <button type="button" className="ov-metric" data-tone="danger" onClick={() => go("fees")}>
            <span className="ov-metric-label">Outstanding fees</span>
            <span className="ov-metric-value">K412,560</span>
            <span className="ov-metric-sub">143 unpaid or incomplete invoices</span>
          </button>
          <button type="button" className="ov-metric" data-tone="brand" onClick={() => go("payroll")}>
            <span className="ov-metric-label">Latest payroll</span>
            <span className="ov-metric-value">K386,200</span>
            <span className="ov-metric-sub">October 2026 · Net pay</span>
          </button>
          <button type="button" className="ov-metric" data-tone="warning" onClick={() => go("expenses")}>
            <span className="ov-metric-label">Expenses this month</span>
            <span className="ov-metric-value">K92,140</span>
            <span className="ov-metric-sub">4 pending expenses</span>
          </button>
          <button type="button" className="ov-metric" data-tone="warning" onClick={() => go("purchases")}>
            <span className="ov-metric-label">Pending purchases</span>
            <span className="ov-metric-value">7</span>
            <span className="ov-metric-sub">Awaiting review or approval</span>
          </button>
        </div>
      </section>

      <div className="ov-bottom">
        <section className="sos-card">
          <div className="sos-card-header">
            <div>
              <div className="sos-card-title">Quick actions</div>
              <div className="sos-card-sub">Shortcuts based on your permissions</div>
            </div>
          </div>
          <div className="qa-grid">
            {QUICK.map(({ label, desc, icon: Icon, tone, go: target }) => (
              <button type="button" className="qa-card" key={label} onClick={() => go(target)}>
                <span className="qa-icon" style={toneVars(tone)}><Icon size={17} /></span>
                <span className="qa-text">
                  <span className="qa-label">{label}</span>
                  <span className="qa-desc">{desc}</span>
                </span>
                <ChevronRight size={16} className="qa-chevron" />
              </button>
            ))}
          </div>
        </section>

        <section className="sos-card">
          <div className="sos-card-header">
            <div>
              <div className="sos-card-title">Recent activity</div>
              <div className="sos-card-sub">From the audit log</div>
            </div>
          </div>
          <div className="ra-list">
            {ACTIVITY.map((a, i) => (
              <div className="ra-item" key={i}>
                <span className="ra-avatar" style={toneVars(a.tone)}>{a.who}</span>
                <div className="ra-body">
                  <div className="ra-text">{a.text}</div>
                  <div className="ra-meta">
                    <span className="ra-module" style={toneVars(a.tone)}>{a.module}</span>
                    <span>{a.when}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}

function initials(name) {
  return name.split(" ").map((w) => w[0]).join("").slice(0, 2);
}

function Students() {
  const [filter, setFilter] = useState("All");
  const rows = STUDENTS.filter((s) => filter === "All" || s.status[0] === filter);
  return (
    <>
      <div className="sos-toolbar">
        {["All", "Paid", "Partial", "Unpaid"].map((f) => (
          <button key={f} type="button" className="sos-chip" aria-pressed={filter === f} onClick={() => setFilter(f)}>{f}</button>
        ))}
      </div>
      <div className="sos-table-wrap">
        <div className="sos-table-scroll">
          <table className="sos-table">
            <thead><tr><th>Student</th><th>Admission no.</th><th>Class</th><th>Guardian</th><th>Fees</th><th className="sos-num">Balance</th></tr></thead>
            <tbody>
              {rows.map((s) => (
                <tr key={s.id}>
                  <td><span className="sos-person"><span className="sos-avatar">{initials(s.name)}</span>{s.name}</span></td>
                  <td className="sos-muted">{s.id}</td>
                  <td>{s.cls}</td>
                  <td className="sos-muted">{s.guardian}</td>
                  <td><span className="sos-badge" data-tone={s.status[1]}>{s.status[0]}</span></td>
                  <td className="sos-num">{s.balance}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
}

function KpiRow({ items }) {
  return (
    <div className="sos-kpi-row">
      {items.map(([label, value, sub, tone, Icon]) => (
        <div className="sos-kpi" key={label}>
          <div className="sos-kpi-label">{label}</div>
          <div className="sos-kpi-value">{value}</div>
          <div className="sos-kpi-sub">{sub}</div>
          <span className="sos-kpi-icon" style={toneVars(tone)}><Icon size={18} /></span>
        </div>
      ))}
    </div>
  );
}

function Fees() {
  return (
    <>
      <KpiRow items={[
        ["Billed this term", "K1,872,400", "1,284 invoices", "brand", FileText],
        ["Collected", "K1,459,840", "78% collection rate", "success", HandCoins],
        ["Outstanding", "K412,560", "143 open invoices", "danger", Coins],
      ]} />
      <div className="sos-table-wrap">
        <div className="sos-table-scroll">
          <table className="sos-table">
            <thead><tr><th>Invoice</th><th>Student</th><th>Term</th><th className="sos-num">Total</th><th className="sos-num">Paid</th><th>Status</th></tr></thead>
            <tbody>
              {INVOICES.map((r) => (
                <tr key={r.no}>
                  <td><strong>{r.no}</strong></td>
                  <td>{r.student}</td>
                  <td className="sos-muted">{r.term}</td>
                  <td className="sos-num">{r.total}</td>
                  <td className="sos-num">{r.paid}</td>
                  <td><span className="sos-badge" data-tone={r.status[1]}>{r.status[0]}</span></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
}

function Payroll() {
  return (
    <>
      <KpiRow items={[
        ["October net pay", "K386,200", "86 staff on this run", "brand", BadgeDollarSign],
        ["PAYE & NAPSA", "K61,340", "Statutory deductions", "info", Landmark],
        ["Approval", "1 of 2", "Bursar approved · Head pending", "warning", Workflow],
      ]} />
      <div className="sos-table-wrap">
        <div className="sos-table-scroll">
          <table className="sos-table">
            <thead><tr><th>Period</th><th className="sos-num">Staff</th><th className="sos-num">Gross</th><th className="sos-num">Net pay</th><th>Status</th></tr></thead>
            <tbody>
              {PAYROLL.map((r) => (
                <tr key={r.period}>
                  <td><strong>{r.period}</strong></td>
                  <td className="sos-num">{r.staff}</td>
                  <td className="sos-num">{r.gross}</td>
                  <td className="sos-num">{r.net}</td>
                  <td><span className="sos-badge" data-tone={r.status[1]}>{r.status[0]}</span></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
}

function Attendance() {
  return (
    <div className="sos-table-wrap">
      <div className="sos-table-scroll">
        <table className="sos-table">
          <thead><tr><th>Class</th><th>Class teacher</th><th className="sos-num">Present</th><th className="sos-num">Rate</th><th>Register</th></tr></thead>
          <tbody>
            {ATTENDANCE.map((r) => {
              const rate = (r.present / r.total) * 100;
              return (
                <tr key={r.cls}>
                  <td><strong>{r.cls}</strong></td>
                  <td className="sos-muted">{r.teacher}</td>
                  <td className="sos-num">{r.present} / {r.total}</td>
                  <td className="sos-num">{rate.toFixed(1)}%</td>
                  <td><span className="sos-badge" data-tone={rate >= 95 ? "success" : "warning"}>{rate >= 95 ? "Submitted" : "Follow up"}</span></td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}

function Placeholder({ item }) {
  const Icon = item.icon;
  return (
    <div className="sos-card sos-empty">
      <span className="sos-empty-icon"><Icon size={22} /></span>
      <span className="sos-empty-title">{item.label}</span>
      This screen is part of the full SchoolOS build. Book a walkthrough to see it with your own data.
    </div>
  );
}

export default function SchoolOSDashboard() {
  const [page, setPage] = useState("overview");
  const [theme, setTheme] = useState("light");
  const [closed, setClosed] = useState({});
  const item = ALL_ITEMS.find((i) => i.id === page) ?? ALL_ITEMS[0];
  const meta = PAGE_META[page] ?? { title: item.label, sub: "Northgate Academy · Main campus" };
  const group = NAV.find((n) => n.items?.some((i) => i.id === page))?.group;

  const link = (it) => {
    const Icon = it.icon;
    return (
      <button key={it.id} type="button" className="sos-nav-link" aria-current={page === it.id ? "page" : undefined} onClick={() => setPage(it.id)}>
        <Icon size={17} strokeWidth={1.9} />
        <span>{it.label}</span>
      </button>
    );
  };

  return (
    <div className="sos-demo" data-theme={theme}>
      <aside className="sos-sidebar">
        <div className="sos-brand">
          <div className="sos-brand-mark" aria-hidden="true">NA</div>
          <div className="sos-brand-text">
            <div className="sos-brand-name">Northgate Academy</div>
            <div className="sos-brand-type">Secondary School</div>
          </div>
          <button type="button" className="sos-icon-btn" aria-label="Collapse sidebar" tabIndex={-1}>
            <PanelLeftClose size={18} />
          </button>
        </div>
        <nav className="sos-nav" aria-label="SchoolOS demo navigation">
          {NAV.map((n) =>
            n.items ? (
              <div className="sos-nav-group" key={n.group}>
                <button
                  type="button"
                  className="sos-nav-heading"
                  aria-expanded={!closed[n.group]}
                  onClick={() => setClosed((c) => ({ ...c, [n.group]: !c[n.group] }))}
                >
                  {n.group}
                  <ChevronDown size={14} />
                </button>
                {!closed[n.group] && n.items.map(link)}
              </div>
            ) : (
              link(n)
            ),
          )}
        </nav>
        <div className="sos-sidebar-foot">
          <span className="sos-avatar">CM</span>
          <div style={{ flex: 1, minWidth: 0 }}>
            <div className="sos-user-name">Chanda Mwila</div>
            <div className="sos-user-role">School Administrator</div>
          </div>
          <ChevronsUpDown size={16} color="var(--sos-text-4)" />
        </div>
      </aside>

      <div className="sos-main">
        <header className="sos-topbar">
          <div className="sos-crumbs">
            <span className="sos-crumb-root">{group ?? "SchoolOS"}</span>
            <ChevronRight size={14} className="sos-crumb-root" />
            <strong>{meta.title}</strong>
          </div>
          <div className="sos-search"><Search size={15} /> Search students, invoices… <kbd>Ctrl K</kbd></div>
          <button type="button" className="sos-campus" style={{ marginLeft: "auto" }}>
            <Building2 size={15} /> <span>Main campus</span> <ChevronDown size={14} />
          </button>
          <button
            type="button"
            className="sos-icon-btn"
            aria-label={theme === "light" ? "Switch demo to dark theme" : "Switch demo to light theme"}
            onClick={() => setTheme(theme === "light" ? "dark" : "light")}
          >
            {theme === "light" ? <Moon size={18} /> : <Sun size={18} />}
          </button>
          <button type="button" className="sos-icon-btn" aria-label="Notifications" onClick={() => setPage("notifications")}>
            <Bell size={18} />
            <span className="sos-dot" />
          </button>
        </header>

        <div className="sos-mobile-nav">
          {MOBILE_TABS.map((id) => (
            <button key={id} type="button" className="sos-chip" aria-pressed={page === id} onClick={() => setPage(id)}>
              {ALL_ITEMS.find((i) => i.id === id).label}
            </button>
          ))}
        </div>

        <div className="sos-scroll">
          <div className="sos-page">
            <div className="sos-page-header">
              <div>
                <h3 className="sos-page-title">{meta.title}</h3>
                <p className="sos-page-sub">{meta.sub}</p>
              </div>
              {page === "students" && <button type="button" className="sos-btn sos-btn-primary"><UserPlus size={15} /> Enrol student</button>}
              {page === "fees" && <button type="button" className="sos-btn sos-btn-primary"><Wallet size={15} /> Record payment</button>}
              {page === "payroll" && <button type="button" className="sos-btn sos-btn-primary"><BadgeDollarSign size={15} /> New payroll run</button>}
            </div>
            {page === "overview" && <Overview go={setPage} />}
            {page === "students" && <Students />}
            {page === "fees" && <Fees />}
            {page === "payroll" && <Payroll />}
            {page === "attendance" && <Attendance />}
            {!PAGE_META[page] && <Placeholder item={item} />}
            <div className="sos-footer">SchoolOS by Neon Industries · Demo data</div>
          </div>
        </div>
      </div>
    </div>
  );
}
