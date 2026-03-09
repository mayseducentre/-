import { useState, useEffect, useCallback } from "react";

// ─── THEME & COLORS ──────────────────────────────────────────────────────────
const THEME = {
  bg: "#0f1117",
  surface: "#161b27",
  card: "#1e2535",
  border: "#2a3347",
  accent: "#4f8ef7",
  accentSoft: "#1a2d4f",
  green: "#22c55e",
  greenSoft: "#0f2d1a",
  amber: "#f59e0b",
  amberSoft: "#2d1f0a",
  red: "#ef4444",
  redSoft: "#2d1010",
  purple: "#a855f7",
  purpleSoft: "#1e0f2d",
  text: "#e8ecf5",
  textSub: "#8891a8",
  textMuted: "#4a5568",
};

// ─── ICONS ────────────────────────────────────────────────────────────────────
const Icon = ({ d, size = 20, color = "currentColor", fill = "none", style = {} }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill={fill} stroke={color} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" style={style}>
    <path d={d} />
  </svg>
);
const Icons = {
  home: "M3 9l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2z",
  courses: "M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5",
  labs: "M9 3H5a2 2 0 00-2 2v4m6-6h10a2 2 0 012 2v4M9 3v18m0 0h10a2 2 0 002-2v-4M9 21H5a2 2 0 01-2-2v-4m0 0h18",
  exams: "M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2",
  projects: "M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-6l-2-2H5a2 2 0 00-2 2z",
  ai: "M12 2a10 10 0 110 20A10 10 0 0112 2zM8 12h8M12 8v8",
  notes: "M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z",
  profile: "M20 21v-2a4 4 0 00-4-4H8a4 4 0 00-4 4v2M12 11a4 4 0 100-8 4 4 0 000 8z",
  chevron: "M9 18l6-6-6-6",
  chevronDown: "M6 9l6 6 6-6",
  star: "M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z",
  check: "M20 6L9 17l-5-5",
  code: "M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4",
  play: "M5 3l14 9-14 9V3z",
  book: "M4 19.5A2.5 2.5 0 016.5 17H20M4 19.5A2.5 2.5 0 004 17V5c0-1.1.9-2 2-2h14v14",
  trophy: "M6 9H4.5a2.5 2.5 0 010-5H6M18 9h1.5a2.5 2.5 0 000-5H18M4 22h16M10 14.66V17c0 .55-.47.98-.97 1.21C7.85 18.75 7 20.24 7 22M14 14.66V17c0 .55.47.98.97 1.21C16.15 18.75 17 20.24 17 22M18 2H6v7a6 6 0 0012 0V2z",
  zap: "M13 2L3 14h9l-1 8 10-12h-9l1-8z",
  install: "M21 15v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4M7 10l5 5 5-5M12 15V3",
  phone: "M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07 19.5 19.5 0 01-6-6 19.79 19.79 0 01-3.07-8.67A2 2 0 014.11 2h3a2 2 0 012 1.72 12.84 12.84 0 00.7 2.81 2 2 0 01-.45 2.11L8.09 9.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45 12.84 12.84 0 002.81.7A2 2 0 0122 16.92z",
  x: "M18 6L6 18M6 6l12 12",
  plus: "M12 5v14M5 12h14",
  save: "M19 21H5a2 2 0 01-2-2V5a2 2 0 012-2h11l5 5v11a2 2 0 01-2 2zM17 21v-8H7v8M7 3v5h8",
  flash: "M11 21l1-7H6l7-13v7h6l-8 13z",
  brain: "M9.5 2A2.5 2.5 0 017 4.5v0A2.5 2.5 0 014.5 7H4a2 2 0 00-2 2v6a2 2 0 002 2h.5A2.5 2.5 0 017 19.5v0A2.5 2.5 0 019.5 22h5a2.5 2.5 0 002.5-2.5v0a2.5 2.5 0 012.5-2.5H20a2 2 0 002-2V9a2 2 0 00-2-2h-.5A2.5 2.5 0 0117 4.5v0A2.5 2.5 0 0114.5 2h-5z",
};

// ─── DATA ─────────────────────────────────────────────────────────────────────
const LANGUAGES = [
  { id: "html", name: "HTML", emoji: "🌐", color: "#e34f26", desc: "Structure of the web" },
  { id: "css", name: "CSS", emoji: "🎨", color: "#264de4", desc: "Style & layout" },
  { id: "js", name: "JavaScript", emoji: "⚡", color: "#f7df1e", desc: "Make things interactive" },
  { id: "python", name: "Python", emoji: "🐍", color: "#3776ab", desc: "AI, data & automation" },
  { id: "cpp", name: "C++", emoji: "⚙️", color: "#00599c", desc: "Systems & performance" },
];

const CONCEPTS = [
  { id: "variable", name: "Variable", icon: "📦" },
  { id: "function", name: "Function", icon: "🔧" },
  { id: "loop", name: "Loop", icon: "🔄" },
  { id: "condition", name: "Condition", icon: "🔀" },
  { id: "array", name: "Array", icon: "📋" },
  { id: "object", name: "Object", icon: "🗂️" },
  { id: "class", name: "Class & OOP", icon: "🏗️" },
  { id: "algorithm", name: "Algorithm", icon: "🧮" },
  { id: "api", name: "API", icon: "🔌" },
  { id: "dom", name: "DOM", icon: "🌳" },
  { id: "recursion", name: "Recursion", icon: "🌀" },
  { id: "debugging", name: "Debugging", icon: "🐛" },
];

const CONCEPT_DATA = {
  variable: {
    formal: "A variable is a named memory location that stores a value which can be read and modified during program execution.",
    simple: "A box with a label where you store information.",
    vivid: "Imagine a locker in school. You write your name on it (the variable name) and put your books inside (the value). Anytime you need your books, you go to YOUR locker.",
    analogy: "A variable is like a cup with a label. The label is the name. Whatever liquid you pour in is the value. You can pour out and refill anytime.",
    code: { js: "let age = 17;\nlet name = 'Alex';\nlet isStudent = true;\nconsole.log(name + ' is ' + age + ' years old');", python: "age = 17\nname = 'Alex'\nis_student = True\nprint(f'{name} is {age} years old')" },
    mistakes: ["Forgetting to declare before using", "Typos in variable names", "Using reserved keywords as names", "Confusing = (assignment) with == (comparison)"],
    interview: "A variable is a symbolic name bound to a value stored in memory. In JavaScript, let and const are block-scoped; var is function-scoped. Variables enable data reuse and mutation across program flow.",
    whyMatters: "Without variables, programs couldn't store or remember anything. Every useful program uses variables.",
    keywords: ["declaration", "assignment", "scope", "data type", "mutable", "immutable", "const", "let"],
    examQuestions: ["What is a variable in programming?", "What is the difference between let and const?", "What does 'scope' mean in relation to variables?"],
  },
  function: {
    formal: "A function is a reusable, named block of code designed to perform a specific task, optionally accepting parameters and returning a value.",
    simple: "A recipe you write once and use many times.",
    vivid: "A function is like a coffee machine. You press the button (call the function), it takes coffee beans and water (parameters), and gives you coffee (return value). You don't redo the wiring every morning.",
    analogy: "Think of a function as a vending machine. You put in a code (arguments), the machine does its thing internally, and gives you a result (return value).",
    code: { js: "function greet(name) {\n  return 'Hello, ' + name + '!';\n}\n\nconsole.log(greet('Alex')); // Hello, Alex!", python: "def greet(name):\n    return f'Hello, {name}!'\n\nprint(greet('Alex'))  # Hello, Alex!" },
    mistakes: ["Forgetting to return a value", "Calling before declaring (in some languages)", "Too many parameters (poor design)", "Side effects without documentation"],
    interview: "Functions encapsulate logic for reuse, maintainability, and abstraction. Pure functions have no side effects and always return the same output for the same input — a key concept in functional programming.",
    whyMatters: "Functions make code DRY (Don't Repeat Yourself), easier to test, and easier to understand.",
    keywords: ["parameter", "argument", "return", "scope", "closure", "pure function", "side effect", "recursion"],
    examQuestions: ["Define a function and explain its purpose.", "What is the difference between a parameter and an argument?", "What does 'return' do in a function?"],
  },
  loop: {
    formal: "A loop is a control structure that repeatedly executes a block of code while a condition is true or for a defined number of iterations.",
    simple: "Doing the same thing many times without writing it many times.",
    vivid: "Imagine printing 1000 invitations by hand vs using a stamp. The stamp is your loop — one motion, repeated 1000 times.",
    analogy: "A loop is like a washing machine cycle. You set it, it repeats the wash-rinse-spin steps until done, then stops.",
    code: { js: "for (let i = 1; i <= 5; i++) {\n  console.log('Step ' + i);\n}\n// Prints Step 1 to Step 5", python: "for i in range(1, 6):\n    print(f'Step {i}')\n# Prints Step 1 to Step 5" },
    mistakes: ["Infinite loops (condition never false)", "Off-by-one errors (< vs <=)", "Modifying the loop variable inside the loop", "Nested loops causing performance issues"],
    interview: "Loops come in for (known iterations), while (condition-based), and do-while forms. Time complexity is often O(n) for single loops, O(n²) for nested. Avoid infinite loops by ensuring the condition terminates.",
    whyMatters: "Loops are fundamental to processing collections, repeating tasks, and building algorithms.",
    keywords: ["iteration", "for loop", "while loop", "increment", "decrement", "break", "continue", "infinite loop"],
    examQuestions: ["What is a loop?", "Difference between for and while loops?", "What causes an infinite loop?"],
  },
  condition: {
    formal: "A conditional statement evaluates a boolean expression and executes different code blocks based on whether the condition is true or false.",
    simple: "Making decisions in code — if this, do that.",
    vivid: "Traffic lights are conditions. If green → go. If red → stop. If yellow → slow down. Your code decides just like that.",
    analogy: "A condition is like a fork in a road. Depending on the sign (condition), you go left or right.",
    code: { js: "let score = 75;\nif (score >= 90) {\n  console.log('A');\n} else if (score >= 70) {\n  console.log('B');\n} else {\n  console.log('C');\n}", python: "score = 75\nif score >= 90:\n    print('A')\nelif score >= 70:\n    print('B')\nelse:\n    print('C')" },
    mistakes: ["Using = instead of == for comparison", "Forgetting the else case", "Overly nested conditions (use early return)", "Not handling edge cases"],
    interview: "Conditional logic drives program flow. Switch statements handle multi-case efficiently. Ternary operators provide inline conditionals. Guard clauses improve readability by handling edge cases early.",
    whyMatters: "Without conditions, programs can't make decisions — they'd be linear scripts, not intelligent software.",
    keywords: ["if", "else", "elif", "switch", "ternary", "boolean", "truthy", "falsy", "comparison operator"],
    examQuestions: ["What is a conditional statement?", "What is the difference between if-else and switch?", "What is a ternary operator?"],
  },
  array: {
    formal: "An array is an ordered, indexed collection of elements of the same or mixed types stored in contiguous memory locations.",
    simple: "A list of items stored in order, each with a number (index) starting from 0.",
    vivid: "An array is like a street of houses. Each house has a number (index 0, 1, 2...). You visit house #3 to get what's stored there.",
    analogy: "A cinema row. Seat 0, Seat 1, Seat 2... each has one person (value). You say 'seat 4' and know exactly who's sitting there.",
    code: { js: "let fruits = ['apple', 'banana', 'mango'];\nconsole.log(fruits[0]); // apple\nconsole.log(fruits.length); // 3\nfruits.push('grape'); // add to end", python: "fruits = ['apple', 'banana', 'mango']\nprint(fruits[0])  # apple\nprint(len(fruits))  # 3\nfruits.append('grape')  # add to end" },
    mistakes: ["Index out of bounds (accessing element that doesn't exist)", "Forgetting arrays start at index 0", "Mutating arrays while iterating", "Using array for key-value data (use object/dict instead)"],
    interview: "Arrays offer O(1) access by index but O(n) search. Dynamic arrays (JS Array, Python list) auto-resize. Key methods: map, filter, reduce for functional processing.",
    whyMatters: "Arrays store collections — lists of users, products, scores. Most programs process collections of data.",
    keywords: ["index", "element", "length", "push", "pop", "map", "filter", "reduce", "iteration", "zero-indexed"],
    examQuestions: ["What is an array?", "What is the first index of an array?", "How do you add an element to an array?"],
  },
  object: {
    formal: "An object is a collection of key-value pairs where keys are strings (or Symbols) and values can be any data type, used to represent entities with properties and behaviors.",
    simple: "A thing with labeled information — like a form filled about a person.",
    vivid: "An object is like an ID card. It has fields: name, age, photo, ID number. Each field has a label (key) and a value.",
    analogy: "A dictionary. You look up a word (key) and find its meaning (value).",
    code: { js: "let student = {\n  name: 'Alex',\n  age: 17,\n  grade: 'A',\n  greet() {\n    return 'Hi, I am ' + this.name;\n  }\n};\nconsole.log(student.name);\nconsole.log(student.greet());", python: "student = {\n    'name': 'Alex',\n    'age': 17,\n    'grade': 'A'\n}\nprint(student['name'])\nprint(student.get('age'))" },
    mistakes: ["Accessing undefined keys (returns undefined, not error in JS)", "Confusing dot notation with bracket notation", "Circular references", "Mutating shared objects unexpectedly"],
    interview: "Objects in JS are reference types. Spread operator {...obj} creates shallow copies. Deep cloning needs JSON.parse(JSON.stringify()) or structuredClone. Object-oriented design organizes code around objects representing real-world entities.",
    whyMatters: "Almost everything in JS is an object. APIs return objects. Databases store objects. Real-world entities are modeled as objects.",
    keywords: ["key", "value", "property", "method", "dot notation", "bracket notation", "reference type", "JSON", "destructuring"],
    examQuestions: ["What is an object in programming?", "How do you access a property of an object?", "What is JSON?"],
  },
};

