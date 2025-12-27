import React, { useState, useMemo } from "react";
import { Document, Packer, Paragraph, Table, TableRow, TableCell, TextRun, WidthType } from "docx";
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
      color: ["#E3F2FD", "#FFF3E0", "#E8F5E9"][i],
    }))
  );

  const weeks = useMemo(() => {
    const rows = [];
    for (let i = 1; i <= weeksCount; i++) {
      rows.push({ week: i, type: "teaching" });
    }
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
        [cls]: {
          ...prev?.[week]?.[cls],
          [field]: value,
        },
      },
    }));
  };

  const changeLevel = lvl => {
    setLevel(lvl);
    setClasses(
      LEVEL_CLASSES[lvl].map((c, i) => ({
        name: c,
        color: ["#E3F2FD", "#FFF3E0", "#E8F5E9"][i],
      }))
    );
    setData({});
  };

  const downloadDocx = async () => {
    const tableRows = [];

    // Header row 1
    tableRows.push(
      new TableRow({
        children: [
          new TableCell({ children: [new Paragraph("WEEKS")] }),
          ...classes.flatMap(cls => [
            new TableCell({
              columnSpan: 2,
              shading: { fill: cls.color.replace("#", "") },
              children: [new Paragraph({ children: [new TextRun({ text: cls.name, bold: true })] })],
            }),
          ]),
        ],
      })
    );

    // Header row 2
    tableRows.push(
      new TableRow({
        children: [
          new TableCell({ children: [new Paragraph("")] }),
          ...classes.flatMap(() => [
            new TableCell({ children: [new Paragraph("TOPICS")] }),
            new TableCell({ children: [new Paragraph("REFERENCE")] }),
          ]),
        ],
      })
    );

    // Data rows
    weeks.forEach(w => {
      tableRows.push(
        new TableRow({
          children: [
            new TableCell({
              children: [new Paragraph(String(w.week))],
            }),
            ...classes.flatMap(cls => {
              if (w.type === "revision")
                return [
                  new TableCell({ children: [new Paragraph("Revision")] }),
                  new TableCell({ children: [new Paragraph("")] }),
                ];
              if (w.type === "exam")
                return [
                  new TableCell({ children: [new Paragraph("Examination")] }),
                  new TableCell({ children: [new Paragraph("")] }),
                ];
              return [
                new TableCell({
                  shading: { fill: cls.color.replace("#", "") },
                  children: [new Paragraph(data?.[w.week]?.[cls.name]?.topic || "")],
                }),
                new TableCell({
                  shading: { fill: cls.color.replace("#", "") },
                  children: [new Paragraph(data?.[w.week]?.[cls.name]?.reference || "")],
                }),
              ];
            }),
          ],
        })
      );
    });

    const doc = new Document({
      sections: [
        {
          children: [
            new Paragraph({
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
              rows: tableRows,
            }),
          ],
        },
      ],
    });

    const blob = await Packer.toBlob(doc);
    saveAs(blob, `${subject}_${level}_${term}_Scheme.docx`);
  };

  return (
    <div style={{ padding: 24, fontFamily: "Segoe UI, sans-serif" }}>
      <h2>Scheme of Work Builder</h2>

      <div style={{ display: "flex", gap: 12, marginBottom: 16 }}>
        <select value={level} onChange={e => changeLevel(e.target.value)}>
          <option value="Lower">Lower Primary</option>
          <option value="Upper">Upper Primary</option>
          <option value="JHS">JHS</option>
        </select>

        <input value={subject} onChange={e => setSubject(e.target.value)} placeholder="Subject" />
        <input value={term} onChange={e => setTerm(e.target.value)} placeholder="Term" />

        <input
          type="number"
          min="1"
          value={weeksCount}
          onChange={e => setWeeksCount(+e.target.value)}
        />
      </div>

      <table border="1" cellPadding="6" cellSpacing="0" width="100%">
        <thead>
          <tr>
            <th>Weeks</th>
            {classes.map(cls => (
              <th key={cls.name} colSpan={2} style={{ background: cls.color }}>
                {cls.name}
                <input
                  type="color"
                  value={cls.color}
                  onChange={e =>
                    setClasses(prev =>
                      prev.map(c => (c.name === cls.name ? { ...c, color: e.target.value } : c))
                    )
                  }
                />
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
              <td>{w.week}</td>
              {classes.flatMap(cls =>
                w.type === "teaching" ? (
                  [
                    <td key={cls.name + "t"} style={{ background: cls.color }}>
                      <input
                        value={data?.[w.week]?.[cls.name]?.topic || ""}
                        onChange={e => updateCell(w.week, cls.name, "topic", e.target.value)}
                      />
                    </td>,
                    <td key={cls.name + "r"} style={{ background: cls.color }}>
                      <input
                        value={data?.[w.week]?.[cls.name]?.reference || ""}
                        onChange={e => updateCell(w.week, cls.name, "reference", e.target.value)}
                      />
                    </td>,
                  ]
                ) : (
                  [
                    <td key={cls.name + "t"}>{w.type === "revision" ? "Revision" : "Examination"}</td>,
                    <td key={cls.name + "r"}></td>,
                  ]
                )
              )}
            </tr>
          ))}
        </tbody>
      </table>

      <button style={{ marginTop: 16 }} onClick={downloadDocx}>
        Download Word File
      </button>
    </div>
  );
}