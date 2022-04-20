<<<<<<< HEAD
import React from 'react';
import { 
  BrowserRouter,
  Routes,
  Route } from 'react-router-dom'
import './App.css';
import Motivation from './components/Motivation';
import Index from './components/Index';

function App() {
  return (
    <>
    <BrowserRouter>
      <div>
        <Routes>
          <Route path="/" element={< Index />} />
          <Route path="/motivation" element={< Motivation />} />
        </Routes>
      </div>
    </BrowserRouter>
    </>

=======
import logo from './logo.svg';
import './App.css';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
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
>>>>>>> 99949378adc8fbdf4ead4793d77a694c63e0c86a
  );
}

export default App;
