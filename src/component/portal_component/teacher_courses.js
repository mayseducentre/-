/**
 * Elite Teacher Training Portal
 * Moodle-inspired, fully responsive, single-file React component.
 * Features: Course selection, module accordion, video demos, quizzes,
 * practical exercises, resources, progress tracking (localStorage),
 * and EmailJS certificate generation.
 */

import { useState, useEffect, useCallback } from "react";

// ─────────────────────────────────────────────
// COURSE DATA
// ─────────────────────────────────────────────
const COURSES = [
  {
    id: "ms-word",
    title: "Microsoft Word",
    icon: "📝",
    description: "Master document creation, formatting, mail merge, and advanced Word features for professional use.",
    modules: [
      {
        id: "word-1",
        title: "Module 1: Interface & Document Basics",
        duration: "25 min",
        video: "https://www.youtube.com/embed/S-nHYzK-BVg",
        exercise: {
          title: "Create a Professional Memo",
          instructions: [
            "Open Microsoft Word and create a new blank document.",
            "Set margins to Narrow (1.27cm all sides) via Layout > Margins.",
            "Type a memo header: TO, FROM, DATE, RE — each on its own line.",
            "Apply bold formatting to each label.",
            "Save as 'Practice_Memo.docx' to your Desktop.",
          ],
          task: "Type your memo subject below to confirm completion:",
          inputLabel: "Memo Subject",
          inputPlaceholder: "e.g., Staff Training Schedule Q1 2025",
        },
        quiz: [
          {
            q: "Which tab contains the Margins setting in Microsoft Word?",
            options: ["Home", "Insert", "Layout", "View"],
            answer: 2,
          },
          {
            q: "The keyboard shortcut to Bold text in Word is:",
            options: ["Ctrl+I", "Ctrl+U", "Ctrl+B", "Ctrl+F"],
            answer: 2,
          },
          {
            q: "True or False: Word documents are saved with a .docx extension by default.",
            options: ["True", "False"],
            answer: 0,
          },
          {
            q: "Which view shows exactly how the document will print?",
            options: ["Draft View", "Web Layout", "Print Layout", "Outline View"],
            answer: 2,
          },
        ],
        resources: [
          { name: "Word Interface Cheatsheet.pdf", url: "https://edu.gcfglobal.org/en/word2016/", type: "pdf" },
          { name: "Word Quick Reference Card", url: "https://support.microsoft.com/en-us/word", type: "link" },
        ],
      },
      {
        id: "word-2",
        title: "Module 2: Styles, Headings & Table of Contents",
        duration: "25 min",
        video: "https://www.youtube.com/embed/t_rIwVhGfSM",
        exercise: {
          title: "Build a Structured Report",
          instructions: [
            "Open a new Word document.",
            "Apply 'Heading 1' style to a title: 'Annual School Report'.",
            "Add three sections with 'Heading 2': Introduction, Findings, Conclusion.",
            "Write 2–3 sentences under each heading.",
            "Insert an automatic Table of Contents via References > Table of Contents.",
          ],
          task: "List your three Heading 2 sections below (comma-separated):",
          inputLabel: "Your Section Titles",
          inputPlaceholder: "e.g., Introduction, Findings, Conclusion",
        },
        quiz: [
          {
            q: "Where do you insert an automatic Table of Contents in Word?",
            options: ["Home tab", "Insert tab", "References tab", "View tab"],
            answer: 2,
          },
          {
            q: "Applying a 'Heading 1' style to text primarily affects:",
            options: ["Font colour only", "The document structure and navigation", "Page margins", "Line spacing only"],
            answer: 1,
          },
          {
            q: "True or False: Styles in Word can be modified to change all matching text at once.",
            options: ["True", "False"],
            answer: 0,
          },
          {
            q: "Which Heading level is typically used for the main document title?",
            options: ["Heading 3", "Heading 2", "Heading 1", "Normal"],
            answer: 2,
          },
        ],
        resources: [
          { name: "Styles & Formatting Guide", url: "https://support.microsoft.com/en-us/office/apply-styles-f8b96097-4d25-4fac-8200-6139c8093109", type: "link" },
          { name: "Table of Contents Tutorial", url: "https://support.microsoft.com/en-us/office/insert-a-table-of-contents-882e8564-0edb-435e-84b5-1d8552ccf0c0", type: "link" },
        ],
      },
      {
        id: "word-3",
        title: "Module 3: Mail Merge for School Communications",
        duration: "30 min",
        video: "https://www.youtube.com/embed/EuSS1R3_Bgs",
        exercise: {
          title: "Mail Merge Parent Letters",
          instructions: [
            "Create an Excel spreadsheet with columns: FirstName, LastName, Grade, ParentEmail.",
            "Enter 5 sample student records.",
            "In Word, go to Mailings > Start Mail Merge > Letters.",
            "Connect to your Excel data source.",
            "Insert merge fields: Dear «FirstName» «LastName», Your child in Grade «Grade»…",
            "Preview results and complete the merge.",
          ],
          task: "How many student records did you merge? Enter the number:",
          inputLabel: "Number of Records Merged",
          inputPlaceholder: "e.g., 5",
        },
        quiz: [
          {
            q: "Mail Merge is found under which Word tab?",
            options: ["Home", "Insert", "Mailings", "Review"],
            answer: 2,
          },
          {
            q: "Which file format is most commonly used as a Mail Merge data source?",
            options: [".docx", ".xlsx (Excel)", ".pptx", ".txt"],
            answer: 1,
          },
          {
            q: "True or False: Mail Merge can be used to create personalised certificates.",
            options: ["True", "False"],
            answer: 0,
          },
          {
            q: "What do angle brackets « » represent in a mail merge document?",
            options: ["Formatting markers", "Merge fields from the data source", "Hyperlinks", "Comments"],
            answer: 1,
          },
        ],
        resources: [
          { name: "Mail Merge Step-by-Step", url: "https://support.microsoft.com/en-us/office/use-mail-merge-to-send-bulk-email-messages-cc228f41-ae18-488c-be5d-b456c3e97b8b", type: "link" },
          { name: "Mail Merge Template (Download)", url: "https://templates.office.com/en-us/mail-merge-letters-tm16400711", type: "pdf" },
        ],
      },
      {
        id: "word-4",
        title: "Module 4: Track Changes, Comments & Collaboration",
        duration: "20 min",
        video: "https://www.youtube.com/embed/W-wnMGqDi78",
        exercise: {
          title: "Collaborative Document Review",
          instructions: [
            "Open any existing Word document.",
            "Enable Track Changes: Review > Track Changes > Track Changes.",
            "Make 5 different edits (add, delete, format text).",
            "Add 2 comments using Review > New Comment.",
            "Accept and reject individual changes using the Review ribbon.",
          ],
          task: "How many changes did you accept? Enter the number:",
          inputLabel: "Changes Accepted",
          inputPlaceholder: "e.g., 3",
        },
        quiz: [
          {
            q: "Track Changes records edits made by:",
            options: ["Only the original author", "Any user who edits the document", "Only admins", "Microsoft automatically"],
            answer: 1,
          },
          {
            q: "To add a comment in Word, you go to:",
            options: ["Insert > Comment", "Review > New Comment", "Home > Comment", "View > Comment"],
            answer: 1,
          },
          {
            q: "True or False: You can accept all tracked changes at once in Word.",
            options: ["True", "False"],
            answer: 0,
          },
          {
            q: "Tracked deletions appear as:",
            options: ["Bold text", "Strikethrough text in a different colour", "Highlighted yellow", "Hidden text"],
            answer: 1,
          },
        ],
        resources: [
          { name: "Track Changes Guide", url: "https://support.microsoft.com/en-us/office/track-changes-in-word-197ba630-0f5f-4a8e-9a77-3712475e806a", type: "link" },
        ],
      },
      {
        id: "word-5",
        title: "Module 5: Advanced Formatting & Templates",
        duration: "25 min",
        video: "https://www.youtube.com/embed/GxSRnNdyGPg",
        exercise: {
          title: "Create a School Letterhead Template",
          instructions: [
            "Open a new Word document.",
            "Insert a header with your school name and logo placeholder.",
            "Set professional fonts: Calibri 11pt for body, Calibri Light 16pt for titles.",
            "Add a footer with page number and school address.",
            "Save as a Word Template (.dotx) so it can be reused.",
          ],
          task: "Enter your template name as saved:",
          inputLabel: "Template Filename",
          inputPlaceholder: "e.g., School_Letterhead_2025",
        },
        quiz: [
          {
            q: "Word templates are saved with which extension?",
            options: [".docx", ".dotx", ".xlsx", ".pptx"],
            answer: 1,
          },
          {
            q: "Headers and footers appear on:",
            options: ["Only the first page", "Only the last page", "Every page of the document", "Only odd pages by default"],
            answer: 2,
          },
          {
            q: "True or False: You can insert automatic page numbers in a Word footer.",
            options: ["True", "False"],
            answer: 0,
          },
          {
            q: "Which Word feature lets you insert a pre-designed visual element like a cover page?",
            options: ["Insert > Cover Page", "Home > Cover", "Layout > Cover", "Design > Page"],
            answer: 0,
          },
        ],
        resources: [
          { name: "Word Templates Library", url: "https://templates.office.com/en-us/templates-for-word", type: "link" },
          { name: "Advanced Formatting Tutorial", url: "https://support.microsoft.com/en-us/office/format-a-document-in-word-for-the-web-f0a78f55-b00f-47c9-b61e-36a9889bb45e", type: "link" },
        ],
      },
    ],
  },
  {
    id: "ms-excel",
    title: "Microsoft Excel",
    icon: "📊",
    description: "From data entry to advanced formulas, pivot tables, and data visualisation for school administration.",
    modules: [
      {
        id: "excel-1",
        title: "Module 1: Excel Interface & Data Entry",
        duration: "20 min",
        video: "https://www.youtube.com/embed/rwbho0CgEkI",
        exercise: {
          title: "Build a Class Register",
          instructions: [
            "Open Excel and create a new workbook.",
            "In Row 1, create headers: No., Name, Subject, Score, Grade.",
            "Enter 10 student records.",
            "Format the header row: Bold, background colour (dark blue), white text.",
            "Auto-fit all columns (select all → double-click column border).",
          ],
          task: "Enter the subject you created the register for:",
          inputLabel: "Subject Name",
          inputPlaceholder: "e.g., Mathematics",
        },
        quiz: [
          {
            q: "A cell reference like B3 refers to:",
            options: ["Column B, Row 3", "Row B, Column 3", "Page B, Cell 3", "Block B3"],
            answer: 0,
          },
          {
            q: "To auto-fit a column width in Excel, you:",
            options: ["Press Ctrl+A", "Double-click the column border in the header", "Right-click and Format Cells", "Use the View tab"],
            answer: 1,
          },
          {
            q: "True or False: Excel can hold multiple worksheets in one workbook.",
            options: ["True", "False"],
            answer: 0,
          },
          {
            q: "The Name Box in Excel displays:",
            options: ["The workbook name", "The active cell reference", "The formula result", "The sheet name"],
            answer: 1,
          },
        ],
        resources: [
          { name: "Excel Basics Cheatsheet", url: "https://support.microsoft.com/en-us/excel", type: "link" },
        ],
      },
      {
        id: "excel-2",
        title: "Module 2: Formulas & Functions",
        duration: "30 min",
        video: "https://www.youtube.com/embed/eFGGKv3pHzk",
        exercise: {
          title: "Grade Calculator with Formulas",
          instructions: [
            "Use your class register from Module 1.",
            "In column E, use =IF(D2>=80,\"A\",IF(D2>=70,\"B\",IF(D2>=60,\"C\",\"F\"))) for grades.",
            "Add a row at the bottom for: Average (=AVERAGE), Highest (=MAX), Lowest (=MIN).",
            "In a new column, use =COUNTIF to count how many students got each grade.",
            "Format scores below 60 in red using Conditional Formatting.",
          ],
          task: "What was the class average score? Enter it below:",
          inputLabel: "Class Average",
          inputPlaceholder: "e.g., 72.4",
        },
        quiz: [
          {
            q: "Which formula calculates the average of cells A1 to A10?",
            options: ["=SUM(A1:A10)", "=AVERAGE(A1:A10)", "=MEAN(A1:A10)", "=AVG(A1:A10)"],
            answer: 1,
          },
          {
            q: "The IF function in Excel tests a condition and returns:",
            options: ["Only TRUE", "Only FALSE", "One of two values based on the condition", "An error"],
            answer: 2,
          },
          {
            q: "True or False: VLOOKUP searches vertically through the first column of a table.",
            options: ["True", "False"],
            answer: 0,
          },
          {
            q: "Conditional Formatting is found under which Excel tab?",
            options: ["Insert", "Data", "Home", "Formulas"],
            answer: 2,
          },
        ],
        resources: [
          { name: "Excel Formula Reference", url: "https://support.microsoft.com/en-us/office/excel-functions-alphabetical-b3944572-255d-4efb-bb96-c6d90033e188", type: "link" },
        ],
      },
      {
        id: "excel-3",
        title: "Module 3: Charts & Data Visualisation",
        duration: "25 min",
        video: "https://www.youtube.com/embed/DAU0qqh_I-A",
        exercise: {
          title: "Create a Student Performance Dashboard",
          instructions: [
            "Select your student names and scores.",
            "Insert a Bar Chart: Insert > Bar Chart > Clustered Bar.",
            "Add a chart title: 'Class Performance – Term 1'.",
            "Change colours to match your school colours.",
            "Insert a Pie Chart showing the grade distribution (A, B, C, F counts).",
          ],
          task: "What chart type did you use for grade distribution?",
          inputLabel: "Chart Type",
          inputPlaceholder: "e.g., Pie Chart",
        },
        quiz: [
          {
            q: "Which chart type is best for showing parts of a whole?",
            options: ["Bar chart", "Line chart", "Pie chart", "Scatter plot"],
            answer: 2,
          },
          {
            q: "To insert a chart in Excel, you use which tab?",
            options: ["Home", "Insert", "Data", "View"],
            answer: 1,
          },
          {
            q: "True or False: Charts in Excel update automatically when the source data changes.",
            options: ["True", "False"],
            answer: 0,
          },
          {
            q: "A Sparkline in Excel is:",
            options: ["A large dashboard chart", "A tiny chart in a single cell", "A 3D chart", "A chart template"],
            answer: 1,
          },
        ],
        resources: [
          { name: "Excel Chart Types Guide", url: "https://support.microsoft.com/en-us/office/available-chart-types-in-office-a6187218-807e-4103-9e0a-27cdb19afb90", type: "link" },
        ],
      },
      {
        id: "excel-4",
        title: "Module 4: Pivot Tables",
        duration: "30 min",
        video: "https://www.youtube.com/embed/9NUjHBNWe9M",
        exercise: {
          title: "Analyse School Data with Pivot Tables",
          instructions: [
            "Create a dataset with columns: Teacher, Class, Subject, Average Score, Term.",
            "Enter at least 15 rows of data.",
            "Insert a Pivot Table: Insert > PivotTable.",
            "Drag 'Subject' to Rows, 'Teacher' to Columns, 'Average Score' to Values (Average).",
            "Add a Slicer for 'Term' to filter the pivot table dynamically.",
          ],
          task: "Which subject had the highest average score in your pivot table?",
          inputLabel: "Top Subject",
          inputPlaceholder: "e.g., Mathematics",
        },
        quiz: [
          {
            q: "A Pivot Table is used to:",
            options: ["Create visual charts", "Summarise large datasets without formulas", "Format cells automatically", "Sort data alphabetically"],
            answer: 1,
          },
          {
            q: "A Slicer in a Pivot Table is used to:",
            options: ["Cut cells", "Filter data visually with buttons", "Add rows", "Calculate totals"],
            answer: 1,
          },
          {
            q: "True or False: You can refresh a Pivot Table when the source data changes.",
            options: ["True", "False"],
            answer: 0,
          },
          {
            q: "In a Pivot Table, 'Values' field typically shows:",
            options: ["Text labels", "Calculated data like sums or averages", "Row numbers", "Filter criteria"],
            answer: 1,
          },
        ],
        resources: [
          { name: "Pivot Table Tutorial", url: "https://support.microsoft.com/en-us/office/create-a-pivottable-to-analyze-worksheet-data-a9a84538-bfe9-40a9-a8e9-f99134456576", type: "link" },
        ],
      },
      {
        id: "excel-5",
        title: "Module 5: Data Validation & Protection",
        duration: "25 min",
        video: "https://www.youtube.com/embed/BkFdlmSxhxM",
        exercise: {
          title: "Secure a Student Grading Sheet",
          instructions: [
            "Create a grading form with student names and score input cells.",
            "Apply Data Validation to score cells: Allow only whole numbers between 0 and 100.",
            "Add an Input Message: 'Enter score between 0 and 100.'",
            "Add an Error Alert: 'Invalid score! Please enter 0–100.'",
            "Protect the sheet (Review > Protect Sheet) locking header rows but allowing score entry.",
          ],
          task: "What password did you set for sheet protection? (Just confirm you set one):",
          inputLabel: "Confirm Action",
          inputPlaceholder: "Type: Sheet protected successfully",
        },
        quiz: [
          {
            q: "Data Validation in Excel is found under which tab?",
            options: ["Home", "Insert", "Data", "Review"],
            answer: 2,
          },
          {
            q: "Sheet Protection in Excel prevents users from:",
            options: ["Viewing the sheet", "Editing locked cells", "Printing the sheet", "Opening the file"],
            answer: 1,
          },
          {
            q: "True or False: Data Validation can restrict input to items from a dropdown list.",
            options: ["True", "False"],
            answer: 0,
          },
          {
            q: "Which Excel feature highlights cells based on their value automatically?",
            options: ["Data Validation", "Conditional Formatting", "Cell Styles", "Number Format"],
            answer: 1,
          },
        ],
        resources: [
          { name: "Data Validation Guide", url: "https://support.microsoft.com/en-us/office/apply-data-validation-to-cells-29fecbcc-d1b9-42c1-9d76-eff3ce5f7249", type: "link" },
        ],
      },
    ],
  },
  {
    id: "powerpoint",
    title: "PowerPoint",
    icon: "📽️",
    description: "Design compelling, professional presentations that engage learners and communicate clearly.",
    modules: [
      {
        id: "ppt-1",
        title: "Module 1: Design Principles & Slide Layouts",
        duration: "25 min",
        video: "https://www.youtube.com/embed/6jhHaTKVRVE",
        exercise: {
          title: "Professional 5-Slide Presentation",
          instructions: [
            "Open PowerPoint and choose a professional theme (NOT the default Office theme).",
            "Create 5 slides: Title, Agenda, Content x2, Thank You.",
            "Use the Slide Layout panel to apply appropriate layouts to each slide.",
            "Apply a consistent colour scheme using Design > Variants.",
            "Add your name and date to the slide master footer.",
          ],
          task: "What theme/design did you choose for your presentation?",
          inputLabel: "Theme Name",
          inputPlaceholder: "e.g., Integral, Facet, Ion",
        },
        quiz: [
          {
            q: "The Slide Master in PowerPoint controls:",
            options: ["Only the first slide", "The overall design and layout for all slides", "Animation timing", "Speaker notes"],
            answer: 1,
          },
          {
            q: "Which rule suggests using no more than 6 bullet points per slide?",
            options: ["The 10/20/30 Rule", "The 6x6 Rule", "The 5-second Rule", "The 3-act Rule"],
            answer: 1,
          },
          {
            q: "True or False: PowerPoint allows you to embed fonts so the presentation looks correct on other computers.",
            options: ["True", "False"],
            answer: 0,
          },
          {
            q: "Slide layouts in PowerPoint are found under which tab?",
            options: ["Home > Layout", "Insert > Layout", "Design > Layout", "View > Layout"],
            answer: 0,
          },
        ],
        resources: [
          { name: "PowerPoint Design Best Practices", url: "https://support.microsoft.com/en-us/powerpoint", type: "link" },
        ],
      },
      {
        id: "ppt-2",
        title: "Module 2: Animations, Transitions & Multimedia",
        duration: "30 min",
        video: "https://www.youtube.com/embed/n1RCrHFMXvs",
        exercise: {
          title: "Animated Lesson Presentation",
          instructions: [
            "Create an 8-slide educational presentation on any school topic.",
            "Add entrance animations to bullet points (Appear or Fade — avoid flashy effects).",
            "Apply a consistent slide transition (Fade recommended).",
            "Embed a YouTube video on slide 4 using Insert > Video > Online Video.",
            "Record a voiceover on slide 1 using Insert > Audio > Record Audio.",
          ],
          task: "What topic did you create your lesson presentation on?",
          inputLabel: "Lesson Topic",
          inputPlaceholder: "e.g., The Water Cycle",
        },
        quiz: [
          {
            q: "Which animation type makes text appear letter by letter?",
            options: ["By Word", "By Paragraph", "As One Object", "By Letter"],
            answer: 3,
          },
          {
            q: "Slide Transitions in PowerPoint are controlled under which tab?",
            options: ["Home", "Animations", "Transitions", "Slide Show"],
            answer: 2,
          },
          {
            q: "True or False: Excessive animations distract from the message and reduce professionalism.",
            options: ["True", "False"],
            answer: 0,
          },
          {
            q: "To add an online video to a PowerPoint slide, you use:",
            options: ["Home > Video", "Insert > Video > Online Video", "Design > Media", "Slide Show > Video"],
            answer: 1,
          },
        ],
        resources: [
          { name: "Animations & Transitions Guide", url: "https://support.microsoft.com/en-us/office/add-animations-to-text-images-tables-smart-art-and-other-objects-in-powerpoint-6a10f6e6-7c97-4571-a20d-1f89c41f2b7d", type: "link" },
        ],
      },
      {
        id: "ppt-3",
        title: "Module 3: SmartArt, Charts & Data Slides",
        duration: "25 min",
        video: "https://www.youtube.com/embed/VCWnnM8YNCI",
        exercise: {
          title: "Data-Driven Presentation",
          instructions: [
            "Create a slide with a SmartArt hierarchy showing school structure (Principal → HoDs → Teachers).",
            "Insert a Bar Chart showing student performance by class.",
            "Insert a Table comparing 3 teaching strategies.",
            "Apply consistent data colours matching your theme.",
            "Add data labels to your chart.",
          ],
          task: "How many levels did your SmartArt hierarchy have?",
          inputLabel: "Number of Levels",
          inputPlaceholder: "e.g., 3",
        },
        quiz: [
          {
            q: "SmartArt in PowerPoint is best used to:",
            options: ["Show financial data", "Visualise relationships, processes, and hierarchies", "Embed videos", "Create animations"],
            answer: 1,
          },
          {
            q: "To insert a chart in PowerPoint, you go to:",
            options: ["Home > Chart", "Insert > Chart", "Design > Chart", "View > Chart"],
            answer: 1,
          },
          {
            q: "True or False: Charts inserted in PowerPoint are linked to Excel data.",
            options: ["True", "False"],
            answer: 0,
          },
          {
            q: "Data labels on a PowerPoint chart:",
            options: ["Remove the legend", "Show values directly on chart elements", "Add animations", "Change chart type"],
            answer: 1,
          },
        ],
        resources: [
          { name: "SmartArt Tutorial", url: "https://support.microsoft.com/en-us/office/create-a-smartart-graphic-from-scratch-fac91570-06c8-4e18-a0f6-73a6fd85c3f6", type: "link" },
        ],
      },
      {
        id: "ppt-4",
        title: "Module 4: Presenter Tools & Delivery",
        duration: "20 min",
        video: "https://www.youtube.com/embed/2APFUjFrgTc",
        exercise: {
          title: "Rehearse Your Presentation",
          instructions: [
            "Open your existing presentation.",
            "Add speaker notes to each slide (at least 2 sentences each).",
            "Use Slide Show > Rehearse Timings to time your presentation.",
            "Use Presenter View: Slide Show > Presenter View (requires 2 screens or simulate).",
            "Export your presentation as a PDF handout: File > Export > Create PDF/XPS.",
          ],
          task: "What was your total rehearsed presentation duration (minutes)?",
          inputLabel: "Presentation Duration",
          inputPlaceholder: "e.g., 12 minutes",
        },
        quiz: [
          {
            q: "Presenter View in PowerPoint shows:",
            options: ["Only the slide to the audience", "Current slide, notes, timer, and next slide to the presenter", "The slide master", "All slides at once"],
            answer: 1,
          },
          {
            q: "Speaker notes in PowerPoint are visible to:",
            options: ["The audience on the projected screen", "Only the presenter in Presenter View", "Everyone by default", "No one"],
            answer: 1,
          },
          {
            q: "True or False: You can export a PowerPoint presentation as a video.",
            options: ["True", "False"],
            answer: 0,
          },
          {
            q: "Rehearse Timings in PowerPoint is used to:",
            options: ["Set animation speed", "Record how long you spend on each slide", "Lock the presentation", "Add slide numbers"],
            answer: 1,
          },
        ],
        resources: [
          { name: "Presenter View Guide", url: "https://support.microsoft.com/en-us/office/use-presenter-view-in-powerpoint-fe7638e4-76fb-4349-8d81-5eb6679f49d7", type: "link" },
        ],
      },
      {
        id: "ppt-5",
        title: "Module 5: Interactive Presentations & Quizzes",
        duration: "25 min",
        video: "https://www.youtube.com/embed/5g5DNxBu4O4",
        exercise: {
          title: "Create an Interactive Quiz in PowerPoint",
          instructions: [
            "Create a 10-slide quiz presentation on any topic.",
            "Slide 1: Title. Slides 2–6: Questions with 4 answer options as text boxes.",
            "Use Hyperlinks to link correct answer to a 'Correct!' slide and wrong answers to a 'Try Again!' slide.",
            "Add Action Buttons (Insert > Action Buttons) for navigation.",
            "Test the quiz fully in Slide Show mode.",
          ],
          task: "What topic is your interactive quiz on?",
          inputLabel: "Quiz Topic",
          inputPlaceholder: "e.g., African Geography",
        },
        quiz: [
          {
            q: "Hyperlinks in PowerPoint can link to:",
            options: ["Only websites", "Another slide, a file, or a URL", "Only email addresses", "Only the first slide"],
            answer: 1,
          },
          {
            q: "Action Buttons in PowerPoint are found under:",
            options: ["Home > Shapes", "Insert > Shapes > Action Buttons", "Design > Buttons", "Animations > Actions"],
            answer: 1,
          },
          {
            q: "True or False: PowerPoint presentations can be saved as interactive HTML files.",
            options: ["True", "False"],
            answer: 0,
          },
          {
            q: "To make a quiz non-linear in PowerPoint, you use:",
            options: ["Animations", "Hyperlinks between slides", "Transitions", "Slide layouts"],
            answer: 1,
          },
        ],
        resources: [
          { name: "Interactive Presentations Guide", url: "https://support.microsoft.com/en-us/office/add-a-hyperlink-to-a-slide-239c6c94-d52f-480c-99ae-8b0acf7df6d9", type: "link" },
        ],
      },
    ],
  },
  {
    id: "ms-teams",
    title: "Microsoft Teams",
    icon: "💬",
    description: "Leverage Teams for virtual classrooms, collaboration, meetings, and school-wide communication.",
    modules: [
      {
        id: "teams-1",
        title: "Module 1: Setting Up Your Classroom Team",
        duration: "25 min",
        video: "https://www.youtube.com/embed/jugBQqE_2sM",
        exercise: {
          title: "Create a Class Team",
          instructions: [
            "In Microsoft Teams, click 'Join or create a team' > 'Create team'.",
            "Select 'Class' as the team type.",
            "Name it: '[Subject] [Grade] [Year]' e.g. 'Mathematics Grade 10 2025'.",
            "Add your subject description.",
            "Create 3 channels: General, Assignments, Resources.",
          ],
          task: "What is the full name of your class team?",
          inputLabel: "Team Name",
          inputPlaceholder: "e.g., Mathematics Grade 10 2025",
        },
        quiz: [
          {
            q: "In Microsoft Teams Education, the 'Class' team type provides:",
            options: ["Only chat features", "Assignment tracking, grade book, and OneNote class notebook", "Only file sharing", "Only video calls"],
            answer: 1,
          },
          {
            q: "Channels in Microsoft Teams are used to:",
            options: ["Replace email", "Organise conversations by topic", "Make video calls only", "Store passwords"],
            answer: 1,
          },
          {
            q: "True or False: Students can create channels in a Class team by default.",
            options: ["True", "False"],
            answer: 1,
          },
          {
            q: "The 'General' channel in a Team is:",
            options: ["Optional and can be deleted", "The default channel that cannot be deleted", "Only for teachers", "Used for video calls only"],
            answer: 1,
          },
        ],
        resources: [
          { name: "Teams for Education Guide", url: "https://support.microsoft.com/en-us/topic/get-started-with-microsoft-teams-for-education-b9e4fb1d-5d87-4f0e-a3b6-0ce3fd8e2455", type: "link" },
        ],
      },
      {
        id: "teams-2",
        title: "Module 2: Assignments & Grading",
        duration: "30 min",
        video: "https://www.youtube.com/embed/1w7G8A4yAPU",
        exercise: {
          title: "Create and Grade an Assignment",
          instructions: [
            "In your Class team, click 'Assignments' > 'Create' > 'Assignment'.",
            "Title: 'Chapter 3 Review Questions'.",
            "Attach a Word document as the assignment template.",
            "Set a due date for next Friday.",
            "Assign to all students and publish.",
            "Open a submitted assignment and add feedback and a grade.",
          ],
          task: "What was the maximum points for your assignment?",
          inputLabel: "Maximum Points",
          inputPlaceholder: "e.g., 50",
        },
        quiz: [
          {
            q: "In Teams Assignments, 'Points' refers to:",
            options: ["Attendance points", "The maximum grade achievable for the assignment", "Bonus marks only", "Participation score"],
            answer: 1,
          },
          {
            q: "When you return a graded assignment in Teams, the student:",
            options: ["Never sees the feedback", "Receives a notification and can view feedback", "Must email you for grades", "Gets an automatic report card"],
            answer: 1,
          },
          {
            q: "True or False: Teams Assignments can have multiple attachments including rubrics.",
            options: ["True", "False"],
            answer: 0,
          },
          {
            q: "The Grades tab in a Class team shows:",
            options: ["Attendance records", "All assignment scores across all students", "Email history", "Meeting recordings"],
            answer: 1,
          },
        ],
        resources: [
          { name: "Assignments in Teams", url: "https://support.microsoft.com/en-us/office/microsoft-teams-5aa4431a-8a3c-4aa5-87a6-b6401abea114", type: "link" },
        ],
      },
      {
        id: "teams-3",
        title: "Module 3: Virtual Meetings & Breakout Rooms",
        duration: "25 min",
        video: "https://www.youtube.com/embed/hq1lIPFxk6o",
        exercise: {
          title: "Host a Virtual Class Meeting",
          instructions: [
            "Schedule a meeting in your Class team channel for a future date and time.",
            "In meeting settings, enable the lobby so students wait to be admitted.",
            "During a practice meeting, enable Breakout Rooms and create 3 rooms.",
            "Assign participants and open the rooms.",
            "Use the meeting chat to post a discussion question.",
          ],
          task: "How many breakout rooms did you create?",
          inputLabel: "Number of Rooms",
          inputPlaceholder: "e.g., 3",
        },
        quiz: [
          {
            q: "The Lobby in a Teams meeting allows the host to:",
            options: ["Kick out participants", "Control who enters the meeting", "Record the meeting automatically", "Share files"],
            answer: 1,
          },
          {
            q: "Breakout Rooms in Teams are used to:",
            options: ["Schedule future meetings", "Split participants into smaller groups for discussion", "Share the screen", "Record attendance"],
            answer: 1,
          },
          {
            q: "True or False: Teams meetings can be recorded and saved to SharePoint or OneDrive.",
            options: ["True", "False"],
            answer: 0,
          },
          {
            q: "To raise your hand virtually during a Teams meeting, you:",
            options: ["Type 'hand' in the chat", "Click the Raise Hand icon in the meeting toolbar", "Wave at the camera", "Send an emoji"],
            answer: 1,
          },
        ],
        resources: [
          { name: "Breakout Rooms in Teams", url: "https://support.microsoft.com/en-us/office/use-breakout-rooms-in-microsoft-teams-meetings-7de1f48a-da07-466c-a5ab-4ebace28e461", type: "link" },
        ],
      },
      {
        id: "teams-4",
        title: "Module 4: File Sharing & OneNote",
        duration: "25 min",
        video: "https://www.youtube.com/embed/IWWtUm_HEL4",
        exercise: {
          title: "Organise Class Resources",
          instructions: [
            "In your Class team, click the 'Files' tab.",
            "Create folders: Term 1, Term 2, Resources, Templates.",
            "Upload 3 teaching resources to the Resources folder.",
            "Open the Class Notebook (OneNote) from the Teams tab.",
            "Create a note in the Collaboration Space for students: 'Welcome to [Subject]!'",
          ],
          task: "What is the name of your first uploaded resource?",
          inputLabel: "Resource Filename",
          inputPlaceholder: "e.g., Chapter1_Notes.pdf",
        },
        quiz: [
          {
            q: "Files shared in a Teams channel are stored in:",
            options: ["Google Drive", "SharePoint (linked to the team)", "OneDrive personal", "Local computer only"],
            answer: 1,
          },
          {
            q: "The Class Notebook in Teams is powered by:",
            options: ["Word Online", "OneNote", "Excel Online", "Forms"],
            answer: 1,
          },
          {
            q: "True or False: All team members can edit files in the Files tab simultaneously.",
            options: ["True", "False"],
            answer: 0,
          },
          {
            q: "The Collaboration Space in OneNote Class Notebook is:",
            options: ["Only viewable by the teacher", "A shared space where all students can add content", "The teacher's private notes", "Locked during exams"],
            answer: 1,
          },
        ],
        resources: [
          { name: "OneNote Class Notebook", url: "https://support.microsoft.com/en-us/office/class-notebook-for-onenote-0b2a3c73-a6d0-470a-be55-dc73e47e93c2", type: "link" },
        ],
      },
      {
        id: "teams-5",
        title: "Module 5: Teams Apps, Polls & Forms",
        duration: "20 min",
        video: "https://www.youtube.com/embed/yDOiPOdpOBk",
        exercise: {
          title: "Engage Students with Polls & Quizzes",
          instructions: [
            "In a Teams channel, click '+' to add a tab and add 'Forms'.",
            "Create a quick 5-question quiz using Microsoft Forms.",
            "Share the quiz link in your class channel.",
            "In a meeting, use the Polls feature to launch a live poll.",
            "View the real-time poll results during the session.",
          ],
          task: "What was your quiz topic in Microsoft Forms?",
          inputLabel: "Forms Quiz Topic",
          inputPlaceholder: "e.g., Term 1 Revision Quiz",
        },
        quiz: [
          {
            q: "Microsoft Forms integrated with Teams can be used to:",
            options: ["Only collect emails", "Create quizzes, surveys, and polls with real-time results", "Design slide decks", "Record meetings"],
            answer: 1,
          },
          {
            q: "To add an app or tool to a Teams channel, you click:",
            options: ["The settings gear", "The '+' icon (Add a tab)", "The chat bubble", "The call button"],
            answer: 1,
          },
          {
            q: "True or False: Microsoft Forms automatically grades quiz responses if answer keys are set.",
            options: ["True", "False"],
            answer: 0,
          },
          {
            q: "Polls launched during a Teams meeting are:",
            options: ["Anonymous always", "Visible only to the host", "Displayed live for all participants to see and respond", "Saved to email"],
            answer: 2,
          },
        ],
        resources: [
          { name: "Forms & Polls in Teams", url: "https://support.microsoft.com/en-us/office/create-a-poll-in-microsoft-teams-a3f9112c-01e1-4ee4-bd88-25e4ebe0c4ba", type: "link" },
        ],
      },
    ],
  },
  {
    id: "cybersecurity",
    title: "Cybersecurity",
    icon: "🔐",
    description: "Protect yourself, your students, and your school data with essential cybersecurity knowledge.",
    modules: [
      {
        id: "cyber-1",
        title: "Module 1: Password Security & Account Safety",
        duration: "25 min",
        video: "https://www.youtube.com/embed/aEmXedplH-c",
        exercise: {
          title: "Password Strength Audit",
          instructions: [
            "Visit HaveIBeenPwned.com and check if your email has been in a data breach.",
            "Use Bitwarden or LastPass (free) to generate a 16+ character password.",
            "Enable Two-Factor Authentication on your Google or Microsoft account.",
            "Review your account recovery options and update any outdated phone numbers/emails.",
            "Document your password strategy (not actual passwords!).",
          ],
          task: "Describe your new password strategy in one sentence:",
          inputLabel: "Password Strategy",
          inputPlaceholder: "e.g., 16-char random passwords stored in Bitwarden with 2FA on all accounts",
        },
        quiz: [
          {
            q: "Which password is most secure?",
            options: ["password123", "MyName2024!", "xK#9mL$2pQr!vN7@", "School@123"],
            answer: 2,
          },
          {
            q: "Two-Factor Authentication (2FA) adds security by:",
            options: ["Doubling your password length", "Requiring a second verification step beyond the password", "Encrypting your email", "Scanning your fingerprint only"],
            answer: 1,
          },
          {
            q: "True or False: Using the same password across multiple accounts is a major security risk.",
            options: ["True", "False"],
            answer: 0,
          },
          {
            q: "A Password Manager is used to:",
            options: ["Guess weak passwords", "Securely store and generate strong, unique passwords", "Reset forgotten passwords via email", "Lock your screen"],
            answer: 1,
          },
        ],
        resources: [
          { name: "HaveIBeenPwned.com", url: "https://haveibeenpwned.com", type: "link" },
          { name: "Bitwarden Password Manager", url: "https://bitwarden.com", type: "link" },
        ],
      },
      {
        id: "cyber-2",
        title: "Module 2: Phishing & Social Engineering",
        duration: "25 min",
        video: "https://www.youtube.com/embed/rMUEAQiYkqQ",
        exercise: {
          title: "Spot the Phishing Email",
          instructions: [
            "Visit phishingquiz.withgoogle.com and complete Google's Phishing Quiz.",
            "Screenshot your final score.",
            "Identify 5 red flags in the sample phishing emails provided.",
            "Draft a brief phishing awareness tip you could share with colleagues (2–3 sentences).",
          ],
          task: "What was your score on Google's Phishing Quiz?",
          inputLabel: "Phishing Quiz Score",
          inputPlaceholder: "e.g., 7 out of 8",
        },
        quiz: [
          {
            q: "Phishing emails typically try to:",
            options: ["Send you software updates", "Trick you into revealing sensitive information", "Improve your email security", "Offer legitimate job opportunities"],
            answer: 1,
          },
          {
            q: "Which is a classic sign of a phishing email?",
            options: ["Sent from your bank's official domain", "Uses your full correct name", "Urgent request to click a link and verify account details", "Contains no links"],
            answer: 2,
          },
          {
            q: "True or False: Phishing attacks can also occur via SMS (called 'Smishing').",
            options: ["True", "False"],
            answer: 0,
          },
          {
            q: "If you receive a suspicious email from your 'bank', you should:",
            options: ["Click the link to check", "Reply asking for more details", "Call your bank directly using the official number from their website", "Forward it to colleagues"],
            answer: 2,
          },
        ],
        resources: [
          { name: "Google Phishing Quiz", url: "https://phishingquiz.withgoogle.com", type: "link" },
          { name: "Cybersecurity Awareness Guide", url: "https://www.cisa.gov/topics/cybersecurity-best-practices", type: "link" },
        ],
      },
      {
        id: "cyber-3",
        title: "Module 3: Safe Internet Use & Privacy",
        duration: "25 min",
        video: "https://www.youtube.com/embed/KTFZKi2e-j4",
        exercise: {
          title: "Digital Privacy Audit",
          instructions: [
            "Check your browser privacy settings and disable third-party cookies.",
            "Install uBlock Origin (browser extension) to block ads and trackers.",
            "Review the privacy settings on your school email/Google account.",
            "Adjust social media privacy settings: make your profiles private or friends-only.",
            "Enable HTTPS-only mode in your browser settings.",
          ],
          task: "Name 2 privacy changes you made during this exercise:",
          inputLabel: "Privacy Changes Made",
          inputPlaceholder: "e.g., Enabled HTTPS-only, blocked third-party cookies",
        },
        quiz: [
          {
            q: "HTTPS in a website URL indicates:",
            options: ["The site is government-owned", "Data between your browser and site is encrypted", "The site is free of malware", "The site is on a fast server"],
            answer: 1,
          },
          {
            q: "A VPN (Virtual Private Network) primarily:",
            options: ["Speeds up your internet", "Encrypts your connection and hides your IP address", "Removes all ads", "Protects against all malware"],
            answer: 1,
          },
          {
            q: "True or False: Incognito/Private mode hides your activity from your Internet Service Provider.",
            options: ["True", "False"],
            answer: 1,
          },
          {
            q: "Third-party cookies are primarily used to:",
            options: ["Improve website speed", "Track your browsing activity across multiple sites for advertising", "Store your passwords", "Block malicious sites"],
            answer: 1,
          },
        ],
        resources: [
          { name: "uBlock Origin Extension", url: "https://ublockorigin.com", type: "link" },
          { name: "Privacy Badger", url: "https://privacybadger.org", type: "link" },
        ],
      },
      {
        id: "cyber-4",
        title: "Module 4: Data Protection & POPIA Compliance",
        duration: "30 min",
        video: "https://www.youtube.com/embed/1KIamBmMJmA",
        exercise: {
          title: "School Data Protection Policy Review",
          instructions: [
            "Read the summary of POPIA (South Africa's Protection of Personal Information Act).",
            "List 5 types of student data your school collects (e.g., name, ID number, marks).",
            "Identify how each data type is currently stored and who has access.",
            "Draft 3 recommendations to improve your school's data protection.",
            "Consider: Is student data encrypted? Is access logged? Are devices password-protected?",
          ],
          task: "What is one data protection recommendation you are implementing?",
          inputLabel: "Your Recommendation",
          inputPlaceholder: "e.g., Encrypt student records and restrict access to authorised staff only",
        },
        quiz: [
          {
            q: "POPIA stands for:",
            options: ["Protection of Private and Online Information Act", "Protection of Personal Information Act", "Personal Online Privacy and Information Act", "Public and Online Privacy Information Act"],
            answer: 1,
          },
          {
            q: "Under POPIA, schools are required to:",
            options: ["Share all student data publicly", "Process personal information responsibly and lawfully", "Delete all student records after 1 year", "Only store data in the cloud"],
            answer: 1,
          },
          {
            q: "True or False: Sharing a student's personal information without consent may violate POPIA.",
            options: ["True", "False"],
            answer: 0,
          },
          {
            q: "A data breach at school means:",
            options: ["A student hacked the school system", "Unauthorised access to or disclosure of personal information", "The school lost Wi-Fi", "A virus infected one computer"],
            answer: 1,
          },
        ],
        resources: [
          { name: "POPIA Overview", url: "https://popia.co.za", type: "link" },
          { name: "Data Protection Guide for Schools", url: "https://www.ssa.gov.za", type: "link" },
        ],
      },
      {
        id: "cyber-5",
        title: "Module 5: Device Security & Malware Prevention",
        duration: "25 min",
        video: "https://www.youtube.com/embed/Uqjg0MN5YFU",
        exercise: {
          title: "Secure Your School Device",
          instructions: [
            "Ensure your device's operating system is fully updated.",
            "Run a full scan with Windows Defender or your antivirus software.",
            "Review installed programs and uninstall any unfamiliar or unused software.",
            "Enable automatic updates for your OS and applications.",
            "Set your device to lock automatically after 5 minutes of inactivity.",
          ],
          task: "What did your antivirus scan find (even if nothing)?",
          inputLabel: "Scan Result",
          inputPlaceholder: "e.g., No threats found. 1 PUP quarantined.",
        },
        quiz: [
          {
            q: "Ransomware is a type of malware that:",
            options: ["Speeds up your computer", "Encrypts your files and demands payment to restore access", "Monitors your keystrokes", "Deletes spam emails"],
            answer: 1,
          },
          {
            q: "The best defence against malware is:",
            options: ["Using only one browser", "Keeping software updated, using antivirus, and being cautious online", "Never connecting to Wi-Fi", "Using only Microsoft products"],
            answer: 1,
          },
          {
            q: "True or False: USB drives can be used to spread malware.",
            options: ["True", "False"],
            answer: 0,
          },
          {
            q: "What should you do if you suspect malware on your device?",
            options: ["Continue using it and hope it fixes itself", "Disconnect from the network and contact IT support immediately", "Delete all your files", "Restart the device and ignore it"],
            answer: 1,
          },
        ],
        resources: [
          { name: "Windows Defender Guide", url: "https://support.microsoft.com/en-us/windows/stay-protected-with-windows-security-2ae0363d-0ada-c064-8b56-6a39afb6a963", type: "link" },
          { name: "Malware Prevention Tips", url: "https://www.cisa.gov/topics/cybersecurity-best-practices/malware", type: "link" },
        ],
      },
    ],
  },
  {
    id: "programming",
    title: "Introduction to Programming",
    icon: "💻",
    description: "Learn computational thinking and Python basics to empower your teaching with tech literacy.",
    modules: [
      {
        id: "prog-1",
        title: "Module 1: Computational Thinking & Algorithms",
        duration: "25 min",
        video: "https://www.youtube.com/embed/mUXo-S7gzds",
        exercise: {
          title: "Write an Algorithm for a Daily Routine",
          instructions: [
            "Define 'algorithm' in your own words.",
            "Write a step-by-step algorithm for making tea or coffee (minimum 10 steps).",
            "Convert your algorithm into a simple flowchart on paper or using draw.io.",
            "Identify any decision points (IF/ELSE) in your algorithm.",
            "Share your algorithm with a colleague and see if they can follow it exactly.",
          ],
          task: "What decision point (IF condition) did you identify in your routine?",
          inputLabel: "Your IF Condition",
          inputPlaceholder: "e.g., IF sugar requested THEN add 1 teaspoon",
        },
        quiz: [
          {
            q: "An algorithm is best described as:",
            options: ["A programming language", "A step-by-step set of instructions to solve a problem", "A type of computer hardware", "A database of code"],
            answer: 1,
          },
          {
            q: "Decomposition in computational thinking means:",
            options: ["Writing complex code", "Breaking a large problem into smaller, manageable parts", "Debugging errors", "Encrypting data"],
            answer: 1,
          },
          {
            q: "True or False: Algorithms can be expressed in plain English before being coded.",
            options: ["True", "False"],
            answer: 0,
          },
          {
            q: "A flowchart uses which symbol for a decision?",
            options: ["Rectangle", "Oval", "Diamond", "Arrow"],
            answer: 2,
          },
        ],
        resources: [
          { name: "draw.io (Flowchart Tool)", url: "https://draw.io", type: "link" },
          { name: "Computational Thinking Introduction", url: "https://edu.google.com/resources/programs/exploring-computational-thinking/", type: "link" },
        ],
      },
      {
        id: "prog-2",
        title: "Module 2: Python Basics – Variables & Data Types",
        duration: "30 min",
        video: "https://www.youtube.com/embed/kqtD5dpn9C8",
        exercise: {
          title: "Your First Python Programme",
          instructions: [
            "Go to replit.com and create a free account.",
            "Create a new Python Repl.",
            "Write code to: Ask the user their name and class, then print a personalised welcome message.",
            "Create variables for: student_name, subject, score, and grade.",
            "Use print() to display: 'Student: [name] | Subject: [subject] | Grade: [grade]'.",
          ],
          task: "Paste your Python print statement output below:",
          inputLabel: "Programme Output",
          inputPlaceholder: "e.g., Student: John Doe | Subject: Maths | Grade: A",
        },
        quiz: [
          {
            q: "In Python, which function displays output to the screen?",
            options: ["display()", "echo()", "print()", "show()"],
            answer: 2,
          },
          {
            q: "Which Python data type stores whole numbers?",
            options: ["String", "Float", "Integer", "Boolean"],
            answer: 2,
          },
          {
            q: "True or False: Python is case-sensitive, so 'name' and 'Name' are different variables.",
            options: ["True", "False"],
            answer: 0,
          },
          {
            q: "In Python, input() is used to:",
            options: ["Display text", "Import modules", "Accept user input", "Calculate values"],
            answer: 2,
          },
        ],
        resources: [
          { name: "Replit Online IDE", url: "https://replit.com", type: "link" },
          { name: "Python for Beginners", url: "https://www.python.org/about/gettingstarted/", type: "link" },
        ],
      },
      {
        id: "prog-3",
        title: "Module 3: Conditions & Loops",
        duration: "25 min",
        video: "https://www.youtube.com/embed/DZwmZ8Usvnk",
        exercise: {
          title: "Grade Calculator in Python",
          instructions: [
            "Write a Python programme that asks the user for a test score.",
            "Use IF/ELIF/ELSE to assign a grade: A(≥80), B(≥70), C(≥60), F(<60).",
            "Use a WHILE loop to keep asking for scores until the user types 'quit'.",
            "Count and display the total number of scores entered.",
            "Calculate and display the average of all scores entered.",
          ],
          task: "What was the average score when you tested your programme?",
          inputLabel: "Average Score Output",
          inputPlaceholder: "e.g., Average score: 74.5",
        },
        quiz: [
          {
            q: "In Python, an IF/ELIF/ELSE structure is used to:",
            options: ["Repeat code multiple times", "Make decisions based on conditions", "Import libraries", "Define functions"],
            answer: 1,
          },
          {
            q: "A FOR loop in Python is best for:",
            options: ["Repeating until a condition is false", "Iterating over a sequence a known number of times", "Defining classes", "Handling errors"],
            answer: 1,
          },
          {
            q: "True or False: A WHILE loop in Python continues as long as the condition is True.",
            options: ["True", "False"],
            answer: 0,
          },
          {
            q: "In Python, what does 'break' do inside a loop?",
            options: ["Pauses the loop temporarily", "Restarts the loop from the beginning", "Exits the loop immediately", "Skips one iteration"],
            answer: 2,
          },
        ],
        resources: [
          { name: "Python If/Else Tutorial", url: "https://www.w3schools.com/python/python_conditions.asp", type: "link" },
          { name: "Python Loops Tutorial", url: "https://www.w3schools.com/python/python_while_loops.asp", type: "link" },
        ],
      },
      {
        id: "prog-4",
        title: "Module 4: Functions & Modules",
        duration: "25 min",
        video: "https://www.youtube.com/embed/9Os0o3wzS_I",
        exercise: {
          title: "Build a Teacher Toolkit Module",
          instructions: [
            "Create a Python file called teacher_toolkit.py.",
            "Write a function calculate_average(scores) that takes a list and returns the average.",
            "Write a function assign_grade(average) that returns A/B/C/F.",
            "Write a function generate_report(name, scores) that prints a formatted student report.",
            "Test your module by importing it and calling all three functions.",
          ],
          task: "What did your generate_report() function output for a test student?",
          inputLabel: "Sample Report Output",
          inputPlaceholder: "e.g., Student: Jane | Average: 78 | Grade: B",
        },
        quiz: [
          {
            q: "In Python, a function is defined using which keyword?",
            options: ["function", "define", "def", "func"],
            answer: 2,
          },
          {
            q: "What does a Python function 'return' statement do?",
            options: ["Displays the result to the screen", "Sends a value back to where the function was called", "Stops the entire programme", "Repeats the function"],
            answer: 1,
          },
          {
            q: "True or False: Python functions can accept multiple parameters.",
            options: ["True", "False"],
            answer: 0,
          },
          {
            q: "To use a Python module (e.g., math), you use:",
            options: ["include math", "using math", "import math", "load math"],
            answer: 2,
          },
        ],
        resources: [
          { name: "Python Functions Tutorial", url: "https://www.w3schools.com/python/python_functions.asp", type: "link" },
          { name: "Python Modules Guide", url: "https://www.w3schools.com/python/python_modules.asp", type: "link" },
        ],
      },
      {
        id: "prog-5",
        title: "Module 5: Teaching Coding in Schools",
        duration: "25 min",
        video: "https://www.youtube.com/embed/QvyTEx1wyOY",
        exercise: {
          title: "Design a Coding Lesson Plan",
          instructions: [
            "Choose a grade and subject to integrate coding (e.g., Grade 9 Maths).",
            "Design a 45-minute coding lesson using Scratch, Python, or Code.org.",
            "Write: Learning objectives, resources needed, step-by-step activities.",
            "Include an unplugged activity (no computer needed) for the first 10 minutes.",
            "Design a simple assessment: What will students submit or demonstrate?",
          ],
          task: "What grade and topic is your coding lesson for?",
          inputLabel: "Lesson Target",
          inputPlaceholder: "e.g., Grade 9 – Variables and Data Types",
        },
        quiz: [
          {
            q: "Scratch is best suited for which age group?",
            options: ["University students", "Ages 8–16", "Professional developers", "Ages 3–5 only"],
            answer: 1,
          },
          {
            q: "An 'unplugged' coding activity means:",
            options: ["Using Wi-Fi only", "Teaching computational concepts without computers", "Coding in Python offline", "Using tablets without apps"],
            answer: 1,
          },
          {
            q: "True or False: Coding can be integrated into non-computing subjects like Maths and Art.",
            options: ["True", "False"],
            answer: 0,
          },
          {
            q: "Code.org is primarily designed for:",
            options: ["Professional web developers", "Teaching coding to K-12 students", "University graduates", "Game developers only"],
            answer: 1,
          },
        ],
        resources: [
          { name: "Scratch (MIT)", url: "https://scratch.mit.edu", type: "link" },
          { name: "Code.org for Teachers", url: "https://code.org/teach", type: "link" },
          { name: "CS Unplugged Activities", url: "https://csunplugged.org", type: "link" },
        ],
      },
    ],
  },
  {
    id: "ms-access",
    title: "Microsoft Access",
    icon: "🗄️",
    description: "Build and manage school databases for tracking students, resources, and administrative data.",
    modules: [
      {
        id: "access-1",
        title: "Module 1: Database Concepts & Access Interface",
        duration: "25 min",
        video: "https://www.youtube.com/embed/dKEbfOa6Z44",
        exercise: {
          title: "Explore a Sample Database",
          instructions: [
            "Open Microsoft Access and explore the 'Northwind' sample database.",
            "Identify the Tables, Queries, Forms, and Reports in the Navigation Pane.",
            "Open the Customers table and examine the field names and data types.",
            "Run the 'Customer Orders' query and note what data it retrieves.",
            "Open a Form and navigate through 5 records.",
          ],
          task: "List 3 table names you found in the sample database:",
          inputLabel: "Table Names",
          inputPlaceholder: "e.g., Customers, Orders, Products",
        },
        quiz: [
          {
            q: "In Microsoft Access, data is primarily stored in:",
            options: ["Forms", "Reports", "Tables", "Queries"],
            answer: 2,
          },
          {
            q: "A Query in Access is used to:",
            options: ["Display a printable report", "Retrieve specific data from tables based on criteria", "Enter new records", "Design the database structure"],
            answer: 1,
          },
          {
            q: "True or False: A Primary Key in a table uniquely identifies each record.",
            options: ["True", "False"],
            answer: 0,
          },
          {
            q: "The four main objects in an Access database are:",
            options: ["Files, Sheets, Charts, Forms", "Tables, Queries, Forms, Reports", "Rows, Columns, Cells, Pages", "Data, Info, Fields, Records"],
            answer: 1,
          },
        ],
        resources: [
          { name: "Access Getting Started", url: "https://support.microsoft.com/en-us/office/getting-started-with-access-c0a7a76a-6dc2-4f25-bc3a-f698d6f7b2d2", type: "link" },
        ],
      },
      {
        id: "access-2",
        title: "Module 2: Creating Tables & Relationships",
        duration: "30 min",
        video: "https://www.youtube.com/embed/u0S3-AZM3sM",
        exercise: {
          title: "Build a Student Database",
          instructions: [
            "Create a new blank Access database called 'SchoolDB.accdb'.",
            "Create a Students table with: StudentID (PK, AutoNumber), FirstName, LastName, Grade, DOB, Email.",
            "Create a Subjects table with: SubjectID (PK), SubjectName, Credits.",
            "Create an Enrolment table with: EnrolID, StudentID (FK), SubjectID (FK), Term.",
            "Set up Relationships between the tables using the Relationships tool.",
          ],
          task: "How many tables did you create in your database?",
          inputLabel: "Number of Tables",
          inputPlaceholder: "e.g., 3",
        },
        quiz: [
          {
            q: "An AutoNumber data type in Access:",
            options: ["Requires manual entry", "Automatically assigns a unique number to each new record", "Only stores phone numbers", "Calculates formulas"],
            answer: 1,
          },
          {
            q: "A Foreign Key in a database table:",
            options: ["Is always the first field", "References the Primary Key in another table to create a relationship", "Must be unique in every table", "Is used for encryption"],
            answer: 1,
          },
          {
            q: "True or False: You must enforce Referential Integrity to prevent orphaned records.",
            options: ["True", "False"],
            answer: 0,
          },
          {
            q: "A One-to-Many relationship in Access means:",
            options: ["One record in Table A relates to exactly one record in Table B", "One record in Table A can relate to many records in Table B", "Many records in Table A relate to one record in Table A", "Tables are not connected"],
            answer: 1,
          },
        ],
        resources: [
          { name: "Access Relationships Tutorial", url: "https://support.microsoft.com/en-us/office/guide-to-table-relationships-30446197-4fbe-457b-b992-2f6fb812b58f", type: "link" },
        ],
      },
      {
        id: "access-3",
        title: "Module 3: Queries & Filtering Data",
        duration: "25 min",
        video: "https://www.youtube.com/embed/aSI3bDq3JYs",
        exercise: {
          title: "Create Useful School Queries",
          instructions: [
            "Create a Select Query to list all Grade 10 students.",
            "Create a Query showing students and their enrolled subjects (using a Join).",
            "Add criteria to filter students with a surname starting with 'A' to 'M'.",
            "Create a Totals Query counting students per grade.",
            "Save and run all queries.",
          ],
          task: "How many students did your Grade 10 filter query return?",
          inputLabel: "Query Result Count",
          inputPlaceholder: "e.g., 12 students",
        },
        quiz: [
          {
            q: "The QBE (Query By Example) grid in Access allows you to:",
            options: ["Draw ER diagrams", "Design queries visually by specifying fields and criteria", "Import Excel data", "Create forms automatically"],
            answer: 1,
          },
          {
            q: "Which Access query type adds records from one table to another?",
            options: ["Select Query", "Update Query", "Append Query", "Delete Query"],
            answer: 2,
          },
          {
            q: "True or False: You can use wildcards like * and ? in Access query criteria.",
            options: ["True", "False"],
            answer: 0,
          },
          {
            q: "An Inner Join in an Access query returns:",
            options: ["All records from both tables", "Only records that match in both tables", "All records from the left table only", "Unmatched records only"],
            answer: 1,
          },
        ],
        resources: [
          { name: "Access Query Tutorial", url: "https://support.microsoft.com/en-us/office/introduction-to-queries-a9739a09-d3f7-4b9c-9ef7-d433c7a8b090", type: "link" },
        ],
      },
      {
        id: "access-4",
        title: "Module 4: Forms for Data Entry",
        duration: "25 min",
        video: "https://www.youtube.com/embed/g2OMFkF2gSc",
        exercise: {
          title: "Build a Student Registration Form",
          instructions: [
            "Use the Form Wizard to create a form based on your Students table.",
            "Switch to Design View and rearrange fields logically.",
            "Add a school logo (Insert > Image) as a header.",
            "Add a calculated field showing student's age based on DOB.",
            "Add a Save and Close button using the Button control.",
          ],
          task: "What title did you give your student registration form?",
          inputLabel: "Form Title",
          inputPlaceholder: "e.g., Student Registration Form 2025",
        },
        quiz: [
          {
            q: "Forms in Access are primarily used for:",
            options: ["Printing reports", "Entering and editing data in a user-friendly interface", "Running queries", "Backing up the database"],
            answer: 1,
          },
          {
            q: "A Subform in Access is used to:",
            options: ["Lock the database", "Display related records from another table within the main form", "Create a login screen", "Format the main form's colour"],
            answer: 1,
          },
          {
            q: "True or False: Macros in Access forms can automate actions like opening other forms.",
            options: ["True", "False"],
            answer: 0,
          },
          {
            q: "To switch a form to Design View in Access, you:",
            options: ["Press F5", "Right-click the form tab and select Design View", "Go to File > Design", "Press Ctrl+D"],
            answer: 1,
          },
        ],
        resources: [
          { name: "Access Forms Tutorial", url: "https://support.microsoft.com/en-us/office/introduction-to-forms-in-access-e0ce14f7-5ce3-4573-af28-e25e22d44e11", type: "link" },
        ],
      },
      {
        id: "access-5",
        title: "Module 5: Reports & Database Maintenance",
        duration: "25 min",
        video: "https://www.youtube.com/embed/cPVqE5qgaBQ",
        exercise: {
          title: "Generate a Student Progress Report",
          instructions: [
            "Use the Report Wizard to create a report based on your student/query data.",
            "Group the report by Grade level.",
            "Add sorting by Last Name.",
            "Include a Count summary showing number of students per grade.",
            "Add your school name as a header and today's date in the footer.",
            "Export the report as a PDF: External Data > PDF or XPS.",
          ],
          task: "How many grades/groups appeared in your student report?",
          inputLabel: "Number of Groups",
          inputPlaceholder: "e.g., 4 grade groups",
        },
        quiz: [
          {
            q: "Reports in Access are best used for:",
            options: ["Entering new data", "Presenting and printing data in a formatted layout", "Running queries", "Creating relationships"],
            answer: 1,
          },
          {
            q: "Compacting and Repairing an Access database:",
            options: ["Deletes all data", "Reduces file size and fixes corruption issues", "Adds new tables", "Exports data to Excel"],
            answer: 1,
          },
          {
            q: "True or False: Access Reports can include calculated fields like totals and averages.",
            options: ["True", "False"],
            answer: 0,
          },
          {
            q: "Grouping records in an Access Report allows you to:",
            options: ["Sort alphabetically only", "Organise data into categories with subtotals", "Create new tables", "Export to PDF only"],
            answer: 1,
          },
        ],
        resources: [
          { name: "Access Reports Tutorial", url: "https://support.microsoft.com/en-us/office/introduction-to-reports-in-access-e0d9d6b3-5ca0-4f47-a2af-d3fcae3e5234", type: "link" },
        ],
      },
    ],
  },
];

