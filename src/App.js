import React from 'react';
import logo from './logo.svg';
import './App.css';
import './animate.min.css';
import Quiz from './Quiz';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
      </header>
      <Quiz />
    </div>
  );
}

export default App;
