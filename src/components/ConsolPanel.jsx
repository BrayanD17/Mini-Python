import React from 'react';
import '../css/ConsolePanel.css';

const ConsolePanel = ({ output }) => {
  return (
    <div className="console-panel">
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