const PROJECTS = [
  { id: "quiz", name: "Quiz App", emoji: "❓", type: "Game", difficulty: "Beginner", desc: "Multiple choice quiz with scoring" },
  { id: "calc", name: "Calculator", emoji: "🔢", type: "Tool", difficulty: "Beginner", desc: "Full-featured calculator app" },
  { id: "todo", name: "To-Do App", emoji: "✅", type: "Web App", difficulty: "Beginner", desc: "Task manager with localStorage" },
  { id: "portfolio", name: "Portfolio Site", emoji: "🌐", type: "Website", difficulty: "Intermediate", desc: "Personal developer portfolio" },
  { id: "notes", name: "Notes App", emoji: "📝", type: "Web App", difficulty: "Intermediate", desc: "Rich text notes with tags" },
  { id: "snake", name: "Snake Game", emoji: "🐍", type: "Game", difficulty: "Intermediate", desc: "Classic snake with score tracking" },
  { id: "business", name: "Business Site", emoji: "🏢", type: "Website", difficulty: "Intermediate", desc: "Professional business landing page" },
  { id: "dashboard", name: "Dashboard", emoji: "📊", type: "Web App", difficulty: "Advanced", desc: "Analytics dashboard with charts" },
  { id: "school", name: "School Results System", emoji: "🏫", type: "Web App", difficulty: "Advanced", desc: "Student grade management system" },
];

const BADGES = [
  { id: "first_lesson", name: "First Step", emoji: "👣", desc: "Completed your first lesson", xp: 50 },
  { id: "week_streak", name: "Consistent", emoji: "🔥", desc: "7 days in a row", xp: 100 },
  { id: "concept_master", name: "Concept Master", emoji: "🧠", desc: "Mastered 5 concepts", xp: 200 },
  { id: "builder", name: "Builder", emoji: "🏗️", desc: "Completed first project", xp: 300 },
  { id: "debugger", name: "Bug Slayer", emoji: "🐛", desc: "Fixed 10 bugs", xp: 150 },
  { id: "ai_wise", name: "AI Wise", emoji: "🤖", desc: "Completed AI module", xp: 100 },
  { id: "teacher", name: "Teacher Mode", emoji: "👩‍🏫", desc: "Reached level 10", xp: 500 },
  { id: "multilang", name: "Polyglot", emoji: "🌍", desc: "Started 3+ languages", xp: 250 },
];

const EXAMS = {
  mcq: [
    { q: "What does HTML stand for?", options: ["HyperText Markup Language", "High Tech Modern Language", "HyperText Modern Links", "HyperText Markup Links"], answer: 0, explanation: "HTML = HyperText Markup Language. It structures web pages using elements/tags." },
    { q: "Which keyword declares a block-scoped variable in JavaScript?", options: ["var", "let", "define", "make"], answer: 1, explanation: "let is block-scoped. var is function-scoped and hoisted. const is block-scoped but immutable." },
    { q: "What is the index of the first element of an array?", options: ["1", "-1", "0", "Depends on language"], answer: 2, explanation: "Most languages (JS, Python, C++) use 0-based indexing. The first element is always at index 0." },
    { q: "What does a function 'return' do?", options: ["Prints to screen", "Sends a value back to the caller", "Ends the program", "Loops back to start"], answer: 1, explanation: "return sends a value back to where the function was called, making results available to the caller." },
    { q: "Which of these is NOT a valid Python data type?", options: ["int", "string", "boolean", "character"], answer: 3, explanation: "Python has int, str, bool, float, list, dict, etc. Individual 'character' type doesn't exist — use str of length 1." },
  ],
  fillBlank: [
    { q: "A ___ is a named memory location that stores a value.", answer: "variable" },
    { q: "The keyword ___ in JavaScript creates a constant that cannot be reassigned.", answer: "const" },
    { q: "An ___ is an ordered collection of items accessed by index.", answer: "array" },
    { q: "OOP stands for Object-___ Programming.", answer: "Oriented" },
    { q: "A function that calls itself is called ___.", answer: "recursive" },
  ],
};

const AI_PROMPTS = [
  { category: "Learning", prompt: "Explain [concept] to me like I'm 14 years old. Then show me a real-world example and a simple code sample.", why: "Triggers simple + example format" },
  { category: "Debugging", prompt: "Here is my code: [paste code]. It's giving this error: [paste error]. Don't fix it yet — give me a hint about what might be wrong.", why: "Learn to debug, not just copy fixes" },
  { category: "Understanding", prompt: "I think [concept] works like [your guess]. Am I right? If not, correct my thinking.", why: "Tests your mental model, not AI's knowledge" },
  { category: "Practice", prompt: "Give me 3 practice problems about [topic] at beginner level. Show me the expected output but not the solution.", why: "Forces you to solve it yourself" },
  { category: "Review", prompt: "Review my code below for: 1) bugs, 2) readability, 3) performance. Explain each issue clearly.\n[paste code]", why: "Gets structured, educational feedback" },
];

const INSTALL_STEPS = {
  vscode: ["Go to code.visualstudio.com", "Click Download for your OS (Windows/Mac/Linux)", "Run the installer and follow prompts", "Open VS Code — you should see the welcome screen", "Install extensions: Prettier, ESLint, Python, C/C++"],
  nodejs: ["Go to nodejs.org", "Download the LTS version (recommended)", "Run the installer — check 'Add to PATH'", "Open terminal/cmd, type: node --version", "Should see version number like v20.0.0"],
  python: ["Go to python.org/downloads", "Download latest Python 3.x", "IMPORTANT: Check 'Add Python to PATH' during install", "Click Install Now", "Open terminal, type: python --version", "Should see Python 3.x.x"],
  cpp: ["Install VS Code first (see above)", "Go to mingw-w64.org (Windows) or use brew on Mac", "Download and install the compiler", "Add to PATH in System Environment Variables", "Open terminal, type: g++ --version", "Should see GCC version number"],
};

const MOBILE_APPS = [
  { name: "Termux", emoji: "📟", platform: "Android", use: "Full Linux terminal — Python, Node.js, C++", rating: "⭐⭐⭐⭐⭐" },
  { name: "Pydroid 3", emoji: "🐍", platform: "Android", use: "Python IDE with libraries & GUI support", rating: "⭐⭐⭐⭐" },
  { name: "Acode", emoji: "✏️", platform: "Android", use: "Code editor with syntax highlighting", rating: "⭐⭐⭐⭐" },
  { name: "Spck Editor", emoji: "🌐", platform: "Android/iOS", use: "HTML/CSS/JS editor with preview", rating: "⭐⭐⭐⭐" },
  { name: "Replit", emoji: "☁️", platform: "All", use: "Cloud IDE — code from any device", rating: "⭐⭐⭐⭐⭐" },
];

// ─── UTILITY ──────────────────────────────────────────────────────────────────
const useLocalStorage = (key, def) => {
  const [val, setVal] = useState(() => {
    try { const s = localStorage.getItem(key); return s ? JSON.parse(s) : def; } catch { return def; }
  });
  const set = useCallback((v) => {
    const next = typeof v === "function" ? v(val) : v;
    setVal(next);
    try { localStorage.setItem(key, JSON.stringify(next)); } catch {}
  }, [key, val]);
  return [val, set];
};

// ─── COMPONENTS ───────────────────────────────────────────────────────────────

const Badge_el = ({ emoji, label, small }) => (
  <span style={{ display: "inline-flex", alignItems: "center", gap: 4, background: THEME.card, border: `1px solid ${THEME.border}`, borderRadius: 20, padding: small ? "2px 8px" : "4px 12px", fontSize: small ? 11 : 12, color: THEME.textSub }}>
    {emoji} {label}
  </span>
);

const Card = ({ children, style = {}, onClick }) => (
  <div onClick={onClick} style={{ background: THEME.card, border: `1px solid ${THEME.border}`, borderRadius: 14, padding: 20, cursor: onClick ? "pointer" : "default", transition: "border-color 0.2s", ...style }}
    onMouseEnter={e => onClick && (e.currentTarget.style.borderColor = THEME.accent)}
    onMouseLeave={e => onClick && (e.currentTarget.style.borderColor = THEME.border)}>
    {children}
  </div>
);

const Btn = ({ children, onClick, color = THEME.accent, small, outline, style = {} }) => (
  <button onClick={onClick} style={{
    background: outline ? "transparent" : color, color: outline ? color : "#fff",
    border: `1.5px solid ${color}`, borderRadius: 8, padding: small ? "6px 14px" : "10px 20px",
    fontSize: small ? 13 : 14, fontWeight: 600, cursor: "pointer", transition: "opacity 0.2s", ...style
  }} onMouseEnter={e => e.currentTarget.style.opacity = 0.8} onMouseLeave={e => e.currentTarget.style.opacity = 1}>
    {children}
  </button>
);

const ProgressBar = ({ value, color = THEME.accent, label }) => (
  <div style={{ marginBottom: 8 }}>
    {label && <div style={{ display: "flex", justifyContent: "space-between", fontSize: 12, color: THEME.textSub, marginBottom: 4 }}><span>{label}</span><span>{value}%</span></div>}
    <div style={{ height: 6, background: THEME.border, borderRadius: 99, overflow: "hidden" }}>
      <div style={{ width: `${value}%`, height: "100%", background: color, borderRadius: 99, transition: "width 0.5s ease" }} />
    </div>
  </div>
);

const XPBar = ({ xp }) => {
  const level = Math.floor(xp / 200) + 1;
  const progress = (xp % 200) / 2;
  return (
    <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
      <div style={{ width: 38, height: 38, borderRadius: 10, background: THEME.accentSoft, border: `2px solid ${THEME.accent}`, display: "flex", alignItems: "center", justifyContent: "center", fontWeight: 700, color: THEME.accent, fontSize: 14 }}>
        {level}
      </div>
      <div style={{ flex: 1 }}>
        <div style={{ fontSize: 11, color: THEME.textSub, marginBottom: 3 }}>Level {level} · {xp} XP</div>
        <ProgressBar value={progress} />
      </div>
    </div>
  );
};

