import { useState, useEffect } from "react";

// ============================================================
// DATA: CURRICULUM
// ============================================================
const LANGUAGES = ["HTML", "CSS", "JavaScript", "Python", "C++"];

const CONCEPT_TERMS = [
  {
    id: "variable", term: "Variable", emoji: "📦",
    definition: "A named storage location in memory that holds a value which can change.",
    vivid: "A variable is like a labeled box in your bedroom. You write your name on the box, put something inside, and whenever you need what's in the box, you just say its name. You can also replace what's inside with something new.",
    analogy: "Imagine a jar with a sticky note on it that says 'cookies'. Whatever is inside that jar IS the variable. The label is the name; the cookies inside are the value.",
    code: `// JavaScript\nlet score = 0;\nscore = 10;\nconst name = "Alex";\n\n# Python\nscore = 0\nscore = 10\nname = "Alex"`,
    mistakes: ["Forgetting to declare before using (in strict languages)", "Using reserved keywords as names", "Confusing = (assignment) with == (comparison)"],
    whyMatters: "Every program needs to store and manipulate data. Variables are the fundamental building block for that.",
    noteSummary: "Variable = named box in memory that holds a value. Can be updated. Has a type.",
    interviewLevel: "A variable is a symbolic name bound to a value stored in memory. In statically typed languages the type is fixed at compile time; in dynamically typed languages the type is inferred at runtime.",
    visual: `Step 1: You write: let age = 25;\nStep 2: Computer finds free memory slot → [slot #4021]\nStep 3: Stores value 25 in slot #4021\nStep 4: Labels that slot "age"\nStep 5: Later: age = 26 → slot #4021 now holds 26`
  },
  {
    id: "function", term: "Function", emoji: "⚙️",
    definition: "A reusable block of code that performs a specific task when called.",
    vivid: "A function is like a vending machine. You press a button (call the function), maybe put in coins (pass arguments), and it gives you a snack (returns a result). You don't need to know HOW the machine makes the snack — you just use it.",
    analogy: "A recipe in a cookbook. The recipe has a name (like 'Bake Chocolate Cake'), requires ingredients (parameters), has steps (the code), and produces a result (a cake / return value).",
    code: `// JavaScript\nfunction greet(name) {\n  return "Hello, " + name + "!";\n}\nconsole.log(greet("Sam")); // Hello, Sam!\n\n# Python\ndef greet(name):\n    return f"Hello, {name}!"\nprint(greet("Sam"))`,
    mistakes: ["Forgetting to return a value", "Calling a function before defining it (in some languages)", "Confusing function definition with function call"],
    whyMatters: "Functions eliminate repetition, organize code into logical units, and make programs easier to debug and maintain.",
    noteSummary: "Function = reusable block. Define once, call many times. Can take inputs (params) and return output.",
    interviewLevel: "Functions are first-class abstractions that encapsulate behavior, enabling code reuse, separation of concerns, and testability. In functional programming, they are pure transformations with no side effects.",
    visual: `Define: function add(a, b) { return a + b; }\nCall: add(3, 5)\n  → a = 3, b = 5\n  → Executes: return 3 + 5\n  → Result: 8 is returned to caller`
  },
  {
    id: "loop", term: "Loop", emoji: "🔄",
    definition: "A structure that repeats a block of code multiple times until a condition is met.",
    vivid: "Imagine you have to write your name on 100 envelopes. A loop is like having a robot that does it automatically: it picks up envelope, writes name, puts down, picks up next... until all 100 are done. Without loops, you'd have to write the same code 100 times!",
    analogy: "A washing machine cycle. The drum spins repeatedly until the timer ends. Each spin = one loop iteration. The timer condition = loop condition.",
    code: `// JavaScript - for loop\nfor (let i = 1; i <= 5; i++) {\n  console.log("Iteration: " + i);\n}\n// Output: Iteration: 1, 2, 3, 4, 5\n\n# Python - while loop\ncount = 0\nwhile count < 5:\n    print(f"Count: {count}")\n    count += 1`,
    mistakes: ["Infinite loops (forgetting to update the condition variable)", "Off-by-one errors (using < vs <=)", "Modifying the loop variable inside the loop unexpectedly"],
    whyMatters: "Loops are essential for processing lists, repeating tasks, building games, reading files, and virtually every real-world program.",
    noteSummary: "Loop = repeat code block. for loops = known count. while loops = unknown count. Always need an exit condition.",
    interviewLevel: "Loops implement iterative control flow. for loops are syntactic sugar over counter-based while loops. Iterators and generators extend this concept to lazy evaluation in modern languages.",
    visual: `for (let i = 0; i < 3; i++) { console.log(i); }\n\nIteration 1: i=0 → condition 0<3 TRUE → print 0 → i becomes 1\nIteration 2: i=1 → condition 1<3 TRUE → print 1 → i becomes 2\nIteration 3: i=2 → condition 2<3 TRUE → print 2 → i becomes 3\nCheck:       i=3 → condition 3<3 FALSE → STOP`
  },
  {
    id: "array", term: "Array / List", emoji: "📋",
    definition: "An ordered collection of values stored under a single variable name.",
    vivid: "An array is like a numbered row of lockers at school. Each locker has a number (index starting at 0), and inside each locker is a value. Locker 0 has 'Alice', locker 1 has 'Bob', etc. You access them by locker number.",
    analogy: "A train with numbered carriages. The train name is the array name. Each carriage is an element. Carriage 0 is the first one.",
    code: `// JavaScript\nconst fruits = ["apple", "banana", "cherry"];\nconsole.log(fruits[0]); // apple\nfruits.push("mango");   // add to end\n\n# Python\nfruits = ["apple", "banana", "cherry"]\nprint(fruits[0])  # apple\nfruits.append("mango")`,
    mistakes: ["Accessing index out of bounds (crashes)", "Forgetting that first index is 0, not 1", "Confusing array length with last valid index"],
    whyMatters: "Arrays power almost every program: shopping carts, user lists, game leaderboards, search results — all stored in arrays.",
    noteSummary: "Array = ordered list. Index starts at 0. Add/remove/access by position. Length = number of items.",
    interviewLevel: "Arrays are contiguous memory structures with O(1) random access and O(n) insertion/deletion. Dynamic arrays automatically resize, amortizing O(1) append.",
    visual: `const arr = [10, 20, 30, 40];\nIndex:        0   1   2   3\narr[0] → 10\narr[2] → 30\narr.length → 4\narr[4] → undefined (out of bounds!)`
  },
  {
    id: "object", term: "Object", emoji: "🗂️",
    definition: "A collection of related data and behavior grouped together using key-value pairs.",
    vivid: "An object is like a contact card on your phone. The card has a name (key) for each piece of info: 'firstName', 'lastName', 'phone', 'email'. You look up info by the label, not by position.",
    analogy: "A passport. It has labelled fields: name, nationality, date of birth, photo. Each label maps to a specific value. That's an object.",
    code: `// JavaScript\nconst person = {\n  name: "Alex",\n  age: 25,\n  greet() { return "Hi, I'm " + this.name; }\n};\nconsole.log(person.name);    // Alex\nconsole.log(person.greet()); // Hi, I'm Alex\n\n# Python (dict)\nperson = {"name": "Alex", "age": 25}\nprint(person["name"])`,
    mistakes: ["Accessing a key that doesn't exist (returns undefined/error)", "Confusing dot notation with bracket notation", "Mutating objects accidentally (pass by reference)"],
    whyMatters: "Objects model real-world entities in code. APIs return objects. Database records are objects. UI state is objects.",
    noteSummary: "Object = key-value pairs. Access by key name. Can hold any type of value, including functions (methods).",
    interviewLevel: "Objects are hash maps / dictionaries. In OOP, objects are instances of classes. JavaScript objects use prototype-based inheritance. Access is O(1) average for hash maps.",
    visual: `const car = { brand: "Toyota", year: 2023 };\nMemory:\n  "brand" → "Toyota"\n  "year"  → 2023\ncar.brand    → looks up key "brand" → "Toyota"\ncar["year"]  → looks up key "year"  → 2023`
  },
  {
    id: "class", term: "Class", emoji: "🏗️",
    definition: "A blueprint or template for creating objects with shared properties and methods.",
    vivid: "A class is like an architectural blueprint for a house. The blueprint isn't a house — it's the plan. When you build a house FROM that blueprint, that house is an object (instance). You can build 100 houses from one blueprint.",
    analogy: "A cookie cutter. The cutter is the class. Each cookie you cut out is an object (instance). All cookies have the same shape but different decorations (different property values).",
    code: `// JavaScript\nclass Animal {\n  constructor(name) {\n    this.name = name;\n  }\n  speak() {\n    return this.name + " makes a sound.";\n  }\n}\nconst dog = new Animal("Rex");\nconsole.log(dog.speak()); // Rex makes a sound.\n\n# Python\nclass Animal:\n    def __init__(self, name):\n        self.name = name\n    def speak(self):\n        return f"{self.name} makes a sound."`,
    mistakes: ["Forgetting 'new' keyword in JS", "Not calling super() in subclass constructor", "Confusing the class itself with an instance"],
    whyMatters: "Classes organize complex programs into manageable, reusable units. Every UI component, database model, and API handler is often a class.",
    noteSummary: "Class = blueprint. Instance = object built from blueprint. Constructor sets initial values. Methods are functions attached to the class.",
    interviewLevel: "Classes are syntactic sugar over prototype chains in JS. In classical OOP (Java/C++), they define type hierarchies. Classes enable encapsulation, inheritance, and polymorphism — the pillars of OOP.",
    visual: `Class Animal (blueprint)\n  - property: name\n  - method: speak()\n  \nnew Animal("Dog")  → Instance 1: name="Dog"\nnew Animal("Cat")  → Instance 2: name="Cat"\nBoth instances share the speak() method from the class.`
  },
  {
    id: "recursion", term: "Recursion", emoji: "🪞",
    definition: "A function that calls itself to solve a smaller version of the same problem.",
    vivid: "Imagine you're in a hall of mirrors. Each mirror reflects another mirror inside it. Recursion is like that: the function looks inside itself to find the answer. It keeps doing so until it reaches a mirror with no reflection (the base case).",
    analogy: "Russian nesting dolls (Matryoshka). To open the biggest doll, you open it and find a smaller doll. Open that, find an even smaller one. Eventually you find the tiniest doll that doesn't open — that's your base case.",
    code: `// JavaScript\nfunction factorial(n) {\n  if (n === 0) return 1;       // base case\n  return n * factorial(n - 1); // recursive call\n}\nconsole.log(factorial(5)); // 120\n\n# Python\ndef factorial(n):\n    if n == 0:\n        return 1\n    return n * factorial(n - 1)`,
    mistakes: ["Missing base case → infinite recursion → stack overflow", "Base case that never triggers", "Using recursion when a simple loop would be more efficient"],
    whyMatters: "Recursion elegantly solves problems involving trees, nested structures, file systems, and divide-and-conquer algorithms like merge sort.",
    noteSummary: "Recursion = function calls itself. Always needs a base case to stop. Good for tree/nested problems.",
    interviewLevel: "Recursive algorithms have O(n) call stack depth. Tail-call optimization (TCO) converts tail-recursive functions to loops. Memoization turns exponential recursion into polynomial time.",
    visual: `factorial(3)\n  → 3 * factorial(2)\n       → 2 * factorial(1)\n            → 1 * factorial(0)\n                 → returns 1  (BASE CASE)\n            ← 1 * 1 = 1\n       ← 2 * 1 = 2\n  ← 3 * 2 = 6`
  },
  {
    id: "api", term: "API", emoji: "🔌",
    definition: "Application Programming Interface — a set of rules that lets two programs communicate.",
    vivid: "An API is like a waiter at a restaurant. You (the app) don't go into the kitchen (the server) yourself. You tell the waiter (API) what you want, the waiter goes to the kitchen, and brings back your food (data). The kitchen's internal workings are hidden from you.",
    analogy: "An electrical outlet. You plug in your device without knowing HOW the power grid works. The outlet is the API — a standardized interface that hides all complexity.",
    code: `// JavaScript - Fetch API\nfetch("https://api.example.com/users")\n  .then(response => response.json())\n  .then(data => console.log(data))\n  .catch(error => console.error(error));\n\n# Python - requests library\nimport requests\nresponse = requests.get("https://api.example.com/users")\nprint(response.json())`,
    mistakes: ["Not handling errors (network failures)", "Exposing API keys in frontend code", "Not checking response status before parsing"],
    whyMatters: "APIs connect your app to weather data, payment systems, maps, authentication, social media — everything modern apps need.",
    noteSummary: "API = bridge between apps. Send a request, get a response. REST APIs use HTTP methods (GET, POST, PUT, DELETE).",
    interviewLevel: "APIs define contracts between systems. REST uses stateless HTTP + JSON. GraphQL allows flexible querying. gRPC uses Protocol Buffers for high-performance RPC. Rate limiting and authentication (OAuth, JWT) are critical production concerns.",
    visual: `Your App  →  GET /weather?city=Lagos  →  Weather API Server\n                                                   ↓ (fetch data from DB)\nYour App  ←  { temp: 32, condition: "Sunny" }  ←  Server`
  },
  {
    id: "async", term: "Asynchronous Programming", emoji: "⏳",
    definition: "Code that doesn't block the program while waiting for long operations to complete.",
    vivid: "Imagine you put bread in a toaster and instead of standing there staring at it, you go make coffee. When the toast pops up, you come back. Asynchronous code does the same — it starts a task, goes and does other things, and comes back when the task is done.",
    analogy: "Ordering food at a restaurant. You order, sit down, and the waiter brings your food when it's ready. Synchronous would mean standing at the counter staring until your food is cooked — blocking everyone else.",
    code: `// JavaScript - async/await\nasync function fetchUser() {\n  try {\n    const response = await fetch("/api/user");\n    const user = await response.json();\n    console.log(user);\n  } catch (error) {\n    console.error("Failed:", error);\n  }\n}\n\n# Python - asyncio\nimport asyncio\nasync def fetch_user():\n    await asyncio.sleep(1)\n    return {"name": "Alex"}`,
    mistakes: ["Forgetting await keyword", "Not handling promise rejections (unhandled errors)", "Creating callback hell instead of using async/await"],
    whyMatters: "The web is inherently async — loading data, saving files, user events. Without async code, UIs would freeze on every network request.",
    noteSummary: "Async = don't wait around. Promises/async-await in JS. asyncio in Python. Always handle errors with try/catch.",
    interviewLevel: "JavaScript uses an event loop with a call stack, callback queue, and microtask queue. Promises represent eventual values. async/await is syntactic sugar over Promise chains. Python's asyncio uses cooperative multitasking on a single thread.",
    visual: `Sync:  Task1 runs → WAIT → Task1 done → Task2 runs\nAsync: Task1 starts → Task2 starts → Task1 done (callback) → Task3\nThe event loop keeps checking: "Is anything ready to process?"`
  },
  {
    id: "debugging", term: "Debugging", emoji: "🐛",
    definition: "The process of finding and fixing errors (bugs) in code.",
    vivid: "Debugging is like being a detective. Your program is the crime scene. The bug is the criminal. You look for clues (error messages, unexpected output), form hypotheses, test them, and finally catch the bug. Great programmers are great detectives.",
    analogy: "A doctor diagnosing a patient. The patient (program) shows symptoms (errors). The doctor (developer) runs tests (console.log, breakpoints), reads the results, and prescribes a fix (code change).",
    code: `// JavaScript debugging\nfunction divide(a, b) {\n  console.log("a:", a, "b:", b); // debug log\n  if (b === 0) {\n    console.error("Division by zero!");\n    return null;\n  }\n  return a / b;\n}\n\n// Python debugging\nimport pdb\ndef divide(a, b):\n    pdb.set_trace()  # breakpoint\n    return a / b`,
    mistakes: ["Changing multiple things at once (can't tell what fixed it)", "Not reading error messages carefully", "Assuming the bug is in a different place than where it actually is"],
    whyMatters: "Professional developers spend 30-50% of their time debugging. Mastering debugging makes you dramatically more productive.",
    noteSummary: "Debug = find + fix bugs. Use console.log, breakpoints, error messages. Change one thing at a time. Read errors carefully.",
    interviewLevel: "Systematic debugging: reproduce the bug, isolate the module, add assertions, use binary search to narrow scope. Tools: Chrome DevTools, Python pdb, VS Code debugger. Rubber duck debugging: explaining code aloud reveals logical errors.",
    visual: `Error: "Cannot read property 'name' of undefined"\n  → Something is undefined when you expected an object\n  → Check: where does this variable come from?\n  → console.log(variable) just before the error line\n  → Found: API returned null, not handled → Fix: add null check`
  },
];

