import React from 'react';
import '../css/ConsolePanel.css';

const ConsolePanel = () => {
  return (
    <div className="console-panel">
      <div className="console-header">
        Console
      </div>
      <div className="console-output">
        {/* Aquí se mostrarán los mensajes de la consola */}
      </div>
    </div>
  );
};

export default ConsolePanel;