const Collapsible = ({ title, icon, children, defaultOpen = false, accent }) => {
  const [open, setOpen] = useState(defaultOpen);
  return (
    <div style={{ border: `1px solid ${open && accent ? accent : THEME.border}`, borderRadius: 12, marginBottom: 10, overflow: "hidden", transition: "border-color 0.2s" }}>
      <div onClick={() => setOpen(!open)} style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "14px 18px", cursor: "pointer", background: open ? THEME.surface : "transparent" }}>
        <div style={{ display: "flex", alignItems: "center", gap: 10, fontWeight: 600, color: THEME.text, fontSize: 14 }}>
          {icon && <span style={{ fontSize: 18 }}>{icon}</span>}{title}
        </div>
        <Icon d={open ? Icons.chevronDown : Icons.chevron} size={16} color={THEME.textSub} style={{ transform: open ? "rotate(0deg)" : "rotate(0deg)", transition: "transform 0.2s" }} />
      </div>
      {open && <div style={{ padding: "0 18px 18px" }}>{children}</div>}
    </div>
  );
};

// ─── PAGES ────────────────────────────────────────────────────────────────────

const HomePage = ({ profile, setPage, earnXP }) => {
  const streak = profile.streak || 0;
  const xp = profile.xp || 0;
  const level = Math.floor(xp / 200) + 1;
  const completedConcepts = profile.completedConcepts || [];
  const startedLangs = profile.startedLangs || [];

  return (
    <div>
      {/* Hero */}
      <div style={{ background: `linear-gradient(135deg, ${THEME.accentSoft} 0%, ${THEME.surface} 100%)`, borderRadius: 18, padding: "28px 24px", marginBottom: 20, border: `1px solid ${THEME.border}` }}>
        <div style={{ fontSize: 13, color: THEME.accent, fontWeight: 600, marginBottom: 6, textTransform: "uppercase", letterSpacing: 1 }}>Welcome back 👋</div>
        <div style={{ fontSize: 24, fontWeight: 800, color: THEME.text, marginBottom: 8 }}>{profile.name || "Engineer"}</div>
        <XPBar xp={xp} />
        <div style={{ display: "flex", gap: 12, marginTop: 16, flexWrap: "wrap" }}>
          <Badge_el emoji="🔥" label={`${streak} day streak`} />
          <Badge_el emoji="🏅" label={`${(profile.badges || []).length} badges`} />
          <Badge_el emoji="📚" label={`${completedConcepts.length} concepts`} />
        </div>
      </div>

      {/* Daily Challenge */}
      <Card style={{ marginBottom: 20, borderColor: THEME.amber, background: THEME.amberSoft }}>
        <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 8 }}>
          <span style={{ fontSize: 22 }}>⚡</span>
          <div style={{ fontWeight: 700, color: THEME.amber, fontSize: 15 }}>Daily Challenge</div>
        </div>
        <div style={{ color: THEME.text, marginBottom: 12, lineHeight: 1.6 }}>
          Write a function that takes an array of numbers and returns the sum of all even numbers.
        </div>
        <div style={{ display: "flex", gap: 8 }}>
          <Btn small color={THEME.amber} onClick={() => { setPage("labs"); earnXP(30); }}>Start Challenge (+30 XP)</Btn>
          <Badge_el emoji="⏱️" label="~15 min" small />
        </div>
      </Card>

      {/* Quick Nav */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(2, 1fr)", gap: 12, marginBottom: 20 }}>
        {[
          { icon: "📚", label: "Courses", sub: "Learn languages", page: "courses", color: THEME.accent },
          { icon: "🧪", label: "Labs", sub: "Practice coding", page: "labs", color: THEME.green },
          { icon: "📝", label: "Exams", sub: "Test yourself", page: "exams", color: THEME.purple },
          { icon: "🚀", label: "Projects", sub: "Build real apps", page: "projects", color: THEME.amber },
        ].map(item => (
          <Card key={item.page} onClick={() => setPage(item.page)} style={{ padding: 16 }}>
            <div style={{ fontSize: 26, marginBottom: 6 }}>{item.icon}</div>
            <div style={{ fontWeight: 700, color: THEME.text, fontSize: 14 }}>{item.label}</div>
            <div style={{ fontSize: 12, color: THEME.textSub }}>{item.sub}</div>
          </Card>
        ))}
      </div>

      {/* Languages Progress */}
      <Card style={{ marginBottom: 20 }}>
        <div style={{ fontWeight: 700, color: THEME.text, marginBottom: 14, fontSize: 15 }}>Languages</div>
        {LANGUAGES.map(lang => (
          <div key={lang.id} style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 12 }}>
            <span style={{ fontSize: 20, width: 28 }}>{lang.emoji}</span>
            <div style={{ flex: 1 }}>
              <div style={{ fontSize: 13, fontWeight: 600, color: THEME.text, marginBottom: 3 }}>{lang.name}</div>
              <ProgressBar value={startedLangs.includes(lang.id) ? Math.floor(Math.random() * 40) + 10 : 0} color={lang.color} />
            </div>
            <Btn small outline color={THEME.accent} onClick={() => setPage("courses")}>Go</Btn>
          </div>
        ))}
      </Card>

      {/* Recent Badges */}
      {(profile.badges || []).length > 0 && (
        <Card>
          <div style={{ fontWeight: 700, color: THEME.text, marginBottom: 12, fontSize: 15 }}>Recent Badges</div>
          <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
            {(profile.badges || []).slice(0, 4).map(bid => {
              const b = BADGES.find(x => x.id === bid);
              return b ? <Badge_el key={bid} emoji={b.emoji} label={b.name} /> : null;
            })}
          </div>
        </Card>
      )}
    </div>
  );
};

