import React from 'react';
import '../css/ConsolePanel.css';

const ConsolePanel = ({ output, onLineClick }) => {
  const handleDoubleClick = (event) => {
    const lineMatch = event.target.innerText.match(/line (\d+)/);
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
        {output}
      </div>
    </div>
  );
};

export default ConsolePanel;
