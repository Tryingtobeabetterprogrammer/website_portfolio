// components/OverlayPanel.jsx
import React from 'react';
import './OverlayPanel.css';
import { useState } from 'react';

const OverlayPanel = () => {
  const [panelVisible, setPanelVisible] = useState(false);

  const togglePanel = () => {
    setPanelVisible(!panelVisible); // Toggle the visibility of the panel
  };

  return (
    <div>
      <button onClick={togglePanel}>Toggle Panel</button>

      <div className={`panel ${panelVisible ? 'active' : ''}`}>
        <div className="panel-content">
          <h2>Panel Content</h2>
          <p>This panel slides in from the right to the center.</p>
        </div>
      </div>
    </div>
  );
};

export default OverlayPanel;
