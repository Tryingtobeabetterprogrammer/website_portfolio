import React, { useState } from 'react';
import './App.css';
import Experience from './experience/experience.jsx';
import 'react-sliding-pane/dist/react-sliding-pane.css';
import SlidingPane from 'react-sliding-pane'; // Make sure to import SlidingPane

function App() {
  // State to manage the sliding panes
  const [state, setState] = useState({
    isPaneOpenRight: false,
    isPaneOpenLeft: false,
  });

  const togglePaneRight = () => {
    setState({ ...state, isPaneOpenRight: !state.isPaneOpenRight });
  };

  const togglePaneLeft = () => {
    setState({ ...state, isPaneOpenLeft: !state.isPaneOpenLeft });
  };

  return (
    <>
      {/* Experience component with your 3D canvas */}
      <Experience />

      {/* Buttons to toggle the sliding panes */}
      <button onClick={togglePaneLeft}>Toggle Left Pane</button>
      <button onClick={togglePaneRight}>Toggle Right Pane</button>

      {/* Left Sliding Pane */}
      <SlidingPane
        isOpen={state.isPaneOpenLeft}
        from="left"
        onRequestClose={togglePaneLeft}
      >
        <h2>Left Pane</h2>
        <p>Your content here...</p>
      </SlidingPane>

      {/* Right Sliding Pane */}
      <SlidingPane
        isOpen={state.isPaneOpenRight}
        from="right"
        onRequestClose={togglePaneRight}
      >
        <h2>Right Pane</h2>
        <p>Your content here...</p>
      </SlidingPane>
    </>
  );
}

export default App;