import React, { useState } from 'react';

export default function ELearningPlatform() {
  const [currentLevel, setCurrentLevel] = useState('beginner');
  const [currentLesson, setCurrentLesson] = useState(0);
  const [completedLessons, setCompletedLessons] = useState({
    beginner: [],
    intermediate: [],
    advanced: []
  });
  const [unlockedLevels, setUnlockedLevels] = useState(['beginner']);
  const [totalPoints, setTotalPoints] = useState(0);
  const [badges, setBadges] = useState([]);
  const [quizAnswers, setQuizAnswers] = useState({});
  const [quizSubmitted, setQuizSubmitted] = useState(false);
  const [quizScore, setQuizScore] = useState(0);
  const [showBadgeForm, setShowBadgeForm] = useState(false);
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [spreadsheetData, setSpreadsheetData] = useState({});
  const [showExplanation, setShowExplanation] = useState({});

  const levels = {
    beginner: {
      title: 'Beginner Level',
      description: 'Master the fundamentals of Excel',
      badge: 'Excel Explorer',
      color: '#4CAF50',
      lessons: [
        {
          id: 'b1',
          title: 'Understanding Cells and Ranges',
          goal: 'Learn how to navigate Excel, select cells, and understand cell references',
          steps: [
            'Click on any cell to select it',
            'Notice the cell reference (like A1, B2) in the name box',
            'Try typing your name in cell A1',
            'Select a range by clicking and dragging across multiple cells',
            'Practice entering different types of data: text, numbers, dates'
          ],
          spreadsheet: {
            rows: 6,
            cols: 5,
            initialData: {
              'A1': 'Student Name',
              'B1': 'Age',
              'C1': 'Grade',
              'A2': 'Alice',
              'B2': '16',
              'C2': '10'
            }
          },
          explanation: 'Excel is organized into cells, which are the intersection of rows (numbered) and columns (lettered). Each cell has a unique address like A1 or C5. Understanding cell references is the foundation of everything you\'ll do in Excel.',
          quiz: [
            {
              question: 'What is the cell reference for the cell in the third column and second row?',
              type: 'multiple',
              options: ['A3', 'C2', 'B3', '2C'],
              correct: 1,
              explanation: 'Cell references are written as Column Letter + Row Number. Third column is C, second row is 2, so it\'s C2.'
            },
            {
              question: 'True or False: Cell A1 is in the first row and first column.',
              type: 'boolean',
              correct: true,
              explanation: 'Correct! A represents the first column and 1 represents the first row.'
            },
            {
              question: 'A range from cell A1 to C3 includes how many cells?',
              type: 'multiple',
              options: ['3 cells', '6 cells', '9 cells', '12 cells'],
              correct: 2,
              explanation: 'A range A1:C3 covers 3 columns × 3 rows = 9 cells total.'
            }
          ]
        },
        {
          id: 'b2',
          title: 'Your First Formulas',
          goal: 'Learn to create basic arithmetic formulas using cell references',
          steps: [
            'All formulas in Excel start with an equals sign (=)',
            'Click on cell C2 and type: =A2+B2',
            'Press Enter and watch Excel calculate the result',
            'Try creating a subtraction formula in C3: =A3-B3',
            'Experiment with multiplication (*) and division (/) in other cells'
          ],
          spreadsheet: {
            rows: 7,
            cols: 4,
            initialData: {
              'A1': 'First Number',
              'B1': 'Second Number',
              'C1': 'Result',
              'A2': '10',
              'B2': '5',
              'A3': '20',
              'B3': '8',
              'A4': '15',
              'B4': '3',
              'A5': '24',
              'B5': '6'
            },
            formulas: true
          },
          explanation: 'Formulas are the heart of Excel. Instead of calculating manually, you write a formula once and Excel does the math. When you reference cells (like =A2+B2), Excel automatically updates the result if you change the numbers in A2 or B2.',
          quiz: [
            {
              question: 'What does the formula =A1+B1 do?',
              type: 'multiple',
              options: ['Adds the text "A1+B1"', 'Adds the values in cells A1 and B1', 'Multiplies A1 and B1', 'Does nothing'],
              correct: 1,
              explanation: 'The = sign tells Excel this is a formula. A1+B1 means add the value in cell A1 to the value in cell B1.'
            },
            {
              question: 'What symbol is used for multiplication in Excel?',
              type: 'multiple',
              options: ['x', '*', '×', 'm'],
              correct: 1,
              explanation: 'Excel uses the asterisk (*) symbol for multiplication. For example: =A1*B1'
            },
            {
              question: 'True or False: Every formula must start with an equals sign (=)',
              type: 'boolean',
              correct: true,
              explanation: 'Absolutely true! The = sign tells Excel that what follows is a formula to calculate, not just text to display.'
            }
          ]
        },
        {
          id: 'b3',
          title: 'The SUM Function',
          goal: 'Use the SUM function to add multiple numbers quickly',
          steps: [
            'Functions are pre-built formulas that do complex tasks',
            'The SUM function adds up all numbers in a range',
            'Click on cell B7 and type: =SUM(B2:B6)',
            'This adds all values from B2 through B6',
            'Try using SUM to total other columns'
          ],
          spreadsheet: {
            rows: 8,
            cols: 4,
            initialData: {
              'A1': 'Item',
              'B1': 'Price',
              'A2': 'Notebook',
              'B2': '50',
              'A3': 'Pen',
              'B3': '10',
              'A4': 'Ruler',
              'B4': '15',
              'A5': 'Eraser',
              'B5': '5',
              'A6': 'Pencil',
              'B6': '8',
              'A7': 'TOTAL'
            },
            formulas: true
          },
          explanation: 'The SUM function is one of the most useful functions in Excel. Instead of typing =B2+B3+B4+B5+B6, you can simply write =SUM(B2:B6). The colon (:) means "through" or "to", so B2:B6 means all cells from B2 to B6.',
          quiz: [
            {
              question: 'What does the formula =SUM(A1:A5) do?',
              type: 'multiple',
              options: ['Adds only A1 and A5', 'Adds A1, A2, A3, A4, and A5', 'Multiplies the values', 'Counts how many cells there are'],
              correct: 1,
              explanation: 'SUM adds all values in the range. A1:A5 includes cells A1, A2, A3, A4, and A5.'
            },
            {
              question: 'Which is the correct syntax for the SUM function?',
              type: 'multiple',
              options: ['SUM(A1:A10)', '=SUM(A1:A10)', '=SUM A1:A10', 'SUM=A1:A10'],
              correct: 1,
              explanation: 'Functions need the = sign at the start, the function name, then parentheses containing the range.'
            },
            {
              question: 'If cells A1 through A4 contain 5, 10, 15, and 20, what does =SUM(A1:A4) return?',
              type: 'multiple',
              options: ['20', '40', '50', '10'],
              correct: 2,
              explanation: '5 + 10 + 15 + 20 = 50. The SUM function adds all the values together.'
            }
          ]
        },
        {
          id: 'b4',
          title: 'Formatting Your Data',
          goal: 'Learn to make your spreadsheets clear and professional',
          steps: [
            'Good formatting makes data easier to read and understand',
            'Use bold headers to identify what each column contains',
            'Align numbers to the right, text to the left',
            'Add borders to separate sections',
            'Use consistent spacing and layout'
          ],
          spreadsheet: {
            rows: 6,
            cols: 4,
            initialData: {
              'A1': 'Month',
              'B1': 'Income',
              'C1': 'Expenses',
              'D1': 'Savings',
              'A2': 'January',
              'B2': '5000',
              'C2': '3500',
              'A3': 'February',
              'B3': '5200',
              'C3': '3600',
              'A4': 'March',
              'B4': '4800',
              'C4': '3400'
            },
            formulas: true
          },
          explanation: 'Professional formatting isn\'t just about looks—it helps you and others understand your data quickly. Headers should stand out, numbers should be aligned for easy comparison, and related data should be grouped together visually.',
          quiz: [
            {
              question: 'Why is formatting important in Excel?',
              type: 'multiple',
              options: ['It makes the file larger', 'It helps organize and communicate information clearly', 'It\'s required by Excel', 'It makes calculations faster'],
              correct: 1,
              explanation: 'Good formatting makes your spreadsheet easier to read, understand, and professional-looking.'
            },
            {
              question: 'True or False: Headers should be formatted differently from regular data.',
              type: 'boolean',
              correct: true,
              explanation: 'Headers should stand out (bold, different color, etc.) so people can quickly identify what each column represents.'
            },
            {
              question: 'What is the best alignment for currency values?',
              type: 'multiple',
              options: ['Left aligned', 'Right aligned', 'Center aligned', 'It doesn\'t matter'],
              correct: 1,
              explanation: 'Numbers, especially currency, should be right-aligned so decimal points line up vertically, making them easier to compare.'
            }
          ]
        }
      ]
    },
    intermediate: {
      title: 'Intermediate Level',
      description: 'Work with functions, conditions, and data analysis',
      badge: 'Data Analyst',
      color: '#2196F3',
      lessons: [
        {
          id: 'i1',
          title: 'The AVERAGE Function',
          goal: 'Calculate averages to analyze student performance',
          steps: [
            'AVERAGE finds the mean of a set of numbers',
            'Type =AVERAGE(B2:B6) to find the average test score',
            'This is useful for analyzing grades, sales, temperatures, etc.',
            'Compare AVERAGE with SUM—both work on ranges but give different insights',
            'Use AVERAGE to find the class average in column B'
          ],
          spreadsheet: {
            rows: 8,
            cols: 4,
            initialData: {
              'A1': 'Student',
              'B1': 'Math Score',
              'C1': 'Science Score',
              'A2': 'John',
              'B2': '85',
              'C2': '78',
              'A3': 'Mary',
              'B3': '92',
              'C3': '88',
              'A4': 'Peter',
              'B4': '78',
              'C4': '82',
              'A5': 'Sarah',
              'B5': '95',
              'C5': '91',
              'A6': 'Tom',
              'B6': '88',
              'C6': '85',
              'A7': 'Class Average'
            },
            formulas: true
          },
          explanation: 'AVERAGE is essential for understanding typical performance or values. In education, it shows overall class performance. In business, it might show average sales. Excel adds all values and divides by the count automatically.',
          quiz: [
            {
              question: 'If five students scored 80, 85, 90, 75, and 95, what is their average?',
              type: 'multiple',
              options: ['80', '85', '90', '425'],
              correct: 1,
              explanation: '(80+85+90+75+95) ÷ 5 = 425 ÷ 5 = 85'
            },
            {
              question: 'What does the formula =AVERAGE(A1:A10) do?',
              type: 'multiple',
              options: ['Adds all values in A1 to A10', 'Finds the middle value', 'Calculates the mean of values in A1 to A10', 'Counts the cells'],
              correct: 2,
              explanation: 'AVERAGE calculates the mean (sum of all values divided by count of values).'
            },
            {
              question: 'True or False: AVERAGE ignores empty cells.',
              type: 'boolean',
              correct: true,
              explanation: 'Correct! AVERAGE only includes cells with numbers, skipping empty cells or text.'
            }
          ]
        },
        {
          id: 'i2',
          title: 'IF Function: Making Decisions',
          goal: 'Use logic to make Excel respond differently based on conditions',
          steps: [
            'IF checks a condition and returns one value if true, another if false',
            'Syntax: =IF(condition, value_if_true, value_if_false)',
            'Example: =IF(B2>=50, "Pass", "Fail")',
            'Try writing an IF formula to check if a score is passing (>=60)',
            'IF is like teaching Excel to make decisions'
          ],
          spreadsheet: {
            rows: 7,
            cols: 4,
            initialData: {
              'A1': 'Student',
              'B1': 'Score',
              'C1': 'Result',
              'A2': 'Alex',
              'B2': '75',
              'A3': 'Beth',
              'B3': '45',
              'A4': 'Chris',
              'B4': '82',
              'A5': 'Dana',
              'B5': '58',
              'A6': 'Eve',
              'B6': '91'
            },
            formulas: true
          },
          explanation: 'The IF function adds intelligence to your spreadsheet. It tests whether something is true, then acts accordingly. For example, "If the score is 60 or higher, show Pass, otherwise show Fail." This is powerful for automated grading, flagging low inventory, or highlighting overdue tasks.',
          quiz: [
            {
              question: 'What does =IF(A1>10, "High", "Low") return if A1 contains 15?',
              type: 'multiple',
              options: ['"Low"', '"High"', 'Error', '15'],
              correct: 1,
              explanation: 'Since 15 > 10 is TRUE, the formula returns "High".'
            },
            {
              question: 'In =IF(B2>=60, "Pass", "Fail"), what are the three parts?',
              type: 'multiple',
              options: ['Condition, True result, False result', 'Number, Text, Formula', 'Cell, Value, Answer', 'Start, Middle, End'],
              correct: 0,
              explanation: 'IF has three parts: the condition to test (B2>=60), what to show if true ("Pass"), and what to show if false ("Fail").'
            },
            {
              question: 'True or False: IF can only work with numbers.',
              type: 'boolean',
              correct: false,
              explanation: 'False! IF can test numbers, text, dates, and even the results of other formulas.'
            }
          ]
        },
        {
          id: 'i3',
          title: 'COUNTIF: Counting with Conditions',
          goal: 'Count how many cells meet specific criteria',
          steps: [
            'COUNTIF counts cells that meet a certain condition',
            'Syntax: =COUNTIF(range, criteria)',
            'Example: =COUNTIF(B2:B10, ">60") counts scores above 60',
            'You can count text too: =COUNTIF(A2:A10, "Present")',
            'Practice counting how many students passed (score >= 60)'
          ],
          spreadsheet: {
            rows: 9,
            cols: 4,
            initialData: {
              'A1': 'Student',
              'B1': 'Attendance',
              'C1': 'Score',
              'A2': 'Student 1',
              'B2': 'Present',
              'C2': '85',
              'A3': 'Student 2',
              'B3': 'Absent',
              'C3': '45',
              'A4': 'Student 3',
              'B4': 'Present',
              'C4': '92',
              'A5': 'Student 4',
              'B5': 'Present',
              'C5': '78',
              'A6': 'Student 5',
              'B6': 'Absent',
              'C6': '55',
              'A7': 'Student 6',
              'B7': 'Present',
              'C7': '88'
            },
            formulas: true
          },
          explanation: 'COUNTIF is perfect for quick analysis. How many students were present? How many sales were above target? How many tasks are complete? Instead of counting manually, COUNTIF does it instantly and updates automatically when data changes.',
          quiz: [
            {
              question: 'What does =COUNTIF(A1:A10, "Yes") do?',
              type: 'multiple',
              options: ['Counts all cells in A1:A10', 'Counts cells containing exactly "Yes"', 'Counts cells not containing "Yes"', 'Adds up the values'],
              correct: 1,
              explanation: 'COUNTIF counts only the cells in the range that match the criteria exactly.'
            },
            {
              question: 'How would you count all scores greater than or equal to 70 in range B2:B20?',
              type: 'multiple',
              options: ['=COUNTIF(B2:B20, 70)', '=COUNTIF(B2:B20, ">=70")', '=COUNT(B2:B20, >70)', '=IF(B2:B20>=70)'],
              correct: 1,
              explanation: 'COUNTIF syntax requires the range first, then the criteria in quotes. ">=70" counts all values 70 or higher.'
            },
            {
              question: 'True or False: COUNTIF can count based on text criteria.',
              type: 'boolean',
              correct: true,
              explanation: 'Yes! COUNTIF works with numbers, text, and even wildcards like "A*" to count anything starting with A.'
            }
          ]
        },
        {
          id: 'i4',
          title: 'MAX and MIN Functions',
          goal: 'Find the highest and lowest values in your data',
          steps: [
            'MAX returns the largest value in a range',
            'MIN returns the smallest value in a range',
            'Use =MAX(B2:B10) to find the highest score',
            'Use =MIN(B2:B10) to find the lowest score',
            'These are great for quick analysis: best performance, worst case, etc.'
          ],
          spreadsheet: {
            rows: 9,
            cols: 4,
            initialData: {
              'A1': 'Month',
              'B1': 'Sales',
              'C1': 'Expenses',
              'A2': 'Jan',
              'B2': '45000',
              'C2': '32000',
              'A3': 'Feb',
              'B3': '52000',
              'C3': '35000',
              'A4': 'Mar',
              'B4': '48000',
              'C4': '31000',
              'A5': 'Apr',
              'B5': '61000',
              'C5': '38000',
              'A6': 'May',
              'B6': '55000',
              'C6': '33000',
              'A7': 'Jun',
              'B7': '59000',
              'C7': '36000',
              'A8': 'Highest',
              'A9': 'Lowest'
            },
            formulas: true
          },
          explanation: 'MAX and MIN are your spotlight functions—they instantly show you the best and worst in your data. Whether it\'s finding the top student, highest sales month, or coldest temperature, these functions save you from scanning through rows of data manually.',
          quiz: [
            {
              question: 'If cells A1 to A5 contain 23, 45, 12, 67, 34, what does =MAX(A1:A5) return?',
              type: 'multiple',
              options: ['23', '45', '67', '12'],
              correct: 2,
              explanation: 'MAX returns the largest value in the range, which is 67.'
            },
            {
              question: 'What does =MIN(B1:B10) do?',
              type: 'multiple',
              options: ['Finds the smallest value in B1 to B10', 'Finds the average', 'Counts the cells', 'Adds the values'],
              correct: 0,
              explanation: 'MIN returns the minimum (smallest) value in the specified range.'
            },
            {
              question: 'True or False: MAX and MIN ignore text and empty cells.',
              type: 'boolean',
              correct: true,
              explanation: 'Correct! These functions only look at numeric values, skipping text and blank cells.'
            }
          ]
        },
        {
          id: 'i5',
          title: 'Mini Project: Grade Book',
          goal: 'Combine everything you\'ve learned to create a functional grade book',
          steps: [
            'Create a gradebook with student names and test scores',
            'Use SUM to calculate total points for each student',
            'Use AVERAGE to find each student\'s average score',
            'Use IF to determine Pass/Fail (passing = 60% or higher)',
            'Use MAX/MIN to find top and bottom performers',
            'Format your gradebook professionally'
          ],
          spreadsheet: {
            rows: 10,
            cols: 7,
            initialData: {
              'A1': 'Student',
              'B1': 'Test 1',
              'C1': 'Test 2',
              'D1': 'Test 3',
              'E1': 'Average',
              'F1': 'Status',
              'A2': 'Alice',
              'B2': '85',
              'C2': '78',
              'D2': '92',
              'A3': 'Bob',
              'B3': '72',
              'C3': '68',
              'D3': '75',
              'A4': 'Carol',
              'B4': '95',
              'C4': '88',
              'D4': '91',
              'A5': 'David',
              'B5': '58',
              'C5': '62',
              'D5': '55',
              'A6': 'Emma',
              'B6': '88',
              'C6': '85',
              'D6': '90',
              'A8': 'Class Stats',
              'A9': 'Highest Avg',
              'A10': 'Lowest Avg'
            },
            formulas: true
          },
          explanation: 'This project brings together all your intermediate skills. You\'re not just using individual functions—you\'re building a real tool that could be used by teachers. This is how Excel becomes powerful: combining simple functions to solve complex real-world problems.',
          quiz: [
            {
              question: 'To calculate a student\'s average from three tests in B2, C2, and D2, which formula is correct?',
              type: 'multiple',
              options: ['=SUM(B2:D2)/3', '=AVERAGE(B2:D2)', 'Both are correct', 'Neither is correct'],
              correct: 2,
              explanation: 'Both formulas work! =AVERAGE(B2:D2) is more elegant, but =SUM(B2:D2)/3 also correctly calculates the mean.'
            },
            {
              question: 'Which formula correctly marks a student as "Pass" if their average (in E2) is 60 or higher?',
              type: 'multiple',
              options: ['=IF(E2>60, "Pass", "Fail")', '=IF(E2>=60, "Pass", "Fail")', '=IF("Pass", E2>=60, "Fail")', '=PASS(E2>=60)'],
              correct: 1,
              explanation: '=IF(E2>=60, "Pass", "Fail") checks if E2 is greater than or equal to 60, returning "Pass" if true.'
            },
            {
              question: 'True or False: You can use MAX on a column of averages to find the top student.',
              type: 'boolean',
              correct: true,
              explanation: 'Absolutely! MAX works on any column of numbers, whether they\'re raw scores, averages, or calculated values.'
            }
          ]
        }
      ]
    },
    advanced: {
      title: 'Advanced Level',
      description: 'Master lookup functions, data analysis, and complex projects',
      badge: 'Excel Master',
      color: '#9C27B0',
      lessons: [
        {
          id: 'a1',
          title: 'VLOOKUP: Searching Vertically',
          goal: 'Look up information from a table using VLOOKUP',
          steps: [
            'VLOOKUP searches for a value in the first column of a table',
            'Then returns a value from a specified column in the same row',
            'Syntax: =VLOOKUP(lookup_value, table_array, col_index_num, [FALSE])',
            'Example: =VLOOKUP("Alice", A2:C10, 3, FALSE) finds Alice and returns value from 3rd column',
            'The FALSE at the end means "exact match"'
          ],
          spreadsheet: {
            rows: 8,
            cols: 5,
            initialData: {
              'A1': 'Student ID',
              'B1': 'Name',
              'C1': 'Grade',
              'D1': 'Email',
              'A2': '101',
              'B2': 'Alice',
              'C2': 'A',
              'D2': 'alice@school.com',
              'A3': '102',
              'B3': 'Bob',
              'C3': 'B',
              'D3': 'bob@school.com',
              'A4': '103',
              'B4': 'Carol',
              'C4': 'A',
              'D4': 'carol@school.com',
              'A5': '104',
              'B5': 'David',
              'C5': 'C',
              'D5': 'david@school.com',
              'A6': '105',
              'B6': 'Emma',
              'C6': 'B',
              'D6': 'emma@school.com'
            },
            formulas: true
          },
          explanation: 'VLOOKUP is like having an assistant who can search through a huge directory for you. You tell Excel what to look for (like a student ID), and which piece of information you want back (like their email). It\'s essential for working with databases and large datasets.',
          quiz: [
            {
              question: 'In =VLOOKUP(103, A2:D10, 2, FALSE), what does the "2" represent?',
              type: 'multiple',
              options: ['The row to look in', 'The column to return from (2nd column)', 'The number of matches to find', 'The cell reference'],
              correct: 1,
              explanation: 'The third argument (2) tells VLOOKUP to return the value from the 2nd column of the table.'
            },
            {
              question: 'What does the FALSE in VLOOKUP mean?',
              type: 'multiple',
              options: ['The formula is wrong', 'Find an exact match', 'Find an approximate match', 'Return false if not found'],
              correct: 1,
              explanation: 'FALSE means you want an exact match. If you use TRUE (or omit it), VLOOKUP looks for approximate matches.'
            },
            {
              question: 'True or False: VLOOKUP always searches in the first column of your table.',
              type: 'boolean',
              correct: true,
              explanation: 'Yes! VLOOKUP searches for your lookup value in the leftmost column of the range you specify.'
            }
          ]
        },
        {
          id: 'a2',
          title: 'INDEX and MATCH: Advanced Lookups',
          goal: 'Use INDEX and MATCH together for more flexible lookups',
          steps: [
            'INDEX returns a value from a specific position in a range',
            'MATCH finds the position of a value in a range',
            'Together, they\'re more powerful than VLOOKUP',
            'Syntax: =INDEX(return_range, MATCH(lookup_value, lookup_range, 0))',
            'Unlike VLOOKUP, you can look left or right, anywhere in your data'
          ],
          spreadsheet: {
            rows: 8,
            cols: 5,
            initialData: {
              'A1': 'Product',
              'B1': 'Price',
              'C1': 'Stock',
              'D1': 'Supplier',
              'A2': 'Laptop',
              'B2': '45000',
              'C2': '12',
              'D2': 'TechCorp',
              'A3': 'Mouse',
              'B3': '500',
              'C3': '45',
              'D3': 'Accessories Ltd',
              'A4': 'Keyboard',
              'B4': '1200',
              'C4': '23',
              'D4': 'TechCorp',
              'A5': 'Monitor',
              'B5': '15000',
              'C5': '8',
              'D5': 'Screens Inc',
              'A6': 'Headphones',
              'B6': '2500',
              'C6': '30',
              'D6': 'Audio Plus'
            },
            formulas: true
          },
          explanation: 'INDEX and MATCH are like a GPS system for your spreadsheet. MATCH finds where something is located (like "find which row has Laptop"), and INDEX goes to that exact location and grabs the value you want. This combo is more flexible than VLOOKUP because you can search in any column and return from any column.',
          quiz: [
            {
              question: 'What is the main advantage of INDEX-MATCH over VLOOKUP?',
              type: 'multiple',
              options: ['It\'s easier to write', 'It can look up values to the left of the lookup column', 'It\'s faster', 'It doesn\'t need exact matches'],
              correct: 1,
              explanation: 'INDEX-MATCH can return values from columns to the left of your lookup column, while VLOOKUP can only look right.'
            },
            {
              question: 'What does MATCH("Apple", A1:A10, 0) return?',
              type: 'multiple',
              options: ['The word "Apple"', 'The row number where "Apple" is found', 'The position number where "Apple" is found', 'TRUE or FALSE'],
              correct: 2,
              explanation: 'MATCH returns the position (like 3rd position) where it finds the lookup value in the range.'
            },
            {
              question: 'True or False: INDEX-MATCH is always better than VLOOKUP.',
              type: 'boolean',
              correct: false,
              explanation: 'Not always! For simple right-direction lookups, VLOOKUP is perfectly fine and easier to remember. Use INDEX-MATCH when you need more flexibility.'
            }
          ]
        },
        {
          id: 'a3',
          title: 'Understanding Pivot Tables',
          goal: 'Learn the concept of pivot tables for data summarization',
          steps: [
            'Pivot Tables transform rows of data into meaningful summaries',
            'They let you group, count, sum, and analyze without formulas',
            'Example: Sales data by month can become sales by region and product',
            'Key parts: Rows (categories), Columns (subcategories), Values (numbers to summarize)',
            'Pivot tables update instantly when source data changes'
          ],
          spreadsheet: {
            rows: 10,
            cols: 4,
            initialData: {
              'A1': 'Date',
              'B1': 'Region',
              'C1': 'Product',
              'D1': 'Sales',
              'A2': 'Jan',
              'B2': 'North',
              'C2': 'Laptops',
              'D2': '50000',
              'A3': 'Jan',
              'B3': 'South',
              'C3': 'Laptops',
              'D3': '42000',
              'A4': 'Feb',
              'B4': 'North',
              'C4': 'Laptops',
              'D4': '55000',
              'A5': 'Feb',
              'B5': 'South',
              'C5': 'Tablets',
              'D5': '38000',
              'A6': 'Mar',
              'B6': 'North',
              'C6': 'Tablets',
              'D6': '45000',
              'A7': 'Mar',
              'B7': 'South',
              'C7': 'Laptops',
              'D7': '48000'
            },
            formulas: true
          },
          explanation: 'Pivot Tables are Excel\'s superpower for making sense of large datasets. Imagine having 1000 rows of sales transactions—manually summarizing by region, product, and month would take hours. A pivot table does it in seconds. You\'re essentially asking Excel: "Show me total sales by region" or "Which product sold best each month?"',
          quiz: [
            {
              question: 'What is the main purpose of a Pivot Table?',
              type: 'multiple',
              options: ['To make data look pretty', 'To summarize and analyze large datasets', 'To delete duplicate data', 'To create charts'],
              correct: 1,
              explanation: 'Pivot Tables excel at summarizing, grouping, and analyzing data to reveal patterns and insights.'
            },
            {
              question: 'Which of these can a Pivot Table do?',
              type: 'multiple',
              options: ['Only sum numbers', 'Only count items', 'Sum, count, average, and more', 'Only sort data'],
              correct: 2,
              explanation: 'Pivot Tables can perform many calculations: sum, count, average, max, min, and other statistical functions.'
            },
            {
              question: 'True or False: Pivot Tables require you to write complex formulas.',
              type: 'boolean',
              correct: false,
              explanation: 'False! That\'s the beauty of pivot tables—they\'re point-and-click. No formulas needed to get powerful analysis.'
            }
          ]
        },
        {
          id: 'a4',
          title: 'Data Validation and Dropdown Lists',
          goal: 'Control what users can enter into cells',
          steps: [
            'Data Validation prevents errors by restricting what can be entered',
            'You can create dropdown lists for easy, consistent data entry',
            'Set rules like "only numbers between 0-100" or "only dates after today"',
            'Helpful error messages guide users when they make mistakes',
            'Essential for forms, surveys, and collaborative spreadsheets'
          ],
          spreadsheet: {
            rows: 8,
            cols: 4,
            initialData: {
              'A1': 'Student',
              'B1': 'Status',
              'C1': 'Grade',
              'A2': 'John',
              'C2': '85',
              'A3': 'Mary',
              'C3': '92',
              'A4': 'Peter',
              'C4': '78',
              'A5': 'Sarah',
              'C5': '95'
            },
            formulas: true
          },
          explanation: 'Data Validation is like having a gatekeeper for your spreadsheet. It ensures people enter valid, consistent information. For example, in a status column, you might only want "Present" or "Absent"—not typos like "Presnt" or "here". This keeps your data clean and makes analysis reliable.',
          quiz: [
            {
              question: 'Why use Data Validation?',
              type: 'multiple',
              options: ['To make cells prettier', 'To prevent invalid data entry', 'To calculate faster', 'To share files easier'],
              correct: 1,
              explanation: 'Data Validation ensures only valid, expected data gets entered, reducing errors and inconsistencies.'
            },
            {
              question: 'What can a dropdown list created with Data Validation do?',
              type: 'multiple',
              options: ['Calculate formulas', 'Show predefined choices for users to select', 'Delete incorrect data', 'Format cells automatically'],
              correct: 1,
              explanation: 'Dropdown lists give users a set of valid choices to pick from, ensuring consistent data entry.'
            },
            {
              question: 'True or False: Data Validation can include custom error messages.',
              type: 'boolean',
              correct: true,
              explanation: 'Yes! You can create helpful error messages that tell users exactly what went wrong and how to fix it.'
            }
          ]
        },
        {
          id: 'a5',
          title: 'Capstone Project: Personal Finance Tracker',
          goal: 'Build a complete personal budget and expense tracker',
          steps: [
            'Create sections for Income, Fixed Expenses, Variable Expenses, and Savings',
            'Use SUM to calculate totals for each category',
            'Use IF to flag when expenses exceed budget',
            'Calculate savings rate as a percentage',
            'Use conditional logic to show warnings when budget is exceeded',
            'Format professionally with clear headers and sections',
            'Add data validation for expense categories'
          ],
          spreadsheet: {
            rows: 18,
            cols: 5,
            initialData: {
              'A1': 'Personal Finance Tracker',
              'A3': 'INCOME',
              'A4': 'Salary',
              'B4': '50000',
              'A5': 'Freelance',
              'B5': '8000',
              'A6': 'Total Income',
              'A8': 'FIXED EXPENSES',
              'A9': 'Rent',
              'B9': '15000',
              'A10': 'Utilities',
              'B10': '2500',
              'A11': 'Insurance',
              'B11': '3000',
              'A12': 'Total Fixed',
              'A14': 'VARIABLE EXPENSES',
              'A15': 'Food',
              'B15': '8000',
              'A16': 'Transport',
              'B16': '3000',
              'A17': 'Entertainment',
              'B17': '2000',
              'A18': 'Total Variable',
              'C3': 'Budget',
              'D3': 'Status',
              'C9': '15000',
              'C10': '3000',
              'C15': '7000',
              'C16': '2500'
            },
            formulas: true
          },
          explanation: 'This capstone project demonstrates real-world Excel mastery. You\'re building a tool you could actually use every month to manage your money. It combines formulas (SUM, IF), formatting, planning, and logical thinking. This is what employers value: the ability to use Excel to solve real problems, not just know functions in isolation.',
          quiz: [
            {
              question: 'To calculate total income from cells B4 and B5, which formula would you use?',
              type: 'multiple',
              options: ['=B4+B5', '=SUM(B4:B5)', 'Both are correct', '=TOTAL(B4:B5)'],
              correct: 2,
              explanation: 'Both =B4+B5 and =SUM(B4:B5) work correctly. SUM is more flexible if you add more income sources later.'
            },
            {
              question: 'Which formula flags when actual expenses (B9) exceed budget (C9)?',
              type: 'multiple',
              options: ['=IF(B9>C9, "Over Budget", "OK")', '=IF(C9>B9, "Over Budget", "OK")', '=B9>C9', '=OVER(B9,C9)'],
              correct: 0,
              explanation: '=IF(B9>C9, "Over Budget", "OK") checks if actual (B9) exceeds budget (C9) and shows appropriate message.'
            },
            {
              question: 'True or False: A well-designed finance tracker should update all totals automatically when you change a single expense.',
              type: 'boolean',
              correct: true,
              explanation: 'Absolutely! That\'s the power of formulas—change one cell and all related calculations update instantly.'
            },
            {
              question: 'To calculate savings as a percentage of income, which formula is correct (Total Income in B6, Total Expenses in B20)?',
              type: 'multiple',
              options: ['=(B6-B20)/B6', '=(B6-B20)/B6*100', '=B6/B20*100', '=(B20-B6)/B6'],
              correct: 0,
              explanation: 'Savings rate = (Income - Expenses) / Income. Use =(B6-B20)/B6 and format as percentage, or add *100 for manual percentage.'
            }
          ]
        }
      ]
    }
  };

  const initializeSpreadsheet = (lessonId) => {
    const lesson = getCurrentLesson();
    if (!lesson || !lesson.spreadsheet) return;
    
    const { rows, cols, initialData } = lesson.spreadsheet;
    const key = `${currentLevel}-${lessonId}`;
    
    if (!spreadsheetData[key]) {
      setSpreadsheetData({
        ...spreadsheetData,
        [key]: { ...initialData }
      });
    }
  };

  const getCurrentLesson = () => {
    const levelData = levels[currentLevel];
    return levelData.lessons[currentLesson];
  };

  const handleCellEdit = (cell, value) => {
    const lesson = getCurrentLesson();
    const key = `${currentLevel}-${lesson.id}`;
    
    setSpreadsheetData({
      ...spreadsheetData,
      [key]: {
        ...spreadsheetData[key],
        [cell]: value
      }
    });
  };

  const evaluateFormula = (formula, currentCell, data) => {
    try {
      if (!formula.startsWith('=')) return formula;
      
      const expr = formula.substring(1).toUpperCase();
      
      // Handle SUM function
      if (expr.includes('SUM(')) {
        const match = expr.match(/SUM\(([A-Z0-9:]+)\)/);
        if (match) {
          const range = match[1];
          const values = getRangeValues(range, data);
          const sum = values.reduce((acc, val) => acc + (parseFloat(val) || 0), 0);
          return sum.toString();
        }
      }
      
      // Handle AVERAGE function
      if (expr.includes('AVERAGE(')) {
        const match = expr.match(/AVERAGE\(([A-Z0-9:]+)\)/);
        if (match) {
          const range = match[1];
          const values = getRangeValues(range, data);
          const numValues = values.filter(v => !isNaN(parseFloat(v)));
          if (numValues.length === 0) return '0';
          const avg = numValues.reduce((acc, val) => acc + parseFloat(val), 0) / numValues.length;
          return avg.toFixed(2);
        }
      }
      
      // Handle MAX function
      if (expr.includes('MAX(')) {
        const match = expr.match(/MAX\(([A-Z0-9:]+)\)/);
        if (match) {
          const range = match[1];
          const values = getRangeValues(range, data);
          const numValues = values.filter(v => !isNaN(parseFloat(v))).map(v => parseFloat(v));
          if (numValues.length === 0) return '0';
          return Math.max(...numValues).toString();
        }
      }
      
      // Handle MIN function
      if (expr.includes('MIN(')) {
        const match = expr.match(/MIN\(([A-Z0-9:]+)\)/);
        if (match) {
          const range = match[1];
          const values = getRangeValues(range, data);
          const numValues = values.filter(v => !isNaN(parseFloat(v))).map(v => parseFloat(v));
          if (numValues.length === 0) return '0';
          return Math.min(...numValues).toString();
        }
      }
      
      // Handle simple arithmetic (e.g., =A1+B1)
      let processedExpr = expr;
      const cellRefs = expr.match(/[A-Z]+[0-9]+/g);
      if (cellRefs) {
        cellRefs.forEach(ref => {
          const value = data[ref] || '0';
          // Don't replace if it's part of a formula
          if (!value.startsWith('=')) {
            processedExpr = processedExpr.replace(ref, parseFloat(value) || 0);
          }
        });
      }
      
      // Evaluate simple math
      try {
        // Basic safety check - only allow numbers and basic operators
        if (/^[\d+\-*/.() ]+$/.test(processedExpr)) {
          const result = eval(processedExpr);
          return isNaN(result) ? 'Error' : result.toString();
        }
      } catch (e) {
        return 'Error';
      }
      
      return formula;
    } catch (e) {
      return 'Error';
    }
  };

  const getRangeValues = (range, data) => {
    const values = [];
    
    if (range.includes(':')) {
      const [start, end] = range.split(':');
      const startCol = start.match(/[A-Z]+/)[0];
      const startRow = parseInt(start.match(/\d+/)[0]);
      const endCol = end.match(/[A-Z]+/)[0];
      const endRow = parseInt(end.match(/\d+/)[0]);
      
      for (let row = startRow; row <= endRow; row++) {
        for (let col = startCol.charCodeAt(0); col <= endCol.charCodeAt(0); col++) {
          const cell = String.fromCharCode(col) + row;
          const value = data[cell];
          if (value && !value.startsWith('=')) {
            values.push(value);
          }
        }
      }
    }
    
    return values;
  };

  const renderSpreadsheet = () => {
    const lesson = getCurrentLesson();
    if (!lesson || !lesson.spreadsheet) return null;
    
    const { rows, cols } = lesson.spreadsheet;
    const key = `${currentLevel}-${lesson.id}`;
    const data = spreadsheetData[key] || {};
    
    React.useEffect(() => {
      initializeSpreadsheet(lesson.id);
    }, []);
    
    const columns = [];
    for (let i = 0; i < cols; i++) {
      columns.push(String.fromCharCode(65 + i));
    }
    
    return (
      <div style={{ 
        overflowX: 'auto', 
        margin: '20px 0',
        border: '2px solid #ddd',
        borderRadius: '8px',
        background: '#fff'
      }}>
        <table style={{ 
          width: '100%', 
          borderCollapse: 'collapse',
          fontSize: '14px'
        }}>
          <thead>
            <tr>
              <th style={{
                background: '#f0f0f0',
                padding: '8px',
                border: '1px solid #ddd',
                fontWeight: 'bold',
                width: '40px'
              }}></th>
              {columns.map(col => (
                <th key={col} style={{
                  background: '#f0f0f0',
                  padding: '8px',
                  border: '1px solid #ddd',
                  fontWeight: 'bold',
                  minWidth: '80px'
                }}>
                  {col}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {Array.from({ length: rows }, (_, rowIdx) => {
              const rowNum = rowIdx + 1;
              return (
                <tr key={rowNum}>
                  <td style={{
                    background: '#f0f0f0',
                    padding: '8px',
                    border: '1px solid #ddd',
                    fontWeight: 'bold',
                    textAlign: 'center'
                  }}>
                    {rowNum}
                  </td>
                  {columns.map(col => {
                    const cellId = `${col}${rowNum}`;
                    const cellValue = data[cellId] || '';
                    const displayValue = cellValue.startsWith('=') 
                      ? evaluateFormula(cellValue, cellId, data)
                      : cellValue;
                    
                    return (
                      <td key={cellId} style={{
                        padding: '0',
                        border: '1px solid #ddd'
                      }}>
                        <input
                          type="text"
                          value={cellValue}
                          onChange={(e) => handleCellEdit(cellId, e.target.value)}
                          placeholder={cellValue.startsWith('=') ? displayValue : ''}
                          style={{
                            width: '100%',
                            padding: '8px',
                            border: 'none',
                            outline: 'none',
                            background: 'transparent',
                            fontFamily: 'monospace'
                          }}
                        />
                        {cellValue.startsWith('=') && (
                          <div style={{
                            fontSize: '11px',
                            color: '#666',
                            padding: '2px 8px',
                            background: '#f9f9f9'
                          }}>
                            Result: {displayValue}
                          </div>
                        )}
                      </td>
                    );
                  })}
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    );
  };

  const handleQuizAnswer = (questionIdx, answer) => {
    setQuizAnswers({
      ...quizAnswers,
      [questionIdx]: answer
    });
  };

  const submitQuiz = () => {
    const lesson = getCurrentLesson();
    let correct = 0;
    
    lesson.quiz.forEach((q, idx) => {
      const userAnswer = quizAnswers[idx];
      if (q.type === 'boolean') {
        if (userAnswer === q.correct) correct++;
      } else {
        if (userAnswer === q.correct) correct++;
      }
    });
    
    const score = Math.round((correct / lesson.quiz.length) * 100);
    const points = correct * 10;
    
    setQuizScore(score);
    setQuizSubmitted(true);
    setTotalPoints(totalPoints + points);
    
    // Mark lesson as complete
    const newCompleted = [...completedLessons[currentLevel]];
    if (!newCompleted.includes(lesson.id)) {
      newCompleted.push(lesson.id);
      setCompletedLessons({
        ...completedLessons,
        [currentLevel]: newCompleted
      });
      
      // Check if level is complete
      if (newCompleted.length === levels[currentLevel].lessons.length) {
        setTimeout(() => {
          setShowBadgeForm(true);
        }, 1500);
        
        // Unlock next level
        if (currentLevel === 'beginner' && !unlockedLevels.includes('intermediate')) {
          setUnlockedLevels([...unlockedLevels, 'intermediate']);
        } else if (currentLevel === 'intermediate' && !unlockedLevels.includes('advanced')) {
          setUnlockedLevels([...unlockedLevels, 'advanced']);
        }
        
        // Award badge
        const badge = levels[currentLevel].badge;
        if (!badges.includes(badge)) {
          setBadges([...badges, badge]);
        }
      }
    }
  };

  const resetQuiz = () => {
    setQuizAnswers({});
    setQuizSubmitted(false);
    setQuizScore(0);
  };

  const nextLesson = () => {
    const levelData = levels[currentLevel];
    if (currentLesson < levelData.lessons.length - 1) {
      setCurrentLesson(currentLesson + 1);
      resetQuiz();
    }
  };

  const prevLesson = () => {
    if (currentLesson > 0) {
      setCurrentLesson(currentLesson - 1);
      resetQuiz();
    }
  };

  const switchLevel = (level) => {
    if (unlockedLevels.includes(level)) {
      setCurrentLevel(level);
      setCurrentLesson(0);
      resetQuiz();
      setShowBadgeForm(false);
    }
  };

  const handleBadgeFormSubmit = async (e) => {
    e.preventDefault();
    
    const formData = new FormData(e.target);
    
    try {
      await fetch('https://formspree.io/f/xbjbobwv', {
        method: 'POST',
        body: formData,
        headers: {
          'Accept': 'application/json'
        }
      });
      
      setFormSubmitted(true);
      setTimeout(() => {
        setShowBadgeForm(false);
        setFormSubmitted(false);
      }, 3000);
    } catch (error) {
      alert('There was an error submitting the form. Please try again.');
    }
  };

  const lesson = getCurrentLesson();
  const levelData = levels[currentLevel];
  const progress = (completedLessons[currentLevel].length / levelData.lessons.length) * 100;

  return (
    <div style={{
      fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif',
      maxWidth: '1200px',
      margin: '0 auto',
      padding: '20px',
      background: '#f5f5f5',
      minHeight: '100vh'
    }}>
      {/* Header */}
      <header style={{
        background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
        color: 'white',
        padding: '30px',
        borderRadius: '12px',
        marginBottom: '30px',
        boxShadow: '0 4px 6px rgba(0,0,0,0.1)'
      }}>
        <h1 style={{ 
          margin: '0 0 10px 0', 
          fontSize: '32px',
          fontWeight: '700'
        }}>
          Microsoft Excel Mastery Course
        </h1>
        <p style={{ 
          margin: '0', 
          fontSize: '16px',
          opacity: '0.95'
        }}>
          From beginner to advanced - Learn Excel the smart way
        </p>
        
        <div style={{
          marginTop: '20px',
          display: 'flex',
          gap: '20px',
          flexWrap: 'wrap',
          alignItems: 'center'
        }}>
          <div style={{
            background: 'rgba(255,255,255,0.2)',
            padding: '10px 20px',
            borderRadius: '20px',
            fontSize: '14px',
            fontWeight: '600'
          }}>
            Total Points: {totalPoints}
          </div>
          {badges.length > 0 && (
            <div style={{
              background: 'rgba(255,255,255,0.2)',
              padding: '10px 20px',
              borderRadius: '20px',
              fontSize: '14px',
              fontWeight: '600'
            }}>
              Badges: {badges.join(', ')}
            </div>
          )}
        </div>
      </header>

      {/* Level Selector */}
      <div style={{
        background: 'white',
        padding: '20px',
        borderRadius: '12px',
        marginBottom: '30px',
        boxShadow: '0 2px 4px rgba(0,0,0,0.05)'
      }}>
        <h2 style={{ 
          margin: '0 0 20px 0', 
          fontSize: '20px',
          color: '#333'
        }}>
          Choose Your Level
        </h2>
        
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
          gap: '15px'
        }}>
          {Object.keys(levels).map(levelKey => {
            const level = levels[levelKey];
            const isUnlocked = unlockedLevels.includes(levelKey);
            const isActive = currentLevel === levelKey;
            const levelProgress = (completedLessons[levelKey].length / level.lessons.length) * 100;
            
            return (
              <button
                key={levelKey}
                onClick={() => switchLevel(levelKey)}
                disabled={!isUnlocked}
                style={{
                  background: isActive ? level.color : (isUnlocked ? 'white' : '#f0f0f0'),
                  color: isActive ? 'white' : (isUnlocked ? '#333' : '#999'),
                  border: `2px solid ${isActive ? level.color : (isUnlocked ? level.color : '#ddd')}`,
                  padding: '20px',
                  borderRadius: '12px',
                  cursor: isUnlocked ? 'pointer' : 'not-allowed',
                  textAlign: 'left',
                  transition: 'all 0.3s ease',
                  opacity: isUnlocked ? 1 : 0.6
                }}
              >
                <div style={{
                  fontSize: '18px',
                  fontWeight: '700',
                  marginBottom: '8px'
                }}>
                  {level.title} {!isUnlocked && '🔒'}
                </div>
                <div style={{
                  fontSize: '14px',
                  marginBottom: '12px',
                  opacity: 0.9
                }}>
                  {level.description}
                </div>
                <div style={{
                  background: isActive ? 'rgba(255,255,255,0.3)' : '#f0f0f0',
                  height: '8px',
                  borderRadius: '4px',
                  overflow: 'hidden'
                }}>
                  <div style={{
                    background: isActive ? 'white' : level.color,
                    height: '100%',
                    width: `${levelProgress}%`,
                    transition: 'width 0.3s ease'
                  }} />
                </div>
                <div style={{
                  fontSize: '12px',
                  marginTop: '8px',
                  fontWeight: '600'
                }}>
                  {completedLessons[levelKey].length} / {level.lessons.length} lessons completed
                </div>
              </button>
            );
          })}
        </div>
      </div>

      {/* Progress Bar */}
      <div style={{
        background: 'white',
        padding: '20px',
        borderRadius: '12px',
        marginBottom: '30px',
        boxShadow: '0 2px 4px rgba(0,0,0,0.05)'
      }}>
        <div style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          marginBottom: '10px'
        }}>
          <span style={{ 
            fontSize: '16px', 
            fontWeight: '600',
            color: '#333'
          }}>
            {levelData.title} Progress
          </span>
          <span style={{ 
            fontSize: '14px', 
            color: '#666'
          }}>
            {Math.round(progress)}%
          </span>
        </div>
        <div style={{
          background: '#e0e0e0',
          height: '12px',
          borderRadius: '6px',
          overflow: 'hidden'
        }}>
          <div style={{
            background: levelData.color,
            height: '100%',
            width: `${progress}%`,
            transition: 'width 0.5s ease',
            borderRadius: '6px'
          }} />
        </div>
      </div>

      {/* Main Lesson Content */}
      {lesson && (
        <div style={{
          background: 'white',
          padding: '30px',
          borderRadius: '12px',
          marginBottom: '30px',
          boxShadow: '0 2px 4px rgba(0,0,0,0.05)'
        }}>
          {/* Lesson Header */}
          <div style={{
            borderLeft: `4px solid ${levelData.color}`,
            paddingLeft: '20px',
            marginBottom: '30px'
          }}>
            <h2 style={{
              margin: '0 0 10px 0',
              fontSize: '28px',
              color: '#333'
            }}>
              {lesson.title}
            </h2>
            <p style={{
              margin: '0',
              fontSize: '16px',
              color: '#666',
              fontStyle: 'italic'
            }}>
              Goal: {lesson.goal}
            </p>
          </div>

          {/* Action Steps */}
          <div style={{
            background: '#f9f9f9',
            padding: '20px',
            borderRadius: '8px',
            marginBottom: '30px'
          }}>
            <h3 style={{
              margin: '0 0 15px 0',
              fontSize: '18px',
              color: '#333',
              display: 'flex',
              alignItems: 'center',
              gap: '8px'
            }}>
              📋 Action Steps
            </h3>
            <ol style={{
              margin: '0',
              paddingLeft: '20px'
            }}>
              {lesson.steps.map((step, idx) => (
                <li key={idx} style={{
                  marginBottom: '12px',
                  fontSize: '15px',
                  lineHeight: '1.6',
                  color: '#444'
                }}>
                  {step}
                </li>
              ))}
            </ol>
          </div>

          {/* Excel Simulation */}
          {lesson.spreadsheet && (
            <div style={{ marginBottom: '30px' }}>
              <h3 style={{
                margin: '0 0 15px 0',
                fontSize: '18px',
                color: '#333',
                display: 'flex',
                alignItems: 'center',
                gap: '8px'
              }}>
                💻 Practice Spreadsheet
              </h3>
              <p style={{
                fontSize: '14px',
                color: '#666',
                marginBottom: '15px'
              }}>
                Click on any cell to edit. Try entering formulas starting with =
              </p>
              {renderSpreadsheet()}
            </div>
          )}

          {/* Explanation Section */}
          <div style={{
            marginBottom: '30px'
          }}>
            <button
              onClick={() => setShowExplanation({
                ...showExplanation,
                [lesson.id]: !showExplanation[lesson.id]
              })}
              style={{
                background: 'none',
                border: 'none',
                color: levelData.color,
                fontSize: '16px',
                fontWeight: '600',
                cursor: 'pointer',
                padding: '10px 0',
                display: 'flex',
                alignItems: 'center',
                gap: '8px'
              }}
            >
              {showExplanation[lesson.id] ? '▼' : '▶'} Why this works
            </button>
            
            {showExplanation[lesson.id] && (
              <div style={{
                background: '#f0f7ff',
                padding: '20px',
                borderRadius: '8px',
                marginTop: '10px',
                borderLeft: `3px solid ${levelData.color}`
              }}>
                <p style={{
                  margin: '0',
                  fontSize: '15px',
                  lineHeight: '1.7',
                  color: '#333'
                }}>
                  {lesson.explanation}
                </p>
              </div>
            )}
          </div>

          {/* Quiz Section */}
          <div style={{
            background: '#fff9f0',
            padding: '25px',
            borderRadius: '12px',
            border: '2px solid #ffe0b2'
          }}>
            <h3 style={{
              margin: '0 0 20px 0',
              fontSize: '20px',
              color: '#333',
              display: 'flex',
              alignItems: 'center',
              gap: '8px'
            }}>
              ✍️ Quiz Time
            </h3>

            {!quizSubmitted ? (
              <>
                {lesson.quiz.map((question, qIdx) => (
                  <div key={qIdx} style={{
                    background: 'white',
                    padding: '20px',
                    borderRadius: '8px',
                    marginBottom: '20px',
                    border: '1px solid #e0e0e0'
                  }}>
                    <p style={{
                      margin: '0 0 15px 0',
                      fontSize: '16px',
                      fontWeight: '600',
                      color: '#333'
                    }}>
                      {qIdx + 1}. {question.question}
                    </p>

                    {question.type === 'boolean' ? (
                      <div style={{ display: 'flex', gap: '10px' }}>
                        <button
                          onClick={() => handleQuizAnswer(qIdx, true)}
                          style={{
                            padding: '12px 24px',
                            border: `2px solid ${quizAnswers[qIdx] === true ? levelData.color : '#ddd'}`,
                            background: quizAnswers[qIdx] === true ? levelData.color : 'white',
                            color: quizAnswers[qIdx] === true ? 'white' : '#333',
                            borderRadius: '8px',
                            cursor: 'pointer',
                            fontSize: '14px',
                            fontWeight: '600',
                            transition: 'all 0.2s ease'
                          }}
                        >
                          True
                        </button>
                        <button
                          onClick={() => handleQuizAnswer(qIdx, false)}
                          style={{
                            padding: '12px 24px',
                            border: `2px solid ${quizAnswers[qIdx] === false ? levelData.color : '#ddd'}`,
                            background: quizAnswers[qIdx] === false ? levelData.color : 'white',
                            color: quizAnswers[qIdx] === false ? 'white' : '#333',
                            borderRadius: '8px',
                            cursor: 'pointer',
                            fontSize: '14px',
                            fontWeight: '600',
                            transition: 'all 0.2s ease'
                          }}
                        >
                          False
                        </button>
                      </div>
                    ) : (
                      <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                        {question.options.map((option, oIdx) => (
                          <button
                            key={oIdx}
                            onClick={() => handleQuizAnswer(qIdx, oIdx)}
                            style={{
                              padding: '12px 20px',
                              border: `2px solid ${quizAnswers[qIdx] === oIdx ? levelData.color : '#ddd'}`,
                              background: quizAnswers[qIdx] === oIdx ? levelData.color : 'white',
                              color: quizAnswers[qIdx] === oIdx ? 'white' : '#333',
                              borderRadius: '8px',
                              cursor: 'pointer',
                              textAlign: 'left',
                              fontSize: '14px',
                              transition: 'all 0.2s ease'
                            }}
                          >
                            {option}
                          </button>
                        ))}
                      </div>
                    )}
                  </div>
                ))}

                <button
                  onClick={submitQuiz}
                  disabled={Object.keys(quizAnswers).length < lesson.quiz.length}
                  style={{
                    background: Object.keys(quizAnswers).length < lesson.quiz.length ? '#ccc' : levelData.color,
                    color: 'white',
                    border: 'none',
                    padding: '15px 40px',
                    borderRadius: '8px',
                    fontSize: '16px',
                    fontWeight: '600',
                    cursor: Object.keys(quizAnswers).length < lesson.quiz.length ? 'not-allowed' : 'pointer',
                    width: '100%',
                    transition: 'all 0.2s ease'
                  }}
                >
                  Submit Quiz
                </button>
              </>
            ) : (
              <div>
                <div style={{
                  background: quizScore >= 70 ? '#d4edda' : '#fff3cd',
                  border: `2px solid ${quizScore >= 70 ? '#c3e6cb' : '#ffeaa7'}`,
                  padding: '20px',
                  borderRadius: '8px',
                  marginBottom: '20px',
                  textAlign: 'center'
                }}>
                  <div style={{
                    fontSize: '48px',
                    marginBottom: '10px'
                  }}>
                    {quizScore >= 90 ? '🌟' : quizScore >= 70 ? '👏' : '💪'}
                  </div>
                  <h3 style={{
                    margin: '0 0 10px 0',
                    fontSize: '24px',
                    color: '#333'
                  }}>
                    Your Score: {quizScore}%
                  </h3>
                  <p style={{
                    margin: '0',
                    fontSize: '16px',
                    color: '#666'
                  }}>
                    {quizScore >= 90 ? 'Outstanding! You\'re mastering Excel!' :
                     quizScore >= 70 ? 'Great job! Keep up the good work!' :
                     'Good effort! Review the material and try again.'}
                  </p>
                  <p style={{
                    margin: '10px 0 0 0',
                    fontSize: '14px',
                    fontWeight: '600',
                    color: levelData.color
                  }}>
                    +{Math.round((quizScore / 100) * lesson.quiz.length * 10)} points earned
                  </p>
                </div>

                {/* Show correct answers */}
                {lesson.quiz.map((question, qIdx) => {
                  const userAnswer = quizAnswers[qIdx];
                  const isCorrect = question.type === 'boolean' 
                    ? userAnswer === question.correct
                    : userAnswer === question.correct;

                  return (
                    <div key={qIdx} style={{
                      background: 'white',
                      padding: '20px',
                      borderRadius: '8px',
                      marginBottom: '15px',
                      border: `2px solid ${isCorrect ? '#4CAF50' : '#ff9800'}`
                    }}>
                      <p style={{
                        margin: '0 0 10px 0',
                        fontSize: '15px',
                        fontWeight: '600',
                        color: '#333'
                      }}>
                        {qIdx + 1}. {question.question}
                      </p>
                      <p style={{
                        margin: '0 0 10px 0',
                        fontSize: '14px',
                        color: isCorrect ? '#4CAF50' : '#ff9800',
                        fontWeight: '600'
                      }}>
                        {isCorrect ? '✓ Correct' : '✗ Incorrect'}
                      </p>
                      <p style={{
                        margin: '0',
                        fontSize: '14px',
                        color: '#666',
                        lineHeight: '1.6'
                      }}>
                        {question.explanation}
                      </p>
                    </div>
                  );
                })}

                <div style={{
                  display: 'flex',
                  gap: '10px',
                  marginTop: '20px'
                }}>
                  {quizScore < 70 && (
                    <button
                      onClick={resetQuiz}
                      style={{
                        background: 'white',
                        color: levelData.color,
                        border: `2px solid ${levelData.color}`,
                        padding: '15px 30px',
                        borderRadius: '8px',
                        fontSize: '16px',
                        fontWeight: '600',
                        cursor: 'pointer',
                        flex: 1
                      }}
                    >
                      Try Again
                    </button>
                  )}
                  {currentLesson < levelData.lessons.length - 1 && (
                    <button
                      onClick={nextLesson}
                      style={{
                        background: levelData.color,
                        color: 'white',
                        border: 'none',
                        padding: '15px 30px',
                        borderRadius: '8px',
                        fontSize: '16px',
                        fontWeight: '600',
                        cursor: 'pointer',
                        flex: 1
                      }}
                    >
                      Next Lesson →
                    </button>
                  )}
                </div>
              </div>
            )}
          </div>

          {/* Navigation */}
          <div style={{
            display: 'flex',
            justifyContent: 'space-between',
            marginTop: '30px',
            paddingTop: '20px',
            borderTop: '1px solid #e0e0e0'
          }}>
            <button
              onClick={prevLesson}
              disabled={currentLesson === 0}
              style={{
                background: currentLesson === 0 ? '#f0f0f0' : 'white',
                color: currentLesson === 0 ? '#999' : levelData.color,
                border: `2px solid ${currentLesson === 0 ? '#ddd' : levelData.color}`,
                padding: '12px 24px',
                borderRadius: '8px',
                fontSize: '14px',
                fontWeight: '600',
                cursor: currentLesson === 0 ? 'not-allowed' : 'pointer'
              }}
            >
              ← Previous Lesson
            </button>
            
            <div style={{
              fontSize: '14px',
              color: '#666',
              display: 'flex',
              alignItems: 'center'
            }}>
              Lesson {currentLesson + 1} of {levelData.lessons.length}
            </div>
          </div>
        </div>
      )}

      {/* Badge Form Modal */}
      {showBadgeForm && (
        <div style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          background: 'rgba(0,0,0,0.7)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          zIndex: 1000,
          padding: '20px'
        }}>
          <div style={{
            background: 'white',
            padding: '40px',
            borderRadius: '12px',
            maxWidth: '500px',
            width: '100%',
            boxShadow: '0 10px 40px rgba(0,0,0,0.3)'
          }}>
            {!formSubmitted ? (
              <>
                <div style={{
                  textAlign: 'center',
                  marginBottom: '30px'
                }}>
                  <div style={{ fontSize: '64px', marginBottom: '10px' }}>🎉</div>
                  <h2 style={{
                    margin: '0 0 10px 0',
                    fontSize: '28px',
                    color: '#333'
                  }}>
                    Congratulations!
                  </h2>
                  <p style={{
                    margin: '0',
                    fontSize: '16px',
                    color: '#666'
                  }}>
                    You've completed the {levelData.title}!
                  </p>
                  <div style={{
                    background: levelData.color,
                    color: 'white',
                    padding: '15px',
                    borderRadius: '8px',
                    marginTop: '20px',
                    fontSize: '20px',
                    fontWeight: '700'
                  }}>
                    Badge Earned: {levelData.badge}
                  </div>
                </div>

                <form onSubmit={handleBadgeFormSubmit}>
                  <p style={{
                    margin: '0 0 20px 0',
                    fontSize: '14px',
                    color: '#666',
                    textAlign: 'center'
                  }}>
                    Enter your details to receive your badge code via email. Bring this code to your instructor to claim your reward!
                  </p>

                  <input
                    type="text"
                    name="name"
                    placeholder="Your Full Name"
                    required
                    style={{
                      width: '100%',
                      padding: '12px',
                      marginBottom: '15px',
                      border: '2px solid #ddd',
                      borderRadius: '8px',
                      fontSize: '14px',
                      boxSizing: 'border-box'
                    }}
                  />

                  <input
                    type="email"
                    name="email"
                    placeholder="Your Email"
                    required
                    style={{
                      width: '100%',
                      padding: '12px',
                      marginBottom: '15px',
                      border: '2px solid #ddd',
                      borderRadius: '8px',
                      fontSize: '14px',
                      boxSizing: 'border-box'
                    }}
                  />

                  <input
                    type="hidden"
                    name="level"
                    value={levelData.title}
                  />

                  <input
                    type="hidden"
                    name="badge"
                    value={levelData.badge}
                  />

                  <input
                    type="hidden"
                    name="points"
                    value={totalPoints}
                  />

                  <textarea
                    name="feedback"
                    placeholder="Optional: Share your thoughts about this course"
                    rows="3"
                    style={{
                      width: '100%',
                      padding: '12px',
                      marginBottom: '20px',
                      border: '2px solid #ddd',
                      borderRadius: '8px',
                      fontSize: '14px',
                      fontFamily: 'inherit',
                      boxSizing: 'border-box',
                      resize: 'vertical'
                    }}
                  />

                  <button
                    type="submit"
                    style={{
                      width: '100%',
                      background: levelData.color,
                      color: 'white',
                      border: 'none',
                      padding: '15px',
                      borderRadius: '8px',
                      fontSize: '16px',
                      fontWeight: '600',
                      cursor: 'pointer'
                    }}
                  >
                    Claim My Badge
                  </button>

                  <button
                    type="button"
                    onClick={() => setShowBadgeForm(false)}
                    style={{
                      width: '100%',
                      background: 'white',
                      color: '#666',
                      border: '2px solid #ddd',
                      padding: '12px',
                      borderRadius: '8px',
                      fontSize: '14px',
                      fontWeight: '600',
                      cursor: 'pointer',
                      marginTop: '10px'
                    }}
                  >
                    Maybe Later
                  </button>
                </form>
              </>
            ) : (
              <div style={{ textAlign: 'center' }}>
                <div style={{ fontSize: '64px', marginBottom: '20px' }}>✅</div>
                <h2 style={{
                  margin: '0 0 15px 0',
                  fontSize: '24px',
                  color: '#333'
                }}>
                  Success!
                </h2>
                <p style={{
                  margin: '0',
                  fontSize: '16px',
                  color: '#666',
                  lineHeight: '1.6'
                }}>
                  Your badge code has been sent to your email. Check your inbox and bring the code to your instructor to claim your reward!
                </p>
              </div>
            )}
          </div>
        </div>
      )}

      {/* Footer */}
      <footer style={{
        textAlign: 'center',
        padding: '20px',
        color: '#999',
        fontSize: '14px'
      }}>
        <p style={{ margin: '0' }}>
          Keep practicing and exploring Excel. The more you use it, the more powerful it becomes! 🚀
        </p>
      </footer>
    </div>
  );
}