// ─────────────────────────────────────────────
// STYLES (inline, Moodle-inspired, elite)
// ─────────────────────────────────────────────
const S = {
  root: {
    fontFamily: "'Segoe UI', 'Helvetica Neue', Arial, sans-serif",
    background: "#f3f4f6",
    minHeight: "100vh",
    color: "#1e293b",
  },
  header: {
    background: "linear-gradient(135deg, #1a237e 0%, #283593 50%, #1565c0 100%)",
    color: "#fff",
    padding: "0",
    boxShadow: "0 2px 10px rgba(0,0,0,0.3)",
  },
  headerInner: {
    maxWidth: 1200,
    margin: "0 auto",
    padding: "16px 24px",
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    flexWrap: "wrap",
    gap: 12,
  },
  headerLogo: {
    display: "flex",
    alignItems: "center",
    gap: 12,
  },
  headerLogoIcon: {
    width: 44,
    height: 44,
    background: "#fff",
    borderRadius: 10,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    fontSize: 24,
  },
  headerTitle: {
    fontSize: 22,
    fontWeight: 700,
    margin: 0,
    letterSpacing: "-0.3px",
  },
  headerSubtitle: {
    fontSize: 12,
    opacity: 0.8,
    margin: 0,
    marginTop: 2,
  },
  main: {
    maxWidth: 1200,
    margin: "0 auto",
    padding: "24px 16px",
  },
  // Course selection
  courseGrid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))",
    gap: 20,
    marginTop: 20,
  },
  courseCard: (selected) => ({
    background: selected ? "#1a237e" : "#fff",
    color: selected ? "#fff" : "#1e293b",
    border: selected ? "2px solid #1a237e" : "2px solid #e2e8f0",
    borderRadius: 12,
    padding: "20px",
    cursor: "pointer",
    transition: "all 0.2s ease",
    boxShadow: selected ? "0 6px 20px rgba(26,35,126,0.3)" : "0 1px 3px rgba(0,0,0,0.07)",
  }),
  courseIcon: {
    fontSize: 36,
    marginBottom: 10,
    display: "block",
  },
  courseTitle: {
    fontSize: 17,
    fontWeight: 700,
    margin: "0 0 6px",
  },
  courseDesc: {
    fontSize: 13,
    opacity: 0.75,
    margin: 0,
    lineHeight: 1.5,
  },
  // Progress
  progressSection: {
    background: "#fff",
    borderRadius: 12,
    padding: "20px 24px",
    marginBottom: 24,
    boxShadow: "0 1px 3px rgba(0,0,0,0.07)",
  },
  progressBar: {
    height: 10,
    background: "#e2e8f0",
    borderRadius: 99,
    overflow: "hidden",
    marginTop: 10,
  },
  progressFill: (pct) => ({
    height: "100%",
    width: `${pct}%`,
    background: pct === 100 ? "linear-gradient(90deg,#2e7d32,#43a047)" : "linear-gradient(90deg,#1a237e,#1565c0)",
    borderRadius: 99,
    transition: "width 0.5s ease",
  }),
  // Module accordion
  moduleCard: {
    background: "#fff",
    borderRadius: 10,
    marginBottom: 12,
    overflow: "hidden",
    boxShadow: "0 1px 3px rgba(0,0,0,0.07)",
    border: "1px solid #e2e8f0",
  },
  moduleHeader: (open, done) => ({
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    padding: "16px 20px",
    cursor: "pointer",
    background: done ? "#f0fdf4" : open ? "#f8faff" : "#fff",
    borderBottom: open ? "1px solid #e2e8f0" : "none",
    transition: "background 0.2s",
    gap: 12,
  }),
  moduleTitle: {
    fontSize: 15,
    fontWeight: 600,
    margin: 0,
    flex: 1,
  },
  moduleBadge: (done) => ({
    fontSize: 11,
    fontWeight: 700,
    padding: "3px 10px",
    borderRadius: 99,
    background: done ? "#dcfce7" : "#f1f5f9",
    color: done ? "#166534" : "#64748b",
    whiteSpace: "nowrap",
  }),
  moduleBody: {
    padding: "0",
  },
  // Tabs
  tabBar: {
    display: "flex",
    borderBottom: "2px solid #e2e8f0",
    background: "#f8faff",
    overflowX: "auto",
  },
  tab: (active) => ({
    padding: "10px 20px",
    fontSize: 13,
    fontWeight: active ? 700 : 500,
    color: active ? "#1a237e" : "#64748b",
    borderBottom: active ? "2px solid #1a237e" : "2px solid transparent",
    cursor: "pointer",
    whiteSpace: "nowrap",
    background: "none",
    border: "none",
    borderBottom: active ? "2px solid #1a237e" : "2px solid transparent",
    marginBottom: -2,
    transition: "all 0.15s",
  }),
  tabContent: {
    padding: "20px",
  },
  // Video
  videoWrapper: {
    position: "relative",
    paddingBottom: "56.25%",
    height: 0,
    borderRadius: 8,
    overflow: "hidden",
    background: "#000",
  },
  videoIframe: {
    position: "absolute",
    top: 0, left: 0,
    width: "100%",
    height: "100%",
    border: "none",
  },
  // Exercise
  exerciseStep: {
    display: "flex",
    gap: 12,
    marginBottom: 12,
    alignItems: "flex-start",
  },
  stepNum: {
    width: 26,
    height: 26,
    borderRadius: "50%",
    background: "#1a237e",
    color: "#fff",
    fontSize: 12,
    fontWeight: 700,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    flexShrink: 0,
    marginTop: 1,
  },
  input: {
    width: "100%",
    padding: "10px 14px",
    borderRadius: 8,
    border: "1.5px solid #cbd5e1",
    fontSize: 14,
    outline: "none",
    boxSizing: "border-box",
    transition: "border 0.15s",
  },
  // Quiz
  quizOption: (sel, correct, revealed) => {
    let bg = "#f8faff", border = "#e2e8f0", color = "#1e293b";
    if (revealed) {
      if (correct) { bg = "#f0fdf4"; border = "#4ade80"; color = "#166534"; }
      else if (sel && !correct) { bg = "#fef2f2"; border = "#f87171"; color = "#991b1b"; }
    } else if (sel) {
      bg = "#eef2ff"; border = "#818cf8"; color = "#3730a3";
    }
    return {
      display: "block",
      width: "100%",
      textAlign: "left",
      padding: "11px 16px",
      marginBottom: 8,
      borderRadius: 8,
      border: `1.5px solid ${border}`,
      background: bg,
      color,
      fontSize: 14,
      cursor: revealed ? "default" : "pointer",
      transition: "all 0.15s",
    };
  },
  // Resources
  resourceLink: {
    display: "flex",
    alignItems: "center",
    gap: 10,
    padding: "12px 16px",
    background: "#f8faff",
    borderRadius: 8,
    border: "1px solid #e2e8f0",
    marginBottom: 8,
    textDecoration: "none",
    color: "#1a237e",
    fontSize: 14,
    fontWeight: 500,
    transition: "background 0.15s",
  },
  // Buttons
  btnPrimary: {
    background: "linear-gradient(135deg,#1a237e,#1565c0)",
    color: "#fff",
    border: "none",
    borderRadius: 8,
    padding: "11px 24px",
    fontSize: 14,
    fontWeight: 600,
    cursor: "pointer",
    transition: "opacity 0.15s, transform 0.1s",
  },
  btnSuccess: {
    background: "linear-gradient(135deg,#2e7d32,#43a047)",
    color: "#fff",
    border: "none",
    borderRadius: 8,
    padding: "11px 24px",
    fontSize: 14,
    fontWeight: 600,
    cursor: "pointer",
    transition: "opacity 0.15s",
  },
  btnDisabled: {
    background: "#94a3b8",
    color: "#fff",
    border: "none",
    borderRadius: 8,
    padding: "11px 24px",
    fontSize: 14,
    fontWeight: 600,
    cursor: "not-allowed",
    opacity: 0.7,
  },
  btnOutline: {
    background: "transparent",
    color: "#1a237e",
    border: "1.5px solid #1a237e",
    borderRadius: 8,
    padding: "9px 20px",
    fontSize: 13,
    fontWeight: 600,
    cursor: "pointer",
    transition: "all 0.15s",
  },
  // Certificate modal
  overlay: {
    position: "fixed",
    inset: 0,
    background: "rgba(15,23,42,0.7)",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    zIndex: 1000,
    padding: 20,
  },
  modal: {
    background: "#fff",
    borderRadius: 16,
    padding: "36px",
    maxWidth: 460,
    width: "100%",
    boxShadow: "0 20px 60px rgba(0,0,0,0.3)",
  },
  alert: (type) => ({
    padding: "12px 16px",
    borderRadius: 8,
    marginTop: 12,
    fontSize: 13,
    fontWeight: 500,
    background: type === "success" ? "#f0fdf4" : "#fef2f2",
    color: type === "success" ? "#166534" : "#991b1b",
    border: `1px solid ${type === "success" ? "#4ade80" : "#f87171"}`,
  }),
  sectionTitle: {
    fontSize: 20,
    fontWeight: 700,
    color: "#1a237e",
    marginBottom: 16,
    marginTop: 0,
  },
  label: {
    display: "block",
    fontSize: 12,
    fontWeight: 600,
    color: "#64748b",
    marginBottom: 4,
    marginTop: 12,
    textTransform: "uppercase",
    letterSpacing: "0.05em",
  },
};

