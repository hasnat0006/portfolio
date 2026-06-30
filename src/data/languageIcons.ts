// ── Map GitHub language names to skillicons.dev icon identifiers ──────────
// Full icon reference: https://github.com/tandpfun/skill-icons#readme

const LANGUAGE_ICONS: Record<string, string> = {
  // ── Popular ──────────────────────────────────────────────────────────────
  TypeScript: "ts",
  JavaScript: "js",
  Python: "py",
  "C++": "cpp",
  "C#": "cs",
  C: "c",
  Java: "java",
  Go: "go",
  Rust: "rust",
  Kotlin: "kotlin",
  Swift: "swift",
  PHP: "php",
  Ruby: "ruby",
  Dart: "dart",
  Scala: "scala",

  // ── Shell / Scripting ────────────────────────────────────────────────────
  Shell: "bash",
  Bash: "bash",
  PowerShell: "powershell",
  Zsh: "bash",
  Fish: "bash",
  Batchfile: "bash",

  // ── Web ──────────────────────────────────────────────────────────────────
  HTML: "html",
  CSS: "css",
  SCSS: "sass",
  Sass: "sass",
  Less: "less",
  Stylus: "stylus",
  CoffeeScript: "coffeescript",
  Pug: "pug",

  // ── Functional / Systems ─────────────────────────────────────────────────
  Haskell: "haskell",
  Elixir: "elixir",
  Clojure: "clojure",
  Erlang: "erlang",
  "F#": "fsharp",
  FSharp: "fsharp",
  OCaml: "ocaml",
  Nim: "nim",
  Zig: "zig",
  V: "v",
  Vala: "vala",
  Crystal: "crystal",
  Nix: "nix",
  Lua: "lua",
  Racket: "racket",
  Scheme: "scheme",

  // ── Data / Science ───────────────────────────────────────────────────────
  R: "r",
  Julia: "julia",
  MATLAB: "matlab",
  Matlab: "matlab",
  Octave: "octave",
  Fortran: "fortran",
  Wolfram: "wolfram",
  Mathematica: "wolfram",

  // ── Mobile ────────────────────────────────────────────────────────────────
  "Objective-C": "objectivec",
  ObjectiveC: "objectivec",

  // ── Blockchain ────────────────────────────────────────────────────────────
  Solidity: "solidity",
  Vyper: "vyper",

  // ── Config / Infrastructure ──────────────────────────────────────────────
  Dockerfile: "docker",
  Makefile: "cmake",
  CMake: "cmake",
  "DIGITAL Command Language": "windows",
  PLpgSQL: "postgres",
  SQL: "postgres",
  TSQL: "postgres",
  Procfile: "ruby",

  // ── Tech / Frameworks ────────────────────────────────────────────────────
  "Next.js": "nextjs",
  "React.js": "react",
  "Node.js": "nodejs",
  "Express.js": "express",
  TailwindCSS: "tailwind",
  Supabase: "supabase",
  PostgreSQL: "postgresql",
  JavaFX: "javafx",
  MySQL: "mysql",
  Oracle: "oracle",
  "Scene Builder": "eclipse",
  Xampp: "xampp",

  // ── Other ─────────────────────────────────────────────────────────────────
  TeX: "latex",
  LaTeX: "latex",
  Lex: "latex",
  GDScript: "godot",
  "Game Maker Language": "gamemakerstudio",
  Processing: "processing",
  WebAssembly: "wasm",
  Apex: "apex",
  ColdFusion: "coldfusion",
  "Jupyter Notebook": "jupyter",
  Jupyter: "jupyter",
  PureScript: "purescript",
  Reason: "reason",
  Red: "red",
  ReScript: "rescript",
  Terra: "terraform",
  Tcl: "tcl",
  Groovy: "groovy",
  Gradle: "gradle",
  Vue: "vue",
  Svelte: "svelte",
  Astro: "astro",
  Solid: "solidjs",
};

export default LANGUAGE_ICONS;

export function skillIconUrl(name: string): string {
  const id = LANGUAGE_ICONS[name];
  if (!id) return "";
  return `https://skillicons.dev/icons?i=${id}&theme=light`;
}
