/**
 * 🎓 Educational Centre Mays — Gamified Teacher Training Portal
 * Duolingo-style: XP, hearts, streaks, drag-drop, instant feedback
 * No videos — visual explainers, interactive exercises, fast quizzes
 * ~72 min per course | EmailJS certificate at 100%
 */

import { useState, useEffect, useRef, useCallback } from "react";

// ─────────────────────────────────── COURSE DATA ───────────────────────────────────
const COURSES = [
  {
    id: "word", title: "Microsoft Word", emoji: "📝", color: "#2b579a", light: "#e8f0fb",
    tagline: "Create professional documents with confidence",
    lessons: [
      {
        id: "w1", title: "What is Microsoft Word?", xp: 20, duration: "5 min",
        learn: {
          icon: "📝", heading: "Microsoft Word — Your Digital Page",
          definition: "Microsoft Word is a word processing application that lets you create, edit, format, and print text documents.",
          analogy: "Think of it like a super-powered typewriter that never runs out of ink — and lets you fix mistakes instantly!",
          facts: [
            { icon: "📄", text: "Used to create letters, reports, CVs, and school documents" },
            { icon: "🎨", text: "You can add colours, images, tables, and shapes" },
            { icon: "☁️", text: "Documents are saved as .docx files (or PDF)" },
            { icon: "🔤", text: "The cursor (blinking line) shows where you type" },
          ],
          visual: [
            { label: "Ribbon", desc: "The toolbar at the top with all your tools", color: "#2b579a" },
            { label: "Document Area", desc: "The white page where you type", color: "#f0f4ff" },
            { label: "Status Bar", desc: "Bottom bar showing page number & word count", color: "#6c757d" },
          ]
        },
        type: "drag",
        question: "Drag each tool to where it belongs in Word",
        items: ["Bold text", "Insert image", "Change font", "Set margins", "Add page number"],
        zones: [
          { id: "home", label: "🏠 Home Tab", accepts: ["Bold text", "Change font"] },
          { id: "insert", label: "➕ Insert Tab", accepts: ["Insert image", "Add page number"] },
          { id: "layout", label: "📐 Layout Tab", accepts: ["Set margins"] },
        ]
      },
      {
        id: "w2", title: "Formatting Text Like a Pro", xp: 25, duration: "7 min",
        learn: {
          icon: "✨", heading: "Make Your Text Stand Out",
          definition: "Formatting changes how text looks — its size, style, colour, and emphasis — to make documents clear and professional.",
          analogy: "Formatting is like choosing an outfit for your words. Bold is a power suit; italic is casual; underline is emphasis!",
          facts: [
            { icon: "B", text: "Bold (Ctrl+B) — makes text heavier and more visible" },
            { icon: "I", text: "Italic (Ctrl+I) — slants text for titles or emphasis" },
            { icon: "U", text: "Underline (Ctrl+U) — adds a line below text" },
            { icon: "🎨", text: "Font colour — changes the text colour" },
            { icon: "A", text: "Font size — controls how big or small text appears" },
          ],
          visual: [
            { label: "Ctrl + B", desc: "Bold", color: "#2b579a" },
            { label: "Ctrl + I", desc: "Italic", color: "#5c7cdb" },
            { label: "Ctrl + U", desc: "Underline", color: "#7b9ee8" },
            { label: "Ctrl + Z", desc: "Undo (your best friend!)", color: "#e74c3c" },
          ]
        },
        type: "mcq",
        questions: [
          { q: "What does Ctrl+B do in Microsoft Word?", options: ["Makes text bigger", "Makes text Bold", "Opens a new document", "Saves the file"], answer: 1, explain: "Ctrl+B toggles Bold on/off — it's the most common formatting shortcut!" },
          { q: "Which formatting makes text lean to the right like this: *Hello*?", options: ["Bold", "Underline", "Italic", "Strike-through"], answer: 2, explain: "Italic slants text — used for book titles, foreign words, or gentle emphasis." },
          { q: "To change the SIZE of text in Word, you use:", options: ["The font colour box", "The font size box (number in toolbar)", "The margins setting", "The paragraph spacing"], answer: 1, explain: "The font size box (shows a number like 12 or 14) is in the Home tab toolbar." },
        ]
      },
      {
        id: "w3", title: "Saving & File Formats", xp: 20, duration: "5 min",
        learn: {
          icon: "💾", heading: "Never Lose Your Work",
          definition: "Saving stores your document permanently on your computer or cloud. Word saves as .docx by default.",
          analogy: "Saving is like putting your work in a safe box. Without saving, your document disappears when the power goes off!",
          facts: [
            { icon: "💾", text: "Ctrl+S — Save your document instantly" },
            { icon: "📁", text: "Ctrl+Shift+S — Save As (save with a new name or location)" },
            { icon: "📄", text: ".docx — the standard Word format" },
            { icon: "🔒", text: ".pdf — locked format, can't be easily edited" },
            { icon: "☁️", text: "OneDrive — saves automatically to the cloud" },
          ],
          visual: [
            { label: ".docx", desc: "Editable Word document", color: "#2b579a" },
            { label: ".pdf", desc: "Final, locked document for sharing", color: "#e74c3c" },
            { label: ".dotx", desc: "Word Template (reusable layout)", color: "#27ae60" },
          ]
        },
        type: "fillin",
        questions: [
          { q: "The keyboard shortcut to SAVE a document is Ctrl + ___", answer: "S", hint: "One letter — think of 'Save'" },
          { q: "A Word document is saved with the extension .___x", answer: "doc", hint: "It stands for 'document'" },
          { q: "To save a copy with a NEW name, use Ctrl + Shift + ___", answer: "S", hint: "Same letter as regular Save" },
        ]
      },
      {
        id: "w4", title: "Tables & Lists", xp: 25, duration: "8 min",
        learn: {
          icon: "📊", heading: "Organise Information Clearly",
          definition: "Tables organise data into rows and columns. Lists use bullets (•) or numbers to group related items.",
          analogy: "A table is like a spreadsheet living inside your document. A list is like your shopping list — clean and easy to read!",
          facts: [
            { icon: "📊", text: "Insert → Table → choose rows and columns" },
            { icon: "•", text: "Bullet list — for unordered items (no sequence)" },
            { icon: "1.", text: "Numbered list — for steps in order" },
            { icon: "📐", text: "You can resize table columns by dragging the borders" },
            { icon: "🎨", text: "Table Styles give instant professional formatting" },
          ],
          visual: [
            { label: "Bullet List", desc: "• Item one\n• Item two\n• Item three", color: "#2b579a" },
            { label: "Numbered List", desc: "1. First step\n2. Second step\n3. Third step", color: "#27ae60" },
            { label: "Table", desc: "Rows × Columns of organised data", color: "#e67e22" },
          ]
        },
        type: "mcq",
        questions: [
          { q: "Where do you insert a Table in Microsoft Word?", options: ["Home tab", "Insert tab → Table", "Layout tab", "Review tab"], answer: 1, explain: "Insert tab contains all items you add INTO a document: tables, images, headers, etc." },
          { q: "Which list type is best for step-by-step instructions?", options: ["Bullet list", "Numbered list", "Table", "Text box"], answer: 1, explain: "Numbered lists show order/sequence — perfect for instructions and processes." },
          { q: "To add a new row at the bottom of a Word table, press ___ in the last cell.", options: ["Enter", "Tab", "Spacebar", "Shift+Enter"], answer: 1, explain: "Pressing Tab in the last cell of a table automatically adds a new row below!" },
        ]
      },
      {
        id: "w5", title: "Headers, Footers & Page Numbers", xp: 20, duration: "5 min",
        learn: {
          icon: "📑", heading: "Professional Document Structure",
          definition: "Headers appear at the top of every page; footers at the bottom. They typically contain page numbers, dates, or school names.",
          analogy: "Headers and footers are like the frame of a painting — they complete the document and make it look finished and professional.",
          facts: [
            { icon: "⬆️", text: "Header — repeats at the TOP of every page" },
            { icon: "⬇️", text: "Footer — repeats at the BOTTOM of every page" },
            { icon: "#", text: "Insert → Page Number adds automatic numbering" },
            { icon: "🏫", text: "Great for: school name, document title, date" },
            { icon: "✏️", text: "Double-click header/footer area to edit it" },
          ],
          visual: [
            { label: "Header Zone", desc: "Top margin — school name, title, logo", color: "#2b579a" },
            { label: "Body", desc: "Your main document content", color: "#f0f4ff" },
            { label: "Footer Zone", desc: "Bottom margin — page number, date, contact", color: "#2b579a" },
          ]
        },
        type: "drag",
        question: "Drag each element to the correct document zone",
        items: ["Page number", "School logo", "Author name", "Main paragraph", "Document title", "Date"],
        zones: [
          { id: "header", label: "⬆️ Header", accepts: ["School logo", "Document title", "Date"] },
          { id: "body", label: "📄 Body", accepts: ["Main paragraph"] },
          { id: "footer", label: "⬇️ Footer", accepts: ["Page number", "Author name"] },
        ]
      },
      {
        id: "w6", title: "Mail Merge Magic", xp: 30, duration: "8 min",
        learn: {
          icon: "📬", heading: "Personalise Letters Automatically",
          definition: "Mail Merge combines a Word letter template with an Excel/CSV data list to create personalised letters for many people at once.",
          analogy: "Imagine writing 100 parent letters — instead of typing each name, Mail Merge fills them all in automatically. Like a robot assistant!",
          facts: [
            { icon: "📋", text: "You need TWO things: a Word template + a data list (Excel)" },
            { icon: "«»", text: "Merge fields like «FirstName» get replaced with real data" },
            { icon: "📬", text: "Mailings tab → Start Mail Merge → Letters" },
            { icon: "👁️", text: "Preview Results shows you what each letter will look like" },
            { icon: "✅", text: "Finish & Merge → Print or Email all at once" },
          ],
          visual: [
            { label: "Step 1", desc: "Create template in Word with «Fields»", color: "#2b579a" },
            { label: "Step 2", desc: "Link to Excel data file (names, emails…)", color: "#217346" },
            { label: "Step 3", desc: "Preview → Finish & Merge", color: "#27ae60" },
          ]
        },
        type: "mcq",
        questions: [
          { q: "Mail Merge is found under which Word tab?", options: ["Home", "Insert", "Mailings", "Review"], answer: 2, explain: "The Mailings tab contains everything for Mail Merge, labels, and envelopes." },
          { q: "What do the symbols « » indicate in a Mail Merge template?", options: ["A comment", "A merge field that gets replaced with real data", "A hyperlink", "Bold formatting"], answer: 1, explain: "«FieldName» is a placeholder — Word replaces it with actual data from your list." },
          { q: "Mail Merge requires which TWO files?", options: ["Two Word documents", "A Word template + an Excel/CSV data file", "A PDF + an image", "Two Excel files"], answer: 1, explain: "The Word file is your letter template; Excel holds the personalised data (names, etc.)." },
        ]
      },
    ]
  },
  {
    id: "excel", title: "Microsoft Excel", emoji: "📊", color: "#217346", light: "#e8f5ee",
    tagline: "Turn raw data into powerful insights",
    lessons: [
      {
        id: "e1", title: "Excel — The Grid That Does Maths", xp: 20, duration: "5 min",
        learn: {
          icon: "📊", heading: "What is Microsoft Excel?",
          definition: "Excel is a spreadsheet application that organises data in rows and columns, performs calculations automatically, and creates charts.",
          analogy: "Excel is like a calculator and a filing cabinet combined — it stores thousands of numbers AND crunches them instantly!",
          facts: [
            { icon: "📐", text: "Data lives in CELLS — tiny boxes arranged in a grid" },
            { icon: "🔠", text: "Columns go A, B, C… (left to right)" },
            { icon: "🔢", text: "Rows go 1, 2, 3… (top to bottom)" },
            { icon: "📍", text: "Cell reference: B3 = Column B, Row 3" },
            { icon: "⚡", text: "Formulas start with = and calculate automatically" },
          ],
          visual: [
            { label: "Cell A1", desc: "Column A, Row 1 — top-left corner", color: "#217346" },
            { label: "Cell B3", desc: "Column B, Row 3", color: "#27ae60" },
            { label: "Formula Bar", desc: "Shows the content/formula of selected cell", color: "#1a5c38" },
          ]
        },
        type: "drag",
        question: "Drag each item to Row or Column",
        items: ["A", "B", "C", "1", "2", "3"],
        zones: [
          { id: "col", label: "🔤 Column (letter)", accepts: ["A", "B", "C"] },
          { id: "row", label: "🔢 Row (number)", accepts: ["1", "2", "3"] },
        ]
      },
      {
        id: "e2", title: "Formulas — Make Excel Work for You", xp: 30, duration: "8 min",
        learn: {
          icon: "⚡", heading: "Formulas: Your Automatic Calculator",
          definition: "A formula is an instruction that tells Excel to calculate something. All formulas begin with an = sign.",
          analogy: "Writing =SUM(A1:A10) is like telling a helper: 'Add up everything from A1 to A10 and give me the total.' No calculator needed!",
          facts: [
            { icon: "∑", text: "=SUM(A1:A10) — adds all values from A1 to A10" },
            { icon: "📊", text: "=AVERAGE(A1:A10) — calculates the mean" },
            { icon: "⬆️", text: "=MAX(A1:A10) — finds the highest value" },
            { icon: "⬇️", text: "=MIN(A1:A10) — finds the lowest value" },
            { icon: "🔢", text: "=COUNT(A1:A10) — counts how many numbers are there" },
          ],
          visual: [
            { label: "=SUM", desc: "Adds up a range of numbers", color: "#217346" },
            { label: "=AVERAGE", desc: "Calculates the mean (total ÷ count)", color: "#27ae60" },
            { label: "=IF", desc: "Makes a decision: =IF(A1>50,\"Pass\",\"Fail\")", color: "#e67e22" },
          ]
        },
        type: "fillin",
        questions: [
          { q: "All Excel formulas must start with the symbol ___", answer: "=", hint: "It's the equals sign" },
          { q: "To add cells A1 to A5, type: =___(A1:A5)", answer: "SUM", hint: "Think 'addition / total'" },
          { q: "=AVERAGE(B1:B10) calculates the ___ of those values", answer: "average", hint: "Mean / middle value" },
        ]
      },
      {
        id: "e3", title: "IF Function — Smart Decisions", xp: 30, duration: "7 min",
        learn: {
          icon: "🤔", heading: "IF: Excel Makes Decisions",
          definition: "The IF function tests a condition and returns one value if TRUE, another if FALSE.",
          analogy: "=IF(Score>=50, \"Pass\", \"Fail\") is like Excel asking: 'Is the score 50 or more? Yes → Pass. No → Fail.' It's logic!",
          facts: [
            { icon: "✅", text: "=IF(condition, value_if_true, value_if_false)" },
            { icon: "📊", text: "Example: =IF(A1>=80,\"A\",IF(A1>=70,\"B\",\"C\")) — nested IF for grades" },
            { icon: "📐", text: "Condition uses: > (greater), < (less), >= , <=, = (equal)" },
            { icon: "💡", text: "Text values in IF must be in \"quote marks\"" },
            { icon: "⚡", text: "You can nest multiple IF functions for complex rules" },
          ],
          visual: [
            { label: "Condition", desc: "A1>=50 — 'Is A1 greater than or equal to 50?'", color: "#217346" },
            { label: "TRUE result", desc: "What Excel shows if the condition is met", color: "#27ae60" },
            { label: "FALSE result", desc: "What Excel shows if the condition is NOT met", color: "#e74c3c" },
          ]
        },
        type: "mcq",
        questions: [
          { q: "What does =IF(A1>100, \"High\", \"Low\") return if A1 = 75?", options: ["High", "Low", "Error", "75"], answer: 1, explain: "75 is NOT greater than 100, so the FALSE result 'Low' is returned." },
          { q: "In the IF function =IF(B2=\"Pass\",1,0), the condition is:", options: ["1", "0", "B2=\"Pass\"", "Pass"], answer: 2, explain: "The condition B2=\"Pass\" checks if cell B2 contains the text 'Pass'." },
          { q: "Which symbol means 'greater than or equal to' in Excel?", options: [">", ">=", "=>", "≥"], answer: 1, explain: ">= is the correct Excel operator for 'greater than or equal to'." },
        ]
      },
      {
        id: "e4", title: "Charts — Visualise Your Data", xp: 25, duration: "6 min",
        learn: {
          icon: "📈", heading: "Turn Numbers Into Visual Stories",
          definition: "Charts convert table data into visual graphs, making patterns and comparisons instantly understandable.",
          analogy: "A table of 50 student scores is hard to read. A bar chart shows at a glance who is doing well and who needs help — in seconds!",
          facts: [
            { icon: "📊", text: "Bar/Column Chart — compare categories side by side" },
            { icon: "🥧", text: "Pie Chart — shows each part as a percentage of the whole" },
            { icon: "📈", text: "Line Chart — shows trends over time" },
            { icon: "💡", text: "Select your data FIRST, then Insert → Chart" },
            { icon: "🎨", text: "Chart Styles and colours can be changed instantly" },
          ],
          visual: [
            { label: "Bar Chart", desc: "Best for: comparing values across categories", color: "#217346" },
            { label: "Pie Chart", desc: "Best for: showing proportions (e.g. grade breakdown)", color: "#e67e22" },
            { label: "Line Chart", desc: "Best for: trends over time (e.g. monthly scores)", color: "#3498db" },
          ]
        },
        type: "drag",
        question: "Match the chart type to its best use case",
        items: ["Compare class scores", "Show % of grade A/B/C", "Track improvement over weeks"],
        zones: [
          { id: "bar", label: "📊 Bar/Column Chart", accepts: ["Compare class scores"] },
          { id: "pie", label: "🥧 Pie Chart", accepts: ["Show % of grade A/B/C"] },
          { id: "line", label: "📈 Line Chart", accepts: ["Track improvement over weeks"] },
        ]
      },
      {
        id: "e5", title: "Conditional Formatting", xp: 25, duration: "6 min",
        learn: {
          icon: "🎨", heading: "Colours That Reveal the Story",
          definition: "Conditional Formatting automatically colours cells based on their values — no manual colouring needed.",
          analogy: "Imagine a class register where scores below 50 glow red and scores above 80 glow green — automatically. That's Conditional Formatting!",
          facts: [
            { icon: "🔴", text: "Red = danger zone (e.g. score < 50)" },
            { icon: "🟡", text: "Yellow = warning zone (e.g. score 50–69)" },
            { icon: "🟢", text: "Green = excellent (e.g. score ≥ 70)" },
            { icon: "📍", text: "Home tab → Conditional Formatting → Highlight Rules" },
            { icon: "🎨", text: "Data Bars show a mini bar chart inside each cell!" },
          ],
          visual: [
            { label: "Home Tab", desc: "→ Conditional Formatting → New Rule", color: "#217346" },
            { label: "Colour Scales", desc: "Gradient from red (low) to green (high)", color: "#27ae60" },
            { label: "Data Bars", desc: "Visual bar inside each cell showing relative size", color: "#e67e22" },
          ]
        },
        type: "mcq",
        questions: [
          { q: "Conditional Formatting is found under which Excel tab?", options: ["Insert", "Data", "Home", "View"], answer: 2, explain: "Conditional Formatting lives in the Home tab — it's a formatting feature." },
          { q: "What does Conditional Formatting do automatically?", options: ["Sorts data alphabetically", "Colours cells based on their values/rules", "Calculates averages", "Creates charts"], answer: 1, explain: "It applies colours, icons, or data bars automatically based on conditions you set." },
          { q: "Which Conditional Formatting option creates a mini bar INSIDE each cell?", options: ["Colour Scales", "Icon Sets", "Data Bars", "Highlight Rules"], answer: 2, explain: "Data Bars show a proportional bar inside each cell — great for quick comparisons!" },
        ]
      },
      {
        id: "e6", title: "Pivot Tables — Instant Summaries", xp: 35, duration: "9 min",
        learn: {
          icon: "🔄", heading: "Pivot Tables: Data Magic",
          definition: "A Pivot Table summarises large datasets instantly — calculating totals, averages, and counts by category, without any formulas.",
          analogy: "Imagine 500 rows of student data. A Pivot Table can instantly show the average score per teacher, per grade, per subject — in one click!",
          facts: [
            { icon: "⚡", text: "Insert → PivotTable → select your data range" },
            { icon: "🗂️", text: "Drag fields to: Rows, Columns, Values, Filters" },
            { icon: "∑", text: "Values area calculates: SUM, AVERAGE, COUNT, etc." },
            { icon: "🔄", text: "Right-click → Refresh to update after data changes" },
            { icon: "🎯", text: "Add a Slicer (Insert → Slicer) to filter with buttons" },
          ],
          visual: [
            { label: "Rows area", desc: "Categories (e.g. Subject, Grade)", color: "#217346" },
            { label: "Values area", desc: "Numbers to summarise (e.g. Average Score)", color: "#27ae60" },
            { label: "Slicer", desc: "Visual filter buttons to explore data", color: "#e67e22" },
          ]
        },
        type: "fillin",
        questions: [
          { q: "A Pivot Table is inserted via the ___ tab", answer: "Insert", hint: "Second tab in the Excel ribbon" },
          { q: "To update a Pivot Table after the data changes, you ___ it", answer: "Refresh", hint: "Think 'reload' or 'update'" },
          { q: "A visual filter button added to a Pivot Table is called a ___", answer: "Slicer", hint: "It 'slices' the data to show only what you want" },
        ]
      },
    ]
  },
  {
    id: "powerpoint", title: "PowerPoint", emoji: "📽️", color: "#c43e1c", light: "#fdf0ed",
    tagline: "Design slides that captivate any audience",
    lessons: [
      {
        id: "p1", title: "The Art of Great Slides", xp: 20, duration: "5 min",
        learn: {
          icon: "🎨", heading: "Design Principles Every Teacher Needs",
          definition: "A great PowerPoint slide communicates one clear idea visually — with minimal text, strong visuals, and consistent design.",
          analogy: "A bad slide is like shouting everything at once. A great slide whispers one clear message — and the audience listens!",
          facts: [
            { icon: "1️⃣", text: "One idea per slide — never cram everything in" },
            { icon: "📝", text: "Max 6 words per bullet point — your voice explains the rest" },
            { icon: "🎨", text: "Use 2–3 colours maximum for a professional look" },
            { icon: "📏", text: "Font size: 28pt minimum so back-row students can read" },
            { icon: "🖼️", text: "Images say more than paragraphs — use them!" },
          ],
          visual: [
            { label: "❌ Bad Slide", desc: "Walls of text, 5 fonts, 8 colours, no images", color: "#e74c3c" },
            { label: "✅ Good Slide", desc: "One headline, one image, 3 bullet points max", color: "#27ae60" },
            { label: "💡 Pro Tip", desc: "If you can read the whole slide aloud in 10 seconds, it's too much", color: "#3498db" },
          ]
        },
        type: "mcq",
        questions: [
          { q: "What is the recommended MINIMUM font size for audience readability?", options: ["12pt", "18pt", "28pt", "36pt"], answer: 2, explain: "28pt ensures even back-row audience members can read your slides clearly." },
          { q: "Which is the BEST slide design principle?", options: ["Pack as much information as possible", "Use many bright colours to attract attention", "One clear idea per slide with minimal text", "Use ALL CAPS for every heading"], answer: 2, explain: "One idea per slide keeps the audience focused and engaged with your words." },
          { q: "How many colours maximum is recommended for a professional slide?", options: ["1", "2–3", "6–8", "As many as you like"], answer: 1, explain: "2–3 colours create visual harmony — more than that looks chaotic and amateur." },
        ]
      },
      {
        id: "p2", title: "Slide Layouts & Themes", xp: 20, duration: "5 min",
        learn: {
          icon: "📐", heading: "Structure Your Presentation Professionally",
          definition: "Slide Layouts are pre-set arrangements for content (title, content, two-column, etc.). Themes apply consistent colours and fonts.",
          analogy: "Choosing a Theme is like picking a school uniform — it makes everything match instantly without any effort!",
          facts: [
            { icon: "📐", text: "Home → Layout — choose from 9 professional slide layouts" },
            { icon: "🎨", text: "Design tab → Themes — apply a complete visual style" },
            { icon: "🎭", text: "Variants — change the colour version of a theme" },
            { icon: "📋", text: "Slide Master (View tab) — edit all slides at once" },
            { icon: "🖼️", text: "Title Slide layout for first slide; Title & Content for the rest" },
          ],
          visual: [
            { label: "Title Slide", desc: "Big title + subtitle — for your first slide", color: "#c43e1c" },
            { label: "Title & Content", desc: "Heading + bullets/image — most common layout", color: "#e05a38" },
            { label: "Blank", desc: "No placeholders — full creative control", color: "#6c757d" },
          ]
        },
        type: "drag",
        question: "Drag each element to the correct PowerPoint tab",
        items: ["Apply a Theme", "Change Layout", "Add Animation", "Slide Transition", "Insert a Chart"],
        zones: [
          { id: "design", label: "🎨 Design Tab", accepts: ["Apply a Theme"] },
          { id: "home", label: "🏠 Home Tab", accepts: ["Change Layout"] },
          { id: "animations", label: "✨ Animations Tab", accepts: ["Add Animation"] },
          { id: "transitions", label: "🔀 Transitions Tab", accepts: ["Slide Transition"] },
          { id: "insert", label: "➕ Insert Tab", accepts: ["Insert a Chart"] },
        ]
      },
      {
        id: "p3", title: "Animations & Transitions (Done Right)", xp: 25, duration: "6 min",
        learn: {
          icon: "✨", heading: "Motion That Helps, Not Distracts",
          definition: "Animations make objects appear/move on a slide. Transitions are the effect between slides. Both should be subtle and purposeful.",
          analogy: "A sprinkle of animation is like a good spice — it adds flavour. Too much and it ruins everything. 'Fly In Spinning Zoom' is a presentation crime!",
          facts: [
            { icon: "✅", text: "Best entrance: Appear or Fade — clean and professional" },
            { icon: "✅", text: "Best transition: Fade or None — smooth and distraction-free" },
            { icon: "❌", text: "Avoid: Bounce, Spiral, Pinwheel — they look unprofessional" },
            { icon: "⏱️", text: "Keep animations fast: 0.5s duration maximum" },
            { icon: "📝", text: "Animate bullets one by one to control your story flow" },
          ],
          visual: [
            { label: "Entrance", desc: "Fade — text appears smoothly (professional ✓)", color: "#c43e1c" },
            { label: "Transition", desc: "Fade between slides — calm and focused (✓)", color: "#e05a38" },
            { label: "Avoid", desc: "Bounce/Fly In/Spin — distracting for learners (✗)", color: "#e74c3c" },
          ]
        },
        type: "mcq",
        questions: [
          { q: "Which animation is most professional for a teacher's presentation?", options: ["Bounce", "Pinwheel", "Fade", "Spiral"], answer: 2, explain: "Fade is subtle, professional, and doesn't distract the audience from your content." },
          { q: "Transitions are the effect that happens:", options: ["When text appears on a slide", "Between one slide and the next", "When you click an object", "When you open the file"], answer: 1, explain: "Transitions control how PowerPoint moves from one slide to the next." },
          { q: "How long should a typical entrance animation last?", options: ["3–5 seconds (dramatic effect)", "0.5–1 second (quick and clean)", "10+ seconds (slow reveal)", "No time limit"], answer: 1, explain: "Animations should be quick (0.5s) — long animations make audiences impatient!" },
        ]
      },
      {
        id: "p4", title: "SmartArt & Visual Explanations", xp: 25, duration: "6 min",
        learn: {
          icon: "🧩", heading: "Show Relationships Without Drawing",
          definition: "SmartArt converts text into professional diagrams — hierarchies, processes, cycles, and lists — in one click.",
          analogy: "Instead of drawing boxes and arrows for an hour, SmartArt does it in 30 seconds. Type your text, pick a diagram — done!",
          facts: [
            { icon: "🏗️", text: "Hierarchy — show org charts, reporting structures" },
            { icon: "🔄", text: "Cycle — show repeated processes (e.g. lesson cycle)" },
            { icon: "➡️", text: "Process — show steps in sequence (e.g. assignment workflow)" },
            { icon: "📋", text: "List — show grouped items more visually than bullets" },
            { icon: "💡", text: "Insert → SmartArt → pick your diagram type" },
          ],
          visual: [
            { label: "Insert tab", desc: "→ SmartArt → choose layout", color: "#c43e1c" },
            { label: "Text Pane", desc: "Type your items — SmartArt updates live", color: "#e05a38" },
            { label: "Design tab", desc: "Change colours and styles of your SmartArt", color: "#e67e22" },
          ]
        },
        type: "fillin",
        questions: [
          { q: "SmartArt is found under the ___ tab in PowerPoint", answer: "Insert", hint: "Where you add things to slides" },
          { q: "To show a school management structure, use a ___ SmartArt", answer: "Hierarchy", hint: "Top-down, like a family tree" },
          { q: "SmartArt converts typed ___ into professional diagrams automatically", answer: "text", hint: "You type words; SmartArt draws shapes" },
        ]
      },
      {
        id: "p5", title: "Presenter Tools & Delivery", xp: 25, duration: "7 min",
        learn: {
          icon: "🎤", heading: "Present with Confidence",
          definition: "Presenter View shows your notes and the next slide on YOUR screen while the audience only sees the current slide.",
          analogy: "It's like having a secret cheat sheet no one else can see — your notes, your timer, the next slide — all at your fingertips!",
          facts: [
            { icon: "👁️", text: "Slide Show → Use Presenter View — toggle this ON" },
            { icon: "📝", text: "Add Speaker Notes at the bottom of each slide" },
            { icon: "⏱️", text: "Built-in timer shows how long you've been presenting" },
            { icon: "🖊️", text: "Laser pointer / pen tool — annotate slides live" },
            { icon: "📄", text: "File → Export → PDF — share your presentation as a handout" },
          ],
          visual: [
            { label: "Your Screen", desc: "Current slide + notes + timer + next slide", color: "#c43e1c" },
            { label: "Audience Screen", desc: "Only sees the current slide — clean view", color: "#27ae60" },
            { label: "Pen Tool", desc: "Draw/highlight on the slide during presentation", color: "#e67e22" },
          ]
        },
        type: "mcq",
        questions: [
          { q: "Presenter View shows which additional elements to the PRESENTER only?", options: ["Nothing extra", "Speaker notes, timer, and next slide preview", "The audience's reactions", "All slides at once"], answer: 1, explain: "Presenter View gives you notes, timer, and next-slide preview — your private dashboard!" },
          { q: "Speaker notes in PowerPoint appear:", options: ["On the audience's screen", "On every printed slide", "Below each slide in Presenter View only", "In a separate email"], answer: 2, explain: "Notes are in Presenter View — they're invisible to the audience." },
          { q: "To share a 'read-only' version of your presentation, export as:", options: [".pptx", ".docx", ".pdf", ".xlsx"], answer: 2, explain: "PDF is the best format to share — it looks identical on any device and can't be accidentally edited." },
        ]
      },
      {
        id: "p6", title: "Interactive Presentations & Quizzes", xp: 30, duration: "8 min",
        learn: {
          icon: "🎮", heading: "Make Your Lessons Interactive",
          definition: "Hyperlinks in PowerPoint let you jump between slides, turning a presentation into an interactive quiz or branching story.",
          analogy: "A PowerPoint quiz works like a game show — click the right answer and jump to a 'Correct!' slide; click wrong and jump to 'Try Again!'",
          facts: [
            { icon: "🔗", text: "Select text/shape → Insert → Hyperlink → Place in document" },
            { icon: "🟢", text: "Correct answer links to a 'Well done!' slide" },
            { icon: "🔴", text: "Wrong answers link to a 'Try again!' slide with a Back button" },
            { icon: "🔲", text: "Action Buttons (Insert → Shapes → bottom row) add navigation" },
            { icon: "🎯", text: "Set Slide Show to 'Kiosk mode' for self-running student quizzes" },
          ],
          visual: [
            { label: "Answer Button", desc: "Shape with hyperlink to Correct/Wrong slide", color: "#c43e1c" },
            { label: "Navigation", desc: "Home button to return to question menu", color: "#e05a38" },
            { label: "Kiosk Mode", desc: "Slide Show → Set Up → Browsed at a kiosk", color: "#6c757d" },
          ]
        },
        type: "mcq",
        questions: [
          { q: "To link a button to another slide in PowerPoint, you use:", options: ["Animations", "Insert → Hyperlink → Place in this document", "Design → Link", "Transitions → Jump to"], answer: 1, explain: "Insert → Hyperlink lets you link any object to any slide in the same presentation." },
          { q: "Action Buttons in PowerPoint are found under:", options: ["Insert → Shapes (bottom row)", "Home → Shapes", "Animations → Action", "Design → Actions"], answer: 0, explain: "Action Buttons are special shapes in Insert → Shapes (scroll to the very bottom)." },
          { q: "Kiosk mode in Slide Show is best for:", options: ["Presenter-led classes only", "Self-running student quizzes with no teacher present", "Exporting to PDF", "Printing handouts"], answer: 1, explain: "Kiosk mode loops the show and prevents students from exiting — perfect for self-paced quizzes!" },
        ]
      },
    ]
  },
  {
    id: "teams", title: "Microsoft Teams", emoji: "💬", color: "#464eb8", light: "#eeeffe",
    tagline: "Connect, collaborate, and teach from anywhere",
    lessons: [
      {
        id: "t1", title: "What is Microsoft Teams?", xp: 20, duration: "5 min",
        learn: {
          icon: "💬", heading: "Your Digital Staffroom + Classroom",
          definition: "Microsoft Teams is a collaboration platform combining chat, video calls, file sharing, and assignments in one place.",
          analogy: "Teams is like having your staffroom, classroom, filing cabinet, and phone system all in one app — accessible from anywhere!",
          facts: [
            { icon: "💬", text: "Chat — message colleagues and students in real-time" },
            { icon: "📹", text: "Meetings — video calls up to 1000 participants" },
            { icon: "📁", text: "Files — shared storage powered by SharePoint" },
            { icon: "📋", text: "Assignments — set, collect, and grade work" },
            { icon: "📱", text: "Works on phone, tablet, and computer" },
          ],
          visual: [
            { label: "Teams", desc: "Group workspaces for classes or departments", color: "#464eb8" },
            { label: "Channels", desc: "Topic-based conversations within a Team", color: "#5a64cc" },
            { label: "Chat", desc: "Private one-on-one or group messages", color: "#6c757d" },
          ]
        },
        type: "drag",
        question: "Drag each feature to where you find it in Teams",
        items: ["Video call a colleague", "Post a class announcement", "Send a private message", "Share a document", "Set homework"],
        zones: [
          { id: "meetings", label: "📹 Meetings", accepts: ["Video call a colleague"] },
          { id: "channel", label: "📢 Channel Post", accepts: ["Post a class announcement"] },
          { id: "chat", label: "💬 Chat", accepts: ["Send a private message"] },
          { id: "files", label: "📁 Files Tab", accepts: ["Share a document"] },
          { id: "assignments", label: "📋 Assignments", accepts: ["Set homework"] },
        ]
      },
      {
        id: "t2", title: "Setting Up Your Class Team", xp: 25, duration: "6 min",
        learn: {
          icon: "🏫", heading: "Create Your Virtual Classroom",
          definition: "A Class Team is a special Teams workspace with built-in tools for assignments, grading, and a Class Notebook.",
          analogy: "A Class Team is your digital classroom — students join with a code, you post work, and everything stays organised in one place!",
          facts: [
            { icon: "➕", text: "Create → Class type → name it: Subject_Grade_Year" },
            { icon: "🔑", text: "Share the join code for students to enrol" },
            { icon: "📢", text: "General channel = main classroom noticeboard" },
            { icon: "📂", text: "Create channels: Assignments, Resources, Discussions" },
            { icon: "🔒", text: "Teachers can control who can post in each channel" },
          ],
          visual: [
            { label: "Class type", desc: "Gives you Grades, Assignments, Class Notebook", color: "#464eb8" },
            { label: "Join Code", desc: "Share with students to enrol them instantly", color: "#5a64cc" },
            { label: "Channels", desc: "Separate spaces for different topics/activities", color: "#27ae60" },
          ]
        },
        type: "mcq",
        questions: [
          { q: "What type of Team should teachers create for their class?", options: ["Staff", "PLC", "Class", "Other"], answer: 2, explain: "Class type gives special features: Assignments, Grades tab, and Class Notebook — not in other team types." },
          { q: "Students join your Class Team using:", options: ["Their school email", "A join code you share with them", "A password", "A direct invitation only"], answer: 1, explain: "A join code lets students enrol instantly — share it verbally or post it securely." },
          { q: "The General channel in a Class Team is best used for:", options: ["Private teacher notes", "Off-topic chats", "Main class announcements and resources", "Video calls only"], answer: 2, explain: "General is the default channel — use it for official class communication and resources." },
        ]
      },
      {
        id: "t3", title: "Assignments & Grading", xp: 30, duration: "7 min",
        learn: {
          icon: "📋", heading: "Set, Collect & Grade — All in Teams",
          definition: "The Assignments tab lets you create homework/classwork, attach resources, set due dates, receive submissions, and give feedback.",
          analogy: "It's like having a digital homework basket — students drop their work in, you see exactly who submitted, and you mark without any paper!",
          facts: [
            { icon: "➕", text: "Assignments tab → Create → Assignment" },
            { icon: "📎", text: "Attach a Word/PDF template for students to complete" },
            { icon: "📅", text: "Set a due date and close date to prevent late submissions" },
            { icon: "🏆", text: "Add a Rubric for consistent, fair grading criteria" },
            { icon: "🔄", text: "Return graded work with feedback — student gets notified" },
          ],
          visual: [
            { label: "Create", desc: "Title, instructions, attachments, due date", color: "#464eb8" },
            { label: "Track", desc: "See who submitted, who hasn't, in real-time", color: "#5a64cc" },
            { label: "Grade & Return", desc: "Mark with feedback → student notified instantly", color: "#27ae60" },
          ]
        },
        type: "fillin",
        questions: [
          { q: "The Assignments feature is found in the ___ tab of your Class Team", answer: "Assignments", hint: "It's named exactly after what it does" },
          { q: "A ___ in Assignments provides clear marking criteria for students", answer: "Rubric", hint: "A scoring guide with criteria and levels" },
          { q: "After grading, you click ___ to send the work back to the student", answer: "Return", hint: "Give it back!" },
        ]
      },
      {
        id: "t4", title: "Meetings & Breakout Rooms", xp: 25, duration: "6 min",
        learn: {
          icon: "📹", heading: "Run Engaging Virtual Classes",
          definition: "Teams Meetings support video, audio, screen sharing, chat, polls, and Breakout Rooms for group work.",
          analogy: "Breakout Rooms are like asking students to discuss in small groups — they leave the main 'room', work together, and come back — all online!",
          facts: [
            { icon: "📅", text: "Schedule in advance: Calendar → New Meeting" },
            { icon: "🚪", text: "Lobby setting: students wait until you admit them" },
            { icon: "👥", text: "Breakout Rooms: split into groups during the meeting" },
            { icon: "📺", text: "Share Screen to show your slides, browser, or any app" },
            { icon: "📹", text: "Record the meeting — saved to SharePoint for absent students" },
          ],
          visual: [
            { label: "Lobby", desc: "Students wait here until the teacher admits them", color: "#464eb8" },
            { label: "Breakout Rooms", desc: "Small groups — teacher can visit each room", color: "#5a64cc" },
            { label: "Recording", desc: "Auto-saved to SharePoint for later access", color: "#27ae60" },
          ]
        },
        type: "mcq",
        questions: [
          { q: "Breakout Rooms in Teams are used to:", options: ["Mute all students", "Split participants into small groups", "Record the meeting", "Share your screen"], answer: 1, explain: "Breakout Rooms let you split the class into small groups — perfect for discussions and group tasks." },
          { q: "The Lobby in Teams meetings allows the teacher to:", options: ["See who typed in chat", "Control which participants enter the meeting", "Record the session", "Share files"], answer: 1, explain: "The Lobby is a waiting area — only the teacher can admit or reject participants." },
          { q: "Where are recorded Teams meetings saved?", options: ["Your email inbox", "SharePoint or OneDrive", "A USB drive", "The Teams chat history only"], answer: 1, explain: "Recordings go to SharePoint/OneDrive — accessible to all team members anytime." },
        ]
      },
      {
        id: "t5", title: "OneNote Class Notebook", xp: 25, duration: "7 min",
        learn: {
          icon: "📓", heading: "Your Digital Lesson Planner + Student Journal",
          definition: "OneNote Class Notebook has three spaces: Content Library (teacher-only), Collaboration Space (all edit), and private Student Notebooks.",
          analogy: "Imagine: every student has their own exercise book AND there's a shared class poster on the wall — all in one digital notebook!",
          facts: [
            { icon: "📚", text: "Content Library — teacher posts notes, resources (read-only for students)" },
            { icon: "🤝", text: "Collaboration Space — everyone can edit (group work, brainstorm)" },
            { icon: "🔒", text: "Student Notebooks — private to each student + teacher" },
            { icon: "✏️", text: "Add text, images, audio recordings, and drawings" },
            { icon: "📱", text: "Works on phone, tablet, and PC — syncs everywhere" },
          ],
          visual: [
            { label: "Content Library", desc: "Teacher posts lessons — students read only", color: "#464eb8" },
            { label: "Collaboration Space", desc: "Shared space — everyone contributes", color: "#27ae60" },
            { label: "Student Notebook", desc: "Private — only teacher and student see it", color: "#e67e22" },
          ]
        },
        type: "drag",
        question: "Place each activity in the correct OneNote space",
        items: ["Post a lesson note", "Class brainstorm activity", "Student's private journal", "Shared group project", "Teacher feedback on student work"],
        zones: [
          { id: "content", label: "📚 Content Library", accepts: ["Post a lesson note"] },
          { id: "collab", label: "🤝 Collaboration Space", accepts: ["Class brainstorm activity", "Shared group project"] },
          { id: "student", label: "🔒 Student Notebook", accepts: ["Student's private journal", "Teacher feedback on student work"] },
        ]
      },
      {
        id: "t6", title: "Forms, Polls & Feedback", xp: 25, duration: "6 min",
        learn: {
          icon: "📊", heading: "Collect Feedback & Run Live Polls",
          definition: "Microsoft Forms integrates with Teams to create quizzes, surveys, and polls — results appear live in real-time.",
          analogy: "A live poll is like asking the class to raise hands — but everyone answers honestly, you see every answer, and it's automatically counted!",
          facts: [
            { icon: "📊", text: "Add Forms tab to a channel: click + → Forms" },
            { icon: "🗳️", text: "Polls during meetings: use the Polls icon in meeting toolbar" },
            { icon: "✅", text: "Quiz mode auto-grades and shows students their score" },
            { icon: "📈", text: "Response summary shows class trends and patterns" },
            { icon: "📤", text: "Export responses to Excel for detailed analysis" },
          ],
          visual: [
            { label: "Quiz", desc: "Auto-graded with feedback — great for revision", color: "#464eb8" },
            { label: "Survey", desc: "Gather opinions — no right/wrong answers", color: "#5a64cc" },
            { label: "Poll", desc: "Quick live vote during a meeting", color: "#27ae60" },
          ]
        },
        type: "mcq",
        questions: [
          { q: "Microsoft Forms can be added to a Teams channel as a:", options: ["Bot", "Connector", "Tab (click '+')", "Webhook"], answer: 2, explain: "Click the '+' icon on any channel tab row to add Forms (and many other apps)." },
          { q: "Forms Quiz mode automatically:", options: ["Sends results by email", "Grades responses and shows students their score", "Creates a Pivot Table", "Records a video"], answer: 1, explain: "Quiz mode grades instantly — students see their score right away, saving teacher marking time!" },
          { q: "Form responses can be exported to ___ for further analysis.", options: ["Word", "PowerPoint", "Excel", "Access"], answer: 2, explain: "Export to Excel gives you all responses in a spreadsheet for sorting, filtering, and analysis." },
        ]
      },
    ]
  },
  {
    id: "cyber", title: "Cybersecurity", emoji: "🔐", color: "#c0392b", light: "#fdf0ef",
    tagline: "Protect yourself and your students online",
    lessons: [
      {
        id: "cy1", title: "What is Cybersecurity?", xp: 20, duration: "5 min",
        learn: {
          icon: "🔐", heading: "Your Digital Safety Shield",
          definition: "Cybersecurity is the practice of protecting computers, networks, and data from digital attacks, damage, or unauthorised access.",
          analogy: "Cybersecurity is like the lock on your front door, the alarm on your car, and a guard dog — all protecting your digital 'home'!",
          facts: [
            { icon: "🏦", text: "Hackers target banks, hospitals, schools, and individuals" },
            { icon: "📧", text: "Most attacks start with a deceptive email (phishing)" },
            { icon: "💰", text: "Ransomware locks your files and demands payment" },
            { icon: "📱", text: "Mobile devices are just as vulnerable as computers" },
            { icon: "🧑‍🏫", text: "Teachers protect student data — it's a legal responsibility!" },
          ],
          visual: [
            { label: "Malware", desc: "Software designed to damage or steal from your device", color: "#c0392b" },
            { label: "Phishing", desc: "Fake emails/sites tricking you into giving passwords", color: "#e74c3c" },
            { label: "Ransomware", desc: "Locks your files until you pay — prevention is key!", color: "#922b21" },
          ]
        },
        type: "mcq",
        questions: [
          { q: "What is phishing?", options: ["A type of fishing sport", "A fake message designed to steal your personal info", "Blocking websites", "Antivirus software"], answer: 1, explain: "Phishing emails pretend to be from banks, schools, or companies to trick you into revealing passwords." },
          { q: "Ransomware attacks:", options: ["Speed up your computer", "Encrypt your files and demand payment to unlock them", "Only affect mobile phones", "Improve your internet connection"], answer: 1, explain: "Ransomware encrypts (locks) your files — attackers demand payment for the decryption key." },
          { q: "Why must teachers take cybersecurity seriously?", options: ["It's optional", "It makes computers faster", "They hold sensitive student personal data — a legal responsibility", "Only IT staff need to care"], answer: 2, explain: "POPIA (SA law) requires schools to protect student data — teachers are responsible for data they access." },
        ]
      },
      {
        id: "cy2", title: "Strong Passwords & 2FA", xp: 25, duration: "6 min",
        learn: {
          icon: "🔑", heading: "Your First Line of Defence",
          definition: "A strong password is long (16+ characters), unique for each account, and uses a mix of letters, numbers, and symbols.",
          analogy: "A weak password is a screen door on a submarine. A strong, unique password with 2FA is a bank vault with a fingerprint scanner!",
          facts: [
            { icon: "❌", text: "Weak: Password123, School2024, your name + birthdate" },
            { icon: "✅", text: "Strong: xK#9mL$2pQr!vN7@ (16 chars, random, unique)" },
            { icon: "🔐", text: "Use a Password Manager (Bitwarden is free!) — stores all passwords safely" },
            { icon: "📱", text: "2FA (Two-Factor Authentication) = password + phone code" },
            { icon: "🔄", text: "NEVER reuse passwords across accounts!" },
          ],
          visual: [
            { label: "Password Only", desc: "❌ If hacked once, all accounts compromised", color: "#e74c3c" },
            { label: "Strong Password", desc: "✅ 16+ chars, unique, random — hard to crack", color: "#e67e22" },
            { label: "Strong PW + 2FA", desc: "✅✅ Even if stolen, hacker can't get in without your phone", color: "#27ae60" },
          ]
        },
        type: "drag",
        question: "Sort these passwords: Weak or Strong?",
        items: ["school123", "xK#9mL$2pQr!vN7@", "MrSmith2024", "T!9kZ#m4$vQ2@nX8", "password", "Lx3#!mQ9$vP2"],
        zones: [
          { id: "weak", label: "❌ Weak Password", accepts: ["school123", "MrSmith2024", "password"] },
          { id: "strong", label: "✅ Strong Password", accepts: ["xK#9mL$2pQr!vN7@", "T!9kZ#m4$vQ2@nX8", "Lx3#!mQ9$vP2"] },
        ]
      },
      {
        id: "cy3", title: "Spot the Phishing Email", xp: 30, duration: "7 min",
        learn: {
          icon: "🎣", heading: "Don't Take the Bait!",
          definition: "Phishing emails impersonate trusted sources to steal your login details, money, or personal information.",
          analogy: "A phishing email is a wolf in sheep's clothing — it LOOKS like your bank or boss, but it's an attacker trying to trick you!",
          facts: [
            { icon: "🚨", text: "Urgent language: 'Your account will be CLOSED in 24 hours!'" },
            { icon: "🔗", text: "Suspicious links: hover before clicking — check the actual URL" },
            { icon: "✉️", text: "Wrong sender domain: support@bank.com vs support@bank.verify-login.com" },
            { icon: "📎", text: "Unexpected attachments — never open .exe or .zip from unknown senders" },
            { icon: "🙋", text: "Generic greeting: 'Dear Customer' instead of your actual name" },
          ],
          visual: [
            { label: "🚨 Urgent pressure", desc: "'Act NOW or lose access!' — creates panic", color: "#c0392b" },
            { label: "🔗 Fake link", desc: "Looks right but URL is wrong — hover to check!", color: "#e74c3c" },
            { label: "📎 Attachment", desc: "Malicious file hiding in email — never open if unsure", color: "#922b21" },
          ]
        },
        type: "mcq",
        questions: [
          { q: "You receive: 'URGENT: Your school email will be deleted in 2 hours — click here to verify.' What do you do?", options: ["Click the link — it sounds real", "Ignore it and delete it — it's phishing", "Forward it to all staff", "Reply asking for more info"], answer: 1, explain: "Urgency + click link = phishing hallmarks. Never click. Report it to your IT department instead." },
          { q: "Before clicking a link in an email, you should:", options: ["Click it quickly before it expires", "Hover over it to see the actual URL destination", "Copy it into a search engine", "Save the email and check tomorrow"], answer: 1, explain: "Hovering reveals the REAL URL. If it doesn't match the expected domain — don't click!" },
          { q: "Which email address is most suspicious?", options: ["hr@school.edu.za", "principal@school.edu.za", "payroll@school-payroll.verify-click.com", "admin@school.edu.za"], answer: 2, explain: "The domain 'school-payroll.verify-click.com' is NOT your school's domain — it's a fake!" },
        ]
      },
      {
        id: "cy4", title: "Safe Browsing & Privacy", xp: 25, duration: "6 min",
        learn: {
          icon: "🌐", heading: "Stay Safe on the Web",
          definition: "Safe browsing means verifying website security, avoiding suspicious sites, and protecting your privacy online.",
          analogy: "Browsing without protection is like walking through a city with your wallet open and shouting your address. HTTPS is your security guard!",
          facts: [
            { icon: "🔒", text: "Look for HTTPS (🔒 padlock) — connection is encrypted" },
            { icon: "❌", text: "HTTP (no padlock) — NOT secure, avoid entering any data" },
            { icon: "🚫", text: "Don't click pop-ups claiming 'Your device has a VIRUS!'" },
            { icon: "🕵️", text: "Use private/incognito mode on shared computers" },
            { icon: "🧹", text: "Clear browser cache and cookies regularly" },
          ],
          visual: [
            { label: "🔒 HTTPS", desc: "Encrypted connection — safe to enter passwords", color: "#27ae60" },
            { label: "⚠️ HTTP", desc: "Not encrypted — avoid entering personal data", color: "#e67e22" },
            { label: "🚨 Pop-up scam", desc: "'Your PC is INFECTED! Call now!' — ignore and close", color: "#e74c3c" },
          ]
        },
        type: "fillin",
        questions: [
          { q: "A secure website URL begins with ___ (not just http)", answer: "https", hint: "S stands for Secure" },
          { q: "On a shared school computer, use ___ mode so your session is private", answer: "incognito", hint: "Also called 'Private mode' in different browsers" },
          { q: "The padlock icon in the browser address bar means the connection is ___", answer: "encrypted", hint: "Your data is scrambled so others can't read it" },
        ]
      },
      {
        id: "cy5", title: "POPIA & Student Data Protection", xp: 30, duration: "7 min",
        learn: {
          icon: "⚖️", heading: "Know the Law — Protect Your Students",
          definition: "POPIA (Protection of Personal Information Act) is South Africa's data privacy law requiring responsible handling of all personal information.",
          analogy: "POPIA is like a constitution for personal data — it gives people rights over their information and gives YOU responsibilities as a 'guardian' of student data.",
          facts: [
            { icon: "🏛️", text: "POPIA came into full effect on 1 July 2021 in South Africa" },
            { icon: "🔒", text: "Personal info: name, ID number, address, marks, health info" },
            { icon: "✅", text: "You must have a LAWFUL REASON to collect student data" },
            { icon: "🚫", text: "Never share student data without consent or legal authority" },
            { icon: "⚠️", text: "Data breach? You MUST report it within 72 hours" },
          ],
          visual: [
            { label: "Collect", desc: "Only what's necessary — no excess data", color: "#c0392b" },
            { label: "Protect", desc: "Encrypt, password-protect, restrict access", color: "#e67e22" },
            { label: "Disclose", desc: "Only to authorised people with a valid reason", color: "#27ae60" },
          ]
        },
        type: "mcq",
        questions: [
          { q: "POPIA stands for:", options: ["Personal Online Privacy and Information Act", "Protection of Personal Information Act", "Public and Online Privacy Info Act", "Protecting Our Personal Info Act"], answer: 1, explain: "POPIA = Protection of Personal Information Act — South Africa's data privacy law since 2021." },
          { q: "Under POPIA, a school data breach must be reported within:", options: ["24 hours", "1 week", "72 hours", "30 days"], answer: 2, explain: "72 hours is the POPIA requirement for reporting a data breach to the Information Regulator." },
          { q: "Sharing a student's home address with a parent group chat:", options: ["Is always fine — parents need it", "Could violate POPIA — only share with consent and on a need-to-know basis", "Is required by law", "Is only an issue if the address is wrong"], answer: 1, explain: "Student data must be shared only when there is a lawful basis — a group chat is not secure and likely violates POPIA." },
        ]
      },
      {
        id: "cy6", title: "Device Security & Malware Prevention", xp: 25, duration: "6 min",
        learn: {
          icon: "🛡️", heading: "Keep Your Device Safe and Clean",
          definition: "Device security involves keeping software updated, using antivirus, avoiding suspicious downloads, and physical security measures.",
          analogy: "Your device is like your car — regular maintenance (updates), locking it (password), and not picking up strangers (unknown files) keeps it safe!",
          facts: [
            { icon: "🔄", text: "Updates patch security holes — ALWAYS install them promptly" },
            { icon: "🛡️", text: "Windows Defender (free & built-in) protects against malware" },
            { icon: "🚫", text: "Never plug in an unknown USB drive — it could contain malware" },
            { icon: "🔒", text: "Auto-lock: set device to lock after 5 minutes idle" },
            { icon: "💾", text: "Back up data to OneDrive/external drive — protection from ransomware" },
          ],
          visual: [
            { label: "Update OS", desc: "Closes security vulnerabilities hackers exploit", color: "#c0392b" },
            { label: "Antivirus Scan", desc: "Weekly scan catches malware early", color: "#e67e22" },
            { label: "Backup", desc: "3-2-1 rule: 3 copies, 2 formats, 1 offsite", color: "#27ae60" },
          ]
        },
        type: "drag",
        question: "Sort these actions: Good Security Habit or Bad Habit?",
        items: ["Install OS updates promptly", "Plug in a found USB drive", "Use auto-lock after 5 mins", "Download cracked software", "Back up to OneDrive weekly", "Share your password with a colleague"],
        zones: [
          { id: "good", label: "✅ Good Security Habit", accepts: ["Install OS updates promptly", "Use auto-lock after 5 mins", "Back up to OneDrive weekly"] },
          { id: "bad", label: "❌ Bad Security Habit", accepts: ["Plug in a found USB drive", "Download cracked software", "Share your password with a colleague"] },
        ]
      },
    ]
  },
  {
    id: "programming", title: "Introduction to Programming", emoji: "💻", color: "#6d28d9", light: "#f3effe",
    tagline: "Think like a computer, teach the future",
    lessons: [
      {
        id: "pr1", title: "What is Programming?", xp: 20, duration: "5 min",
        learn: {
          icon: "💻", heading: "Giving Instructions to a Computer",
          definition: "Programming is writing precise instructions (code) that tell a computer exactly what to do, step by step.",
          analogy: "A computer is the most obedient assistant ever — but it only follows EXACT instructions. Programming is writing those instructions in a language it understands!",
          facts: [
            { icon: "📝", text: "Code is written in a programming language (Python, JavaScript, etc.)" },
            { icon: "⚡", text: "Computers execute millions of instructions per second" },
            { icon: "🐛", text: "A bug is an error in code — debugging is fixing it" },
            { icon: "🔄", text: "Programs can repeat tasks (loops) and make decisions (if/else)" },
            { icon: "🌍", text: "Every app, website, and game is built with code" },
          ],
          visual: [
            { label: "Algorithm", desc: "The plan — step-by-step logic, before writing code", color: "#6d28d9" },
            { label: "Code", desc: "The algorithm written in a programming language", color: "#7c3aed" },
            { label: "Output", desc: "What the program produces (text, graphics, actions)", color: "#8b5cf6" },
          ]
        },
        type: "mcq",
        questions: [
          { q: "A 'bug' in programming refers to:", options: ["An insect found near computers", "An error in the code causing incorrect behaviour", "A type of antivirus", "A slow internet connection"], answer: 1, explain: "Bug = error in code. The term dates to 1947 when a real moth was found in a relay of an early computer!" },
          { q: "Programming languages like Python are needed because:", options: ["Computers are too slow", "Computers only understand electricity, not human language — code bridges the gap", "Keyboards can't type human language", "English is too complex for people"], answer: 1, explain: "Computers process binary (0s and 1s). Programming languages let us write human-readable code that gets translated." },
          { q: "An algorithm is:", options: ["A type of computer virus", "A social media platform", "A step-by-step set of instructions to solve a problem", "A programming language"], answer: 2, explain: "Algorithms are the logic/plan — you design the algorithm BEFORE writing any code." },
        ]
      },
      {
        id: "pr2", title: "Python Basics — Variables & Types", xp: 25, duration: "6 min",
        learn: {
          icon: "🐍", heading: "Python: The Friendliest Language",
          definition: "Python is a beginner-friendly language used in education, data science, AI, and web development. Variables store data that your program uses.",
          analogy: "A variable is like a labelled box. name = 'John' puts 'John' in a box called 'name'. Whenever you need John's name, you just open that box!",
          facts: [
            { icon: "📦", text: "name = 'Themba' — stores text (string) in a variable" },
            { icon: "🔢", text: "score = 95 — stores a number (integer)" },
            { icon: "💬", text: "print(name) — displays what's in the 'name' box" },
            { icon: "🖊️", text: "input('Enter name: ') — asks the user to type something" },
            { icon: "🐍", text: "Python is free — code online at replit.com or trinket.io" },
          ],
          visual: [
            { label: "String", desc: "Text in quotes: name = \"Thabo\"", color: "#6d28d9" },
            { label: "Integer", desc: "Whole number: age = 25", color: "#7c3aed" },
            { label: "Float", desc: "Decimal number: score = 78.5", color: "#8b5cf6" },
          ]
        },
        type: "fillin",
        questions: [
          { q: "In Python, to display text on screen you use the ___ function", answer: "print", hint: "It 'prints' output to the screen" },
          { q: "A piece of text stored in Python is called a ___", answer: "string", hint: "A string of characters" },
          { q: "name = 'Lerato' stores the value 'Lerato' in a ___", answer: "variable", hint: "A named storage box for data" },
        ]
      },
      {
        id: "pr3", title: "If Statements — Teaching Computers to Decide", xp: 25, duration: "6 min",
        learn: {
          icon: "🤔", heading: "Making Decisions with If/Else",
          definition: "If statements let programs make decisions: IF a condition is true, do one thing; ELSE do another.",
          analogy: "if score >= 50:\n    print('Pass')\nelse:\n    print('Fail')\n\nJust like a teacher: 'If score is 50 or more, write Pass. Otherwise, write Fail.'",
          facts: [
            { icon: "📐", text: "Condition uses: > < >= <= == (equal) != (not equal)" },
            { icon: "📏", text: "Python uses INDENTATION (4 spaces) to group code — NO curly braces!" },
            { icon: "🔀", text: "elif = 'else if' — test multiple conditions" },
            { icon: "💡", text: "== checks equality (2==2 is True); = ASSIGNS a value" },
            { icon: "🐍", text: "if score>=80: 'A'\nelif score>=70: 'B'\nelse: 'C'" },
          ],
          visual: [
            { label: "if condition:", desc: "Runs if condition is True (indent the block)", color: "#6d28d9" },
            { label: "elif condition:", desc: "Checks next condition if first was False", color: "#7c3aed" },
            { label: "else:", desc: "Runs when ALL conditions above are False", color: "#8b5cf6" },
          ]
        },
        type: "mcq",
        questions: [
          { q: "What does this return? score=75\nif score>=80: print('A')\nelif score>=70: print('B')\nelse: print('C')", options: ["A", "B", "C", "Error"], answer: 1, explain: "75 is NOT >=80 (A skipped). 75 IS >=70, so 'B' is printed!" },
          { q: "In Python, indentation (spaces) is used to:", options: ["Make code look pretty", "Define which code belongs inside an if/loop block", "Run code faster", "Add comments"], answer: 1, explain: "Python uses indentation INSTEAD of curly braces {} — it's how Python knows what's inside an if block." },
          { q: "Which symbol checks if two values are EQUAL in Python?", options: ["=", "equals", "==", "==="], answer: 2, explain: "== tests equality (is 5==5? Yes!). Single = assigns a value. Never confuse them!" },
        ]
      },
      {
        id: "pr4", title: "Loops — Automate Repetition", xp: 25, duration: "6 min",
        learn: {
          icon: "🔄", heading: "Loops: Do It Again (and Again!)",
          definition: "Loops repeat a block of code multiple times — saving you from writing the same instruction over and over.",
          analogy: "Without loops, printing 100 names means 100 print() lines. With a loop, you write it ONCE and say 'repeat 100 times'. Work smarter, not harder!",
          facts: [
            { icon: "🔢", text: "for i in range(10): — repeats exactly 10 times" },
            { icon: "🔄", text: "while condition: — repeats UNTIL the condition is False" },
            { icon: "🛑", text: "break — exit a loop immediately" },
            { icon: "⏭️", text: "continue — skip this iteration, move to next" },
            { icon: "📋", text: "for name in ['Ana','Ben','Cara']: — loop through a list" },
          ],
          visual: [
            { label: "for loop", desc: "Known number of repeats: for i in range(5)", color: "#6d28d9" },
            { label: "while loop", desc: "Repeat until condition False: while x < 10", color: "#7c3aed" },
            { label: "Infinite loop ⚠️", desc: "while True — loops forever unless you break out!", color: "#e74c3c" },
          ]
        },
        type: "fillin",
        questions: [
          { q: "for i in ___(5): loops exactly 5 times", answer: "range", hint: "Creates a sequence of numbers 0-4" },
          { q: "A ___ loop repeats as long as a condition remains True", answer: "while", hint: "Keeps going 'while' something is true" },
          { q: "The ___ statement immediately stops and exits a loop", answer: "break", hint: "It 'breaks' out of the loop" },
        ]
      },
      {
        id: "pr5", title: "Functions — Reusable Code Blocks", xp: 30, duration: "7 min",
        learn: {
          icon: "🧩", heading: "Write Once, Use Many Times",
          definition: "A function is a named block of code that performs a specific task. Call it by name whenever you need it — no rewriting!",
          analogy: "A function is like a recipe. You write 'make_tea()' once with all the steps. Whenever you want tea, just call make_tea() — no need to rethink it!",
          facts: [
            { icon: "🏗️", text: "def greet(name): — defines a function called 'greet'" },
            { icon: "📥", text: "Parameters are inputs: def add(a, b): — takes two numbers" },
            { icon: "📤", text: "return sends a result back: return a + b" },
            { icon: "📞", text: "Call it: result = add(5, 3) — result is now 8" },
            { icon: "♻️", text: "Functions prevent repetition — cleaner, organised code" },
          ],
          visual: [
            { label: "def", desc: "Keyword that DEFINES/creates a function", color: "#6d28d9" },
            { label: "Parameters", desc: "Inputs the function accepts inside ()", color: "#7c3aed" },
            { label: "return", desc: "Sends the result back to whoever called it", color: "#27ae60" },
          ]
        },
        type: "mcq",
        questions: [
          { q: "What keyword is used to CREATE (define) a function in Python?", options: ["function", "create", "def", "make"], answer: 2, explain: "def (short for 'define') creates a function. Example: def calculate_grade(score):" },
          { q: "What does the 'return' statement do inside a function?", options: ["Displays text to screen", "Stops the whole program", "Sends a value back to the code that called the function", "Loops back to the start"], answer: 2, explain: "return passes the result back. Without it, the function does work but gives you nothing back!" },
          { q: "Why are functions important in programming?", options: ["They make code run faster", "They avoid repeating the same code — reuse, organise, and simplify", "They are required by the computer", "They replace loops"], answer: 1, explain: "Functions = reusability. Write the logic once, call it anywhere. This is a core programming principle: DRY (Don't Repeat Yourself)." },
        ]
      },
      {
        id: "pr6", title: "Teaching Coding in the Classroom", xp: 30, duration: "7 min",
        learn: {
          icon: "🏫", heading: "From Learner to Teacher of Code",
          definition: "Teaching coding in school develops logical thinking, problem-solving, and creativity — skills useful in every subject and career.",
          analogy: "Teaching coding is not about making programmers — it's about giving every learner a new way to think. Like teaching writing — not everyone becomes an author, but everyone benefits!",
          facts: [
            { icon: "🐱", text: "Scratch (scratch.mit.edu) — free, visual, ages 8-16, no typing" },
            { icon: "🌍", text: "Code.org — free structured lessons, Hour of Code activities" },
            { icon: "🎮", text: "Minecraft Education — learn programming through gameplay" },
            { icon: "📵", text: "Unplugged activities — teach algorithms WITHOUT computers!" },
            { icon: "🏆", text: "Pair programming — two students, one computer, stronger learning" },
          ],
          visual: [
            { label: "Scratch", desc: "Visual blocks — great starter for young learners", color: "#6d28d9" },
            { label: "Python", desc: "Text-based — for older/more advanced learners", color: "#7c3aed" },
            { label: "Unplugged", desc: "No devices needed — great for limited-resource settings", color: "#27ae60" },
          ]
        },
        type: "drag",
        question: "Match each tool to its best age/use case",
        items: ["Scratch", "Python (Replit)", "Code.org activities", "Unplugged card sorting", "Minecraft Education"],
        zones: [
          { id: "young", label: "👶 Ages 8–12 (Visual/Game)", accepts: ["Scratch", "Minecraft Education"] },
          { id: "teen", label: "🧑 Ages 13+ (Text/Logic)", accepts: ["Python (Replit)", "Code.org activities"] },
          { id: "noresources", label: "📵 No Devices Needed", accepts: ["Unplugged card sorting"] },
        ]
      },
    ]
  },
];

