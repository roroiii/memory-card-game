import React from 'react';
import ReactDOM from 'react-dom/client';
import './css/index.css';
import MemoryCardGame from './App';

const rootElement = document.getElementById('root');

ReactDOM.createRoot(rootElement).render(
  <React.StrictMode>
    <MemoryCardGame />
  </React.StrictMode>
);