const CoursesPage = ({ earnXP, profile, setProfile }) => {
  const [selectedLang, setSelectedLang] = useState(null);
  const [selectedLevel, setSelectedLevel] = useState(null);
  const [selectedConcept, setSelectedConcept] = useState(null);

  const langColors = { html: "#e34f26", css: "#264de4", js: "#f7df1e", python: "#3776ab", cpp: "#00599c" };
  const codeExamples = {
    html: { beginner: `<!DOCTYPE html>\n<html>\n  <head>\n    <title>My Page</title>\n  </head>\n  <body>\n    <h1>Hello World!</h1>\n    <p>My first webpage.</p>\n  </body>\n</html>` },
    css: { beginner: `body {\n  background-color: #f0f0f0;\n  font-family: Arial, sans-serif;\n}\n\nh1 {\n  color: blue;\n  text-align: center;\n}\n\np {\n  color: gray;\n  font-size: 18px;\n}` },
    js: { beginner: `// Variables\nlet name = 'Alex';\nlet age = 17;\n\n// Function\nfunction greet(person) {\n  return 'Hello, ' + person + '!';\n}\n\n// Output\nconsole.log(greet(name));\nconsole.log('Age:', age);` },
    python: { beginner: `# Variables\nname = 'Alex'\nage = 17\n\n# Function\ndef greet(person):\n    return f'Hello, {person}!'\n\n# Output\nprint(greet(name))\nprint(f'Age: {age}')` },
    cpp: { beginner: `#include <iostream>\nusing namespace std;\n\nint main() {\n    string name = "Alex";\n    int age = 17;\n    \n    cout << "Hello, " << name << "!" << endl;\n    cout << "Age: " << age << endl;\n    \n    return 0;\n}` },
  };

  if (selectedConcept) {
    const data = CONCEPT_DATA[selectedConcept.id];
    if (!data) return (
      <div>
        <Btn outline color={THEME.accent} onClick={() => setSelectedConcept(null)}>← Back</Btn>
        <div style={{ color: THEME.textSub, marginTop: 20, textAlign: "center" }}>Concept details coming soon!</div>
      </div>
    );
    return (
      <div>
        <Btn outline color={THEME.accent} small onClick={() => setSelectedConcept(null)}>← Back</Btn>
        <div style={{ marginTop: 16, marginBottom: 20 }}>
          <div style={{ fontSize: 28, marginBottom: 4 }}>{selectedConcept.icon}</div>
          <div style={{ fontSize: 22, fontWeight: 800, color: THEME.text }}>{selectedConcept.name}</div>
        </div>

        <Collapsible title="📖 Formal Definition" defaultOpen icon="📖">
          <p style={{ color: THEME.textSub, lineHeight: 1.8, marginTop: 10 }}>{data.formal}</p>
        </Collapsible>
        <Collapsible title="💡 Simple Explanation" icon="💡">
          <p style={{ color: THEME.text, lineHeight: 1.8, marginTop: 10, fontSize: 15 }}>{data.simple}</p>
        </Collapsible>
        <Collapsible title="🎨 Vivid Explanation" icon="🎨">
          <p style={{ color: THEME.text, lineHeight: 1.8, marginTop: 10 }}>{data.vivid}</p>
        </Collapsible>
        <Collapsible title="🌍 Real-Life Analogy" icon="🌍">
          <p style={{ color: THEME.text, lineHeight: 1.8, marginTop: 10 }}>{data.analogy}</p>
        </Collapsible>
        <Collapsible title="💻 Code Examples" icon="💻">
          {Object.entries(data.code).map(([lang, code]) => (
            <div key={lang} style={{ marginTop: 12 }}>
              <div style={{ fontSize: 12, color: THEME.accent, fontWeight: 600, marginBottom: 6, textTransform: "uppercase" }}>{lang === "js" ? "JavaScript" : lang === "python" ? "Python" : lang}</div>
              <pre style={{ background: THEME.bg, border: `1px solid ${THEME.border}`, borderRadius: 10, padding: 16, color: "#a8d8ff", fontSize: 13, overflow: "auto", fontFamily: "monospace", lineHeight: 1.6 }}>{code}</pre>
            </div>
          ))}
        </Collapsible>
        <Collapsible title="⚠️ Common Mistakes" icon="⚠️">
          <ul style={{ marginTop: 10, color: THEME.textSub, lineHeight: 2, paddingLeft: 20 }}>
            {data.mistakes.map((m, i) => <li key={i}>{m}</li>)}
          </ul>
        </Collapsible>
        <Collapsible title="🎤 Interview-Level Explanation" icon="🎤">
          <p style={{ color: THEME.text, lineHeight: 1.8, marginTop: 10 }}>{data.interview}</p>
        </Collapsible>
        <Collapsible title="🔑 Keywords" icon="🔑">
          <div style={{ display: "flex", flexWrap: "wrap", gap: 8, marginTop: 10 }}>
            {data.keywords.map(k => <Badge_el key={k} emoji="" label={k} />)}
          </div>
        </Collapsible>
        <Collapsible title="📝 Possible Exam Questions" icon="📝">
          <ul style={{ marginTop: 10, color: THEME.textSub, lineHeight: 2, paddingLeft: 20 }}>
            {data.examQuestions.map((q, i) => <li key={i}>{q}</li>)}
          </ul>
        </Collapsible>
        <div style={{ marginTop: 16 }}>
          <Btn onClick={() => { earnXP(25); setSelectedConcept(null); }} color={THEME.green}>✓ Mark as Learned (+25 XP)</Btn>
        </div>
      </div>
    );
  }

  if (selectedLang && selectedLevel) {
    const ex = codeExamples[selectedLang.id]?.[selectedLevel] || "// Example coming soon!";
    const lang = LANGUAGES.find(l => l.id === selectedLang.id);
    return (
      <div>
        <Btn outline color={THEME.accent} small onClick={() => setSelectedLevel(null)}>← Back</Btn>
        <div style={{ marginTop: 16, marginBottom: 20, display: "flex", alignItems: "center", gap: 12 }}>
          <span style={{ fontSize: 28 }}>{lang.emoji}</span>
          <div>
            <div style={{ fontSize: 18, fontWeight: 800, color: THEME.text }}>{lang.name} — {selectedLevel.charAt(0).toUpperCase() + selectedLevel.slice(1)}</div>
            <div style={{ fontSize: 13, color: THEME.textSub }}>{lang.desc}</div>
          </div>
        </div>

        {selectedLevel === "beginner" && (
          <>
            <Collapsible title="What is Programming?" defaultOpen icon="🤔">
              <p style={{ color: THEME.text, lineHeight: 1.8, marginTop: 10 }}>
                Programming is giving instructions to a computer in a language it understands. Computers are powerful but dumb — they only do exactly what you tell them, nothing more. A program is a set of precise instructions that solves a problem or performs a task.
              </p>
              <p style={{ color: THEME.textSub, lineHeight: 1.8, marginTop: 8 }}>
                Think of a recipe. You give step-by-step instructions to a chef (computer). The chef follows EXACTLY what you wrote. If you forget a step, the dish fails. That's programming.
              </p>
            </Collapsible>
            <Collapsible title="Basic Syntax" icon="📝">
              <p style={{ color: THEME.text, marginTop: 10, lineHeight: 1.8 }}>Syntax is the grammar of a programming language. Every language has rules about how code must be written.</p>
              <pre style={{ background: THEME.bg, border: `1px solid ${THEME.border}`, borderRadius: 10, padding: 16, color: "#a8d8ff", fontSize: 13, overflow: "auto", marginTop: 10, fontFamily: "monospace" }}>{ex}</pre>
            </Collapsible>
            <Collapsible title="Variables & Data Types" icon="📦">
              <p style={{ color: THEME.text, marginTop: 10, lineHeight: 1.8 }}>Variables store information. Data types define what kind of information: numbers, text, true/false, lists.</p>
            </Collapsible>
            <Collapsible title="Operators" icon="➕">
              <p style={{ color: THEME.text, marginTop: 10, lineHeight: 1.8 }}>Operators perform operations: arithmetic (+, -, *, /), comparison (==, !=, &lt;, &gt;), logical (&&, ||, !).</p>
            </Collapsible>
          </>
        )}
        {selectedLevel === "intermediate" && (
          <>
            <Collapsible title="Functions" defaultOpen icon="🔧">
              <p style={{ color: THEME.text, marginTop: 10, lineHeight: 1.8 }}>Reusable blocks of code that take input, do something, and optionally return output.</p>
            </Collapsible>
            <Collapsible title="Loops" icon="🔄">
              <p style={{ color: THEME.text, marginTop: 10, lineHeight: 1.8 }}>for, while, do-while — repeat actions without rewriting code.</p>
            </Collapsible>
            <Collapsible title="Conditions & Logic" icon="🔀">
              <p style={{ color: THEME.text, marginTop: 10, lineHeight: 1.8 }}>if/else, switch — make decisions in your code based on conditions.</p>
            </Collapsible>
            <Collapsible title="Arrays & Collections" icon="📋">
              <p style={{ color: THEME.text, marginTop: 10, lineHeight: 1.8 }}>Store multiple values, iterate through them, use built-in methods.</p>
            </Collapsible>
          </>
        )}
        {selectedLevel === "advanced" && (
          <>
            <Collapsible title="Object-Oriented Programming" defaultOpen icon="🏗️">
              <p style={{ color: THEME.text, marginTop: 10, lineHeight: 1.8 }}>Classes, objects, inheritance, encapsulation, polymorphism — model the real world in code.</p>
            </Collapsible>
            <Collapsible title="Asynchronous Programming" icon="⚡">
              <p style={{ color: THEME.text, marginTop: 10, lineHeight: 1.8 }}>Promises, async/await, callbacks — handle operations that take time without freezing the app.</p>
            </Collapsible>
            <Collapsible title="Architecture & Design Patterns" icon="🏛️">
              <p style={{ color: THEME.text, marginTop: 10, lineHeight: 1.8 }}>MVC, Module pattern, Singleton, Observer — proven solutions to common design problems.</p>
            </Collapsible>
            <Collapsible title="Performance Optimization" icon="🚀">
              <p style={{ color: THEME.text, marginTop: 10, lineHeight: 1.8 }}>Time complexity, space complexity, caching, lazy loading — make your code faster and leaner.</p>
            </Collapsible>
          </>
        )}

        <div style={{ marginTop: 20 }}>
          <Btn onClick={() => earnXP(40)} color={THEME.green}>✓ Complete Section (+40 XP)</Btn>
        </div>
      </div>
    );
  }

  if (selectedLang) {
    return (
      <div>
        <Btn outline color={THEME.accent} small onClick={() => setSelectedLang(null)}>← Back</Btn>
        <div style={{ marginTop: 16, textAlign: "center", padding: "20px 0" }}>
          <div style={{ fontSize: 44 }}>{selectedLang.emoji}</div>
          <div style={{ fontSize: 22, fontWeight: 800, color: THEME.text, marginTop: 8 }}>{selectedLang.name}</div>
          <div style={{ color: THEME.textSub, marginTop: 4 }}>{selectedLang.desc}</div>
        </div>
        <div style={{ display: "grid", gap: 12 }}>
          {["beginner", "intermediate", "advanced"].map((level, i) => (
            <Card key={level} onClick={() => setSelectedLevel(level)} style={{ display: "flex", alignItems: "center", gap: 14 }}>
              <div style={{ width: 44, height: 44, borderRadius: 12, background: [THEME.greenSoft, THEME.accentSoft, THEME.purpleSoft][i], display: "flex", alignItems: "center", justifyContent: "center", fontSize: 20 }}>
                {["🌱", "⚡", "🚀"][i]}
              </div>
              <div>
                <div style={{ fontWeight: 700, color: THEME.text, fontSize: 15, textTransform: "capitalize" }}>{level}</div>
                <div style={{ fontSize: 12, color: THEME.textSub }}>
                  {["Fundamentals & first programs", "Functions, loops & data structures", "OOP, patterns & real projects"][i]}
                </div>
              </div>
            </Card>
          ))}
        </div>
        <div style={{ marginTop: 24 }}>
          <div style={{ fontWeight: 700, color: THEME.text, marginBottom: 14, fontSize: 15 }}>📘 Concept Mastery Engine</div>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(2, 1fr)", gap: 8 }}>
            {CONCEPTS.map(c => (
              <Card key={c.id} onClick={() => setSelectedConcept(c)} style={{ padding: 12, display: "flex", alignItems: "center", gap: 8 }}>
                <span style={{ fontSize: 20 }}>{c.icon}</span>
                <span style={{ fontSize: 13, fontWeight: 600, color: THEME.text }}>{c.name}</span>
              </Card>
            ))}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div>
      <div style={{ fontSize: 20, fontWeight: 800, color: THEME.text, marginBottom: 6 }}>Courses</div>
      <div style={{ color: THEME.textSub, fontSize: 13, marginBottom: 20 }}>Choose a language to begin your journey</div>
      <div style={{ display: "grid", gap: 14 }}>
        {LANGUAGES.map(lang => (
          <Card key={lang.id} onClick={() => setSelectedLang(lang)} style={{ display: "flex", alignItems: "center", gap: 16 }}>
            <div style={{ width: 52, height: 52, borderRadius: 14, background: `${lang.color}22`, border: `2px solid ${lang.color}44`, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 26 }}>
              {lang.emoji}
            </div>
            <div style={{ flex: 1 }}>
              <div style={{ fontWeight: 700, color: THEME.text, fontSize: 16 }}>{lang.name}</div>
              <div style={{ fontSize: 12, color: THEME.textSub, marginTop: 2 }}>{lang.desc}</div>
              <div style={{ display: "flex", gap: 6, marginTop: 8 }}>
                {["Beginner", "Intermediate", "Advanced"].map(l => <Badge_el key={l} emoji="" label={l} small />)}
              </div>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
};

const LabsPage = ({ earnXP }) => {
  const [activeTab, setActiveTab] = useState("editor");
  const [code, setCode] = useState(`// Welcome to the Code Lab!\n// Write your code here and click Run\n\nfunction greet(name) {\n  return 'Hello, ' + name + '!';\n}\n\nconsole.log(greet('World'));\nconsole.log('2 + 2 =', 2 + 2);\n\n// Try modifying this code!`);
  const [output, setOutput] = useState("");
  const [challenge, setChallenge] = useState(null);

  const challenges = [
    { id: 1, title: "Fix the Bug", emoji: "🐛", desc: "This function should add two numbers but has a bug.", broken: `function add(a, b) {\n  return a - b; // Bug here!\n}\nconsole.log(add(5, 3)); // Should print 8`, hint: "Look at the operator inside the function" },
    { id: 2, title: "Complete the Loop", emoji: "🔄", desc: "Write a loop that prints numbers 1 to 10.", broken: `// Write a for loop that prints 1 to 10\nfor (let i = ___; i <= ___; i++) {\n  console.log(i);\n}`, hint: "Start at 1, end at 10" },
    { id: 3, title: "Array Challenge", emoji: "📋", desc: "Filter an array to only keep even numbers.", broken: `let nums = [1,2,3,4,5,6,7,8,9,10];\nlet evens = nums.filter(n => n ___ 2 === 0);\nconsole.log(evens);`, hint: "Use the modulo (%) operator" },
  ];

  const runCode = () => {
    const logs = [];
    const originalLog = console.log;
    console.log = (...args) => logs.push(args.map(a => typeof a === "object" ? JSON.stringify(a) : String(a)).join(" "));
    try {
      // eslint-disable-next-line no-new-func
      new Function(code)();
      setOutput(logs.length ? logs.join("\n") : "✓ Code ran with no output");
      earnXP(10);
    } catch (e) {
      setOutput("❌ Error: " + e.message);
    }
    console.log = originalLog;
  };

  return (
    <div>
      <div style={{ fontSize: 20, fontWeight: 800, color: THEME.text, marginBottom: 16 }}>🧪 Labs</div>
      <div style={{ display: "flex", gap: 8, marginBottom: 16 }}>
        {["editor", "challenges"].map(t => (
          <button key={t} onClick={() => setActiveTab(t)} style={{ padding: "8px 16px", borderRadius: 8, border: `1.5px solid ${activeTab === t ? THEME.accent : THEME.border}`, background: activeTab === t ? THEME.accentSoft : "transparent", color: activeTab === t ? THEME.accent : THEME.textSub, fontSize: 13, fontWeight: 600, cursor: "pointer", textTransform: "capitalize" }}>
            {t === "editor" ? "💻 Code Editor" : "🎯 Challenges"}
          </button>
        ))}
      </div>

      {activeTab === "editor" && (
        <div>
          <div style={{ background: THEME.bg, border: `1px solid ${THEME.border}`, borderRadius: 12, overflow: "hidden", marginBottom: 12 }}>
            <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "10px 14px", borderBottom: `1px solid ${THEME.border}`, background: THEME.surface }}>
              <span style={{ fontSize: 13, color: THEME.textSub, fontWeight: 600 }}>⚡ JavaScript Editor</span>
              <Btn small color={THEME.green} onClick={runCode}>▶ Run</Btn>
            </div>
            <textarea value={code} onChange={e => setCode(e.target.value)} style={{ width: "100%", minHeight: 220, background: THEME.bg, color: "#a8d8ff", border: "none", outline: "none", padding: 16, fontSize: 13, fontFamily: "monospace", lineHeight: 1.7, resize: "vertical", boxSizing: "border-box" }} />
          </div>
          {output && (
            <div style={{ background: THEME.bg, border: `1px solid ${THEME.border}`, borderRadius: 10, padding: 14, fontFamily: "monospace", fontSize: 13, color: output.startsWith("❌") ? THEME.red : THEME.green, whiteSpace: "pre-wrap", marginBottom: 12 }}>
              <div style={{ color: THEME.textMuted, fontSize: 11, marginBottom: 6 }}>OUTPUT</div>
              {output}
            </div>
          )}
          <div style={{ fontSize: 12, color: THEME.textSub, lineHeight: 1.6 }}>
            💡 <strong style={{ color: THEME.text }}>Tips:</strong> Modify the code and press Run. Each run earns +10 XP. Use console.log() to see output.
          </div>
        </div>
      )}

      {activeTab === "challenges" && (
        <div>
          {!challenge ? (
            <div style={{ display: "grid", gap: 12 }}>
              {challenges.map(c => (
                <Card key={c.id} onClick={() => { setChallenge(c); setCode(c.broken); setOutput(""); }}>
                  <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 8 }}>
                    <span style={{ fontSize: 22 }}>{c.emoji}</span>
                    <div style={{ fontWeight: 700, color: THEME.text, fontSize: 14 }}>{c.title}</div>
                  </div>
                  <div style={{ color: THEME.textSub, fontSize: 13, lineHeight: 1.6 }}>{c.desc}</div>
                </Card>
              ))}
            </div>
          ) : (
            <div>
              <Btn outline color={THEME.accent} small onClick={() => setChallenge(null)}>← All Challenges</Btn>
              <div style={{ marginTop: 14, marginBottom: 12 }}>
                <div style={{ fontWeight: 700, color: THEME.text, fontSize: 16 }}>{challenge.emoji} {challenge.title}</div>
                <div style={{ color: THEME.textSub, fontSize: 13, marginTop: 4 }}>{challenge.desc}</div>
              </div>
              <div style={{ background: THEME.amberSoft, border: `1px solid ${THEME.amber}`, borderRadius: 10, padding: "10px 14px", marginBottom: 12, fontSize: 13, color: THEME.amber }}>
                💡 Hint: {challenge.hint}
              </div>
              <div style={{ background: THEME.bg, border: `1px solid ${THEME.border}`, borderRadius: 12, overflow: "hidden", marginBottom: 12 }}>
                <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "10px 14px", borderBottom: `1px solid ${THEME.border}`, background: THEME.surface }}>
                  <span style={{ fontSize: 13, color: THEME.textSub }}>Fix the code below</span>
                  <Btn small color={THEME.green} onClick={runCode}>▶ Run</Btn>
                </div>
                <textarea value={code} onChange={e => setCode(e.target.value)} style={{ width: "100%", minHeight: 180, background: THEME.bg, color: "#a8d8ff", border: "none", outline: "none", padding: 16, fontSize: 13, fontFamily: "monospace", lineHeight: 1.7, resize: "vertical", boxSizing: "border-box" }} />
              </div>
              {output && <div style={{ background: THEME.bg, border: `1px solid ${THEME.border}`, borderRadius: 10, padding: 14, fontFamily: "monospace", fontSize: 13, color: output.startsWith("❌") ? THEME.red : THEME.green, whiteSpace: "pre-wrap" }}>{output}</div>}
            </div>
          )}
        </div>
      )}
    </div>
  );
};

