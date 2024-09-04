import React, { useState } from 'react';
import AceEditor from 'react-ace';
import 'ace-builds/src-noconflict/mode-python';
import 'ace-builds/src-noconflict/theme-github';
import { v4 as uuidv4 } from 'uuid';
import { Plus, X, Play } from 'lucide-react'; // Importa los íconos
import ConsolePanel from './ConsolPanel';
import '../css/CodeEditorPanel.css';

const CodeEditorPanel = () => {
  const [editors, setEditors] = useState([{ id: uuidv4(), name: 'Untitled', code: '' }]);
  const [activeTab, setActiveTab] = useState(editors[0]?.id || null);

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
                />
              </div>
              <ConsolePanel /> {/* Consola asociada con esta pestaña */}
            </div>
            <div className="editor-footer">
              <button className="run-button" onClick={() => console.log('Play', editor.code)}>
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