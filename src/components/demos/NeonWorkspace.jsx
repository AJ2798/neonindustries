// Interactive replica of the Neon Intelligence workspace
// (neon-intelligence/frontend). Scripted, synthetic conversations only —
// nothing is sent to a model or a connected system.
import { useEffect, useRef, useState } from "react";
import {
  ArrowUp, Bell, Check, ChevronDown, ChevronUp, CircleAlert, History, ListTodo,
  PanelLeft, PanelRight, Paperclip, Plug, Search, Settings, ShieldCheck, SquarePen, Sun, Moon,
  CheckCircle2, Clock3, FileText,
} from "lucide-react";
import "./neon-workspace.css";

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
  fallback: [["Reading", "integrations.catalog"]],
};

function classify(text) {
  const t = text.toLowerCase();
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
    fallback: "New conversation",
  }[kind];
}

function Proposal({ onFollow }) {
  const [state, setState] = useState("review"); // review | code | running | done | rejected
  const [step, setStep] = useState(2);
  const [code, setCode] = useState("");

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
              ref={(el) => el?.focus({ preventScroll: true })}
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

function Reply({ kind, onFollow }) {
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
        <Proposal onFollow={onFollow} />
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

function AiMessage({ kind, onFollow, onDone }) {
  const trace = TRACES[kind];
  const [shown, setShown] = useState(0);

  useEffect(() => {
    if (shown > trace.length) {
      onDone?.();
      return undefined;
    }
    const t = setTimeout(() => setShown((s) => s + 1), shown === 0 ? 250 : 550);
    return () => clearTimeout(t);
    // onDone is a fresh closure each render; only the reveal step should re-run this.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [shown, trace.length]);

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
      {shown > trace.length && <Reply kind={kind} onFollow={onFollow} />}
    </div>
  );
}

function Composer({ onSend, placeholder, autoFocus }) {
  const [value, setValue] = useState("");
  const submit = () => {
    const v = value.trim();
    if (!v) return;
    onSend(v);
    setValue("");
  };
  return (
    <div className="niw-composer">
      <textarea
        rows={1}
        placeholder={placeholder}
        value={value}
        autoFocus={autoFocus}
        aria-label="Message Neon Intelligence"
        onChange={(e) => setValue(e.target.value)}
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
  const bodyRef = useRef(null);

  const scrollDown = () => {
    const el = bodyRef.current;
    if (el) el.scrollTo({ top: el.scrollHeight, behavior: "smooth" });
  };

  useEffect(() => {
    if (messages.length) scrollDown();
  }, [messages.length]);

  const send = (text) => {
    const kind = classify(text);
    setMode("chat");
    if (messages.length === 0) setTitle(titleFor(kind));
    setMessages((m) => [...m, { role: "user", text }, { role: "ai", kind, id: m.length }]);
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
    <div className="niw" data-theme={theme}>
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
                {[["SchoolOS", "Northgate Academy"], ["NI Business", "Neon Industries Ltd"]].map(([name, org]) => (
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
              <Composer onSend={send} placeholder="Ask a question or describe a task" />
              <div className="niw-hint"><span>Enter to send, Shift+Enter for a new line</span><span>Connectors in this demo use synthetic data</span></div>
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
                  <div className="niw-msg-user" key={i}>{m.text}</div>
                ) : (
                  <AiMessage key={i} kind={m.kind} onFollow={send} onDone={scrollDown} />
                ),
              )}
            </div>
          )}
        </div>

        {mode === "chat" && messages.length > 0 && (
          <div className="niw-col niw-bottom">
            <Composer onSend={send} placeholder="Reply, or ask for something else" />
            <div className="niw-disclaimer">Connectors in this demo use synthetic data. Review every proposal before approving.</div>
          </div>
        )}
      </div>
    </div>
  );
}