// ─────────────────────────────────── HELPERS ───────────────────────────────────
function uid() { return Date.now().toString(36) + Math.random().toString(36).slice(2); }
function certId() { return "ECM-" + Date.now().toString(36).toUpperCase() + "-" + Math.random().toString(36).slice(2,6).toUpperCase(); }
function formatDate(d) { return d.toLocaleDateString("en-ZA",{year:"numeric",month:"long",day:"numeric"}); }

// Confetti burst (CSS-only particles)
function Confetti({ active }) {
  if (!active) return null;
  const colors = ["#FFD700","#FF6B6B","#4ECDC4","#45B7D1","#96CEB4","#FFEAA7","#DDA0DD","#98D8C8"];
  const particles = Array.from({length:24},(_,i)=>i);
  return (
    <div style={{position:"fixed",inset:0,pointerEvents:"none",zIndex:9999,overflow:"hidden"}}>
      {particles.map(i=>(
        <div key={i} style={{
          position:"absolute",
          left:`${(i/24)*100}%`,
          top:"-10px",
          width:10,height:10,
          borderRadius: i%3===0 ? "50%" : "2px",
          background:colors[i%colors.length],
          animation:`confettiFall ${1.5+Math.random()}s linear ${Math.random()*0.5}s forwards`,
          transform:`rotate(${Math.random()*360}deg)`,
        }}/>
      ))}
      <style>{`@keyframes confettiFall{to{transform:translateY(110vh) rotate(720deg);opacity:0;}}`}</style>
    </div>
  );
}

