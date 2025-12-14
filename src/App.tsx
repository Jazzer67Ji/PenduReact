import React from 'react';
import './App.css';
import Game from './components/Game';
import Keyboard from './components/Keyboard';
import Draw from './components/Draw';
import Letter from './components/Letter';
import WordDisp from './components/WordDisp';


function App() {
  return (
    <div className="App">
      <header>
        <h1>Le jeu du pendu </h1>
      </header>
      <Game/>

    </div>
  );
}

export default App;
