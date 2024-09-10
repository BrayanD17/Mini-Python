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
  const [markers, setMarkers] = useState([]); // Nueva variable de estado para los markers

  const addEditor = () => {
    const newEditor = { id: uuidv4(), name: 'Untitled', code: '' };
    setEditors([...editors, newEditor]);
    setActiveTab(newEditor.id);
  };

  const removeEditor = (id) => {
    const newEditors = editors.filter(editor => editor.id !== id);
    setEditors(newEditors);
    if (newEditors.length > 0) {
      setActiveTab(newEditors[0].id);
    } else {
      setActiveTab(null);
    }
  };

  const renameEditor = (id, newName) => {
    setEditors(editors.map(editor => 
      editor.id === id ? { ...editor, name: newName } : editor
    ));
  };

  const handleCodeChange = (id, newCode) => {
    setEditors(editors.map(editor => 
      editor.id === id ? { ...editor, code: newCode } : editor
    ));
  };

  const handleTabClick = (id) => {
    setActiveTab(id);
  };

  const runCode = async (code) => {
    try {
      const response = await fetch('http://localhost:5052/parse', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ code }), // Enviar el código como parte del objeto JSON
      });

      if (response.ok) {
        const result = await response.text();
        setConsoleOutput(result);
        setMarkers([]); // Limpiar los markers si no hay errores
      } else {
        const error = await response.json();
        const formattedError = error.details.split("Error").join("\nError");

        setConsoleOutput(`Error: ${error.error}\nDetails: ${formattedError}`);

        // Procesar los errores y establecer markers
        const errorLines = formattedError.split("\n").map(line => {
          const match = line.match(/línea (\d+):(\d+)/);
          if (match) {
            return {
              row: parseInt(match[1], 10) - 1, // Las líneas en AceEditor son 0-indexadas
              column: parseInt(match[2], 10),
              type: 'error', // Podrías usar diferentes tipos como 'warning' si fuese necesario
              text: line
            };
          }
          return null;
        }).filter(marker => marker !== null);

        const newMarkers = errorLines.map(errorLine => ({
          startRow: errorLine.row,
          startCol: 0,
          endRow: errorLine.row,
          endCol: 1,
          className: 'error-marker',
          type: 'text'
        }));

        setMarkers(newMarkers); // Establecer los markers
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
            onClick={() => handleTabClick(editor.id)}
          >
            <input 
              type="text" 
              value={editor.name} 
              onChange={(e) => renameEditor(editor.id, e.target.value)}
            />
            <button className="close-tab-button" onClick={(e) => { e.stopPropagation(); removeEditor(editor.id); }}>
              <X size={12} />
            </button>
          </div>
        ))}
        <button className="add-tab-button" onClick={addEditor}>
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
                  onChange={(newCode) => handleCodeChange(editor.id, newCode)}
                  height="500px"
                  width="100%"
                  setOptions={{ 
                    showGutter: true, 
                    useWorker: false
                  }}
                  markers={markers} // Pasar los markers al editor
                />
              </div>
              <ConsolePanel output={consoleOutput} /> {/* Consola asociada con esta pestaña */}
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
