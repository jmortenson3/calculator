import React, { useState, useEffect } from 'react';
import Form from './components/Form';
import LogWindow from './components/LogWindow';

function App() {
  const [calculations, setCalculations] = useState([]);
  const [errorMessage, setErrorMessage] = useState('');
  const [websocket, setWebSocket] = useState(null);

  const SERVER_URL = 'ws://localhost:8080';

  useEffect(() => {
    const ws = new WebSocket(SERVER_URL);
    setWebSocket(ws);

    if (ws) {
      ws.onmessage = (event) => {
        if (event.data) {
          const data = JSON.parse(event.data);
          if (data.error) {
            setErrorMessage(data.error);
          } else {
            setCalculations(JSON.parse(event.data));
          }
        }
      };
    }
  }, []);

  return (
    <div className="App">
      <Form
        websocket={websocket}
        errorMessage={errorMessage}
        setErrorMessage={setErrorMessage}
      />
      <LogWindow entries={calculations} />
    </div>
  );
}

export default App;