// ─────────────────────────────────────────────
// UTILITY — unique certificate ID
// ─────────────────────────────────────────────
function generateCertId() {
  return "ETC-" + Date.now().toString(36).toUpperCase() + "-" + Math.random().toString(36).slice(2, 6).toUpperCase();
}

function formatDate(d) {
  return d.toLocaleDateString("en-ZA", { year: "numeric", month: "long", day: "numeric" });
}

// ─────────────────────────────────────────────
// SUB-COMPONENTS
// ─────────────────────────────────────────────

/** Video tab */
function VideoTab({ module }) {
  return (
    <div>
      <p style={{ fontSize: 13, color: "#64748b", marginTop: 0, marginBottom: 12 }}>
        📺 Watch the demonstration video below before proceeding to the exercise.
      </p>
      <div style={S.videoWrapper}>
        <iframe
          style={S.videoIframe}
          src={module.video}
          title={module.title}
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
        />
      </div>
      <p style={{ fontSize: 12, color: "#94a3b8", marginTop: 10 }}>
        ⏱ Estimated viewing time: part of {module.duration} total module time.
      </p>
    </div>
  );
}

/** Exercise tab */
function ExerciseTab({ module, value, onChange, completed }) {
  return (
    <div>
      <h4 style={{ margin: "0 0 12px", color: "#1a237e", fontSize: 15 }}>
        🛠 {module.exercise.title}
      </h4>
      <p style={{ fontSize: 13, color: "#475569", marginBottom: 14, marginTop: 0 }}>
        Complete each step below in the application, then confirm your work:
      </p>
      {module.exercise.instructions.map((step, i) => (
        <div key={i} style={S.exerciseStep}>
          <span style={S.stepNum}>{i + 1}</span>
          <span style={{ fontSize: 14, lineHeight: 1.6, color: "#334155" }}>{step}</span>
        </div>
      ))}
      <div style={{ marginTop: 20, padding: "16px", background: "#f0f4ff", borderRadius: 10, border: "1px solid #c7d2fe" }}>
        <label style={S.label}>{module.exercise.task}</label>
        <label style={{ ...S.label, textTransform: "none", fontSize: 13, color: "#334155", marginTop: 4 }}>
          {module.exercise.inputLabel}:
        </label>
        <input
          style={{ ...S.input, marginTop: 6 }}
          placeholder={module.exercise.inputPlaceholder}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          disabled={completed}
        />
        {completed && (
          <p style={{ fontSize: 12, color: "#166534", margin: "6px 0 0", fontWeight: 600 }}>✓ Exercise completed</p>
        )}
      </div>
    </div>
  );
}

