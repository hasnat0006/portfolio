"use client";

import {
  useCallback,
  useEffect,
  useRef,
  useState,
  type KeyboardEvent,
} from "react";

// ── Command Data ───────────────────────────────────────────────────────
const ABOUT_TEXT = `
┌──────────────────────────────────────────────────────────────────┐
│  Yusuf Reza Hasnat                                               │
│  Software Engineer L1 & Competitive Programmer                   │
│                                                                  │
│  ⟩ Education:                                                    │
│    Military Institute of Science and Technology (MIST)           │
│    B.Sc. in Computer Science & Engineering                       │
│    CGPA: 3.69 | Spring Semester GPA: 3.71                        │
│                                                                  │
│  ⟩ Interests:                                                    │
│    Algorithm Design · Competitive Programming                    │
│    Software Engineering                                          │
│    High-Performance Computing                                    │
└──────────────────────────────────────────────────────────────────┘`;

const CP_TEXT = `
╔══════════════════════════════════════════════════════════════════╗
║  COMPETITIVE PROGRAMMING STANDINGS                               ║
╠══════════════════════════════════════════════════════════════════╣
║                                                                  ║
║  ► ICPC Asia Dhaka Regional Onsite Contest 2025                  ║
║    Rank: 77th Place                                              ║
║    Team: MIST_Untitled                                           ║
║                                                                  ║
║  ► UIU Inter-University Programming Contest 2025                 ║
║    Rank: 28th Place                                              ║
║    Team: MIST_Volatile                                           ║
║                                                                  ║
╚══════════════════════════════════════════════════════════════════╝`;


const PROJECTS_TEXT = `
┌──────────────────────────────────────────────────────────────────┐
│  PROJECT PORTFOLIO                                               │
├──────────────────────────────────────────────────────────────────┤
│                                                                  │
│  Scroll down to view the project cards below, or visit           │
│  individual project pages for detailed information.              │
│                                                                  │
│  Areas of work:                                                  │
│    ► Algorithm optimization & graph theory                       │
│    ► Full-stack web applications                                 │
│    ► Biomedical data processing pipelines                        │
│    ► Competitive programming tooling                             │
│                                                                  │
└──────────────────────────────────────────────────────────────────┘`;

const HELP_TEXT = `
  Available commands:
  
    help       Show this help message
    about      Display profile information
    cp         Show competitive programming standings
    research   Show scientific publications
    projects   Show project portfolio overview
    clear      Clear the terminal
    theme      Toggle terminal theme (emerald / matrix)
    
  Usage: Type a command and press Enter.`;

type HistoryEntry = {
  id: number;
  command: string;
  output: string;
  isError?: boolean;
};

