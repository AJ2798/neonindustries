// Interactive replica of the Neon Intelligence workspace
// (neon-intelligence/frontend). Scripted, synthetic conversations only —
// nothing is sent to a model or a connected system.
import { Children, useEffect, useRef, useState } from "react";
import {
  ArrowUp, Bell, Check, ChevronDown, ChevronUp, CircleAlert, History, ListTodo,
  PanelLeft, PanelRight, Paperclip, Plug, Search, Settings, ShieldCheck, SquarePen, Sun, Moon,
  CheckCircle2, Clock3, FileText,
} from "lucide-react";
import "./neon-workspace.css";

// Autoplay: while the demo is on screen it loops through these conversations,
// typing each prompt into the composer. `hold` is how long the finished
// conversation stays up before the next one starts.
const SCENARIOS = [
  {
    system: "SchoolOS",
    prompts: ["Show me this term’s payment statistics and students who still owe", "Record a K2,500 payment against invoice INV-1024"],
    hold: 9000,
  },
  { system: "SchoolOS", prompts: ["Draft fee reminders for guardians with balances over K4,000"], hold: 5000 },
  { system: "Documents", prompts: ["Summarise the attached supplier contract and flag any risks"], file: "Supplier_Agreement_2026.pdf", hold: 5500 },
  { system: "SchoolOS", prompts: ["Which classes had attendance below 90% this week?"], hold: 4500 },
  { system: "NI Business", prompts: ["Compare October expenses with September by category"], hold: 4500 },
  { system: "NI Business", prompts: ["Show October payroll and employees awaiting payment"], hold: 4500 },
  { system: "Documents", prompts: ["Write a one-page board summary of Term 3 finances"], hold: 5500 },
];

const STEPS = ["Prepared", "Validated", "Reviewed", "Approved", "Submitted", "Executing", "Verifying", "Recorded", "Done"];

const SUGGESTIONS = [
  { id: "stats", text: "Show me this term’s payment statistics and students who still owe", sys: "SchoolOS", tag: "School fees" },
  { id: "payment", text: "Record a K2,500 payment against invoice INV-1024", sys: "SchoolOS", tag: "Payment posting" },
  { id: "payroll", text: "Show October payroll and employees awaiting payment", sys: "NI Business", tag: "Payroll review" },
  { id: "help", text: "What can you do here?", sys: "", tag: "Connected systems and limits" },
];

const HISTORY = [
  ["Today", ["Term 3 fee collection and arrears", "Payment against INV-1024"]],
  ["Yesterday", ["October payroll review"]],
  ["Previous 7 days", ["Guardian reminder wording", "Lab consumables RFQ"]],
  ["Previous 30 days", ["Grade 11 mid-term results"]],
];

const TRACES = {
  stats: [["Reading", "fees.income.summary"], ["Querying", "invoices.list status=unpaid,partial"]],
  payment: [["Looking up", "invoices.get INV-1024"], ["Validating", "payments.record (dry run)"]],
  payroll: [["Querying", "payroll.runs period=2026-10"], ["Reading", "payroll.payslips status=pending"]],
  help: [["Reading", "integrations.catalog"]],
  reminders: [["Querying", "invoices.list balance>4000"], ["Reading", "guardians.contacts"], ["Drafting", "notifications.email (3 recipients)"]],
  document: [["Reading", "Supplier_Agreement_2026.pdf · 14 pages"], ["Extracting", "terms, dates, obligations"]],
  attendance: [["Querying", "attendance.summary week=2026-W44"]],
  expenses: [["Querying", "expenses.by_category period=2026-09..2026-10"]],
  report: [["Reading", "fees.income.summary"], ["Reading", "expenses.summary"], ["Reading", "payroll.runs"], ["Drafting", "document"]],
  fallback: [["Reading", "integrations.catalog"]],
};

function classify(text) {
  const t = text.toLowerCase();
  if (/remind/.test(t)) return "reminders";
  if (/board|one-page|report/.test(t)) return "report";
  if (/contract|attached|summari[sz]e/.test(t)) return "document";
  if (/attendance|absent/.test(t)) return "attendance";
  if (/expense|spend/.test(t)) return "expenses";
  if (/record|pay(ment)? (of|against)|k ?2,?500|inv-?1024/.test(t)) return "payment";
  if (/payroll|salar|employee|staff/.test(t)) return "payroll";
  if (/owe|arrears|fee|statistic|collection|outstanding/.test(t)) return "stats";
  if (/what can|help|capabilit/.test(t)) return "help";
  return "fallback";
}