const ExamsPage = ({ earnXP }) => {
  const [mode, setMode] = useState(null);
  const [current, setCurrent] = useState(0);
  const [selected, setSelected] = useState(null);
  const [answered, setAnswered] = useState(false);
  const [score, setScore] = useState(0);
  const [done, setDone] = useState(false);
  const [fillAnswers, setFillAnswers] = useState({});
  const [fillChecked, setFillChecked] = useState(false);

  const reset = () => { setCurrent(0); setSelected(null); setAnswered(false); setScore(0); setDone(false); setFillAnswers({}); setFillChecked(false); setMode(null); };

  if (!mode) return (
    <div>
      <div style={{ fontSize: 20, fontWeight: 800, color: THEME.text, marginBottom: 6 }}>Exams</div>
      <div style={{ color: THEME.textSub, fontSize: 13, marginBottom: 20 }}>Test your knowledge and prepare for real exams</div>
      <div style={{ display: "grid", gap: 12 }}>
        {[
          { id: "mcq", emoji: "🔘", name: "Multiple Choice", desc: "5 questions · Instant feedback", color: THEME.accent },
          { id: "fill", emoji: "✏️", name: "Fill in the Blank", desc: "5 questions · Keyword recall", color: THEME.green },
          { id: "practice", emoji: "💭", name: "Short Answer Guide", desc: "Practice explaining concepts", color: THEME.purple },
        ].map(m => (
          <Card key={m.id} onClick={() => setMode(m.id)} style={{ display: "flex", alignItems: "center", gap: 14 }}>
            <div style={{ width: 46, height: 46, borderRadius: 12, background: `${m.color}22`, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 22 }}>{m.emoji}</div>
            <div>
              <div style={{ fontWeight: 700, color: THEME.text, fontSize: 15 }}>{m.name}</div>
              <div style={{ fontSize: 12, color: THEME.textSub }}>{m.desc}</div>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );

  if (mode === "mcq") {
    if (done) return (
      <div style={{ textAlign: "center", padding: "40px 0" }}>
        <div style={{ fontSize: 48, marginBottom: 12 }}>{score >= 4 ? "🏆" : score >= 3 ? "👍" : "📚"}</div>
        <div style={{ fontSize: 22, fontWeight: 800, color: THEME.text }}>Score: {score}/{EXAMS.mcq.length}</div>
        <div style={{ color: THEME.textSub, marginTop: 8, marginBottom: 20 }}>{score >= 4 ? "Excellent! You really know this." : score >= 3 ? "Good job! Review the ones you missed." : "Keep studying — you'll get there!"}</div>
        <Btn onClick={() => { earnXP(score * 20); reset(); }}>Collect XP & Restart</Btn>
      </div>
    );
    const q = EXAMS.mcq[current];
    return (
      <div>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 16 }}>
          <Btn outline color={THEME.accent} small onClick={reset}>← Exit</Btn>
          <div style={{ fontSize: 13, color: THEME.textSub }}>Question {current + 1} of {EXAMS.mcq.length}</div>
        </div>
        <ProgressBar value={((current) / EXAMS.mcq.length) * 100} />
        <Card style={{ marginBottom: 16 }}>
          <div style={{ fontWeight: 700, color: THEME.text, fontSize: 16, lineHeight: 1.6 }}>{q.q}</div>
        </Card>
        <div style={{ display: "grid", gap: 10 }}>
          {q.options.map((opt, i) => {
            let bg = THEME.card, border = THEME.border, color = THEME.text;
            if (answered) {
              if (i === q.answer) { bg = THEME.greenSoft; border = THEME.green; color = THEME.green; }
              else if (i === selected) { bg = THEME.redSoft; border = THEME.red; color = THEME.red; }
            } else if (i === selected) { bg = THEME.accentSoft; border = THEME.accent; }
            return (
              <div key={i} onClick={() => !answered && setSelected(i)} style={{ padding: "12px 16px", borderRadius: 10, border: `1.5px solid ${border}`, background: bg, color, cursor: answered ? "default" : "pointer", fontWeight: 500, fontSize: 14, transition: "all 0.2s" }}>
                {opt}
              </div>
            );
          })}
        </div>
        {!answered && selected !== null && (
          <Btn style={{ marginTop: 14 }} onClick={() => { setAnswered(true); if (selected === q.answer) setScore(s => s + 1); }}>Check Answer</Btn>
        )}
        {answered && (
          <div style={{ marginTop: 12 }}>
            <div style={{ background: THEME.greenSoft, border: `1px solid ${THEME.green}`, borderRadius: 10, padding: "12px 14px", color: THEME.green, fontSize: 13, lineHeight: 1.7, marginBottom: 12 }}>
              💡 {q.explanation}
            </div>
            <Btn onClick={() => { if (current + 1 < EXAMS.mcq.length) { setCurrent(c => c + 1); setSelected(null); setAnswered(false); } else setDone(true); }}>
              {current + 1 < EXAMS.mcq.length ? "Next Question →" : "See Results"}
            </Btn>
          </div>
        )}
      </div>
    );
  }

  if (mode === "fill") {
    return (
      <div>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 20 }}>
          <Btn outline color={THEME.accent} small onClick={reset}>← Exit</Btn>
          <div style={{ fontSize: 14, fontWeight: 600, color: THEME.text }}>Fill in the Blank</div>
        </div>
        {EXAMS.fillBlank.map((q, i) => {
          const userAns = (fillAnswers[i] || "").trim().toLowerCase();
          const correct = q.answer.toLowerCase();
          const isCorrect = fillChecked && userAns === correct;
          const isWrong = fillChecked && userAns !== correct;
          return (
            <Card key={i} style={{ marginBottom: 12, borderColor: fillChecked ? (isCorrect ? THEME.green : THEME.red) : THEME.border }}>
              <div style={{ fontSize: 14, color: THEME.text, lineHeight: 1.7, marginBottom: 10 }}>{i + 1}. {q.q}</div>
              <input value={fillAnswers[i] || ""} onChange={e => setFillAnswers(prev => ({ ...prev, [i]: e.target.value }))} disabled={fillChecked}
                style={{ width: "100%", background: THEME.bg, border: `1.5px solid ${fillChecked ? (isCorrect ? THEME.green : THEME.red) : THEME.border}`, borderRadius: 8, padding: "8px 12px", color: THEME.text, fontSize: 14, outline: "none", boxSizing: "border-box" }}
                placeholder="Your answer..." />
              {isWrong && <div style={{ marginTop: 6, fontSize: 12, color: THEME.green }}>✓ Answer: {q.answer}</div>}
            </Card>
          );
        })}
        {!fillChecked ? (
          <Btn onClick={() => setFillChecked(true)} color={THEME.green}>Check All Answers</Btn>
        ) : (
          <div>
            <div style={{ color: THEME.textSub, fontSize: 13, marginBottom: 12 }}>
              Score: {EXAMS.fillBlank.filter((q, i) => (fillAnswers[i] || "").trim().toLowerCase() === q.answer.toLowerCase()).length} / {EXAMS.fillBlank.length}
            </div>
            <Btn onClick={() => { earnXP(50); reset(); }}>Collect XP & Done</Btn>
          </div>
        )}
      </div>
    );
  }

  if (mode === "practice") {
    return (
      <div>
        <Btn outline color={THEME.accent} small onClick={reset}>← Exit</Btn>
        <div style={{ marginTop: 16, marginBottom: 20 }}>
          <div style={{ fontSize: 18, fontWeight: 700, color: THEME.text }}>💭 Short Answer Practice</div>
          <div style={{ color: THEME.textSub, fontSize: 13, marginTop: 4 }}>Study these questions and their model answers</div>
        </div>
        {[
          { q: "What is the difference between a compiler and an interpreter?", a: "A compiler translates the entire source code to machine code before execution. An interpreter translates and executes line by line. Compilers are faster at runtime; interpreters are more flexible for debugging. Python uses an interpreter; C++ uses a compiler." },
          { q: "What is recursion? Give an example.", a: "Recursion is when a function calls itself. Each call works on a smaller version of the problem until reaching a base case. Example: factorial(5) = 5 × factorial(4) = 5 × 4 × factorial(3)... Base case: factorial(0) = 1." },
          { q: "Explain the DOM.", a: "The Document Object Model is a tree-like representation of an HTML page in memory. JavaScript can use the DOM to find, change, add, or remove HTML elements dynamically. document.getElementById('title') finds an element by its ID." },
          { q: "What is an API?", a: "An Application Programming Interface is a set of rules allowing software to communicate. A weather API lets your app request weather data from a server. You send a request (URL + parameters) and receive a response (usually JSON)." },
        ].map((item, i) => (
          <Collapsible key={i} title={`Q${i + 1}: ${item.q}`} icon="❓">
            <div style={{ marginTop: 10, padding: "12px 14px", background: THEME.greenSoft, border: `1px solid ${THEME.green}`, borderRadius: 10, color: THEME.text, fontSize: 13, lineHeight: 1.8 }}>
              <strong style={{ color: THEME.green }}>Model Answer:</strong><br />{item.a}
            </div>
          </Collapsible>
        ))}
        <Btn style={{ marginTop: 16 }} onClick={() => { earnXP(30); reset(); }} color={THEME.green}>Done (+30 XP)</Btn>
      </div>
    );
  }

  return null;
};