// XP pop animation
function XPPop({ xp, active }) {
  const [show, setShow] = useState(false);
  useEffect(()=>{ if(active){setShow(true);const t=setTimeout(()=>setShow(false),1800);return()=>clearTimeout(t);} },[active]);
  if(!show) return null;
  return (
    <div style={{
      position:"fixed",top:"20%",left:"50%",transform:"translateX(-50%)",
      background:"linear-gradient(135deg,#FFD700,#FFA500)",
      color:"#fff",fontSize:22,fontWeight:900,
      padding:"12px 28px",borderRadius:99,
      boxShadow:"0 6px 24px rgba(255,165,0,0.5)",
      animation:"xpPop 1.8s ease forwards",zIndex:9998,
      fontFamily:"'Segoe UI',sans-serif",letterSpacing:1,
    }}>
      +{xp} XP ⚡
      <style>{`@keyframes xpPop{0%{opacity:0;transform:translateX(-50%) scale(0.5) translateY(20px)}20%{opacity:1;transform:translateX(-50%) scale(1.1) translateY(0)}80%{opacity:1;transform:translateX(-50%) scale(1) translateY(-20px)}100%{opacity:0;transform:translateX(-50%) scale(0.9) translateY(-50px)}}`}</style>
    </div>
  );
}

// ─────────────────────────────────── DRAG & DROP EXERCISE ───────────────────────────────────
function DragDropLesson({ lesson, onComplete }) {
  const [dragging, setDragging] = useState(null);
  const [dropped, setDropped] = useState({}); // { item: zoneId }
  const [revealed, setRevealed] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const allPlaced = lesson.items.every(item => dropped[item]);

  function handleDragStart(item) { setDragging(item); }
  function handleDrop(zoneId) {
    if (!dragging || submitted) return;
    setDropped(prev => ({ ...prev, [dragging]: zoneId }));
    setDragging(null);
  }
  function handleSubmit() {
    setRevealed(true);
    setSubmitted(true);
    // Check all correct
    const allCorrect = lesson.items.every(item => {
      const zone = lesson.zones.find(z => z.accepts.includes(item));
      return dropped[item] === zone?.id;
    });
    if (allCorrect) setTimeout(() => onComplete(true), 800);
    else setTimeout(() => onComplete(false), 800);
  }

  // Items not yet placed
  const unplaced = lesson.items.filter(i => !dropped[i]);

  return (
    <div>
      <p style={{fontSize:15,fontWeight:600,color:"#1e293b",marginBottom:16}}>{lesson.question}</p>

      {/* Unplaced items tray */}
      <div style={{display:"flex",flexWrap:"wrap",gap:8,padding:"12px 16px",background:"#f8faff",borderRadius:12,border:"2px dashed #c7d2fe",marginBottom:20,minHeight:56}}>
        {unplaced.length === 0 ? <span style={{color:"#94a3b8",fontSize:13,alignSelf:"center"}}>All items placed ✓</span> :
          unplaced.map(item => (
            <div key={item}
              draggable
              onDragStart={() => handleDragStart(item)}
              style={{
                padding:"7px 14px",background:"#fff",border:"2px solid #818cf8",
                borderRadius:8,cursor:"grab",fontSize:13,fontWeight:600,color:"#3730a3",
                boxShadow:"0 2px 6px rgba(99,102,241,0.15)",
                userSelect:"none",transition:"transform 0.1s",
              }}
              onMouseDown={e=>e.currentTarget.style.transform="scale(0.96)"}
              onMouseUp={e=>e.currentTarget.style.transform="scale(1)"}
            >{item}</div>
          ))
        }
      </div>

      {/* Drop zones */}
      <div style={{display:"flex",flexDirection:"column",gap:12}}>
        {lesson.zones.map(zone => {
          const zoneItems = lesson.items.filter(i => dropped[i] === zone.id);
          return (
            <div key={zone.id}
              onDragOver={e => e.preventDefault()}
              onDrop={() => handleDrop(zone.id)}
              style={{
                border:"2px dashed #cbd5e1",borderRadius:12,padding:"12px 16px",
                background:"#fafbff",minHeight:52,
                borderColor: dragging ? "#818cf8" : "#cbd5e1",
                transition:"border-color 0.15s, background 0.15s",
              }}
            >
              <div style={{fontSize:13,fontWeight:700,color:"#475569",marginBottom:8}}>{zone.label}</div>
              <div style={{display:"flex",flexWrap:"wrap",gap:6}}>
                {zoneItems.length === 0 && <span style={{fontSize:12,color:"#cbd5e1",alignSelf:"center"}}>Drop items here</span>}
                {zoneItems.map(item => {
                  const correct = zone.accepts.includes(item);
                  let bg="#fff", border="2px solid #818cf8", color="#3730a3";
                  if(revealed){ if(correct){bg="#f0fdf4";border="2px solid #4ade80";color="#166534";}else{bg="#fef2f2";border="2px solid #f87171";color="#991b1b";} }
                  return (
                    <div key={item}
                      style={{padding:"6px 12px",borderRadius:8,fontSize:13,fontWeight:600,background:bg,border,color,cursor:submitted?"default":"pointer"}}
                      onClick={() => { if(!submitted) setDropped(prev => { const n={...prev}; delete n[item]; return n; }); }}
                    >
                      {revealed && (correct?"✓ ":"✗ ")}{item}
                    </div>
                  );
                })}
              </div>
            </div>
          );
        })}
      </div>

      {!submitted && (
        <button
          style={{marginTop:20,padding:"11px 28px",borderRadius:99,fontSize:14,fontWeight:700,cursor:allPlaced?"pointer":"not-allowed",
            background:allPlaced?"linear-gradient(135deg,#6d28d9,#818cf8)":"#e2e8f0",
            color:allPlaced?"#fff":"#94a3b8",border:"none",transition:"all 0.2s",boxShadow:allPlaced?"0 4px 14px rgba(109,40,217,0.4)":"none"}}
          onClick={allPlaced ? handleSubmit : undefined}
        >Check Answers →</button>
      )}

      {revealed && (
        <div style={{marginTop:14,padding:"12px 16px",borderRadius:10,
          background: lesson.items.every(i=>lesson.zones.find(z=>z.accepts.includes(i))?.id===dropped[i]) ? "#f0fdf4":"#fef9ef",
          border: `1px solid ${lesson.items.every(i=>lesson.zones.find(z=>z.accepts.includes(i))?.id===dropped[i])?"#4ade80":"#fcd34d"}`
        }}>
          <span style={{fontWeight:700,fontSize:14}}>
            {lesson.items.every(i=>lesson.zones.find(z=>z.accepts.includes(i))?.id===dropped[i]) ? "🎉 Perfect! All correct!" : "💡 Some items are in the wrong zone — review the coloured feedback above."}
          </span>
        </div>
      )}
    </div>
  );
}