function titleFor(kind) {
  return {
    stats: "Term 3 fee collection and arrears",
    payment: "Payment against INV-1024",
    payroll: "October payroll review",
    help: "What Neon Intelligence can do",
    reminders: "Guardian fee reminders",
    document: "Supplier contract review",
    attendance: "Attendance this week",
    expenses: "October vs September expenses",
    report: "Term 3 board summary",
    fallback: "New conversation",
  }[kind];
}

function Proposal({ onFollow, auto }) {
  const [state, setState] = useState("review"); // review | code | running | done | rejected
  const [step, setStep] = useState(2);
  const [code, setCode] = useState("");

  // In autoplay, approve with a typed code so the whole lifecycle is visible.
  useEffect(() => {
    if (!auto) return undefined;
    let cancelled = false;
    const wait = (ms) => new Promise((r) => setTimeout(r, ms));
    (async () => {
      await wait(1800);
      if (cancelled) return;
      setState("code");
      for (const digit of "482913") {
        await wait(170);
        if (cancelled) return;
        setCode((c) => c + digit);
      }
      await wait(600);
      if (cancelled) return;
      setStep(3);
      setState("running");
    })();
    return () => {
      cancelled = true;
    };
  }, [auto]);

  useEffect(() => {
    if (state !== "running") return undefined;
    if (step >= STEPS.length - 1) {
      setState("done");
      return undefined;
    }
    const t = setTimeout(() => setStep((s) => s + 1), 420);
    return () => clearTimeout(t);
  }, [state, step]);

  const confirm = (e) => {
    e.preventDefault();
    setStep(3);
    setState("running");
  };

  const pill =
    state === "done" ? ["Recorded", "success"]
      : state === "rejected" ? ["Rejected", "danger"]
      : state === "running" ? ["Executing", "info"]
      : ["Awaiting approval", "info"];

  const after = state === "done";

  return (
    <div className="niw-proposal" data-state={state}>
      <div className="niw-prop-head">
        <div>
          <div className="niw-prop-sys">SchoolOS</div>
          <div className="niw-prop-title">Record a K2,500 payment for Mutale Banda</div>
          <div className="niw-prop-sub">
            <code>payments.record</code>. {after ? "Committed and verified." : state === "rejected" ? "Rejected. Nothing was written." : "Prepared, not yet committed."}
          </div>
        </div>
        <span className="niw-pill" data-tone={pill[1]}>{pill[0]}</span>
      </div>

      <div className="niw-steps" aria-label="Proposal progress">
        {STEPS.map((s, i) => (
          <div
            key={s}
            className="niw-step"
            data-done={state !== "rejected" && (i < step || (after && i === step))}
            data-current={state !== "rejected" && !after && i === step}
          >
            <i />
            {s}
          </div>
        ))}
      </div>

      <div className="niw-fields">
        <div><span>Student</span><strong>Mutale Banda, Grade 10B</strong></div>
        <div><span>Amount</span><strong>K2,500.00</strong></div>
        <div><span>Method</span><strong>Mobile money</strong></div>
        <div><span>Reference</span><strong>MM-88213</strong></div>
      </div>

      <div className="niw-prop-pad">
        <div className="niw-table-wrap">
          <table className="niw-table">
            <thead><tr><th>Field</th><th>Current</th><th>After approval</th></tr></thead>
            <tbody>
              <tr><td>Balance owed</td><td><s>K4,200.00</s></td><td><strong>K1,700.00</strong></td></tr>
              <tr><td>Status</td><td><s>Unpaid</s></td><td><strong>Partial</strong></td></tr>
            </tbody>
          </table>
        </div>
        {state === "review" || state === "code" ? (
          <div className="niw-warn">
            <CircleAlert size={15} />
            This payment is dated before the invoice was issued. Check the date before approving.
          </div>
        ) : null}
      </div>

      <div className="niw-meta">
        <span>Snapshot <code>a91f-3c07-de22</code></span>
        <span>Version 1</span>
        <span>Approval You</span>
        <span>{after ? "Receipt RC-2026-0918" : "Expires in 28 min"}</span>
        <span className="niw-meta-link"><History size={14} /> History</span>
      </div>

      {state === "review" && (
        <>
          <div className="niw-actions">
            <button type="button" className="niw-btn niw-btn-primary" onClick={() => setState("code")}>
              <Check size={16} /> Approve and record
            </button>
            <button type="button" className="niw-btn">Edit details</button>
            <button type="button" className="niw-btn niw-btn-danger" onClick={() => setState("rejected")}>Reject</button>
          </div>
          <div className="niw-foot-note">
            You’ll confirm with a fresh code first. Approval is tied to snapshot a91f-3c07. Any change to the details cancels it.
          </div>
        </>
      )}

      {state === "code" && (
        <form onSubmit={confirm}>
          <div className="niw-code">
            <input
              ref={auto ? undefined : (el) => el?.focus({ preventScroll: true })}
              inputMode="numeric"
              maxLength={6}
              placeholder="······"
              aria-label="Approval code"
              value={code}
              onChange={(e) => setCode(e.target.value.replace(/\D/g, ""))}
            />
            <button type="submit" className="niw-btn niw-btn-primary" disabled={code.length < 6}>Confirm approval</button>
            <button type="button" className="niw-btn" onClick={() => setState("review")}>Cancel</button>
          </div>
          <div className="niw-foot-note">Demo: enter any six digits. In production this is your authenticator code.</div>
        </form>
      )}

      {(state === "running" || state === "done") && (
        <div className="niw-foot-note" style={{ paddingTop: 14 }}>
          {state === "done"
            ? "Recorded in SchoolOS and verified against the ledger. A receipt was queued for the guardian."
            : "Submitting to SchoolOS…"}
        </div>
      )}

      {state === "rejected" && (
        <div className="niw-actions" style={{ paddingBottom: 16 }}>
          <button type="button" className="niw-btn" onClick={() => { setStep(2); setCode(""); setState("review"); }}>Reopen proposal</button>
          <button type="button" className="niw-btn" onClick={() => onFollow("Show me this term’s payment statistics and students who still owe")}>Back to arrears</button>
        </div>
      )}
    </div>
  );
}