/** Quiz tab */
function QuizTab({ module, quizState, onAnswer, onReveal, completed }) {
  const [revealed, setRevealed] = useState(false);

  function handleReveal() {
    setRevealed(true);
    onReveal();
  }

  const allAnswered = module.quiz.every((_, i) => quizState[i] !== undefined);
  const score = revealed
    ? module.quiz.filter((q, i) => quizState[i] === q.answer).length
    : null;

  return (
    <div>
      <p style={{ fontSize: 13, color: "#64748b", marginTop: 0, marginBottom: 16 }}>
        📝 Answer all questions, then submit to see your results.
      </p>
      {module.quiz.map((q, qi) => (
        <div key={qi} style={{ marginBottom: 24 }}>
          <p style={{ fontSize: 14, fontWeight: 600, margin: "0 0 10px", color: "#1e293b" }}>
            {qi + 1}. {q.q}
          </p>
          {q.options.map((opt, oi) => (
            <button
              key={oi}
              style={S.quizOption(quizState[qi] === oi, oi === q.answer, revealed)}
              onClick={() => !revealed && !completed && onAnswer(qi, oi)}
            >
              {revealed && oi === q.answer ? "✓ " : revealed && quizState[qi] === oi && oi !== q.answer ? "✗ " : ""}
              {opt}
            </button>
          ))}
        </div>
      ))}
      {!revealed && !completed && (
        <button
          style={allAnswered ? S.btnPrimary : S.btnDisabled}
          onClick={allAnswered ? handleReveal : undefined}
        >
          Submit Quiz
        </button>
      )}
      {revealed && (
        <div style={S.alert(score >= Math.ceil(module.quiz.length * 0.75) ? "success" : "error")}>
          {score >= Math.ceil(module.quiz.length * 0.75)
            ? `✅ Excellent! You scored ${score}/${module.quiz.length}.`
            : `⚠️ You scored ${score}/${module.quiz.length}. Review the content and retry.`}
        </div>
      )}
      {completed && (
        <div style={S.alert("success")}>✅ Quiz completed</div>
      )}
    </div>
  );
}