export default function AlgorithmicConsole() {
  const [input, setInput] = useState("");
  const [history, setHistory] = useState<HistoryEntry[]>([
    {
      id: 0,
      command: "",
      output: `Welcome to the Algorithmic Console v1.0.0
Type "help" to see available commands.
`,
    },
  ]);
  const [commandHistory, setCommandHistory] = useState<string[]>([]);
  const [historyIndex, setHistoryIndex] = useState(-1);
  const [isMatrix, setIsMatrix] = useState(false);
  const [nextId, setNextId] = useState(1);

  const inputRef = useRef<HTMLInputElement>(null);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [history]);

  const focusInput = useCallback(() => {
    inputRef.current?.focus();
  }, []);

  const processCommand = useCallback(
    (cmd: string) => {
      const trimmed = cmd.trim().toLowerCase();
      let output: string;
      let isError = false;

      switch (trimmed) {
        case "help":
          output = HELP_TEXT;
          break;
        case "about":
          output = ABOUT_TEXT;
          break;
        case "cp":
          output = CP_TEXT;
          break;
        case "projects":
          output = PROJECTS_TEXT;
          break;
        case "clear":
          setHistory([]);
          setNextId((prev) => prev + 1);
          return;
        case "theme":
          setIsMatrix((prev) => !prev);
          output = `Theme switched to ${!isMatrix ? "matrix" : "emerald"} mode.`;
          break;
        case "":
          output = "";
          break;
        default:
          output = `  Command not found: "${trimmed}"\n  Type "help" to see available commands.`;
          isError = true;
      }

      setHistory((prev) => [
        ...prev,
        { id: nextId, command: cmd, output, isError },
      ]);
      setNextId((prev) => prev + 1);
      setCommandHistory((prev) => [cmd, ...prev]);
      setHistoryIndex(-1);
    },
    [isMatrix, nextId],
  );

  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      processCommand(input);
      setInput("");
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      if (commandHistory.length > 0) {
        const newIndex = Math.min(historyIndex + 1, commandHistory.length - 1);
        setHistoryIndex(newIndex);
        setInput(commandHistory[newIndex]);
      }
    } else if (e.key === "ArrowDown") {
      e.preventDefault();
      if (historyIndex > 0) {
        const newIndex = historyIndex - 1;
        setHistoryIndex(newIndex);
        setInput(commandHistory[newIndex]);
      } else {
        setHistoryIndex(-1);
        setInput("");
      }
    }
  };

  const accentColor = isMatrix ? "text-green-400" : "text-emerald-400";
  const accentBorder = isMatrix
    ? "border-green-500/30"
    : "border-emerald-500/30";
  const accentBg = isMatrix ? "bg-green-500/5" : "bg-emerald-500/5";
  const accentGlow = isMatrix
    ? "shadow-[0_0_30px_rgba(34,197,94,0.1)]"
    : "shadow-[0_0_30px_rgba(16,185,129,0.1)]";

  return (
    <section
      id="console"
      className="w-full max-w-4xl mx-auto"
      aria-label="Interactive Terminal Console"
    >
      <div
        className={`rounded-md border ${accentBorder} ${accentBg} ${accentGlow} overflow-hidden backdrop-blur-sm`}
      >
        {/* Terminal Title Bar */}
        <div
          className={`flex items-center gap-2 px-4 py-3 border-b ${accentBorder}`}
          style={{ background: "var(--bg-code)" }}
        >
          <div className="flex gap-2">
            <div className="w-3 h-3 rounded-md bg-red-500/80" />
            <div className="w-3 h-3 rounded-md bg-yellow-500/80" />
            <div className="w-3 h-3 rounded-md bg-green-500/80" />
          </div>
          <span
            className="ml-3 text-sm font-mono"
            style={{ color: "var(--text-muted)" }}
          >
            guest@hasnat0006:~
          </span>
          <button
            onClick={() => {
              setIsMatrix((prev) => !prev);
            }}
            className={`ml-auto text-xs px-2 py-1 rounded border ${accentBorder} ${accentColor} transition-colors font-mono`}
            onMouseEnter={(e) => {
              e.currentTarget.style.background = "var(--bg-card-hover)";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.background = "";
            }}
            aria-label="Toggle terminal theme"
          >
            {isMatrix ? "◉ MATRIX" : "◎ EMERALD"}
          </button>
        </div>

        {/* Terminal Body */}
        <div
          ref={scrollRef}
          onClick={focusInput}
          className="p-4 h-[420px] overflow-y-auto font-mono text-sm leading-relaxed cursor-text scrollbar-thin scrollbar-thumb-slate-700 scrollbar-track-transparent"
          role="log"
          aria-live="polite"
        >
          {history.map((entry) => (
            <div key={entry.id} className="mb-3">
              {entry.command && (
                <div className="flex items-center gap-0">
                  <span className={accentColor}>guest@hasnat0006</span>
                  <span style={{ color: "var(--text-muted)" }}>:</span>
                  <span style={{ color: "var(--text-accent-secondary)" }}>
                    ~
                  </span>
                  <span style={{ color: "var(--text-muted)" }}>$ </span>
                  <span style={{ color: "var(--text-primary)" }}>
                    {entry.command}
                  </span>
                </div>
              )}
              {entry.output && (
                <pre
                  className="whitespace-pre-wrap mt-1"
                  style={{
                    color: entry.isError
                      ? "var(--text-error)"
                      : "var(--text-secondary)",
                  }}
                >
                  {entry.output}
                </pre>
              )}
            </div>
          ))}

          {/* Active Input Line */}
          <div className="flex items-center gap-0">
            <span className={accentColor}>guest@hasnat0006</span>
            <span style={{ color: "var(--text-muted)" }}>:</span>
            <span style={{ color: "var(--text-accent-secondary)" }}>~</span>
            <span style={{ color: "var(--text-muted)" }}>$ </span>
            <input
              ref={inputRef}
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={handleKeyDown}
              className="flex-1 bg-transparent outline-none"
              style={{
                color: "var(--text-primary)",
                caretColor: "var(--text-accent)",
              }}
              autoFocus
              spellCheck={false}
              aria-label="Terminal command input"
              id="terminal-input"
            />
            <span
              className={`w-2 h-5 animate-pulse`}
              style={{
                background: isMatrix ? "#4ade80" : "var(--text-accent)",
              }}
            />
          </div>
        </div>
      </div>
    </section>
  );
}
