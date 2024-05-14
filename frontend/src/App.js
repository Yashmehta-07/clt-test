// App.js

import React, { useState, useEffect } from 'react';
import './App.css';

function App() {
  const [status, setStatus] = useState('');

  useEffect(() => {
    fetch('http://localhost:5000/status')
      .then(response => response.json())
      .then(data => setStatus(data.status))
      .catch(error => console.error('Error fetching status:', error));
  }, []);

  return (
    <div className="App">
      <header className="App-header">
        <h1>Backend Status</h1>
        <p>{status ? status : 'Fetching status...'}</p>
      </header>
    </div>
  );
}

export default App;