/** Resources tab */
function ResourcesTab({ module }) {
  return (
    <div>
      <p style={{ fontSize: 13, color: "#64748b", marginTop: 0, marginBottom: 14 }}>
        📂 Download or access these resources to support your learning:
      </p>
      {module.resources.map((r, i) => (
        <a
          key={i}
          href={r.url}
          target="_blank"
          rel="noopener noreferrer"
          style={S.resourceLink}
        >
          <span style={{ fontSize: 20 }}>{r.type === "pdf" ? "📄" : "🔗"}</span>
          <span>{r.name}</span>
          <span style={{ marginLeft: "auto", fontSize: 11, color: "#94a3b8" }}>
            {r.type === "pdf" ? "PDF" : "Web"}
          </span>
        </a>
      ))}
    </div>
  );
}

/** Single module accordion */
function ModuleAccordion({ mod, moduleProgress, onUpdateProgress }) {
  const [open, setOpen] = useState(false);
  const [activeTab, setActiveTab] = useState("video");

  const done = moduleProgress?.done || false;
  const exerciseVal = moduleProgress?.exerciseVal || "";
  const quizState = moduleProgress?.quizState || {};
  const quizRevealed = moduleProgress?.quizRevealed || false;
  const videoWatched = moduleProgress?.videoWatched || false;

  // A module is completable when: video acknowledged, exercise has input, quiz revealed
  const canComplete = videoWatched && exerciseVal.trim().length > 2 && quizRevealed;

  function update(patch) {
    onUpdateProgress({ ...moduleProgress, ...patch });
  }

  function handleMarkComplete() {
    if (canComplete && !done) {
      update({ done: true });
    }
  }

  return (
    <div style={S.moduleCard}>
      {/* Header */}
      <div style={S.moduleHeader(open, done)} onClick={() => setOpen(!open)}>
        <span style={{ fontSize: 18 }}>{done ? "✅" : open ? "📖" : "📗"}</span>
        <p style={S.moduleTitle}>{mod.title}</p>
        <span style={S.moduleBadge(done)}>{done ? "Completed" : `⏱ ${mod.duration}`}</span>
        <span style={{ color: "#94a3b8", fontSize: 18, flexShrink: 0 }}>{open ? "▲" : "▼"}</span>
      </div>

      {/* Body */}
      {open && (
        <div style={S.moduleBody}>
          {/* Tab bar */}
          <div style={S.tabBar}>
            {["video", "exercise", "quiz", "resources"].map((t) => (
              <button key={t} style={S.tab(activeTab === t)} onClick={() => setActiveTab(t)}>
                {t === "video" ? "🎬 Demo" : t === "exercise" ? "🛠 Exercise" : t === "quiz" ? "📝 Quiz" : "📂 Resources"}
              </button>
            ))}
          </div>

          <div style={S.tabContent}>
            {activeTab === "video" && (
              <>
                <VideoTab module={mod} />
                {!videoWatched && (
                  <button
                    style={{ ...S.btnOutline, marginTop: 16 }}
                    onClick={() => update({ videoWatched: true })}
                  >
                    ✓ Mark Video as Watched
                  </button>
                )}
                {videoWatched && (
                  <p style={{ color: "#166534", fontSize: 13, marginTop: 12, fontWeight: 600 }}>✓ Video marked as watched</p>
                )}
              </>
            )}
            {activeTab === "exercise" && (
              <ExerciseTab
                module={mod}
                value={exerciseVal}
                onChange={(v) => update({ exerciseVal: v })}
                completed={done}
              />
            )}
            {activeTab === "quiz" && (
              <QuizTab
                module={mod}
                quizState={quizState}
                onAnswer={(qi, oi) => update({ quizState: { ...quizState, [qi]: oi } })}
                onReveal={() => update({ quizRevealed: true })}
                completed={done}
              />
            )}
            {activeTab === "resources" && <ResourcesTab module={mod} />}

            {/* Complete button */}
            {!done && (
              <div style={{ marginTop: 24, paddingTop: 16, borderTop: "1px solid #e2e8f0" }}>
                {!canComplete && (
                  <p style={{ fontSize: 12, color: "#94a3b8", margin: "0 0 8px" }}>
                    Complete all steps: watch the video, fill in the exercise, and submit the quiz to unlock completion.
                  </p>
                )}
                <button
                  style={canComplete ? S.btnSuccess : S.btnDisabled}
                  onClick={handleMarkComplete}
                >
                  ✅ Mark Module as Complete
                </button>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}

/** Certificate modal */
function CertificateModal({ course, onClose }) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [sending, setSending] = useState(false);
  const [status, setStatus] = useState(null); // null | "success" | "error"
  const [certId] = useState(generateCertId);

  async function handleSend() {
    if (!name.trim() || !email.trim()) {
      setStatus("error");
      return;
    }
    setSending(true);
    setStatus(null);
    try {
      // Load EmailJS dynamically
      if (!window.emailjs) {
        await new Promise((res, rej) => {
          const s = document.createElement("script");
          s.src = "https://cdn.jsdelivr.net/npm/@emailjs/browser@3/dist/email.min.js";
          s.onload = res;
          s.onerror = rej;
          document.head.appendChild(s);
        });
        window.emailjs.init("VIB8bKSD-ZS3RCCHD");
      }
      const completionDate = formatDate(new Date());
      await window.emailjs.send(
        "service_4dt6s3i",
        "template_wwdrjbl",
        {
          to_name: name,
          user_email: email,
          certificate_msg:
            `Congratulations ${name}!\n\n` +
            `You have successfully completed the course: ${course.title}\n` +
            `Certificate ID: ${certId}\n` +
            `Completion Date: ${completionDate}\n\n` +
            `Download your certificate attached or via the portal.\n` +
            `If you don't see the email in your inbox, kindly check your Spam/Junk folder.\n` +
            `For assistance, contact support: 0549271528 or educationalcentremays@gmail.com.`,
        },
        "VIB8bKSD-ZS3RCCHD"
      );
      setStatus("success");
    } catch (err) {
      console.error(err);
      setStatus("error");
    } finally {
      setSending(false);
    }
  }

  return (
    <div style={S.overlay} onClick={(e) => e.target === e.currentTarget && onClose()}>
      <div style={S.modal}>
        <div style={{ textAlign: "center", marginBottom: 20 }}>
          <div style={{ fontSize: 52 }}>🎓</div>
          <h2 style={{ margin: "10px 0 4px", color: "#1a237e", fontSize: 22 }}>Certificate of Completion</h2>
          <p style={{ color: "#64748b", margin: 0, fontSize: 13 }}>
            {course.icon} {course.title}
          </p>
        </div>

        {/* Certificate preview */}
        <div style={{
          border: "3px double #1a237e",
          borderRadius: 10,
          padding: "16px",
          textAlign: "center",
          background: "linear-gradient(to bottom, #f8faff, #fff)",
          marginBottom: 20,
        }}>
          <p style={{ margin: "0 0 4px", fontSize: 11, color: "#94a3b8", textTransform: "uppercase", letterSpacing: "0.1em" }}>Educational Centre Mays</p>
          <p style={{ margin: "0 0 4px", fontSize: 13, color: "#1e293b" }}>This certifies that</p>
          <p style={{ margin: "0 0 4px", fontSize: 18, fontWeight: 700, color: "#1a237e" }}>{name || "[Your Name]"}</p>
          <p style={{ margin: "0 0 4px", fontSize: 13, color: "#475569" }}>has successfully completed</p>
          <p style={{ margin: "0 0 4px", fontSize: 15, fontWeight: 700, color: "#1e293b" }}>{course.title}</p>
          <p style={{ margin: "8px 0 0", fontSize: 11, color: "#94a3b8" }}>ID: {certId} | {formatDate(new Date())}</p>
        </div>

        <label style={S.label}>Your Full Name</label>
        <input style={S.input} placeholder="e.g., Mrs. Jane Smith" value={name} onChange={(e) => setName(e.target.value)} />
        <label style={S.label}>Email Address</label>
        <input style={{ ...S.input, marginTop: 6 }} placeholder="e.g., jane@school.edu" value={email} onChange={(e) => setEmail(e.target.value)} type="email" />

        {status === "success" && (
          <div style={S.alert("success")}>
            ✅ Certificate sent successfully! Check your inbox (and spam folder).
          </div>
        )}
        {status === "error" && !name.trim() && (
          <div style={S.alert("error")}>Please enter your name and email.</div>
        )}
        {status === "error" && name.trim() && (
          <div style={S.alert("error")}>❌ Failed to send. Please try again or contact support: 0549271528.</div>
        )}

        <div style={{ display: "flex", gap: 10, marginTop: 20 }}>
          <button style={{ ...S.btnPrimary, flex: 1, opacity: sending ? 0.7 : 1 }} onClick={handleSend} disabled={sending}>
            {sending ? "Sending…" : "📧 Send Certificate"}
          </button>
          <button style={{ ...S.btnOutline, flexShrink: 0 }} onClick={onClose}>Close</button>
        </div>
      </div>
    </div>
  );
}

// ─────────────────────────────────────────────
// MAIN COMPONENT
// ─────────────────────────────────────────────
export default function TeacherTrainingPortal() {
  // ── State ──
  const [selectedCourse, setSelectedCourse] = useState(null);
  const [progress, setProgress] = useState({}); // { [moduleId]: { done, exerciseVal, quizState, quizRevealed, videoWatched } }
  const [showCertModal, setShowCertModal] = useState(false);
  const [view, setView] = useState("courses"); // "courses" | "course"

  // ── Load from localStorage on mount ──
  useEffect(() => {
    try {
      const savedCourseId = localStorage.getItem("ttp_selectedCourse");
      const savedProgress = JSON.parse(localStorage.getItem("ttp_progress") || "{}");
      if (savedCourseId) {
        const found = COURSES.find((c) => c.id === savedCourseId);
        if (found) { setSelectedCourse(found); setView("course"); }
      }
      setProgress(savedProgress);
    } catch (_) {}
  }, []);

  // ── Persist to localStorage ──
  useEffect(() => {
    if (selectedCourse) localStorage.setItem("ttp_selectedCourse", selectedCourse.id);
    localStorage.setItem("ttp_progress", JSON.stringify(progress));
  }, [selectedCourse, progress]);

  // ── Derived: current course progress ──
  const courseModules = selectedCourse?.modules || [];
  const completedCount = courseModules.filter((m) => progress[m.id]?.done).length;
  const totalCount = courseModules.length;
  const percentage = totalCount > 0 ? Math.round((completedCount / totalCount) * 100) : 0;
  const allDone = totalCount > 0 && completedCount === totalCount;

  function handleSelectCourse(course) {
    setSelectedCourse(course);
    setView("course");
  }

  function handleUpdateModuleProgress(modId, data) {
    setProgress((prev) => ({ ...prev, [modId]: data }));
  }

  return (
    <div style={S.root}>
      {/* ── HEADER ── */}
      <header style={S.header}>
        <div style={S.headerInner}>
          <div style={S.headerLogo}>
            <div style={S.headerLogoIcon}>🎓</div>
            <div>
              <p style={S.headerTitle}>Educational Centre Mays</p>
              <p style={S.headerSubtitle}>Elite Teacher Training Portal</p>
            </div>
          </div>
          {view === "course" && (
            <button
              style={{ ...S.btnOutline, background: "rgba(255,255,255,0.1)", color: "#fff", borderColor: "rgba(255,255,255,0.4)", fontSize: 13 }}
              onClick={() => setView("courses")}
            >
              ← All Courses
            </button>
          )}
        </div>
      </header>

      <main style={S.main}>
        {/* ── COURSE SELECTION VIEW ── */}
        {view === "courses" && (
          <>
            <h2 style={{ ...S.sectionTitle, marginBottom: 4 }}>Select a Course</h2>
            <p style={{ color: "#64748b", fontSize: 14, marginTop: 0 }}>
              Each course is approximately 2 hours, broken into manageable 20–30 minute modules.
            </p>
            <div style={S.courseGrid}>
              {COURSES.map((course) => {
                const mods = course.modules;
                const done = mods.filter((m) => progress[m.id]?.done).length;
                const pct = Math.round((done / mods.length) * 100);
                return (
                  <div
                    key={course.id}
                    style={S.courseCard(selectedCourse?.id === course.id)}
                    onClick={() => handleSelectCourse(course)}
                  >
                    <span style={S.courseIcon}>{course.icon}</span>
                    <p style={S.courseTitle}>{course.title}</p>
                    <p style={S.courseDesc}>{course.description}</p>
                    <div style={{ marginTop: 14 }}>
                      <div style={{ ...S.progressBar, height: 6 }}>
                        <div style={S.progressFill(pct)} />
                      </div>
                      <p style={{ fontSize: 11, marginTop: 4, opacity: 0.7, margin: "4px 0 0" }}>
                        {done}/{mods.length} modules · {pct}%
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>
          </>
        )}

        {/* ── COURSE VIEW ── */}
        {view === "course" && selectedCourse && (
          <>
            {/* Course header */}
            <div style={{ marginBottom: 24 }}>
              <h2 style={{ ...S.sectionTitle, marginBottom: 4 }}>
                {selectedCourse.icon} {selectedCourse.title}
              </h2>
              <p style={{ color: "#64748b", fontSize: 14, marginTop: 0 }}>{selectedCourse.description}</p>
            </div>

            {/* Progress tracker */}
            <div style={S.progressSection}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: 12 }}>
                <div>
                  <p style={{ margin: 0, fontWeight: 700, fontSize: 15, color: "#1a237e" }}>
                    {percentage === 100 ? "🎉 Course Complete!" : "Your Progress"}
                  </p>
                  <p style={{ margin: "2px 0 0", fontSize: 13, color: "#64748b" }}>
                    {completedCount} of {totalCount} modules completed
                  </p>
                </div>
                <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
                  <span style={{
                    fontSize: 20,
                    fontWeight: 800,
                    color: percentage === 100 ? "#2e7d32" : "#1a237e",
                  }}>
                    {percentage}%
                  </span>
                  <button
                    style={allDone ? S.btnSuccess : S.btnDisabled}
                    onClick={() => allDone && setShowCertModal(true)}
                  >
                    🎓 Get Certificate
                  </button>
                </div>
              </div>
              <div style={S.progressBar}>
                <div style={S.progressFill(percentage)} />
              </div>
              {!allDone && (
                <p style={{ fontSize: 11, color: "#94a3b8", margin: "6px 0 0" }}>
                  Complete all {totalCount} modules to unlock your certificate.
                </p>
              )}
            </div>

            {/* Module list */}
            <h3 style={{ fontSize: 16, fontWeight: 700, color: "#334155", margin: "0 0 14px" }}>
              Course Modules
            </h3>
            {selectedCourse.modules.map((mod) => (
              <ModuleAccordion
                key={mod.id}
                mod={mod}
                moduleProgress={progress[mod.id] || {}}
                onUpdateProgress={(data) => handleUpdateModuleProgress(mod.id, data)}
              />
            ))}
          </>
        )}
      </main>

      {/* ── CERTIFICATE MODAL ── */}
      {showCertModal && selectedCourse && (
        <CertificateModal
          course={selectedCourse}
          onClose={() => setShowCertModal(false)}
        />
      )}
    </div>
  );
}