// ─────────────────────────────────── MCQ EXERCISE ───────────────────────────────────
function MCQLesson({ lesson, onComplete }) {
  const [answers, setAnswers] = useState({});
  const [revealed, setRevealed] = useState(false);
  const [current, setCurrent] = useState(0);

  const q = lesson.questions[current];
  const answered = answers[current] !== undefined;
  const isLast = current === lesson.questions.length - 1;

  function pick(oi) {
    if (revealed || answers[current] !== undefined) return;
    setAnswers(prev => ({...prev, [current]: oi}));
    setRevealed(true);
  }

  function next() {
    setRevealed(false);
    if (isLast) {
      const score = lesson.questions.filter((_,i) => answers[i] === lesson.questions[i].answer || (i===current && answers[current]===q.answer)).length;
      onComplete(score >= Math.ceil(lesson.questions.length * 0.67));
    } else {
      setCurrent(c => c+1);
    }
  }

  const chosen = answers[current];

  return (
    <div>
      {/* Progress dots */}
      <div style={{display:"flex",gap:6,marginBottom:20}}>
        {lesson.questions.map((_,i)=>(
          <div key={i} style={{height:6,flex:1,borderRadius:99,
            background: i<current ? "#4ade80" : i===current ? "#6d28d9" : "#e2e8f0",
            transition:"background 0.3s"}}/>
        ))}
      </div>

      <p style={{fontSize:16,fontWeight:700,color:"#1e293b",marginBottom:18,lineHeight:1.5}}>
        {current+1}. {q.q}
      </p>

      <div style={{display:"flex",flexDirection:"column",gap:8}}>
        {q.options.map((opt, oi)=>{
          let bg="#fff", border="1.5px solid #e2e8f0", color="#334155", icon="";
          if(revealed){
            if(oi===q.answer){ bg="#f0fdf4";border="2px solid #4ade80";color="#166534";icon="✓ "; }
            else if(chosen===oi){ bg="#fef2f2";border="2px solid #f87171";color="#991b1b";icon="✗ "; }
          } else if(chosen===oi){ bg="#eef2ff";border="2px solid #818cf8";color="#3730a3"; }
          return (
            <button key={oi} onClick={()=>pick(oi)} style={{
              display:"flex",alignItems:"center",gap:10,padding:"13px 18px",
              borderRadius:10,border,background:bg,color,fontSize:14,fontWeight:500,
              cursor:revealed?"default":"pointer",textAlign:"left",
              boxShadow:revealed&&oi===q.answer?"0 0 0 3px rgba(74,222,128,0.2)":
                revealed&&chosen===oi&&oi!==q.answer?"0 0 0 3px rgba(248,113,113,0.2)":"none",
              transition:"all 0.15s",
            }}>
              <span style={{width:28,height:28,borderRadius:"50%",display:"flex",alignItems:"center",justifyContent:"center",
                flexShrink:0,fontSize:13,fontWeight:700,
                background: revealed&&oi===q.answer?"#4ade80": revealed&&chosen===oi?"#f87171" : "#f1f5f9",
                color: revealed&&(oi===q.answer||chosen===oi)?"#fff":"#64748b"
              }}>
                {icon || String.fromCharCode(65+oi)}
              </span>
              {opt}
            </button>
          );
        })}
      </div>

      {revealed && (
        <div style={{marginTop:16,padding:"12px 16px",borderRadius:10,
          background: chosen===q.answer?"#f0fdf4":"#fffbeb",
          border:`1px solid ${chosen===q.answer?"#4ade80":"#fcd34d"}`,
          fontSize:13,color:"#334155"
        }}>
          <span style={{fontWeight:700}}>{chosen===q.answer?"🎉 Correct! ":"💡 Not quite — "}</span>
          {q.explain}
        </div>
      )}

      {revealed && (
        <button onClick={next} style={{
          marginTop:16,padding:"11px 28px",borderRadius:99,fontSize:14,fontWeight:700,
          background:"linear-gradient(135deg,#6d28d9,#818cf8)",color:"#fff",border:"none",cursor:"pointer",
          boxShadow:"0 4px 14px rgba(109,40,217,0.35)",transition:"transform 0.1s",
        }}>
          {isLast ? "Finish ✓" : "Next Question →"}
        </button>
      )}
    </div>
  );
}

