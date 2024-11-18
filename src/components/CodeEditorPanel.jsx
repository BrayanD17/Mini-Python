import React, { useState } from 'react';
import AceEditor from 'react-ace';
import 'ace-builds/src-noconflict/mode-python';
import 'ace-builds/src-noconflict/theme-github';
import { v4 as uuidv4 } from 'uuid';
import { Plus, X, Play } from 'lucide-react';
import ConsolePanel from './ConsolPanel';
import '../css/CodeEditorPanel.css';

const CodeEditorPanel = () => {
  const [editors, setEditors] = useState([{ id: uuidv4(), name: 'Untitled', code: '' }]);
  const [activeTab, setActiveTab] = useState(editors[0]?.id || null);
  const [consoleOutput, setConsoleOutput] = useState('');
  const [markers, setMarkers] = useState([]);

  const handleLineClick = (lineNumber) => {
    setMarkers([{
      startRow: lineNumber - 1,
      startCol: 0,
      endRow: lineNumber - 1,
      endCol: 1,
      className: 'error-marker',
      type: 'fullLine'
    }]);
  };

  const runCode = async (code) => {
    try {
        const response = await fetch('http://localhost:5125/parse', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ code }),
        });
        
        if (response.ok) {
            const result = await response.json();
            const { bytecode, output, errorOutput } = result;

            // Formatear la salida combinando bytecode y ejecución
            const formattedOutput = `Bytecode:\n${bytecode}\n\nExecution Output:\n${output}\n${errorOutput ? `Errors:\n${errorOutput}` : ''}`;
            setConsoleOutput(formattedOutput);  // Muestra bytecode y salida en el panel de la consola
            setMarkers([]);
        } else {
            const error = await response.json();
            const formattedError = error.details && error.details.length > 0
                ? error.details.map(detail => `Error: Line ${detail.line}:${detail.column} - ${detail.message}`).join("\n")
                : "No details available";

            setConsoleOutput(`Parsing failed:\n${formattedError}`);
            
            const newMarkers = error.details ? error.details.map(detail => ({
                startRow: detail.line - 1,
                startCol: detail.column,
                endRow: detail.line - 1,
                endCol: detail.column + 1,
                className: 'error-marker',
                type: 'text'
            })) : [];

            setMarkers(newMarkers);
        }
    } catch (error) {
        setConsoleOutput(`Network error: ${error.message}`);
    }
  };

  return (
    <div className="code-editor-panel">
      <div className="tabs">
        {editors.map(editor => (
          <div
            key={editor.id}
            className={`tab ${activeTab === editor.id ? 'active' : ''}`}
            onClick={() => setActiveTab(editor.id)}
          >
            <input 
              type="text" 
              value={editor.name} 
              onChange={(e) => setEditors(editors.map(ed => 
                ed.id === editor.id ? { ...ed, name: e.target.value } : ed))}
            />
            <button className="close-tab-button" onClick={(e) => { e.stopPropagation(); setEditors(editors.filter(ed => ed.id !== editor.id)); }}>
              <X size={12} />
            </button>
          </div>
        ))}
        <button className="add-tab-button" onClick={() => setEditors([...editors, { id: uuidv4(), name: 'Untitled', code: '' }])}>
          <Plus size={16} />
        </button>
      </div>
      {editors.map(editor => (
        editor.id === activeTab && (
          <div key={editor.id} className="editor-container">
            <div className="editor-console-wrapper">
              <div className="editor">
                <AceEditor
                  mode="python"
                  theme="github"
                  name={editor.id}
                  value={editor.code}
                  onChange={(newCode) => setEditors(editors.map(ed => 
                    ed.id === editor.id ? { ...ed, code: newCode } : ed))}
                  height="500px"
                  width="100%"
                  setOptions={{ 
                    showGutter: true, 
                    useWorker: false
                  }}
                  markers={markers}
                />
              </div>
              <ConsolePanel 
                output={consoleOutput} 
                onLineClick={handleLineClick} 
              />
            </div>
            <div className="editor-footer">
              <button className="run-button" onClick={() => runCode(editor.code)}>
                <Play size={16} /> Run
              </button>
            </div>
          </div>
        )
      ))}
    </div>
  );
};

export default CodeEditorPanel;