function Reply({ kind, onFollow, auto }) {
  if (kind === "stats") {
    return (
      <>
        <p>Term 3 collections at Northgate Academy are at <strong>78%</strong>. 143 invoices are still unpaid or partly paid.</p>
        <div className="niw-tiles">
          <div className="niw-tile"><span>Billed</span><strong>K1,872,400</strong></div>
          <div className="niw-tile"><span>Collected</span><strong>K1,459,840</strong></div>
          <div className="niw-tile"><span>Outstanding</span><strong>K412,560</strong></div>
        </div>
        <p>Largest balances first:</p>
        <div className="niw-table-wrap">
          <table className="niw-table">
            <thead><tr><th>Student</th><th>Class</th><th>Invoice</th><th className="num">Balance</th></tr></thead>
            <tbody>
              <tr><td>Bwalya Mulenga</td><td>Grade 8C</td><td>INV-1026</td><td className="num">K4,200.00</td></tr>
              <tr><td>Mwila Sakala</td><td>Grade 10A</td><td>INV-1031</td><td className="num">K4,200.00</td></tr>
              <tr><td>Mutale Banda</td><td>Grade 10B</td><td>INV-1024</td><td className="num">K4,200.00</td></tr>
              <tr><td>Kondwani Tembo</td><td>Grade 9B</td><td>INV-1028</td><td className="num">K2,050.00</td></tr>
            </tbody>
          </table>
        </div>
        <div className="niw-chips">
          <button type="button" onClick={() => onFollow("Record a K2,500 payment against invoice INV-1024")}>Record Mutale’s K2,500 payment</button>
          <button type="button" onClick={() => onFollow("Draft fee reminders for guardians with balances over K4,000")}>Draft guardian reminders</button>
        </div>
      </>
    );
  }
  if (kind === "payment") {
    return (
      <>
        <p>I found <strong>INV-1024</strong> for Mutale Banda (Grade 10B), K4,200.00 unpaid. Here is the payment I prepared. Nothing has been written yet.</p>
        <Proposal onFollow={onFollow} auto={auto} />
      </>
    );
  }
  if (kind === "payroll") {
    return (
      <>
        <p>The October 2026 run covers <strong>86 staff</strong>, K386,200.00 net. The bursar has approved it; it is waiting on the head teacher. Four payslips are still unpaid:</p>
        <div className="niw-table-wrap">
          <table className="niw-table">
            <thead><tr><th>Employee</th><th>Department</th><th>Method</th><th className="num">Net pay</th></tr></thead>
            <tbody>
              <tr><td>Grace Mwansa</td><td>Sciences</td><td>Bank transfer</td><td className="num">K8,420.00</td></tr>
              <tr><td>Peter Chilufya</td><td>Mathematics</td><td>Bank transfer</td><td className="num">K7,960.00</td></tr>
              <tr><td>Ruth Kabwe</td><td>Languages</td><td>Mobile money</td><td className="num">K6,310.00</td></tr>
              <tr><td>Moses Siame</td><td>Operations</td><td>Cash</td><td className="num">K3,880.00</td></tr>
            </tbody>
          </table>
        </div>
        <div className="niw-chips">
          <button type="button" onClick={() => onFollow("What can you do here?")}>What else can you do?</button>
        </div>
      </>
    );
  }
  if (kind === "help") {
    return (
      <>
        <p>I’m connected to <strong>SchoolOS</strong> and <strong>NI Business</strong> in this workspace. I can:</p>
        <ul className="niw-list">
          <li>Answer questions with live figures: fees, attendance, results, payroll, spending.</li>
          <li>Prepare payments, payroll actions, enrolments and reminders as proposals you review.</li>
          <li>Import spreadsheets of students or staff and show what would change before it does.</li>
          <li>Draft documents and messages for you to edit and send.</li>
        </ul>
        <p>I never post, send or submit on my own. Every change waits for your approval and a fresh code.</p>
        <div className="niw-chips">
          <button type="button" onClick={() => onFollow("Record a K2,500 payment against invoice INV-1024")}>Try a payment proposal</button>
        </div>
      </>
    );
  }
  if (kind === "reminders") {
    return (
      <>
        <p>Three guardians have balances over <strong>K4,000</strong>. I drafted one reminder and personalised it for each. Nothing has been sent.</p>
        <div className="niw-draft">
          <div className="niw-draft-head">
            <span><b>To</b> Grace Mulenga, Agnes Sakala, Esther Banda</span>
            <span className="niw-pill">Draft · not sent</span>
          </div>
          <div className="niw-draft-subject">Term 3 school fees: balance reminder</div>
          <div className="niw-draft-body">
            <p>Dear Grace,</p>
            <p>This is a friendly reminder that Bwalya’s Term 3 fees have an outstanding balance of <strong>K4,200.00</strong> (invoice INV-1026). You can pay by mobile money, bank transfer or at the bursar’s office.</p>
            <p>If you have already paid, please share the reference and we will update our records.</p>
            <p>Kind regards,<br />Bursar’s Office, Northgate Academy</p>
          </div>
        </div>
        <div className="niw-chips">
          <button type="button">Send for approval</button>
          <button type="button">Make it more formal</button>
          <button type="button">Translate to Bemba</button>
        </div>
      </>
    );
  }
  if (kind === "document") {
    return (
      <>
        <p>This is a 3-year supply agreement with <strong>Copperbelt Office Supplies Ltd</strong> for stationery and lab consumables, worth about <strong>K480,000</strong> a year.</p>
        <ul className="niw-list">
          <li>Starts 1 January 2027, renews automatically for 12 months unless cancelled 90 days before.</li>
          <li>Prices fixed for year one, then rise with inflation, capped at 8% a year.</li>
          <li>Payment due 30 days from invoice; late payment adds 2% a month.</li>
        </ul>
        <p><strong>Risks to review:</strong></p>
        <div className="niw-table-wrap">
          <table className="niw-table">
            <thead><tr><th>Clause</th><th>Issue</th><th>Severity</th></tr></thead>
            <tbody>
              <tr><td>§7.2</td><td>Auto-renewal with a 90-day notice window</td><td><span className="niw-sev" data-tone="warning">Medium</span></td></tr>
              <tr><td>§9.1</td><td>2% monthly late fee is above market</td><td><span className="niw-sev" data-tone="danger">High</span></td></tr>
              <tr><td>§12</td><td>No delivery-time guarantee or penalty</td><td><span className="niw-sev" data-tone="warning">Medium</span></td></tr>
            </tbody>
          </table>
        </div>
        <div className="niw-chips">
          <button type="button">Draft a negotiation email</button>
          <button type="button">Compare with last year’s contract</button>
        </div>
      </>
    );
  }
  if (kind === "attendance") {
    return (
      <>
        <p>Two classes were below 90% this week. Grade 8C dipped mid-week; Grade 10B has been under 90% for three weeks running.</p>
        <div className="niw-table-wrap">
          <table className="niw-table">
            <thead><tr><th>Class</th><th>Class teacher</th><th className="num">This week</th><th className="num">Last week</th></tr></thead>
            <tbody>
              <tr><td>Grade 8C</td><td>Mr. Chilufya</td><td className="num">86.4%</td><td className="num">93.1%</td></tr>
              <tr><td>Grade 10B</td><td>Mr. Ngoma</td><td className="num">88.9%</td><td className="num">89.3%</td></tr>
            </tbody>
          </table>
        </div>
        <div className="niw-chips">
          <button type="button">List students absent 3+ days</button>
          <button type="button">Notify class teachers</button>
        </div>
      </>
    );
  }
  if (kind === "expenses") {
    return (
      <>
        <p>October spending was <strong>K92,140</strong>, up <strong>12%</strong> on September. Most of the increase is maintenance after the roof repair.</p>
        <div className="niw-table-wrap">
          <table className="niw-table">
            <thead><tr><th>Category</th><th className="num">September</th><th className="num">October</th><th className="num">Change</th></tr></thead>
            <tbody>
              <tr><td>Maintenance</td><td className="num">K9,800</td><td className="num">K21,450</td><td className="num">+119%</td></tr>
              <tr><td>Utilities</td><td className="num">K18,200</td><td className="num">K18,900</td><td className="num">+4%</td></tr>
              <tr><td>Supplies</td><td className="num">K24,600</td><td className="num">K22,300</td><td className="num">−9%</td></tr>
              <tr><td>Transport</td><td className="num">K15,100</td><td className="num">K14,780</td><td className="num">−2%</td></tr>
              <tr><td>Other</td><td className="num">K14,560</td><td className="num">K14,710</td><td className="num">+1%</td></tr>
            </tbody>
          </table>
        </div>
        <div className="niw-chips">
          <button type="button">Show the maintenance invoices</button>
          <button type="button">Chart the last 6 months</button>
        </div>
      </>
    );
  }
  if (kind === "report") {
    return (
      <>
        <p>Here is a draft you can edit. Figures come from SchoolOS as of today.</p>
        <div className="niw-doc">
          <div className="niw-doc-title">Term 3 Finance Summary · Board of Governors</div>
          <p><strong>Collections.</strong> K1.46M of K1.87M billed has been collected (78%). 143 invoices remain open, concentrated in Grades 8 and 10.</p>
          <p><strong>Spending.</strong> October expenses rose 12% to K92,140, driven by a one-off roof repair. Other categories are flat or lower.</p>
          <p><strong>Payroll.</strong> October net pay of K386,200 for 86 staff is awaiting the head teacher’s approval.</p>
          <p><strong>Recommendation.</strong> Run a targeted reminder campaign for balances over K4,000 before mid-term break.</p>
        </div>
        <div className="niw-chips">
          <button type="button">Export to Word</button>
          <button type="button">Add a collections chart</button>
          <button type="button">Shorten to half a page</button>
        </div>
      </>
    );
  }
  return (
    <>
      <p>This demo runs on synthetic data, so I can only show a few scripted tasks here. Try one of these:</p>
      <div className="niw-chips">
        {SUGGESTIONS.slice(0, 3).map((s) => (
          <button type="button" key={s.id} onClick={() => onFollow(s.text)}>{s.text}</button>
        ))}
      </div>
    </>
  );
}