// ─────────────────────────────────── FILL-IN-BLANK ───────────────────────────────────
function FillInLesson({ lesson, onComplete }) {
  const [inputs, setInputs] = useState({});
  const [revealed, setRevealed] = useState(false);

  const allFilled = lesson.questions.every((_,i) => inputs[i]?.trim());

  function handleSubmit() {
    setRevealed(true);
    const score = lesson.questions.filter((q,i) =>
      (inputs[i]||"").trim().toLowerCase() === q.answer.toLowerCase()
    ).length;
    setTimeout(() => onComplete(score >= Math.ceil(lesson.questions.length * 0.67)), 1200);
  }

  return (
    <div>
      {lesson.questions.map((q,i)=>{
        const correct = revealed && (inputs[i]||"").trim().toLowerCase() === q.answer.toLowerCase();
        const wrong = revealed && !correct;
        return (
          <div key={i} style={{marginBottom:22,padding:"16px 18px",borderRadius:12,
            background: !revealed?"#f8faff": correct?"#f0fdf4":"#fef2f2",
            border:`1.5px solid ${!revealed?"#e2e8f0":correct?"#4ade80":"#f87171"}`,
            transition:"all 0.3s"
          }}>
            <p style={{fontSize:15,fontWeight:600,color:"#1e293b",margin:"0 0 10px",lineHeight:1.5}}>
              {i+1}. {q.q}
            </p>
            <input
              value={inputs[i]||""}
              onChange={e => !revealed && setInputs(prev=>({...prev,[i]:e.target.value}))}
              placeholder={revealed?"":q.hint}
              readOnly={revealed}
              style={{
                width:"100%",padding:"10px 14px",borderRadius:8,fontSize:14,fontWeight:600,
                border:`1.5px solid ${!revealed?"#cbd5e1":correct?"#4ade80":"#f87171"}`,
                background: !revealed?"#fff": correct?"#f0fdf4":"#fef2f2",
                color: !revealed?"#1e293b": correct?"#166534":"#991b1b",
                outline:"none",boxSizing:"border-box",
              }}
            />
            {revealed && (
              <p style={{margin:"6px 0 0",fontSize:13,color:correct?"#166534":"#991b1b",fontWeight:600}}>
                {correct ? "✓ Correct!" : `✗ Answer: ${q.answer}`}
              </p>
            )}
          </div>
        );
      })}

      {!revealed && (
        <button onClick={allFilled?handleSubmit:undefined} style={{
          padding:"11px 28px",borderRadius:99,fontSize:14,fontWeight:700,border:"none",
          background:allFilled?"linear-gradient(135deg,#6d28d9,#818cf8)":"#e2e8f0",
          color:allFilled?"#fff":"#94a3b8",cursor:allFilled?"pointer":"not-allowed",
          boxShadow:allFilled?"0 4px 14px rgba(109,40,217,0.35)":"none",
        }}>Check Answers →</button>
      )}
    </div>
  );
}

