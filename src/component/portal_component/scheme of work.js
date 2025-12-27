import React, { useState, useMemo } from "react";
import {
  Document,
  Packer,
  Paragraph,
  Table,
  TableRow,
  TableCell,
  TextRun,
  WidthType,
  AlignmentType,
  BorderStyle,
} from "docx";
import { saveAs } from "file-saver";

const LEVEL_CLASSES = {
  Lower: ["MEC 1", "MEC 2", "MEC 3"],
  Upper: ["Class 4", "Class 5", "Class 6"],
  JHS: ["JHS 1", "JHS 2", "JHS 3"],
};

const WEEK_COLOR = "#f7f1e3";
const FONTS = ["Garamond", "Times New Roman", "Georgia", "Arial", "Verdana"];
const FONT_SIZES = [11, 12, 13, 14, 15, 16, 18];

export default function SchemeOfWorkBuilder() {
  const [level, setLevel] = useState("Lower");
  const [subject, setSubject] = useState("Computing");
  const [term, setTerm] = useState("First Term");
  const [weeksCount, setWeeksCount] = useState(12);
  const [fontFamily, setFontFamily] = useState("Garamond");
  const [fontSize, setFontSize] = useState(13);
  const [topicPadding, setTopicPadding] = useState(250); // wider
  const [referencePadding, setReferencePadding] = useState(150); // medium

  const [classes, setClasses] = useState(
    LEVEL_CLASSES.Lower.map((c, i) => ({
      name: c,
      color: ["#e8f0ff", "#fff1e0", "#e9f7ef"][i],
    }))
  );

  const weeks = useMemo(() => {
    const arr = [];
    for (let i = 1; i <= weeksCount; i++) arr.push({ week: i, type: "teaching" });
    arr.push({ week: weeksCount + 1, type: "revision" });
    arr.push({ week: weeksCount + 2, type: "exam" });
    return arr;
  }, [weeksCount]);

  const [data, setData] = useState({});

  const updateCell = (week, cls, field, value) => {
    setData(prev => ({
      ...prev,
      [week]: {
        ...prev[week],
        [cls]: { ...prev?.[week]?.[cls], [field]: value },
      },
    }));
  };

  const changeLevel = lvl => {
    setLevel(lvl);
    setClasses(
      LEVEL_CLASSES[lvl].map((c, i) => ({
        name: c,
        color: ["#e8f0ff", "#fff1e0", "#e9f7ef"][i],
      }))
    );
    setData({});
  };

  const border = {
    top: { style: BorderStyle.SINGLE, size: 1 },
    bottom: { style: BorderStyle.SINGLE, size: 1 },
    left: { style: BorderStyle.SINGLE, size: 1 },
    right: { style: BorderStyle.SINGLE, size: 1 },
  };

  const downloadDocx = async () => {
    const rows = [];

    // Header
    rows.push(
      new TableRow({
        children: [
          new TableCell({
            shading: { fill: "F7F1E3" },
            borders: border,
            children: [new Paragraph({ alignment: AlignmentType.CENTER, children: [new TextRun({ text: "WEEKS", bold: true })] })],
          }),
          ...classes.flatMap(cls => [
            new TableCell({
              columnSpan: 2,
              shading: { fill: cls.color.replace("#", "") },
              borders: border,
              children: [new Paragraph({ alignment: AlignmentType.CENTER, children: [new TextRun({ text: cls.name, bold: true })] })],
            }),
          ]),
        ],
      })
    );

    // Sub-header
    rows.push(
      new TableRow({
        children: [
          new TableCell({ borders: border, children: [new Paragraph("")] }),
          ...classes.flatMap(() => [
            new TableCell({ borders: border, children: [new Paragraph({ text: "TOPICS", alignment: AlignmentType.CENTER })] }),
            new TableCell({ borders: border, children: [new Paragraph({ text: "REFERENCE", alignment: AlignmentType.CENTER })] }),
          ]),
        ],
      })
    );

    // Data
    weeks.forEach(w => {
      rows.push(
        new TableRow({
          children: [
            new TableCell({
              shading: { fill: "F7F1E3" },
              borders: border,
              children: [new Paragraph({ alignment: AlignmentType.CENTER, children: [new TextRun({ text: String(w.week), bold: true })] })],
            }),
            ...classes.flatMap(cls => {
              if (w.type !== "teaching") {
                return [
                  new TableCell({
                    columnSpan: 2,
                    borders: border,
                    children: [new Paragraph({ alignment: AlignmentType.CENTER, children: [new TextRun({ text: w.type === "revision" ? "Revision" : "Examination", bold: true })] })],
                  }),
                ];
              }
              return [
                new TableCell({
                  shading: { fill: cls.color.replace("#", "") },
                  borders: border,
                  margins: { top: topicPadding, bottom: topicPadding, left: topicPadding, right: topicPadding },
                  children: [new Paragraph({ text: data?.[w.week]?.[cls.name]?.topic || "", spacing: { line: 360 } })],
                }),
                new TableCell({
                  shading: { fill: cls.color.replace("#", "") },
                  borders: border,
                  margins: { top: referencePadding, bottom: referencePadding, left: referencePadding, right: referencePadding },
                  children: [new Paragraph({ text: data?.[w.week]?.[cls.name]?.reference || "", spacing: { line: 360 } })],
                }),
              ];
            }),
          ],
        })
      );
    });

    const doc = new Document({
      styles: {
        default: {
          document: {
            run: { font: fontFamily, size: fontSize * 2 },
            paragraph: { spacing: { line: 360 } },
          },
        },
      },
      sections: [
        {
          children: [
            new Paragraph({
              alignment: AlignmentType.CENTER,
              children: [new TextRun({ text: `${subject.toUpperCase()} ${term.toUpperCase()} SCHEME OF WORK (${level.toUpperCase()})`, bold: true })],
            }),
            new Paragraph(""),
            new Table({ width: { size: 100, type: WidthType.AUTO }, rows }),
          ],
        },
      ],
    });

    saveAs(await Packer.toBlob(doc), `${subject}_${level}_${term}_Scheme.docx`);
  };

  return (
    <div style={{ minHeight: "100vh", background: "#f3f4f6", padding: 12, fontFamily }}>
      <div style={{ maxWidth: 1400, margin: "auto", background: "#fff", borderRadius: 10, padding: 20, boxShadow: "0 10px 30px rgba(0,0,0,0.08)" }}>
        <h2 style={{ textAlign: "center", fontWeight: "bold", marginBottom: 20 }}>Scheme of Work Builder</h2>

        {/* Customization Controls */}
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(160px,1fr))", gap: 12, marginBottom: 20 }}>
          <label>
            Level
            <select value={level} onChange={e => changeLevel(e.target.value)}>
              <option value="Lower">Lower Primary</option>
              <option value="Upper">Upper Primary</option>
              <option value="JHS">JHS</option>
            </select>
          </label>

          <label>
            Subject
            <input value={subject} onChange={e => setSubject(e.target.value)} placeholder="Subject" />
          </label>

          <label>
            Term
            <input value={term} onChange={e => setTerm(e.target.value)} placeholder="Term" />
          </label>

          <label>
            Weeks
            <input type="number" min="1" value={weeksCount} onChange={e => setWeeksCount(+e.target.value)} />
          </label>

          <label>
            Font Family
            <select value={fontFamily} onChange={e => setFontFamily(e.target.value)}>
              {FONTS.map(f => <option key={f}>{f}</option>)}
            </select>
          </label>

          <label>
            Font Size
            <select value={fontSize} onChange={e => setFontSize(+e.target.value)}>
              {FONT_SIZES.map(s => <option key={s}>{s}px</option>)}
            </select>
          </label>

          <label>
            Topics Padding
            <input type="number" min={50} max={1000} value={topicPadding} onChange={e => setTopicPadding(+e.target.value)} />
          </label>

          <label>
            Reference Padding
            <input type="number" min={50} max={1000} value={referencePadding} onChange={e => setReferencePadding(+e.target.value)} />
          </label>
        </div>

        {/* Table */}
        <div style={{ overflowX: "auto" }}>
          <table style={{ width: "100vh", borderCollapse: "collapse", tableLayout: "auto", minWidth: 1000 }}>
            <thead>
              <tr>
                <th style={{ background: WEEK_COLOR, padding: 16, textAlign: "center", fontWeight: "bold" }}>WEEKS</th>
                {classes.map(cls => (
                  <th key={cls.name} colSpan={2} style={{ background: cls.color, padding: 16, textAlign: "center", fontWeight: "bold" }}>
                    {cls.name}
                    <input type="color" value={cls.color} style={{ marginLeft: 6 }} onChange={e =>
                      setClasses(prev => prev.map(c => c.name === cls.name ? { ...c, color: e.target.value } : c))
                    } />
                  </th>
                ))}
              </tr>
              <tr>
                <th></th>
                {classes.map(cls => (
                  <React.Fragment key={cls.name}>
                    <th style={{ textAlign: "center", fontWeight: "bold", width: "70%" }}>TOPICS</th>
                    <th style={{ textAlign: "center", fontWeight: "bold", width: "30%" }}>REFERENCE</th>
                  </React.Fragment>
                ))}
              </tr>
            </thead>
            <tbody>
              {weeks.map(w => (
                <tr key={w.week}>
                  <td style={{ background: WEEK_COLOR, textAlign: "center", fontWeight: "bold", padding: 14 }}>{w.week}</td>
                  {classes.flatMap(cls =>
                    w.type === "teaching" ? [
                      <td key={cls.name + "t"} style={{ background: cls.color, padding: 14 }}>
                        <textarea
                          style={{ width: "100%", minHeight: 80, fontFamily, fontSize, padding: 12, resize: "vertical" }}
                          value={data?.[w.week]?.[cls.name]?.topic || ""}
                          onChange={e => updateCell(w.week, cls.name, "topic", e.target.value)}
                        />
                      </td>,
                      <td key={cls.name + "r"} style={{ background: cls.color, padding: 14 }}>
                        <textarea
                          style={{ width: "100%", minHeight: 60, fontFamily, fontSize, padding: 10, resize: "vertical" }}
                          value={data?.[w.week]?.[cls.name]?.reference || ""}
                          onChange={e => updateCell(w.week, cls.name, "reference", e.target.value)}
                        />
                      </td>
                    ] : [
                      <td key={cls.name + "x"} colSpan={2} style={{ textAlign: "center", fontWeight: "bold", padding: 16 }}>
                        {w.type === "revision" ? "Revision" : "Examination"}
                      </td>
                    ]
                  )}
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <button onClick={downloadDocx} style={{ marginTop: 20, width: "100%", padding: 14, background: "#1e3a8a", color: "#fff", border: "none", borderRadius: 8, fontSize: 16, fontWeight: "bold", cursor: "pointer" }}>
          Download Word File
        </button>
      </div>
    </div>
  );
}