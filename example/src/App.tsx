import React, { useEffect, useRef } from 'react';
import logo from './logo.svg';
import './App.css';
import {statebook, useGlobalStatebook} from 'statebook';

const increaseTime = () => {
  
  setInterval(() => {
    const state = statebook<{seconds: number}>('state');
    state.setData({seconds: (state.state.data?.seconds || 0) + 2});
  },2000)
}

function App() {
  const state = useGlobalStatebook<{seconds: number}>('state', {seconds: 0});
  const increase = () => state.setData({seconds: (state.state.data?.seconds || 0) + 1});
  useEffect(() => {
    increaseTime();
  }, [])

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          This application started since {state.state.data?.seconds} seconds
        </p>
        <button onClick={increase}>increase</button>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>
  );
}

export default App;
