import React, { useState, useEffect } from 'react';

const ExcelTrain = () => {
  // ============================================================================
  // STATE MANAGEMENT
  // ============================================================================

  // Navigation state
  const [currentView, setCurrentView] = useState('home'); // home, level, lesson, quiz, badge
  const [currentLevel, setCurrentLevel] = useState(null);
  const [currentLessonIndex, setCurrentLessonIndex] = useState(0);

  // Progress state
  const [completedLessons, setCompletedLessons] = useState([]);
  const [unlockedLevels, setUnlockedLevels] = useState(['beginner']);
  const [totalPoints, setTotalPoints] = useState(0);
  const [earnedBadges, setEarnedBadges] = useState([]);
  const [quizAttempts, setQuizAttempts] = useState({});

  // Quiz state
  const [currentQuizAnswers, setCurrentQuizAnswers] = useState({});
  const [quizSubmitted, setQuizSubmitted] = useState(false);
  const [quizScore, setQuizScore] = useState(0);

  // Excel simulation state
  const [spreadsheetData, setSpreadsheetData] = useState({});
  const [formulaError, setFormulaError] = useState('');

  // Badge form state
  const [badgeFormData, setBadgeFormData] = useState({
    Name: '',
    Email: '',
    Message: ''
  });
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [pendingBadgeLevel, setPendingBadgeLevel] = useState(null);

  // UI state
  const [showResetConfirm, setShowResetConfirm] = useState(false);
  const [saveIndicator, setSaveIndicator] = useState(false);
  const [expandedSections, setExpandedSections] = useState({});

  // ============================================================================
  // COURSE CONTENT DEFINITION
  // ============================================================================

  const courseContent = {
    beginner: {
      title: 'Beginner Level',
      description: 'Master the fundamentals of Excel',
      objectives: [
        'Understand cells, rows, and columns',
        'Create basic formulas and calculations',
        'Format data professionally',
        'Build simple charts'
      ],
      badge: 'Excel Foundation Master',
      lessons: [
        {
          id: 'beginner-1',
          title: 'Introduction to Cells and Ranges',
          goal: 'Learn to navigate and reference cells in Excel',
          actionCards: [
            {
              step: 1,
              title: 'Understanding Cell References',
              instruction: 'In the spreadsheet below, click on cell A1. Notice how it\'s referenced by its column letter (A) and row number (1).',
              hint: 'Cell references are like addresses - they tell Excel exactly where to find data.'
            },
            {
              step: 2,
              title: 'Entering Data',
              instruction: 'Click on cell A1 and type "Student Name". Then press Enter or click on another cell.',
              hint: 'You can edit any cell by clicking on it and typing.'
            },
            {
              step: 3,
              title: 'Working with Ranges',
              instruction: 'Enter "Score" in cell B1. A range like A1:B1 refers to all cells from A1 to B1.',
              hint: 'Ranges are super useful when you want to work with multiple cells at once.'
            }
          ],
          spreadsheetSetup: {
            rows: 5,
            cols: 3,
            initialData: {
              'A1': '',
              'B1': '',
              'C1': ''
            }
          },
          explanation: {
            title: 'Why Cell References Matter',
            content: 'Cell references are the foundation of Excel. They allow formulas to be dynamic - if the data in a cell changes, any formula referencing that cell updates automatically. This is what makes Excel so powerful for tracking grades, budgets, and any data that changes over time.'
          },
          quiz: [
            {
              id: 'bq1-1',
              type: 'multiple',
              question: 'What does the cell reference "C5" mean?',
              options: [
                'Column 5, Row C',
                'Column C, Row 5',
                'Cell number 5 in column C',
                'The 5th cell in the spreadsheet'
              ],
              correct: 1,
              explanation: 'Cell references always list the column letter first, then the row number. So C5 means column C, row 5.'
            },
            {
              id: 'bq1-2',
              type: 'multiple',
              question: 'A range A1:A10 includes how many cells?',
              options: ['9 cells', '10 cells', '11 cells', '1 cell'],
              correct: 1,
              explanation: 'The range A1:A10 includes all cells from A1 through A10, which is 10 cells total.'
            },
            {
              id: 'bq1-3',
              type: 'truefalse',
              question: 'Cell references are case-sensitive (a1 is different from A1).',
              correct: false,
              explanation: 'Excel cell references are NOT case-sensitive. You can type a1, A1, or even a1 - they all refer to the same cell.'
            }
          ]
        },
        {
          id: 'beginner-2',
          title: 'Basic Formulas and Calculations',
          goal: 'Create formulas to perform automatic calculations',
          actionCards: [
            {
              step: 1,
              title: 'Your First Formula',
              instruction: 'Click on cell A1 and enter the number 10. In cell A2, enter 20. Now click on cell A3 and type =A1+A2 then press Enter.',
              hint: 'All formulas in Excel start with an equals sign (=). This tells Excel you want to calculate something, not just type text.'
            },
            {
              step: 2,
              title: 'Basic Operations',
              instruction: 'Try these in different cells: =A1-A2 (subtraction), =A1*A2 (multiplication), =A1/A2 (division).',
              hint: 'Use * for multiply and / for divide, just like in math class.'
            },
            {
              step: 3,
              title: 'Real Example: Test Scores',
              instruction: 'Enter your test scores in cells B1, B2, and B3. In B4, create a formula to add all three: =B1+B2+B3',
              hint: 'This is how you\'d calculate your total points across multiple tests!'
            }
          ],
          spreadsheetSetup: {
            rows: 6,
            cols: 3,
            initialData: {
              'A1': '',
              'A2': '',
              'A3': '',
              'B1': '',
              'B2': '',
              'B3': '',
              'B4': ''
            }
          },
          explanation: {
            title: 'The Power of Formulas',
            content: 'Formulas are what make Excel "smart". Instead of using a calculator and typing results, you create formulas that automatically update when your data changes. Imagine updating 100 student grades - with formulas, everything recalculates instantly!'
          },
          quiz: [
            {
              id: 'bq2-1',
              type: 'multiple',
              question: 'What symbol must every Excel formula start with?',
              options: ['#', '$', '=', '@'],
              correct: 2,
              explanation: 'Every formula must start with = (equals sign). This tells Excel to calculate, not display text.'
            },
            {
              id: 'bq2-2',
              type: 'formula',
              question: 'Write a formula to multiply cell A1 by cell B1:',
              correct: '=A1*B1',
              explanation: 'The correct formula is =A1*B1. Remember to use * for multiplication.'
            },
            {
              id: 'bq2-3',
              type: 'output',
              question: 'If A1 contains 15 and A2 contains 5, what will =A1-A2 display?',
              options: ['20', '10', '5', '3'],
              correct: 1,
              explanation: '15 - 5 = 10. The formula subtracts the value in A2 from A1.'
            }
          ]
        },
        {
          id: 'beginner-3',
          title: 'The SUM Function',
          goal: 'Use Excel\'s built-in SUM function for efficient addition',
          actionCards: [
            {
              step: 1,
              title: 'Why Use SUM?',
              instruction: 'Enter numbers in cells A1 through A5. Instead of typing =A1+A2+A3+A4+A5, we can use =SUM(A1:A5) in cell A6.',
              hint: 'SUM is much faster and less error-prone, especially with lots of numbers!'
            },
            {
              step: 2,
              title: 'Practice with Real Data',
              instruction: 'Imagine these are weekly allowances. Put amounts in A1:A5, then use SUM in A6 to find your monthly total.',
              hint: 'Functions like SUM can save you tons of time in real life.'
            },
            {
              step: 3,
              title: 'SUM Across Rows',
              instruction: 'Enter numbers in B1, C1, and D1. In E1, use =SUM(B1:D1) to add horizontally.',
              hint: 'SUM works for any range - vertical, horizontal, or even a rectangle of cells!'
            }
          ],
          spreadsheetSetup: {
            rows: 7,
            cols: 5,
            initialData: {}
          },
          explanation: {
            title: 'Functions Make Excel Powerful',
            content: 'Excel has hundreds of built-in functions. SUM is one of the most useful. Instead of typing long formulas, functions do complex calculations with simple syntax. Think of them as pre-programmed math helpers that save you time and reduce mistakes.'
          },
          quiz: [
            {
              id: 'bq3-1',
              type: 'formula',
              question: 'Write a SUM formula to add cells A1 through A10:',
              correct: '=SUM(A1:A10)',
              explanation: 'The correct syntax is =SUM(A1:A10). This adds all values from A1 to A10.'
            },
            {
              id: 'bq3-2',
              type: 'multiple',
              question: 'Which is more efficient for adding 50 cells?',
              options: [
                'Typing =A1+A2+A3+... all the way to A50',
                'Using =SUM(A1:A50)',
                'Adding them on a calculator',
                'They are equally efficient'
              ],
              correct: 1,
              explanation: '=SUM(A1:A50) is far more efficient. It\'s faster to type, easier to read, and less likely to have errors.'
            },
            {
              id: 'bq3-3',
              type: 'truefalse',
              question: 'SUM can only add numbers vertically (in a column).',
              correct: false,
              explanation: 'False! SUM works in any direction - vertical, horizontal, or even a rectangular block of cells.'
            }
          ]
        },
        {
          id: 'beginner-4',
          title: 'Basic Formatting and Charts',
          goal: 'Make your spreadsheets professional and easy to read',
          actionCards: [
            {
              step: 1,
              title: 'Formatting Basics',
              instruction: 'While we can\'t format cells in this simulation, in real Excel you\'d select cells and use the toolbar to make text bold, change colors, or adjust number formats (like currency or percentages).',
              hint: 'Good formatting makes data easier to read and more professional.'
            },
            {
              step: 2,
              title: 'Understanding Charts',
              instruction: 'Charts turn numbers into visual stories. A bar chart might show test scores across subjects. A pie chart could show how you spend your monthly allowance.',
              hint: 'The right chart type depends on what story you want to tell with your data.'
            },
            {
              step: 3,
              title: 'When to Use Each Chart',
              instruction: 'Bar/Column: Compare values across categories. Line: Show trends over time. Pie: Show parts of a whole (percentages).',
              hint: 'Choose the chart type that makes your data clearest to understand.'
            }
          ],
          spreadsheetSetup: {
            rows: 5,
            cols: 4,
            initialData: {
              'A1': 'Subject',
              'B1': 'Score',
              'A2': 'Math',
              'B2': '85',
              'A3': 'Science',
              'B3': '92',
              'A4': 'English',
              'B4': '88'
            }
          },
          explanation: {
            title: 'Visual Communication',
            content: 'Formatting and charts aren\'t just decoration - they\'re communication tools. A well-formatted spreadsheet is easier to read and understand. Charts can reveal patterns that are hard to see in raw numbers. These skills are essential in school, work, and life.'
          },
          quiz: [
            {
              id: 'bq4-1',
              type: 'multiple',
              question: 'Which chart type is best for showing how test scores changed over the school year?',
              options: ['Pie chart', 'Line chart', 'Bar chart', 'Scatter plot'],
              correct: 1,
              explanation: 'A line chart is best for showing trends over time. It clearly shows whether scores are improving or declining.'
            },
            {
              id: 'bq4-2',
              type: 'multiple',
              question: 'What\'s the main purpose of formatting in Excel?',
              options: [
                'To make spreadsheets colorful',
                'To improve readability and professionalism',
                'To make files larger',
                'It has no real purpose'
              ],
              correct: 1,
              explanation: 'Formatting improves readability and professionalism. It helps people understand your data quickly and shows attention to detail.'
            },
            {
              id: 'bq4-3',
              type: 'truefalse',
              question: 'A pie chart is good for comparing values across many categories.',
              correct: false,
              explanation: 'False! Pie charts work best with a few categories (2-5). For many categories, bar charts are clearer and easier to compare.'
            }
          ]
        }
      ]
    },
    intermediate: {
      title: 'Intermediate Level',
      description: 'Build practical skills with functions and data analysis',
      objectives: [
        'Master conditional logic with IF statements',
        'Use AVERAGE, COUNT, and COUNTIF functions',
        'Sort and filter data effectively',
        'Apply conditional formatting',
        'Complete a real-world mini project'
      ],
      badge: 'Excel Analyst',
      lessons: [
        {
          id: 'intermediate-1',
          title: 'The IF Function: Making Decisions',
          goal: 'Use IF to make Excel respond differently based on conditions',
          actionCards: [
            {
              step: 1,
              title: 'Understanding IF Logic',
              instruction: 'The IF function follows this pattern: =IF(condition, value_if_true, value_if_false). Think of it like: "IF this is true, do this, OTHERWISE do that."',
              hint: 'IF is like teaching Excel to make decisions, just like you do every day!'
            },
            {
              step: 2,
              title: 'Example: Pass or Fail',
              instruction: 'Enter a test score in A1. In B1, type: =IF(A1>=60,"Pass","Fail"). Try different scores!',
              hint: 'This checks if A1 is 60 or higher. If yes, show "Pass". If no, show "Fail".'
            },
            {
              step: 3,
              title: 'Real Application',
              instruction: 'Create a grade checker: =IF(A1>=90,"A",IF(A1>=80,"B",IF(A1>=70,"C","Need Improvement")))',
              hint: 'You can nest IF statements to handle multiple conditions. This is how Excel becomes really smart!'
            }
          ],
          spreadsheetSetup: {
            rows: 6,
            cols: 3,
            initialData: {
              'A1': '',
              'B1': ''
            }
          },
          explanation: {
            title: 'Conditional Logic in Real Life',
            content: 'IF functions are everywhere in real Excel work. Teachers use them for grading. Businesses use them for sales bonuses ("IF sales > $10,000, bonus = $500"). You might use them to track if you\'ve saved enough for something you want. Learning IF opens up a whole new level of Excel power.'
          },
          quiz: [
            {
              id: 'iq1-1',
              type: 'formula',
              question: 'Write an IF formula: if A1 is greater than 100, show "High", otherwise show "Low":',
              correct: '=IF(A1>100,"High","Low")',
              explanation: 'The correct formula is =IF(A1>100,"High","Low"). Remember: condition, true_value, false_value.'
            },
            {
              id: 'iq1-2',
              type: 'output',
              question: 'If A1 contains 75, what will =IF(A1>=70,"Pass","Fail") display?',
              options: ['Pass', 'Fail', 'Error', '75'],
              correct: 0,
              explanation: '75 is greater than or equal to 70, so the condition is TRUE, and Excel displays "Pass".'
            },
            {
              id: 'iq1-3',
              type: 'multiple',
              question: 'How many parts does an IF function have?',
              options: ['2 parts', '3 parts', '4 parts', 'It varies'],
              correct: 1,
              explanation: 'IF has 3 parts: (1) the condition to check, (2) what to do if TRUE, (3) what to do if FALSE.'
            }
          ]
        },
        {
          id: 'intermediate-2',
          title: 'AVERAGE and COUNT Functions',
          goal: 'Calculate averages and count data automatically',
          actionCards: [
            {
              step: 1,
              title: 'Calculating Averages',
              instruction: 'Enter test scores in A1:A5. In A6, type =AVERAGE(A1:A5) to find the average score.',
              hint: 'AVERAGE adds all numbers and divides by how many there are. Excel does the math for you!'
            },
            {
              step: 2,
              title: 'Counting with COUNT',
              instruction: 'Enter some numbers in B1:B10 (leave some cells empty). Use =COUNT(B1:B10) to count how many cells contain numbers.',
              hint: 'COUNT is useful when you need to know how many data points you have.'
            },
            {
              step: 3,
              title: 'Real Example: Grade Tracker',
              instruction: 'Put your quiz scores in column A. Use AVERAGE to find your average score. Use COUNT to see how many quizzes you\'ve taken.',
              hint: 'These functions help you track your academic performance without manual calculation!'
            }
          ],
          spreadsheetSetup: {
            rows: 12,
            cols: 3,
            initialData: {}
          },
          explanation: {
            title: 'Statistical Functions',
            content: 'AVERAGE and COUNT are statistical functions. They\'re incredibly useful for analyzing data. Teachers use AVERAGE to calculate class averages. Businesses use it to track average sales. COUNT helps ensure you haven\'t missed any data. These are fundamental tools for anyone working with numbers.'
          },
          quiz: [
            {
              id: 'iq2-1',
              type: 'output',
              question: 'If cells contain 80, 90, and 100, what does =AVERAGE(A1:A3) return?',
              options: ['80', '85', '90', '270'],
              correct: 2,
              explanation: '(80+90+100)/3 = 270/3 = 90. AVERAGE adds the values and divides by the count.'
            },
            {
              id: 'iq2-2',
              type: 'multiple',
              question: 'What does COUNT ignore?',
              options: [
                'Numbers',
                'Empty cells and text',
                'Formulas',
                'Nothing'
              ],
              correct: 1,
              explanation: 'COUNT only counts cells with numbers. It ignores empty cells, text, and errors.'
            },
            {
              id: 'iq2-3',
              type: 'truefalse',
              question: 'AVERAGE and mean are the same thing.',
              correct: true,
              explanation: 'True! In statistics, "average" and "mean" refer to the same calculation: sum divided by count.'
            }
          ]
        },
        {
          id: 'intermediate-3',
          title: 'COUNTIF: Conditional Counting',
          goal: 'Count cells that meet specific criteria',
          actionCards: [
            {
              step: 1,
              title: 'Understanding COUNTIF',
              instruction: 'COUNTIF counts cells that meet a condition: =COUNTIF(range, criteria). Example: =COUNTIF(A1:A10,">80") counts scores above 80.',
              hint: 'This is like COUNT but smarter - it only counts what you specify!'
            },
            {
              step: 2,
              title: 'Counting Specific Values',
              instruction: 'Enter "Present" and "Absent" randomly in A1:A20. Use =COUNTIF(A1:A20,"Present") to count attendance.',
              hint: 'For text criteria, put them in quotes like "Present".'
            },
            {
              step: 3,
              title: 'Practical Use: Grade Distribution',
              instruction: 'With scores in A1:A20, use: =COUNTIF(A1:A20,">=90") for A grades, =COUNTIF(A1:A20,">=80") for B+ grades.',
              hint: 'This is how teachers analyze grade distributions across a class!'
            }
          ],
          spreadsheetSetup: {
            rows: 12,
            cols: 3,
            initialData: {
              'A1': '95',
              'A2': '87',
              'A3': '92',
              'A4': '78',
              'A5': '88',
              'A6': '91'
            }
          },
          explanation: {
            title: 'The Power of Conditional Functions',
            content: 'COUNTIF is your first "conditional" function - it makes decisions about what to count. This is essential for data analysis. Businesses use it to count sales above targets. Schools use it to analyze test performance. You could use it to count how many times you exercised this month. It turns raw data into insights.'
          },
          quiz: [
            {
              id: 'iq3-1',
              type: 'formula',
              question: 'Write a COUNTIF formula to count how many cells in A1:A10 are greater than 50:',
              correct: '=COUNTIF(A1:A10,">50")',
              explanation: 'The correct formula is =COUNTIF(A1:A10,">50"). Criteria with operators must be in quotes.'
            },
            {
              id: 'iq3-2',
              type: 'multiple',
              question: 'What does =COUNTIF(A1:A10,"Apple") do?',
              options: [
                'Counts numbers equal to "Apple"',
                'Counts cells containing exactly "Apple"',
                'Adds up all apples',
                'Returns an error'
              ],
              correct: 1,
              explanation: 'It counts cells that contain exactly the text "Apple". COUNTIF works with both numbers and text.'
            },
            {
              id: 'iq3-3',
              type: 'truefalse',
              question: 'COUNTIF can use comparison operators like >, <, and =.',
              correct: true,
              explanation: 'True! COUNTIF supports >, <, >=, <=, =, and <> (not equal). Just put them in quotes with the criteria.'
            }
          ]
        },
        {
          id: 'intermediate-4',
          title: 'Sorting and Filtering Data',
          goal: 'Organize and analyze data efficiently',
          actionCards: [
            {
              step: 1,
              title: 'Why Sort and Filter?',
              instruction: 'Imagine a class list with 100 students. Sorting alphabetically makes finding names easy. Filtering to show only students with A grades helps you see top performers.',
              hint: 'These tools help you make sense of large amounts of data quickly.'
            },
            {
              step: 2,
              title: 'Sorting Concepts',
              instruction: 'Sorting reorganizes rows based on one column\'s values. Sort alphabetically (A-Z), numerically (smallest to largest), or by date (oldest to newest).',
              hint: 'In real Excel, you\'d select your data and click Sort in the Data tab.'
            },
            {
              step: 3,
              title: 'Filtering Concepts',
              instruction: 'Filtering hides rows that don\'t match your criteria. Want to see only scores above 80? Filter! This doesn\'t delete data, just temporarily hides it.',
              hint: 'Filters are perfect for analyzing specific subsets of your data without changing the original.'
            }
          ],
          spreadsheetSetup: {
            rows: 8,
            cols: 3,
            initialData: {
              'A1': 'Name',
              'B1': 'Score',
              'C1': 'Grade',
              'A2': 'Alice',
              'B2': '95',
              'C2': 'A',
              'A3': 'Bob',
              'B3': '82',
              'C3': 'B',
              'A4': 'Charlie',
              'B4': '88',
              'C4': 'B',
              'A5': 'Diana',
              'B5': '91',
              'C5': 'A'
            }
          },
          explanation: {
            title: 'Data Organization Tools',
            content: 'Sorting and filtering are essential for working with real-world data. They help you find patterns, identify outliers, and focus on what matters. Whether you\'re managing a club membership list, tracking expenses, or analyzing survey results, these tools make large datasets manageable and meaningful.'
          },
          quiz: [
            {
              id: 'iq4-1',
              type: 'multiple',
              question: 'What does sorting do to your data?',
              options: [
                'Deletes unwanted rows',
                'Reorganizes rows based on criteria',
                'Hides some columns',
                'Creates a backup'
              ],
              correct: 1,
              explanation: 'Sorting reorganizes (reorders) rows based on the values in a selected column. No data is deleted or hidden.'
            },
            {
              id: 'iq4-2',
              type: 'multiple',
              question: 'What does filtering do to data that doesn\'t match your criteria?',
              options: [
                'Deletes it permanently',
                'Moves it to another sheet',
                'Temporarily hides it',
                'Changes its values'
              ],
              correct: 2,
              explanation: 'Filtering temporarily hides rows that don\'t match. The data is still there - you can remove the filter anytime to see everything again.'
            },
            {
              id: 'iq4-3',
              type: 'truefalse',
              question: 'You can sort by multiple columns (e.g., first by grade, then by name).',
              correct: true,
              explanation: 'True! Multi-level sorting is very useful. For example, sort by department first, then by salary within each department.'
            }
          ]
        },
        {
          id: 'intermediate-5',
          title: 'Mini Project: Student Grade Tracker',
          goal: 'Apply everything you\'ve learned to build a real grade tracker',
          actionCards: [
            {
              step: 1,
              title: 'Set Up Your Structure',
              instruction: 'Create headers: A1="Student", B1="Test 1", C1="Test 2", D1="Test 3", E1="Average", F1="Grade". Add 5 student names in A2:A6.',
              hint: 'Good structure makes your spreadsheet easier to use and understand.'
            },
            {
              step: 2,
              title: 'Enter Test Scores',
              instruction: 'Fill in test scores (0-100) for each student in columns B, C, and D.',
              hint: 'Use realistic numbers - think about what actual test scores might look like.'
            },
            {
              step: 3,
              title: 'Calculate Averages',
              instruction: 'In E2, create a formula: =AVERAGE(B2:D2). Copy this down to E6.',
              hint: 'This calculates each student\'s average across all three tests.'
            },
            {
              step: 4,
              title: 'Assign Letter Grades',
              instruction: 'In F2, use nested IF: =IF(E2>=90,"A",IF(E2>=80,"B",IF(E2>=70,"C","D"))). Copy down.',
              hint: 'This automatically assigns letter grades based on the average!'
            },
            {
              step: 5,
              title: 'Add Summary Statistics',
              instruction: 'Below your data, add: Class Average (use AVERAGE), Count of A grades (use COUNTIF), Highest Score (think about how to find it).',
              hint: 'These summary stats give you insights into overall class performance.'
            }
          ],
          spreadsheetSetup: {
            rows: 12,
            cols: 6,
            initialData: {
              'A1': 'Student',
              'B1': 'Test 1',
              'C1': 'Test 2',
              'D1': 'Test 3',
              'E1': 'Average',
              'F1': 'Grade'
            }
          },
          explanation: {
            title: 'Real-World Application',
            content: 'Congratulations! You\'ve just built a tool that teachers actually use. This grade tracker automates calculations, reduces errors, and provides instant insights. You can expand this concept to track sports statistics, personal finances, club attendance, or any data that matters to you. This is where Excel stops being theoretical and becomes genuinely useful.'
          },
          quiz: [
            {
              id: 'iq5-1',
              type: 'multiple',
              question: 'In the grade tracker, why use AVERAGE instead of manually adding and dividing?',
              options: [
                'It\'s not actually better',
                'It\'s automatic and updates when data changes',
                'It looks more professional',
                'Teachers require it'
              ],
              correct: 1,
              explanation: 'AVERAGE automatically recalculates when test scores change. Manual calculations would need to be redone every time.'
            },
            {
              id: 'iq5-2',
              type: 'formula',
              question: 'Write a COUNTIF formula to count how many students got an A (in column F, rows 2-6):',
              correct: '=COUNTIF(F2:F6,"A")',
              explanation: 'The formula =COUNTIF(F2:F6,"A") counts all cells in F2:F6 that contain "A".'
            },
            {
              id: 'iq5-3',
              type: 'truefalse',
              question: 'Projects like this grade tracker are only useful for teachers.',
              correct: false,
              explanation: 'False! The same concepts apply to tracking personal goals, budgets, inventory, schedules, or any organized data.'
            }
          ]
        }
      ]
    },
    advanced: {
      title: 'Advanced Level',
      description: 'Master powerful lookup functions and data analysis',
      objectives: [
        'Use VLOOKUP and XLOOKUP to merge data',
        'Master INDEX and MATCH combinations',
        'Understand pivot table concepts',
        'Create advanced charts and dashboards',
        'Complete a comprehensive capstone project'
      ],
      badge: 'Excel Expert',
      lessons: [
        {
          id: 'advanced-1',
          title: 'VLOOKUP: Looking Up Data',
          goal: 'Use VLOOKUP to find and retrieve information from tables',
          actionCards: [
            {
              step: 1,
              title: 'Understanding Lookup Functions',
              instruction: 'Imagine a phonebook: you look up a name (lookup value) to find a phone number (return value). VLOOKUP does this in Excel.',
              hint: 'The "V" stands for "vertical" - it searches down a column.'
            },
            {
              step: 2,
              title: 'VLOOKUP Syntax',
              instruction: '=VLOOKUP(lookup_value, table_array, col_index_num, [range_lookup]). Example: =VLOOKUP("Alice",A1:C10,3,FALSE)',
              hint: 'This finds "Alice" in column A and returns the value from the 3rd column of the table.'
            },
            {
              step: 3,
              title: 'Real Example: Student ID Lookup',
              instruction: 'Build a table with Student IDs in column A, Names in B, and Grades in C. Use VLOOKUP to find a student\'s grade by entering their ID.',
              hint: 'This is how school databases work - look up one piece of info to get related data!'
            }
          ],
          spreadsheetSetup: {
            rows: 8,
            cols: 4,
            initialData: {
              'A1': 'Student ID',
              'B1': 'Name',
              'C1': 'Grade',
              'A2': '101',
              'B2': 'Alice',
              'C2': 'A',
              'A3': '102',
              'B3': 'Bob',
              'C3': 'B',
              'A4': '103',
              'B4': 'Charlie',
              'C4': 'A'
            }
          },
          explanation: {
            title: 'Why VLOOKUP Matters',
            content: 'VLOOKUP is one of the most powerful Excel functions. It\'s used everywhere: merging customer data, looking up prices, matching employee IDs to departments, and countless other applications. Mastering VLOOKUP separates basic Excel users from power users. It\'s a top skill employers look for.'
          },
          quiz: [
            {
              id: 'aq1-1',
              type: 'multiple',
              question: 'In =VLOOKUP("Alice",A1:C10,3,FALSE), what does the 3 represent?',
              options: [
                'The third row',
                'The third column to return data from',
                'Search the third time',
                'Return three values'
              ],
              correct: 1,
              explanation: 'The 3 is the column index - return data from the 3rd column of the table range (A1:C10).'
            },
            {
              id: 'aq1-2',
              type: 'multiple',
              question: 'What does FALSE mean in VLOOKUP?',
              options: [
                'The formula is wrong',
                'Look for approximate matches',
                'Look for exact matches only',
                'Reverse the search'
              ],
              correct: 2,
              explanation: 'FALSE means exact match. Use FALSE when looking up IDs, names, or specific values. TRUE finds approximate matches (rarely used).'
            },
            {
              id: 'aq1-3',
              type: 'truefalse',
              question: 'VLOOKUP can only search for numbers, not text.',
              correct: false,
              explanation: 'False! VLOOKUP works with text, numbers, dates - any data type. You can look up names, product codes, or any value.'
            }
          ]
        },
        {
          id: 'advanced-2',
          title: 'INDEX and MATCH: Advanced Lookups',
          goal: 'Use INDEX-MATCH as a more flexible alternative to VLOOKUP',
          actionCards: [
            {
              step: 1,
              title: 'Understanding INDEX',
              instruction: 'INDEX returns a value from a specific position: =INDEX(array, row_num). Example: =INDEX(B1:B10,5) returns the 5th item in the range.',
              hint: 'Think of INDEX like: "Give me the value at position X".'
            },
            {
              step: 2,
              title: 'Understanding MATCH',
              instruction: 'MATCH finds the position of a value: =MATCH(lookup_value, array, 0). Example: =MATCH("Bob",A1:A10,0) tells you Bob\'s row position.',
              hint: 'MATCH answers: "Where is this value located?"'
            },
            {
              step: 3,
              title: 'Combining INDEX and MATCH',
              instruction: '=INDEX(return_range, MATCH(lookup_value, lookup_range, 0)). This is more powerful than VLOOKUP because you can look left, right, anywhere!',
              hint: 'INDEX-MATCH is like VLOOKUP\'s smarter, more flexible cousin.'
            }
          ],
          spreadsheetSetup: {
            rows: 8,
            cols: 4,
            initialData: {
              'A1': 'Name',
              'B1': 'Department',
              'C1': 'Salary',
              'A2': 'Alice',
              'B2': 'Sales',
              'C2': '50000',
              'A3': 'Bob',
              'B3': 'IT',
              'C3': '60000',
              'A4': 'Charlie',
              'B4': 'Marketing',
              'C4': '55000'
            }
          },
          explanation: {
            title: 'Why INDEX-MATCH?',
            content: 'While VLOOKUP is popular, INDEX-MATCH is more powerful. VLOOKUP can only look to the right. INDEX-MATCH can look in any direction. It\'s faster with large datasets and more flexible. Many Excel experts prefer it. Learning both makes you versatile and prepared for any lookup challenge.'
          },
          quiz: [
            {
              id: 'aq2-1',
              type: 'multiple',
              question: 'What advantage does INDEX-MATCH have over VLOOKUP?',
              options: [
                'It\'s simpler to write',
                'It can look left (return data from columns to the left of lookup column)',
                'It only works with numbers',
                'It\'s faster to type'
              ],
              correct: 1,
              explanation: 'INDEX-MATCH can look in any direction. VLOOKUP can only return data from columns to the right of the lookup column.'
            },
            {
              id: 'aq2-2',
              type: 'multiple',
              question: 'What does MATCH return?',
              options: [
                'The actual value found',
                'The position (row number) of the value',
                'TRUE or FALSE',
                'A text string'
              ],
              correct: 1,
              explanation: 'MATCH returns the position number. If "Bob" is in the 3rd row of your range, MATCH returns 3.'
            },
            {
              id: 'aq2-3',
              type: 'truefalse',
              question: 'INDEX-MATCH is always better than VLOOKUP in every situation.',
              correct: false,
              explanation: 'False! While INDEX-MATCH is more flexible, VLOOKUP is simpler and fine for basic lookups. Choose the right tool for your specific need.'
            }
          ]
        },
        {
          id: 'advanced-3',
          title: 'Pivot Table Concepts',
          goal: 'Understand how pivot tables summarize and analyze large datasets',
          actionCards: [
            {
              step: 1,
              title: 'What is a Pivot Table?',
              instruction: 'A pivot table takes a large dataset and summarizes it dynamically. Imagine a list of 1000 sales transactions - a pivot table can instantly show total sales by product, by month, by region, etc.',
              hint: 'Pivot tables are like magic for data analysis - they transform raw data into insights.'
            },
            {
              step: 2,
              title: 'Key Concepts',
              instruction: 'Rows: What you want to group by (e.g., Product names). Values: What you want to calculate (e.g., Sum of Sales). Filters: Narrow down your data (e.g., only 2024 sales).',
              hint: 'You drag and drop fields to build your analysis - no formulas needed!'
            },
            {
              step: 3,
              title: 'When to Use Pivot Tables',
              instruction: 'Use them when you have lots of rows and need to summarize, compare, or find patterns. Perfect for: sales analysis, survey results, grade distributions, attendance tracking.',
              hint: 'If you find yourself writing complex formulas to summarize data, a pivot table might be easier.'
            }
          ],
          spreadsheetSetup: {
            rows: 10,
            cols: 4,
            initialData: {
              'A1': 'Date',
              'B1': 'Product',
              'C1': 'Sales',
              'D1': 'Region',
              'A2': '1/5/2024',
              'B2': 'Laptop',
              'C2': '1200',
              'D2': 'North',
              'A3': '1/6/2024',
              'B3': 'Mouse',
              'C3': '25',
              'D3': 'South',
              'A4': '1/7/2024',
              'B4': 'Laptop',
              'C4': '1200',
              'D4': 'North'
            }
          },
          explanation: {
            title: 'The Power of Pivot Tables',
            content: 'Pivot tables are one of Excel\'s most powerful features. They let you analyze thousands of rows without writing a single formula. Businesses use them to analyze sales, track inventory, measure performance. Students can use them to analyze survey data or grade patterns. They\'re essential for anyone working with data professionally.'
          },
          quiz: [
            {
              id: 'aq3-1',
              type: 'multiple',
              question: 'What is the main purpose of a pivot table?',
              options: [
                'To make spreadsheets look professional',
                'To summarize and analyze large datasets',
                'To replace all formulas',
                'To create charts only'
              ],
              correct: 1,
              explanation: 'Pivot tables excel at summarizing and analyzing large amounts of data, revealing patterns and insights quickly.'
            },
            {
              id: 'aq3-2',
              type: 'multiple',
              question: 'In a pivot table showing sales by product, where would you put "Product"?',
              options: [
                'In Values',
                'In Filters',
                'In Rows or Columns',
                'It doesn\'t matter'
              ],
              correct: 2,
              explanation: 'Put "Product" in Rows or Columns to group your data by product. Put "Sales" in Values to see the sum or average for each product.'
            },
            {
              id: 'aq3-3',
              type: 'truefalse',
              question: 'Pivot tables require you to write complex formulas.',
              correct: false,
              explanation: 'False! Pivot tables are formula-free. You just drag and drop fields - Excel does all the calculations automatically.'
            }
          ]
        },
        {
          id: 'advanced-4',
          title: 'Advanced Charts and Visualizations',
          goal: 'Create sophisticated charts to tell compelling data stories',
          actionCards: [
            {
              step: 1,
              title: 'Beyond Basic Charts',
              instruction: 'You\'ve learned bar and pie charts. Advanced charts include: Combo charts (mix chart types), Scatter plots (show correlations), Waterfall charts (show cumulative effects).',
              hint: 'Different questions need different chart types - choose wisely!'
            },
            {
              step: 2,
              title: 'Dashboard Concepts',
              instruction: 'A dashboard combines multiple charts and summary stats on one sheet. It\'s like an airplane cockpit - all key information at a glance.',
              hint: 'Dashboards are used in business, sports, education - anywhere people need to monitor performance.'
            },
            {
              step: 3,
              title: 'Design Principles',
              instruction: 'Good visualizations are clear, accurate, and focused. Remove clutter. Use consistent colors. Label clearly. Make the main insight obvious.',
              hint: 'A great chart tells a story without needing much explanation.'
            }
          ],
          spreadsheetSetup: {
            rows: 8,
            cols: 5,
            initialData: {
              'A1': 'Month',
              'B1': 'Revenue',
              'C1': 'Costs',
              'D1': 'Profit',
              'A2': 'Jan',
              'B2': '10000',
              'C2': '6000',
              'D2': '4000',
              'A3': 'Feb',
              'B3': '12000',
              'C3': '6500',
              'D3': '5500'
            }
          },
          explanation: {
            title: 'Visual Communication Mastery',
            content: 'Advanced charts transform you from data worker to data storyteller. A well-designed chart can convince stakeholders, win arguments, or make complex topics understandable. In school presentations, job reports, or personal projects, your ability to visualize data clearly sets you apart as a professional communicator.'
          },
          quiz: [
            {
              id: 'aq4-1',
              type: 'multiple',
              question: 'What is a combo chart useful for?',
              options: [
                'Combining data from different files',
                'Showing two different types of data with different scales',
                'Making charts look more colorful',
                'Replacing pivot tables'
              ],
              correct: 1,
              explanation: 'Combo charts mix chart types (like bars and lines) to show different data types with different scales on one chart.'
            },
            {
              id: 'aq4-2',
              type: 'multiple',
              question: 'What makes a good dashboard?',
              options: [
                'As many charts as possible',
                'Colorful and decorative',
                'Clear, focused, and easy to understand at a glance',
                'Complex and detailed'
              ],
              correct: 2,
              explanation: 'Good dashboards are clear and focused, showing only essential information that can be understood quickly.'
            },
            {
              id: 'aq4-3',
              type: 'truefalse',
              question: 'More decorative elements always make charts better.',
              correct: false,
              explanation: 'False! Unnecessary decoration is "chart junk" that distracts from the data. Keep it simple and focused.'
            }
          ]
        },
        {
          id: 'advanced-5',
          title: 'Capstone Project: Complete Gradebook System',
          goal: 'Build a comprehensive, professional-grade gradebook using all advanced skills',
          actionCards: [
            {
              step: 1,
              title: 'Project Overview',
              instruction: 'You\'ll create a gradebook that: (1) Tracks student grades, (2) Calculates weighted averages, (3) Uses lookup functions for student info, (4) Provides summary statistics, (5) Includes visual grade distribution.',
              hint: 'This is a real-world project teachers and administrators actually use!'
            },
            {
              step: 2,
              title: 'Build the Student Database',
              instruction: 'Sheet 1: Student ID (column A), Name (B), Email (C), Advisor (D). Add 10 students with complete info.',
              hint: 'This is your master reference table for student information.'
            },
            {
              step: 3,
              title: 'Create the Gradebook',
              instruction: 'Sheet 2: Student ID, then columns for Homework (30%), Tests (50%), Participation (20%), Final Average, Letter Grade.',
              hint: 'Use percentages because different assignments have different weights in final grades.'
            },
            {
              step: 4,
              title: 'Implement Lookups',
              instruction: 'Use VLOOKUP to auto-fill student names when you enter their ID. This prevents typos and saves time.',
              hint: '=VLOOKUP(A2,Sheet1!A:B,2,FALSE) would pull the name from your database.'
            },
            {
              step: 5,
              title: 'Calculate Weighted Averages',
              instruction: 'Final Average = (Homework × 0.3) + (Tests × 0.5) + (Participation × 0.2). Use nested IF for letter grades.',
              hint: 'This is how real grading works - different categories have different importance!'
            },
            {
              step: 6,
              title: 'Add Analytics',
              instruction: 'Below the gradebook: Class average (AVERAGE), Grade distribution (COUNTIF for each letter grade), Highest/Lowest scores.',
              hint: 'These statistics help teachers understand overall class performance.'
            },
            {
              step: 7,
              title: 'Professional Finishing Touches',
              instruction: 'Add data validation (dropdown lists for letter grades), conditional formatting (highlight failing grades in red), protect formulas from accidental changes.',
              hint: 'These features prevent errors and make the gradebook more robust.'
            }
          ],
          spreadsheetSetup: {
            rows: 15,
            cols: 7,
            initialData: {
              'A1': 'Student ID',
              'B1': 'Name',
              'C1': 'Homework (30%)',
              'D1': 'Tests (50%)',
              'E1': 'Participation (20%)',
              'F1': 'Final Average',
              'G1': 'Letter Grade'
            }
          },
          explanation: {
            title: 'You\'ve Built Something Real',
            content: 'Congratulations! This gradebook represents professional-level Excel work. You\'ve combined lookup functions, weighted calculations, conditional logic, and data analysis. This exact system is used in schools worldwide. More importantly, you now have the skills to build similar systems for ANY data project: inventory management, budget tracking, project planning, or data analysis. You\'re not just learning Excel - you\'re learning to solve real problems with data.'
          },
          quiz: [
            {
              id: 'aq5-1',
              type: 'formula',
              question: 'Write a formula for weighted average: Homework in C2 (30%), Tests in D2 (50%), Participation in E2 (20%):',
              correct: '=(C2*0.3)+(D2*0.5)+(E2*0.2)',
              explanation: 'Multiply each grade by its weight (as a decimal) and add them: =(C2*0.3)+(D2*0.5)+(E2*0.2).'
            },
            {
              id: 'aq5-2',
              type: 'multiple',
              question: 'Why use VLOOKUP to auto-fill student names?',
              options: [
                'It\'s required by Excel',
                'It prevents typos and ensures consistency',
                'It makes the file smaller',
                'It\'s just for practice'
              ],
              correct: 1,
              explanation: 'VLOOKUP ensures names are spelled consistently and correctly, pulling from a master list. It saves time and prevents errors.'
            },
            {
              id: 'aq5-3',
              type: 'truefalse',
              question: 'The skills in this capstone project only apply to education.',
              correct: false,
              explanation: 'False! These skills apply to ANY field: business sales tracking, medical patient data, sports statistics, personal finance - anywhere data needs organizing and analysis.'
            }
          ]
        }
      ]
    }
  };

  // ============================================================================
  // LOCALSTORAGE FUNCTIONS
  // ============================================================================

  const saveProgress = () => {
    try {
      const progressData = {
        completedLessons,
        unlockedLevels,
        totalPoints,
        earnedBadges,
        quizAttempts,
        lastSaved: new Date().toISOString()
      };
      localStorage.setItem('excelLearningProgress', JSON.stringify(progressData));
      setSaveIndicator(true);
      setTimeout(() => setSaveIndicator(false), 2000);
    } catch (error) {
      console.error('Failed to save progress:', error);
    }
  };

  const loadProgress = () => {
    try {
      const saved = localStorage.getItem('excelLearningProgress');
      if (saved) {
        const data = JSON.parse(saved);
        setCompletedLessons(data.completedLessons || []);
        setUnlockedLevels(data.unlockedLevels || ['beginner']);
        setTotalPoints(data.totalPoints || 0);
        setEarnedBadges(data.earnedBadges || []);
        setQuizAttempts(data.quizAttempts || {});
      }
    } catch (error) {
      console.error('Failed to load progress:', error);
    }
  };

  const resetProgress = () => {
    try {
      localStorage.removeItem('excelLearningProgress');
      setCompletedLessons([]);
      setUnlockedLevels(['beginner']);
      setTotalPoints(0);
      setEarnedBadges([]);
      setQuizAttempts({});
      setCurrentView('home');
      setShowResetConfirm(false);
      alert('Progress reset successfully!');
    } catch (error) {
      console.error('Failed to reset progress:', error);
    }
  };

  // ============================================================================
  // EFFECTS
  // ============================================================================

  useEffect(() => {
    loadProgress();
  }, []);

  useEffect(() => {
    if (completedLessons.length > 0 || totalPoints > 0) {
      saveProgress();
    }
  }, [completedLessons, unlockedLevels, totalPoints, earnedBadges, quizAttempts]);

  // ============================================================================
  // SPREADSHEET SIMULATION FUNCTIONS
  // ============================================================================

  const initializeSpreadsheet = (setup) => {
    const data = {};
    for (let row = 1; row <= setup.rows; row++) {
      for (let col = 1; col <= setup.cols; col++) {
        const cellRef = getCellRef(row, col);
        data[cellRef] = setup.initialData[cellRef] || '';
      }
    }
    setSpreadsheetData(data);
  };

  const getCellRef = (row, col) => {
    const colLetter = String.fromCharCode(64 + col); // A=65, so 64+1=A
    return `${colLetter}${row}`;
  };

  const updateCell = (cellRef, value) => {
    setSpreadsheetData(prev => ({
      ...prev,
      [cellRef]: value
    }));
    setFormulaError('');
  };

  const evaluateFormula = (formula, cellRef) => {
    try {
      if (!formula.startsWith('=')) {
        return formula;
      }

      const formulaContent = formula.substring(1).toUpperCase();

      // Handle SUM function
      if (formulaContent.includes('SUM')) {
        const match = formulaContent.match(/SUM\(([A-Z0-9:]+)\)/);
        if (match) {
          const range = match[1];
          const values = getRangeValues(range);
          const sum = values.reduce((acc, val) => {
            const num = parseFloat(val);
            return acc + (isNaN(num) ? 0 : num);
          }, 0);
          return sum.toString();
        }
      }

      // Handle AVERAGE function
      if (formulaContent.includes('AVERAGE')) {
        const match = formulaContent.match(/AVERAGE\(([A-Z0-9:]+)\)/);
        if (match) {
          const range = match[1];
          const values = getRangeValues(range);
          const numbers = values.map(v => parseFloat(v)).filter(n => !isNaN(n));
          if (numbers.length === 0) return '0';
          const avg = numbers.reduce((a, b) => a + b, 0) / numbers.length;
          return avg.toFixed(2);
        }
      }

      // Handle COUNT function
      if (formulaContent.includes('COUNT')) {
        const match = formulaContent.match(/COUNT\(([A-Z0-9:]+)\)/);
        if (match) {
          const range = match[1];
          const values = getRangeValues(range);
          const count = values.filter(v => !isNaN(parseFloat(v)) && v !== '').length;
          return count.toString();
        }
      }

      // Handle IF function
      if (formulaContent.includes('IF')) {
        const ifMatch = formulaContent.match(/IF\(([^,]+),([^,]+),(.+)\)/);
        if (ifMatch) {
          const condition = ifMatch[1].trim();
          const trueVal = ifMatch[2].trim().replace(/"/g, '');
          const falseVal = ifMatch[3].trim().replace(/"/g, '');

          const conditionResult = evaluateCondition(condition);
          return conditionResult ? trueVal : falseVal;
        }
      }

      // Handle basic arithmetic
      let processedFormula = formulaContent;
      const cellRefs = formulaContent.match(/[A-Z]+[0-9]+/g);
      if (cellRefs) {
        cellRefs.forEach(ref => {
          const value = spreadsheetData[ref] || '0';
          const numValue = parseFloat(value) || 0;
          processedFormula = processedFormula.replace(ref, numValue.toString());
        });
      }

      // Evaluate simple arithmetic
      try {
        const result = eval(processedFormula.replace(/[^0-9+\-*/(). ]/g, ''));
        return result.toString();
      } catch {
        setFormulaError('Invalid formula syntax');
        return '#ERROR!';
      }

    } catch (error) {
      setFormulaError('Formula error: ' + error.message);
      return '#ERROR!';
    }
  };

  const getRangeValues = (range) => {
    const [start, end] = range.split(':');
    const startCol = start.charCodeAt(0) - 64;
    const startRow = parseInt(start.substring(1));
    const endCol = end ? end.charCodeAt(0) - 64 : startCol;
    const endRow = end ? parseInt(end.substring(1)) : startRow;

    const values = [];
    for (let row = startRow; row <= endRow; row++) {
      for (let col = startCol; col <= endCol; col++) {
        const cellRef = getCellRef(row, col);
        values.push(spreadsheetData[cellRef] || '');
      }
    }
    return values;
  };

  const evaluateCondition = (condition) => {
    const operators = ['>=', '<=', '>', '<', '='];
    for (let op of operators) {
      if (condition.includes(op)) {
        const [left, right] = condition.split(op).map(s => s.trim());
        const leftVal = parseFloat(spreadsheetData[left] || left);
        const rightVal = parseFloat(right.replace(/"/g, ''));

        switch(op) {
          case '>=': return leftVal >= rightVal;
          case '<=': return leftVal <= rightVal;
          case '>': return leftVal > rightVal;
          case '<': return leftVal < rightVal;
          case '=': return leftVal === rightVal;
        }
      }
    }
    return false;
  };

  // ============================================================================
  // QUIZ FUNCTIONS
  // ============================================================================

  const handleQuizAnswer = (questionId, answer) => {
    setCurrentQuizAnswers(prev => ({
      ...prev,
      [questionId]: answer
    }));
  };

  const submitQuiz = () => {
    const lesson = courseContent[currentLevel].lessons[currentLessonIndex];
    let correct = 0;

    lesson.quiz.forEach(question => {
      const userAnswer = currentQuizAnswers[question.id];

      if (question.type === 'multiple' || question.type === 'output') {
        if (userAnswer === question.correct) correct++;
      } else if (question.type === 'truefalse') {
        if (userAnswer === question.correct) correct++;
      } else if (question.type === 'formula') {
        const normalized = userAnswer?.toUpperCase().replace(/\s/g, '');
        const correctNormalized = question.correct.toUpperCase().replace(/\s/g, '');
        if (normalized === correctNormalized) correct++;
      }
    });

    const score = Math.round((correct / lesson.quiz.length) * 100);
    const points = correct * 10;

    setQuizScore(score);
    setTotalPoints(prev => prev + points);
    setQuizSubmitted(true);

    setQuizAttempts(prev => ({
      ...prev,
      [lesson.id]: (prev[lesson.id] || 0) + 1
    }));

    // Mark lesson as completed if score >= 60%
    if (score >= 60 && !completedLessons.includes(lesson.id)) {
      setCompletedLessons(prev => [...prev, lesson.id]);

      // Check if level is complete
      const allLessons = courseContent[currentLevel].lessons;
      const completed = [...completedLessons, lesson.id];
      const levelComplete = allLessons.every(l => completed.includes(l.id));

      if (levelComplete) {
        handleLevelComplete();
      }
    }
  };

  const handleLevelComplete = () => {
    const badge = courseContent[currentLevel].badge;
    if (!earnedBadges.includes(badge)) {
      setEarnedBadges(prev => [...prev, badge]);
      setPendingBadgeLevel(currentLevel);

      // Unlock next level
      if (currentLevel === 'beginner' && !unlockedLevels.includes('intermediate')) {
        setUnlockedLevels(prev => [...prev, 'intermediate']);
      } else if (currentLevel === 'intermediate' && !unlockedLevels.includes('advanced')) {
        setUnlockedLevels(prev => [...prev, 'advanced']);
      }

      setCurrentView('badge');
    }
  };

  const retryQuiz = () => {
    setCurrentQuizAnswers({});
    setQuizSubmitted(false);
    setQuizScore(0);
  };

  // ============================================================================
  // NAVIGATION FUNCTIONS
  // ============================================================================

  const startLesson = (level, lessonIndex) => {
    setCurrentLevel(level);
    setCurrentLessonIndex(lessonIndex);
    setCurrentView('lesson');
    setCurrentQuizAnswers({});
    setQuizSubmitted(false);
    setFormulaError('');

    const lesson = courseContent[level].lessons[lessonIndex];
    initializeSpreadsheet(lesson.spreadsheetSetup);
  };

  const startQuiz = () => {
    setCurrentView('quiz');
    setCurrentQuizAnswers({});
    setQuizSubmitted(false);
  };

  const nextLesson = () => {
    const lessons = courseContent[currentLevel].lessons;
    if (currentLessonIndex < lessons.length - 1) {
      startLesson(currentLevel, currentLessonIndex + 1);
    } else {
      setCurrentView('level');
    }
  };

  const toggleSection = (sectionId) => {
    setExpandedSections(prev => ({
      ...prev,
      [sectionId]: !prev[sectionId]
    }));
  };

  // ============================================================================
  // BADGE FORM SUBMISSION
  // ============================================================================

  const handleBadgeSubmit = (e) => {
    e.preventDefault();
    // Form is handled by Formspree
    setFormSubmitted(true);
  };

  // ============================================================================
  // RENDER HELPER FUNCTIONS
  // ============================================================================

  const renderSpreadsheet = (setup) => {
    const rows = [];

    // Header row with column letters
    const headerCells = [<th key="corner" style={styles.cellHeader}></th>];
    for (let col = 1; col <= setup.cols; col++) {
      headerCells.push(
        <th key={`col-${col}`} style={styles.cellHeader}>
          {String.fromCharCode(64 + col)}
        </th>
      );
    }
    rows.push(<tr key="header">{headerCells}</tr>);

    // Data rows
    for (let row = 1; row <= setup.rows; row++) {
      const cells = [
        <td key={`row-${row}`} style={styles.cellHeader}>
          {row}
        </td>
      ];

      for (let col = 1; col <= setup.cols; col++) {
        const cellRef = getCellRef(row, col);
        const value = spreadsheetData[cellRef] || '';
        const displayValue = value.startsWith('=') ? evaluateFormula(value, cellRef) : value;

        cells.push(
          <td key={cellRef} style={styles.cell}>
            <input
              type="text"
              value={value}
              onChange={(e) => updateCell(cellRef, e.target.value)}
              style={styles.cellInput}
              placeholder={cellRef}
            />
            {value.startsWith('=') && (
              <div style={styles.formulaResult}>
                = {displayValue}
              </div>
            )}
          </td>
        );
      }

      rows.push(<tr key={`row-${row}`}>{cells}</tr>);
    }

    return (
      <div style={styles.spreadsheetContainer}>
        <table style={styles.spreadsheet}>
          <tbody>{rows}</tbody>
        </table>
        {formulaError && (
          <div style={styles.errorMessage}>{formulaError}</div>
        )}
      </div>
    );
  };

  const getLevelProgress = (level) => {
    const lessons = courseContent[level].lessons;
    const completed = lessons.filter(l => completedLessons.includes(l.id)).length;
    return Math.round((completed / lessons.length) * 100);
  };

  // ============================================================================
  // VIEW RENDERERS
  // ============================================================================

  const renderHome = () => (
    <div style={styles.container}>
      <header style={styles.header}>
        <h1 style={styles.title}>📊 Microsoft Excel Mastery</h1>
        <p style={styles.subtitle}>
          Complete interactive course
        </p>
        <div style={styles.statsBar}>
          <div style={styles.stat}>
            <span style={styles.statLabel}>Total Points:</span>
            <span style={styles.statValue}>{totalPoints}</span>
          </div>
          <div style={styles.stat}>
            <span style={styles.statLabel}>Badges:</span>
            <span style={styles.statValue}>{earnedBadges.length}/3</span>
          </div>
          <div style={styles.stat}>
            <span style={styles.statLabel}>Lessons:</span>
            <span style={styles.statValue}>{completedLessons.length}</span>
          </div>
        </div>
      </header>

      <div style={styles.levelGrid}>
        {Object.keys(courseContent).map((levelKey, index) => {
          const level = courseContent[levelKey];
          const isUnlocked = unlockedLevels.includes(levelKey);
          const progress = getLevelProgress(levelKey);
          const badge = earnedBadges.includes(level.badge);

          return (
            <div
              key={levelKey}
              style={{
                ...styles.levelCard,
                opacity: isUnlocked ? 1 : 0.5,
                cursor: isUnlocked ? 'pointer' : 'not-allowed'
              }}
              onClick={() => isUnlocked && setCurrentView('level') && setCurrentLevel(levelKey)}
            >
              <div style={styles.levelNumber}>{index + 1}</div>
              <h2 style={styles.levelTitle}>{level.title}</h2>
              <p style={styles.levelDescription}>{level.description}</p>

              <div style={styles.progressBar}>
                <div style={{...styles.progressFill, width: `${progress}%`}}></div>
              </div>
              <p style={styles.progressText}>{progress}% Complete</p>

              {badge && (
                <div style={styles.badgeEarned}>
                  ✓ Badge Earned: {level.badge}
                </div>
              )}

              {!isUnlocked && (
                <div style={styles.locked}>
                  🔒 Complete previous level to unlock
                </div>
              )}

              {isUnlocked && (
                <button
                  style={styles.button}
                  onClick={(e) => {
                    e.stopPropagation();
                    setCurrentLevel(levelKey);
                    setCurrentView('level');
                  }}
                >
                  {progress > 0 ? 'Continue' : 'Start Level'}
                </button>
              )}
            </div>
          );
        })}
      </div>

      <div style={styles.footer}>
        {saveIndicator && (
          <div style={styles.saveIndicator}>✓ Progress saved automatically</div>
        )}
        <button
          style={styles.resetButton}
          onClick={() => setShowResetConfirm(true)}
        >
          Reset All Progress
        </button>
      </div>

      {showResetConfirm && (
        <div style={styles.modal}>
          <div style={styles.modalContent}>
            <h3>Reset All Progress?</h3>
            <p>This will delete all your saved progress, points, and badges. This cannot be undone.</p>
            <div style={styles.modalButtons}>
              <button style={styles.button} onClick={resetProgress}>
                Yes, Reset Everything
              </button>
              <button
                style={{...styles.button, backgroundColor: '#6c757d'}}
                onClick={() => setShowResetConfirm(false)}
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );

  const renderLevel = () => {
    const level = courseContent[currentLevel];

    return (
      <div style={styles.container}>
        <button style={styles.backButton} onClick={() => setCurrentView('home')}>
          ← Back to Home
        </button>

        <div style={styles.levelHeader}>
          <h1 style={styles.title}>{level.title}</h1>
          <p style={styles.subtitle}>{level.description}</p>

          <div style={styles.objectivesList}>
            <h3>Learning Objectives:</h3>
            <ul>
              {level.objectives.map((obj, i) => (
                <li key={i} style={styles.objective}>{obj}</li>
              ))}
            </ul>
          </div>

          <div style={styles.progressBar}>
            <div style={{...styles.progressFill, width: `${getLevelProgress(currentLevel)}%`}}></div>
          </div>
          <p style={styles.progressText}>{getLevelProgress(currentLevel)}% Complete</p>
        </div>

        <div style={styles.lessonList}>
          {level.lessons.map((lesson, index) => {
            const isCompleted = completedLessons.includes(lesson.id);
            const attempts = quizAttempts[lesson.id] || 0;

            return (
              <div key={lesson.id} style={styles.lessonCard}>
                <div style={styles.lessonHeader}>
                  <div>
                    <h3 style={styles.lessonTitle}>
                      {isCompleted && '✓ '}
                      Lesson {index + 1}: {lesson.title}
                    </h3>
                    <p style={styles.lessonGoal}>{lesson.goal}</p>
                  </div>
                  {attempts > 0 && (
                    <div style={styles.attempts}>
                      Attempts: {attempts}
                    </div>
                  )}
                </div>
                <button
                  style={styles.button}
                  onClick={() => startLesson(currentLevel, index)}
                >
                  {isCompleted ? 'Review Lesson' : 'Start Lesson'}
                </button>
              </div>
            );
          })}
        </div>
      </div>
    );
  };

  const renderLesson = () => {
    const lesson = courseContent[currentLevel].lessons[currentLessonIndex];

    return (
      <div style={styles.container}>
        <button
          style={styles.backButton}
          onClick={() => setCurrentView('level')}
        >
          ← Back to Lessons
        </button>

        <div style={styles.lessonContent}>
          <h1 style={styles.title}>{lesson.title}</h1>
          <p style={styles.goalBox}>🎯 Goal: {lesson.goal}</p>

          <div style={styles.actionSection}>
            <h2 style={styles.sectionTitle}>Step-by-Step Guide</h2>
            {lesson.actionCards.map((card, index) => (
              <div key={index} style={styles.actionCard}>
                <div style={styles.stepNumber}>Step {card.step}</div>
                <h3 style={styles.cardTitle}>{card.title}</h3>
                <p style={styles.cardInstruction}>{card.instruction}</p>
                <p style={styles.cardHint}>💡 {card.hint}</p>
              </div>
            ))}
          </div>

          <div style={styles.spreadsheetSection}>
            <h2 style={styles.sectionTitle}>Practice Spreadsheet</h2>
            <p style={styles.instruction}>
              Use this interactive spreadsheet to follow along with the lesson. 
              Click on any cell to edit it. Try the examples above!
            </p>
            {renderSpreadsheet(lesson.spreadsheetSetup)}
          </div>

          <div style={styles.explanationSection}>
            <div
              style={styles.explanationHeader}
              onClick={() => toggleSection('explanation')}
            >
              <h3>{lesson.explanation.title}</h3>
              <span>{expandedSections['explanation'] ? '▼' : '▶'}</span>
            </div>
            {expandedSections['explanation'] && (
              <p style={styles.explanationContent}>{lesson.explanation.content}</p>
            )}
          </div>

          <div style={styles.navigationButtons}>
            <button style={styles.button} onClick={startQuiz}>
              Take the Quiz →
            </button>
          </div>
        </div>
      </div>
    );
  };

  const renderQuiz = () => {
    const lesson = courseContent[currentLevel].lessons[currentLessonIndex];

    if (quizSubmitted) {
      const passed = quizScore >= 60;

      return (
        <div style={styles.container}>
          <div style={styles.quizResults}>
            <h1 style={passed ? styles.successTitle : styles.tryAgainTitle}>
              {passed ? '🎉 Great Job!' : '📚 Keep Learning!'}
            </h1>
            <div style={styles.scoreDisplay}>
              <div style={styles.scoreCircle}>
                <span style={styles.scoreNumber}>{quizScore}%</span>
              </div>
            </div>
            <p style={styles.resultMessage}>
              {passed
                ? `You scored ${quizScore}% and earned ${Math.round((quizScore / 100) * lesson.quiz.length * 10)} points! You're thinking like an analyst now! 👏`
                : `You scored ${quizScore}%. Don't worry - learning takes practice! Review the lesson and try again.`}
            </p>

            <div style={styles.quizReview}>
              <h3>Review Your Answers:</h3>
              {lesson.quiz.map((question, index) => {
                const userAnswer = currentQuizAnswers[question.id];
                let isCorrect = false;

                if (question.type === 'multiple' || question.type === 'output') {
                  isCorrect = userAnswer === question.correct;
                } else if (question.type === 'truefalse') {
                  isCorrect = userAnswer === question.correct;
                } else if (question.type === 'formula') {
                  const normalized = userAnswer?.toUpperCase().replace(/\s/g, '');
                  const correctNormalized = question.correct.toUpperCase().replace(/\s/g, '');
                  isCorrect = normalized === correctNormalized;
                }

                return (
                  <div key={question.id} style={styles.reviewItem}>
                    <div style={isCorrect ? styles.correctMarker : styles.incorrectMarker}>
                      {isCorrect ? '✓' : '✗'}
                    </div>
                    <div>
                      <p style={styles.reviewQuestion}>
                        <strong>Q{index + 1}:</strong> {question.question}
                      </p>
                      {!isCorrect && question.type === 'formula' && (
                        <p style={styles.reviewAnswer}>
                          Your answer: {userAnswer || '(blank)'}
                          <br />
                          Correct answer: {question.correct}
                        </p>
                      )}
                      <p style={styles.reviewExplanation}>{question.explanation}</p>
                    </div>
                  </div>
                );
              })}
            </div>

            <div style={styles.navigationButtons}>
              {!passed && (
                <button style={styles.button} onClick={retryQuiz}>
                  Try Again
                </button>
              )}
              <button
                style={{...styles.button, backgroundColor: '#28a745'}}
                onClick={nextLesson}
              >
                {currentLessonIndex < courseContent[currentLevel].lessons.length - 1
                  ? 'Next Lesson →'
                  : 'Back to Level Overview'}
              </button>
            </div>
          </div>
        </div>
      );
    }

    return (
      <div style={styles.container}>
        <button
          style={styles.backButton}
          onClick={() => setCurrentView('lesson')}
        >
          ← Back to Lesson
        </button>

        <div style={styles.quizContent}>
          <h1 style={styles.title}>Quiz: {lesson.title}</h1>
          <p style={styles.subtitle}>
            Answer all questions to test your understanding. You'll earn 10 points for each correct answer!
          </p>

          {lesson.quiz.map((question, index) => (
            <div key={question.id} style={styles.quizQuestion}>
              <h3 style={styles.questionTitle}>
                Question {index + 1}: {question.question}
              </h3>

              {(question.type === 'multiple' || question.type === 'output') && (
                <div style={styles.optionsContainer}>
                  {question.options.map((option, optIndex) => (
                    <label key={optIndex} style={styles.optionLabel}>
                      <input
                        type="radio"
                        name={question.id}
                        value={optIndex}
                        checked={currentQuizAnswers[question.id] === optIndex}
                        onChange={() => handleQuizAnswer(question.id, optIndex)}
                        style={styles.radio}
                      />
                      {option}
                    </label>
                  ))}
                </div>
              )}

              {question.type === 'truefalse' && (
                <div style={styles.optionsContainer}>
                  <label style={styles.optionLabel}>
                    <input
                      type="radio"
                      name={question.id}
                      value="true"
                      checked={currentQuizAnswers[question.id] === true}
                      onChange={() => handleQuizAnswer(question.id, true)}
                      style={styles.radio}
                    />
                    True
                  </label>
                  <label style={styles.optionLabel}>
                    <input
                      type="radio"
                      name={question.id}
                      value="false"
                      checked={currentQuizAnswers[question.id] === false}
                      onChange={() => handleQuizAnswer(question.id, false)}
                      style={styles.radio}
                    />
                    False
                  </label>
                </div>
              )}

              {question.type === 'formula' && (
                <input
                  type="text"
                  value={currentQuizAnswers[question.id] || ''}
                  onChange={(e) => handleQuizAnswer(question.id, e.target.value)}
                  placeholder="Enter your formula here (e.g., =A1+B1)"
                  style={styles.formulaInput}
                />
              )}
            </div>
          ))}

          <button
            style={styles.button}
            onClick={submitQuiz}
            disabled={Object.keys(currentQuizAnswers).length < lesson.quiz.length}
          >
            Submit Quiz
          </button>

          {Object.keys(currentQuizAnswers).length < lesson.quiz.length && (
            <p style={styles.warningText}>
              Please answer all questions before submitting.
            </p>
          )}
        </div>
      </div>
    );
  };

  const renderBadgeForm = () => {
    if (formSubmitted) {
      return (
        <div style={styles.container}>
          <div style={styles.successContainer}>
            <h1 style={styles.successTitle}>🎉 Submission Successful!</h1>
            <p style={styles.successMessage}>
              Your badge request has been sent! Check your email for your badge code.
              You can redeem this code in person for your reward.
            </p>
            <p style={styles.badgeInfo}>
              <strong>Badge Earned:</strong> {courseContent[pendingBadgeLevel].badge}
            </p>
            <button
              style={styles.button}
              onClick={() => {
                setCurrentView('home');
                setFormSubmitted(false);
                setPendingBadgeLevel(null);
                setBadgeFormData({ Name: '', Email: '', Message: '' });
              }}
            >
              Return to Home
            </button>
          </div>
        </div>
      );
    }

    return (
      <div style={styles.container}>
        <div style={styles.badgeFormContainer}>
          <h1 style={styles.title}>🏆 Congratulations!</h1>
          <p style={styles.subtitle}>
            You've completed the {courseContent[pendingBadgeLevel].title}!
          </p>
          <div style={styles.badgeDisplay}>
            <div style={styles.badgeName}>
              {courseContent[pendingBadgeLevel].badge}
            </div>
            <p style={styles.pointsEarned}>Total Points: {totalPoints}</p>
          </div>

          <p style={styles.formInstructions}>
            Enter your information below to receive your badge code via email. 
            You can redeem this code in person for a special reward!
          </p>

          <form
            action="https://formspree.io/f/xbjbobwv"
            method="POST"
            onSubmit={handleBadgeSubmit}
            style={styles.form}
          >
            <input type="hidden" name="level" value={pendingBadgeLevel} />
            <input type="hidden" name="badge" value={courseContent[pendingBadgeLevel].badge} />
            <input type="hidden" name="points" value={totalPoints} />

            <div style={styles.formGroup}>
              <label style={styles.label}>Your Name *</label>
              <input
                type="text"
                name="Name"
                required
                value={badgeFormData.Name}
                onChange={(e) => setBadgeFormData({...badgeFormData, Name: e.target.value})}
                style={styles.input}
                placeholder="Enter your full name"
              />
            </div>

            <div style={styles.formGroup}>
              <label style={styles.label}>Your Email *</label>
              <input
                type="email"
                name="Email"
                required
                value={badgeFormData.Email}
                onChange={(e) => setBadgeFormData({...badgeFormData, Email: e.target.value})}
                style={styles.input}
                placeholder="your.email@example.com"
              />
            </div>

            <div style={styles.formGroup}>
              <label style={styles.label}>Feedback (Optional)</label>
              <textarea
                name="Message"
                value={badgeFormData.Message}
                onChange={(e) => setBadgeFormData({...badgeFormData, Message: e.target.value})}
                style={styles.textarea}
                placeholder="Share your thoughts about this course..."
                rows="4"
              />
            </div>

            <button type="submit" style={styles.button}>
              Get My Badge Code
            </button>
          </form>

          <button
            style={{...styles.button, backgroundColor: '#6c757d', marginTop: '1rem'}}
            onClick={() => {
              setCurrentView('home');
              setPendingBadgeLevel(null);
            }}
          >
            Skip for Now
          </button>
        </div>
      </div>
    );
  };

  // ============================================================================
  // STYLES
  // ============================================================================

  const styles = {
    container: {
      maxWidth: '1200px',
      margin: '0 auto',
      padding: '1rem',
      fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif',
      color: '#333',
      lineHeight: '1.6'
    },
    header: {
      textAlign: 'center',
      marginBottom: '2rem',
      padding: '2rem 1rem',
      background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
      color: 'white',
      borderRadius: '12px'
    },
    title: {
      fontSize: '2rem',
      marginBottom: '0.5rem',
      fontWeight: '700'
    },
    subtitle: {
      fontSize: '1.1rem',
      opacity: '0.9',
      marginBottom: '1rem'
    },
    statsBar: {
      display: 'flex',
      justifyContent: 'center',
      gap: '2rem',
      marginTop: '1.5rem',
      flexWrap: 'wrap'
    },
    stat: {
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center'
    },
    statLabel: {
      fontSize: '0.85rem',
      opacity: '0.8'
    },
    statValue: {
      fontSize: '1.5rem',
      fontWeight: 'bold'
    },
    levelGrid: {
      display: 'grid',
      gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
      gap: '1.5rem',
      marginBottom: '2rem'
    },
    levelCard: {
      padding: '1.5rem',
      backgroundColor: 'white',
      borderRadius: '12px',
      boxShadow: '0 4px 6px rgba(0,0,0,0.1)',
      transition: 'transform 0.2s, box-shadow 0.2s',
      border: '2px solid #e0e0e0'
    },
    levelNumber: {
      width: '40px',
      height: '40px',
      borderRadius: '50%',
      backgroundColor: '#667eea',
      color: 'white',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      fontSize: '1.2rem',
      fontWeight: 'bold',
      marginBottom: '1rem'
    },
    levelTitle: {
      fontSize: '1.5rem',
      marginBottom: '0.5rem',
      color: '#333'
    },
    levelDescription: {
      color: '#666',
      marginBottom: '1rem',
      fontSize: '0.95rem'
    },
    progressBar: {
      width: '100%',
      height: '8px',
      backgroundColor: '#e0e0e0',
      borderRadius: '4px',
      overflow: 'hidden',
      marginBottom: '0.5rem'
    },
    progressFill: {
      height: '100%',
      backgroundColor: '#667eea',
      transition: 'width 0.3s ease'
    },
    progressText: {
      fontSize: '0.85rem',
      color: '#666',
      marginBottom: '1rem'
    },
    badgeEarned: {
      backgroundColor: '#d4edda',
      color: '#155724',
      padding: '0.5rem',
      borderRadius: '6px',
      fontSize: '0.9rem',
      marginBottom: '1rem',
      textAlign: 'center'
    },
    locked: {
      backgroundColor: '#f8d7da',
      color: '#721c24',
      padding: '0.5rem',
      borderRadius: '6px',
      fontSize: '0.9rem',
      marginBottom: '1rem',
      textAlign: 'center'
    },
    button: {
      width: '100%',
      padding: '0.75rem 1.5rem',
      backgroundColor: '#667eea',
      color: 'white',
      border: 'none',
      borderRadius: '6px',
      fontSize: '1rem',
      fontWeight: '600',
      cursor: 'pointer',
      transition: 'background-color 0.2s'
    },
    backButton: {
      padding: '0.5rem 1rem',
      backgroundColor: '#6c757d',
      color: 'white',
      border: 'none',
      borderRadius: '6px',
      fontSize: '0.9rem',
      cursor: 'pointer',
      marginBottom: '1rem'
    },
    footer: {
      textAlign: 'center',
      marginTop: '2rem',
      padding: '1rem'
    },
    resetButton: {
      padding: '0.5rem 1rem',
      backgroundColor: '#dc3545',
      color: 'white',
      border: 'none',
      borderRadius: '6px',
      fontSize: '0.9rem',
      cursor: 'pointer'
    },
    saveIndicator: {
      color: '#28a745',
      fontSize: '0.9rem',
      marginBottom: '1rem'
    },
    modal: {
      position: 'fixed',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      backgroundColor: 'rgba(0,0,0,0.5)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      zIndex: 1000
    },
    modalContent: {
      backgroundColor: 'white',
      padding: '2rem',
      borderRadius: '12px',
      maxWidth: '500px',
      width: '90%'
    },
    modalButtons: {
      display: 'flex',
      gap: '1rem',
      marginTop: '1.5rem'
    },
    levelHeader: {
      marginBottom: '2rem'
    },
    objectivesList: {
      backgroundColor: '#f8f9fa',
      padding: '1.5rem',
      borderRadius: '8px',
      marginTop: '1rem'
    },
    objective: {
      marginBottom: '0.5rem',
      color: '#495057'
    },
    lessonList: {
      display: 'flex',
      flexDirection: 'column',
      gap: '1rem'
    },
    lessonCard: {
      backgroundColor: 'white',
      padding: '1.5rem',
      borderRadius: '8px',
      boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
      border: '1px solid #e0e0e0'
},
lessonHeader: {
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'start',
  marginBottom: '1rem'
},
lessonTitle: {
  fontSize: '1.2rem',
  marginBottom: '0.5rem',
  color: '#333'
},
lessonGoal: {
  color: '#666',
  fontSize: '0.95rem'
},
attempts: {
  fontSize: '0.85rem',
  color: '#666',
  backgroundColor: '#f8f9fa',
  padding: '0.25rem 0.75rem',
  borderRadius: '12px'
},
lessonContent: {
  backgroundColor: 'white',
  padding: '2rem',
  borderRadius: '12px'
},
goalBox: {
  backgroundColor: '#e7f3ff',
  padding: '1rem',
  borderRadius: '8px',
  marginBottom: '2rem',
  borderLeft: '4px solid #667eea'
},
actionSection: {
  marginBottom: '2rem'
},
sectionTitle: {
  fontSize: '1.5rem',
  marginBottom: '1rem',
  color: '#333'
},
actionCard: {
  backgroundColor: '#f8f9fa',
  padding: '1.5rem',
  borderRadius: '8px',
  marginBottom: '1rem',
  borderLeft: '4px solid #667eea'
},
stepNumber: {
  display: 'inline-block',
  backgroundColor: '#667eea',
  color: 'white',
  padding: '0.25rem 0.75rem',
  borderRadius: '12px',
  fontSize: '0.85rem',
  fontWeight: 'bold',
  marginBottom: '0.5rem'
},
cardTitle: {
  fontSize: '1.1rem',
  marginBottom: '0.5rem',
  color: '#333'
},
cardInstruction: {
  color: '#495057',
  marginBottom: '0.5rem'
},
cardHint: {
  color: '#6c757d',
  fontSize: '0.9rem',
  fontStyle: 'italic'
},
spreadsheetSection: {
  marginBottom: '2rem'
},
instruction: {
  backgroundColor: '#fff3cd',
  padding: '1rem',
  borderRadius: '6px',
  marginBottom: '1rem',
  color: '#856404'
},
spreadsheetContainer: {
  overflowX: 'auto',
  border: '2px solid #dee2e6',
  borderRadius: '8px',
  padding: '1rem',
  backgroundColor: '#f8f9fa'
},
spreadsheet: {
  borderCollapse: 'collapse',
  width: '100%',
  minWidth: '500px'
},
cellHeader: {
  backgroundColor: '#e9ecef',
  padding: '0.5rem',
  textAlign: 'center',
  fontWeight: 'bold',
  border: '1px solid #dee2e6',
  minWidth: '80px'
},
cell: {
  border: '1px solid #dee2e6',
  padding: '0.25rem',
  backgroundColor: 'white',
  position: 'relative'
},
cellInput: {
  width: '100%',
  padding: '0.5rem',
  border: '1px solid transparent',
  fontSize: '0.9rem',
  backgroundColor: 'transparent'
},
formulaResult: {
  fontSize: '0.75rem',
  color: '#28a745',
  marginTop: '0.25rem',
  fontWeight: 'bold'
},
errorMessage: {
  color: '#dc3545',
  marginTop: '0.5rem',
  fontSize: '0.9rem'
},
explanationSection: {
  marginBottom: '2rem',
  border: '1px solid #dee2e6',
  borderRadius: '8px',
  overflow: 'hidden'
},
explanationHeader: {
  padding: '1rem',
  backgroundColor: '#f8f9fa',
  cursor: 'pointer',
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center'
},
explanationContent: {
  padding: '1rem',
  backgroundColor: 'white',
  lineHeight: '1.7'
},
navigationButtons: {
  display: 'flex',
  gap: '1rem',
  marginTop: '2rem',
  flexWrap: 'wrap'
},
quizContent: {
  backgroundColor: 'white',
  padding: '2rem',
  borderRadius: '12px'
},
quizQuestion: {
  backgroundColor: '#f8f9fa',
  padding: '1.5rem',
  borderRadius: '8px',
  marginBottom: '1.5rem'
},
questionTitle: {
  fontSize: '1.1rem',
  marginBottom: '1rem',
  color: '#333'
},
optionsContainer: {
  display: 'flex',
  flexDirection: 'column',
  gap: '0.75rem'
},
optionLabel: {
  display: 'flex',
  alignItems: 'center',
  padding: '0.75rem',
  backgroundColor: 'white',
  borderRadius: '6px',
  cursor: 'pointer',
  border: '2px solid #e0e0e0',
  transition: 'border-color 0.2s'
},
radio: {
  marginRight: '0.75rem',
  cursor: 'pointer'
},
formulaInput: {
  width: '100%',
  padding: '0.75rem',
  fontSize: '1rem',
  border: '2px solid #dee2e6',
  borderRadius: '6px',
  fontFamily: 'monospace'
},
warningText: {
  color: '#856404',
  fontSize: '0.9rem',
  marginTop: '1rem',
  textAlign: 'center'
},
quizResults: {
  backgroundColor: 'white',
  padding: '2rem',
  borderRadius: '12px',
  textAlign: 'center'
},
successTitle: {
  color: '#28a745',
  fontSize: '2rem',
  marginBottom: '1rem'
},
tryAgainTitle: {
  color: '#ffc107',
  fontSize: '2rem',
  marginBottom: '1rem'
},
scoreDisplay: {
  margin: '2rem 0'
},
scoreCircle: {
  width: '150px',
  height: '150px',
  borderRadius: '50%',
  backgroundColor: '#667eea',
  color: 'white',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  margin: '0 auto',
  boxShadow: '0 4px 12px rgba(102, 126, 234, 0.3)'
},
scoreNumber: {
  fontSize: '2.5rem',
  fontWeight: 'bold'
},
resultMessage: {
  fontSize: '1.1rem',
  marginBottom: '2rem',
  color: '#495057'
},
quizReview: {
  textAlign: 'left',
  marginTop: '2rem',
  maxWidth: '800px',
  margin: '2rem auto'
},
reviewItem: {
  display: 'flex',
  gap: '1rem',
  padding: '1rem',
  backgroundColor: '#f8f9fa',
  borderRadius: '8px',
  marginBottom: '1rem'
},
correctMarker: {
  width: '30px',
  height: '30px',
  borderRadius: '50%',
  backgroundColor: '#28a745',
  color: 'white',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  fontWeight: 'bold',
  flexShrink: 0
},
incorrectMarker: {
  width: '30px',
  height: '30px',
  borderRadius: '50%',
  backgroundColor: '#dc3545',
  color: 'white',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  fontWeight: 'bold',
  flexShrink: 0
},
reviewQuestion: {
  marginBottom: '0.5rem'
},
reviewAnswer: {
  color: '#dc3545',
  fontSize: '0.9rem',
  marginBottom: '0.5rem'
},
reviewExplanation: {
  color: '#6c757d',
  fontSize: '0.9rem',
  fontStyle: 'italic'
},
badgeFormContainer: {
  backgroundColor: 'white',
  padding: '2rem',
  borderRadius: '12px',
  maxWidth: '600px',
  margin: '0 auto'
},
badgeDisplay: {
  backgroundColor: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
  padding: '2rem',
  borderRadius: '12px',
  textAlign: 'center',
  marginBottom: '2rem',
  background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
  color: 'white'
},
badgeName: {
  fontSize: '1.5rem',
  fontWeight: 'bold',
  marginBottom: '0.5rem'
},
pointsEarned: {
  fontSize: '1.2rem',
  opacity: 0.9
},
formInstructions: {
  marginBottom: '2rem',
  color: '#495057',
  lineHeight: '1.6'
},
form: {
  display: 'flex',
  flexDirection: 'column',
  gap: '1rem'
},
formGroup: {
  display: 'flex',
  flexDirection: 'column'
},
label: {
  marginBottom: '0.5rem',
  fontWeight: '600',
  color: '#333'
},
input: {
  padding: '0.75rem',
  border: '2px solid #dee2e6',
  borderRadius: '6px',
  fontSize: '1rem'
},
textarea: {
  padding: '0.75rem',
  border: '2px solid #dee2e6',
  borderRadius: '6px',
  fontSize: '1rem',
  fontFamily: 'inherit',
  resize: 'vertical'
},
successContainer: {
  backgroundColor: 'white',
  padding: '3rem 2rem',
  borderRadius: '12px',
  textAlign: 'center',
  maxWidth: '600px',
  margin: '0 auto'
},
successMessage: {
  fontSize: '1.1rem',
  color: '#495057',
  marginBottom: '1.5rem',
  lineHeight: '1.6'
},
badgeInfo: {
  backgroundColor: '#d4edda',
  color: '#155724',
  padding: '1rem',
  borderRadius: '8px',
  marginBottom: '2rem'
}
};

return (
<div style={{ minHeight: '100vh', backgroundColor: '#f0f2f5' }}>
{currentView === 'home' && renderHome()}
{currentView === 'level' && renderLevel()}
{currentView === 'lesson' && renderLesson()}
{currentView === 'quiz' && renderQuiz()}
{currentView === 'badge' && renderBadgeForm()}
</div>
);
};
export default ExcelTrain;