const CURRICULUM = {
  HTML: {
    color: "#e34c26", icon: "🌐",
    beginner: [
      { id: "html-1", title: "What is HTML?", xp: 10, content: "HTML (HyperText Markup Language) is the skeleton of every web page. It uses tags like <h1>, <p>, <img> to describe the structure of content.", code: `<!DOCTYPE html>\n<html>\n  <head><title>My Page</title></head>\n  <body>\n    <h1>Hello World!</h1>\n    <p>This is my first webpage.</p>\n  </body>\n</html>` },
      { id: "html-2", title: "Tags & Elements", xp: 15, content: "Every HTML element has an opening tag <tag> and closing tag </tag>. Some tags are self-closing like <img /> and <br />.", code: `<h1>Heading 1</h1>\n<p>Paragraph</p>\n<img src="photo.jpg" alt="A photo" />\n<a href="https://google.com">Click me</a>` },
      { id: "html-3", title: "Forms & Inputs", xp: 20, content: "Forms collect user data. Inputs come in many types: text, email, password, checkbox, radio, button.", code: `<form action="/submit" method="POST">\n  <input type="text" name="username" placeholder="Your name" />\n  <input type="email" name="email" placeholder="Email" />\n  <button type="submit">Sign Up</button>\n</form>` },
    ],
    intermediate: [
      { id: "html-4", title: "Semantic HTML", xp: 25, content: "Semantic tags (<header>, <main>, <section>, <article>, <footer>) give meaning to your HTML structure, improving accessibility and SEO.", code: `<header><nav>...</nav></header>\n<main>\n  <section>\n    <article><h2>Blog Post</h2><p>...</p></article>\n  </section>\n</main>\n<footer>© 2025</footer>` },
      { id: "html-5", title: "Accessibility (a11y)", xp: 30, content: "Accessible HTML works for screen readers and keyboard users. Use alt text, labels, ARIA roles, and proper heading hierarchy.", code: `<label for="email">Email:</label>\n<input id="email" type="email" aria-required="true" />\n<button aria-label="Close dialog">×</button>` },
    ],
    advanced: [
      { id: "html-6", title: "HTML5 APIs", xp: 40, content: "HTML5 includes powerful APIs: Canvas (2D drawing), Web Storage, Geolocation, Drag & Drop, WebSockets, and Service Workers.", code: `<canvas id="myCanvas" width="300" height="200"></canvas>\n<script>\n  const ctx = document.getElementById('myCanvas').getContext('2d');\n  ctx.fillStyle = 'blue';\n  ctx.fillRect(10, 10, 150, 100);\n</script>` },
    ],
  },
  CSS: {
    color: "#264de4", icon: "🎨",
    beginner: [
      { id: "css-1", title: "What is CSS?", xp: 10, content: "CSS (Cascading Style Sheets) adds visual styling to HTML. It controls colors, fonts, spacing, and layout.", code: `body {\n  background: #1a1a2e;\n  color: white;\n  font-family: 'Arial', sans-serif;\n}\n\nh1 {\n  color: #e94560;\n  font-size: 2rem;\n}` },
      { id: "css-2", title: "Selectors & Properties", xp: 15, content: "CSS selectors target HTML elements. Properties define what to change. Values define how to change it.", code: `/* Element selector */\np { color: gray; }\n\n/* Class selector */\n.highlight { background: yellow; }\n\n/* ID selector */\n#header { font-size: 2rem; }\n\n/* Descendant */\nnav a { text-decoration: none; }` },
      { id: "css-3", title: "Box Model", xp: 20, content: "Every element is a box: content → padding → border → margin. Understanding the box model is essential for layout.", code: `.card {\n  width: 300px;\n  padding: 20px;\n  border: 2px solid #333;\n  margin: 10px;\n  box-sizing: border-box;\n}` },
    ],
    intermediate: [
      { id: "css-4", title: "Flexbox Layout", xp: 25, content: "Flexbox creates one-dimensional layouts (row OR column). Use it for navbars, card rows, centered content.", code: `.container {\n  display: flex;\n  justify-content: space-between;\n  align-items: center;\n  gap: 16px;\n}\n\n.card {\n  flex: 1;\n}` },
      { id: "css-5", title: "CSS Grid", xp: 30, content: "Grid creates two-dimensional layouts (rows AND columns). Perfect for page layouts, dashboards, and galleries.", code: `.grid {\n  display: grid;\n  grid-template-columns: repeat(3, 1fr);\n  gap: 20px;\n}\n\n.featured {\n  grid-column: span 2;\n}` },
    ],
    advanced: [
      { id: "css-6", title: "Animations & Transitions", xp: 40, content: "CSS animations bring UIs to life without JavaScript. Transitions smooth state changes; @keyframes create complex animations.", code: `@keyframes fadeIn {\n  from { opacity: 0; transform: translateY(20px); }\n  to   { opacity: 1; transform: translateY(0); }\n}\n\n.card {\n  animation: fadeIn 0.5s ease-out;\n  transition: transform 0.2s;\n}\n.card:hover {\n  transform: scale(1.05);\n}` },
    ],
  },
  JavaScript: {
    color: "#f7df1e", icon: "⚡",
    beginner: [
      { id: "js-1", title: "Variables & Data Types", xp: 10, content: "JavaScript has 7 primitive types: string, number, boolean, null, undefined, symbol, bigint. Use let for mutable, const for fixed values.", code: `const name = "Alex";       // string\nlet age = 25;              // number\nconst isStudent = true;    // boolean\nlet score = null;          // null\nlet result;                // undefined\nconsole.log(typeof name);  // "string"` },
      { id: "js-2", title: "Functions", xp: 15, content: "Functions are reusable code blocks. Arrow functions (=>) are modern and concise. Functions can return values.", code: `// Traditional\nfunction add(a, b) {\n  return a + b;\n}\n\n// Arrow function\nconst multiply = (a, b) => a * b;\n\nconsole.log(add(3, 4));       // 7\nconsole.log(multiply(3, 4));  // 12` },
      { id: "js-3", title: "DOM Manipulation", xp: 20, content: "The DOM (Document Object Model) is the live tree of HTML elements. JavaScript can read, change, add, and remove elements.", code: `// Select element\nconst btn = document.getElementById('myBtn');\nconst items = document.querySelectorAll('.item');\n\n// Modify\nbtn.textContent = "Clicked!";\nbtn.style.background = "green";\n\n// Events\nbtn.addEventListener('click', () => {\n  alert('Button clicked!');\n});` },
    ],
    intermediate: [
      { id: "js-4", title: "Arrays & Higher-Order Functions", xp: 25, content: "Master map, filter, reduce for arrays; destructuring and spread for objects. These are used in every modern JS codebase.", code: `const nums = [1,2,3,4,5];\n\n// map transforms each item\nconst doubled = nums.map(n => n * 2); // [2,4,6,8,10]\n\n// filter keeps matching items\nconst evens = nums.filter(n => n % 2 === 0); // [2,4]\n\n// reduce accumulates\nconst sum = nums.reduce((acc, n) => acc + n, 0); // 15\n\n// Destructuring\nconst { name, age } = { name: "Alex", age: 25 };` },
      { id: "js-5", title: "Async/Await & Fetch", xp: 30, content: "Modern JavaScript handles async operations with Promises and async/await. The Fetch API makes HTTP requests.", code: `async function loadUsers() {\n  try {\n    const res = await fetch('https://jsonplaceholder.typicode.com/users');\n    const users = await res.json();\n    users.forEach(u => console.log(u.name));\n  } catch (err) {\n    console.error('Error:', err);\n  }\n}\nloadUsers();` },
    ],
    advanced: [
      { id: "js-6", title: "Closures & Scope", xp: 40, content: "A closure is a function that remembers variables from its outer scope even after the outer function has returned. This enables data privacy, memoization, and factory functions.", code: `function makeCounter() {\n  let count = 0;  // private variable\n  return {\n    increment: () => ++count,\n    decrement: () => --count,\n    value: () => count\n  };\n}\n\nconst counter = makeCounter();\ncounter.increment(); // 1\ncounter.increment(); // 2\nconsole.log(counter.value()); // 2` },
    ],
  },
  Python: {
    color: "#3776ab", icon: "🐍",
    beginner: [
      { id: "py-1", title: "Python Basics", xp: 10, content: "Python is readable, beginner-friendly, and powerful. No semicolons. Indentation defines blocks. Perfect for beginners and professionals alike.", code: `# Variables\nname = "Alex"\nage = 25\nis_student = True\n\n# Print\nprint(f"Hello, {name}! You are {age} years old.")\n\n# User input\nuser_name = input("What's your name? ")\nprint(f"Nice to meet you, {user_name}!")` },
      { id: "py-2", title: "Lists & Dictionaries", xp: 15, content: "Lists are ordered mutable collections. Dictionaries store key-value pairs. Both are fundamental to Python programming.", code: `# List\nfruits = ["apple", "banana", "cherry"]\nfruits.append("mango")\nprint(fruits[0])  # apple\n\n# Dictionary\nperson = {"name": "Alex", "age": 25}\nperson["city"] = "Lagos"\nprint(person["name"])  # Alex\n\n# Loop through dict\nfor key, value in person.items():\n    print(f"{key}: {value}")` },
      { id: "py-3", title: "Functions in Python", xp: 20, content: "Python functions use def keyword. Can have default parameters, return multiple values, and accept arbitrary arguments (*args, **kwargs).", code: `def greet(name, greeting="Hello"):\n    return f"{greeting}, {name}!"\n\nprint(greet("Alex"))          # Hello, Alex!\nprint(greet("Sam", "Hi"))    # Hi, Sam!\n\ndef stats(numbers):\n    return min(numbers), max(numbers), sum(numbers)/len(numbers)\n\nlow, high, avg = stats([3, 7, 2, 9, 5])\nprint(f"Min:{low} Max:{high} Avg:{avg:.1f}")` },
    ],
    intermediate: [
      { id: "py-4", title: "OOP in Python", xp: 25, content: "Object-Oriented Programming in Python uses classes to model real-world entities. Inheritance, encapsulation, and polymorphism.", code: `class Vehicle:\n    def __init__(self, brand, speed):\n        self.brand = brand\n        self._speed = speed\n    \n    def describe(self):\n        return f"{self.brand} goes {self._speed}km/h"\n\nclass Car(Vehicle):\n    def __init__(self, brand, speed, doors):\n        super().__init__(brand, speed)\n        self.doors = doors\n    \n    def describe(self):\n        return super().describe() + f" with {self.doors} doors"\n\ncar = Car("Toyota", 180, 4)\nprint(car.describe())` },
      { id: "py-5", title: "File I/O & Error Handling", xp: 30, content: "Python can read/write files and handle errors gracefully with try/except blocks.", code: `# Write file\nwith open("data.txt", "w") as f:\n    f.write("Line 1\\nLine 2\\nLine 3")\n\n# Read file\ntry:\n    with open("data.txt", "r") as f:\n        content = f.read()\n    print(content)\nexcept FileNotFoundError:\n    print("File not found!")\nexcept PermissionError:\n    print("No permission to read file!")` },
    ],
    advanced: [
      { id: "py-6", title: "Decorators & Generators", xp: 40, content: "Decorators wrap functions to add behavior. Generators yield values lazily, saving memory for large datasets.", code: `# Decorator\ndef timer(func):\n    import time\n    def wrapper(*args, **kwargs):\n        start = time.time()\n        result = func(*args, **kwargs)\n        print(f"{func.__name__} took {time.time()-start:.3f}s")\n        return result\n    return wrapper\n\n@timer\ndef slow_function():\n    import time; time.sleep(0.5)\n\n# Generator\ndef fibonacci():\n    a, b = 0, 1\n    while True:\n        yield a\n        a, b = b, a + b\n\nfib = fibonacci()\nprint([next(fib) for _ in range(10)])` },
    ],
  },
  "C++": {
    color: "#00599c", icon: "⚙️",
    beginner: [
      { id: "cpp-1", title: "Introduction to C++", xp: 10, content: "C++ is a powerful, fast, compiled language. Used in games, OS, embedded systems. Requires compilation before running.", code: `#include <iostream>\nusing namespace std;\n\nint main() {\n    cout << "Hello, World!" << endl;\n    \n    string name;\n    cout << "Enter your name: ";\n    cin >> name;\n    cout << "Hello, " << name << "!" << endl;\n    \n    return 0;\n}` },
      { id: "cpp-2", title: "Variables & Data Types", xp: 15, content: "C++ is statically typed — you must declare the type. Common types: int, float, double, char, bool, string.", code: `#include <iostream>\n#include <string>\nusing namespace std;\n\nint main() {\n    int age = 25;\n    double gpa = 3.85;\n    char grade = 'A';\n    bool isStudent = true;\n    string name = "Alex";\n    \n    cout << name << " is " << age << " years old." << endl;\n    return 0;\n}` },
      { id: "cpp-3", title: "Loops & Conditions", xp: 20, content: "C++ supports for, while, do-while loops and if/else, switch conditions. Very similar to JavaScript syntax.", code: `#include <iostream>\nusing namespace std;\n\nint main() {\n    for (int i = 1; i <= 5; i++) {\n        if (i % 2 == 0)\n            cout << i << " is even" << endl;\n        else\n            cout << i << " is odd" << endl;\n    }\n    return 0;\n}` },
    ],
    intermediate: [
      { id: "cpp-4", title: "Functions & Pointers", xp: 25, content: "Pointers store memory addresses. Pass by reference modifies original values. Essential for performance and memory management.", code: `#include <iostream>\nusing namespace std;\n\nvoid swap(int& a, int& b) {\n    int temp = a;\n    a = b;\n    b = temp;\n}\n\nint main() {\n    int x = 5, y = 10;\n    swap(x, y);\n    cout << x << " " << y << endl;  // 10 5\n    return 0;\n}` },
      { id: "cpp-5", title: "Classes & OOP", xp: 30, content: "C++ OOP: classes, constructors, destructors, inheritance, virtual functions for polymorphism.", code: `#include <iostream>\nusing namespace std;\n\nclass Shape {\npublic:\n    virtual double area() = 0;\n};\n\nclass Circle : public Shape {\n    double radius;\npublic:\n    Circle(double r) : radius(r) {}\n    double area() override {\n        return 3.14159 * radius * radius;\n    }\n};\n\nint main() {\n    Shape* s = new Circle(5.0);\n    cout << "Area: " << s->area() << endl;\n    delete s;\n    return 0;\n}` },
    ],
    advanced: [
      { id: "cpp-6", title: "Templates & STL", xp: 40, content: "Templates enable generic programming. STL containers (vector, map, set) and algorithms are production-grade building blocks.", code: `#include <iostream>\n#include <vector>\n#include <map>\n#include <algorithm>\nusing namespace std;\n\ntemplate<typename T>\nT maxOf(T a, T b) { return a > b ? a : b; }\n\nint main() {\n    vector<int> nums = {5, 2, 8, 1, 9};\n    sort(nums.begin(), nums.end());\n    \n    map<string, int> scores;\n    scores["Alex"] = 95;\n    scores["Sam"] = 87;\n    \n    for (auto& [name, score] : scores)\n        cout << name << ": " << score << endl;\n    \n    cout << maxOf(3, 7) << endl;\n    return 0;\n}` },
    ],
  },
};

