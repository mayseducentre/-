import React, { useState, useEffect } from 'react';

const WordTrain = () => {
  // ==================== STATE MANAGEMENT ====================
  
  // Core navigation state
  const [currentView, setCurrentView] = useState('home'); // home, level, lesson, quiz, certificate
  const [currentLevel, setCurrentLevel] = useState(null);
  const [currentLessonIndex, setCurrentLessonIndex] = useState(0);
  
  // Progress tracking state
  const [progress, setProgress] = useState({
    completedLessons: [],
    completedQuizzes: [],
    completedPracticals: [],
    unlockedLevels: [0], // Foundation unlocked by default
    points: 0,
    badges: [],
    typingStats: {
      accuracy: 0,
      speed: 0,
      practiceCount: 0
    }
  });
  
  // Lesson interaction state
  const [typingText, setTypingText] = useState('');
  const [formattingState, setFormattingState] = useState({
    bold: false,
    italic: false,
    underline: false,
    align: 'left',
    fontSize: '12pt',
    lineSpacing: '1.0'
  });
  
  // Quiz state
  const [quizAnswers, setQuizAnswers] = useState({});
  const [quizSubmitted, setQuizSubmitted] = useState(false);
  const [quizScore, setQuizScore] = useState(0);
  
  // Certificate form state
  const [certificateForm, setCertificateForm] = useState({
    name: '',
    email: '',
    feedback: ''
  });
  const [formSubmitted, setFormSubmitted] = useState(false);
  
  // UI state
  const [showResetConfirm, setShowResetConfirm] = useState(false);
  const [saveIndicator, setSaveIndicator] = useState(false);
  const [expandedSections, setExpandedSections] = useState({});

  // ==================== COURSE CONTENT STRUCTURE ====================
  
  const levels = [
    {
      id: 0,
      title: 'Foundation: Typing & Core Word Skills',
      description: 'Master professional typing discipline and essential Word functions for efficient document creation',
      badge: '⌨️ Typing Foundation Master',
      pointsRequired: 0,
      lessons: [
        {
          id: 'f1',
          title: 'Professional Typing Posture & Discipline',
          goal: 'Develop efficient typing habits that increase speed and reduce errors',
          content: {
            introduction: 'As educators, we type constantly—reports, lesson plans, exam papers. Yet many teachers never learned proper typing discipline. This lesson establishes the foundation for professional-level document creation.',
            actionCards: [
              {
                title: 'Proper Sitting Position',
                description: 'Feet flat on floor, back straight, screen at eye level. Arms at 90-degree angle. This isn\'t just comfort—it\'s productivity. Poor posture leads to fatigue and errors after 30 minutes of typing.',
                example: 'When creating a 10-question exam, proper posture means you maintain accuracy throughout, not just the first few questions.'
              },
              {
                title: 'Home Row Discipline',
                description: 'Left fingers: A S D F | Right fingers: J K L ; This is non-negotiable for speed. Your fingers should return here automatically after every keystroke.',
                example: 'Professional typists don\'t look at keyboards. Neither should exam creators who need to focus on question quality, not key hunting.'
              },
              {
                title: 'The 10-Finger Method',
                description: 'Each finger has assigned keys. Index fingers handle 6 keys each, middle fingers 2 each, ring fingers 2 each, pinkies handle remaining keys plus modifiers (Shift, Ctrl).',
                example: 'When typing "Question 1a)", your fingers should flow naturally without repositioning your hands.'
              },
              {
                title: 'Error Correction Strategy',
                description: 'Don\'t stop mid-word to correct. Finish the word, then use Ctrl+Backspace (PC) to delete the entire word and retype. This maintains flow and builds muscle memory.',
                example: 'If you mistype "photosynthesis" in an exam question, completing the word before correcting trains your brain to type it correctly next time.'
              }
            ],
            mobileVsPc: {
              pc: 'Use all 10 fingers. Never look at keyboard. Ctrl+Backspace deletes words. Ctrl+Z undoes mistakes. Tab key for indentation.',
              mobile: 'Two thumbs on phone, swipe typing for speed. Use autocorrect wisely but review—it often changes "marks" to "marks" incorrectly in context. Landscape mode for longer documents.'
            },
            practiceExercise: {
              instruction: 'Type the following paragraph exactly as shown. Focus on accuracy over speed. Use proper finger positioning.',
              text: 'The examination will consist of three sections. Section A contains multiple choice questions worth twenty marks. Section B requires short structured responses totaling thirty marks. Section C presents two essay questions from which students must choose one, worth fifty marks. Total examination time is three hours.',
              targetAccuracy: 95,
              why: 'This is a typical exam instruction paragraph. You\'ll type similar text dozens of times per term. Mastering this structure saves hours.'
            }
          },
          quiz: {
            questions: [
              {
                q: 'What is the primary benefit of returning to home row position after each keystroke?',
                options: ['Faster typing speed', 'Consistent accuracy and reduced errors', 'Easier to remember', 'Looks professional'],
                correct: 1
              },
              {
                q: 'When should you correct a typing error while creating an exam paper?',
                options: ['Immediately as it happens', 'After completing the word or sentence', 'After finishing the entire document', 'Never—use spell check later'],
                correct: 1
              },
              {
                q: 'On mobile devices, what is the recommended typing approach for longer documents?',
                options: ['Single finger typing', 'Two-thumb typing in landscape mode', 'Voice typing only', 'Avoid mobile entirely'],
                correct: 1
              },
              {
                q: 'Which key combination deletes an entire word on PC?',
                options: ['Ctrl+Delete', 'Ctrl+Backspace', 'Alt+Backspace', 'Shift+Delete'],
                correct: 1
              }
            ]
          }
        },
        {
          id: 'f2',
          title: 'Paragraph Control & Text Formatting Fundamentals',
          goal: 'Master precise paragraph formatting essential for professional exam papers and academic documents',
          content: {
            introduction: 'Inconsistent paragraph formatting is the #1 sign of amateur document creation. Professional exam papers have uniform spacing, alignment, and structure. This lesson teaches you to control every aspect of paragraph presentation.',
            actionCards: [
              {
                title: 'Line Spacing Mastery',
                description: 'Single spacing (1.0) for exam questions. 1.15 or 1.5 for reading passages. Double spacing (2.0) for student answer spaces. Never press Enter multiple times to create space—use paragraph spacing settings.',
                example: 'Exam question: 1.0 spacing. Followed by: "Write your answer here:" with 2.0 spacing below = professional exam format.'
              },
              {
                title: 'Paragraph Spacing vs Line Breaks',
                description: 'Paragraph spacing (Before: 0pt, After: 6pt or 12pt) creates consistent gaps between questions. Pressing Enter creates a new paragraph. Pressing Shift+Enter creates a line break within the same paragraph.',
                example: 'Question 1a) [Enter] Question 1b) = proper spacing. Question 1a) [Enter][Enter][Enter] Question 1b) = amateur formatting that breaks during edits.'
              },
              {
                title: 'Indentation Control',
                description: 'First line indent: 0.5 inches for essay-style text. Hanging indent: for numbered lists and bibliographies. Left indent: for block quotes. Never use spacebar to indent—use the ruler or paragraph settings.',
                example: 'Multiple choice options should use hanging indent so "A)" aligns left and text wraps underneath beautifully.'
              },
              {
                title: 'Alignment for Different Purposes',
                description: 'Left align: 99% of exam content. Center align: main titles only. Right align: marks indicators (e.g., "[10 marks]"). Justify: never for exams—creates uneven spacing that reduces readability.',
                example: 'Question text left-aligned, marks right-aligned on same line using Tab key, not spacebar.'
              }
            ],
            mobileVsPc: {
              pc: 'Format menu > Paragraph for spacing settings. Ruler shows indents visually. Ctrl+1 (single space), Ctrl+2 (double space), Ctrl+5 (1.5 spacing). Ctrl+E (center), Ctrl+L (left), Ctrl+R (right).',
              mobile: 'Tap where you want to format > Home tab > Paragraph section. Spacing and indent options available but less precise. For complex formatting, switch to PC.'
            },
            practiceExercise: {
              instruction: 'Format the following exam question using proper spacing and alignment. Question text should be left-aligned with 1.0 line spacing. Create appropriate space for student answers.',
              text: 'Section B: Short Answer Questions\n\nQuestion 1: Explain the process of photosynthesis, including the role of chlorophyll and the products formed. [6 marks]\n\n[Student answer space]\n\nQuestion 2: Describe three adaptations of desert plants that enable survival in arid conditions. [6 marks]',
              targetAccuracy: 90,
              why: 'This structure appears in every exam paper you create. Mastering it once saves formatting time on every assessment you design.'
            }
          },
          quiz: {
            questions: [
              {
                q: 'What is the professional way to create consistent space between exam questions?',
                options: ['Press Enter multiple times', 'Use paragraph spacing (Before/After)', 'Add blank lines', 'Use page breaks'],
                correct: 1
              },
              {
                q: 'When should you use double spacing (2.0) in an exam paper?',
                options: ['For all text', 'For question text', 'For student answer spaces', 'Never'],
                correct: 2
              },
              {
                q: 'What is the correct tool for creating first-line indents in paragraphs?',
                options: ['Spacebar', 'Tab key', 'Paragraph settings or ruler', 'Multiple spaces'],
                correct: 2
              },
              {
                q: 'How do you align marks indicators (e.g., "[10 marks]") to the right while keeping question text left-aligned?',
                options: ['Use spaces until it reaches the right', 'Use Tab key', 'Right-align the entire line', 'Create a table'],
                correct: 1
              },
              {
                q: 'What is the difference between pressing Enter and Shift+Enter?',
                options: ['No difference', 'Enter creates a new paragraph; Shift+Enter creates a line break', 'Shift+Enter creates more space', 'Enter is for PC, Shift+Enter is for mobile'],
                correct: 1
              }
            ]
          }
        },
        {
          id: 'f3',
          title: 'Font Selection & Text Emphasis for Academic Documents',
          goal: 'Choose appropriate fonts and apply emphasis correctly for professional, readable exam papers',
          content: {
            introduction: 'Font choice affects readability, professionalism, and even student performance. Comic Sans on an exam paper signals lack of seriousness. Times New Roman in 10pt strains eyes. This lesson teaches professional font discipline.',
            actionCards: [
              {
                title: 'Professional Font Selection',
                description: 'For exam papers: Calibri 11pt or Arial 11pt (modern, clear). Times New Roman 12pt (traditional, formal). Never: Comic Sans, Papyrus, decorative fonts. Font size: 11-12pt for questions, 10pt for instructions, 14-16pt for section headings.',
                example: 'National exam boards use Calibri or Arial for a reason—maximum readability under exam pressure. Your school exams should match this standard.'
              },
              {
                title: 'Bold vs Italic vs Underline',
                description: 'Bold: Section headings, question numbers, key terms students must notice. Italic: Book titles, emphasis words, instructions in brackets. Underline: Avoid—it\'s outdated and harder to read. Use bold or italic instead.',
                example: 'Question 1: (Key term in bold) Explain the concept of photosynthesis (photosynthesis in italic or bold). Instruction: (Refer to Figure 1) in italic.'
              },
              {
                title: 'Consistency is Professionalism',
                description: 'If Question 1 is bold, all questions must be bold. If scientific terms are italic, all must be italic throughout. Inconsistency looks careless and confuses students about what\'s important.',
                example: 'Amateur: Question 1 bold, Question 2 not bold, Question 3 underlined. Professional: All questions formatted identically.'
              },
              {
                title: 'Font Changes for Purpose',
                description: 'Main text: one font throughout. Code/formulas: Courier New or Consolas (monospace). Quotations: can be italic in same font. Never mix Arial and Times New Roman in the same document without clear purpose.',
                example: 'Chemistry exam: normal text in Arial, chemical formulas in Courier New for clarity: H₂O, NaCl, etc.'
              }
            ],
            mobileVsPc: {
              pc: 'Ctrl+B (bold), Ctrl+I (italic), Ctrl+U (underline). Font dropdown in Home tab. Select text first, then format. Keyboard shortcuts faster than mouse clicks.',
              mobile: 'Select text > Home tab > Font section. Tap B, I, U buttons. Font selection in dropdown. Formatting persists for new text until you turn it off.'
            },
            practiceExercise: {
              instruction: 'Format this exam section header and questions with appropriate font emphasis. Make section title bold and larger. Question numbers bold. Key scientific terms italic.',
              text: 'Section A: Multiple Choice Questions\n\nQuestion 1: Which organelle is responsible for cellular respiration?\nA) Nucleus\nB) Mitochondria\nC) Ribosome\nD) Chloroplast\n\nQuestion 2: The process of photosynthesis occurs primarily in which part of the plant cell?',
              targetAccuracy: 85,
              why: 'Proper text emphasis guides students\' attention to important elements and makes exams easier to navigate under time pressure.'
            }
          },
          quiz: {
            questions: [
              {
                q: 'What is the recommended font size for exam question text?',
                options: ['9-10pt', '11-12pt', '14-16pt', '18-20pt'],
                correct: 1
              },
              {
                q: 'Which font formatting should be avoided in professional exam papers?',
                options: ['Bold for headings', 'Italic for emphasis', 'Underline for emphasis', 'Arial or Calibri'],
                correct: 2
              },
              {
                q: 'When should you use italic formatting in an exam paper?',
                options: ['For all important words', 'For book titles and emphasized terms', 'For student names', 'Never'],
                correct: 1
              },
              {
                q: 'What makes font usage "professional" in academic documents?',
                options: ['Using multiple decorative fonts', 'Consistent application throughout', 'Always using Times New Roman', 'Making everything bold'],
                correct: 1
              },
              {
                q: 'Which keyboard shortcut applies bold formatting on PC?',
                options: ['Ctrl+I', 'Ctrl+B', 'Ctrl+U', 'Alt+B'],
                correct: 1
              }
            ]
          }
        },
        {
          id: 'f4',
          title: 'Efficient Editing & Keyboard Shortcuts',
          goal: 'Increase document creation speed through essential keyboard shortcuts and efficient editing techniques',
          content: {
            introduction: 'Teachers who use only the mouse waste 30-40% of their document creation time. Professional educators use keyboard shortcuts to create exams in half the time with better accuracy. This is the efficiency gap between good and great exam creators.',
            actionCards: [
              {
                title: 'Essential Navigation Shortcuts',
                description: 'Ctrl+Home (start of document), Ctrl+End (end of document), Ctrl+Arrow keys (jump words), Home (start of line), End (end of line), Page Up/Down (screen at a time). Never scroll with mouse for navigation.',
                example: 'Creating a 50-question exam: jumping to the end with Ctrl+End is instant. Scrolling wastes 15 seconds every time you need to check total length.'
              },
              {
                title: 'Selection Speed Techniques',
                description: 'Shift+Arrow keys (select characters), Shift+Ctrl+Arrow (select words), Shift+Home/End (select to line start/end), Ctrl+A (select all), Click+Shift+Click (select between points).',
                example: 'Need to delete an entire question? Triple-click selects the paragraph instantly versus dragging mouse carefully across all text.'
              },
              {
                title: 'Editing Power Moves',
                description: 'Ctrl+X (cut), Ctrl+C (copy), Ctrl+V (paste), Ctrl+Z (undo—use fearlessly), Ctrl+Y (redo), Ctrl+F (find), Ctrl+H (find and replace). Find and Replace saves massive time in long exams.',
                example: 'Changed your mind about marks allocation? Ctrl+H to find "[5 marks]" and replace all with "[6 marks]" in 2 seconds versus manually editing 20 questions.'
              },
              {
                title: 'Time-Saving Formatting Shortcuts',
                description: 'Ctrl+B (bold), Ctrl+I (italic), Ctrl+U (underline), Ctrl+L/E/R (left/center/right align), Ctrl+1/2/5 (single/double/1.5 spacing), Ctrl+Shift+> or < (increase/decrease font size).',
                example: 'Formatting 15 section headings: Select, Ctrl+B, Ctrl+E takes 3 seconds per heading. Using mouse menus takes 10-15 seconds per heading.'
              },
              {
                title: 'The Undo Safety Net',
                description: 'Ctrl+Z is your experimentation friend. Try bold? Undo. Try center? Undo. This encourages quick decision-making instead of overthinking every format choice. Professional editors use Undo 50+ times per document.',
                example: 'Not sure if a table or list works better for a question? Try the table, Ctrl+Z if it doesn\'t work, try the list. Faster than debating mentally.'
              }
            ],
            mobileVsPc: {
              pc: 'Memorize Ctrl+Z, Ctrl+C, Ctrl+V, Ctrl+B, Ctrl+F at minimum. Build muscle memory through repetition. Keep hands on keyboard—every mouse movement is lost time.',
              mobile: 'Long-press text to select. Copy/Paste in context menu. Undo by shaking device (iOS) or tapping undo arrow. Shortcuts less critical on mobile but selection gestures matter.'
            },
            practiceExercise: {
              instruction: 'Using only keyboard shortcuts, perform these tasks on the text below: 1) Select all text, 2) Copy it, 3) Bold all question numbers, 4) Find and replace "five" with "six", 5) Undo the last change, 6) Redo it.',
              text: 'Question 1: Answer in five sentences. [5 marks]\nQuestion 2: Provide five examples. [5 marks]\nQuestion 3: Write five paragraphs. [5 marks]',
              targetAccuracy: 80,
              why: 'These shortcuts will save you 20+ hours per academic year. They transform exam creation from tedious to efficient.'
            }
          },
          quiz: {
            questions: [
              {
                q: 'Which keyboard shortcut takes you instantly to the end of a document?',
                options: ['Ctrl+Down', 'Page Down', 'Ctrl+End', 'Alt+End'],
                correct: 2
              },
              {
                q: 'What is the fastest way to select an entire paragraph?',
                options: ['Drag mouse across all text', 'Triple-click anywhere in the paragraph', 'Ctrl+A', 'Shift+End'],
                correct: 1
              },
              {
                q: 'How do you find and replace text throughout an entire document?',
                options: ['Ctrl+F', 'Ctrl+H', 'Ctrl+R', 'Alt+F'],
                correct: 1
              },
              {
                q: 'What does Ctrl+Z do, and why is it important for efficient editing?',
                options: ['Saves the document', 'Undoes last action, allowing risk-free experimentation', 'Closes the document', 'Zooms in'],
                correct: 1
              },
              {
                q: 'Which shortcut applies bold formatting?',
                options: ['Ctrl+I', 'Ctrl+B', 'Ctrl+U', 'Alt+B'],
                correct: 1
              },
              {
                q: 'How do you select from your current cursor position to the end of the line?',
                options: ['Ctrl+Shift+End', 'Shift+End', 'Ctrl+End', 'Alt+End'],
                correct: 1
              }
            ]
          }
        }
      ]
    },
    {
      id: 1,
      title: 'Professional Document Creation',
      description: 'Master advanced formatting, tables, styles, and templates for creating exam papers that meet professional standards',
      badge: '📄 Professional Document Designer',
      pointsRequired: 400,
      lessons: [
        {
          id: 'p1',
          title: 'Styles & Formatting Consistency',
          goal: 'Use Word Styles to ensure consistent formatting across entire exam papers and enable instant global changes',
          content: {
            introduction: 'Manually formatting every heading and paragraph is amateur hour. Professional documents use Styles—predefined formatting that applies to all similar elements at once. Change your mind about heading fonts? Update the style once, and 50 headings change instantly. This is exam moderator-level work.',
            actionCards: [
              {
                title: 'Understanding Built-in Styles',
                description: 'Word comes with Heading 1, Heading 2, Heading 3, Normal, Title styles. Heading 1: Main sections (Section A, Section B). Heading 2: Sub-sections. Heading 3: Question groups. Normal: question text. Never manually format headings—apply the style.',
                example: 'Section A: Multiple Choice = Heading 1 style. Instructions subsection = Heading 2 style. Questions = Normal style. Consistent every time.'
              },
              {
                title: 'Modifying Styles for Your Needs',
                description: 'Right-click style name > Modify. Change font, size, spacing, color—all instances update. Set "Update automatically" if you want future changes to apply everywhere. This is the power of professional document design.',
                example: 'Decide Heading 1 should be 16pt Arial Bold instead of 14pt? Modify the style once. All 5 section headings change instantly versus manually reformatting each one.'
              },
              {
                title: 'Creating Custom Styles',
                description: 'Format text exactly as desired > right-click selected text > "Styles" > "Create a Style". Name it (e.g., "Question Number" or "Answer Space"). Apply this style to all similar elements. Exam papers now have uniform professional appearance.',
                example: 'Create "Marks Indicator" style: 10pt italic, right-aligned. Apply to all "[X marks]" notations. Consistent marks display across 50 questions with one click per instance.'
              },
              {
                title: 'Style Benefits for Long Documents',
                description: 'Styles enable automatic table of contents, navigation pane organization, and consistent formatting across 20+ page exam papers. They also make documents accessible for students with visual needs (screen readers rely on heading styles).',
                example: 'A 15-page final exam with 6 sections: using styles means the navigation pane shows all sections as clickable links. Students (and you) can jump to any section instantly.'
              }
            ],
            mobileVsPc: {
              pc: 'Home tab > Styles gallery shows common styles. Click to apply. More styles via dropdown arrow. Right-click style name to modify. Styles pane (Ctrl+Alt+Shift+S) shows all available styles.',
              mobile: 'Home tab > Styles section. Limited style modification on mobile—apply existing styles only. For creating or modifying styles, use PC version.'
            },
            practiceExercise: {
              instruction: 'Apply appropriate styles to this exam structure. Use Heading 1 for sections, Heading 2 for subsections, Normal for questions. Notice how navigation becomes easier.',
              text: 'FINAL EXAMINATION: BIOLOGY\n\nSection A: Multiple Choice\nInstructions: Choose the best answer for each question.\n\nQuestion 1: Which organelle contains DNA?\nQuestion 2: What is the function of ribosomes?\n\nSection B: Short Answer\nInstructions: Answer all questions in the spaces provided.',
              targetAccuracy: 85,
              why: 'Styles are the difference between amateur-looking and professionally-formatted exam papers. Moderators can tell which exams used styles and which were manually formatted.'
            }
          },
          quiz: {
            questions: [
              {
                q: 'What is the primary advantage of using Word Styles instead of manual formatting?',
                options: ['Styles look better', 'Styles allow instant global formatting changes', 'Styles are easier to apply', 'Styles use less file space'],
                correct: 1
              },
              {
                q: 'Which style should be used for main section headings (Section A, Section B) in an exam paper?',
                options: ['Normal', 'Heading 1', 'Heading 2', 'Title'],
                correct: 1
              },
              {
                q: 'How do you modify an existing style to change all instances at once?',
                options: ['Edit each instance manually', 'Right-click the style name and select Modify', 'Delete and recreate the style', 'Use Find and Replace'],
                correct: 1
              },
              {
                q: 'Why do styles matter for document accessibility?',
                options: ['They make documents smaller', 'Screen readers use heading styles for navigation', 'They print faster', 'They look more professional'],
                correct: 1
              },
              {
                q: 'When should you create a custom style?',
                options: ['Never—only use built-in styles', 'When you need consistent formatting for repeated elements', 'For every paragraph', 'Only for final documents'],
                correct: 1
              }
            ]
          }
        },
        {
          id: 'p2',
          title: 'Tables for Structured Exam Questions',
          goal: 'Design professional tables for organizing exam questions, rubrics, and structured answer formats',
          content: {
            introduction: 'Tables are the secret weapon of professional exam designers. They create perfect alignment for marks, organize multiple-choice options uniformly, structure marking rubrics, and keep complex information organized. Amateur exam papers have messy spacing; professional papers use tables invisibly.',
            actionCards: [
              {
                title: 'Basic Table Creation',
                description: 'Insert tab > Table > drag to select rows and columns OR enter exact dimensions. For exam questions: 2 columns often perfect (question | marks). 1 column for simple lists. 3+ columns for rubrics or comparison questions.',
                example: 'Two-column table: Left column contains question text (wide), right column contains marks [right-aligned, narrow]. Looks professional, marks always align perfectly.'
              },
              {
                title: 'Table Borders & Invisibility',
                description: 'Most exam tables should have NO borders or minimal borders. Select table > Design tab > Borders dropdown > No Border. This creates perfect alignment without visible grid lines. Use borders only when table structure is part of the question content.',
                example: 'Question-marks table: no borders, looks like natural document but marks align perfectly. Comparison table for student answers: visible borders so students know where to write.'
              },
              {
                title: 'Cell Alignment & Spacing',
                description: 'Right-click table > Table Properties > Cell tab > Options. Set cell margins (spacing around text). Vertical alignment (top, center, bottom). For marks indicators: top-align questions, middle-align marks for visual balance.',
                example: 'Long question in left cell, marks in right cell: top-align both so marks sit next to question start, not floating in middle of cell.'
              },
              {
                title: 'Merging & Splitting Cells',
                description: 'Select cells > right-click > Merge Cells or Split Cells. Use for: section headers spanning full table width, multi-part questions with shared introduction, rubric categories spanning multiple criteria columns.',
                example: 'Section A header: merge all cells in first row to create full-width heading. Below: individual questions in separate rows with marks column.'
              },
              {
                title: 'Table Styles for Quick Professional Look',
                description: 'Table Design tab > Table Styles gallery. Grid Table options create professional appearance instantly. For exams: choose subtle styles without heavy coloring. Modify table style colors to match your school branding if needed.',
                example: 'Grid Table 1 Light - Accent 1 gives subtle professional lines without distraction. Perfect for rubrics and structured answer tables.'
              }
            ],
            mobileVsPc: {
              pc: 'Insert > Table for creation. Table Design and Layout tabs appear when table selected. Drag borders to resize. Right-click for advanced options. Complex tables much easier on PC.',
              mobile: 'Insert > Table but editing is limited. Can add/delete rows/columns. Cannot easily adjust borders or merge cells. Create table structure on PC, minor edits possible on mobile.'
            },
            practiceExercise: {
              instruction: 'Create a 2-column table with 5 rows. Left column: exam questions. Right column: marks (right-aligned). Remove all borders. Adjust column widths so questions get 85% width, marks get 15%.',
              text: 'Question 1: Define photosynthesis. [2 marks]\nQuestion 2: Name three products of photosynthesis. [3 marks]\nQuestion 3: Explain the role of chlorophyll. [4 marks]\nQuestion 4: Describe the relationship between photosynthesis and cellular respiration. [6 marks]',
              targetAccuracy: 80,
              why: 'This invisible table structure is how professional exam papers achieve perfect marks alignment. Students never notice the table, but the visual organization improves exam clarity dramatically.'
            }
          },
          quiz: {
            questions: [
              {
                q: 'Why would you use a table with no borders in an exam paper?',
                options: ['Tables always need borders', 'To create perfect alignment invisibly', 'To save ink when printing', 'Borderless tables are easier to create'],
                correct: 1
              },
              {
                q: 'What is the recommended column structure for exam questions with marks indicators?',
                options: ['1 column', '2 columns (question | marks)', '3 columns', 'No tables for exam questions'],
                correct: 1
              },
              {
                q: 'How do you merge multiple cells into one cell in a table?',
                options: ['Delete the cells', 'Select cells > right-click > Merge Cells', 'Copy and paste', 'Use Ctrl+M'],
                correct: 1
              },
              {
                q: 'When should table borders be visible in exam papers?',
                options: ['Always', 'Never', 'When the table structure is part of the question content', 'Only for rubrics'],
                correct: 2
              },
              {
                q: 'What table property controls spacing around text within cells?',
                options: ['Line spacing', 'Cell margins', 'Paragraph spacing', 'Indentation'],
                correct: 1
              }
            ]
          }
        },
        {
          id: 'p3',
          title: 'Headers, Footers & Page Numbers',
          goal: 'Create professional headers and footers with automatic page numbers essential for multi-page exam papers',
          content: {
            introduction: 'Every professional exam paper needs: school/subject in header, page numbers in footer, possibly date and class information. Without these, exams look incomplete and pages can be lost or mixed. This lesson teaches exam-standard header and footer design.',
            actionCards: [
              {
                title: 'Inserting Basic Headers & Footers',
                description: 'Insert tab > Header or Footer > choose style or "Edit Header/Footer". Anything typed here appears on every page automatically. Header: school name, subject, exam title. Footer: page numbers, date, teacher name (optional).',
                example: 'Header: "Greenfield Secondary | Biology Final Exam | Grade 10" appears on every page. Footer: "Page 1 of 5" updates automatically as you add/remove pages.'
              },
              {
                title: 'Automatic Page Numbering',
                description: 'Insert tab > Page Number > choose position (Top/Bottom of page) and alignment. "Page X of Y" format shows current page and total pages—essential for exam papers so students know if pages are missing.',
                example: 'Footer shows "Page 3 of 8" automatically. Add more questions? It updates to "Page 3 of 10" without manual editing. Students can confirm they received all pages.'
              },
              {
                title: 'Different First Page',
                description: 'Header & Footer Tools > Design > Options > Different First Page. Check this to omit header/footer from page 1 (cover page) while keeping them on other pages. Professional exam papers often have blank first page header for title layout.',
                example: 'Page 1: Centered exam title, no header clutter. Page 2 onward: header shows subject/class, footer shows page numbers. This is standard exam format.'
              },
              {
                title: 'Date & Time Fields',
                description: 'Insert tab (while in header/footer mode) > Date & Time or Document Info. Insert "Exam Date: [Date field]" that updates automatically. For answer keys, use "Last Modified" date so you know which version is current.',
                example: 'Footer: "Biology Exam | Date: March 15, 2026 | Page 2 of 6" gives students complete information and looks professionally structured.'
              },
              {
                title: 'Tab Stops for Header/Footer Alignment',
                description: 'In header/footer: press Tab to move to center, Tab again for right alignment. School name left, subject center, date right—all on one line, perfectly aligned. Much cleaner than trying to use spaces or manual positioning.',
                example: 'Header: "St. Mary\'s School [Tab] Chemistry Exam [Tab] December 2025" creates three-column professional header with zero effort.'
              }
            ],
            mobileVsPc: {
              pc: 'Double-click top or bottom margin to enter header/footer edit mode. Close Header & Footer button when done. Tab stops work perfectly for alignment. All numbering options available.',
              mobile: 'Insert > Header & Footer works but editing is less precise. Page numbers can be inserted. Complex tab-aligned headers difficult on mobile—create on PC.'
            },
            practiceExercise: {
              instruction: 'Create a header with school name (left), subject (center), and date (right) using tab stops. Create a footer with "Page X of Y" centered. Set different first page to leave page 1 header blank.',
              text: 'Your school name: Lincoln Academy\nSubject: Mathematics Final Exam\nClass: Grade 11\nDate: June 2026',
              targetAccuracy: 75,
              why: 'Professional exam papers have complete identifying information on every page. This prevents page loss, identifies the assessment, and looks like official examination documents that students (and parents) take seriously.'
            }
          },
          quiz: {
            questions: [
              {
                q: 'What information should typically appear in an exam paper header?',
                options: ['Page numbers only', 'School name, subject, exam title', 'Student names', 'Answers'],
                correct: 1
              },
              {
                q: 'Why use "Page X of Y" format instead of just "Page X" for exam papers?',
                options: ['It looks better', 'Students can verify they have all pages', 'It\'s required by law', 'It saves space'],
                correct: 1
              },
              {
                q: 'What does "Different First Page" option accomplish?',
                options: ['Makes first page landscape', 'Omits header/footer from page 1 only', 'Makes first page larger', 'Changes first page margins'],
                correct: 1
              },
              {
                q: 'How do you create left-center-right alignment in a single header line?',
                options: ['Three text boxes', 'Use Tab key to move between positions', 'Three separate headers', 'Use spaces'],
                correct: 1
              },
              {
                q: 'When editing a header, what happens to the document body?',
                options: ['It disappears', 'It becomes grayed out but visible', 'It moves down', 'Nothing changes'],
                correct: 1
              }
            ]
          }
        },
        {
          id: 'p4',
          title: 'Page Layout & Section Breaks',
          goal: 'Control page orientation, margins, and section breaks for complex multi-part exam papers',
          content: {
            introduction: 'Some exam questions need landscape orientation for wide tables. Some sections need different margins. Some require page breaks that don\'t restart numbering. Professional exam designers use section breaks and page layout tools to handle these situations without creating separate documents.',
            actionCards: [
              {
                title: 'Margin Control',
                description: 'Layout tab > Margins > choose preset (Normal, Narrow, Wide) or Custom. Exam papers typically use Normal (1 inch all around) or Narrow (0.5 inch) for longer exams. Consistent margins = professional appearance. Never adjust margins mid-document unless using sections.',
                example: '50-question exam fits better with Narrow margins. 10-question essay exam uses Normal margins for comfortable reading. Choose once and keep consistent.'
              },
              {
                title: 'Page Orientation',
                description: 'Layout tab > Orientation > Portrait or Landscape. Portrait: normal vertical pages (99% of exams). Landscape: wide tables, charts, or diagrams. Changing orientation mid-document requires section breaks.',
                example: 'Questions 1-5: portrait. Question 6 has a wide comparison table: insert section break, change that page to landscape, insert another section break, return to portrait for Question 7 onward.'
              },
              {
                title: 'Page Breaks vs Section Breaks',
                description: 'Page break (Ctrl+Enter): starts new page, same formatting. Section break: starts new page AND allows different headers/footers/orientation/margins. For exams: page breaks between questions if desired, section breaks when format must change.',
                example: 'Section A ends. Insert page break to start Section B on fresh page. Same header/footer continue. Versus: insert section break to change Section B header to different title or landscape orientation.'
              },
              {
                title: 'Columns for Special Formats',
                description: 'Layout tab > Columns > choose number of columns. Useful for: multiple choice options (2 columns), vocabulary lists, matching questions. Return to one column after special section. Columns + borders = newspaper-style professional layout.',
                example: 'Matching section: "Column A: Terms | Column B: Definitions" using actual Word columns feature creates clean two-column layout students can clearly distinguish.'
              },
              {
                title: 'Page Color & Watermarks (Use Sparingly)',
                description: 'Design tab > Page Color or Watermark. For exams: almost never use page color (wastes ink). Watermark useful for "DRAFT" or "ANSWER KEY" on working copies. Remove for final student copies. Professional exams = white pages.',
                example: 'Answer key version: diagonal "ANSWER KEY" watermark ensures teachers don\'t accidentally distribute answers. Remove watermark for student version using Design > Watermark > Remove.'
              }
            ],
            mobileVsPc: {
              pc: 'Layout tab has all page setup options. Section breaks visible in Draft view. Can see margins as blue lines in Print Layout view. Full control over all page layout elements.',
              mobile: 'Layout tab available but limited. Margin presets available. Orientation changes possible. Section breaks difficult to insert precisely—use PC for complex layout changes.'
            },
            practiceExercise: {
              instruction: 'Set up a 3-page exam: Page 1 portrait with title, Page 2 landscape with wide table for question 1, Page 3 portrait for questions 2-5. Use section breaks to control orientation.',
              text: 'Biology Final Exam\n\nQuestion 1: Complete the following comparison table of plant and animal cells (12 categories).\n\nQuestion 2: Describe photosynthesis.\nQuestion 3: Explain cellular respiration.\nQuestion 4: Compare and contrast the two processes.\nQuestion 5: Predict what would happen if chloroplasts stopped functioning.',
              targetAccuracy: 70,
              why: 'Advanced exam papers require different layouts for different question types. Section breaks let you mix portrait and landscape, vary margins, or change headers—all in one professional document.'
            }
          },
          quiz: {
            questions: [
              {
                q: 'What is the standard margin setting for most exam papers?',
                options: ['Narrow (0.5 inch)', 'Normal (1 inch)', 'Wide (2 inches)', 'No margins'],
                correct: 1
              },
              {
                q: 'When should you use a section break instead of a page break?',
                options: ['Never', 'When you need to change page formatting (orientation, headers, margins)', 'Always', 'Only at the end of the document'],
                correct: 1
              },
              {
                q: 'Which page orientation is appropriate for a wide comparison table in an exam?',
                options: ['Portrait', 'Landscape', 'Square', 'Custom'],
                correct: 1
              },
              {
                q: 'What is a professional use of watermarks in exam papers?',
                options: ['Decorating student copies', 'Marking draft versions as "DRAFT" or "ANSWER KEY"', 'Adding school logo background', 'Making pages colorful'],
                correct: 1
              },
              {
                q: 'What keyboard shortcut inserts a page break?',
                options: ['Ctrl+Enter', 'Ctrl+Break', 'Alt+Enter', 'Shift+Enter'],
                correct: 0
              }
            ]
          }
        },
        {
          id: 'p5',
          title: 'Creating Reusable Exam Templates',
          goal: 'Design and save exam templates with pre-formatted sections, styles, and placeholders for rapid exam creation',
          content: {
            introduction: 'Creating every exam from scratch is inefficient. Professional educators create templates once, then use them for every assessment. A well-designed template contains: predefined styles, formatted sections, placeholder text, proper headers/footers, and consistent spacing. This lesson teaches template creation that saves hours per term.',
            actionCards: [
              {
                title: 'Planning Your Template Structure',
                description: 'Before creating, decide: What sections do all your exams have? (Section A: Multiple Choice, Section B: Short Answer, Section C: Essay?). What information goes in header/footer? What styles do you need? Plan once, use forever.',
                example: 'Standard biology exam template: Title page, instructions page, Section A (20 MC questions), Section B (5 short answer), Section C (2 essay options). Header: subject/class. Footer: page numbers. Save this structure as template.'
              },
              {
                title: 'Setting Up Styles in Template',
                description: 'Create all necessary custom styles BEFORE saving as template: "Section Heading" (16pt bold), "Question Number" (12pt bold), "Instructions" (11pt italic), "Marks Indicator" (10pt italic right-align). Apply these styles throughout template.',
                example: 'Every time you use this template, all styles are pre-loaded. Type a section heading, apply "Section Heading" style—instant consistent formatting across all exams you create this year.'
              },
              {
                title: 'Adding Placeholder Text',
                description: 'Use brackets for replaceable text: [Exam Title], [Date], [Class], [Question text here]. When you create actual exam, these placeholders remind you what to customize. Highlight placeholders in different color so they\'re obvious.',
                example: 'Template question: "Question 1: [Insert question about photosynthesis] [4 marks]". When creating real exam, you see exactly what needs replacement and formatting is already perfect.'
              },
              {
                title: 'Saving as Template File',
                description: 'File > Save As > choose location > "Save as type" dropdown > Word Template (*.dotx). Save to Templates folder or your own folder. Now: File > New > Personal > your template appears. Double-click creates new exam document based on template.',
                example: 'Save "Biology_Exam_Template.dotx". Every new biology exam starts from this. Change one exam? Doesn\'t affect template. Update template? All future exams use new version.'
              },
              {
                title: 'Building a Template Library',
                description: 'Create templates for different purposes: Multiple Choice Template, Essay Template, Practical Exam Template, Quick Quiz Template. Also create Answer Key Template with space for answers. Over time, building exams becomes assembling from templates.',
                example: 'Need a 10-question quiz? Open Quick Quiz Template (already has 10 numbered questions formatted). Replace placeholders with actual questions. Save. 15 minutes instead of 45 minutes formatting from scratch.'
              }
            ],
            mobileVsPc: {
              pc: 'Full template creation and modification on PC. Save as .dotx file type. Access templates via File > New. Can create complex templates with tables, sections, custom styles.',
              mobile: 'Cannot save as template on mobile. Can open existing templates and create documents from them. Template editing should be done on PC for full functionality.'
            },
            practiceExercise: {
              instruction: 'Create a basic exam template with: Title placeholder, two sections (Section A: MC, Section B: Short Answer), header with subject placeholder, footer with page numbers, and a custom "Section Heading" style.',
              text: '[Exam Title]\n[Subject] | [Class] | [Date]\n\nSection A: Multiple Choice\nInstructions: Choose the best answer for each question.\n\nQuestion 1: [Question text] [2 marks]\nQuestion 2: [Question text] [2 marks]\n\nSection B: Short Answer\nInstructions: Answer all questions in the spaces provided.\n\nQuestion 1: [Question text] [5 marks]',
              targetAccuracy: 75,
              why: 'Templates are the secret to prolific, consistent exam creation. Teachers who use templates create assessments 3x faster with zero formatting errors and complete consistency across the academic year.'
            }
          },
          quiz: {
            questions: [
              {
                q: 'What file extension is used for Word templates?',
                options: ['.doc', '.docx', '.dotx', '.tmpl'],
                correct: 2
              },
              {
                q: 'Why use placeholder text in templates?',
                options: ['To make the template larger', 'To remind yourself what needs to be customized', 'To add color', 'Templates don\'t use placeholders'],
                correct: 1
              },
              {
                q: 'What should you set up in a template before saving it?',
                options: ['Only the title', 'All necessary custom styles and document structure', 'Just page numbers', 'Nothing—customize after'],
                correct: 1
              },
              {
                q: 'How do you create a new document from a template?',
                options: ['File > Open', 'File > New > select template', 'Copy the template file', 'Edit the template directly'],
                correct: 1
              },
              {
                q: 'What happens to the template file when you create a document from it?',
                options: ['Template is deleted', 'Template is unchanged; new document is created', 'Template is renamed', 'Template is locked'],
                correct: 1
              }
            ]
          }
        }
      ]
    },
    {
      id: 2,
      title: 'Advanced Exam & Academic Document Design',
      description: 'Master complex exam paper creation, rubric design, answer keys, and moderation-ready academic documents',
      badge: '🧠 Examination Design Expert',
      pointsRequired: 900,
      lessons: [
        {
          id: 'a1',
          title: 'Multi-Section Exam Paper Architecture',
          goal: 'Design comprehensive exam papers with multiple sections, varied question types, and professional structure',
          content: {
            introduction: 'A complete professional exam paper is an architecture project. You\'re designing a 2-3 hour experience for students, with varied cognitive demands, clear navigation, appropriate time allocation per section, and visual consistency. This is examination design, not just typing questions.',
            actionCards: [
              {
                title: 'Section Design Philosophy',
                description: 'Section A (multiple choice): tests breadth of knowledge quickly. Section B (short answer): tests understanding and application. Section C (essay/extended response): tests synthesis and critical thinking. Each section should take roughly equal time despite different question counts.',
                example: '2-hour exam: Section A (40 MC) = 40 minutes. Section B (4 short answer) = 40 minutes. Section C (1 essay from 2 options) = 40 minutes. Balance cognitive demand with time available.'
              },
              {
                title: 'Progressive Difficulty Curve',
                description: 'Within each section, arrange questions from easiest to hardest. This builds student confidence and ensures weaker students can demonstrate some knowledge before encountering challenging material. Last question in each section should be appropriately challenging.',
                example: 'Section B: Q1 asks for definition (easy), Q2 asks for explanation (medium), Q3 asks for application (harder), Q4 asks for evaluation (hardest). Students experience success before challenge.'
              },
              {
                title: 'Clear Section Instructions',
                description: 'Each section needs explicit instructions: "Answer ALL questions" or "Choose TWO questions from this section." Number of marks, time suggestion, any special requirements (calculator allowed? Formula sheet provided?). Never assume students know the rules.',
                example: 'Section A: Answer ALL 20 questions. Each question is worth 2 marks. Total: 40 marks. Suggested time: 30 minutes. No calculator required. = Complete clarity, no student confusion.'
              },
              {
                title: 'Cognitive Load Management',
                description: 'Don\'t place two extremely difficult sections consecutively. Alternate cognitive demands: multiple choice (recognition) followed by short answer (recall) followed by essay (synthesis). This manages mental fatigue over 2-3 hour exam period.',
                example: 'Poor structure: 40 MC, then 10 short answer (exhausting similar skills). Better: 20 MC, 5 short answer, 20 MC, essay choice. Varies cognitive approach throughout exam.'
              },
              {
                title: 'Mark Allocation Transparency',
                description: 'Every question shows marks clearly. Section totals displayed prominently. Grand total shown on first page. Students need to see mark distribution to allocate time wisely. Hidden marks = poor exam design.',
                example: 'Each section ends with: "End of Section A. Total for this section: 40 marks." First page shows: "Section A: 40 marks, Section B: 30 marks, Section C: 30 marks. TOTAL: 100 marks."'
              }
            ],
            mobileVsPc: {
              pc: 'Creating multi-section exams requires PC for complex formatting, tables, section breaks, and header/footer control. Use Outline View to see document structure clearly.',
              mobile: 'Can review and make minor edits to multi-section exams on mobile. Major structural changes (adding sections, reorganizing) should be done on PC for precision.'
            },
            practiceExercise: {
              instruction: 'Design the structure for a 100-mark, 2-hour biology exam with three sections: MC (40 marks), short answer (30 marks), essay (30 marks). Include section instructions and time suggestions.',
              text: 'BIOLOGY FINAL EXAMINATION - GRADE 11\nTotal Marks: 100\nTime Allowed: 2 hours\n\n[Design section structure with instructions]',
              targetAccuracy: 80,
              why: 'Exam paper architecture affects student performance and fairness. Well-structured exams allow all students to demonstrate their knowledge appropriately. Poor structure disadvantages students regardless of their actual knowledge.'
            }
          },
          quiz: {
            questions: [
              {
                q: 'Why should easier questions appear before harder questions within a section?',
                options: ['To save time', 'To build student confidence and ensure all students can demonstrate some knowledge', 'Easier questions are always shorter', 'It doesn\'t matter'],
                correct: 1
              },
              {
                q: 'What information must appear in section instructions?',
                options: ['Teacher name', 'Which questions to answer, marks available, time suggestion, special requirements', 'School address', 'Just the section title'],
                correct: 1
              },
              {
                q: 'How should cognitive demands be distributed in a long exam?',
                options: ['All difficult questions at the end', 'Randomly mixed', 'Alternated to manage mental fatigue', 'All easy questions first'],
                correct: 2
              },
              {
                q: 'Where should total marks for the exam be displayed?',
                options: ['Only at the end', 'Only in the header', 'On the first page and at the end of each section', 'Marks shouldn\'t be shown'],
                correct: 2
              },
              {
                q: 'What is the purpose of varied section types (MC, short answer, essay)?',
                options: ['To make exams longer', 'To test different cognitive skills and knowledge breadth vs depth', 'To confuse students', 'To use less paper'],
                correct: 1
              }
            ]
          }
        },
        {
          id: 'a2',
          title: 'Rubric & Marking Scheme Design',
          goal: 'Create professional marking rubrics and detailed marking schemes that ensure consistent, fair assessment',
          content: {
            introduction: 'A question without a marking scheme is just a hope. Professional educators create detailed rubrics and marking schemes that ensure: consistency across different teachers, fairness for all students, defensible marks if questioned, and clarity about what constitutes different grade levels. This lesson teaches assessment design, not just exam design.',
            actionCards: [
              {
                title: 'Point-Based Marking Schemes',
                description: 'For short answer questions: break down marks into specific elements. "Explain photosynthesis [6 marks]" becomes: Definition (1 mark), mention of chlorophyll (1 mark), light energy conversion (1 mark), reactants named (1 mark), products named (1 mark), location in plant (1 mark). No guesswork in grading.',
                example: 'Question: Describe three functions of the cell membrane [6 marks]. Scheme: 2 marks per function correctly identified and explained. Partial marks: 1 mark for identification only, 1 additional mark for explanation.'
              },
              {
                title: 'Rubric Tables for Essays',
                description: 'Create table with criteria rows (Thesis, Evidence, Analysis, Organization, Language) and performance columns (Excellent 9-10, Good 7-8, Satisfactory 5-6, Needs Improvement 0-4). Each cell describes what that performance level looks like for that criterion.',
                example: 'Thesis row: Excellent = "Clear, insightful thesis that shows deep understanding." Satisfactory = "Basic thesis present but lacks depth." Each criterion scored separately, then totaled.'
              },
              {
                title: 'Model Answers for Consistency',
                description: 'For each question, write 1-2 model answers showing what full marks looks like. Also write partial credit examples. When moderating or if a student questions a grade, you can compare their answer to the model. This is professional marking standard.',
                example: 'Q: Explain natural selection [4 marks]. Model answer: "Natural selection is the process where organisms better adapted to their environment tend to survive and produce more offspring. Variation exists within populations, and beneficial traits are inherited, leading to gradual species change." Any answer covering these 4 elements = 4 marks.'
              },
              {
                title: 'Common Error Anticipation',
                description: 'In your marking scheme, list common mistakes and how to score them. "If student confuses photosynthesis with respiration, award 0 marks for reactants/products but can still earn marks for location." This prevents inconsistent marking when unexpected answers appear.',
                example: 'Chemistry calculation: Mark scheme notes "Common error: students forget to balance equation. Award method marks for correct approach even if final answer wrong due to unbalanced equation."'
              },
              {
                title: 'Negative Marking Considerations',
                description: 'For multiple choice: decide whether wrong answers lose marks or just score zero. Most fair systems: correct = +1, blank = 0, incorrect = 0 (not -1). Negative marking discourages educated guessing and may disadvantage risk-takers unfairly.',
                example: 'Standard MC scheme: Correct = 2 marks, Incorrect or blank = 0 marks. This rewards knowledge without punishing reasonable attempts when uncertain.'
              }
            ],
            mobileVsPc: {
              pc: 'Rubric tables created easily with table features. Can use shading and borders to make rubrics visually clear. Detailed marking schemes best created on PC for precision.',
              mobile: 'Can view and reference rubrics on mobile while marking. Creating detailed rubrics and schemes difficult on mobile—use PC for creation.'
            },
            practiceExercise: {
              instruction: 'Create a detailed marking scheme for this question: "Explain the water cycle, including at least four processes involved. [8 marks]" Break down how marks should be allocated.',
              text: 'Question: Explain the water cycle, including at least four processes involved. [8 marks]\n\n[Create marking scheme showing how 8 marks are distributed]',
              targetAccuracy: 75,
              why: 'Detailed marking schemes ensure fair, consistent grading. They protect teachers from challenges ("Why did I only get 5/8?") because you can point to exactly which elements were missing. They also make marking faster because decisions are predetermined.'
            }
          },
          quiz: {
            questions: [
              {
                q: 'Why create a detailed marking scheme for each question instead of just assigning total marks?',
                options: ['It looks more professional', 'Ensures consistent, fair marking and defensible grades', 'It\'s required by law', 'Makes marking take longer'],
                correct: 1
              },
              {
                q: 'What should a rubric table for essay questions include?',
                options: ['Just total marks', 'Criteria rows and performance level columns with descriptions', 'Student names', 'Just a list of topics'],
                correct: 1
              },
              {
                q: 'What is the purpose of writing model answers?',
                options: ['To give students the answers', 'To show what full marks looks like for consistent marking', 'To make exams easier', 'Model answers aren\'t necessary'],
                correct: 1
              },
              {
                q: 'How should common student errors be handled in marking schemes?',
                options: ['Automatic zero', 'Listed in scheme with specific scoring guidance', 'Ignored', 'Always give partial credit'],
                correct: 1
              },
              {
                q: 'What is the fairest multiple choice marking approach?',
                options: ['Correct = +1, Wrong = -1', 'Correct = +1, Wrong = 0', 'Correct = +2, Wrong = -1', 'Random scoring'],
                correct: 1
              }
            ]
          }
        },
        {
          id: 'a3',
          title: 'Answer Key & Solution Document Creation',
          goal: 'Design professional answer keys and worked solutions that serve as teaching tools and marking guides',
          content: {
            introduction: 'An answer key isn\'t just a list of correct answers. Professional answer keys explain reasoning, show work for calculations, highlight common mistakes, and provide mark allocation guidance. They\'re teaching documents for students reviewing exams and marking guides for colleagues who may grade your exam.',
            actionCards: [
              {
                title: 'Answer Key vs Worked Solutions',
                description: 'Answer key: brief correct answers only, for teacher quick reference while marking. Worked solutions: detailed explanations showing steps, reasoning, diagrams—for students reviewing incorrect answers. Create both. Answer key = 1 page. Worked solutions = multiple pages.',
                example: 'Question: Calculate molarity of 5g NaCl in 250mL water. Answer key: "0.342 M". Worked solutions: Shows formula (M = mol/L), conversion of grams to moles, conversion of mL to L, calculation steps, final answer with units.'
              },
              {
                title: 'Visual Clarity in Answer Keys',
                description: 'Use two-column table: Question number | Answer. Or mirror the exam layout with answers in different color/bold. Never bury answers in paragraphs. Marking 30 exams? You need to find correct answers in 1 second, not 10 seconds.',
                example: 'MC answer key: "1-B, 2-C, 3-A, 4-D, 5-B, 6-C, 7-A, 8-D, 9-B, 10-C" in single line or table = instant reference. Versus paragraphs explaining each = marking nightmare.'
              },
              {
                title: 'Worked Solutions Format',
                description: 'For each question: restate question, show complete working, highlight key steps, explain reasoning where not obvious, show mark allocation in brackets after each step. Students use this for learning, not just checking if they were right.',
                example: 'Q: Solve 2x + 5 = 13. Solution: 2x + 5 = 13 [given] | Subtract 5 from both sides: 2x = 8 [1 mark] | Divide by 2: x = 4 [1 mark] | Total: 2 marks. Students see exactly where marks were earned.'
              },
              {
                title: 'Common Mistakes Commentary',
                description: 'In worked solutions, include "Common mistakes" section for questions where students typically struggle. "Many students forgot to balance the equation before calculating molar ratios." This transforms solutions from answers into teaching tools.',
                example: 'After showing correct photosynthesis equation: "Common mistake: Writing H₂O as a product instead of reactant. Remember: water is INPUT (along with CO₂), glucose and oxygen are OUTPUT."'
              },
              {
                title: 'Watermarking & Version Control',
                description: 'Answer keys: add "ANSWER KEY - DO NOT DISTRIBUTE" watermark. Worked solutions: can distribute to students after exam. Use headers/footers to show version and date. "Answer Key v2 - Updated October 2025" prevents confusion if you refine the key.',
                example: 'Save files as: "Biology_Midterm_EXAM.docx", "Biology_Midterm_ANSWERKEY.docx", "Biology_Midterm_SOLUTIONS.docx". Header watermark prevents accidental distribution to students.'
              }
            ],
            mobileVsPc: {
              pc: 'Creating detailed worked solutions with equations, diagrams, formatting is PC work. Watermarks, tables, and complex formatting all require PC.',
              mobile: 'Can reference answer keys while marking on mobile. Creating answer keys and solutions should be done on PC for professional quality.'
            },
            practiceExercise: {
              instruction: 'Create both an answer key and worked solution for this question: "Question 1: If a car travels 150 km in 2.5 hours, what is its average speed in km/h? [2 marks]"',
              text: 'Create:\n1. Answer key entry (brief)\n2. Worked solution (detailed with mark allocation)',
              targetAccuracy: 80,
              why: 'Professional answer keys save marking time. Professional worked solutions become study guides that reduce "Why did I lose marks?" questions because students can see exactly what was expected.'
            }
          },
          quiz: {
            questions: [
              {
                q: 'What is the difference between an answer key and worked solutions?',
                options: ['No difference', 'Answer key is brief for marking; worked solutions are detailed for learning', 'Answer key is longer', 'Worked solutions are only for teachers'],
                correct: 1
              },
              {
                q: 'What format provides fastest reference when marking 30+ exams?',
                options: ['Paragraphs of explanation', 'Two-column table: question number | answer', 'Random order answers', 'No answer key needed'],
                correct: 1
              },
              {
                q: 'What should worked solutions include that answer keys don\'t?',
                options: ['Just final answers', 'Step-by-step working, reasoning, mark allocation, common mistakes', 'Student names', 'Easier questions'],
                correct: 1
              },
              {
                q: 'Why add a watermark to answer keys?',
                options: ['Looks professional', 'Prevents accidental distribution to students', 'Required by schools', 'Watermarks aren\'t useful'],
                correct: 1
              },
              {
                q: 'When should worked solutions be given to students?',
                options: ['Before the exam', 'Never', 'After the exam for learning and review', 'Only to top students'],
                correct: 2
              }
            ]
          }
        },
        {
          id: 'a4',
          title: 'Accessibility & Universal Design for Exams',
          goal: 'Create exam papers that are accessible to all students, including those with visual, motor, or cognitive needs',
          content: {
            introduction: 'Professional exam design considers all students. Accessibility isn\'t just compliance—it\'s good design that helps everyone. Clear fonts help students with dyslexia and also reduce errors for all students. Proper heading structure helps screen readers and also improves navigation for everyone. Universal design principles make better exams.',
            actionCards: [
              {
                title: 'Font & Readability Standards',
                description: 'Sans-serif fonts (Arial, Calibri) are more accessible than serif fonts (Times New Roman) for students with dyslexia. Font size: minimum 11pt for body text, 12pt preferred. Line spacing: 1.5 for students with reading difficulties. Avoid italics for long passages—use bold for emphasis.',
                example: 'Standard exam: Arial 12pt, 1.5 line spacing. Benefits students with dyslexia significantly while also being easier to read for all students during stressful exam conditions.'
              },
              {
                title: 'Consistent Structure & Navigation',
                description: 'Use heading styles (Heading 1, 2, 3) consistently. Screen readers announce headings, allowing blind students to navigate sections. Visual students also benefit from clear section hierarchy. Never use bold text as fake headings—use actual heading styles.',
                example: 'Section titles = Heading 1. Subsection titles = Heading 2. Screen reader user can press "H" key to jump between sections instantly, same as sighted student scanning page visually.'
              },
              {
                title: 'Color & Contrast Awareness',
                description: 'Never rely on color alone to convey information. "Answer the questions in blue" fails for colorblind students. Use "Answer questions labeled \'Required\'" instead. High contrast between text and background (black on white is best, never gray on light gray).',
                example: 'Poor: "Circle the red words." Accessible: "Circle the words marked with asterisks (*)." Uses shape/symbol, not just color, for identification.'
              },
              {
                title: 'Table & Diagram Accessibility',
                description: 'Tables: simple structure (avoid merged cells when possible), clear headers, alt text describing table purpose for screen readers. Diagrams: provide text description of visual information. "Figure 1 shows cell membrane with labeled parts A, B, C" + separate text identifying A=phospholipids, etc.',
                example: 'Diagram-based question: Include both the diagram AND a text description. Blind student gets text description, visual student uses diagram—both can answer the question fairly.'
              },
              {
                title: 'Time & Format Accommodations',
                description: 'Design exams so extended time doesn\'t require separate version. Avoid time pressure references in instructions ("Quick!"). Digital version should be identical to paper version for students who need assistive technology. Test your exam with screen reader yourself.',
                example: 'Instead of "You have 30 minutes for this section," write "Suggested time: 30 minutes." Students with extended time don\'t feel penalized by constant time pressure reminders.'
              }
            ],
            mobileVsPc: {
              pc: 'Full accessibility features available: heading styles, alt text for images/tables, high contrast checking. Accessibility Checker (Review tab) identifies issues.',
              mobile: 'Limited accessibility features. Can view accessibility improvements but creation and checking must be done on PC.'
            },
            practiceExercise: {
              instruction: 'Review this exam question for accessibility and identify three improvements needed: "Look at the diagram below showing the red-colored cell parts. Circle the parts that are blue. You have 5 minutes—hurry!"',
              text: 'Identify accessibility problems:\n1. [Color reliance]\n2. [Time pressure language]\n3. [Missing text descriptions]\n\nProvide accessible rewrite.',
              targetAccuracy: 85,
              why: 'Accessible exam design is legally required in many jurisdictions and morally right in all contexts. It also results in clearer exams that benefit all students, not just those with documented needs.'
            }
          },
          quiz: {
            questions: [
              {
                q: 'Why are sans-serif fonts (Arial, Calibri) preferred over serif fonts (Times New Roman) for exams?',
                options: ['They look modern', 'They are more accessible for students with dyslexia and easier to read under stress', 'They save space', 'They print faster'],
                correct: 1
              },
              {
                q: 'What is wrong with the instruction "Answer the questions in blue"?',
                options: ['Nothing', 'Relies on color alone, fails for colorblind students', 'Too informal', 'Blue ink is unprofessional'],
                correct: 1
              },
              {
                q: 'Why use actual heading styles instead of bold text for section titles?',
                options: ['Looks better', 'Screen readers recognize heading styles for navigation', 'Saves time', 'No difference'],
                correct: 1
              },
              {
                q: 'How should diagram-based questions be made accessible?',
                options: ['Use bigger diagrams', 'Include both diagram and text description of visual information', 'Avoid diagrams entirely', 'Use color coding'],
                correct: 1
              },
              {
                q: 'What tool in Word helps identify accessibility issues?',
                options: ['Spell check', 'Grammar check', 'Accessibility Checker (Review tab)', 'Find and Replace'],
                correct: 2
              }
            ]
          }
        },
        {
          id: 'a5',
          title: 'Capstone Project: Complete Professional Exam Paper',
          goal: 'Apply all learned skills to create a complete, moderation-ready exam paper from scratch',
          content: {
            introduction: 'This is your mastery demonstration. You will create a complete exam paper that would pass professional moderation scrutiny: proper structure, consistent formatting, clear instructions, detailed marking scheme, accessible design, and professional presentation. This exam could be submitted to examination boards or used immediately in your classroom.',
            actionCards: [
              {
                title: 'Project Requirements Checklist',
                description: 'Your exam must include: Title page with all identifying information. Instructions page. Minimum three sections (MC, short answer, extended response). At least 15 questions total. Proper headers/footers with page numbers. Marks clearly indicated. Section instructions. Professional formatting throughout. Created from or saved as template for future use.',
                example: 'Minimum standard: 20 MC (40 marks), 5 short answer (30 marks), 1 essay from 2 options (30 marks). Total: 100 marks. 2-hour exam. Meets national exam structure standards.'
              },
              {
                title: 'Supporting Documents Required',
                description: 'In addition to exam paper, create: Answer key (1 page, quick reference). Worked solutions (detailed, all questions). Marking rubric for essay question. Submit all three documents together. This is professional examination package standard.',
                example: 'Final deliverables: "Biology_Final_EXAM.docx" (student version), "Biology_Final_ANSWERKEY.docx", "Biology_Final_SOLUTIONS.docx", "Biology_Final_RUBRIC.docx". Complete professional package.'
              },
              {
                title: 'Quality Standards',
                description: 'Zero spelling/grammar errors. Consistent formatting (all questions formatted identically). Logical progression (easy to hard). Clear, unambiguous question wording. Realistic time allocation. Accessibility considerations met (font size, contrast, structure). This is moderation-submission quality.',
                example: 'Before submission: proofread 3 times, check all marks add correctly, verify answer key matches questions (easy to mess up question numbering), test readability on mobile device, run Accessibility Checker.'
              },
              {
                title: 'Suggested Workflow',
                description: '1. Choose your subject and grade level. 2. Plan exam structure (sections, marks, time). 3. Use template or create from scratch with styles. 4. Write questions (easiest first, refine later). 5. Create marking scheme. 6. Write answer key and solutions. 7. Proofread and format. 8. Final quality check. 9. Submit. Professional exam creators follow this workflow every time.',
                example: 'Timeline: Day 1—plan and structure. Day 2—write questions. Day 3—create marking materials. Day 4—proofread and polish. Rush jobs show; professional exams are crafted over days.'
              },
              {
                title: 'Peer Review (Optional but Recommended)',
                description: 'If possible, have a colleague review your exam. Fresh eyes catch: ambiguous questions, timing issues, formatting inconsistencies, unclear instructions, inaccessible elements. Professional exam boards always use peer review. Even informal colleague review dramatically improves quality.',
                example: 'Ask colleague: "Do instructions make sense? Are any questions ambiguous? Does time allocation seem fair? Any formatting issues?" 15-minute review prevents hours of student confusion.'
              }
            ],
            mobileVsPc: {
              pc: 'Complete project must be created on PC. Complex formatting, multiple documents, quality checking all require PC capabilities. Mobile can be used for reviewing drafts.',
              mobile: 'Review drafts on mobile to check readability and formatting on smaller screens. Final creation, editing, and submission on PC.'
            },
            practiceExercise: {
              instruction: 'Create a complete professional exam paper for your subject area including: exam paper (3 sections, 15+ questions), answer key, worked solutions, and marking rubric. Apply all skills from this course.',
              text: 'CAPSTONE PROJECT\n\nSubmit complete exam package:\n1. Exam paper (student version)\n2. Answer key\n3. Worked solutions\n4. Marking rubric/scheme\n\nQuality checklist:\n☐ Zero errors\n☐ Consistent formatting\n☐ Clear instructions\n☐ Accessible design\n☐ Professional presentation\n☐ Complete marking materials',
              targetAccuracy: 90,
              why: 'This capstone demonstrates your transformation from someone who "knows Word" to a professional exam designer. The exam you create here is immediately usable in your classroom and meets professional moderation standards. You are now working at examination board level.'
            }
          },
          quiz: {
            questions: [
              {
                q: 'What are the minimum required documents in a professional exam package?',
                options: ['Just the exam paper', 'Exam paper, answer key, worked solutions, marking rubric', 'Exam paper and answers', 'Exam paper only'],
                correct: 1
              },
              {
                q: 'What should you do before submitting a final exam paper?',
                options: ['Just spell check', 'Proofread multiple times, verify marks, check accessibility, test on devices', 'Nothing—trust your first draft', 'Only check the title page'],
                correct: 1
              },
              {
                q: 'Why is peer review valuable for exam papers?',
                options: ['It\'s required', 'Fresh eyes catch ambiguities, errors, and issues you missed', 'To delay submission', 'Peer review isn\'t necessary'],
                correct: 1
              },
              {
                q: 'What quality standard distinguishes professional from amateur exams?',
                options: ['Length', 'Zero errors, consistent formatting, clear structure, complete marking materials', 'Difficulty', 'Number of pages'],
                correct: 1
              },
              {
                q: 'How long should creating a professional exam paper typically take?',
                options: ['30 minutes', 'Several days for planning, writing, marking materials, and proofreading', '1 hour', 'One afternoon'],
                correct: 1
              }
            ]
          }
        }
      ]
    }
  ];

  // ==================== LOCALSTORAGE FUNCTIONS ====================
  
  // Save progress to localStorage
  const saveProgress = () => {
    try {
      const progressData = {
        completedLessons: progress.completedLessons,
        completedQuizzes: progress.completedQuizzes,
        completedPracticals: progress.completedPracticals,
        unlockedLevels: progress.unlockedLevels,
        points: progress.points,
        badges: progress.badges,
        typingStats: progress.typingStats,
        lastSaved: new Date().toISOString()
      };
      localStorage.setItem('wordMasteryProgress', JSON.stringify(progressData));
      
      // Show save indicator
      setSaveIndicator(true);
      setTimeout(() => setSaveIndicator(false), 2000);
    } catch (e) {
      console.error('Failed to save progress:', e);
    }
  };
  
  // Load progress from localStorage
  const loadProgress = () => {
    try {
      const saved = localStorage.getItem('wordMasteryProgress');
      if (saved) {
        const parsed = JSON.parse(saved);
        setProgress({
          completedLessons: parsed.completedLessons || [],
          completedQuizzes: parsed.completedQuizzes || [],
          completedPracticals: parsed.completedPracticals || [],
          unlockedLevels: parsed.unlockedLevels || [0],
          points: parsed.points || 0,
          badges: parsed.badges || [],
          typingStats: parsed.typingStats || { accuracy: 0, speed: 0, practiceCount: 0 }
        });
      }
    } catch (e) {
      console.error('Failed to load progress:', e);
    }
  };
  
  // Reset all progress
  const resetProgress = () => {
    if (window.confirm('Are you sure you want to reset all your training progress? This action cannot be undone.')) {
      localStorage.removeItem('wordMasteryProgress');
      setProgress({
        completedLessons: [],
        completedQuizzes: [],
        completedPracticals: [],
        unlockedLevels: [0],
        points: 0,
        badges: [],
        typingStats: { accuracy: 0, speed: 0, practiceCount: 0 }
      });
      setCurrentView('home');
      setShowResetConfirm(false);
    }
  };
  
  // Load progress on mount
  useEffect(() => {
    loadProgress();
  }, []);
  
  // Save progress whenever it changes
  useEffect(() => {
    saveProgress();
  }, [progress]);

  // ==================== PROGRESS CALCULATION FUNCTIONS ====================
  
  // Calculate level completion percentage
  const getLevelProgress = (levelId) => {
    const level = levels[levelId];
    if (!level) return 0;
    
    const totalLessons = level.lessons.length;
    const completedInLevel = progress.completedLessons.filter(id => 
      level.lessons.some(lesson => lesson.id === id)
    ).length;
    
    return totalLessons > 0 ? (completedInLevel / totalLessons) * 100 : 0;
  };
  
  // Check if lesson is completed
  const isLessonCompleted = (lessonId) => {
    return progress.completedLessons.includes(lessonId);
  };
  
  // Check if quiz is completed
  const isQuizCompleted = (lessonId) => {
    return progress.completedQuizzes.includes(lessonId);
  };
  
  // Mark lesson as completed
  const completeLesson = (lessonId) => {
    if (!progress.completedLessons.includes(lessonId)) {
      setProgress(prev => ({
        ...prev,
        completedLessons: [...prev.completedLessons, lessonId],
        points: prev.points + 50
      }));
    }
  };
  
  // Mark quiz as completed
  const completeQuiz = (lessonId, score) => {
    if (!progress.completedQuizzes.includes(lessonId)) {
      const pointsEarned = score >= 80 ? 100 : score >= 60 ? 50 : 25;
      setProgress(prev => ({
        ...prev,
        completedQuizzes: [...prev.completedQuizzes, lessonId],
        points: prev.points + pointsEarned
      }));
    }
  };
  
  // Unlock next level
  const unlockLevel = (levelId) => {
    if (!progress.unlockedLevels.includes(levelId)) {
      const level = levels[levelId];
      setProgress(prev => ({
        ...prev,
        unlockedLevels: [...prev.unlockedLevels, levelId],
        badges: [...prev.badges, level.badge],
        points: prev.points + 200
      }));
    }
  };
  
  // Check if level should be unlocked
  const checkLevelUnlock = () => {
    levels.forEach((level, index) => {
      if (index === 0) return; // Foundation always unlocked
      
      const previousLevel = levels[index - 1];
      const previousProgress = getLevelProgress(index - 1);
      
      if (previousProgress === 100 && !progress.unlockedLevels.includes(index)) {
        unlockLevel(index);
      }
    });
  };
  
  useEffect(() => {
    checkLevelUnlock();
  }, [progress.completedLessons, progress.completedQuizzes]);

  // ==================== QUIZ HANDLING ====================
  
  // Submit quiz
  const handleQuizSubmit = () => {
    const currentLesson = levels[currentLevel].lessons[currentLessonIndex];
    const questions = currentLesson.quiz.questions;
    
    let correct = 0;
    questions.forEach((q, index) => {
      if (quizAnswers[index] === q.correct) {
        correct++;
      }
    });
    
    const scorePercentage = (correct / questions.length) * 100;
    setQuizScore(scorePercentage);
    setQuizSubmitted(true);
    completeQuiz(currentLesson.id, scorePercentage);
  };
  
  // Reset quiz
  const resetQuiz = () => {
    setQuizAnswers({});
    setQuizSubmitted(false);
    setQuizScore(0);
  };

  // ==================== CERTIFICATE FORM HANDLING ====================
  
  const handleCertificateSubmit = async (e) => {
    e.preventDefault();
    
    // Form will submit to Formspree via standard form action
    setFormSubmitted(true);
    
    // Reset form after 3 seconds
    setTimeout(() => {
      setFormSubmitted(false);
      setCertificateForm({ name: '', email: '', feedback: '' });
    }, 3000);
  };

  // ==================== NAVIGATION FUNCTIONS ====================
  
  const goToLevel = (levelId) => {
    setCurrentLevel(levelId);
    setCurrentLessonIndex(0);
    setCurrentView('level');
  };
  
  const goToLesson = (lessonIndex) => {
    setCurrentLessonIndex(lessonIndex);
    setCurrentView('lesson');
    setTypingText('');
    setFormattingState({
      bold: false,
      italic: false,
      underline: false,
      align: 'left',
      fontSize: '12pt',
      lineSpacing: '1.0'
    });
  };
  
  const nextLesson = () => {
    const level = levels[currentLevel];
    if (currentLessonIndex < level.lessons.length - 1) {
      goToLesson(currentLessonIndex + 1);
    } else {
      // Completed all lessons in level
      if (getLevelProgress(currentLevel) === 100) {
        setCurrentView('certificate');
      } else {
        setCurrentView('level');
      }
    }
  };
  
  const toggleSection = (sectionKey) => {
    setExpandedSections(prev => ({
      ...prev,
      [sectionKey]: !prev[sectionKey]
    }));
  };

  // ==================== RENDER FUNCTIONS ====================
  
  // Render Home View
  const renderHome = () => (
    <div style={styles.container}>
      <div style={styles.header}>
        <h1 style={styles.mainTitle}>Microsoft Word Mastery for Teachers</h1>
        <p style={styles.subtitle}>
          Professional Document Creation • Exam Design Excellence • Typing Efficiency
        </p>
      </div>
      
      <div style={styles.statsBar}>
        <div style={styles.statItem}>
          <span style={styles.statLabel}>Total Points</span>
          <span style={styles.statValue}>{progress.points}</span>
        </div>
        <div style={styles.statItem}>
          <span style={styles.statLabel}>Badges Earned</span>
          <span style={styles.statValue}>{progress.badges.length}</span>
        </div>
        <div style={styles.statItem}>
          <span style={styles.statLabel}>Lessons Completed</span>
          <span style={styles.statValue}>{progress.completedLessons.length}</span>
        </div>
      </div>
      
      <div style={styles.introSection}>
        <h2 style={styles.sectionTitle}>Welcome to Professional-Level Training</h2>
        <p style={styles.introPara}>
          This is not a basic Word tutorial. This is professional development for educators who create 
          exam papers, assessment materials, and academic documents that must meet moderation standards.
        </p>
        <p style={styles.introPara}>
          You will master: typing discipline that increases speed by 40%, professional formatting that 
          saves hours per exam, table structures for perfect alignment, template systems for consistency, 
          and accessibility standards that ensure fairness.
        </p>
        <p style={styles.introPara}>
          Upon completion, you will work at examination board level—creating documents indistinguishable 
          from professional exam moderators.
        </p>
      </div>
      
      <div style={styles.levelsContainer}>
        {levels.map((level, index) => {
          const isUnlocked = progress.unlockedLevels.includes(index);
          const levelProgress = getLevelProgress(index);
          const isCompleted = levelProgress === 100;
          
          return (
            <div 
              key={level.id} 
              style={{
                ...styles.levelCard,
                opacity: isUnlocked ? 1 : 0.5,
                cursor: isUnlocked ? 'pointer' : 'not-allowed'
              }}
              onClick={() => isUnlocked && goToLevel(index)}
            >
              <div style={styles.levelHeader}>
                <h3 style={styles.levelTitle}>
                  {isCompleted ? '✅ ' : isUnlocked ? '📖 ' : '🔒 '}
                  {level.title}
                </h3>
                {!isUnlocked && index > 0 && (
                  <span style={styles.lockMessage}>
                    Requires {level.pointsRequired} points • Complete previous level to unlock
                  </span>
                )}
              </div>
              
              <p style={styles.levelDescription}>{level.description}</p>
              
              {isUnlocked && (
                <>
                  <div style={styles.progressBarContainer}>
                    <div style={{...styles.progressBar, width: `${levelProgress}%`}}></div>
                  </div>
                  <p style={styles.progressText}>
                    {levelProgress.toFixed(0)}% Complete • {level.lessons.length} Lessons
                  </p>
                </>
              )}
              
              {isCompleted && (
                <div style={styles.badgeContainer}>
                  <span style={styles.badge}>{level.badge}</span>
                </div>
              )}
            </div>
          );
        })}
      </div>
      
      <div style={styles.footerActions}>
        {saveIndicator && (
          <span style={styles.saveIndicator}>✅ Progress saved automatically</span>
        )}
        <button 
          onClick={() => setShowResetConfirm(true)}
          style={styles.resetButton}
        >
          Reset Training Progress
        </button>
      </div>
      
      {showResetConfirm && (
        <div style={styles.modal}>
          <div style={styles.modalContent}>
            <h3>Reset All Progress?</h3>
            <p>This will permanently delete all your completed lessons, points, and badges.</p>
            <div style={styles.modalActions}>
              <button onClick={resetProgress} style={styles.confirmButton}>
                Yes, Reset Everything
              </button>
              <button onClick={() => setShowResetConfirm(false)} style={styles.cancelButton}>
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
  
  // Render Level View
  const renderLevel = () => {
    const level = levels[currentLevel];
    const levelProgress = getLevelProgress(currentLevel);
    
    return (
      <div style={styles.container}>
        <button onClick={() => setCurrentView('home')} style={styles.backButton}>
          ← Back to Levels
        </button>
        
        <div style={styles.levelDetailHeader}>
          <h1 style={styles.mainTitle}>{level.title}</h1>
          <p style={styles.subtitle}>{level.description}</p>
          
          <div style={styles.progressBarContainer}>
            <div style={{...styles.progressBar, width: `${levelProgress}%`}}></div>
          </div>
          <p style={styles.progressText}>{levelProgress.toFixed(0)}% Complete</p>
        </div>
        
        <div style={styles.lessonsGrid}>
          {level.lessons.map((lesson, index) => {
            const completed = isLessonCompleted(lesson.id);
            const quizDone = isQuizCompleted(lesson.id);
            
            return (
              <div 
                key={lesson.id}
                style={styles.lessonCard}
                onClick={() => goToLesson(index)}
              >
                <div style={styles.lessonNumber}>
                  {completed ? '✅' : index + 1}
                </div>
                <h3 style={styles.lessonTitle}>{lesson.title}</h3>
                <p style={styles.lessonGoal}>{lesson.goal}</p>
                
                <div style={styles.lessonMeta}>
                  {completed && <span style={styles.metaBadge}>✓ Lesson Complete</span>}
                  {quizDone && <span style={styles.metaBadge}>✓ Quiz Passed</span>}
                  {!completed && <span style={styles.metaBadge}>📚 Not Started</span>}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    );
  };
  
  // Render Lesson View
  const renderLesson = () => {
    const level = levels[currentLevel];
    const lesson = level.lessons[currentLessonIndex];
    const content = lesson.content;
    
    return (
      <div style={styles.container}>
        <button onClick={() => setCurrentView('level')} style={styles.backButton}>
          ← Back to {level.title}
        </button>
        
        <div style={styles.lessonHeader}>
          <h1 style={styles.lessonMainTitle}>{lesson.title}</h1>
          <p style={styles.lessonGoalText}>🎯 {lesson.goal}</p>
        </div>
        
        <div style={styles.lessonContent}>
          <div style={styles.contentSection}>
            <h2 style={styles.contentHeading}>Introduction</h2>
            <p style={styles.contentPara}>{content.introduction}</p>
          </div>
          
          <div style={styles.contentSection}>
            <h2 style={styles.contentHeading}>Professional Skills</h2>
            {content.actionCards.map((card, index) => (
              <div key={index} style={styles.actionCard}>
                <h3 style={styles.actionCardTitle}>{card.title}</h3>
                <p style={styles.actionCardDesc}>{card.description}</p>
                <div style={styles.exampleBox}>
                  <strong>Professional Example:</strong> {card.example}
                </div>
              </div>
            ))}
          </div>
          
          <div style={styles.contentSection}>
            <h2 style={styles.contentHeading}>Mobile vs PC Approaches</h2>
            <div style={styles.comparisonGrid}>
              <div style={styles.comparisonCard}>
                <h4 style={styles.comparisonTitle}>💻 PC Method</h4>
                <p style={styles.comparisonText}>{content.mobileVsPc.pc}</p>
              </div>
              <div style={styles.comparisonCard}>
                <h4 style={styles.comparisonTitle}>📱 Mobile Method</h4>
                <p style={styles.comparisonText}>{content.mobileVsPc.mobile}</p>
              </div>
            </div>
          </div>
          
          {content.practiceExercise && (
            <div style={styles.contentSection}>
              <h2 style={styles.contentHeading}>Practice Exercise</h2>
              <div style={styles.practiceBox}>
                <p style={styles.practiceInstruction}>
                  <strong>Instructions:</strong> {content.practiceExercise.instruction}
                </p>
                
                <div style={styles.typingArea}>
                  <div style={styles.refeenceText}>
<strong>Reference Text:</strong>
<pre style={styles.preText}>{content.practiceExercise.text}</pre>
</div>
<div style={styles.formattingControls}>
                <button 
                  style={{
                    ...styles.formatButton,
                    fontWeight: formattingState.bold ? 'bold' : 'normal',
                    backgroundColor: formattingState.bold ? '#e0e0e0' : '#f5f5f5'
                  }}
                  onClick={() => setFormattingState(prev => ({...prev, bold: !prev.bold}))}
                >
                  B
                </button>
                <button 
                  style={{
                    ...styles.formatButton,
                    fontStyle: formattingState.italic ? 'italic' : 'normal',
                    backgroundColor: formattingState.italic ? '#e0e0e0' : '#f5f5f5'
                  }}
                  onClick={() => setFormattingState(prev => ({...prev, italic: !prev.italic}))}
                >
                  I
                </button>
                <button 
                  style={{
                    ...styles.formatButton,
                    textDecoration: formattingState.underline ? 'underline' : 'none',
                    backgroundColor: formattingState.underline ? '#e0e0e0' : '#f5f5f5'
                  }}
                  onClick={() => setFormattingState(prev => ({...prev, underline: !prev.underline}))}
                >
                  U
                </button>
                
                <select 
                  style={styles.formatSelect}
                  value={formattingState.align}
                  onChange={(e) => setFormattingState(prev => ({...prev, align: e.target.value}))}
                >
                  <option value="left">Align Left</option>
                  <option value="center">Center</option>
                  <option value="right">Align Right</option>
                </select>
                
                <select 
                  style={styles.formatSelect}
                  value={formattingState.lineSpacing}
                  onChange={(e) => setFormattingState(prev => ({...prev, lineSpacing: e.target.value}))}
                >
                  <option value="1.0">Single Spacing</option>
                  <option value="1.15">1.15 Spacing</option>
                  <option value="1.5">1.5 Spacing</option>
                  <option value="2.0">Double Spacing</option>
                </select>
              </div>
              
              <textarea
                style={{
                  ...styles.typingTextarea,
                  fontWeight: formattingState.bold ? 'bold' : 'normal',
                  fontStyle: formattingState.italic ? 'italic' : 'normal',
                  textDecoration: formattingState.underline ? 'underline' : 'none',
                  textAlign: formattingState.align,
                  lineHeight: formattingState.lineSpacing
                }}
                value={typingText}
                onChange={(e) => setTypingText(e.target.value)}
                placeholder="Type your practice text here..."
                rows={8}
              />
              
              <p style={styles.typingStats}>
                Characters typed: {typingText.length} | 
                Words: {typingText.trim().split(/\s+/).filter(w => w).length}
              </p>
            </div>
            
            <div 
              style={styles.collapsibleSection}
              onClick={() => toggleSection(`why-${lesson.id}`)}
            >
              <h4 style={styles.collapsibleTitle}>
                {expandedSections[`why-${lesson.id}`] ? '▼' : '▶'} Why This Matters in Professional Exam Creation
              </h4>
              {expandedSections[`why-${lesson.id}`] && (
                <p style={styles.collapsibleContent}>{content.practiceExercise.why}</p>
              )}
            </div>
          </div>
        </div>
      )}
      
      <div style={styles.contentSection}>
        <h2 style={styles.contentHeading}>Knowledge Check Quiz</h2>
        {!quizSubmitted ? (
          <div style={styles.quizContainer}>
            {lesson.quiz.questions.map((question, qIndex) => (
              <div key={qIndex} style={styles.quizQuestion}>
                <p style={styles.questionText}>
                  <strong>Question {qIndex + 1}:</strong> {question.q}
                </p>
                <div style={styles.optionsContainer}>
                  {question.options.map((option, oIndex) => (
                    <label key={oIndex} style={styles.optionLabel}>
                      <input
                        type="radio"
                        name={`question-${qIndex}`}
                        value={oIndex}
                        checked={quizAnswers[qIndex] === oIndex}
                        onChange={() => setQuizAnswers(prev => ({...prev, [qIndex]: oIndex}))}
                        style={styles.radioInput}
                      />
                      <span style={styles.optionText}>{option}</span>
                    </label>
                  ))}
                </div>
              </div>
            ))}
            
            <button 
              onClick={handleQuizSubmit}
              style={styles.submitQuizButton}
              disabled={Object.keys(quizAnswers).length < lesson.quiz.questions.length}
            >
              Submit Quiz
            </button>
          </div>
        ) : (
          <div style={styles.quizResults}>
            <h3 style={styles.resultsTitle}>
              {quizScore >= 80 ? '✅ Excellent!' : quizScore >= 60 ? '👍 Good Progress' : '📚 Review Recommended'}
            </h3>
            <p style={styles.scoreText}>You scored {quizScore.toFixed(0)}%</p>
            
            <div style={styles.resultsBreakdown}>
              {lesson.quiz.questions.map((question, qIndex) => {
                const userAnswer = quizAnswers[qIndex];
                const isCorrect = userAnswer === question.correct;
                
                return (
                  <div key={qIndex} style={styles.resultItem}>
                    <p style={styles.resultQuestion}>
                      <strong>Q{qIndex + 1}:</strong> {question.q}
                    </p>
                    <p style={isCorrect ? styles.correctAnswer : styles.incorrectAnswer}>
                      {isCorrect ? '✓ Correct' : '✗ Incorrect'}
                    </p>
                    {!isCorrect && (
                      <p style={styles.correctAnswerText}>
                        Correct answer: {question.options[question.correct]}
                      </p>
                    )}
                  </div>
                );
              })}
            </div>
            
            <div style={styles.quizActions}>
              <button onClick={resetQuiz} style={styles.retryButton}>
                Retry Quiz
              </button>
              <button 
                onClick={() => {
                  completeLesson(lesson.id);
                  nextLesson();
                }} 
                style={styles.continueButton}
              >
                Continue to Next Lesson →
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  </div>
);
};
//Render Certificate View
const renderCertificate = () => {
const level = levels[currentLevel];
return (
  <div style={styles.container}>
    <div style={styles.certificateContainer}>
      <h1 style={styles.certificateTitle}>🎓 Level Completed!</h1>
      <h2 style={styles.certificateLevel}>{level.title}</h2>
      <p style={styles.certificateBadge}>{level.badge}</p>
      
      <div style={styles.certificateStats}>
        <p style={styles.statLine}>Total Points Earned: <strong>{progress.points}</strong></p>
        <p style={styles.statLine}>Lessons Completed: <strong>{progress.completedLessons.length}</strong></p>
        <p style={styles.statLine}>Badges Achieved: <strong>{progress.badges.length}</strong></p>
      </div>
      
      <div style={styles.certificateMessage}>
        <p style={styles.messagePara}>
          You have successfully completed <strong>{level.title}</strong>. This is the level 
          of proficiency that examination moderators expect. You are now working at professional 
          examination board standards.
        </p>
        <p style={styles.messagePara}>
          Enter your details below to receive your achievement certificate and unlock exclusive 
          professional development resources.
        </p>
      </div>
      
      {!formSubmitted ? (
        <form 
          action="https://formspree.io/f/xbjbobwv" 
          method="POST"
          style={styles.certificateForm}
          onSubmit={handleCertificateSubmit}
        >
          <input type="hidden" name="level_completed" value={level.title} />
          <input type="hidden" name="total_points" value={progress.points} />
          <input type="hidden" name="badge_earned" value={level.badge} />
          
          <div style={styles.formGroup}>
            <label style={styles.formLabel}>Full Name *</label>
            <input
              type="text"
              name="teacher_name"
              required
              style={styles.formInput}
              value={certificateForm.name}
              onChange={(e) => setCertificateForm(prev => ({...prev, name: e.target.value}))}
              placeholder="Enter your full name"
            />
          </div>
          
          <div style={styles.formGroup}>
            <label style={styles.formLabel}>Email Address *</label>
            <input
              type="email"
              name="email"
              required
              style={styles.formInput}
              value={certificateForm.email}
              onChange={(e) => setCertificateForm(prev => ({...prev, email: e.target.value}))}
              placeholder="your.email@school.edu"
            />
          </div>
          
          <div style={styles.formGroup}>
            <label style={styles.formLabel}>Optional Feedback</label>
            <textarea
              name="feedback"
              style={styles.formTextarea}
              value={certificateForm.feedback}
              onChange={(e) => setCertificateForm(prev => ({...prev, feedback: e.target.value}))}
              placeholder="How has this training improved your document creation skills?"
              rows={4}
            />
          </div>
          
          <button type="submit" style={styles.submitCertButton}>
            Request Certificate
          </button>
        </form>
      ) : (
        <div style={styles.submissionSuccess}>
          <h3 style={styles.successTitle}>✅ Submission Successful!</h3>
          <p style={styles.successMessage}>
            Your certificate request has been received. Check your email for your achievement 
            badge and access to advanced professional development materials.
          </p>
        </div>
      )}
      
      <button 
        onClick={() => setCurrentView('home')}
        style={styles.returnHomeButton}
      >
        Return to Training Home
      </button>
    </div>
  </div>
);
};

return(
<div style={styles.app}>
{currentView === 'home' && renderHome()}
{currentView === 'level' && renderLevel()}
{currentView === 'lesson' && renderLesson()}
{currentView === 'certificate' && renderCertificate()}
</div>
);
};
// ==================== STYLES ====================
const styles = {
app: {
fontFamily: 'Arial, sans-serif',
backgroundColor: '#f8f9fa',
minHeight: '100vh',
padding: '20px',
},
container: {
maxWidth: '1200px',
margin: '0 auto',
backgroundColor: '#ffffff',
borderRadius: '8px',
padding: '30px',
boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
},
header: {
textAlign: 'center',
marginBottom: '30px',
borderBottom: '3px solid #1a73e8',
paddingBottom: '20px',
},
mainTitle: {
fontSize: '32px',
color: '#1a1a1a',
marginBottom: '10px',
fontWeight: '600',
},
subtitle: {
fontSize: '16px',
color: '#5f6368',
margin: '0',
},
statsBar: {
display: 'flex',
justifyContent: 'space-around',
padding: '20px',
backgroundColor: '#f1f3f4',
borderRadius: '8px',
marginBottom: '30px',
flexWrap: 'wrap',
gap: '15px',
},
statItem: {
textAlign: 'center',
minWidth: '120px',
},
statLabel: {
display: 'block',
fontSize: '14px',
color: '#5f6368',
marginBottom: '5px',
},
statValue: {
display: 'block',
fontSize: '24px',
fontWeight: 'bold',
color: '#1a73e8',
},
introSection: {
marginBottom: '40px',
padding: '20px',
backgroundColor: '#e8f0fe',
borderRadius: '8px',
borderLeft: '4px solid #1a73e8',
},
sectionTitle: {
fontSize: '24px',
color: '#1a1a1a',
marginBottom: '15px',
},
introPara: {
fontSize: '15px',
lineHeight: '1.6',
color: '#3c4043',
marginBottom: '12px',
},
levelsContainer: {
display: 'grid',
gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
gap: '20px',
marginBottom: '30px',
},
levelCard: {
border: '2px solid #dadce0',
borderRadius: '8px',
padding: '20px',
transition: 'all 0.3s ease',
},
levelHeader: {
marginBottom: '15px',
},
levelTitle: {
fontSize: '20px',
color: '#1a1a1a',
marginBottom: '8px',
},
lockMessage: {
fontSize: '13px',
color: '#ea4335',
display: 'block',
},
levelDescription: {
fontSize: '14px',
color: '#5f6368',
lineHeight: '1.5',
marginBottom: '15px',
},
progressBarContainer: {
width: '100%',
height: '8px',
backgroundColor: '#e0e0e0',
borderRadius: '4px',
overflow: 'hidden',
marginBottom: '8px',
},
progressBar: {
height: '100%',
backgroundColor: '#34a853',
transition: 'width 0.5s ease',
},
progressText: {
fontSize: '13px',
color: '#5f6368',
margin: '0',
},
badgeContainer: {
marginTop: '15px',
textAlign: 'center',
},
badge: {
fontSize: '18px',
padding: '8px 16px',
backgroundColor: '#fef7e0',
border: '1px solid #f9ab00',
borderRadius: '20px',
display: 'inline-block',
},
footerActions: {
textAlign: 'center',
marginTop: '30px',
paddingTop: '20px',
borderTop: '1px solid #dadce0',
},
saveIndicator: {
color: '#34a853',
fontSize: '14px',
marginRight: '20px',
},
resetButton: {
padding: '10px 20px',
backgroundColor: '#ea4335',
color: '#ffffff',
border: 'none',
borderRadius: '4px',
cursor: 'pointer',
fontSize: '14px',
},
modal: {
position: 'fixed',
top: '0',
left: '0',
width: '100%',
height: '100%',
backgroundColor: 'rgba(0,0,0,0.5)',
display: 'flex',
justifyContent: 'center',
alignItems: 'center',
zIndex: '1000',
},
modalContent: {
backgroundColor: '#ffffff',
padding: '30px',
borderRadius: '8px',
maxWidth: '400px',
textAlign: 'center',
},
modalActions: {
display: 'flex',
gap: '10px',
justifyContent: 'center',
marginTop: '20px',
},
confirmButton: {
padding: '10px 20px',
backgroundColor: '#ea4335',
color: '#ffffff',
border: 'none',
borderRadius: '4px',
cursor: 'pointer',
},
cancelButton: {
padding: '10px 20px',
backgroundColor: '#dadce0',
color: '#1a1a1a',
border: 'none',
borderRadius: '4px',
cursor: 'pointer',
},
backButton: {
padding: '8px 16px',
backgroundColor: '#f1f3f4',
border: '1px solid #dadce0',
borderRadius: '4px',
cursor: 'pointer',
fontSize: '14px',
marginBottom: '20px',
},
levelDetailHeader: {
textAlign: 'center',
marginBottom: '30px',
},
lessonsGrid: {
display: 'grid',
gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))',
gap: '20px',
},
lessonCard: {
border: '1px solid #dadce0',
borderRadius: '8px',
padding: '20px',
cursor: 'pointer',
transition: 'all 0.3s ease',
backgroundColor: '#ffffff',
},
lessonNumber: {
width: '40px',
height: '40px',
borderRadius: '50%',
backgroundColor: '#1a73e8',
color: '#ffffff',
display: 'flex',
justifyContent: 'center',
alignItems: 'center',
fontSize: '18px',
fontWeight: 'bold',
marginBottom: '12px',
},
lessonTitle: {
fontSize: '18px',
color: '#1a1a1a',
marginBottom: '10px',
},
lessonGoal: {
fontSize: '14px',
color: '#5f6368',
lineHeight: '1.4',
marginBottom: '15px',
},
lessonMeta: {
display: 'flex',
gap: '8px',
flexWrap: 'wrap',
},
metaBadge: {
fontSize: '12px',
padding: '4px 8px',
backgroundColor: '#e8f0fe',
borderRadius: '12px',
color: '#1a73e8',
},
lessonHeader: {
marginBottom: '30px',
paddingBottom: '20px',
borderBottom: '2px solid #dadce0',
},
lessonMainTitle: {
fontSize: '28px',
color: '#1a1a1a',
marginBottom: '10px',
},
lessonGoalText: {
fontSize: '16px',
color: '#1a73e8',
fontWeight: '500',
},
lessonContent: {
lineHeight: '1.6',
},
contentSection: {
marginBottom: '40px',
},
contentHeading: {
fontSize: '22px',
color: '#1a1a1a',
marginBottom: '20px',
paddingBottom: '10px',
borderBottom: '2px solid #f1f3f4',
},
contentPara: {
fontSize: '15px',
color: '#3c4043',
lineHeight: '1.7',
marginBottom: '15px',
},
actionCard: {
backgroundColor: '#f8f9fa',
border: '1px solid #dadce0',
borderRadius: '8px',
padding: '20px',
marginBottom: '15px',
},
actionCardTitle: {
fontSize: '18px',
color: '#1a73e8',
marginBottom: '10px',
},
actionCardDesc: {
fontSize: '14px',
color: '#3c4043',
lineHeight: '1.6',
marginBottom: '12px',
},
exampleBox: {
backgroundColor: '#e8f0fe',
padding: '12px',
borderRadius: '4px',
fontSize: '14px',
color: '#1967d2',
borderLeft: '3px solid #1a73e8',
},
comparisonGrid: {
display: 'grid',
gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
gap: '20px',
},
comparisonCard: {
backgroundColor: '#f1f3f4',
padding: '20px',
borderRadius: '8px',
border: '1px solid #dadce0',
},
comparisonTitle: {
fontSize: '16px',
color: '#1a1a1a',
marginBottom: '10px',
},
comparisonText: {
fontSize: '14px',
color: '#3c4043',
lineHeight: '1.6',
},
practiceBox: {
backgroundColor: '#fef7e0',
border: '2px solid #f9ab00',
borderRadius: '8px',
padding: '20px',
},
practiceInstruction: {
fontSize: '15px',
color: '#3c4043',
marginBottom: '15px',
},
typingArea: {
backgroundColor: '#ffffff',
padding: '15px',
borderRadius: '4px',
marginTop: '15px',
},
referenceText: {
marginBottom: '15px',
},
preText: {
backgroundColor: '#f8f9fa',
padding: '12px',
borderRadius: '4px',
fontSize: '13px',
lineHeight: '1.5',
overflow: 'auto',
whiteSpace: 'pre-wrap',
fontFamily: 'monospace',
},
formattingControls: {
display: 'flex',
gap: '10px',
marginBottom: '15px',
flexWrap: 'wrap',
},
formatButton: {
width: '40px',
height: '36px',
border: '1px solid #dadce0',
borderRadius: '4px',
cursor: 'pointer',
fontSize: '16px',
},
formatSelect: {
padding: '8px',
border: '1px solid #dadce0',
borderRadius: '4px',
fontSize: '14px',
},
typingTextarea: {
width: '100%',
padding: '12px',
border: '1px solid #dadce0',
borderRadius: '4px',
fontSize: '14px',
fontFamily: 'Arial, sans-serif',
resize: 'vertical',
boxSizing: 'border-box',
},
typingStats: {
fontSize: '13px',
color: '#5f6368',
marginTop: '10px',
},
collapsibleSection: {
marginTop: '20px',
cursor: 'pointer',
padding: '15px',
backgroundColor: '#ffffff',
border: '1px solid #dadce0',
borderRadius: '4px',
},
collapsibleTitle: {
fontSize: '16px',
color: '#1a73e8',
margin: '0',
},
collapsibleContent: {
fontSize: '14px',
color: '#3c4043',
marginTop: '12px',
lineHeight: '1.6',
},
quizContainer: {
backgroundColor: '#f8f9fa',
padding: '20px',
borderRadius: '8px',
},
quizQuestion: {
marginBottom: '25px',
padding: '15px',
backgroundColor: '#ffffff',
borderRadius: '4px',
border: '1px solid #dadce0',
},
questionText: {
fontSize: '15px',
color: '#1a1a1a',
marginBottom: '12px',
},
optionsContainer: {
display: 'flex',
flexDirection: 'column',
gap: '10px',
},
optionLabel: {
display: 'flex',
alignItems: 'center',
padding: '10px',
backgroundColor: '#f8f9fa',
borderRadius: '4px',
cursor: 'pointer',
transition: 'background-color 0.2s',
},
radioInput: {
marginRight: '10px',
},
optionText: {
fontSize: '14px',
color: '#3c4043',
},
submitQuizButton: {
width: '100%',
padding: '12px',
backgroundColor: '#1a73e8',
color: '#ffffff',
border: 'none',
borderRadius: '4px',
fontSize: '16px',
fontWeight: '500',
cursor: 'pointer',
marginTop: '20px',
},
quizResults: {
backgroundColor: '#e8f0fe',
padding: '20px',
borderRadius: '8px',
},
resultsTitle: {
fontSize: '22px',
color: '#1a1a1a',
marginBottom: '10px',
},
scoreText: {
fontSize: '18px',
color: '#1a73e8',
fontWeight: 'bold',
marginBottom: '20px',
},
resultsBreakdown: {
marginBottom: '20px',
},
resultItem: {
padding: '12px',
backgroundColor: '#ffffff',
borderRadius: '4px',
marginBottom: '10px',
},
resultQuestion: {
fontSize: '14px',
color: '#3c4043',
marginBottom: '5px',
},
correctAnswer: {
color: '#34a853',
fontSize: '14px',
fontWeight: 'bold',
},
incorrectAnswer: {
color: '#ea4335',
fontSize: '14px',
fontWeight: 'bold',
},
correctAnswerText: {
fontSize: '13px',
color: '#5f6368',
marginTop: '5px',
},
quizActions: {
display: 'flex',
gap: '10px',
flexWrap: 'wrap',
},
retryButton: {
flex: '1',
minWidth: '150px',
padding: '12px',
backgroundColor: '#f1f3f4',
border: '1px solid #dadce0',
borderRadius: '4px',
cursor: 'pointer',
fontSize: '14px',
},
continueButton: {
flex: '1',
minWidth: '150px',
padding: '12px',
backgroundColor: '#34a853',
color: '#ffffff',
border: 'none',
borderRadius: '4px',
cursor: 'pointer',
fontSize: '14px',
fontWeight: '500',
},
certificateContainer: {
textAlign: 'center',
padding: '40px 20px',
},
certificateTitle: {
fontSize: '36px',
color: '#1a73e8',
marginBottom: '20px',
},
certificateLevel: {
fontSize: '24px',
color: '#1a1a1a',
marginBottom: '15px',
},
certificateBadge: {
fontSize: '28px',
marginBottom: '30px',
},
certificateStats: {
backgroundColor: '#f8f9fa',
padding: '20px',
borderRadius: '8px',
marginBottom: '30px',
maxWidth: '500px',
margin: '0 auto 30px',
},
statLine: {
fontSize: '16px',
color: '#3c4043',
marginBottom: '10px',
},
certificateMessage: {
maxWidth: '600px',
margin: '0 auto 30px',
textAlign: 'left',
},
messagePara: {
fontSize: '15px',
color: '#3c4043',
lineHeight: '1.6',
marginBottom: '15px',
},
certificateForm: {
maxWidth: '500px',
margin: '0 auto 30px',
textAlign: 'left',
},
formGroup: {
marginBottom: '20px',
},
formLabel: {
display: 'block',
fontSize: '14px',
color: '#3c4043',
marginBottom: '8px',
fontWeight: '500',
},
formInput: {
width: '100%',
padding: '10px',
border: '1px solid #dadce0',
borderRadius: '4px',
fontSize: '14px',
boxSizing: 'border-box',
},
formTextarea: {
width: '100%',
padding: '10px',
border: '1px solid #dadce0',
borderRadius: '4px',
fontSize: '14px',
resize: 'vertical',
boxSizing: 'border-box',
},
submitCertButton: {
width: '100%',
padding: '14px',
backgroundColor: '#1a73e8',
color: '#ffffff',
border: 'none',
borderRadius: '4px',
fontSize: '16px',
fontWeight: '500',
cursor: 'pointer',
},
submissionSuccess: {
maxWidth: '500px',
margin: '0 auto 30px',
padding: '20px',
backgroundColor: '#e6f4ea',
borderRadius: '8px',
border: '1px solid #34a853',
},
successTitle: {
fontSize: '20px',
color: '#34a853',
marginBottom: '10px',
},
successMessage: {
fontSize: '15px',
color: '#3c4043',
lineHeight: '1.6',
},
returnHomeButton: {
padding: '12px 24px',
backgroundColor: '#f1f3f4',
border: '1px solid #dadce0',
borderRadius: '4px',
cursor: 'pointer',
fontSize: '14px',
fontWeight: '500',
},
};
export default WordTrain;
