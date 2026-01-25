import React, { useState, useMemo } from 'react';
import { Document, Packer, Paragraph, Table, TableRow, TableCell, WidthType, AlignmentType, VerticalAlign, BorderStyle, convertInchesToTwip } from 'docx';

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
    const newClassName = window.prompt('Enter class name:');
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
      window.alert('Must have at least one class');
      return;
    }
    // eslint-disable-next-line no-restricted-globals
    if (window.confirm(`Remove ${className}?`)) {
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

  // Export to Word using docx library
  const exportToWord = async () => {
    try {
      // Convert padding to twips (1/20th of a point)
      const paddingTwips = {
        top: convertInchesToTwip(padding.top / 72),
        bottom: convertInchesToTwip(padding.bottom / 72),
        left: convertInchesToTwip(padding.left / 72),
        right: convertInchesToTwip(padding.right / 72)
      };

      // Border configuration
      const borderConfig = {
        style: BorderStyle.SINGLE,
        size: 6,
        color: "CCCCCC"
      };

      // Create header row 1: Week | Topics | Reference (repeated)
      const headerRow1Cells = [
        new TableCell({
          children: [new Paragraph({ 
            text: 'Week', 
            alignment: AlignmentType.CENTER,
            bold: true
          })],
          shading: { fill: headerColor.replace('#', '') },
          verticalAlign: VerticalAlign.CENTER,
          width: { size: 10, type: WidthType.PERCENTAGE },
          margins: paddingTwips,
          borders: {
            top: borderConfig,
            bottom: borderConfig,
            left: borderConfig,
            right: borderConfig
          }
        })
      ];

      currentClasses.forEach(() => {
        headerRow1Cells.push(
          new TableCell({
            children: [new Paragraph({ 
              text: 'Topics', 
              alignment: AlignmentType.CENTER,
              bold: true
            })],
            shading: { fill: headerColor.replace('#', '') },
            verticalAlign: VerticalAlign.CENTER,
            width: { size: 40, type: WidthType.PERCENTAGE },
            margins: paddingTwips,
            borders: {
              top: borderConfig,
              bottom: borderConfig,
              left: borderConfig,
              right: borderConfig
            }
          }),
          new TableCell({
            children: [new Paragraph({ 
              text: 'Reference', 
              alignment: AlignmentType.CENTER,
              bold: true
            })],
            shading: { fill: headerColor.replace('#', '') },
            verticalAlign: VerticalAlign.CENTER,
            width: { size: 20, type: WidthType.PERCENTAGE },
            margins: paddingTwips,
            borders: {
              top: borderConfig,
              bottom: borderConfig,
              left: borderConfig,
              right: borderConfig
            }
          })
        );
      });

      const headerRow1 = new TableRow({ children: headerRow1Cells });

      // Create header row 2: Class names
      const headerRow2Cells = [
        new TableCell({
          children: [new Paragraph('')],
          shading: { fill: classColumnColor.replace('#', '') },
          margins: paddingTwips,
          borders: {
            top: borderConfig,
            bottom: borderConfig,
            left: borderConfig,
            right: borderConfig
          }
        })
      ];

      currentClasses.forEach(cls => {
        headerRow2Cells.push(
          new TableCell({
            children: [new Paragraph({ 
              text: cls, 
              alignment: AlignmentType.CENTER,
              bold: true
            })],
            shading: { fill: classColumnColor.replace('#', '') },
            columnSpan: 2,
            margins: paddingTwips,
            borders: {
              top: borderConfig,
              bottom: borderConfig,
              left: borderConfig,
              right: borderConfig
            }
          })
        );
      });

      const headerRow2 = new TableRow({ children: headerRow2Cells });

      // Create data rows
      const dataRows = weekLabels.map((weekLabel, weekIndex) => {
        const rowCells = [
          new TableCell({
            children: [new Paragraph({ 
              text: weekLabel, 
              alignment: AlignmentType.CENTER,
              bold: true
            })],
            shading: { fill: 'E8E8E8' },
            verticalAlign: VerticalAlign.CENTER,
            margins: paddingTwips,
            borders: {
              top: borderConfig,
              bottom: borderConfig,
              left: borderConfig,
              right: borderConfig
            }
          })
        ];

        currentClasses.forEach(cls => {
          const cellData = tableData[level][cls][weekIndex];
          
          // Split text by newlines and create paragraphs
          const topicLines = (cellData.topic || '').split('\n');
          const referenceLines = (cellData.reference || '').split('\n');

          rowCells.push(
            new TableCell({
              children: topicLines.length > 0 && topicLines[0] !== '' 
                ? topicLines.map(line => new Paragraph({ text: line || ' ' }))
                : [new Paragraph({ text: ' ' })],
              verticalAlign: VerticalAlign.TOP,
              margins: paddingTwips,
              borders: {
                top: borderConfig,
                bottom: borderConfig,
                left: borderConfig,
                right: borderConfig
              }
            }),
            new TableCell({
              children: referenceLines.length > 0 && referenceLines[0] !== ''
                ? referenceLines.map(line => new Paragraph({ text: line || ' ' }))
                : [new Paragraph({ text: ' ' })],
              verticalAlign: VerticalAlign.TOP,
              margins: paddingTwips,
              borders: {
                top: borderConfig,
                bottom: borderConfig,
                left: borderConfig,
                right: borderConfig
              }
            })
          );
        });

        return new TableRow({ children: rowCells });
      });

      // Create table
      const table = new Table({
        rows: [headerRow1, headerRow2, ...dataRows],
        width: { size: 100, type: WidthType.PERCENTAGE }
      });

      // Create document
      const doc = new Document({
        sections: [{
          properties: {
            page: {
              margin: {
                top: convertInchesToTwip(0.75),
                right: convertInchesToTwip(0.75),
                bottom: convertInchesToTwip(0.75),
                left: convertInchesToTwip(0.75)
              }
            }
          },
          children: [
            new Paragraph({
              text: `${subject || 'Subject'} - ${level} Level - Term ${term}`,
              heading: 'Heading1',
              alignment: AlignmentType.CENTER,
              spacing: { after: 400 }
            }),
            table
          ]
        }]
      });

      // Generate and download
      const blob = await Packer.toBlob(doc);
      const url = URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.download = `Scheme_of_Work_${level}_Term${term}_${subject || 'Subject'}.docx`;
      
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      URL.revokeObjectURL(url);
      
      window.alert('Document downloaded successfully! Professional .docx format with perfect formatting.');
      
    } catch (error) {
      console.error('Export error:', error);
      window.alert(`Export failed: ${error.message}. Please ensure the docx package is installed.`);
    }
  };

  return (
    <div style={{ 
      padding: '20px', 
      fontFamily: 'system-ui, -apple-system, sans-serif',
      maxWidth: '100%',
      backgroundColor: '#f8f9fa',
      minHeight: '100vh'
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
                fontSize: '14px',
                boxSizing: 'border-box'
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
                fontSize: '14px',
                boxSizing: 'border-box'
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
                fontSize: '14px',
                boxSizing: 'border-box'
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
                fontSize: '14px',
                boxSizing: 'border-box'
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
                fontSize: '14px',
                boxSizing: 'border-box'
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
                fontSize: '14px',
                boxSizing: 'border-box'
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
                fontSize: '14px',
                boxSizing: 'border-box'
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
                fontSize: '14px',
                boxSizing: 'border-box'
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
                fontSize: '14px',
                boxSizing: 'border-box'
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
                fontSize: '14px',
                boxSizing: 'border-box'
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
                cursor: 'pointer',
                boxSizing: 'border-box'
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
                cursor: 'pointer',
                boxSizing: 'border-box'
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
              transition: 'background-color 0.2s'
            }}
            onMouseOver={(e) => e.currentTarget.style.backgroundColor = '#229954'}
            onMouseOut={(e) => e.currentTarget.style.backgroundColor = '#27ae60'}
          >
            ➕ Add Class
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
              transition: 'background-color 0.2s'
            }}
            onMouseOver={(e) => e.currentTarget.style.backgroundColor = '#21618c'}
            onMouseOut={(e) => e.currentTarget.style.backgroundColor = '#2980b9'}
          >
            ⬇️ Download Word (.doc)
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
              {currentClasses.map((cls) => (
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
              {currentClasses.map((cls) => (
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
                        padding: '4px 8px',
                        backgroundColor: '#e74c3c',
                        color: 'white',
                        border: 'none',
                        borderRadius: '3px',
                        cursor: 'pointer',
                        fontSize: '12px',
                        transition: 'background-color 0.2s'
                      }}
                      onMouseOver={(e) => e.currentTarget.style.backgroundColor = '#c0392b'}
                      onMouseOut={(e) => e.currentTarget.style.backgroundColor = '#e74c3c'}
                      title="Remove class"
                    >
                      ✕
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
                            outline: 'none',
                            boxSizing: 'border-box'
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
                            outline: 'none',
                            boxSizing: 'border-box'
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
        color: '#856404',
        border: '1px solid #ffeeba'
      }}>
        <strong>💡 Tips:</strong>
        <ul style={{ margin: '10px 0 0 0', paddingLeft: '20px' }}>
          <li>Textareas are resizable - drag the bottom-right corner to expand</li>
          <li>Use the color pickers to customize header and column colors</li>
          <li>Add or remove classes using the buttons above</li>
          <li>All formatting is preserved when exporting to Word (.doc format)</li>
          <li>The exported file will open directly in Microsoft Word</li>
          <li>Table scrolls horizontally on smaller screens</li>
        </ul>
      </div>
    </div>
  );
};

export default SchemeOfWorkBuilder;