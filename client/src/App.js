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

  );
}

export default App;