const PROJECTS = [
  { id: "proj-1", title: "Quiz Game", emoji: "❓", difficulty: "Beginner", lang: "JavaScript", xp: 100, description: "Build a 10-question quiz with score tracking, timer, and animated results screen.", steps: ["Design quiz data structure (array of question objects)", "Render questions dynamically with DOM manipulation", "Track score with a variable", "Add 30-second countdown timer", "Show results with percentage and pass/fail"] },
  { id: "proj-2", title: "Portfolio Website", emoji: "💼", difficulty: "Beginner", lang: "HTML/CSS", xp: 80, description: "Build a personal portfolio with hero section, skills, projects, and contact form.", steps: ["Plan sections: hero, about, skills, projects, contact", "Build HTML structure with semantic elements", "Style with CSS Grid and Flexbox", "Add smooth scroll and CSS animations", "Deploy to GitHub Pages"] },
  { id: "proj-3", title: "To-Do App", emoji: "✅", difficulty: "Intermediate", lang: "JavaScript", xp: 120, description: "Full-featured to-do app with localStorage persistence, categories, and filters.", steps: ["Create UI with input + list", "Add/remove tasks with DOM manipulation", "Save to localStorage (JSON.stringify)", "Add filter: All / Active / Completed", "Add drag-and-drop reordering"] },
  { id: "proj-4", title: "Snake Game", emoji: "🐍", difficulty: "Intermediate", lang: "JavaScript", xp: 150, description: "Classic snake game using HTML Canvas, keyboard controls, and collision detection.", steps: ["Set up Canvas and game loop (requestAnimationFrame)", "Represent snake as array of coordinates", "Handle keyboard input (arrow keys)", "Implement food spawning randomly", "Detect wall/self collisions → game over"] },
  { id: "proj-5", title: "Python CLI Dashboard", emoji: "📊", difficulty: "Intermediate", lang: "Python", xp: 130, description: "Command-line student grade manager with file persistence and statistics.", steps: ["Design data model (dict of students + grades)", "Build CRUD menu system (add/view/update/delete)", "Save/load data with JSON files", "Calculate averages, highest/lowest scores", "Export report as text file"] },
  { id: "proj-6", title: "Auth System", emoji: "🔐", difficulty: "Advanced", lang: "JavaScript", xp: 200, description: "Frontend authentication flow: registration, login, JWT token handling, protected routes.", steps: ["Build register/login forms with validation", "Send POST requests to auth API", "Store JWT in localStorage", "Create route guards that check token", "Implement logout and token refresh logic"] },
];

