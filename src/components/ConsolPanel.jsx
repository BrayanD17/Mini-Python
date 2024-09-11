import React from 'react';
import '../css/ConsolePanel.css';

const ConsolePanel = ({ output, onLineClick }) => {
  const handleDoubleClick = (event) => {
    const lineMatch = event.target.innerText.match(/line (\d+)/i); // Coincidencia con la palabra "line" en el error
    if (lineMatch) {
      const lineNumber = parseInt(lineMatch[1], 10);
      onLineClick(lineNumber);
    }
  };

  return (
    <div className="console-panel" onDoubleClick={handleDoubleClick}>
      <div className="console-header">
        Console
      </div>
      <div className="console-output">
        {output.split('\n').map((line, index) => (
          <div key={index} className="console-line">
            {line}
          </div>
        ))}
      </div>
    </div>
  );
};

export default ConsolePanel;