function AiMessage({ kind, auto, onFollow, onStep, onComplete }) {
  const trace = TRACES[kind];
  // Reply has no hooks, so its blocks can be pulled out and streamed one at a time.
  const blocks = Children.toArray(Reply({ kind, onFollow, auto }).props.children);
  const total = trace.length + blocks.length;
  const [shown, setShown] = useState(0);

  useEffect(() => {
    if (shown > trace.length) onStep?.();
    if (shown >= total) {
      onComplete?.();
      return undefined;
    }
    const delay = shown === 0 ? 250 : shown < trace.length ? 550 : shown === trace.length ? 500 : 420;
    const t = setTimeout(() => setShown((s) => s + 1), delay);
    return () => clearTimeout(t);
    // The callbacks are fresh closures each render; only the reveal step should re-run this.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [shown, total]);

  const visible = blocks.slice(0, Math.max(0, shown - trace.length));
  const streaming = shown > trace.length && shown < total;

  return (
    <div className="niw-msg-ai">
      <div className="niw-trace">
        {trace.slice(0, shown).map(([verb, call], i) => (
          <div key={call}>
            {i === shown - 1 && shown <= trace.length ? <span className="niw-pulse" /> : <Check size={13} />}
            {verb} <code>{call}</code>
          </div>
        ))}
      </div>
      {visible}
      {streaming && <span className="niw-caret" aria-hidden="true" />}
    </div>
  );
}

function Composer({ value, onChange, onSend, placeholder }) {
  const submit = () => {
    const v = value.trim();
    if (!v) return;
    onSend(v);
    onChange("");
  };
  return (
    <div className="niw-composer">
      <textarea
        rows={1}
        placeholder={placeholder}
        value={value}
        aria-label="Message Neon Intelligence"
        onChange={(e) => onChange(e.target.value)}
        onKeyDown={(e) => {
          if (e.key === "Enter" && !e.shiftKey) {
            e.preventDefault();
            submit();
          }
        }}
      />
      <div className="niw-composer-row">
        <button type="button" className="niw-icon" aria-label="Attach a file"><Paperclip size={17} /></button>
        <button type="button" className="niw-send" data-ready={value.trim().length > 0} aria-label="Send" onClick={submit}>
          <ArrowUp size={17} />
        </button>
      </div>
    </div>
  );
}

function WorkView() {
  const classes = [["Grade 7", 91], ["Grade 8", 72], ["Grade 9", 84], ["Grade 10", 69], ["Grade 11", 80], ["Grade 12", 88]];
  return (
    <div className="niw-col niw-work">
      <div>
        <h3>Term 3 collections</h3>
        <div className="niw-work-sub">A board the assistant built from SchoolOS · refreshed 2 minutes ago</div>
      </div>
      <div className="niw-tiles">
        <div className="niw-tile"><span>Collection rate</span><strong>78%</strong></div>
        <div className="niw-tile"><span>Outstanding</span><strong>K412,560</strong></div>
        <div className="niw-tile"><span>Open proposals</span><strong>1</strong></div>
      </div>
      <div className="niw-work-grid">
        <div className="niw-panel">
          <div className="niw-panel-title">Collection rate by grade <small>Term 3 · 2026</small></div>
          <div className="niw-bars">
            {classes.map(([c, v]) => (
              <div className="niw-bar" key={c}>
                <span>{c}</span>
                <span className="niw-bar-track"><i style={{ width: `${v}%` }} /></span>
                <b>{v}%</b>
              </div>
            ))}
          </div>
        </div>
        <div className="niw-panel">
          <div className="niw-panel-title">Tasks <small>2 open</small></div>
          <div className="niw-task"><Clock3 size={15} /> Approve K2,500 payment for Mutale Banda <small>Due today</small></div>
          <div className="niw-task"><FileText size={15} /> Review guardian reminder draft <small>Tomorrow</small></div>
          <div className="niw-task"><CheckCircle2 size={15} /> Grade 8 arrears list exported <small>Done</small></div>
          <div className="niw-task"><CheckCircle2 size={15} /> September payroll reconciled <small>Done</small></div>
        </div>
      </div>
    </div>
  );
}

export default function NeonWorkspace() {
  const [theme, setTheme] = useState("dark");
  const [mode, setMode] = useState("chat");
  const [messages, setMessages] = useState([]);
  const [title, setTitle] = useState("New conversation");
  const [system, setSystem] = useState("SchoolOS");
  const [menu, setMenu] = useState(false);
  const [draft, setDraft] = useState("");
  // running while on screen and untouched; paused when scrolled away; off once the
  // visitor takes over (until the demo leaves the screen and comes back).
  const [autoplay, setAutoplay] = useState("paused");
  const bodyRef = useRef(null);
  const rootRef = useRef(null);
  const completed = useRef(0);
  const sendRef = useRef(null);

  const scrollDown = () => {
    const el = bodyRef.current;
    if (el) el.scrollTo({ top: el.scrollHeight, behavior: "smooth" });
  };

  useEffect(() => {
    if (messages.length) scrollDown();
  }, [messages.length]);

  const send = (text, { auto = false, file } = {}) => {
    const kind = classify(text);
    setMode("chat");
    if (messages.length === 0) setTitle(titleFor(kind));
    setMessages((m) => [...m, { role: "user", text, file }, { role: "ai", kind, auto, id: m.length }]);
  };

  sendRef.current = send;

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return undefined;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setAutoplay((a) => (a === "paused" ? "running" : a));
        else setAutoplay("paused");
      },
      { threshold: 0.6 },
    );
    observer.observe(rootRef.current);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (autoplay !== "running") return undefined;
    let cancelled = false;
    const wait = (ms) => new Promise((r) => setTimeout(r, ms));
    const until = async (n) => {
      while (!cancelled && completed.current < n) await wait(150);
    };
    const type = async (text) => {
      for (let i = 1; i <= text.length && !cancelled; i++) {
        setDraft(text.slice(0, i));
        await wait(24 + Math.random() * 46);
      }
    };

    (async () => {
      for (let n = 0; !cancelled; n = (n + 1) % SCENARIOS.length) {
        const scenario = SCENARIOS[n];
        setMessages([]);
        setTitle("New conversation");
        setMode("chat");
        setSystem(scenario.system);
        await wait(1100);
        for (const [i, text] of scenario.prompts.entries()) {
          if (i > 0) await wait(1600);
          if (cancelled) return;
          await type(text);
          await wait(450);
          if (cancelled) return;
          const target = completed.current + 1;
          sendRef.current(text, { auto: true, file: i === 0 ? scenario.file : undefined });
          setDraft("");
          await until(target);
        }
        await wait(scenario.hold);
      }
    })();

    return () => {
      cancelled = true;
    };
  }, [autoplay]);

  // Any click or key press inside the demo hands control to the visitor.
  const takeOver = () => {
    if (autoplay !== "running") return;
    setAutoplay("off");
    setDraft("");
    setMessages((m) => m.map((msg) => ({ ...msg, auto: false })));
  };

  const reset = () => {
    setMessages([]);
    setTitle("New conversation");
    setMode("chat");
  };

  const openHistory = (label) => {
    const kind = classify(label);
    setMode("chat");
    setTitle(label);
    setMessages([{ role: "user", text: SUGGESTIONS.find((s) => s.id === kind)?.text ?? label }, { role: "ai", kind, id: 0 }]);
  };

  return (
    <div className="niw" data-theme={theme} ref={rootRef} onPointerDownCapture={takeOver} onKeyDownCapture={takeOver}>
      <aside className="niw-side">
        <div className="niw-side-head">
          <span className="niw-wordmark">Neon Intelligence</span>
          <button type="button" className="niw-icon" aria-label="Collapse sidebar" tabIndex={-1}><PanelLeft size={17} /></button>
        </div>
        <button type="button" className="niw-new" onClick={reset}>
          <SquarePen size={16} /> New conversation <kbd>Ctrl ⇧O</kbd>
        </button>
        <button type="button" className="niw-navitem"><Search size={16} /> Search conversations <kbd>Ctrl K</kbd></button>
        <button type="button" className="niw-navitem" onClick={() => setMode("work")}><ListTodo size={16} /> Tasks <span className="niw-count">2</span></button>
        <button type="button" className="niw-navitem" onClick={() => send("Record a K2,500 payment against invoice INV-1024")}>
          <ShieldCheck size={16} /> Approvals <span className="niw-count" data-tone="warning">1</span>
        </button>
        <button type="button" className="niw-navitem" onClick={() => send("What can you do here?")}><Plug size={16} /> Integrations</button>
        <div className="niw-history">
          {HISTORY.map(([label, items]) => (
            <div key={label}>
              <div className="niw-history-label">{label}</div>
              {items.map((it) => (
                <button type="button" key={it} aria-current={title === it} onClick={() => openHistory(it)}>{it}</button>
              ))}
            </div>
          ))}
        </div>
        <div className="niw-side-foot">
          <button type="button" className="niw-navitem" style={{ margin: 0, width: "100%" }}><Settings size={16} /> Settings</button>
          <div className="niw-user">
            <span className="niw-avatar">CM</span>
            <div style={{ flex: 1, minWidth: 0 }}>
              <div className="niw-user-name">Chanda Mwila</div>
              <div className="niw-user-org">Neon Industries</div>
            </div>
            <ChevronUp size={15} color="var(--ni-text-subtle)" />
          </div>
        </div>
      </aside>

      <div className="niw-main">
        <header className="niw-top">
          <span className="niw-title">{mode === "work" ? "Workspace" : title}</span>
          <button type="button" className="niw-system" aria-expanded={menu} onClick={() => setMenu((v) => !v)}>
            {system} <ChevronDown size={15} />
            {menu && (
              <span className="niw-menu" role="menu">
                {[["SchoolOS", "Northgate Academy"], ["NI Business", "Neon Industries Ltd"], ["Documents", "Files and uploads"]].map(([name, org]) => (
                  <div key={name} role="menuitem" onClick={() => setSystem(name)}>
                    <span>{name}</span><small>{org}</small>
                  </div>
                ))}
              </span>
            )}
          </button>
          <span className="niw-spacer" />
          <div className="niw-seg" role="group" aria-label="View">
            <button type="button" aria-pressed={mode === "chat"} onClick={() => setMode("chat")}>Chat</button>
            <button type="button" aria-pressed={mode === "work"} onClick={() => setMode("work")}>Work</button>
          </div>
          <button type="button" className="niw-icon niw-hide-sm" aria-label="Context panel" tabIndex={-1}><PanelRight size={17} /></button>
          <button
            type="button"
            className="niw-icon"
            aria-label={theme === "dark" ? "Switch demo to light theme" : "Switch demo to dark theme"}
            onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
          >
            {theme === "dark" ? <Sun size={17} /> : <Moon size={17} />}
          </button>
          <button type="button" className="niw-icon niw-hide-sm" aria-label="Notifications"><Bell size={17} /><span className="niw-badge">2</span></button>
        </header>

        <div className="niw-body" ref={bodyRef}>
          {mode === "work" ? (
            <WorkView />
          ) : messages.length === 0 ? (
            <div className="niw-col niw-welcome">
              <h3>What should we get done, Chanda?</h3>
              <p>Ask for information or describe a task. I’ll prepare it and show exactly what would change. Nothing is posted, sent or submitted until you approve it.</p>
              <Composer value={draft} onChange={setDraft} onSend={send} placeholder="Ask a question or describe a task" />
              <div className="niw-hint">
                <span>Enter to send, Shift+Enter for a new line</span>
                <span>{autoplay === "running" ? "Demo playing · click anywhere to take over" : "Connectors in this demo use synthetic data"}</span>
              </div>
              <div className="niw-suggest">
                {SUGGESTIONS.map((s) => (
                  <button type="button" key={s.id} onClick={() => send(s.text)}>
                    {s.text}
                    <small>{s.sys && <b>{s.sys}</b>}{s.tag}</small>
                  </button>
                ))}
              </div>
            </div>
          ) : (
            <div className="niw-col niw-thread">
              {messages.map((m, i) =>
                m.role === "user" ? (
                  <div className="niw-msg-user" key={i}>
                    {m.file && <span className="niw-file"><FileText size={14} /> {m.file}</span>}
                    {m.text}
                  </div>
                ) : (
                  <AiMessage
                    key={i}
                    kind={m.kind}
                    auto={m.auto}
                    onFollow={send}
                    onStep={scrollDown}
                    onComplete={() => { completed.current += 1; }}
                  />
                ),
              )}
            </div>
          )}
        </div>

        {mode === "chat" && messages.length > 0 && (
          <div className="niw-col niw-bottom">
            <Composer value={draft} onChange={setDraft} onSend={send} placeholder="Reply, or ask for something else" />
            <div className="niw-disclaimer">
              {autoplay === "running"
                ? "Demo playing · click anywhere to take over"
                : "Connectors in this demo use synthetic data. Review every proposal before approving."}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
