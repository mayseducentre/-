import React, { useState, useMemo } from 'react';
import { Download, Plus, Trash2, GripVertical } from 'lucide-react';

// Import required for Word export
const { Document, Packer, Paragraph, Table, TableRow, TableCell, WidthType, AlignmentType, VerticalAlign, BorderStyle } = window.docx || {};

const SchemeOfWorkBuilder = () => {
  // Configuration state
  const [level, setLevel] = useState('Lower');
  const [subject, setSubject] = useState('');
  const [term, setTerm] = useState('1');
  const [weeks, setWeeks] = useState(12);
  const [fontFamily, setFontFamily] = useState('Arial');
  const [fontSize, setFontSize] = useState(12);
  const [padding, setPadding] = useState({ top: 8, bottom: 8, left: 8, right: 8 });
  const [headerColor, setHeaderColor] = useState('#4a90e2');
  const [classColumnColor, setClassColumnColor] = useState('#f0f4f8');

  // Classes for each level
  const [classes, setClasses] = useState({
    Lower: ['Primary 1', 'Primary 2', 'Primary 3'],
    Upper: ['Primary 4', 'Primary 5', 'Primary 6'],
    JHS: ['JHS 1', 'JHS 2', 'JHS 3']
  });

  // Table data: weeks x classes x {topic, reference}
  const [tableData, setTableData] = useState(() => {
    const initialData = {};
    const totalWeeks = weeks + 2; // +2 for revision and exam
    ['Lower', 'Upper', 'JHS'].forEach(lvl => {
      initialData[lvl] = {};
      classes[lvl].forEach(cls => {
        initialData[lvl][cls] = Array(totalWeeks).fill(null).map(() => ({
          topic: '',
          reference: ''
        }));
      });
    });
    return initialData;
  });

  // Get current classes based on selected level
  const currentClasses = useMemo(() => classes[level], [classes, level]);

  // Generate week labels
  const weekLabels = useMemo(() => {
    const labels = [];
    for (let i = 1; i <= weeks; i++) {
      labels.push(`Week ${i}`);
    }
    labels.push('Revision');
    labels.push('Exam');
    return labels;
  }, [weeks]);

  // Update cell data
  const updateCell = (className, weekIndex, field, value) => {
    setTableData(prev => ({
      ...prev,
      [level]: {
        ...prev[level],
        [className]: prev[level][className].map((cell, idx) =>
          idx === weekIndex ? { ...cell, [field]: value } : cell
        )
      }
    }));
  };

  // Add new class
  const addClass = () => {
    const newClassName = prompt('Enter class name:');
    if (newClassName && !classes[level].includes(newClassName)) {
      setClasses(prev => ({
        ...prev,
        [level]: [...prev[level], newClassName]
      }));
      setTableData(prev => ({
        ...prev,
        [level]: {
          ...prev[level],
          [newClassName]: Array(weeks + 2).fill(null).map(() => ({
            topic: '',
            reference: ''
          }))
        }
      }));
    }
  };

  // Remove class
  const removeClass = (className) => {
    if (classes[level].length <= 1) {
      alert('Must have at least one class');
      return;
    }
    if (confirm(`Remove ${className}?`)) {
      setClasses(prev => ({
        ...prev,
        [level]: prev[level].filter(c => c !== className)
      }));
      setTableData(prev => {
        const newData = { ...prev };
        delete newData[level][className];
        return newData;
      });
    }
  };

  // Update weeks count
  const updateWeeks = (newWeeks) => {
    const num = parseInt(newWeeks) || 12;
    setWeeks(num);
    
    // Adjust table data
    setTableData(prev => {
      const newData = { ...prev };
      Object.keys(newData).forEach(lvl => {
        Object.keys(newData[lvl]).forEach(cls => {
          const currentLength = newData[lvl][cls].length;
          const targetLength = num + 2;
          
          if (currentLength < targetLength) {
            // Add new weeks
            const toAdd = targetLength - currentLength;
            newData[lvl][cls] = [
              ...newData[lvl][cls].slice(0, -2),
              ...Array(toAdd).fill(null).map(() => ({ topic: '', reference: '' })),
              ...newData[lvl][cls].slice(-2)
            ];
          } else if (currentLength > targetLength) {
            // Remove weeks
            newData[lvl][cls] = [
              ...newData[lvl][cls].slice(0, num),
              ...newData[lvl][cls].slice(-2)
            ];
          }
        });
      });
      return newData;
    });
  };

  // Export to Word
  const exportToWord = async () => {
    if (!window.docx) {
      alert('Loading export library...');
      return;
    }

    try {
      // Create header rows
      const headerRow1 = new TableRow({
        children: [
          new TableCell({
            children: [new Paragraph({ text: 'Week', alignment: AlignmentType.CENTER })],
            shading: { fill: headerColor.replace('#', '') },
            verticalAlign: VerticalAlign.CENTER,
            width: { size: 10, type: WidthType.PERCENTAGE }
          }),
          ...currentClasses.flatMap(() => [
            new TableCell({
              children: [new Paragraph({ text: 'Topics', alignment: AlignmentType.CENTER })],
              shading: { fill: headerColor.replace('#', '') },
              verticalAlign: VerticalAlign.CENTER,
              width: { size: 35, type: WidthType.PERCENTAGE }
            }),
            new TableCell({
              children: [new Paragraph({ text: 'Reference', alignment: AlignmentType.CENTER })],
              shading: { fill: headerColor.replace('#', '') },
              verticalAlign: VerticalAlign.CENTER,
              width: { size: 20, type: WidthType.PERCENTAGE }
            })
          ])
        ]
      });

      const headerRow2 = new TableRow({
        children: [
          new TableCell({
            children: [new Paragraph('')],
            shading: { fill: classColumnColor.replace('#', '') }
          }),
          ...currentClasses.flatMap(cls => [
            new TableCell({
              children: [new Paragraph({ text: cls, alignment: AlignmentType.CENTER })],
              shading: { fill: classColumnColor.replace('#', '') },
              columnSpan: 2
            })
          ])
        ]
      });

      // Create data rows
      const dataRows = weekLabels.map((weekLabel, weekIndex) => {
        const isSpecialWeek = weekIndex >= weeks;
        
        return new TableRow({
          children: [
            new TableCell({
              children: [new Paragraph({ text: weekLabel, alignment: AlignmentType.CENTER })],
              shading: { fill: 'e8e8e8' },
              verticalAlign: VerticalAlign.CENTER
            }),
            ...currentClasses.flatMap(cls => {
              const cellData = tableData[level][cls][weekIndex];
              return [
                new TableCell({
                  children: [new Paragraph(cellData.topic || '')],
                  verticalAlign: VerticalAlign.TOP
                }),
                new TableCell({
                  children: [new Paragraph(cellData.reference || '')],
                  verticalAlign: VerticalAlign.TOP
                })
              ];
            })
          ]
        });
      });

      const table = new Table({
        rows: [headerRow1, headerRow2, ...dataRows],
        width: { size: 100, type: WidthType.PERCENTAGE }
      });

      const doc = new Document({
        sections: [{
          children: [
            new Paragraph({
              text: `${subject || 'Subject'} - ${level} Level - Term ${term}`,
              heading: 'Heading1',
              alignment: AlignmentType.CENTER
            }),
            new Paragraph(''),
            table
          ]
        }]
      });

      const blob = await Packer.toBlob(doc);
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `Scheme_of_Work_${level}_Term${term}.docx`;
      a.click();
      URL.revokeObjectURL(url);
    } catch (error) {
      console.error('Export error:', error);
      alert('Export failed. Please try again.');
    }
  };

  return (
    <div style={{ 
      padding: '20px', 
      fontFamily: 'system-ui, -apple-system, sans-serif',
      maxWidth: '100%',
      backgroundColor: '#f8f9fa'
    }}>
      <h1 style={{ textAlign: 'center', color: '#2c3e50', marginBottom: '30px' }}>
        📚 Scheme of Work Builder
      </h1>

      {/* Configuration Panel */}
      <div style={{
        backgroundColor: 'white',
        padding: '25px',
        borderRadius: '10px',
        marginBottom: '25px',
        boxShadow: '0 2px 8px rgba(0,0,0,0.1)'
      }}>
        <h3 style={{ marginTop: 0, color: '#34495e' }}>Configuration</h3>
        
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
          gap: '15px',
          marginBottom: '20px'
        }}>
          <div>
            <label style={{ display: 'block', marginBottom: '5px', fontWeight: '600', fontSize: '14px' }}>
              Subject
            </label>
            <input
              type="text"
              value={subject}
              onChange={(e) => setSubject(e.target.value)}
              placeholder="e.g., Mathematics"
              style={{
                width: '100%',
                padding: '8px',
                border: '1px solid #ddd',
                borderRadius: '5px',
                fontSize: '14px'
              }}
            />
          </div>

          <div>
            <label style={{ display: 'block', marginBottom: '5px', fontWeight: '600', fontSize: '14px' }}>
              Level
            </label>
            <select
              value={level}
              onChange={(e) => setLevel(e.target.value)}
              style={{
                width: '100%',
                padding: '8px',
                border: '1px solid #ddd',
                borderRadius: '5px',
                fontSize: '14px'
              }}
            >
              <option>Lower</option>
              <option>Upper</option>
              <option>JHS</option>
            </select>
          </div>

          <div>
            <label style={{ display: 'block', marginBottom: '5px', fontWeight: '600', fontSize: '14px' }}>
              Term
            </label>
            <select
              value={term}
              onChange={(e) => setTerm(e.target.value)}
              style={{
                width: '100%',
                padding: '8px',
                border: '1px solid #ddd',
                borderRadius: '5px',
                fontSize: '14px'
              }}
            >
              <option>1</option>
              <option>2</option>
              <option>3</option>
            </select>
          </div>

          <div>
            <label style={{ display: 'block', marginBottom: '5px', fontWeight: '600', fontSize: '14px' }}>
              Teaching Weeks
            </label>
            <input
              type="number"
              value={weeks}
              onChange={(e) => updateWeeks(e.target.value)}
              min="1"
              max="20"
              style={{
                width: '100%',
                padding: '8px',
                border: '1px solid #ddd',
                borderRadius: '5px',
                fontSize: '14px'
              }}
            />
          </div>

          <div>
            <label style={{ display: 'block', marginBottom: '5px', fontWeight: '600', fontSize: '14px' }}>
              Font Family
            </label>
            <select
              value={fontFamily}
              onChange={(e) => setFontFamily(e.target.value)}
              style={{
                width: '100%',
                padding: '8px',
                border: '1px solid #ddd',
                borderRadius: '5px',
                fontSize: '14px'
              }}
            >
              <option>Arial</option>
              <option>Times New Roman</option>
              <option>Calibri</option>
              <option>Georgia</option>
              <option>Verdana</option>
            </select>
          </div>

          <div>
            <label style={{ display: 'block', marginBottom: '5px', fontWeight: '600', fontSize: '14px' }}>
              Font Size (px)
            </label>
            <input
              type="number"
              value={fontSize}
              onChange={(e) => setFontSize(parseInt(e.target.value) || 12)}
              min="8"
              max="24"
              style={{
                width: '100%',
                padding: '8px',
                border: '1px solid #ddd',
                borderRadius: '5px',
                fontSize: '14px'
              }}
            />
          </div>
        </div>

        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(150px, 1fr))',
          gap: '15px',
          marginBottom: '20px'
        }}>
          <div>
            <label style={{ display: 'block', marginBottom: '5px', fontWeight: '600', fontSize: '14px' }}>
              Padding Top (px)
            </label>
            <input
              type="number"
              value={padding.top}
              onChange={(e) => setPadding(p => ({ ...p, top: parseInt(e.target.value) || 0 }))}
              min="0"
              max="50"
              style={{
                width: '100%',
                padding: '8px',
                border: '1px solid #ddd',
                borderRadius: '5px',
                fontSize: '14px'
              }}
            />
          </div>

          <div>
            <label style={{ display: 'block', marginBottom: '5px', fontWeight: '600', fontSize: '14px' }}>
              Padding Bottom (px)
            </label>
            <input
              type="number"
              value={padding.bottom}
              onChange={(e) => setPadding(p => ({ ...p, bottom: parseInt(e.target.value) || 0 }))}
              min="0"
              max="50"
              style={{
                width: '100%',
                padding: '8px',
                border: '1px solid #ddd',
                borderRadius: '5px',
                fontSize: '14px'
              }}
            />
          </div>

          <div>
            <label style={{ display: 'block', marginBottom: '5px', fontWeight: '600', fontSize: '14px' }}>
              Padding Left (px)
            </label>
            <input
              type="number"
              value={padding.left}
              onChange={(e) => setPadding(p => ({ ...p, left: parseInt(e.target.value) || 0 }))}
              min="0"
              max="50"
              style={{
                width: '100%',
                padding: '8px',
                border: '1px solid #ddd',
                borderRadius: '5px',
                fontSize: '14px'
              }}
            />
          </div>

          <div>
            <label style={{ display: 'block', marginBottom: '5px', fontWeight: '600', fontSize: '14px' }}>
              Padding Right (px)
            </label>
            <input
              type="number"
              value={padding.right}
              onChange={(e) => setPadding(p => ({ ...p, right: parseInt(e.target.value) || 0 }))}
              min="0"
              max="50"
              style={{
                width: '100%',
                padding: '8px',
                border: '1px solid #ddd',
                borderRadius: '5px',
                fontSize: '14px'
              }}
            />
          </div>

          <div>
            <label style={{ display: 'block', marginBottom: '5px', fontWeight: '600', fontSize: '14px' }}>
              Header Color
            </label>
            <input
              type="color"
              value={headerColor}
              onChange={(e) => setHeaderColor(e.target.value)}
              style={{
                width: '100%',
                height: '38px',
                border: '1px solid #ddd',
                borderRadius: '5px',
                cursor: 'pointer'
              }}
            />
          </div>

          <div>
            <label style={{ display: 'block', marginBottom: '5px', fontWeight: '600', fontSize: '14px' }}>
              Class Column Color
            </label>
            <input
              type="color"
              value={classColumnColor}
              onChange={(e) => setClassColumnColor(e.target.value)}
              style={{
                width: '100%',
                height: '38px',
                border: '1px solid #ddd',
                borderRadius: '5px',
                cursor: 'pointer'
              }}
            />
          </div>
        </div>

        <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap' }}>
          <button
            onClick={addClass}
            style={{
              padding: '10px 20px',
              backgroundColor: '#27ae60',
              color: 'white',
              border: 'none',
              borderRadius: '5px',
              cursor: 'pointer',
              fontSize: '14px',
              fontWeight: '600',
              display: 'flex',
              alignItems: 'center',
              gap: '8px'
            }}
          >
            <Plus size={18} /> Add Class
          </button>

          <button
            onClick={exportToWord}
            style={{
              padding: '10px 20px',
              backgroundColor: '#2980b9',
              color: 'white',
              border: 'none',
              borderRadius: '5px',
              cursor: 'pointer',
              fontSize: '14px',
              fontWeight: '600',
              display: 'flex',
              alignItems: 'center',
              gap: '8px'
            }}
          >
            <Download size={18} /> Download Word (.docx)
          </button>
        </div>
      </div>

      {/* Table Container */}
      <div style={{
        backgroundColor: 'white',
        padding: '20px',
        borderRadius: '10px',
        boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
        overflowX: 'auto'
      }}>
        <table style={{
          width: '100%',
          borderCollapse: 'collapse',
          fontFamily: fontFamily,
          fontSize: `${fontSize}px`,
          minWidth: '800px'
        }}>
          <thead>
            {/* First header row: Topics and Reference */}
            <tr>
              <th style={{
                border: '1px solid #ddd',
                padding: `${padding.top}px ${padding.right}px ${padding.bottom}px ${padding.left}px`,
                backgroundColor: headerColor,
                color: 'white',
                fontWeight: 'bold',
                textAlign: 'center',
                width: '100px',
                position: 'sticky',
                left: 0,
                zIndex: 3
              }}>
                Week
              </th>
              {currentClasses.map((cls, idx) => (
                <React.Fragment key={cls}>
                  <th style={{
                    border: '1px solid #ddd',
                    padding: `${padding.top}px ${padding.right}px ${padding.bottom}px ${padding.left}px`,
                    backgroundColor: headerColor,
                    color: 'white',
                    fontWeight: 'bold',
                    textAlign: 'center',
                    minWidth: '300px'
                  }}>
                    Topics
                  </th>
                  <th style={{
                    border: '1px solid #ddd',
                    padding: `${padding.top}px ${padding.right}px ${padding.bottom}px ${padding.left}px`,
                    backgroundColor: headerColor,
                    color: 'white',
                    fontWeight: 'bold',
                    textAlign: 'center',
                    minWidth: '150px'
                  }}>
                    Reference
                  </th>
                </React.Fragment>
              ))}
            </tr>

            {/* Second header row: Class names */}
            <tr>
              <th style={{
                border: '1px solid #ddd',
                padding: `${padding.top}px ${padding.right}px ${padding.bottom}px ${padding.left}px`,
                backgroundColor: classColumnColor,
                fontWeight: 'bold',
                textAlign: 'center',
                position: 'sticky',
                left: 0,
                zIndex: 3
              }}></th>
              {currentClasses.map((cls, idx) => (
                <th
                  key={cls}
                  colSpan={2}
                  style={{
                    border: '1px solid #ddd',
                    padding: `${padding.top}px ${padding.right}px ${padding.bottom}px ${padding.left}px`,
                    backgroundColor: classColumnColor,
                    fontWeight: 'bold',
                    textAlign: 'center',
                    position: 'relative'
                  }}
                >
                  {cls}
                  {currentClasses.length > 1 && (
                    <button
                      onClick={() => removeClass(cls)}
                      style={{
                        marginLeft: '10px',
                        padding: '2px 6px',
                        backgroundColor: '#e74c3c',
                        color: 'white',
                        border: 'none',
                        borderRadius: '3px',
                        cursor: 'pointer',
                        fontSize: '12px'
                      }}
                      title="Remove class"
                    >
                      <Trash2 size={12} />
                    </button>
                  )}
                </th>
              ))}
            </tr>
          </thead>

          <tbody>
            {weekLabels.map((weekLabel, weekIndex) => (
              <tr key={weekIndex}>
                <td style={{
                  border: '1px solid #ddd',
                  padding: `${padding.top}px ${padding.right}px ${padding.bottom}px ${padding.left}px`,
                  backgroundColor: '#e8e8e8',
                  fontWeight: 'bold',
                  textAlign: 'center',
                  verticalAlign: 'middle',
                  position: 'sticky',
                  left: 0,
                  zIndex: 2
                }}>
                  {weekLabel}
                </td>
                {currentClasses.map((cls) => {
                  const cellData = tableData[level][cls][weekIndex];
                  return (
                    <React.Fragment key={cls}>
                      <td style={{
                        border: '1px solid #ddd',
                        padding: '0',
                        verticalAlign: 'top'
                      }}>
                        <textarea
                          value={cellData.topic}
                          onChange={(e) => updateCell(cls, weekIndex, 'topic', e.target.value)}
                          style={{
                            width: '100%',
                            minHeight: '60px',
                            padding: `${padding.top}px ${padding.right}px ${padding.bottom}px ${padding.left}px`,
                            border: 'none',
                            fontFamily: fontFamily,
                            fontSize: `${fontSize}px`,
                            resize: 'vertical',
                            outline: 'none'
                          }}
                          placeholder="Enter topic..."
                        />
                      </td>
                      <td style={{
                        border: '1px solid #ddd',
                        padding: '0',
                        verticalAlign: 'top'
                      }}>
                        <textarea
                          value={cellData.reference}
                          onChange={(e) => updateCell(cls, weekIndex, 'reference', e.target.value)}
                          style={{
                            width: '100%',
                            minHeight: '60px',
                            padding: `${padding.top}px ${padding.right}px ${padding.bottom}px ${padding.left}px`,
                            border: 'none',
                            fontFamily: fontFamily,
                            fontSize: `${fontSize}px`,
                            resize: 'vertical',
                            outline: 'none'
                          }}
                          placeholder="Enter reference..."
                        />
                      </td>
                    </React.Fragment>
                  );
                })}
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div style={{
        marginTop: '20px',
        padding: '15px',
        backgroundColor: '#fff3cd',
        borderRadius: '5px',
        fontSize: '14px',
        color: '#856404'
      }}>
        <strong>💡 Tips:</strong>
        <ul style={{ margin: '10px 0 0 0', paddingLeft: '20px' }}>
          <li>Textareas are resizable - drag the bottom-right corner to expand</li>
          <li>Use the color pickers to customize header and column colors</li>
          <li>Add or remove classes using the buttons above</li>
          <li>All formatting is preserved when exporting to Word</li>
        </ul>
      </div>
    </div>
  );
};

// Load docx library
if (!window.docx) {
  const script = document.createElement('script');
  script.src = 'https://cdnjs.cloudflare.com/ajax/libs/docx/7.8.2/docx.min.js';
  script.onload = () => {
    console.log('Docx library loaded');
  };
  document.head.appendChild(script);
}

export default SchemeOfWorkBuilder;