const SETUP_GUIDES = {
  PC: [
    { tool: "VS Code", emoji: "💻", steps: ["Go to code.visualstudio.com", "Download for your OS (Windows/Mac/Linux)", "Run installer, accept defaults", "Open VS Code, press Ctrl+Shift+X for extensions", "Install: Prettier, ESLint, Python, C/C++"], purpose: "Your main code editor — where you'll spend most of your time." },
    { tool: "Node.js", emoji: "⬡", steps: ["Go to nodejs.org", "Download LTS version", "Run installer", "Open terminal: type 'node --version'", "Should see: v20.x.x or higher"], purpose: "Runs JavaScript outside the browser. Required for most JS frameworks." },
    { tool: "Python", emoji: "🐍", steps: ["Go to python.org/downloads", "Download latest version", "IMPORTANT: Check 'Add Python to PATH' during install", "Verify: type 'python --version' in terminal", "Install pip packages: pip install requests"], purpose: "Run Python scripts locally. Needed for data science, automation, backend." },
    { tool: "C++ Compiler (GCC)", emoji: "⚙️", steps: ["Windows: Install MinGW (mingw-w64.org)", "Mac: Run 'xcode-select --install' in terminal", "Linux: 'sudo apt install g++'", "Verify: 'g++ --version'", "Compile: 'g++ hello.cpp -o hello && ./hello'"], purpose: "Compiles C++ code into executable programs." },
  ],
  Mobile: [
    { tool: "Termux (Android)", emoji: "📱", steps: ["Install Termux from F-Droid (NOT Play Store)", "Run: pkg update && pkg upgrade", "Install Python: pkg install python", "Install Node: pkg install nodejs", "Edit code with nano or install Acode editor app"], purpose: "Full Linux terminal on Android. Run Python, Node, C++ on your phone." },
    { tool: "Pydroid 3 (Android)", emoji: "🐍", steps: ["Install Pydroid 3 from Play Store", "Open app, tap the play button to run code", "Install packages via the pip tab", "Use the editor to write Python scripts", "Access terminal for command-line programs"], purpose: "Easiest way to run Python on Android. Includes IDE and pip." },
    { tool: "Replit (All platforms)", emoji: "🌐", steps: ["Go to replit.com and create free account", "Click 'Create Repl' and choose language", "Write code in the editor", "Click 'Run' — instant execution in browser", "Works on any phone, tablet, or PC"], purpose: "Code in browser on any device. No installation needed. Supports 50+ languages." },
    { tool: "Acode + GitHub", emoji: "📝", steps: ["Install Acode from Play Store", "Install GitHub app", "Clone your repo in GitHub app", "Open folder in Acode", "Use Termux to run your code"], purpose: "Professional mobile coding workflow for serious mobile developers." },
  ],
};

const AI_MODULE = {
  levels: [
    { level: 1, title: "AI Spectator", description: "Just watching AI code. Understanding nothing. Copying everything.", danger: "HIGH" },
    { level: 2, title: "AI Dependent", description: "Asking AI for every line. Can't code without it.", danger: "HIGH" },
    { level: 3, title: "AI Assisted", description: "Using AI for boilerplate. Understanding what it produces.", danger: "MEDIUM" },
    { level: 4, title: "AI Collaborator", description: "Directing AI like a junior developer. Reviewing and modifying output.", danger: "LOW" },
    { level: 5, title: "AI Master", description: "Using AI strategically. Writing complex code independently. AI is a tool, not a crutch.", danger: "NONE" },
  ],
  goodPrompts: [
    { prompt: "Explain what a closure is in JavaScript with a simple analogy", why: "Asks for explanation, not code. Forces you to understand." },
    { prompt: "I wrote this function and it returns undefined. Here's my code: [paste code]. What might be wrong?", why: "Shows your attempt. AI debugs WITH you, not FOR you." },
    { prompt: "Give me a hint (not the solution) for implementing a binary search algorithm", why: "Keeps you thinking. AI is a hint-giver, not a solution machine." },
    { prompt: "Review this code for potential bugs and performance issues: [paste code]", why: "You wrote it, AI reviews it. Learning from feedback." },
  ],
  badPrompts: [
    { prompt: "Build me a complete to-do app in React", why: "You learn nothing. AI does all thinking." },
    { prompt: "Fix my code [paste code without explanation]", why: "Too vague. No learning. Teaches dependency." },
    { prompt: "Write a Python script that reads CSV and generates a report", why: "You should try first, fail, then ask for specific help." },
    { prompt: "Do this homework: [paste assignment]", why: "Destroys your learning. You'll be helpless in interviews." },
  ],
};

const ACHIEVEMENTS = [
  { id: "first-lesson", title: "First Step", emoji: "👶", desc: "Earn your first 10 XP" },
  { id: "century", title: "Century Club", emoji: "💯", desc: "Reach 100 XP" },
  { id: "concept-scholar", title: "Concept Scholar", emoji: "📚", desc: "Study 5+ concepts" },
  { id: "note-taker", title: "Note-Taker", emoji: "📝", desc: "Save 5+ notes" },
  { id: "project-builder", title: "Builder", emoji: "🏗️", desc: "Complete a project" },
  { id: "polyglot", title: "Polyglot", emoji: "🌍", desc: "Study 3+ languages" },
  { id: "no-ai", title: "Independent Coder", emoji: "🧠", desc: "Start the No-AI Challenge" },
  { id: "explorer", title: "Explorer", emoji: "🔍", desc: "Visit every section" },
  { id: "master", title: "Academy Master", emoji: "🏆", desc: "Reach 500 XP" },
];

