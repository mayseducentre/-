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
  BorderStyle
} from "docx";
import { saveAs } from "file-saver";

const LEVEL_CLASSES = {
  Lower: ["MEC 1", "MEC 2", "MEC 3"],
  Upper: ["Class 4", "Class 5", "Class 6"],
  JHS: ["JHS 1", "JHS 2", "JHS 3"],
};

export default function SchemeOfWorkBuilder() {
  const [level, setLevel] = useState("Lower");
  const [subject, setSubject] = useState("Computing");
  const [term, setTerm] = useState("First Term");
  const [weeksCount, setWeeksCount] = useState(12);

  const [classes, setClasses] = useState(
    LEVEL_CLASSES.Lower.map((c, i) => ({
      name: c,
      color: ["#eef4ff", "#fff4e6", "#eefaf1"][i],
    }))
  );

  const weeks = useMemo(() => {
    const rows = [];
    for (let i = 1; i <= weeksCount; i++) rows.push({ week: i, type: "teaching" });
    rows.push({ week: weeksCount + 1, type: "revision" });
    rows.push({ week: weeksCount + 2, type: "exam" });
    return rows;
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
        color: ["#eef4ff", "#fff4e6", "#eefaf1"][i],
      }))
    );
    setData({});
  };

  const cellBorder = {
    top: { style: BorderStyle.SINGLE, size: 1 },
    bottom: { style: BorderStyle.SINGLE, size: 1 },
    left: { style: BorderStyle.SINGLE, size: 1 },
    right: { style: BorderStyle.SINGLE, size: 1 },
  };

  const downloadDocx = async () => {
    const rows = [];

    rows.push(
      new TableRow({
        children: [
          new TableCell({
            borders: cellBorder,
            children: [new Paragraph({ text: "WEEKS", alignment: AlignmentType.CENTER })],
          }),
          ...classes.flatMap(cls => [
            new TableCell({
              columnSpan: 2,
              shading: { fill: cls.color.replace("#", "") },
              borders: cellBorder,
              children: [
                new Paragraph({
                  alignment: AlignmentType.CENTER,
                  children: [new TextRun({ text: cls.name, bold: true })],
                }),
              ],
            }),
          ]),
        ],
      })
    );

    rows.push(
      new TableRow({
        children: [
          new TableCell({ borders: cellBorder, children: [new Paragraph("")] }),
          ...classes.flatMap(() => [
            new TableCell({ borders: cellBorder, children: [new Paragraph("TOPICS")] }),
            new TableCell({ borders: cellBorder, children: [new Paragraph("REFERENCE")] }),
          ]),
        ],
      })
    );

    weeks.forEach(w => {
      rows.push(
        new TableRow({
          children: [
            new TableCell({
              borders: cellBorder,
              children: [new Paragraph({ text: String(w.week), alignment: AlignmentType.CENTER })],
            }),
            ...classes.flatMap(cls => {
              if (w.type !== "teaching") {
                return [
                  new TableCell({
                    borders: cellBorder,
                    children: [new Paragraph(w.type === "revision" ? "Revision" : "Examination")],
                  }),
                  new TableCell({ borders: cellBorder, children: [new Paragraph("")] }),
                ];
              }
              return [
                new TableCell({
                  shading: { fill: cls.color.replace("#", "") },
                  borders: cellBorder,
                  children: [new Paragraph(data?.[w.week]?.[cls.name]?.topic || "")],
                }),
                new TableCell({
                  shading: { fill: cls.color.replace("#", "") },
                  borders: cellBorder,
                  children: [new Paragraph(data?.[w.week]?.[cls.name]?.reference || "")],
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
            run: { font: "Garamond", size: 24 },
            paragraph: { spacing: { line: 360 } },
          },
        },
      },
      sections: [
        {
          children: [
            new Paragraph({
              alignment: AlignmentType.CENTER,
              children: [
                new TextRun({
                  text: `${subject.toUpperCase()} ${term.toUpperCase()} SCHEME OF WORK (${level.toUpperCase()})`,
                  bold: true,
                }),
              ],
            }),
            new Paragraph(""),
            new Table({
              width: { size: 100, type: WidthType.PERCENTAGE },
              rows,
            }),
          ],
        },
      ],
    });

    saveAs(await Packer.toBlob(doc), `${subject}_${level}_${term}_Scheme.docx`);
  };

  return (
    <div style={{
      minHeight: "100vh",
      background: "linear-gradient(135deg,#f5f7fa,#e6ebf2)",
      padding: 24,
      fontFamily: "Garamond, serif"
    }}>
      <div style={{
        maxWidth: 1200,
        margin: "auto",
        background: "#fff",
        borderRadius: 12,
        padding: 24,
        boxShadow: "0 20px 40px rgba(0,0,0,0.08)"
      }}>
        <h1 style={{ textAlign: "center", marginBottom: 20 }}>
          Scheme of Work Builder
        </h1>

        <div style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit,minmax(180px,1fr))",
          gap: 12,
          marginBottom: 20
        }}>
          <select value={level} onChange={e => changeLevel(e.target.value)}>
            <option value="Lower">Lower Primary</option>
            <option value="Upper">Upper Primary</option>
            <option value="JHS">JHS</option>
          </select>
          <input value={subject} onChange={e => setSubject(e.target.value)} placeholder="Subject" />
          <input value={term} onChange={e => setTerm(e.target.value)} placeholder="Term" />
          <input type="number" min="1" value={weeksCount} onChange={e => setWeeksCount(+e.target.value)} />
        </div>

        <div style={{ overflowX: "auto" }}>
          <table style={{ width: "100%", borderCollapse: "collapse" }}>
            <thead>
              <tr>
                <th style={{ padding: 12, textAlign: "center" }}>Weeks</th>
                {classes.map(cls => (
                  <th key={cls.name} colSpan={2} style={{ background: cls.color, padding: 12 }}>
                    {cls.name}
                    <input type="color" value={cls.color} style={{ marginLeft: 8 }}
                      onChange={e =>
                        setClasses(prev =>
                          prev.map(c => c.name === cls.name ? { ...c, color: e.target.value } : c)
                        )
                      } />
                  </th>
                ))}
              </tr>
              <tr>
                <th></th>
                {classes.map(cls => (
                  <React.Fragment key={cls.name}>
                    <th>Topics</th>
                    <th>Reference</th>
                  </React.Fragment>
                ))}
              </tr>
            </thead>

            <tbody>
              {weeks.map(w => (
                <tr key={w.week}>
                  <td style={{ textAlign: "center", fontWeight: "bold" }}>{w.week}</td>
                  {classes.flatMap(cls =>
                    w.type === "teaching" ? [
                      <td key={cls.name + "t"} style={{ background: cls.color }}>
                        <textarea
                          style={{ width: "100%", minHeight: 50 }}
                          value={data?.[w.week]?.[cls.name]?.topic || ""}
                          onChange={e => updateCell(w.week, cls.name, "topic", e.target.value)}
                        />
                      </td>,
                      <td key={cls.name + "r"} style={{ background: cls.color }}>
                        <textarea
                          style={{ width: "100%", minHeight: 50 }}
                          value={data?.[w.week]?.[cls.name]?.reference || ""}
                          onChange={e => updateCell(w.week, cls.name, "reference", e.target.value)}
                        />
                      </td>
                    ] : [
                      <td key={cls.name + "t"} colSpan={2} style={{ textAlign: "center" }}>
                        {w.type === "revision" ? "Revision" : "Examination"}
                      </td>
                    ]
                  )}
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <button onClick={downloadDocx} style={{
          marginTop: 20,
          padding: "12px 24px",
          borderRadius: 8,
          background: "#1e40af",
          color: "#fff",
          border: "none",
          fontSize: 16,
          cursor: "pointer"
        }}>
          Download Word File
        </button>
      </div>
    </div>
  );
}