import { useEffect, useRef, useState } from 'react';
import './App.css';
import Transactions from './Containers/Transactions';
import ContextMenu from './Components/ContextMenu';

function App() {
  const [contextConfig, setContextConfig] = useState({ show: false, x: 0, y: 0 });

  const contextRef = useRef();

  useEffect(() => {
    if (contextConfig.show) {
      document.addEventListener("mousedown", (e) => {
        if (contextRef.current != null) {
          if (!contextRef.current.contains(e.target)) {
            setContextConfig({ show: false, x: 0, y: 0 });
          }
        }
      });
    }
  });

  return (
    <div className="App">
      {contextConfig.show && <ContextMenu x={contextConfig.x} y={contextConfig.y} innerRef={contextRef} />}
      <Transactions contextConfig={contextConfig} setContextConfig={setContextConfig}   />
    </div>
  );
}

export default App;