// ============================================================
// MAIN APP
// ============================================================
export default function SoftwareAcademy() {
  const [section, setSection] = useState("dashboard");
  const [activeLang, setActiveLang] = useState("JavaScript");
  const [activeTrack, setActiveTrack] = useState("beginner");
  const [activeLesson, setActiveLesson] = useState(null);
  const [activeConcept, setActiveConcept] = useState(null);
  const [activeProject, setActiveProject] = useState(null);
  const [dark, setDark] = useState(true);
  const [xp, setXp] = useState(() => +localStorage.getItem("sea_xp") || 0);
  const [completed, setCompleted] = useState(() => JSON.parse(localStorage.getItem("sea_completed") || "[]"));
  const [notes, setNotes] = useState(() => JSON.parse(localStorage.getItem("sea_notes") || "[]"));
  const [bookmarks, setBookmarks] = useState(() => JSON.parse(localStorage.getItem("sea_bookmarks") || "[]"));
  const [conceptsViewed, setConceptsViewed] = useState(() => JSON.parse(localStorage.getItem("sea_concepts") || "[]"));
  const [langsStudied, setLangsStudied] = useState(() => JSON.parse(localStorage.getItem("sea_langs") || "[]"));
  const [visitedSections, setVisitedSections] = useState(() => JSON.parse(localStorage.getItem("sea_visited") || "[]"));
  const [thinkMode, setThinkMode] = useState(false);
  const [thinkStep, setThinkStep] = useState(0);
  const [toast, setToast] = useState(null);
  const [confetti, setConfetti] = useState(false);
  const [noteTitle, setNoteTitle] = useState("");
  const [noteContent, setNoteContent] = useState("");
  const [setupTab, setSetupTab] = useState("PC");
  const [aiTab, setAiTab] = useState("levels");
  const [sidebarOpen, setSidebarOpen] = useState(true);

  useEffect(() => { localStorage.setItem("sea_xp", xp); }, [xp]);
  useEffect(() => { localStorage.setItem("sea_completed", JSON.stringify(completed)); }, [completed]);
  useEffect(() => { localStorage.setItem("sea_notes", JSON.stringify(notes)); }, [notes]);
  useEffect(() => { localStorage.setItem("sea_bookmarks", JSON.stringify(bookmarks)); }, [bookmarks]);
  useEffect(() => { localStorage.setItem("sea_concepts", JSON.stringify(conceptsViewed)); }, [conceptsViewed]);
  useEffect(() => { localStorage.setItem("sea_langs", JSON.stringify(langsStudied)); }, [langsStudied]);
  useEffect(() => { localStorage.setItem("sea_visited", JSON.stringify(visitedSections)); }, [visitedSections]);

  const go = (s) => {
    setSection(s);
    if (!visitedSections.includes(s)) setVisitedSections(v => [...v, s]);
  };

  const showToast = (msg) => { setToast(msg); setTimeout(() => setToast(null), 2500); };

  const gainXp = (amount, id) => {
    if (completed.includes(id)) return;
    const newXp = xp + amount;
    setXp(newXp);
    setCompleted(c => [...c, id]);
    showToast(`+${amount} XP! 🎉`);
    if (amount >= 25) { setConfetti(true); setTimeout(() => setConfetti(false), 3000); }
    if (!langsStudied.includes(activeLang)) setLangsStudied(l => [...l, activeLang]);
  };

  const saveNote = () => {
    if (!noteTitle || !noteContent) return;
    const n = { id: Date.now(), title: noteTitle, content: noteContent, date: new Date().toLocaleDateString() };
    setNotes(ns => [...ns, n]);
    setNoteTitle(""); setNoteContent("");
    showToast("Note saved! 📝");
  };

  const exportNotes = () => {
    const text = notes.map(n => `=== ${n.title} (${n.date}) ===\n${n.content}\n`).join("\n");
    const a = document.createElement("a");
    a.href = URL.createObjectURL(new Blob([text], { type: "text/plain" }));
    a.download = "my-notes.txt"; a.click();
  };

  const viewConcept = (concept) => {
    if (!conceptsViewed.includes(concept.id)) setConceptsViewed(cv => [...cv, concept.id]);
    setActiveConcept(concept);
    go("concept-detail");
  };

  // Computed
  const level = Math.floor(xp / 100) + 1;
  const levelPct = xp % 100;
  const langData = CURRICULUM[activeLang];
  const trackLessons = langData?.[activeTrack] || [];

  // Achievements earned
  const earnedAchs = new Set();
  if (xp >= 10) earnedAchs.add("first-lesson");
  if (xp >= 100) earnedAchs.add("century");
  if (xp >= 500) earnedAchs.add("master");
  if (conceptsViewed.length >= 5) earnedAchs.add("concept-scholar");
  if (notes.length >= 5) earnedAchs.add("note-taker");
  if (completed.some(id => id.startsWith("proj"))) earnedAchs.add("project-builder");
  if (langsStudied.length >= 3) earnedAchs.add("polyglot");
  if (completed.includes("no-ai")) earnedAchs.add("no-ai");
  if (visitedSections.length >= 7) earnedAchs.add("explorer");

  // ============================================================
  // THEME
  // ============================================================
  const t = dark ? {
    bg: "#080b14", side: "#0d1020", card: "#111428", border: "#1a1f35",
    text: "#e2e8f8", muted: "#6b7aaa", acc: "#818cf8", acc2: "#34d399",
    warn: "#fbbf24", danger: "#f87171", code: "#060912",
    nav: "#0d1020", input: "#1a1f35", badge: "#1e2545"
  } : {
    bg: "#f1f3ff", side: "#ffffff", card: "#ffffff", border: "#dde3f8",
    text: "#1e2355", muted: "#6b7aaa", acc: "#6366f1", acc2: "#059669",
    warn: "#d97706", danger: "#dc2626", code: "#1e1e3f",
    nav: "#ffffff", input: "#eef0ff", badge: "#eef0ff"
  };

  const st = {
    wrap: { display:"flex", flexDirection:"column", minHeight:"100vh", background:t.bg, color:t.text, fontFamily:"'JetBrains Mono','Fira Code',monospace", fontSize:14 },
    nav: { height:58, background:t.nav, borderBottom:`1px solid ${t.border}`, display:"flex", alignItems:"center", padding:"0 20px", gap:16, position:"sticky", top:0, zIndex:200, boxShadow: dark ? "0 2px 24px rgba(0,0,0,.7)":"0 2px 12px rgba(0,0,0,.06)" },
    layout: { display:"flex", flex:1 },
    side: { width: sidebarOpen ? 220 : 56, background:t.side, borderRight:`1px solid ${t.border}`, display:"flex", flexDirection:"column", position:"sticky", top:58, height:"calc(100vh - 58px)", overflowY:"auto", overflowX:"hidden", transition:"width 0.25s", flexShrink:0 },
    main: { flex:1, padding:28, overflowY:"auto", maxHeight:"calc(100vh - 58px)" },
    card: { background:t.card, border:`1px solid ${t.border}`, borderRadius:14, padding:20, marginBottom:16 },
    btn: (bg, fg="#fff") => ({ background:bg, color:fg, border:"none", borderRadius:9, padding:"9px 20px", cursor:"pointer", fontFamily:"inherit", fontSize:13, fontWeight:700, transition:"all .18s", display:"inline-flex", alignItems:"center", gap:6 }),
    btnOut: { background:"transparent", color:t.acc, border:`1px solid ${t.acc}`, borderRadius:9, padding:"7px 16px", cursor:"pointer", fontFamily:"inherit", fontSize:12, fontWeight:600 },
    navItem: (active) => ({ display:"flex", alignItems:"center", gap:10, padding:sidebarOpen ? "10px 18px" : "12px 0", justifyContent: sidebarOpen?"flex-start":"center", cursor:"pointer", color: active ? t.acc : t.muted, background: active ? (dark?"rgba(129,140,248,.12)":"rgba(99,102,241,.08)") : "transparent", borderLeft: sidebarOpen ? `3px solid ${active?t.acc:"transparent"}` : "none", transition:"all .2s", fontWeight: active?700:400, fontSize:13, whiteSpace:"nowrap", overflow:"hidden" }),
    tag: (color) => ({ display:"inline-block", background:color+"22", color, border:`1px solid ${color}55`, borderRadius:20, padding:"2px 10px", fontSize:11, fontWeight:700 }),
    code: { background:t.code, borderRadius:10, padding:16, fontSize:12, lineHeight:1.8, overflowX:"auto", border:`1px solid ${t.border}`, whiteSpace:"pre-wrap", color:"#a9c0d6" },
    inp: { background:t.input, border:`1px solid ${t.border}`, borderRadius:9, padding:"10px 14px", color:t.text, fontSize:13, fontFamily:"inherit", outline:"none", boxSizing:"border-box" },
    grid: (cols) => ({ display:"grid", gridTemplateColumns:`repeat(${cols},1fr)`, gap:14 }),
    pr: { background:t.border, borderRadius:10, height:8, overflow:"hidden" },
    prBar: (pct, color) => ({ width:pct+"%", height:"100%", background:color||t.acc, borderRadius:10, transition:"width .5s" }),
    title: { fontSize:22, fontWeight:800, marginBottom:4, letterSpacing:-0.5 },
    sub: { fontSize:12, color:t.muted, marginBottom:20 },
    tabRow: { display:"flex", gap:8, marginBottom:18, flexWrap:"wrap" },
    tab: (active) => ({ padding:"7px 16px", borderRadius:20, cursor:"pointer", fontSize:12, fontWeight:active?700:500, background:active?t.acc:"transparent", color:active?"#fff":t.muted, border:`1px solid ${active?t.acc:t.border}`, transition:"all .18s" }),
    row: (gap=12) => ({ display:"flex", alignItems:"center", gap }),
    bdg: (bg) => ({ background:bg, color:"#fff", borderRadius:"50%", width:28, height:28, display:"flex", alignItems:"center", justifyContent:"center", fontSize:12, fontWeight:800, flexShrink:0 }),
  };

  const NAV = [
    { id:"dashboard", icon:"🏠", label:"Dashboard" },
    { id:"curriculum", icon:"📚", label:"Curriculum" },
    { id:"concepts", icon:"🧠", label:"Concept Engine" },
    { id:"projects", icon:"🚀", label:"Projects" },
    { id:"notes", icon:"📝", label:"My Notes" },
    { id:"setup", icon:"💻", label:"Setup Guide" },
    { id:"ai", icon:"🤖", label:"AI Module" },
    { id:"achievements", icon:"🏆", label:"Achievements" },
  ];

  // ============================================================
  // RENDER PAGES
  // ============================================================

  const Dashboard = () => {
    const totalLessons = Object.values(CURRICULUM).flatMap(l=>[...l.beginner,...l.intermediate,...l.advanced]).length;
    return (
      <div>
        <div style={st.title}>🎓 Software Engineering Academy</div>
        <div style={st.sub}>Transform from beginner to independent software creator.</div>

        {/* Stats row */}
        <div style={st.grid(4)}>
          {[
            {label:"XP Earned", value:xp, icon:"⚡", color:t.acc},
            {label:"Your Level", value:`Lv.${level}`, icon:"🏆", color:t.acc2},
            {label:"Lessons Done", value:completed.length, icon:"✅", color:t.warn},
            {label:"Notes Saved", value:notes.length, icon:"📝", color:"#e879f9"},
          ].map(s => (
            <div key={s.label} style={{...st.card, textAlign:"center", borderTop:`3px solid ${s.color}`}}>
              <div style={{fontSize:30}}>{s.icon}</div>
              <div style={{fontSize:26, fontWeight:800, color:s.color}}>{s.value}</div>
              <div style={{fontSize:11, color:t.muted, marginTop:4}}>{s.label}</div>
            </div>
          ))}
        </div>

        {/* XP bar */}
        <div style={st.card}>
          <div style={{...st.row(), marginBottom:8}}>
            <span style={{fontWeight:700}}>Level {level}</span>
            <span style={{marginLeft:"auto", fontSize:12, color:t.muted}}>{levelPct}/100 XP</span>
          </div>
          <div style={st.pr}><div style={st.prBar(levelPct)} /></div>
          <div style={{fontSize:11, color:t.muted, marginTop:6}}>{100-levelPct} XP to reach Level {level+1}</div>
        </div>

        {/* Languages */}
        <div style={{fontWeight:700, marginBottom:12}}>🌐 Language Tracks</div>
        <div style={st.grid(5)}>
          {Object.entries(CURRICULUM).map(([lang, data]) => {
            const all = [...data.beginner,...data.intermediate,...data.advanced];
            const done = all.filter(l=>completed.includes(l.id)).length;
            const pct = Math.round(done/all.length*100);
            return (
              <div key={lang} onClick={()=>{setActiveLang(lang); go("curriculum");}}
                style={{...st.card, cursor:"pointer", textAlign:"center", borderTop:`3px solid ${data.color}`}}
                onMouseEnter={e=>e.currentTarget.style.transform="translateY(-4px)"}
                onMouseLeave={e=>e.currentTarget.style.transform="none"}>
                <div style={{fontSize:32}}>{data.icon}</div>
                <div style={{fontWeight:700, marginBottom:6}}>{lang}</div>
                <div style={st.pr}><div style={st.prBar(pct, data.color)} /></div>
                <div style={{fontSize:11, color:t.muted, marginTop:6}}>{done}/{all.length} • {pct}%</div>
              </div>
            );
          })}
        </div>

        {/* Featured projects */}
        <div style={{fontWeight:700, margin:"20px 0 12px"}}>🚀 Featured Projects</div>
        <div style={st.grid(3)}>
          {PROJECTS.slice(0,3).map(p => (
            <div key={p.id} onClick={()=>{setActiveProject(p); go("project-detail");}}
              style={{...st.card, cursor:"pointer"}}
              onMouseEnter={e=>e.currentTarget.style.borderColor=t.acc}
              onMouseLeave={e=>e.currentTarget.style.borderColor=t.border}>
              <div style={{fontSize:32, marginBottom:8}}>{p.emoji}</div>
              <div style={{fontWeight:700}}>{p.title}</div>
              <div style={{...st.row(6), margin:"8px 0"}}>
                <span style={st.tag(p.difficulty==="Beginner"?t.acc2:p.difficulty==="Intermediate"?t.warn:t.danger)}>{p.difficulty}</span>
                <span style={st.tag(t.acc)}>{p.lang}</span>
              </div>
              <div style={{fontSize:12, color:t.muted}}>{p.description.slice(0,75)}...</div>
              <div style={{marginTop:10, fontSize:12, color:t.acc, fontWeight:700}}>+{p.xp} XP →</div>
            </div>
          ))}
        </div>

        {/* Daily challenge */}
        <div style={{...st.card, background: dark?"linear-gradient(135deg,#0e0a2a,#0a1f3a)":"linear-gradient(135deg,#ede9fe,#e0f2fe)", borderColor:t.acc}}>
          <div style={st.row(16)}>
            <span style={{fontSize:36}}>🎯</span>
            <div style={{flex:1}}>
              <div style={{fontWeight:800, fontSize:15}}>Daily Coding Challenge</div>
              <div style={{color:t.muted, fontSize:13, marginTop:4}}>Write a function that reverses a string WITHOUT using .reverse(). Solve it without AI!</div>
            </div>
            <button style={st.btn(t.acc)} onClick={()=>go("curriculum")}>Start</button>
          </div>
        </div>
      </div>
    );
  };

  const Curriculum = () => (
    <div>
      <div style={st.row(12)}>
        <span style={{fontSize:36}}>{langData.icon}</span>
        <div>
          <div style={st.title}>{activeLang}</div>
          <div style={st.sub}>Master {activeLang} from fundamentals to advanced concepts</div>
        </div>
      </div>
      <div style={st.tabRow}>
        {LANGUAGES.map(l => <span key={l} style={st.tab(activeLang===l)} onClick={()=>setActiveLang(l)}>{CURRICULUM[l].icon} {l}</span>)}
      </div>
      <div style={st.tabRow}>
        {["beginner","intermediate","advanced"].map(tr => (
          <span key={tr} style={st.tab(activeTrack===tr)} onClick={()=>setActiveTrack(tr)}>
            {tr==="beginner"?"🌱":tr==="intermediate"?"🌿":"🌳"} {tr[0].toUpperCase()+tr.slice(1)}
          </span>
        ))}
      </div>
      {trackLessons.map((lesson, i) => {
        const done = completed.includes(lesson.id);
        const bm = bookmarks.includes(lesson.id);
        return (
          <div key={lesson.id}
            style={{...st.card, cursor:"pointer", borderLeft:`4px solid ${done?t.acc2:langData.color}`, transition:"all .2s"}}
            onMouseEnter={e=>{e.currentTarget.style.borderColor=t.acc; e.currentTarget.style.transform="translateX(4px)";}}
            onMouseLeave={e=>{e.currentTarget.style.borderColor=done?t.acc2:langData.color; e.currentTarget.style.transform="none";}}
            onClick={()=>{setActiveLesson(lesson); go("lesson"); if(!langsStudied.includes(activeLang)) setLangsStudied(l=>[...l,activeLang]);}}>
            <div style={st.row(14)}>
              <div style={st.bdg(done?t.acc2:langData.color)}>{done?"✓":i+1}</div>
              <div style={{flex:1}}>
                <div style={{fontWeight:700}}>{lesson.title}</div>
                <div style={{fontSize:11, color:t.muted, marginTop:4}}>{lesson.content.slice(0,75)}...</div>
              </div>
              <div style={st.row(8)}>
                <span style={st.tag(t.acc)}>+{lesson.xp} XP</span>
                <span onClick={e=>{e.stopPropagation(); setBookmarks(b=>b.includes(lesson.id)?b.filter(x=>x!==lesson.id):[...b,lesson.id]);}} style={{cursor:"pointer"}}>{bm?"🔖":"📄"}</span>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );

  const THINK_STEPS = [
    "🧮 Memory allocated: let x = 0 → slot #7701 created, value = 0",
    "📍 i=0: Condition check → 0 < 3 → TRUE → entering loop body",
    "📤 console.log(0) → Output: 0 printed to screen",
    "🔁 i++ executes → slot #7701 updated: value = 1",
    "📍 i=1: Condition check → 1 < 3 → TRUE → entering loop body",
    "📤 console.log(1) → Output: 1 printed to screen",
    "🔁 i++ executes → slot #7701 updated: value = 2",
    "📍 i=2: Condition check → 2 < 3 → TRUE → entering loop body",
    "📤 console.log(2) → Output: 2 printed to screen",
    "🔁 i++ executes → slot #7701 updated: value = 3",
    "🛑 i=3: Condition check → 3 < 3 → FALSE → LOOP EXITS",
    "✅ Program continues after the loop. Total output: 0, 1, 2",
  ];

  const Lesson = () => {
    if (!activeLesson) return null;
    const done = completed.includes(activeLesson.id);
    return (
      <div>
        <button style={st.btnOut} onClick={()=>go("curriculum")}>← Back</button>
        <div style={{height:20}} />
        <div style={st.row(12)}>
          <div style={{...st.title, marginBottom:0}}>{activeLesson.title}</div>
          <span style={{...st.tag(t.acc), marginLeft:"auto"}}>+{activeLesson.xp} XP</span>
        </div>
        <div style={{height:16}} />

        {/* Think Mode Toggle */}
        <div style={{...st.card, borderColor: thinkMode?t.acc:t.border}}>
          <div style={st.row(12)}>
            <div style={{width:44, height:24, background:thinkMode?t.acc:t.border, borderRadius:12, position:"relative", cursor:"pointer", transition:"all .2s"}}
              onClick={()=>{setThinkMode(m=>!m); setThinkStep(0);}}>
              <div style={{position:"absolute", top:2, left:thinkMode?22:2, width:20, height:20, background:"#fff", borderRadius:"50%", transition:"all .2s"}} />
            </div>
            <span style={{fontWeight:700}}>🧠 Think Like a Computer Mode</span>
            <span style={{fontSize:11, color:t.muted, marginLeft:"auto"}}>See how code executes step-by-step in memory</span>
          </div>
        </div>

        <div style={st.card}>
          <div style={{lineHeight:1.9, fontSize:13}}>{activeLesson.content}</div>
        </div>

        <div style={{fontWeight:700, marginBottom:8}}>💻 Code Example</div>
        <pre style={st.code}>{activeLesson.code}</pre>

        {thinkMode && (
          <div style={{...st.card, borderColor:"#3b82f6", background:dark?"#040e1f":"#eff6ff"}}>
            <div style={{fontWeight:800, color:"#3b82f6", marginBottom:12, fontSize:15}}>🧠 Step-by-Step Computer Execution</div>
            <div style={{fontSize:11, color:t.muted, marginBottom:12}}>Showing: for (let i = 0; i {"<"} 3; i++) {"{"} console.log(i) {"}"}</div>
            {THINK_STEPS.slice(0, thinkStep + 1).map((step, i) => (
              <div key={i} style={{padding:"9px 12px", marginBottom:6, background: i===thinkStep?(dark?"#0d2a4a":"#dbeafe"):"transparent", borderRadius:8, fontSize:13, borderLeft:`3px solid ${i===thinkStep?"#3b82f6":"transparent"}`, transition:"all .3s"}}>
                {step}
              </div>
            ))}
            <div style={{...st.row(10), marginTop:14}}>
              {thinkStep < THINK_STEPS.length - 1
                ? <button style={st.btn("#3b82f6")} onClick={()=>setThinkStep(s=>s+1)}>▶ Next Step ({thinkStep+1}/{THINK_STEPS.length})</button>
                : <button style={st.btn(t.acc2)}>✅ Execution Complete!</button>
              }
              <button style={st.btnOut} onClick={()=>setThinkStep(0)}>↩ Restart</button>
            </div>
          </div>
        )}

        <div style={st.row(10)}>
          {!done
            ? <button style={st.btn(t.acc2)} onClick={()=>gainXp(activeLesson.xp, activeLesson.id)}>✅ Mark Complete (+{activeLesson.xp} XP)</button>
            : <span style={{...st.tag(t.acc2), fontSize:13, padding:"8px 16px"}}>✅ Completed!</span>
          }
          <button style={st.btnOut} onClick={()=>{ setNoteTitle(activeLesson.title); setNoteContent(activeLesson.content.slice(0,200)+"..."); go("notes"); }}>
            📝 Save to Notes
          </button>
          <button style={st.btnOut} onClick={()=>setBookmarks(b=>b.includes(activeLesson.id)?b.filter(x=>x!==activeLesson.id):[...b,activeLesson.id])}>
            {bookmarks.includes(activeLesson.id)?"🔖 Bookmarked":"📄 Bookmark"}
          </button>
        </div>
      </div>
    );
  };

  const Concepts = () => (
    <div>
      <div style={st.title}>📚 Concept Mastery Engine</div>
      <div style={st.sub}>Deep explanations from first principles to interview-level — with analogies, code, and visual logic flows.</div>

      <div style={st.card}>
        <div style={{fontWeight:700, marginBottom:8}}>Mastery Progress</div>
        <div style={st.pr}><div style={st.prBar(Math.round(conceptsViewed.length/CONCEPT_TERMS.length*100))} /></div>
        <div style={{fontSize:11, color:t.muted, marginTop:6}}>{conceptsViewed.length}/{CONCEPT_TERMS.length} concepts studied</div>
      </div>

      <div style={st.grid(2)}>
        {CONCEPT_TERMS.map(c => (
          <div key={c.id} onClick={()=>viewConcept(c)}
            style={{...st.card, cursor:"pointer", borderLeft:`4px solid ${conceptsViewed.includes(c.id)?t.acc2:t.acc}`}}
            onMouseEnter={e=>e.currentTarget.style.background=dark?"#1a1f35":"#f0eeff"}
            onMouseLeave={e=>e.currentTarget.style.background=t.card}>
            <div style={st.row(12)}>
              <span style={{fontSize:28}}>{c.emoji}</span>
              <div style={{flex:1}}>
                <div style={{fontWeight:700}}>{c.term}</div>
                <div style={{fontSize:11, color:t.muted, marginTop:4}}>{c.definition.slice(0,65)}...</div>
              </div>
              {conceptsViewed.includes(c.id) && <span style={{color:t.acc2}}>✓</span>}
            </div>
          </div>
        ))}
      </div>
    </div>
  );

  const ConceptDetail = () => {
    if (!activeConcept) return null;
    return (
      <div>
        <button style={st.btnOut} onClick={()=>go("concepts")}>← Back to Concepts</button>
        <div style={{height:20}} />
        <div style={st.row(16)}>
          <span style={{fontSize:52}}>{activeConcept.emoji}</span>
          <div>
            <div style={st.title}>{activeConcept.term}</div>
            <div style={st.sub}>Full breakdown — beginner to expert</div>
          </div>
        </div>

        {[
          {icon:"📖", label:"Clear Definition", text:activeConcept.definition},
          {icon:"🧠", label:"Vivid Explanation", text:activeConcept.vivid},
          {icon:"🌍", label:"Real-Life Analogy", text:activeConcept.analogy},
        ].map(s => (
          <div key={s.label} style={st.card}>
            <div style={{...st.row(8), marginBottom:10}}><span style={{fontSize:20}}>{s.icon}</span><span style={{fontWeight:700}}>{s.label}</span></div>
            <div style={{lineHeight:1.9, fontSize:13}}>{s.text}</div>
          </div>
        ))}

        <div style={{fontWeight:700, marginBottom:8}}>💻 Code Example</div>
        <pre style={{...st.code, marginBottom:16}}>{activeConcept.code}</pre>

        {[
          {icon:"⚠️", label:"Common Mistakes", list:activeConcept.mistakes},
        ].map(s => (
          <div key={s.label} style={st.card}>
            <div style={{...st.row(8), marginBottom:10}}><span style={{fontSize:20}}>{s.icon}</span><span style={{fontWeight:700}}>{s.label}</span></div>
            <ul style={{paddingLeft:20, margin:0}}>{s.list.map((m,i)=><li key={i} style={{fontSize:13, color:t.danger, marginBottom:8}}>{m}</li>)}</ul>
          </div>
        ))}

        {[
          {icon:"🔎", label:"Why It Matters in Real Projects", text:activeConcept.whyMatters},
          {icon:"📝", label:"Notebook Summary", text:activeConcept.noteSummary},
          {icon:"🎯", label:"Interview-Level Explanation", text:activeConcept.interviewLevel},
        ].map(s => (
          <div key={s.label} style={st.card}>
            <div style={{...st.row(8), marginBottom:10}}><span style={{fontSize:20}}>{s.icon}</span><span style={{fontWeight:700}}>{s.label}</span></div>
            <div style={{lineHeight:1.9, fontSize:13}}>{s.text}</div>
          </div>
        ))}

        <div style={st.card}>
          <div style={{...st.row(8), marginBottom:10}}><span style={{fontSize:20}}>🧩</span><span style={{fontWeight:700}}>Visual Explanation (Step-by-Step Logic Flow)</span></div>
          <pre style={{...st.code, fontSize:12}}>{activeConcept.visual}</pre>
        </div>

        <div style={st.row(10)}>
          <button style={st.btn(t.acc)} onClick={()=>{ setNoteTitle(activeConcept.term); setNoteContent(`📝 ${activeConcept.noteSummary}\n\n🎯 ${activeConcept.interviewLevel}`); go("notes"); }}>
            📝 Save to Notes
          </button>
          <button style={st.btnOut} onClick={()=>go("concepts")}>← Back to All Concepts</button>
        </div>
      </div>
    );
  };

  const Projects = () => (
    <div>
      <div style={st.title}>🚀 Project Build Tracks</div>
      <div style={st.sub}>Real projects with architecture plans, logic design, and debugging strategy.</div>
      <div style={st.grid(2)}>
        {PROJECTS.map(p => (
          <div key={p.id} onClick={()=>{setActiveProject(p); go("project-detail");}}
            style={{...st.card, cursor:"pointer", transition:"all .2s"}}
            onMouseEnter={e=>{e.currentTarget.style.borderColor=t.acc; e.currentTarget.style.transform="translateY(-4px)";}}
            onMouseLeave={e=>{e.currentTarget.style.borderColor=t.border; e.currentTarget.style.transform="none";}}>
            <div style={{...st.row(14), marginBottom:12}}>
              <span style={{fontSize:38}}>{p.emoji}</span>
              <div>
                <div style={{fontWeight:800, fontSize:15}}>{p.title}</div>
                <div style={{...st.row(6), marginTop:6}}>
                  <span style={st.tag(p.difficulty==="Beginner"?t.acc2:p.difficulty==="Intermediate"?t.warn:t.danger)}>{p.difficulty}</span>
                  <span style={st.tag("#3b82f6")}>{p.lang}</span>
                  <span style={st.tag(t.acc)}>+{p.xp} XP</span>
                </div>
              </div>
            </div>
            <div style={{fontSize:12, color:t.muted}}>{p.description}</div>
            <div style={{fontSize:12, fontWeight:700, color:t.acc, marginTop:10}}>{p.steps.length}-step build plan →</div>
          </div>
        ))}
      </div>
    </div>
  );

  const ProjectDetail = () => {
    if (!activeProject) return null;
    return (
      <div>
        <button style={st.btnOut} onClick={()=>go("projects")}>← Back to Projects</button>
        <div style={{height:20}} />
        <div style={st.row(16)}>
          <span style={{fontSize:52}}>{activeProject.emoji}</span>
          <div>
            <div style={st.title}>{activeProject.title}</div>
            <div style={{...st.row(6), marginTop:8}}>
              <span style={st.tag(activeProject.difficulty==="Beginner"?t.acc2:activeProject.difficulty==="Intermediate"?t.warn:t.danger)}>{activeProject.difficulty}</span>
              <span style={st.tag("#3b82f6")}>{activeProject.lang}</span>
              <span style={st.tag(t.acc)}>+{activeProject.xp} XP</span>
            </div>
          </div>
        </div>
        <div style={st.card}><div style={{lineHeight:1.9, fontSize:14}}>{activeProject.description}</div></div>

        <div style={{fontWeight:700, fontSize:15, marginBottom:12}}>🗺️ Step-by-Step Build Plan</div>
        {activeProject.steps.map((step, i) => (
          <div key={i} style={{...st.card, ...st.row(14), borderLeft:`4px solid ${t.acc}`, padding:"14px 16px"}}>
            <div style={st.bdg(t.acc)}>{i+1}</div>
            <div style={{fontSize:13}}>{step}</div>
          </div>
        ))}

        <div style={st.card}>
          <div style={{fontWeight:700, marginBottom:12}}>🏗️ Architecture Notes</div>
          <div style={{display:"grid", gridTemplateColumns:"1fr 1fr", gap:12}}>
            {[
              {icon:"📁", label:"Folder Structure", note:"Organize by feature. /components, /utils, /data, /assets"},
              {icon:"🧠", label:"Logic Design", note:"Draw the user flow first. Sketch data structures before writing code."},
              {icon:"🐛", label:"Debugging Strategy", note:"console.log key variables. Use DevTools. Test edge cases."},
              {icon:"⚡", label:"Optimization", note:"Profile first, optimize later. Don't prematurely optimize."},
            ].map(item => (
              <div key={item.label} style={{background:dark?"#0a0f1f":"#f5f7ff", borderRadius:10, padding:14}}>
                <div style={{...st.row(8), marginBottom:6}}><span>{item.icon}</span><span style={{fontWeight:700, fontSize:12}}>{item.label}</span></div>
                <div style={{fontSize:12, color:t.muted}}>{item.note}</div>
              </div>
            ))}
          </div>
        </div>

        <button style={st.btn(t.acc2)} onClick={()=>gainXp(activeProject.xp, `proj-${activeProject.id}`)}>
          🚀 Mark Complete (+{activeProject.xp} XP)
        </button>
      </div>
    );
  };

  const Notes = () => (
    <div>
      <div style={st.title}>📝 My Notes</div>
      <div style={st.sub}>Save key concepts, review them, export to text file.</div>

      <div style={st.card}>
        <div style={{fontWeight:700, marginBottom:12}}>✏️ Add New Note</div>
        <input style={{...st.inp, width:"100%", marginBottom:10}} placeholder="Note title..." value={noteTitle} onChange={e=>setNoteTitle(e.target.value)} />
        <textarea style={{...st.inp, width:"100%", minHeight:80, resize:"vertical"}} placeholder="Note content..." value={noteContent} onChange={e=>setNoteContent(e.target.value)} />
        <div style={{...st.row(10), marginTop:12}}>
          <button style={st.btn(t.acc)} onClick={saveNote}>💾 Save Note</button>
          {notes.length > 0 && <button style={st.btnOut} onClick={exportNotes}>⬇️ Export All</button>}
        </div>
      </div>

      {notes.length === 0 ? (
        <div style={{...st.card, textAlign:"center", color:t.muted, padding:40}}>
          <div style={{fontSize:48}}>📭</div>
          <div style={{marginTop:12}}>No notes yet. Study concepts and save your summaries!</div>
        </div>
      ) : notes.map(note => (
        <div key={note.id} style={st.card}>
          <div style={st.row(12)}>
            <div style={{flex:1}}>
              <div style={{fontWeight:700}}>{note.title}</div>
              <div style={{fontSize:11, color:t.muted}}>{note.date}</div>
            </div>
            <button style={st.btn(t.danger)} onClick={()=>setNotes(ns=>ns.filter(n=>n.id!==note.id))}>🗑</button>
          </div>
          <div style={{marginTop:10, fontSize:13, lineHeight:1.8, whiteSpace:"pre-wrap", color:t.muted}}>{note.content}</div>
        </div>
      ))}
    </div>
  );

  const Setup = () => (
    <div>
      <div style={st.title}>💻 Installation & Setup Academy</div>
      <div style={st.sub}>Complete step-by-step setup guides for PC and Mobile coding environments.</div>
      <div style={st.tabRow}>
        {["PC","Mobile"].map(tab => <span key={tab} style={st.tab(setupTab===tab)} onClick={()=>setSetupTab(tab)}>{tab==="PC"?"🖥 PC / Desktop":"📱 Mobile Phone"}</span>)}
      </div>
      {SETUP_GUIDES[setupTab].map((guide, i) => (
        <div key={i} style={st.card}>
          <div style={{...st.row(12), marginBottom:14}}>
            <span style={{fontSize:32}}>{guide.emoji}</span>
            <div>
              <div style={{fontWeight:800, fontSize:15}}>{guide.tool}</div>
              <div style={{fontSize:12, color:t.muted}}>{guide.purpose}</div>
            </div>
          </div>
          {guide.steps.map((step, j) => (
            <div key={j} style={{...st.row(12), padding:"9px 0", borderBottom:j<guide.steps.length-1?`1px solid ${t.border}`:"none"}}>
              <div style={st.bdg(t.acc)}>{j+1}</div>
              <div style={{fontSize:13}}>{step}</div>
            </div>
          ))}
        </div>
      ))}
      {setupTab === "PC" && (
        <div style={st.card}>
          <div style={{fontWeight:800, marginBottom:10}}>🔧 Understanding PATH & Environment Variables</div>
          <div style={{fontSize:13, lineHeight:1.9, marginBottom:12}}>
            When you install Python or Node.js, the computer needs to know WHERE to find them when you type "python" in the terminal.
            The PATH variable is a list of folders the OS searches when you type any command. If the install folder isn't in PATH, the computer says "command not found" even though the program is installed.
          </div>
          <pre style={st.code}>{`# Windows - Check PATH\necho %PATH%\n\n# Windows PowerShell\n$env:PATH -split ';'\n\n# Add folder to PATH temporarily (PowerShell)\n$env:PATH += ";C:\\Python312"\n\n# Mac/Linux - Check PATH\necho $PATH\n\n# Add permanently (put this in ~/.bashrc or ~/.zshrc)\nexport PATH="$PATH:/usr/local/myapp"\n# Then run: source ~/.bashrc`}</pre>
        </div>
      )}
    </div>
  );

  const AI = () => (
    <div>
      <div style={st.title}>🤖 AI Proper Usage Module</div>
      <div style={st.sub}>"How to Use AI Without Becoming Dependent" — the most important lesson in the academy.</div>

      <div style={{...st.card, background:dark?"linear-gradient(135deg,#1a0533,#0a1440)":"linear-gradient(135deg,#fdf4ff,#eff6ff)", borderColor:t.acc}}>
        <div style={{fontWeight:800, fontSize:16, marginBottom:10}}>⚠️ The AI Dependency Trap</div>
        <div style={{lineHeight:1.9, fontSize:13}}>
          AI can write perfect code instantly — this is both a superpower AND a trap. If AI does all your thinking,
          you won't understand the code, can't debug it, and will fail in interviews and real jobs.
          <strong style={{color:t.acc}}> AI is a hammer. You need to be the architect.</strong>
        </div>
      </div>

      <div style={st.tabRow}>
        {["levels","prompts","challenge"].map(tab => (
          <span key={tab} style={st.tab(aiTab===tab)} onClick={()=>setAiTab(tab)}>
            {tab==="levels"?"📊 Skill Levels":tab==="prompts"?"✍️ Prompt Engineering":"🚫 No-AI Challenge"}
          </span>
        ))}
      </div>

      {aiTab === "levels" && (
        <div>
          {AI_MODULE.levels.map(lvl => (
            <div key={lvl.level} style={{...st.card, borderLeft:`4px solid ${lvl.danger==="HIGH"?t.danger:lvl.danger==="MEDIUM"?t.warn:lvl.danger==="LOW"?"#3b82f6":t.acc2}`}}>
              <div style={st.row(14)}>
                <div style={st.bdg(lvl.danger==="HIGH"?t.danger:lvl.danger==="MEDIUM"?t.warn:lvl.danger==="LOW"?"#3b82f6":t.acc2)}>{lvl.level}</div>
                <div style={{flex:1}}>
                  <div style={{fontWeight:700}}>{lvl.title}</div>
                  <div style={{fontSize:12, color:t.muted, marginTop:4}}>{lvl.description}</div>
                </div>
                <span style={st.tag(lvl.danger==="HIGH"?t.danger:lvl.danger==="MEDIUM"?t.warn:lvl.danger==="LOW"?"#3b82f6":t.acc2)}>{lvl.danger} RISK</span>
              </div>
            </div>
          ))}
          <div style={st.card}>
            <div style={{fontWeight:700, marginBottom:8}}>🎯 Goal: Reach Level 5 — AI Master</div>
            <div style={{fontSize:13, lineHeight:1.9}}>At Level 5, you write complex systems independently. You use AI to accelerate tasks you ALREADY understand, verify its output critically, improve it, and learn from its patterns. You are the senior engineer; AI is your junior that you review and direct.</div>
          </div>
        </div>
      )}

      {aiTab === "prompts" && (
        <div>
          <div style={{fontWeight:700, fontSize:14, marginBottom:10, color:t.acc2}}>✅ Effective Prompts</div>
          {AI_MODULE.goodPrompts.map((p,i) => (
            <div key={i} style={{...st.card, borderLeft:`4px solid ${t.acc2}`}}>
              <div style={{fontWeight:600, marginBottom:6, fontSize:13}}>"{p.prompt}"</div>
              <div style={{fontSize:12, color:t.acc2}}>✓ Why this works: {p.why}</div>
            </div>
          ))}
          <div style={{fontWeight:700, fontSize:14, margin:"20px 0 10px", color:t.danger}}>❌ Harmful Prompts — Avoid These</div>
          {AI_MODULE.badPrompts.map((p,i) => (
            <div key={i} style={{...st.card, borderLeft:`4px solid ${t.danger}`}}>
              <div style={{fontWeight:600, marginBottom:6, fontSize:13}}>"{p.prompt}"</div>
              <div style={{fontSize:12, color:t.danger}}>✗ Why this is harmful: {p.why}</div>
            </div>
          ))}
        </div>
      )}

      {aiTab === "challenge" && (
        <div>
          <div style={{...st.card, borderColor:t.warn, background:dark?"#1a1000":"#fffbeb"}}>
            <div style={{fontWeight:800, fontSize:18, marginBottom:12}}>🚫 30-Day No-AI Challenge</div>
            <div style={{fontSize:13, lineHeight:1.9, marginBottom:16}}>
              For 30 days, build everything WITHOUT AI code generators. You may use:<br/>
              ✅ Official docs (MDN, python.org, cppreference.com)<br/>
              ✅ Stack Overflow (for specific errors only)<br/>
              ✅ This academy's content and books<br/>
              ❌ ChatGPT, Claude, Copilot, GitHub AI, Cursor AI
            </div>
            {["Day 1–3: Build a calculator using only MDN documentation","Day 4–7: Create a responsive webpage from scratch","Day 8–14: Implement a data structure (linked list) in Python","Day 15–21: Build a REST API without any framework","Day 22–30: Complete an independent project of your choice"].map((day,i) => (
              <div key={i} style={{...st.row(12), padding:"9px 0", borderBottom:i<4?`1px solid ${t.border}`:"none"}}>
                <div style={st.bdg(t.warn)}>{i+1}</div>
                <div style={{fontSize:13}}>{day}</div>
              </div>
            ))}
            <button style={{...st.btn(t.warn), marginTop:16}} onClick={()=>gainXp(50,"no-ai")}>
              🚫 Accept the Challenge (+50 XP)
            </button>
          </div>
        </div>
      )}
    </div>
  );

  const Achievements = () => (
    <div>
      <div style={st.title}>🏆 Achievements</div>
      <div style={st.sub}>Earn badges by completing lessons, saving notes, building projects, and mastering concepts.</div>
      <div style={{...st.card, marginBottom:20}}>
        <div style={{...st.row()}}>
          <span style={{fontWeight:700}}>Badges Earned</span>
          <span style={{marginLeft:"auto", color:t.acc, fontWeight:800}}>{earnedAchs.size}/{ACHIEVEMENTS.length}</span>
        </div>
        <div style={{marginTop:10, ...st.pr}}><div style={st.prBar(Math.round(earnedAchs.size/ACHIEVEMENTS.length*100))} /></div>
      </div>
      <div style={st.grid(3)}>
        {ACHIEVEMENTS.map(ach => {
          const earned = earnedAchs.has(ach.id);
          return (
            <div key={ach.id} style={{...st.card, textAlign:"center", opacity:earned?1:0.45, borderTop:`3px solid ${earned?t.warn:t.border}`, transition:"all .3s"}}>
              <div style={{fontSize:44}}>{earned?ach.emoji:"🔒"}</div>
              <div style={{fontWeight:700, marginTop:8}}>{ach.title}</div>
              <div style={{fontSize:11, color:t.muted, marginTop:4}}>{ach.desc}</div>
              {earned && <div style={{...st.tag(t.warn), marginTop:8, display:"inline-block"}}>EARNED ✓</div>}
            </div>
          );
        })}
      </div>
    </div>
  );

  const renderPage = () => {
    switch(section) {
      case "dashboard": return <Dashboard />;
      case "curriculum": return <Curriculum />;
      case "lesson": return <Lesson />;
      case "concepts": return <Concepts />;
      case "concept-detail": return <ConceptDetail />;
      case "projects": return <Projects />;
      case "project-detail": return <ProjectDetail />;
      case "notes": return <Notes />;
      case "setup": return <Setup />;
      case "ai": return <AI />;
      case "achievements": return <Achievements />;
      default: return <Dashboard />;
    }
  };

  // ============================================================
  // RENDER
  // ============================================================
  return (
    <div style={st.wrap}>
      <style>{`
        @keyframes slideIn { from{opacity:0;transform:translateY(-12px)}to{opacity:1;transform:translateY(0)} }
        @keyframes fall { to{transform:translateY(105vh)rotate(720deg);opacity:0} }
        *{box-sizing:border-box}
        ::-webkit-scrollbar{width:5px}
        ::-webkit-scrollbar-thumb{background:#333;border-radius:4px}
        textarea{font-family:inherit}
      `}</style>

      {/* Toast */}
      {toast && (
        <div style={{position:"fixed",top:16,right:16,zIndex:9999,background:t.acc,color:"#fff",padding:"12px 22px",borderRadius:12,fontWeight:800,fontSize:14,boxShadow:"0 8px 30px rgba(0,0,0,.4)",animation:"slideIn .3s"}}>
          {toast}
        </div>
      )}

      {/* Confetti */}
      {confetti && (
        <div style={{position:"fixed",inset:0,zIndex:9998,pointerEvents:"none"}}>
          {Array.from({length:50}).map((_,i)=>(
            <div key={i} style={{position:"absolute",width:8,height:8,borderRadius:i%3===0?"50%":"2px",left:Math.random()*100+"%",top:-20,background:["#818cf8","#34d399","#fbbf24","#f87171","#c084fc","#06b6d4"][i%6],animation:`fall ${1.2+Math.random()*2}s linear ${Math.random()*1.2}s forwards`}}/>
          ))}
        </div>
      )}

      {/* Navbar */}
      <nav style={st.nav}>
        <button onClick={()=>setSidebarOpen(o=>!o)} style={{background:"none",border:"none",color:t.muted,cursor:"pointer",fontSize:20,padding:"4px 8px"}}>☰</button>
        <span style={{fontSize:24}}>🎓</span>
        <span style={{fontWeight:900, fontSize:15, background:`linear-gradient(135deg,${t.acc},#06b6d4)`,WebkitBackgroundClip:"text",WebkitTextFillColor:"transparent"}}>SE Academy</span>
        <div style={{flex:1}} />
        <div style={st.row(14)}>
          <div style={st.row(8)}>
            <span style={{fontSize:16}}>⚡</span>
            <span style={{fontWeight:900, color:t.acc}}>{xp} XP</span>
            <span style={{color:t.muted, fontSize:12}}>Lv.{level}</span>
          </div>
          <button onClick={()=>setDark(d=>!d)} style={{background:"none",border:`1px solid ${t.border}`,borderRadius:8,padding:"5px 12px",cursor:"pointer",color:t.text,fontSize:13}}>
            {dark?"☀️":"🌙"}
          </button>
        </div>
      </nav>

      {/* Layout */}
      <div style={st.layout}>
        {/* Sidebar */}
        <aside style={st.side}>
          <div style={{padding:"12px 0 8px", borderBottom:`1px solid ${t.border}`, marginBottom:4}}>
            {sidebarOpen && <div style={{padding:"0 18px", fontSize:10, color:t.muted, fontWeight:700, textTransform:"uppercase", letterSpacing:1}}>Menu</div>}
          </div>
          {NAV.map(item => (
            <div key={item.id} style={st.navItem(section===item.id||(item.id==="curriculum"&&section==="lesson")||(item.id==="concepts"&&section==="concept-detail")||(item.id==="projects"&&section==="project-detail"))}
              onClick={()=>go(item.id)} title={item.label}>
              <span style={{fontSize:17, flexShrink:0}}>{item.icon}</span>
              {sidebarOpen && <span>{item.label}</span>}
            </div>
          ))}
          {sidebarOpen && (
            <div style={{margin:"16px 10px 0", padding:12, background:dark?"#080b14":"#f1f3ff", borderRadius:10, border:`1px solid ${t.border}`}}>
              <div style={{fontSize:10, color:t.muted, marginBottom:6, fontWeight:700}}>XP PROGRESS</div>
              <div style={st.pr}><div style={st.prBar(levelPct)} /></div>
              <div style={{fontSize:10, color:t.muted, marginTop:5}}>{100-levelPct} to Level {level+1}</div>
              <div style={{fontSize:10, color:t.muted, marginTop:8, lineHeight:2}}>
                <div>✅ {completed.length} lessons</div>
                <div>📝 {notes.length} notes</div>
                <div>🧠 {conceptsViewed.length} concepts</div>
                <div>🔖 {bookmarks.length} bookmarks</div>
              </div>
            </div>
          )}
        </aside>

        {/* Main */}
        <main style={st.main}>
          {renderPage()}
        </main>
      </div>
    </div>
  );
}