// ─────────────────────────────────── LEARN CARD ───────────────────────────────────
function LearnCard({ learn, onContinue }) {
  const [step, setStep] = useState(0);
  const total = 1 + learn.facts.length; // intro + facts

  return (
    <div>
      {step === 0 && (
        <div style={{textAlign:"center",padding:"8px 0"}}>
          <div style={{fontSize:56,marginBottom:12}}>{learn.icon}</div>
          <h3 style={{fontSize:20,fontWeight:800,color:"#1e293b",margin:"0 0 10px"}}>{learn.heading}</h3>
          <div style={{background:"#f0f4ff",borderRadius:12,padding:"16px 20px",marginBottom:16,textAlign:"left"}}>
            <p style={{fontSize:15,color:"#334155",margin:"0 0 10px",lineHeight:1.6,fontWeight:500}}>{learn.definition}</p>
            <div style={{display:"flex",gap:8,alignItems:"flex-start",padding:"10px 14px",background:"#fff",borderRadius:10,border:"1px solid #c7d2fe"}}>
              <span style={{fontSize:20,flexShrink:0}}>💡</span>
              <p style={{fontSize:13,color:"#4338ca",margin:0,lineHeight:1.5,fontStyle:"italic"}}>{learn.analogy}</p>
            </div>
          </div>
          {/* Visual key concepts */}
          <div style={{display:"flex",gap:8,flexWrap:"wrap",justifyContent:"center",marginBottom:16}}>
            {learn.visual.map((v,i)=>(
              <div key={i} style={{background:v.color,borderRadius:10,padding:"10px 14px",color:"#fff",minWidth:120,textAlign:"left"}}>
                <div style={{fontSize:13,fontWeight:800,marginBottom:3}}>{v.label}</div>
                <div style={{fontSize:11,opacity:0.85,lineHeight:1.4}}>{v.desc}</div>
              </div>
            ))}
          </div>
        </div>
      )}

      {step > 0 && step <= learn.facts.length && (
        <div style={{display:"flex",flexDirection:"column",gap:0}}>
          <div style={{textAlign:"center",marginBottom:20}}>
            <div style={{display:"inline-block",background:"#f0f4ff",borderRadius:99,padding:"4px 16px",fontSize:12,fontWeight:700,color:"#4338ca",marginBottom:12}}>
              FACT {step} OF {learn.facts.length}
            </div>
          </div>
          <div style={{display:"flex",flexDirection:"column",gap:10}}>
            {learn.facts.map((f,i)=>(
              <div key={i} style={{
                display:"flex",alignItems:"center",gap:14,padding:"14px 18px",borderRadius:12,
                background: i === (step-1) ? "#eef2ff":"#f8faff",
                border: i===(step-1)?"2px solid #818cf8":"1px solid #e2e8f0",
                transform: i===(step-1)?"scale(1.02)":"scale(1)",
                transition:"all 0.25s",opacity: i>(step-1)?0.4:1,
              }}>
                <span style={{fontSize:20,width:32,textAlign:"center",flexShrink:0}}>{f.icon}</span>
                <span style={{fontSize:14,color:"#334155",fontWeight: i===(step-1)?600:400,lineHeight:1.5}}>{f.text}</span>
                {i<(step-1) && <span style={{marginLeft:"auto",color:"#4ade80",fontSize:18,flexShrink:0}}>✓</span>}
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Progress dots */}
      <div style={{display:"flex",gap:6,margin:"20px 0 16px",justifyContent:"center"}}>
        {Array.from({length:total},(_,i)=>(
          <div key={i} style={{width:i===step?24:8,height:8,borderRadius:99,
            background:i<step?"#4ade80":i===step?"#6d28d9":"#e2e8f0",transition:"all 0.3s"}}/>
        ))}
      </div>

      <button onClick={()=>{ if(step<total-1) setStep(s=>s+1); else onContinue(); }} style={{
        width:"100%",padding:"13px",borderRadius:99,fontSize:15,fontWeight:700,
        background:"linear-gradient(135deg,#6d28d9,#818cf8)",color:"#fff",border:"none",cursor:"pointer",
        boxShadow:"0 4px 18px rgba(109,40,217,0.4)",letterSpacing:0.3,
      }}>
        {step < total-1 ? "Continue →" : "Start Exercise →"}
      </button>
    </div>
  );
}

// ─────────────────────────────────── LESSON MODAL ───────────────────────────────────
function LessonModal({ lesson, courseColor, onClose, onFinish }) {
  const [phase, setPhase] = useState("learn"); // learn | exercise | done
  const [confetti, setConfetti] = useState(false);
  const [xpPop, setXpPop] = useState(false);
  const [passed, setPassed] = useState(false);

  function handleExerciseComplete(success) {
    setPassed(success);
    setPhase("done");
    if (success) {
      setConfetti(true);
      setXpPop(true);
      setTimeout(() => setConfetti(false), 2500);
    }
  }

  return (
    <div style={{position:"fixed",inset:0,background:"rgba(15,23,42,0.8)",display:"flex",alignItems:"center",justifyContent:"center",zIndex:500,padding:16,backdropFilter:"blur(4px)"}}>
      <Confetti active={confetti} />
      <XPPop xp={lesson.xp} active={xpPop} />
      <div style={{background:"#fff",borderRadius:20,maxWidth:560,width:"100%",maxHeight:"92vh",overflow:"auto",boxShadow:"0 24px 60px rgba(0,0,0,0.35)"}}>
        {/* Modal header */}
        <div style={{background:`linear-gradient(135deg,${courseColor},${courseColor}dd)`,borderRadius:"20px 20px 0 0",padding:"18px 22px",color:"#fff",position:"sticky",top:0,zIndex:10}}>
          <div style={{display:"flex",alignItems:"center",justifyContent:"space-between",marginBottom:6}}>
            <div style={{display:"flex",alignItems:"center",gap:10}}>
              <span style={{fontSize:12,fontWeight:700,background:"rgba(255,255,255,0.2)",borderRadius:99,padding:"3px 10px",textTransform:"uppercase",letterSpacing:1}}>
                {phase==="learn"?"📖 Learn":phase==="exercise"?"🎮 Exercise":"🏆 Result"}
              </span>
              <span style={{fontSize:12,opacity:0.8}}>+{lesson.xp} XP · {lesson.duration}</span>
            </div>
            <button onClick={onClose} style={{background:"rgba(255,255,255,0.2)",border:"none",color:"#fff",width:30,height:30,borderRadius:"50%",cursor:"pointer",fontSize:16,display:"flex",alignItems:"center",justifyContent:"center"}}>✕</button>
          </div>
          <h2 style={{margin:0,fontSize:18,fontWeight:800,letterSpacing:"-0.3px"}}>{lesson.title}</h2>
        </div>

        {/* Modal body */}
        <div style={{padding:"22px"}}>
          {phase === "learn" && (
            <LearnCard learn={lesson.learn} onContinue={() => setPhase("exercise")} />
          )}

          {phase === "exercise" && (
            <>
              <div style={{display:"flex",alignItems:"center",gap:8,marginBottom:20,padding:"10px 14px",background:"#f0f4ff",borderRadius:10,border:"1px solid #c7d2fe"}}>
                <span style={{fontSize:18}}>🎮</span>
                <span style={{fontSize:13,fontWeight:600,color:"#4338ca"}}>Apply what you just learned — complete the exercise below!</span>
              </div>
              {lesson.type === "drag" && <DragDropLesson lesson={lesson} onComplete={handleExerciseComplete} />}
              {lesson.type === "mcq" && <MCQLesson lesson={lesson} onComplete={handleExerciseComplete} />}
              {lesson.type === "fillin" && <FillInLesson lesson={lesson} onComplete={handleExerciseComplete} />}
            </>
          )}

          {phase === "done" && (
            <div style={{textAlign:"center",padding:"20px 0"}}>
              <div style={{fontSize:64,marginBottom:12}}>{passed?"🏆":"💪"}</div>
              <h3 style={{fontSize:22,fontWeight:800,color:passed?"#166534":"#92400e",margin:"0 0 8px"}}>
                {passed ? "Lesson Complete!" : "Keep Going!"}
              </h3>
              <p style={{color:"#64748b",fontSize:15,margin:"0 0 20px",lineHeight:1.5}}>
                {passed
                  ? `You've earned +${lesson.xp} XP! Great work mastering "${lesson.title}".`
                  : "You completed the exercise. Review the lesson content and try again for full marks!"}
              </p>
              {passed && (
                <div style={{display:"inline-flex",alignItems:"center",gap:8,background:"linear-gradient(135deg,#fef9ef,#fffbeb)",border:"2px solid #fcd34d",borderRadius:12,padding:"12px 20px",marginBottom:20}}>
                  <span style={{fontSize:22}}>⚡</span>
                  <span style={{fontWeight:800,fontSize:18,color:"#92400e"}}>+{lesson.xp} XP earned!</span>
                </div>
              )}
              <button onClick={() => onFinish(passed)} style={{
                padding:"13px 36px",borderRadius:99,fontSize:15,fontWeight:700,border:"none",cursor:"pointer",
                background:passed?`linear-gradient(135deg,${courseColor},${courseColor}bb)`:"linear-gradient(135deg,#6d28d9,#818cf8)",
                color:"#fff",boxShadow:`0 4px 18px ${passed?courseColor:"rgba(109,40,217,0.4)"}88`,
              }}>
                {passed ? "Back to Course →" : "Try Again ↺"}
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

// ─────────────────────────────────── CERTIFICATE MODAL ───────────────────────────────────
function CertModal({ course, totalXP, onClose }) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [sending, setSending] = useState(false);
  const [status, setStatus] = useState(null);
  const [certID] = useState(certId);

  async function send() {
    if (!name.trim() || !email.trim() || !email.includes("@")) { setStatus("validation"); return; }
    setSending(true); setStatus(null);
    try {
      if (!window.emailjs) {
        await new Promise((res,rej)=>{const s=document.createElement("script");s.src="https://cdn.jsdelivr.net/npm/@emailjs/browser@3/dist/email.min.js";s.onload=res;s.onerror=rej;document.head.appendChild(s);});
        window.emailjs.init("VIB8bKSD-ZS3RCCHD");
      }
      await window.emailjs.send("service_4dt6s3i","template_wwdrjbl",{
        to_name: name,
        user_email: email,
        certificate_msg:
          `Congratulations ${name}!\n\n` +
          `You have successfully completed the course: ${course.title}\n` +
          `Certificate ID: ${certID}\n` +
          `Total XP Earned: ${totalXP} XP\n` +
          `Completion Date: ${formatDate(new Date())}\n\n` +
          `Download your certificate attached or via the portal.\n` +
          `If you don't see the email in your inbox, kindly check your Spam/Junk folder.\n` +
          `For assistance, contact support: 0549271528 or educationalcentremays@gmail.com.`
      },"VIB8bKSD-ZS3RCCHD");
      setStatus("success");
    } catch(e) { console.error(e); setStatus("error"); }
    finally { setSending(false); }
  }

  return (
    <div style={{position:"fixed",inset:0,background:"rgba(15,23,42,0.85)",display:"flex",alignItems:"center",justifyContent:"center",zIndex:600,padding:16,backdropFilter:"blur(6px)"}}>
      <div style={{background:"#fff",borderRadius:20,maxWidth:480,width:"100%",boxShadow:"0 24px 60px rgba(0,0,0,0.4)",overflow:"hidden"}}>
        {/* Header */}
        <div style={{background:`linear-gradient(135deg,${course.color},${course.color}aa)`,padding:"24px",textAlign:"center",color:"#fff"}}>
          <div style={{fontSize:52,marginBottom:8}}>🎓</div>
          <h2 style={{margin:"0 0 4px",fontSize:22,fontWeight:900}}>Certificate of Completion</h2>
          <p style={{margin:0,fontSize:14,opacity:0.85}}>{course.emoji} {course.title}</p>
        </div>

        {/* Certificate preview */}
        <div style={{margin:"20px",border:`3px double ${course.color}`,borderRadius:14,padding:"20px",background:`linear-gradient(135deg,${course.light},#fff)`,textAlign:"center"}}>
          <p style={{margin:"0 0 2px",fontSize:10,letterSpacing:"0.15em",color:"#94a3b8",textTransform:"uppercase",fontWeight:700}}>EDUCATIONAL CENTRE MAYS</p>
          <div style={{width:40,height:2,background:course.color,margin:"6px auto 10px"}}/>
          <p style={{margin:"0 0 3px",fontSize:12,color:"#64748b"}}>This certifies that</p>
          <p style={{margin:"0 0 3px",fontSize:20,fontWeight:900,color:course.color}}>{name||"[Your Name]"}</p>
          <p style={{margin:"0 0 3px",fontSize:12,color:"#64748b"}}>has successfully completed</p>
          <p style={{margin:"0 0 6px",fontSize:15,fontWeight:800,color:"#1e293b"}}>{course.title}</p>
          <div style={{display:"flex",justifyContent:"center",gap:16,fontSize:11,color:"#94a3b8",marginTop:10}}>
            <span>🏆 {totalXP} XP</span>
            <span>📅 {formatDate(new Date())}</span>
            <span>🔑 {certID}</span>
          </div>
        </div>

        <div style={{padding:"0 20px 20px"}}>
          <label style={{display:"block",fontSize:11,fontWeight:700,color:"#64748b",textTransform:"uppercase",letterSpacing:"0.05em",marginBottom:4}}>Your Full Name</label>
          <input value={name} onChange={e=>setName(e.target.value)} placeholder="e.g., Mrs. Jane Smith"
            style={{width:"100%",padding:"10px 14px",borderRadius:10,border:"1.5px solid #e2e8f0",fontSize:14,outline:"none",boxSizing:"border-box",marginBottom:12}}/>
          <label style={{display:"block",fontSize:11,fontWeight:700,color:"#64748b",textTransform:"uppercase",letterSpacing:"0.05em",marginBottom:4}}>Email Address</label>
          <input value={email} onChange={e=>setEmail(e.target.value)} placeholder="e.g., jane@school.edu.za" type="email"
            style={{width:"100%",padding:"10px 14px",borderRadius:10,border:"1.5px solid #e2e8f0",fontSize:14,outline:"none",boxSizing:"border-box",marginBottom:14}}/>

          {status==="validation" && <div style={{padding:"10px 14px",background:"#fef2f2",border:"1px solid #f87171",borderRadius:8,fontSize:13,color:"#991b1b",marginBottom:12}}>Please enter your full name and a valid email address.</div>}
          {status==="success" && <div style={{padding:"10px 14px",background:"#f0fdf4",border:"1px solid #4ade80",borderRadius:8,fontSize:13,color:"#166534",marginBottom:12}}>✅ Certificate sent! Check your inbox (and spam folder).</div>}
          {status==="error" && <div style={{padding:"10px 14px",background:"#fef2f2",border:"1px solid #f87171",borderRadius:8,fontSize:13,color:"#991b1b",marginBottom:12}}>❌ Failed to send. Try again or contact: 0549271528</div>}

          <div style={{display:"flex",gap:10}}>
            <button onClick={send} disabled={sending} style={{
              flex:1,padding:"12px",borderRadius:99,fontSize:14,fontWeight:700,border:"none",cursor:sending?"not-allowed":"pointer",
              background:`linear-gradient(135deg,${course.color},${course.color}99)`,color:"#fff",opacity:sending?0.7:1,
              boxShadow:`0 4px 14px ${course.color}55`,
            }}>{sending?"Sending…":"📧 Send My Certificate"}</button>
            <button onClick={onClose} style={{padding:"12px 18px",borderRadius:99,fontSize:14,fontWeight:600,border:"1.5px solid #e2e8f0",background:"#fff",color:"#64748b",cursor:"pointer"}}>Close</button>
          </div>
        </div>
      </div>
    </div>
  );
}

// ─────────────────────────────────── COURSE VIEW ───────────────────────────────────
function CourseView({ course, progress, onUpdateProgress, onBack }) {
  const [activeLesson, setActiveLesson] = useState(null);
  const [showCert, setShowCert] = useState(false);

  const completedIds = Object.keys(progress).filter(k => progress[k]?.done && k.startsWith(course.id[0]));
  const completedCount = course.lessons.filter(l => progress[l.id]?.done).length;
  const totalCount = course.lessons.length;
  const pct = Math.round(completedCount/totalCount*100);
  const totalXP = course.lessons.filter(l=>progress[l.id]?.done).reduce((s,l)=>s+l.xp,0);
  const allDone = completedCount === totalCount;

  function handleFinish(passed) {
    if (passed && activeLesson) {
      onUpdateProgress(activeLesson.id, { done: true });
    }
    setActiveLesson(null);
  }

  return (
    <div>
      {/* Course hero */}
      <div style={{borderRadius:16,background:`linear-gradient(135deg,${course.color},${course.color}cc)`,color:"#fff",padding:"24px 24px 20px",marginBottom:20,position:"relative",overflow:"hidden"}}>
        <div style={{position:"absolute",right:-20,top:-20,fontSize:100,opacity:0.12,userSelect:"none"}}>{course.emoji}</div>
        <button onClick={onBack} style={{background:"rgba(255,255,255,0.2)",border:"none",color:"#fff",padding:"6px 14px",borderRadius:99,fontSize:13,fontWeight:600,cursor:"pointer",marginBottom:12,display:"flex",alignItems:"center",gap:6}}>
          ← All Courses
        </button>
        <h1 style={{margin:"0 0 4px",fontSize:24,fontWeight:900,letterSpacing:"-0.5px"}}>{course.emoji} {course.title}</h1>
        <p style={{margin:"0 0 16px",fontSize:14,opacity:0.85}}>{course.tagline}</p>
        <div style={{display:"flex",gap:16,flexWrap:"wrap",fontSize:13,fontWeight:600,opacity:0.9}}>
          <span>📚 {totalCount} lessons</span>
          <span>⚡ {course.lessons.reduce((s,l)=>s+l.xp,0)} total XP</span>
          <span>⏱ ~{totalCount*6} minutes</span>
        </div>
      </div>

      {/* Progress */}
      <div style={{background:"#fff",borderRadius:14,padding:"18px 20px",marginBottom:20,boxShadow:"0 1px 4px rgba(0,0,0,0.06)",border:"1px solid #f1f5f9"}}>
        <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:10,flexWrap:"wrap",gap:10}}>
          <div>
            <span style={{fontSize:15,fontWeight:700,color:"#1e293b"}}>{pct===100?"🎉 Course Complete!":"Your Progress"}</span>
            <span style={{fontSize:13,color:"#64748b",marginLeft:10}}>{completedCount}/{totalCount} lessons · {totalXP} XP</span>
          </div>
          <span style={{fontSize:22,fontWeight:900,color:course.color}}>{pct}%</span>
        </div>
        <div style={{height:12,background:"#f1f5f9",borderRadius:99,overflow:"hidden"}}>
          <div style={{height:"100%",width:`${pct}%`,background:`linear-gradient(90deg,${course.color},${course.color}99)`,borderRadius:99,transition:"width 0.5s ease"}}/>
        </div>
        {allDone && (
          <button onClick={() => setShowCert(true)} style={{
            marginTop:14,width:"100%",padding:"13px",borderRadius:99,fontSize:15,fontWeight:700,border:"none",cursor:"pointer",
            background:`linear-gradient(135deg,${course.color},${course.color}bb)`,color:"#fff",
            boxShadow:`0 4px 18px ${course.color}55`,animation:"pulse 2s infinite",
          }}>
            🎓 Claim Your Certificate!
            <style>{`@keyframes pulse{0%,100%{box-shadow:0 4px 18px ${course.color}55}50%{box-shadow:0 4px 28px ${course.color}99}}`}</style>
          </button>
        )}
        {!allDone && (
          <p style={{fontSize:12,color:"#94a3b8",margin:"8px 0 0"}}>Complete all {totalCount} lessons to unlock your certificate.</p>
        )}
      </div>

      {/* Lesson list */}
      <div style={{display:"flex",flexDirection:"column",gap:10}}>
        {course.lessons.map((lesson, i) => {
          const done = progress[lesson.id]?.done;
          const prevDone = i===0 || progress[course.lessons[i-1].id]?.done;
          const locked = !prevDone && !done;
          return (
            <div key={lesson.id}
              onClick={() => !locked && setActiveLesson(lesson)}
              style={{
                display:"flex",alignItems:"center",gap:14,padding:"16px 18px",
                background:"#fff",borderRadius:14,border:`1.5px solid ${done?course.color+"44":"#f1f5f9"}`,
                cursor:locked?"not-allowed":"pointer",
                opacity:locked?0.5:1,
                boxShadow:done?`0 0 0 2px ${course.color}22`:"0 1px 4px rgba(0,0,0,0.05)",
                transition:"all 0.2s",
              }}
              onMouseEnter={e=>{ if(!locked) e.currentTarget.style.transform="translateY(-1px)"; e.currentTarget.style.boxShadow=done?`0 4px 12px ${course.color}33`:"0 4px 12px rgba(0,0,0,0.08)"; }}
              onMouseLeave={e=>{ e.currentTarget.style.transform="translateY(0)"; e.currentTarget.style.boxShadow=done?`0 0 0 2px ${course.color}22`:"0 1px 4px rgba(0,0,0,0.05)"; }}
            >
              {/* Status icon */}
              <div style={{width:44,height:44,borderRadius:12,display:"flex",alignItems:"center",justifyContent:"center",fontSize:20,flexShrink:0,
                background:done?course.color:locked?"#f1f5f9":"linear-gradient(135deg,"+course.color+"22,"+course.color+"11)",
                color:done?"#fff":locked?"#cbd5e1":course.color,
              }}>
                {done?"✓":locked?"🔒":i+1}
              </div>
              <div style={{flex:1,minWidth:0}}>
                <p style={{margin:"0 0 3px",fontSize:14,fontWeight:700,color:locked?"#94a3b8":"#1e293b"}}>{lesson.title}</p>
                <div style={{display:"flex",gap:10,fontSize:12,color:"#94a3b8"}}>
                  <span>⚡ {lesson.xp} XP</span>
                  <span>⏱ {lesson.duration}</span>
                  <span style={{textTransform:"capitalize",color:lesson.type==="drag"?"#7c3aed":lesson.type==="mcq"?"#059669":"#0284c7",fontWeight:600}}>
                    {lesson.type==="drag"?"🧩 Drag & Drop":lesson.type==="mcq"?"✅ Quiz":"📝 Fill-in"}
                  </span>
                </div>
              </div>
              {!locked && !done && (
                <div style={{width:32,height:32,borderRadius:"50%",background:course.color,display:"flex",alignItems:"center",justifyContent:"center",color:"#fff",fontSize:14,flexShrink:0}}>▶</div>
              )}
            </div>
          );
        })}
      </div>

      {activeLesson && (
        <LessonModal lesson={activeLesson} courseColor={course.color} onClose={()=>setActiveLesson(null)} onFinish={handleFinish} />
      )}
      {showCert && (
        <CertModal course={course} totalXP={totalXP} onClose={()=>setShowCert(false)} />
      )}
    </div>
  );
}

// ─────────────────────────────────── HOME / COURSE SELECTION ───────────────────────────────────
function HomePage({ progress, onSelect }) {
  const totalXP = Object.keys(progress).filter(k=>progress[k]?.done).reduce((s,k)=>{
    for(const c of COURSES){ const l=c.lessons.find(l=>l.id===k); if(l) return s+l.xp; } return s;
  },0);
  const totalDone = Object.keys(progress).filter(k=>progress[k]?.done).length;

  return (
    <div>
      {/* Hero */}
      <div style={{background:"linear-gradient(135deg,#1e1b4b,#3730a3)",borderRadius:20,padding:"28px 24px 24px",marginBottom:24,color:"#fff",position:"relative",overflow:"hidden"}}>
        <div style={{position:"absolute",right:-30,bottom:-30,fontSize:140,opacity:0.06,userSelect:"none"}}>🎓</div>
        <h1 style={{margin:"0 0 6px",fontSize:26,fontWeight:900,letterSpacing:"-0.5px"}}>👋 Welcome, Teacher!</h1>
        <p style={{margin:"0 0 20px",fontSize:15,opacity:0.8,lineHeight:1.5}}>Learn essential digital skills through fun, bite-sized interactive lessons.</p>
        <div style={{display:"flex",gap:14,flexWrap:"wrap"}}>
          {[
            {icon:"⚡",label:"Total XP",val:totalXP},
            {icon:"✅",label:"Lessons Done",val:totalDone},
            {icon:"📚",label:"Courses",val:COURSES.length},
          ].map((s,i)=>(
            <div key={i} style={{background:"rgba(255,255,255,0.12)",borderRadius:12,padding:"10px 16px",backdropFilter:"blur(8px)"}}>
              <div style={{fontSize:20,marginBottom:2}}>{s.icon}</div>
              <div style={{fontSize:20,fontWeight:900}}>{s.val}</div>
              <div style={{fontSize:11,opacity:0.7}}>{s.label}</div>
            </div>
          ))}
        </div>
      </div>

      <h2 style={{fontSize:18,fontWeight:800,color:"#1e293b",marginBottom:14,marginTop:0}}>Choose a Course</h2>

      <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fill,minmax(260px,1fr))",gap:14}}>
        {COURSES.map(course=>{
          const done = course.lessons.filter(l=>progress[l.id]?.done).length;
          const pct = Math.round(done/course.lessons.length*100);
          const xpEarned = course.lessons.filter(l=>progress[l.id]?.done).reduce((s,l)=>s+l.xp,0);
          return (
            <div key={course.id} onClick={()=>onSelect(course)}
              style={{
                background:"#fff",borderRadius:16,padding:"20px",cursor:"pointer",
                border:`1.5px solid ${pct===100?course.color+"66":"#f1f5f9"}`,
                boxShadow:pct===100?`0 0 0 2px ${course.color}33,0 4px 16px ${course.color}22`:"0 2px 8px rgba(0,0,0,0.05)",
                transition:"all 0.2s",
              }}
              onMouseEnter={e=>{ e.currentTarget.style.transform="translateY(-3px)"; e.currentTarget.style.boxShadow=`0 8px 24px ${course.color}33`; }}
              onMouseLeave={e=>{ e.currentTarget.style.transform="translateY(0)"; e.currentTarget.style.boxShadow=pct===100?`0 0 0 2px ${course.color}33,0 4px 16px ${course.color}22`:"0 2px 8px rgba(0,0,0,0.05)"; }}
            >
              <div style={{display:"flex",alignItems:"center",justifyContent:"space-between",marginBottom:12}}>
                <div style={{width:50,height:50,borderRadius:14,background:`linear-gradient(135deg,${course.color},${course.color}bb)`,display:"flex",alignItems:"center",justifyContent:"center",fontSize:26}}>
                  {course.emoji}
                </div>
                {pct===100 && <span style={{fontSize:11,fontWeight:700,background:`${course.color}22`,color:course.color,padding:"4px 10px",borderRadius:99}}>✓ Complete</span>}
                {pct>0&&pct<100 && <span style={{fontSize:11,fontWeight:700,background:"#fef9ef",color:"#92400e",padding:"4px 10px",borderRadius:99}}>{pct}% done</span>}
              </div>
              <h3 style={{margin:"0 0 4px",fontSize:16,fontWeight:800,color:"#1e293b"}}>{course.title}</h3>
              <p style={{margin:"0 0 14px",fontSize:13,color:"#64748b",lineHeight:1.4}}>{course.tagline}</p>
              <div style={{display:"flex",gap:10,fontSize:12,color:"#94a3b8",marginBottom:10}}>
                <span>📚 {course.lessons.length} lessons</span>
                <span>⚡ {course.lessons.reduce((s,l)=>s+l.xp,0)} XP</span>
              </div>
              {/* Mini progress */}
              <div style={{height:6,background:"#f1f5f9",borderRadius:99,overflow:"hidden"}}>
                <div style={{height:"100%",width:`${pct}%`,background:`linear-gradient(90deg,${course.color},${course.color}88)`,borderRadius:99,transition:"width 0.5s"}}/>
              </div>
              <div style={{display:"flex",justifyContent:"space-between",marginTop:4,fontSize:11,color:"#94a3b8"}}>
                <span>{done}/{course.lessons.length} lessons</span>
                {xpEarned>0 && <span style={{color:course.color,fontWeight:700}}>⚡ {xpEarned} XP earned</span>}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

// ─────────────────────────────────── ROOT ───────────────────────────────────
export default function TeacherTrainingPortal() {
  const [selectedCourse, setSelectedCourse] = useState(null);
  const [progress, setProgress] = useState({});

  // Load from localStorage
  useEffect(() => {
    try {
      const saved = JSON.parse(localStorage.getItem("ecm_progress_v2")||"{}");
      setProgress(saved);
      const savedCourse = localStorage.getItem("ecm_course_v2");
      if (savedCourse) {
        const c = COURSES.find(c=>c.id===savedCourse);
        if (c) setSelectedCourse(c);
      }
    } catch(_){}
  },[]);

  // Persist to localStorage
  useEffect(() => {
    localStorage.setItem("ecm_progress_v2", JSON.stringify(progress));
  },[progress]);
  useEffect(() => {
    if (selectedCourse) localStorage.setItem("ecm_course_v2", selectedCourse.id);
    else localStorage.removeItem("ecm_course_v2");
  },[selectedCourse]);

  function handleUpdateProgress(lessonId, data) {
    setProgress(prev => ({ ...prev, [lessonId]: data }));
  }

  return (
    <div style={{fontFamily:"'Segoe UI','Helvetica Neue',Arial,sans-serif",background:"#f8faff",minHeight:"100vh",color:"#1e293b"}}>
      {/* Top nav */}
      <header style={{background:"#fff",borderBottom:"1px solid #f1f5f9",position:"sticky",top:0,zIndex:100,boxShadow:"0 1px 8px rgba(0,0,0,0.06)"}}>
        <div style={{maxWidth:960,margin:"0 auto",padding:"12px 16px",display:"flex",alignItems:"center",justifyContent:"space-between",gap:12}}>
          <div style={{display:"flex",alignItems:"center",gap:10}}>
            <div style={{width:38,height:38,borderRadius:10,background:"linear-gradient(135deg,#3730a3,#6d28d9)",display:"flex",alignItems:"center",justifyContent:"center",fontSize:20}}>🎓</div>
            <div>
              <div style={{fontSize:15,fontWeight:800,color:"#1e293b",lineHeight:1}}>ECM Training Portal</div>
              <div style={{fontSize:11,color:"#94a3b8"}}>Educational Centre Mays</div>
            </div>
          </div>
          {/* XP badge */}
          <div style={{display:"flex",alignItems:"center",gap:6,background:"linear-gradient(135deg,#fef9ef,#fffbeb)",border:"1.5px solid #fcd34d",borderRadius:99,padding:"6px 14px"}}>
            <span style={{fontSize:14}}>⚡</span>
            <span style={{fontSize:13,fontWeight:800,color:"#92400e"}}>
              {Object.keys(progress).filter(k=>progress[k]?.done).reduce((s,k)=>{ for(const c of COURSES){const l=c.lessons.find(l=>l.id===k);if(l)return s+l.xp;} return s; },0)} XP
            </span>
          </div>
        </div>
      </header>

      {/* Main content */}
      <main style={{maxWidth:960,margin:"0 auto",padding:"20px 16px 40px"}}>
        {!selectedCourse ? (
          <HomePage progress={progress} onSelect={setSelectedCourse} />
        ) : (
          <CourseView
            course={selectedCourse}
            progress={progress}
            onUpdateProgress={handleUpdateProgress}
            onBack={() => setSelectedCourse(null)}
          />
        )}
      </main>
    </div>
  );
}