const ProjectsPage = ({ earnXP }) => {
  const [selected, setSelected] = useState(null);

  const projectDetails = {
    quiz: {
      arch: "Single HTML file with embedded CSS and JS. Questions stored as an array of objects. State tracked with variables.",
      structure: "index.html\n├── <style> — styling\n├── <div id='quiz'> — container\n└── <script>\n    ├── questions array\n    ├── showQuestion()\n    ├── checkAnswer()\n    └── showScore()",
      logic: "Load questions from array → Display one at a time → User clicks option → Compare with correct answer → Update score → Show result",
      steps: ["Create questions array with objects {q, options, answer}", "Write showQuestion() to display current question", "Write checkAnswer(index) to compare and update score", "Write showScore() when all questions done", "Add CSS for beautiful UI"],
    },
    todo: {
      arch: "React component with useState for tasks array. localStorage for persistence. Each task is an object with {id, text, done}.",
      structure: "App.jsx\n├── useState: tasks[]\n├── addTask(text)\n├── toggleTask(id)\n├── deleteTask(id)\n└── render: TaskList",
      logic: "User types task → Press add → Task added to array → Checkbox toggles done → Delete removes from array → localStorage auto-saves",
      steps: ["Set up React with useState for tasks", "Build input + button for adding tasks", "Map tasks array to render list items", "Add toggle (checkbox) and delete (button)", "Save to localStorage on every change"],
    },
  };

  if (selected) {
    const details = projectDetails[selected.id] || { arch: "Architecture details coming soon!", structure: "project/\n└── index.html", logic: "Plan → Code → Test → Deploy", steps: ["Plan your features", "Write HTML structure", "Add CSS styling", "Add JavaScript logic", "Test and debug"] };
    return (
      <div>
        <Btn outline color={THEME.accent} small onClick={() => setSelected(null)}>← Back</Btn>
        <div style={{ marginTop: 16, marginBottom: 20 }}>
          <div style={{ fontSize: 36 }}>{selected.emoji}</div>
          <div style={{ fontSize: 20, fontWeight: 800, color: THEME.text, marginTop: 8 }}>{selected.name}</div>
          <div style={{ display: "flex", gap: 8, marginTop: 8 }}>
            <Badge_el emoji="🏷️" label={selected.type} />
            <Badge_el emoji="📊" label={selected.difficulty} />
          </div>
        </div>
        <Collapsible title="🏛️ Architecture" defaultOpen icon="🏛️">
          <p style={{ color: THEME.text, lineHeight: 1.8, marginTop: 10 }}>{details.arch}</p>
        </Collapsible>
        <Collapsible title="📁 Folder Structure" icon="📁">
          <pre style={{ background: THEME.bg, border: `1px solid ${THEME.border}`, borderRadius: 10, padding: 14, color: "#a8d8ff", fontSize: 13, marginTop: 10, fontFamily: "monospace" }}>{details.structure}</pre>
        </Collapsible>
        <Collapsible title="🧠 Logic Flow" icon="🧠">
          <p style={{ color: THEME.text, lineHeight: 1.8, marginTop: 10 }}>{details.logic}</p>
        </Collapsible>
        <Collapsible title="📋 Step-by-Step Build" icon="📋">
          <ol style={{ color: THEME.text, lineHeight: 2.2, paddingLeft: 20, marginTop: 10 }}>
            {details.steps.map((s, i) => <li key={i}>{s}</li>)}
          </ol>
        </Collapsible>
        <Collapsible title="🐛 Common Debugging Issues" icon="🐛">
          <ul style={{ color: THEME.textSub, lineHeight: 2, paddingLeft: 20, marginTop: 10 }}>
            <li>State not updating: Check that you're creating new arrays, not mutating</li>
            <li>localStorage not saving: Wrap in try-catch and use JSON.stringify</li>
            <li>Events not firing: Verify element IDs/refs are correct</li>
            <li>Styles not applying: Check CSS specificity and selector names</li>
          </ul>
        </Collapsible>
        <Collapsible title="🚀 Deployment" icon="🚀">
          <div style={{ color: THEME.text, lineHeight: 1.8, marginTop: 10 }}>
            <strong>GitHub Pages:</strong> Push to GitHub → Settings → Pages → Deploy from main branch<br />
            <strong>Netlify:</strong> Drag folder to netlify.com/drop — live in seconds<br />
            <strong>Vercel:</strong> Connect GitHub repo → Auto-deploys on push
          </div>
        </Collapsible>
        <div style={{ marginTop: 16 }}>
          <Btn onClick={() => earnXP(100)} color={THEME.green}>✓ Mark Project Complete (+100 XP)</Btn>
        </div>
      </div>
    );
  }

  return (
    <div>
      <div style={{ fontSize: 20, fontWeight: 800, color: THEME.text, marginBottom: 6 }}>Projects</div>
      <div style={{ color: THEME.textSub, fontSize: 13, marginBottom: 20 }}>Build real software to deepen your skills</div>
      {["Beginner", "Intermediate", "Advanced"].map(level => (
        <div key={level} style={{ marginBottom: 24 }}>
          <div style={{ fontWeight: 700, color: THEME.textSub, fontSize: 12, textTransform: "uppercase", letterSpacing: 1, marginBottom: 10 }}>{level}</div>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(2, 1fr)", gap: 10 }}>
            {PROJECTS.filter(p => p.difficulty === level).map(p => (
              <Card key={p.id} onClick={() => setSelected(p)} style={{ padding: 14 }}>
                <div style={{ fontSize: 26, marginBottom: 8 }}>{p.emoji}</div>
                <div style={{ fontWeight: 700, color: THEME.text, fontSize: 13 }}>{p.name}</div>
                <div style={{ fontSize: 11, color: THEME.textSub, marginTop: 4 }}>{p.desc}</div>
                <Badge_el emoji="" label={p.type} small />
              </Card>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
};

const AIPage = ({ earnXP }) => {
  const [mode, setMode] = useState(null);

  if (mode === "prompts") return (
    <div>
      <Btn outline color={THEME.accent} small onClick={() => setMode(null)}>← Back</Btn>
      <div style={{ marginTop: 16, marginBottom: 20 }}>
        <div style={{ fontSize: 18, fontWeight: 800, color: THEME.text }}>🎯 Power Prompts</div>
        <div style={{ color: THEME.textSub, fontSize: 13, marginTop: 4 }}>Copy, adapt, and use these in ChatGPT, Claude, or Gemini</div>
      </div>
      {AI_PROMPTS.map((p, i) => (
        <Card key={i} style={{ marginBottom: 12 }}>
          <Badge_el emoji="🏷️" label={p.category} small />
          <pre style={{ background: THEME.bg, border: `1px solid ${THEME.border}`, borderRadius: 10, padding: 14, color: "#a8d8ff", fontSize: 13, marginTop: 10, whiteSpace: "pre-wrap", fontFamily: "monospace", lineHeight: 1.7 }}>{p.prompt}</pre>
          <div style={{ marginTop: 8, fontSize: 12, color: THEME.green }}>✓ Why this works: {p.why}</div>
        </Card>
      ))}
      <Btn style={{ marginTop: 8 }} onClick={() => { earnXP(30); setMode(null); }} color={THEME.green}>Done (+30 XP)</Btn>
    </div>
  );

  if (mode === "levels") return (
    <div>
      <Btn outline color={THEME.accent} small onClick={() => setMode(null)}>← Back</Btn>
      <div style={{ marginTop: 16, marginBottom: 20 }}>
        <div style={{ fontSize: 18, fontWeight: 800, color: THEME.text }}>🎮 AI Skill Levels</div>
      </div>
      {[
        { level: "🟢 Hint Mode", desc: "Ask AI for a hint only. Try to solve the rest yourself.", rule: "Never paste your full code. Ask: 'I'm stuck on X, what should I think about?'" },
        { level: "🟡 Review Mode", desc: "Write code yourself, then ask AI to review it.", rule: "Always write first. Then paste and ask: 'What can be improved?'" },
        { level: "🔴 No-AI Mode", desc: "Full challenge. Zero AI assistance.", rule: "Use docs, Google, Stack Overflow — but no AI. Builds true independence." },
        { level: "⚫ Expert Mode", desc: "Use AI as a junior developer. You are the senior.", rule: "Tell AI what to build. Review its output. Fix its mistakes. Lead the conversation." },
      ].map(l => (
        <Card key={l.level} style={{ marginBottom: 12 }}>
          <div style={{ fontWeight: 700, color: THEME.text, fontSize: 15, marginBottom: 6 }}>{l.level}</div>
          <div style={{ color: THEME.textSub, fontSize: 13, lineHeight: 1.7, marginBottom: 8 }}>{l.desc}</div>
          <div style={{ fontSize: 12, color: THEME.accent, background: THEME.accentSoft, padding: "8px 12px", borderRadius: 8 }}>📋 Rule: {l.rule}</div>
        </Card>
      ))}
    </div>
  );

  return (
    <div>
      <div style={{ fontSize: 20, fontWeight: 800, color: THEME.text, marginBottom: 4 }}>🤖 AI Guide</div>
      <div style={{ color: THEME.textSub, fontSize: 13, marginBottom: 20 }}>AI As Assistant — Not Your Brain</div>

      <Card style={{ marginBottom: 16, borderColor: THEME.purple, background: THEME.purpleSoft }}>
        <div style={{ fontSize: 15, fontWeight: 700, color: THEME.purple, marginBottom: 10 }}>🧠 The Golden Rule</div>
        <div style={{ color: THEME.text, lineHeight: 1.8, fontSize: 14 }}>
          AI is a powerful tool, but it can become a crutch. If AI writes all your code, YOU don't grow. The goal is to use AI to <em>accelerate learning</em>, not replace thinking.
        </div>
      </Card>

      <div style={{ display: "grid", gap: 10, marginBottom: 20 }}>
        <Card onClick={() => setMode("prompts")} style={{ display: "flex", alignItems: "center", gap: 14, cursor: "pointer" }}>
          <span style={{ fontSize: 28 }}>🎯</span>
          <div><div style={{ fontWeight: 700, color: THEME.text }}>Power Prompts Library</div><div style={{ fontSize: 12, color: THEME.textSub }}>Ready-to-use prompts for learning</div></div>
        </Card>
        <Card onClick={() => setMode("levels")} style={{ display: "flex", alignItems: "center", gap: 14, cursor: "pointer" }}>
          <span style={{ fontSize: 28 }}>🎮</span>
          <div><div style={{ fontWeight: 700, color: THEME.text }}>AI Skill Levels</div><div style={{ fontSize: 12, color: THEME.textSub }}>Hint mode, review mode, no-AI challenge</div></div>
        </Card>
      </div>

      <Collapsible title="✅ When TO use AI" icon="✅" defaultOpen>
        <ul style={{ color: THEME.text, lineHeight: 2.2, paddingLeft: 20, marginTop: 10 }}>
          <li>Getting a simpler explanation of a concept</li>
          <li>Generating practice problems for you to solve</li>
          <li>Reviewing code you already wrote</li>
          <li>Getting unstuck after trying for 30+ minutes</li>
          <li>Understanding an error message</li>
        </ul>
      </Collapsible>
      <Collapsible title="❌ When NOT to use AI" icon="❌">
        <ul style={{ color: THEME.text, lineHeight: 2.2, paddingLeft: 20, marginTop: 10 }}>
          <li>Asking it to write code before you even try</li>
          <li>Copying solutions without understanding them</li>
          <li>During timed exams or interviews</li>
          <li>For core logic you need to master</li>
          <li>When you want to get faster at debugging</li>
        </ul>
      </Collapsible>
      <Collapsible title="🐛 Debugging AI Code" icon="🐛">
        <div style={{ color: THEME.text, lineHeight: 1.8, marginTop: 10 }}>
          AI code has bugs too. When you get AI code:<br />
          1. Read every line — don't paste blindly<br />
          2. Run it — check for errors<br />
          3. Test edge cases (empty input, very large numbers)<br />
          4. Ask AI: "What could go wrong with this code?"<br />
          5. Refactor it into your own style
        </div>
      </Collapsible>
    </div>
  );
};

const NotesPage = () => {
  const [notes, setNotes] = useLocalStorage("academy_notes", []);
  const [bookmarks, setBookmarks] = useLocalStorage("academy_bookmarks", []);
  const [newNote, setNewNote] = useState("");
  const [newTitle, setNewTitle] = useState("");
  const [activeTab, setActiveTab] = useState("notes");
  const [flashcard, setFlashcard] = useState(null);
  const [fcSide, setFcSide] = useState("front");

  const addNote = () => {
    if (!newNote.trim()) return;
    setNotes(prev => [...prev, { id: Date.now(), title: newTitle || "Untitled", content: newNote, date: new Date().toLocaleDateString() }]);
    setNewNote(""); setNewTitle("");
  };

  const deleteNote = (id) => setNotes(prev => prev.filter(n => n.id !== id));

  const exportNotes = () => {
    const text = notes.map(n => `# ${n.title}\n${n.content}\n---`).join("\n\n");
    const blob = new Blob([text], { type: "text/plain" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a"); a.href = url; a.download = "my-notes.txt"; a.click();
  };

  const defaultFlashcards = [
    { front: "What is a variable?", back: "A named memory location that stores a value" },
    { front: "What does DRY stand for?", back: "Don't Repeat Yourself — avoid code duplication" },
    { front: "What is the DOM?", back: "Document Object Model — tree representation of HTML in memory" },
    { front: "What is O(n)?", back: "Linear time complexity — operations grow proportionally to input size" },
  ];

  if (flashcard !== null) {
    const fc = defaultFlashcards[flashcard];
    return (
      <div>
        <Btn outline color={THEME.accent} small onClick={() => setFlashcard(null)}>← Back to Notes</Btn>
        <div style={{ marginTop: 30, textAlign: "center" }}>
          <div style={{ color: THEME.textSub, fontSize: 12, marginBottom: 6 }}>Card {flashcard + 1} of {defaultFlashcards.length} · Tap to flip</div>
          <div onClick={() => setFcSide(s => s === "front" ? "back" : "front")} style={{ background: THEME.card, border: `2px solid ${fcSide === "back" ? THEME.green : THEME.accent}`, borderRadius: 16, padding: "48px 32px", cursor: "pointer", minHeight: 160, display: "flex", alignItems: "center", justifyContent: "center", textAlign: "center" }}>
            <div>
              <div style={{ fontSize: 12, color: THEME.textSub, marginBottom: 12, textTransform: "uppercase", letterSpacing: 1 }}>{fcSide === "front" ? "QUESTION" : "ANSWER"}</div>
              <div style={{ fontSize: 18, fontWeight: 700, color: THEME.text, lineHeight: 1.5 }}>{fcSide === "front" ? fc.front : fc.back}</div>
            </div>
          </div>
          <div style={{ display: "flex", gap: 10, justifyContent: "center", marginTop: 20 }}>
            <Btn outline color={THEME.accent} onClick={() => { setFlashcard(Math.max(0, flashcard - 1)); setFcSide("front"); }}>← Prev</Btn>
            <Btn color={THEME.green} onClick={() => { setFlashcard(Math.min(defaultFlashcards.length - 1, flashcard + 1)); setFcSide("front"); }}>Next →</Btn>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 16 }}>
        <div style={{ fontSize: 20, fontWeight: 800, color: THEME.text }}>📓 Notebook</div>
        <div style={{ display: "flex", gap: 8 }}>
          <Btn small outline color={THEME.accent} onClick={() => { setFlashcard(0); setFcSide("front"); }}>🃏 Flashcards</Btn>
          {notes.length > 0 && <Btn small outline color={THEME.green} onClick={exportNotes}>⬇ Export</Btn>}
        </div>
      </div>

      <div style={{ display: "flex", gap: 8, marginBottom: 16 }}>
        {["notes", "bookmarks"].map(t => (
          <button key={t} onClick={() => setActiveTab(t)} style={{ padding: "7px 16px", borderRadius: 8, border: `1.5px solid ${activeTab === t ? THEME.accent : THEME.border}`, background: activeTab === t ? THEME.accentSoft : "transparent", color: activeTab === t ? THEME.accent : THEME.textSub, fontSize: 13, fontWeight: 600, cursor: "pointer", textTransform: "capitalize" }}>
            {t === "notes" ? "📝 Notes" : "🔖 Bookmarks"}
          </button>
        ))}
      </div>

      {activeTab === "notes" && (
        <>
          <Card style={{ marginBottom: 16 }}>
            <input value={newTitle} onChange={e => setNewTitle(e.target.value)} placeholder="Note title..." style={{ width: "100%", background: THEME.bg, border: `1px solid ${THEME.border}`, borderRadius: 8, padding: "8px 12px", color: THEME.text, fontSize: 14, marginBottom: 8, outline: "none", boxSizing: "border-box" }} />
            <textarea value={newNote} onChange={e => setNewNote(e.target.value)} placeholder="Write your note, definition, or summary..." style={{ width: "100%", background: THEME.bg, border: `1px solid ${THEME.border}`, borderRadius: 8, padding: "10px 12px", color: THEME.text, fontSize: 13, minHeight: 80, resize: "vertical", outline: "none", lineHeight: 1.7, boxSizing: "border-box" }} />
            <div style={{ marginTop: 10 }}>
              <Btn small onClick={addNote} color={THEME.accent}>+ Add Note</Btn>
            </div>
          </Card>
          {notes.length === 0 ? (
            <div style={{ textAlign: "center", padding: "40px 0", color: THEME.textMuted }}>No notes yet. Start taking notes above!</div>
          ) : notes.map(n => (
            <Card key={n.id} style={{ marginBottom: 10 }}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
                <div style={{ fontWeight: 700, color: THEME.text, fontSize: 14 }}>{n.title}</div>
                <div style={{ display: "flex", gap: 6 }}>
                  <span style={{ fontSize: 11, color: THEME.textMuted }}>{n.date}</span>
                  <button onClick={() => deleteNote(n.id)} style={{ background: "none", border: "none", color: THEME.red, cursor: "pointer", fontSize: 16, lineHeight: 1 }}>×</button>
                </div>
              </div>
              <div style={{ color: THEME.textSub, fontSize: 13, marginTop: 8, lineHeight: 1.7, whiteSpace: "pre-wrap" }}>{n.content}</div>
            </Card>
          ))}
        </>
      )}
      {activeTab === "bookmarks" && (
        <div>
          {[
            { topic: "Variables & Data Types", section: "JavaScript › Beginner" },
            { topic: "Array Methods (map, filter, reduce)", section: "JavaScript › Intermediate" },
            { topic: "OOP Concepts", section: "Python › Advanced" },
            { topic: "What is recursion?", section: "Concept Engine" },
          ].map((b, i) => (
            <Card key={i} style={{ marginBottom: 10, display: "flex", alignItems: "center", gap: 12 }}>
              <span style={{ fontSize: 20 }}>🔖</span>
              <div>
                <div style={{ fontWeight: 600, color: THEME.text, fontSize: 14 }}>{b.topic}</div>
                <div style={{ fontSize: 12, color: THEME.textSub }}>{b.section}</div>
              </div>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
};

const InstallPage = ({ earnXP }) => {
  const [tab, setTab] = useState("pc");
  return (
    <div>
      <div style={{ fontSize: 20, fontWeight: 800, color: THEME.text, marginBottom: 6 }}>🛠️ Installation Guide</div>
      <div style={{ color: THEME.textSub, fontSize: 13, marginBottom: 16 }}>Set up your development environment</div>
      <div style={{ display: "flex", gap: 8, marginBottom: 16 }}>
        {["pc", "mobile"].map(t => (
          <button key={t} onClick={() => setTab(t)} style={{ padding: "7px 16px", borderRadius: 8, border: `1.5px solid ${tab === t ? THEME.accent : THEME.border}`, background: tab === t ? THEME.accentSoft : "transparent", color: tab === t ? THEME.accent : THEME.textSub, fontSize: 13, fontWeight: 600, cursor: "pointer" }}>
            {t === "pc" ? "💻 PC Setup" : "📱 Mobile Setup"}
          </button>
        ))}
      </div>
      {tab === "pc" && (
        <>
          <Card style={{ marginBottom: 14, borderColor: THEME.accent, background: THEME.accentSoft }}>
            <div style={{ color: THEME.text, fontSize: 13, lineHeight: 1.8 }}>
              <strong style={{ color: THEME.accent }}>Before you start:</strong> Understand the difference between a <strong>compiler</strong> (translates whole code at once — C++) and an <strong>interpreter</strong> (runs line by line — Python). JavaScript uses a JIT compiler inside the browser.
            </div>
          </Card>
          {Object.entries({ "Visual Studio Code (Code Editor)": INSTALL_STEPS.vscode, "Node.js (JavaScript Runtime)": INSTALL_STEPS.nodejs, "Python 3": INSTALL_STEPS.python, "C++ Compiler (GCC)": INSTALL_STEPS.cpp }).map(([title, steps]) => (
            <Collapsible key={title} title={title} icon="⚙️">
              <ol style={{ color: THEME.text, lineHeight: 2.2, paddingLeft: 20, marginTop: 10 }}>
                {steps.map((s, i) => <li key={i} style={{ color: i === 0 ? THEME.text : THEME.textSub }}>{s}</li>)}
              </ol>
            </Collapsible>
          ))}
          <Collapsible title="🌍 Understanding PATH & Environment Variables" icon="🌍">
            <div style={{ color: THEME.text, lineHeight: 1.8, marginTop: 10 }}>
              <strong>PATH</strong> is a list of folders the operating system searches when you type a command. When you type <code style={{ background: THEME.bg, padding: "2px 6px", borderRadius: 4 }}>python</code> in terminal, it looks through PATH folders to find Python.<br /><br />
              <strong>Environment Variables</strong> are hidden system settings. SECRET_KEY, DATABASE_URL, API keys — stored here so they're not in your code. Access them with <code style={{ background: THEME.bg, padding: "2px 6px", borderRadius: 4 }}>process.env.NAME</code> in Node.js or <code style={{ background: THEME.bg, padding: "2px 6px", borderRadius: 4 }}>os.environ['NAME']</code> in Python.
            </div>
          </Collapsible>
        </>
      )}
      {tab === "mobile" && (
        <>
          <div style={{ marginBottom: 14 }}>
            {MOBILE_APPS.map(app => (
              <Card key={app.name} style={{ marginBottom: 10, display: "flex", gap: 14, alignItems: "flex-start" }}>
                <span style={{ fontSize: 26 }}>{app.emoji}</span>
                <div>
                  <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 4 }}>
                    <span style={{ fontWeight: 700, color: THEME.text, fontSize: 15 }}>{app.name}</span>
                    <Badge_el emoji="" label={app.platform} small />
                  </div>
                  <div style={{ fontSize: 13, color: THEME.textSub, lineHeight: 1.6 }}>{app.use}</div>
                  <div style={{ fontSize: 12, marginTop: 4 }}>{app.rating}</div>
                </div>
              </Card>
            ))}
          </div>
          <Collapsible title="Getting Started with Termux" icon="📟" defaultOpen>
            <ol style={{ color: THEME.text, lineHeight: 2.2, paddingLeft: 20, marginTop: 10 }}>
              <li>Install Termux from F-Droid (not Play Store)</li>
              <li>Open Termux, run: <code style={{ background: THEME.bg, padding: "2px 6px", borderRadius: 4 }}>pkg update && pkg upgrade</code></li>
              <li>Install Python: <code style={{ background: THEME.bg, padding: "2px 6px", borderRadius: 4 }}>pkg install python</code></li>
              <li>Install Node.js: <code style={{ background: THEME.bg, padding: "2px 6px", borderRadius: 4 }}>pkg install nodejs</code></li>
              <li>Create file: <code style={{ background: THEME.bg, padding: "2px 6px", borderRadius: 4 }}>nano hello.py</code></li>
              <li>Run it: <code style={{ background: THEME.bg, padding: "2px 6px", borderRadius: 4 }}>python hello.py</code></li>
            </ol>
          </Collapsible>
        </>
      )}
      <div style={{ marginTop: 16 }}>
        <Btn onClick={() => earnXP(50)} color={THEME.green}>✓ Setup Complete (+50 XP)</Btn>
      </div>
    </div>
  );
};

const ProfilePage = ({ profile, setProfile, earnXP }) => {
  const [name, setName] = useState(profile.name || "");
  const [email, setEmail] = useState(profile.email || "");
  const [saved, setSaved] = useState(false);
  const xp = profile.xp || 0;
  const level = Math.floor(xp / 200) + 1;

  const save = () => {
    setProfile(prev => ({ ...prev, name, email }));
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  };

  const earnBadge = (id) => {
    if (!(profile.badges || []).includes(id)) {
      setProfile(prev => ({ ...prev, badges: [...(prev.badges || []), id] }));
      earnXP(BADGES.find(b => b.id === id)?.xp || 0);
    }
  };

  return (
    <div>
      <div style={{ fontSize: 20, fontWeight: 800, color: THEME.text, marginBottom: 20 }}>👤 Profile</div>

      <Card style={{ marginBottom: 16 }}>
        <div style={{ textAlign: "center", paddingBottom: 16, borderBottom: `1px solid ${THEME.border}`, marginBottom: 16 }}>
          <div style={{ width: 64, height: 64, borderRadius: "50%", background: `linear-gradient(135deg, ${THEME.accent}, ${THEME.purple})`, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 28, margin: "0 auto 12px" }}>
            {profile.name ? profile.name[0].toUpperCase() : "👤"}
          </div>
          <div style={{ fontWeight: 800, color: THEME.text, fontSize: 18 }}>{profile.name || "Your Name"}</div>
          <div style={{ color: THEME.textSub, fontSize: 13, marginTop: 2 }}>Level {level} Engineer</div>
        </div>
        <XPBar xp={xp} />
      </Card>

      <Card style={{ marginBottom: 16 }}>
        <div style={{ fontWeight: 700, color: THEME.text, marginBottom: 12 }}>Edit Profile</div>
        <input value={name} onChange={e => setName(e.target.value)} placeholder="Your name" style={{ width: "100%", background: THEME.bg, border: `1px solid ${THEME.border}`, borderRadius: 8, padding: "10px 12px", color: THEME.text, fontSize: 14, marginBottom: 10, outline: "none", boxSizing: "border-box" }} />
        <input value={email} onChange={e => setEmail(e.target.value)} placeholder="Email (for badge tracking)" style={{ width: "100%", background: THEME.bg, border: `1px solid ${THEME.border}`, borderRadius: 8, padding: "10px 12px", color: THEME.text, fontSize: 14, marginBottom: 14, outline: "none", boxSizing: "border-box" }} />
        <Btn onClick={save} color={saved ? THEME.green : THEME.accent}>{saved ? "✓ Saved!" : "Save Profile"}</Btn>
      </Card>

      <Card style={{ marginBottom: 16 }}>
        <div style={{ fontWeight: 700, color: THEME.text, marginBottom: 14 }}>🏆 Badges & Achievements</div>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(2, 1fr)", gap: 10 }}>
          {BADGES.map(b => {
            const earned = (profile.badges || []).includes(b.id);
            return (
              <div key={b.id} onClick={() => !earned && earnBadge(b.id)} style={{ padding: 12, borderRadius: 10, border: `1.5px solid ${earned ? THEME.green : THEME.border}`, background: earned ? THEME.greenSoft : THEME.bg, cursor: earned ? "default" : "pointer", textAlign: "center", opacity: earned ? 1 : 0.5 }}>
                <div style={{ fontSize: 24, marginBottom: 4 }}>{b.emoji}</div>
                <div style={{ fontSize: 12, fontWeight: 700, color: earned ? THEME.green : THEME.textSub }}>{b.name}</div>
                <div style={{ fontSize: 11, color: THEME.textMuted, marginTop: 2 }}>{b.desc}</div>
                <div style={{ fontSize: 11, color: THEME.amber, marginTop: 4 }}>+{b.xp} XP</div>
              </div>
            );
          })}
        </div>
      </Card>

      <Card>
        <div style={{ fontWeight: 700, color: THEME.text, marginBottom: 12 }}>📊 Stats</div>
        {[
          { label: "Total XP", value: xp + " XP", icon: "⚡" },
          { label: "Level", value: "Level " + level, icon: "🏅" },
          { label: "Badges Earned", value: `${(profile.badges || []).length} / ${BADGES.length}`, icon: "🏆" },
          { label: "Streak", value: `${profile.streak || 0} days`, icon: "🔥" },
        ].map(s => (
          <div key={s.label} style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "10px 0", borderBottom: `1px solid ${THEME.border}` }}>
            <div style={{ display: "flex", alignItems: "center", gap: 8, fontSize: 13, color: THEME.textSub }}><span>{s.icon}</span>{s.label}</div>
            <div style={{ fontWeight: 700, color: THEME.text, fontSize: 14 }}>{s.value}</div>
          </div>
        ))}
        {level >= 10 && (
          <div style={{ marginTop: 14, padding: "12px", background: THEME.purpleSoft, border: `1px solid ${THEME.purple}`, borderRadius: 10, textAlign: "center" }}>
            <div style={{ fontSize: 20 }}>👩‍🏫</div>
            <div style={{ fontWeight: 700, color: THEME.purple, marginTop: 4 }}>Teacher Mode Unlocked!</div>
            <div style={{ fontSize: 12, color: THEME.textSub, marginTop: 4 }}>You can now mentor other learners</div>
          </div>
        )}
      </Card>
    </div>
  );
};

// ─── MAIN APP ─────────────────────────────────────────────────────────────────
const NAV_ITEMS = [
  { id: "home", label: "Home", icon: Icons.home },
  { id: "courses", label: "Courses", icon: Icons.courses },
  { id: "labs", label: "Labs", icon: Icons.labs },
  { id: "exams", label: "Exams", icon: Icons.exams },
  { id: "projects", label: "Projects", icon: Icons.projects },
  { id: "ai", label: "AI Guide", icon: Icons.ai },
  { id: "install", label: "Install", icon: Icons.install },
  { id: "notes", label: "Notes", icon: Icons.notes },
  { id: "profile", label: "Profile", icon: Icons.profile },
];

export default function SoftwareAcademy() {
  const [page, setPage] = useState("home");
  const [profile, setProfile] = useLocalStorage("academy_profile", { name: "", email: "", xp: 0, level: 1, streak: 3, badges: [], completedConcepts: [], startedLangs: [] });
  const [toast, setToast] = useState(null);

  const earnXP = useCallback((amount) => {
    setProfile(prev => ({ ...prev, xp: (prev.xp || 0) + amount }));
    setToast(`+${amount} XP!`);
    setTimeout(() => setToast(null), 2000);
  }, [setProfile]);

  const renderPage = () => {
    const props = { profile, setProfile, setPage, earnXP };
    switch (page) {
      case "home": return <HomePage {...props} />;
      case "courses": return <CoursesPage {...props} />;
      case "labs": return <LabsPage {...props} />;
      case "exams": return <ExamsPage {...props} />;
      case "projects": return <ProjectsPage {...props} />;
      case "ai": return <AIPage {...props} />;
      case "install": return <InstallPage {...props} />;
      case "notes": return <NotesPage {...props} />;
      case "profile": return <ProfilePage {...props} />;
      default: return <HomePage {...props} />;
    }
  };

  return (
    <div style={{ minHeight: "100vh", background: THEME.bg, color: THEME.text, fontFamily: "'Segoe UI', system-ui, sans-serif", display: "flex" }}>
      {/* Desktop Sidebar */}
      <aside style={{ width: 220, background: THEME.surface, borderRight: `1px solid ${THEME.border}`, position: "fixed", top: 0, left: 0, bottom: 0, display: "flex", flexDirection: "column", zIndex: 100, "@media(max-width:768px)": { display: "none" } }} className="desktop-sidebar">
        <div style={{ padding: "20px 18px 16px", borderBottom: `1px solid ${THEME.border}` }}>
          <div style={{ fontWeight: 800, fontSize: 15, color: THEME.text, marginBottom: 2 }}>🎓 SE Academy</div>
          <div style={{ fontSize: 11, color: THEME.textSub }}>Software Engineering</div>
        </div>
        <nav style={{ flex: 1, padding: "12px 10px", overflowY: "auto" }}>
          {NAV_ITEMS.map(item => (
            <button key={item.id} onClick={() => setPage(item.id)} style={{ width: "100%", display: "flex", alignItems: "center", gap: 10, padding: "10px 10px", borderRadius: 9, border: "none", background: page === item.id ? THEME.accentSoft : "transparent", color: page === item.id ? THEME.accent : THEME.textSub, fontSize: 14, fontWeight: page === item.id ? 700 : 500, cursor: "pointer", textAlign: "left", marginBottom: 2, transition: "all 0.15s" }}>
              <Icon d={item.icon} size={17} color={page === item.id ? THEME.accent : THEME.textSub} />
              {item.label}
            </button>
          ))}
        </nav>
        <div style={{ padding: "14px 16px", borderTop: `1px solid ${THEME.border}` }}>
          <XPBar xp={profile.xp || 0} />
        </div>
      </aside>

      {/* Main Content */}
      <main style={{ flex: 1, marginLeft: 0, display: "flex", flexDirection: "column" }}>
        {/* Top Bar */}
        <header style={{ background: THEME.surface, borderBottom: `1px solid ${THEME.border}`, padding: "14px 20px", display: "flex", alignItems: "center", justifyContent: "space-between", position: "sticky", top: 0, zIndex: 50 }}>
          <div style={{ fontWeight: 800, fontSize: 15, color: THEME.text }}>🎓 SE Academy</div>
          <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
            <Badge_el emoji="⚡" label={`${profile.xp || 0} XP`} small />
            <Badge_el emoji="🔥" label={`${profile.streak || 0}d`} small />
            <button onClick={() => setPage("profile")} style={{ width: 32, height: 32, borderRadius: "50%", background: `linear-gradient(135deg, ${THEME.accent}, ${THEME.purple})`, border: "none", cursor: "pointer", fontSize: 14, display: "flex", alignItems: "center", justifyContent: "center", color: "#fff", fontWeight: 700 }}>
              {profile.name ? profile.name[0].toUpperCase() : "?"}
            </button>
          </div>
        </header>

        {/* Page Content */}
        <div style={{ flex: 1, padding: "20px 20px 80px", maxWidth: 720, width: "100%", margin: "0 auto", boxSizing: "border-box" }}>
          {renderPage()}
        </div>
      </main>

      {/* Mobile Bottom Nav */}
      <nav style={{ position: "fixed", bottom: 0, left: 0, right: 0, background: THEME.surface, borderTop: `1px solid ${THEME.border}`, display: "flex", justifyContent: "space-around", padding: "8px 0 10px", zIndex: 100 }}>
        {NAV_ITEMS.slice(0, 5).map(item => (
          <button key={item.id} onClick={() => setPage(item.id)} style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 3, background: "none", border: "none", color: page === item.id ? THEME.accent : THEME.textMuted, cursor: "pointer", padding: "4px 8px", minWidth: 52 }}>
            <Icon d={item.icon} size={20} color={page === item.id ? THEME.accent : THEME.textMuted} />
            <span style={{ fontSize: 10, fontWeight: page === item.id ? 700 : 400 }}>{item.label}</span>
          </button>
        ))}
        <button onClick={() => setPage(["ai", "install", "notes", "profile"].includes(page) ? page : "ai")} style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 3, background: "none", border: "none", color: ["ai", "install", "notes", "profile"].includes(page) ? THEME.accent : THEME.textMuted, cursor: "pointer", padding: "4px 8px", minWidth: 52 }}>
          <Icon d={Icons.profile} size={20} color={["ai", "install", "notes", "profile"].includes(page) ? THEME.accent : THEME.textMuted} />
          <span style={{ fontSize: 10 }}>More</span>
        </button>
      </nav>

      {/* More Menu (mobile) */}
      {["ai", "install", "notes", "profile"].includes(page) && (
        <div style={{ position: "fixed", bottom: 60, right: 12, background: THEME.surface, border: `1px solid ${THEME.border}`, borderRadius: 14, padding: 8, zIndex: 200, minWidth: 160 }}>
          {NAV_ITEMS.slice(5).map(item => (
            <button key={item.id} onClick={() => setPage(item.id)} style={{ width: "100%", display: "flex", alignItems: "center", gap: 10, padding: "9px 12px", borderRadius: 8, border: "none", background: page === item.id ? THEME.accentSoft : "transparent", color: page === item.id ? THEME.accent : THEME.text, fontSize: 14, cursor: "pointer", textAlign: "left" }}>
              <Icon d={item.icon} size={16} color={page === item.id ? THEME.accent : THEME.textSub} />
              {item.label}
            </button>
          ))}
        </div>
      )}

      {/* XP Toast */}
      {toast && (
        <div style={{ position: "fixed", top: 70, right: 16, background: THEME.green, color: "#fff", fontWeight: 800, fontSize: 14, padding: "8px 18px", borderRadius: 99, zIndex: 9999, boxShadow: `0 4px 20px ${THEME.green}44`, animation: "fadeIn 0.2s ease" }}>
          {toast}
        </div>
      )}

      <style>{`
        @media (min-width: 769px) {
          main { margin-left: 220px !important; }
          nav[style*="bottom: 0"] { display: none !important; }
        }
        @keyframes fadeIn { from { opacity: 0; transform: translateY(-8px); } to { opacity: 1; transform: translateY(0); } }
        * { scrollbar-width: thin; scrollbar-color: #2a3347 transparent; }
        ::-webkit-scrollbar { width: 6px; }
        ::-webkit-scrollbar-track { background: transparent; }
        ::-webkit-scrollbar-thumb { background: #2a3347; border-radius: 99px; }
      `}</style>
    </div>
  );
}
